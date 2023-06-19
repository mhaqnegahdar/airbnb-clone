import { SafeListing, getListingByIdParams } from "@/types";
import { prisma } from "@/utils/prismadb";

export default async function getListingById(params: getListingByIdParams) {
  const { listingId } = params;

  try {
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    });

    //   if listing didn't exist
    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updateAt: listing.user.updateAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
