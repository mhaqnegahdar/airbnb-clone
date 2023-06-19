import { ListingIdParams } from "@/types";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import { prisma } from "@/utils/prismadb";

export async function POST(req: Request, { params }: ListingIdParams) {
  const currentUser = await getCurrentUser();

  try {
    //Check  existance of current user
    if (!currentUser) return NextResponse.error();

    const { listingId } = params;

    // Check if listing id is valid
    if (!listingId || typeof listingId !== "string")
      throw new Error("Invalid listing id");

    // Add listing id to favoriteIds list
    let favoriteIds = [...(currentUser?.favoriteIds || [])];

    favoriteIds.push(listingId);

    //Update favoriteIds
    const user = await prisma.user.update({
      where: { id: currentUser?.id },
      data: { favoriteIds },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

export async function DELETE(req: Request, { params }: ListingIdParams) {
  const currentUser = await getCurrentUser();

  try {
    //Check  existance of current user
    if (!currentUser) return NextResponse.error();

    const { listingId } = params;

    // Check if listing id is valid
    if (!listingId || typeof listingId !== "string")
      throw new Error("Invalid listing id");

    // Delete listing id to favoriteIds list
    let favoriteIds = [...(currentUser?.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    //Update favoriteIds
    const user = await prisma.user.update({
      where: { id: currentUser?.id },
      data: { favoriteIds },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
