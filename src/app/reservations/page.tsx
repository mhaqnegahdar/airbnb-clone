//Components
import EmptyState from "@/components/EmptyState";

//Actions
import getReservations from "@/actions/getReservations";
import getCurrentUser from "@/actions/getCurrentUser";
import ReservationsClient from "./ReservationsClient";

//Types

const page = async () => {
  const currentUser = await getCurrentUser();

  // if user is logged out
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  // if there was no reservations
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservation found"
        subtitle="Looks like you have no reservations on your properties"
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );

  return <div>page</div>;
};

export default page;
