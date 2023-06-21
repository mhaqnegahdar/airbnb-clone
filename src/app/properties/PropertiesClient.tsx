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
import { PropertiesClientProps } from "@/types";

const PropertiesClient = ({ listings, currentUser }: PropertiesClientProps) => {
  //State
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  //Actions
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Property deleted");
          router.refresh();
        })
        .catch(error => {
          if (error?.response?.data?.error)
            toast.error(error?.response?.data?.error);
          else toast.error("Something went wrong!");
        })
        .finally(() => setDeletingId(""));
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Properties" subTitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
