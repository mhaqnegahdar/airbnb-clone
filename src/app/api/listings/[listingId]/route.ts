import { prisma } from "@/utils/prismadb";
import { ListingIdParams } from "@/types";
import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: ListingIdParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Please login first!" },
        { status: 500 }
      );
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      throw new Error(`Invalid listingID`);
    }

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    return NextResponse.error();
  }
}
