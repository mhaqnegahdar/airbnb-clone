import getListingById from "@/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import { ListingIdParams } from "@/types";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/actions/getCurrentUser";

const ListingSingle = async ({ params }: ListingIdParams) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return <ListingClient listing={listing} currentUser={currentUser} />;
};

export default ListingSingle;
