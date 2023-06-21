"use client";
//Hooks/Packages
import { BiSearch } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";
import useCountries from "@/hooks/useCountries";
import { useMemo } from "react";

//Redux
import { useAppDispatch } from "@/redux/hooks";
import { onOpen } from "@/redux/modal/searchModalSlice";

const Search = () => {
  //Hooks
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  //Variables

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  //Labels
  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [locationValue, getByValue]);

  const durationalLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      let diff = differenceInCalendarDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={() => dispatch(onOpen())}
      className=" rounded-full border-[1px] w-full md:w-auto py-2 shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <p className="px-6 text-sm font-semibold ">{locationLabel}</p>
        <p className="px-6 text-sm font-semibold hidden sm:block flex-1 border-x-[1px]">
          {durationalLabel}
        </p>
        <div className="flex gap-3 flex-row text-sm text-gray-600 items-center pl-6 pr-2">
          <p className="hidden sm:block">{guestLabel}</p>
          <div className="rounded-full p-2 bg-rose-500 text-white ">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
