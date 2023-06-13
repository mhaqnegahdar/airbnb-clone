"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => {
        router.push("/");
      }}
      alt="Airbnb"
      className="hidden cursor-pointer md:block"
      height={100}
      width={100}
      src={`/images/logo.png`}
    />
  );
};

export default Logo;
