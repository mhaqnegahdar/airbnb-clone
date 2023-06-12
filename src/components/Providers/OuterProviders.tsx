"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ContainerProps } from "@/types";

const OuterProviders = ({ children }: ContainerProps) => {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
};

export default OuterProviders;
