//Actions
import getListingById from "@/actions/getListingById";
import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
//Components
import ListingClient from "./ListingClient";
import EmptyState from "@/components/EmptyState";
//Types
import { ListingIdParams } from "@/types";

const ListingSingle = async ({ params }: ListingIdParams) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default ListingSingle;
