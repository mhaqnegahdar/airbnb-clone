import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/utils/prismadb";

// Get Session
export async function getSession() {
  return await getServerSession(authOptions);
}

// Get Current User
export default async function getCurrentUser() {
  try {
    const session = await getSession();

    // If Unauthurized
    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    // If User Didn't Exists
    if (!currentUser) return null;

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updateAt: currentUser.updateAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    return null;
  }
}
