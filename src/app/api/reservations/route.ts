import { prisma } from "@/utils/prismadb";
import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  // if current user didn't exist
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      { error: "Please login first!" },
      { status: 500 }
    );
  }

  // get body
  const { listingId, startDate, endDate, totalPrice, authorId } =
    await req.json();

  // if current user === listing author
  if (currentUser.id === authorId) {
    return NextResponse.json(
      { error: "Can't reserve your own property!" },
      { status: 500 }
    );
  }

  try {
    const listingAndReservations = await prisma.listing.update({
      where: { id: listingId },
      data: {
        reservations: {
          //link and create reservation

          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    return NextResponse.json(listingAndReservations);
  } catch (error) {
    return NextResponse.error();
  }
}
