import { prisma } from "@/utils/prismadb";
import { getListingsParams } from "@/types";

export default async function getListings(params: getListingsParams) {
  try {
    const {
      userId,
      bathroomCount,
      guestCount,
      category,
      roomCount,
      startDate,
      endDate,
      locationValue,
    } = params;

    // Generate a query to search for
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }
    if (category) {
      query.category = category;
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                endDate: { gte: endDate },
                startDate: { lte: endDate },
              },
            ],
          },
        },
      };
    }

    // fetch all the listings
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
