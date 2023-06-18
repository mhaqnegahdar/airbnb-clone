"use client";
// Hooks
import { useMemo, useState } from "react";
// Redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { onClose, selectIsOpen } from "@/redux/modal/rentModalSlice";
// Components
import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import RadioInput from "../inputs/RadioInput";
// Types
import {
  PrimaryBtnAttributes,
  RentForm,
  RentModalSteps as STEPS,
  SecondaryBtnAttributes,
} from "@/types";
// Libraries
import { Formik, Form, ErrorMessage } from "formik";
import { RentSchema } from "@/utils/validationSchema";
import SelectCountry from "../inputs/SelectCountry";
import CounterInput from "../inputs/CounterInput";
import UploadImageInput from "../inputs/UploadImageInput";

// variables
// Form Initials
const formId = "rent_form";

const initialValues: RentForm = {
  category: "",
  location: null,
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  imageSrc: "",
  price: 1,
  title: "",
  description: "",
};

const RentModal = () => {
  // State
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);
  const [step, setStep] = useState(STEPS.CATEGORY);

  //   Actions
  const onBack = () => {
    setStep((val) => val - 1);
  };
  const onNext = () => {
    setStep((val) => val + 1);
  };

  const primaryBtnAttributes: PrimaryBtnAttributes = useMemo(() => {
    if (step === STEPS.PRICE) {
      return {
        primaryBtnType: "submit",
        primaryBtnFormId: formId,
        primaryBtnLabel: "Create",
      };
    }
    return {
      primaryBtnType: "button",
      primaryBtnAction: onNext,
      primaryBtnLabel: "Next",
    };
  }, [step]);

  const secondaryBtnAttributes: SecondaryBtnAttributes = useMemo(() => {
    let btnAction = undefined;
    if (step !== STEPS.CATEGORY) {
      btnAction = onBack;
    }

    return {
      secondaryBtnType: "button",
      secondaryBtnLabel: "Back",
      secondaryBtnAction: btnAction,
    };
  }, [step]);

  const stepHeading = useMemo(() => {
    switch (step) {
      case STEPS.CATEGORY:
        return {
          title: "Which of these best describes your place?",
          subTitle: "Pick a category",
        };
      case STEPS.PRICE:
        return {
          title: "Now, set your price",
          subTitle: "How much do you charge per night?",
        };
      case STEPS.LOCATION:
        return {
          title: "Where is your place located?",
          subTitle: "Help guests find you!",
        };
      case STEPS.INFO:
        return {
          title: "Share some basics about your place",
          subTitle: "What amenitis do you have?",
        };
      case STEPS.IMAGES:
        return {
          title: "Add a photo of your place",
          subTitle: "Show guests what your place looks like!",
        };
      case STEPS.DESCRIPTION:
        return {
          title: "How would you describe your place?",
          subTitle: "Short and sweet works best!",
        };
    }
  }, [step]);

  // Form Submit
  const onSubmit = (values: RentForm) => {
    console.log(values);
  };

  //   Body Content
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading {...stepHeading} />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={RentSchema}
      >
        {({setFieldValue}) => {
          return (
            <Form id={formId}>
              {step === STEPS.CATEGORY && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto ">
                  <RadioInput
                    name="category"
                    label="Category"
                    options={categories}
                  />
                </div>
              )}
              {step === STEPS.LOCATION && <SelectCountry name="location" />}
              {step === STEPS.INFO && (
                <div className="flex flex-col gap-8">
                  <CounterInput
                    name="guestCount"
                    title="Guests"
                    subtitle="How many guests do you allow?"
                  />
                  <hr />

                  <CounterInput
                    name="roomCount"
                    title="Rooms"
                    subtitle="How many rooms do you have?"
                  />
                  <hr />
                  <CounterInput
                    name="bathroomCount"
                    title="Bathrooms"
                    subtitle="How many bathrooms do you have?"
                  />
                </div>
              )}

              {step === STEPS.IMAGES && <UploadImageInput name="imageSrc" />}
              {step === STEPS.DESCRIPTION && <div>Descreption</div>}
              {step === STEPS.PRICE && <div>Price</div>}
              <ErrorMessage
                name="category"
                component={"p"}
                className="text-red-500"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => dispatch(onClose())}
      title="Airbnb your home!"
      body={bodyContent}
      {...primaryBtnAttributes}
      {...secondaryBtnAttributes}
    />
  );
};

export default RentModal;
