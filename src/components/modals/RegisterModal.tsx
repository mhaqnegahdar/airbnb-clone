"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import axios from "axios";
import Modal from "./Modal";
import { Formik, Form } from "formik";
import { registerSchema } from "@/utils/validationSchema";
import Input from "@/components/Input";
import { RegisterForm } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectIsOpen, onClose } from "@/redux/modal/registerModalSlice";
import Heading from "../Heading";
import toast from "react-hot-toast";
import Button from "../Button";

const RegisterModal = () => {
  // Redux
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formik Functionality
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values: RegisterForm) => {
    setIsSubmitting(true);

    // Password Confirm Check
    if (values.password !== values.confirmPassword) {
      toast.error("Password and its confirm doesn't match!");
      return;
    }
    // Register User
    axios
      .post("/api/register", values)
      .then((response) => {
        // OnSuccess
        if (response.status == 200) {
          toast.success("You registered successfully1");
          dispatch(onClose());
        }
      })
      .catch((error) => {
        //On Error
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Somthing went wrong");
        }
      })
      .finally(() => {
        //At the end
        setIsSubmitting(false);
      });
  };

  // Form Id
  const formId = "register_form";

  // Body
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subTitle="Create an account." />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={registerSchema}
        validateOnChange={false}
      >
        {({ errors, touched }) => {
          return (
            <Form id={formId}>
              <Input
                name="name"
                label="Name"
                error={touched.name && errors.name ? errors.name : undefined}
                disabled={isSubmitting}
              />
              <Input
                name="email"
                label="Email"
                error={touched.email && errors.email ? errors.email : undefined}
                type="email"
                disabled={isSubmitting}
              />
              <Input
                name="password"
                label="Password"
                error={
                  touched.password && errors.password
                    ? errors.password
                    : undefined
                }
                type="password"
                disabled={isSubmitting}
              />
              <Input
                name="confirmPassword"
                label="Confirm Password"
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : undefined
                }
                type="password"
                disabled={isSubmitting}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );

  // Footer
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
        btnType="button"
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
        btnType="button"
      />

      <div className="text-neutral-500 mt-4 font-light flex items-center justify-center gap-2">
        <div>Already have an account?</div>
        <button className="text-neutral-800 cursor-pointer hover:underline">
          Login
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={isSubmitting}
        isOpen={isOpen}
        title="Register"
        primaryBtnLabel="Continue"
        onClose={() => dispatch(onClose())}
        primaryBtnFormId={formId}
        primaryBtnType="submit"
        secondaryBtnFormId={formId}
        secondaryBtnType="reset"
        secondaryBtnLabel="Reset"
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;
