"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ErrorType, ResponseType } from "@/models/ResponseType";
import { User } from "@/models/User";
import { getStore } from "@netlify/blobs";
import { getServerSession } from "next-auth";

export async function getLikedPhotos(): Promise<ResponseType<User["liked"]>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
      errorType: ErrorType.UNAUTHORIZED,
    };
  }

  const currentUser = session.user as User;

  const userStore = getStore("user");
  const userInDB: User = await userStore.get(currentUser.email, {
    type: "json",
  });

  return {
    success: true,
    data: userInDB.liked,
  };
}
