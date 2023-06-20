"use client";

// Hooks/Packages
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";

// Components
import Container from "@/components/Container";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import { categories } from "@/components/navbar/Categories";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingReservation from "@/components/listings/ListingReservation";

//Types
import { ListingClientProps } from "@/types";
import { Range } from "react-date-range";

//Redux
import { useAppDispatch } from "@/redux/hooks";
import { onOpen } from "@/redux/modal/loginModalSlice";

//Variables
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
} as Range;

const ListingClient = ({
  listing,
  currentUser,
  reservations,
}: ListingClientProps) => {
  //Hooks
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Stete

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  //Actons

  // Get Reserved Dates
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations?.forEach(reservations => {
      const rang = eachDayOfInterval({
        start: new Date(reservations.startDate),
        end: new Date(reservations.endDate),
      });

      dates = [...dates, ...rang];
    });
    return dates;
  }, [reservations]);

  // Create Reservation
  const onCreateReservation = useCallback(() => {
    //Login if
    if (!currentUser) {
      dispatch(onOpen());
    }

    setIsSubmitting(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [
    dispatch,
    currentUser,
    dateRange.startDate,
    dateRange.endDate,
    totalPrice,
    listing?.id,
    router,
  ]);

  // Calculate Total pPrice
  useEffect(() => {
    if (dateRange.endDate && dateRange.startDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price]);

  //Get category By Lagel
  const category = useMemo(() => {
    return categories.find(item => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className=" max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            id={listing.id}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div
              className="order-first
                mb-10
                md:order-last
                md:col-span-3"
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={value => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isSubmitting}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
