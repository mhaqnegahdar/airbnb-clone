"use client";

//Hooks
import useCountries from "@/hooks/useCountries";

// Types
import { ListingInfoPropst } from "@/types";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import Map from "../Map";

const ListingInfo = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}: ListingInfoPropst) => {
  const { getByValue } = useCountries();

  const cordinates = getByValue(locationValue)?.latlang;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr/>
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={cordinates} />
    </div>
  );
};

export default ListingInfo;
