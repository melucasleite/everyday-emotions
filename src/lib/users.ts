import { currentUser } from "@clerk/nextjs/server";

import prisma from "./prisma";

async function getOrCreateCurrentUser() {
  const ssoUser = await currentUser();
  if (!ssoUser) {
    throw new Error("User is not signed in.");
  }
  const ssoUserData = {
    ssoId: ssoUser.id,
    name: `${ssoUser.firstName} ${ssoUser.lastName}`,
    email: ssoUser.emailAddresses[0].emailAddress,
  };

  try {
    let user = await prisma.user.findUnique({
      where: { ssoId: ssoUser.id },
    });
    if (!user) {
      throw new Error("User not found.");
    }
    user = await prisma.user.update({
      where: { ssoId: ssoUser.id },
      data: ssoUserData,
    });
    return user;
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "User not found.") {
      const user = prisma.user.create({
        data: ssoUserData,
      });
      return user;
    } else {
      throw error;
    }
  }
}

export { getOrCreateCurrentUser };
