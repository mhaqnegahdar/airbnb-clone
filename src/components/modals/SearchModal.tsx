"use client";

//Hooks/Packages
import { useMemo, useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Form, Formik, FormikProps } from "formik";
import { SearchSchema } from "@/utils/validationSchema";

//Components
import Modal from "./Modal";
import Heading from "../Heading";
import Map from "../Map";
import SelectCountry from "../inputs/SelectCountry";
import CounterInput from "../inputs/CounterInput";
import CalendarInput from "../inputs/CalendarInput";

//Types
import {
  SearchModalSteps as STEPS,
  SearchForm,
  SecondaryBtnAttributes,
  PrimaryBtnAttributes,
} from "@/types";

//Redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectIsOpen, onClose } from "@/redux/modal/searchModalSlice";
import { formatISO } from "date-fns";
import { DateRange } from "react-date-range";

// Variables
const formId = "search_form";

const initialValues: SearchForm = {
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  location: null,
  dateRange: {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },
};

const SearchModal = () => {
  // States / Variables
  const formRef = useRef<FormikProps<SearchForm>>(null);
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [submitCount, setSubmitCount] = useState(0);

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);

  //Actions

  const onBack = useCallback(() => {
    setStep(val => val - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep(val => val + 1);
  }, []);

  const primaryBtnAttributes: PrimaryBtnAttributes = useMemo(() => {
    if (step === STEPS.INFO) {
      return {
        primaryBtnType: "submit",
        primaryBtnFormId: formId,
        primaryBtnLabel: "Search",
      };
    }
    return {
      primaryBtnType: "button",
      primaryBtnAction: onNext,
      primaryBtnLabel: "Next",
    };
  }, [step, onNext]);

  const secondaryBtnAttributes: SecondaryBtnAttributes = useMemo(() => {
    let btnAction = undefined;
    if (step !== STEPS.INFO) {
      btnAction = onBack;
    }

    return {
      secondaryBtnType: "button",
      secondaryBtnLabel: "Back",
      secondaryBtnAction: btnAction,
    };
  }, [step, onBack]);

  const stepHeading = useMemo(() => {
    switch (step) {
      case STEPS.DATE:
        return {
          title: "When do you plan to go?",
          subTitle: "Make sure everyone is free!",
        };
      case STEPS.LOCATION:
        return {
          title: "Where do you wanna go?",
          subTitle: "Find the perfect location!",
        };
      case STEPS.INFO:
        return {
          title: "More information",
          subTitle: "Find your perfect place!",
        };
    }
  }, [step]);

  // Form Submit Function / Generating a search query
  const onSubmit = useCallback(
    async (values: SearchForm) => {
      //prevent auto submit in the first time
      if (submitCount < 1) {
        setSubmitCount(v => v + 1);
        return null;
      }

      const { guestCount, roomCount, bathroomCount, location, dateRange } =
        values;

      let currentQuery = {};

      //Get url with current query params
      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      //Update currentQuery and add new search params
      const updatedQuery: any = {
        ...currentQuery,
        locationValue: location?.value,
        guestCount,
        roomCount,
        bathroomCount,
      };

      if (dateRange.startDate) {
        updatedQuery.startDate = formatISO(dateRange.startDate);
      }

      if (dateRange.endDate) {
        updatedQuery.endDate = formatISO(dateRange.endDate);
      }

      //generate query with search params
      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true }
      );

      setStep(STEPS.LOCATION);
      dispatch(onClose());
      setSubmitCount(0);

      router.push(url);
    },
    [dispatch, params, router, submitCount]
  );

  //   Body Content
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading {...stepHeading} />
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={SearchSchema}
      >
        {({ setFieldValue, getFieldProps }) => {
          return (
            <Form id={formId}>
              {step === STEPS.DATE && (
                <div className="flex flex-col gap-8">
                  <CalendarInput
                    value={getFieldProps("dateRange").value}
                    onChange={value =>
                      setFieldValue("dateRange", value.selection)
                    }
                  />
                </div>
              )}
              {step === STEPS.LOCATION && <SelectCountry name="location" />}
              {step === STEPS.INFO && (
                <div className="flex flex-col gap-8">
                  <CounterInput
                    name="guestCount"
                    title="Guests"
                    subtitle="How many guests are coming?"
                  />
                  <hr />

                  <CounterInput
                    name="roomCount"
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                  />
                  <hr />
                  <CounterInput
                    name="bathroomCount"
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need?"
                  />
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      title="Filters"
      {...primaryBtnAttributes}
      {...secondaryBtnAttributes}
      body={bodyContent}
      onClose={() => {
        dispatch(onClose());
        setStep(STEPS.LOCATION);
      }}
    />
  );
};

export default SearchModal;
