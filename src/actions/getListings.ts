import { prisma } from "@/utils/prismadb";

export default async function getListings() {
  try {
    // fetch all the listings
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
