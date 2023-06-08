import "./globals.css";
import { Nunito } from "next/font/google";
import NavBar from "@/components/navbar/Navbar";
import { ContainerProps } from "@/types";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Practical Airbnb Clone",
};

export default function RootLayout({ children }: ContainerProps) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
