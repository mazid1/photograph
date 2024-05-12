"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ErrorType } from "@/models/ResponseType";
import { User } from "@/models/User";
import { getStore } from "@netlify/blobs";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

type UpdateProfilePictureProps = {
  formData: FormData;
  fileName: string; // including extension
  type: string;
};

export async function updateProfilePicture({
  formData,
  fileName,
  type,
}: UpdateProfilePictureProps) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return {
      success: false,
      message: "Unauthorized",
      errorType: ErrorType.UNAUTHORIZED,
    };
  }

  const file = formData.get("image") as File;
  const arrayBuffer = await file.arrayBuffer();

  const currentUser = session.user as User;
  const profilePictureStore = getStore("profile-picture");

  // delete current profile picture
  if (currentUser.image) {
    await profilePictureStore.delete(currentUser.image.split("=")[1]);
  }

  // generate random id for new profile picture
  const randomId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  // save new profile picture
  await profilePictureStore.set(randomId, arrayBuffer, {
    metadata: { fileName, type },
  });

  const imageUrl = `/api/profile-picture?imageId=${randomId}`;

  const userStore = getStore("user");

  // update user with new profile picture
  const userWithMetadata = await userStore.getWithMetadata(currentUser.id, {
    type: "json",
  });
  const user = userWithMetadata?.data as User;
  await userStore.setJSON(
    currentUser.id,
    {
      ...user,
      image: imageUrl,
    },
    { metadata: { ...userWithMetadata?.metadata } }
  );

  revalidatePath("/profile", "page");

  return {
    success: true,
    message: "Profile picture updated",
    data: { url: imageUrl },
  };
}
