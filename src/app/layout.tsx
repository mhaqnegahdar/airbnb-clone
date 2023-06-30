import "./globals.css";
import { Nunito } from "next/font/google";

//Components
import NavBar from "@/components/navbar/NavBar";
import OuterProviders from "@/components/Providers/OuterProviders";
import InnerProviders from "@/components/Providers/InnerProviders";
import Footer from "@/components/Footer";
//Actons
import getCurrentUser from "@/actions/getCurrentUser";
//Types
import { ContainerProps } from "@/types";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Practical Airbnb Clone",
};

export default async function RootLayout({ children }: ContainerProps) {
  const currentUser = await getCurrentUser();

  return (
    <OuterProviders>
      <html lang="en">
        <body
          className={`${nunito.className} flex flex-col min-h-screen `}
          suppressHydrationWarning={true}
        >
          <NavBar currentUser={currentUser} />
          <div className="pb-20 pt-28">{children}</div>
          <InnerProviders />
          <Footer />
        </body>
      </html>
    </OuterProviders>
  );
}
