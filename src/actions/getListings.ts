import { prisma } from "@/utils/prismadb";

export default async function getListings() {
  try {
    // fetch all the listings
    const listings = await prisma.listing.findMany({
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
