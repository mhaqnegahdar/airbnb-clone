"use client";

import { Toaster } from "react-hot-toast";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";

const InnerProviders = () => {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <Toaster position="top-center" />
    </>
  );
};

export default InnerProviders;
