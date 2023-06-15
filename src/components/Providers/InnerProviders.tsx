"use client";

import { Toaster } from "react-hot-toast";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import RentModal from "../modals/RentModal";

const InnerProviders = () => {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <RentModal />
      <Toaster position="top-center" />
    </>
  );
};

export default InnerProviders;
