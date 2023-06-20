import { prisma } from "@/utils/prismadb";
import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import { Reservation } from "@prisma/client";

export async function POST(req: Request) {
  // if current user didn't exist
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // get body
  const { listingId, startDate, endDate, totalPrice } = await req.json();

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
