//Component
import EmptyState from "@/components/EmptyState";
//Actions
import getCurrentUser from "@/actions/getCurrentUser";
import getFavoriteListings from "@/actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";
const Favorites = async () => {
  const currentUser = await getCurrentUser();

  //if user is not logged in
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login first!" />;
  }

  const listings = await getFavoriteListings();

  //if user has no favorites
  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found!"
        subtitle="Looks like you have no favorite listings"
      />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default Favorites;
