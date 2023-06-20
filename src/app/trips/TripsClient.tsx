"use client";

//Hooks/Packages
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/components/Heading";
import axios from "axios";

//Components
import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";

//Types
import { TripsClientProps } from "@/types";
import { toast } from "react-hot-toast";

const TripsClient = ({ reservations, currentUser }: TripsClientProps) => {
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
          toast.error(error?.response?.data?.error);
        })
        .finally(() => setDeletingId(""));
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Trips"
        subTitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map(reservation => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
