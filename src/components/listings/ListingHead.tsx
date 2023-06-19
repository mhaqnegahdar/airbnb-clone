"use client";

//hooks
import Image from "next/image";
// date
import useCountries from "@/hooks/useCountries";
//Types
import { ListingHeadProps } from "@/types";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

const ListingHead = ({
  title,
  locationValue,
  id,
  imageSrc,
  currentUser,
}: ListingHeadProps) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subTitle={`${location?.region}, ${location?.label}`}
      />
      <figure className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </figure>
    </>
  );
};

export default ListingHead;
