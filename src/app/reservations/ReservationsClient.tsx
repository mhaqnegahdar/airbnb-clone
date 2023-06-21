"use client";

//Hooks/Packages
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

//Components
import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";
import Heading from "@/components/Heading";

//Types
import { ReservationsClientProps } from "@/types";

const ReservationsClient = ({
  reservations,
  currentUser,
}: ReservationsClientProps) => {
  //State
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  //Actions
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch(error => {
          if(error?.response?.data?.error)
        toast.error(error?.response?.data?.error);
        else
        toast.error("Something went wrong!");
        })
        .finally(() => setDeletingId(""));
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Reservations" subTitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
        {reservations.map(reservation => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
