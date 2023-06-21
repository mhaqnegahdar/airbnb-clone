//Component
import EmptyState from "@/components/EmptyState";
//Actions
import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import PropertiesClient from "./PropertiesClient";
const Properties = async () => {
  const currentUser = await getCurrentUser();

  //if user is not logged in
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login first!" />;
  }

  const listings = await getListings({userId:currentUser.id});

  //if user has no Properties
  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found!"
        subtitle="Looks like you have no properties"
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default Properties;
