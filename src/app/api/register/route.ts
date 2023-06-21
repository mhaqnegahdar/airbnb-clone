import { prisma } from "@/utils/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, name, password } = await req.json();

  try {
    //    Check User Exists
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExists) {
      // error response
      return NextResponse.json(
        { error: "User already exists!" },
        { status: 500 }
      );
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create User
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    // Success Response
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register user!" },
      { status: 500 }
    );
  }
}
