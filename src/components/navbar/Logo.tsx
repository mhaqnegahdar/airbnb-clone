import Image from "next/image";

const Logo = () => {
  return (
    <Image
      alt="Airbnb"
      className="hidden cursor-pointer md:block"
      height={100}
      width={100}
      src={`/images/logo.png`}
    />
  );
};

export default Logo;
