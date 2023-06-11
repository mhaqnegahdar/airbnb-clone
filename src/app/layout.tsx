"use client";
import "./globals.css";
import { Nunito } from "next/font/google";
import { ContainerProps } from "@/types";
import NavBar from "@/components/navbar/NavBar";
import { Provider } from "react-redux";
import store from "@/redux/store";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/components/Providers/ToasterProvider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Practical Airbnb Clone",
};

export default function RootLayout({ children }: ContainerProps) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={nunito.className} suppressHydrationWarning={true}>
          <RegisterModal />
          <NavBar />
          {children}
          <ToasterProvider />
        </body>
      </Provider>
    </html>
  );
}
