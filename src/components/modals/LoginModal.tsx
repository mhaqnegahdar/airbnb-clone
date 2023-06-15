"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/utils/validationSchema";
import toast from "react-hot-toast";

import { signIn, useSession } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { Formik, Form } from "formik";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectIsOpen, onClose } from "@/redux/modal/loginModalSlice";
import { onOpen } from "@/redux/modal/registerModalSlice";

import { LoginForm } from "@/types";
import Input from "@/components/inputs/Input";
import Modal from "./Modal";
import Heading from "../Heading";
import Button from "../Button";

const LoginModal = () => {
  // Redux
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);

  //   Router
  const router = useRouter();

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession();

  // Formik Functionality
  const initialValues = {
    email: "",
    password: "",
  };

  // Handle Register Toggle
  const toggle = useCallback(() => {
    dispatch(onClose()); //Close Login Modal
    dispatch(onOpen()); //Open Register Modal
  }, [dispatch]);

  const onSubmit = async (values: LoginForm) => {
    setIsSubmitting(true);

    signIn("credentials", { ...values, redirect: false }).then((callback) => {
      setIsSubmitting(false);

      if (callback?.ok && status === "authenticated") {
        toast.success("Logged in successfully!");
        router.refresh();
        dispatch(onClose());
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });

    // Login User
  };

  // Form Id
  const formId = "login_form";

  // Body
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back!" subTitle="Login your account." />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
        validateOnChange={false}
      >
        {({ errors, touched }) => {
          return (
            <Form id={formId}>
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
        onClick={() => {
          signIn("google");
        }}
        btnType="button"
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {
          signIn("github");
        }}
        btnType="button"
      />

      <div className="text-neutral-500 mt-4 font-light flex items-center justify-center gap-2">
        <div>First time using Airbnb?</div>
        <button
          className="text-neutral-800 cursor-pointer hover:underline"
          onClick={() => toggle()}
        >
          Create an account
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={isSubmitting}
        isOpen={isOpen}
        title="Login"
        primaryBtnLabel="Login"
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

export default LoginModal;
