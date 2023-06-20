"use client";
// Hooks
import { useMemo, useState, useRef, useCallback } from "react";
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
import { Formik, Form, FormikProps } from "formik";
import { RentSchema } from "@/utils/validationSchema";
import SelectCountry from "../inputs/SelectCountry";
import CounterInput from "../inputs/CounterInput";
import UploadImageInput from "../inputs/UploadImageInput";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  // Hooks
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<FormikProps<RentForm>>(null);
  const router = useRouter();

  //   Actions
  const checkStepError = async (step: STEPS) => {
    switch (step) {
      case STEPS.CATEGORY:
        await formRef.current?.validateField("category");
        await formRef.current?.setFieldTouched("category");
        return formRef.current?.errors.category ? true : false;
      case STEPS.LOCATION:
        await formRef.current?.validateField("location");
        await formRef.current?.setFieldTouched("location");
        return formRef.current?.errors.location ? true : false;
      case STEPS.IMAGES:
        await formRef.current?.validateField("imageSrc");
        await formRef.current?.setFieldTouched("imageSrc");
        return formRef.current?.errors.imageSrc ? true : false;
      case STEPS.DESCRIPTION:
        await formRef.current?.validateField("title");
        await formRef.current?.validateField("description");
        await formRef.current?.setTouched({ title: true, description: true });
        return formRef.current?.errors.title ||
          formRef.current?.errors.description
          ? true
          : false;

      default:
        return false;
    }
  };

  const onBack = useCallback(() => {
    setStep(val => val - 1);
  }, []);

  const onNext = useCallback(async () => {
    let stepError = await checkStepError(step);
    if (!stepError) {
      setStep(val => val + 1);
    }
  }, [step]);

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
  }, [step, onNext]);

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
  }, [step, onBack]);

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
  const onSubmit = async (values: RentForm) => {
    setIsSubmitting(true);

    axios
      .post(`/api/listings`, values)
      .then(response => {
        if (response.status == 200) {
          toast.success("Listing Created!");
          router.push("/");
          setStep(STEPS.CATEGORY);
          formRef.current?.resetForm();
          dispatch(onClose());
        }
      })
      .catch(error => {
        toast.error("Somthing went wrong!");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  //   Body Content
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading {...stepHeading} />
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={RentSchema}
      >
        {({ setFieldValue }) => {
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
              {step === STEPS.DESCRIPTION && (
                <div className="flex flex-col gap-8">
                  <Input name="title" label="Title" />
                  <hr />
                  <Input name="description" label="Description" />
                </div>
              )}
              {step === STEPS.PRICE && (
                <Input name="price" label="Price" formatPrice />
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
      onClose={() => {
        dispatch(onClose());
        setStep(STEPS.CATEGORY);
      }}
      title="Airbnb your home!"
      body={bodyContent}
      disabled={isSubmitting}
      {...primaryBtnAttributes}
      {...secondaryBtnAttributes}
    />
  );
};

export default RentModal;
