import getCurrentUser from "@/actions/getCurrentUser";
import { prisma } from "@/utils/prismadb";

//Types
import { ReservationIdParams } from "@/types";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: ReservationIdParams) {
  try {
    const currentUser = await getCurrentUser();
    // if user is not logged in
    if (!currentUser) {
      return NextResponse.json(
        { error: "Please login first!" },
        { status: 500 }
      );
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
      throw new Error(`Invalid ID`);
    }

    //delete reservation if author or reservator
    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    return NextResponse.error();
  }
}
