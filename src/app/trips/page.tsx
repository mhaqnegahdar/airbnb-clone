//Actions
import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";

//Components
import EmptyState from "@/components/EmptyState";
import TripsClient from "./TripsClient";

const Trips = async () => {
  const currentUser = await getCurrentUser();

  //if user is not logged in
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login first!" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  // If reservation is empty
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't reserved any trips!"
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default Trips;
