//Types
import { getReservationsParams } from "@/types";

// Hooks/Packages
import { prisma } from "@/utils/prismadb";
import { Reservation } from "@prisma/client";

export default async function getReservations(params: getReservationsParams) {
  try {
    //stract params
    const { listingId, userId, authorId } = params;

    // set query base on the given id
    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    // get all the reservations base on the given id
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // create safeReservations obj
    const safeReservations = reservations.map(reservation => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
