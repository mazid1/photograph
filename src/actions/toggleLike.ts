"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Photo } from "@/models/Photo";
import { User } from "@/models/User";
import { getStore } from "@netlify/blobs";
import { getServerSession } from "next-auth";

export async function toggleLike(photo: Photo) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const currentUser = session.user as User;

  const userStore = getStore("user");
  const userInDB: User = await userStore.get(currentUser.email, {
    type: "json",
  });

  let isAdded = false;

  if (userInDB.liked[photo.id]) {
    delete userInDB.liked[photo.id];
    isAdded = false;
  } else {
    userInDB.liked[photo.id] = photo;
    isAdded = true;
  }
  await userStore.setJSON(currentUser.email, userInDB);

  return {
    success: true,
    data: userInDB,
    message: isAdded ? "Added to favorites" : "Removed from favorites",
  };
}
