"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ErrorType } from "@/models/ResponseType";
import { User } from "@/models/User";
import { getStore } from "@netlify/blobs";
import { getServerSession } from "next-auth";

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
  console.log("File", file);
  const arrayBuffer = await file.arrayBuffer();

  const currentUser = session.user as User;
  const profilePictureStore = getStore("profile-picture");
  await profilePictureStore.set(currentUser.id, arrayBuffer, {
    metadata: { fileName, type },
  });

  const imageUrl = `/api/profile-picture?userId=${currentUser.id}`;

  const userStore = getStore("user");
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

  return {
    success: true,
    message: "Profile picture updated",
    data: { url: imageUrl },
  };
}
