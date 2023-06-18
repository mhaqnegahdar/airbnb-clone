import getCurrentUser from "@/actions/getCurrentUser";
import { prisma } from "@/utils/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = await req.json();

  // Error response
  if (!currentUser) {
    return NextResponse.json(
      { message: "Not a valid request!" },
      { status: 500 }
    );
  }

  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });

    //Success Response
    if (listing) return NextResponse.json(listing, { status: 200 });
  } catch (error) {
    // Error Response
    console.log("Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
