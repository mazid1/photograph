"use server";
import { ErrorType, ResponseType } from "@/models/ResponseType";
import {
  ChangePasswordDto,
  ChangePasswordSchema,
  User,
  UserMetadata,
} from "@/models/User";
import { compare, hash } from "bcrypt";
import { getStore } from "@netlify/blobs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { revalidatePath } from "next/cache";
import { StoreType } from "./type";

export default async function changePassword(
  prevState: ResponseType<ChangePasswordDto, UserMetadata>,
  formData: FormData
): Promise<ResponseType<ChangePasswordDto, UserMetadata>> {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return {
      success: false,
      message: "Unauthorized",
      errorType: ErrorType.UNAUTHORIZED,
    };
  }

  const currentUser = session.user as User;

  const changePasswordDto: ChangePasswordDto = {
    currentPassword: formData.get("currentPassword") as string,
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };
  const parsedData = ChangePasswordSchema.safeParse(changePasswordDto);

  if (!parsedData.success) {
    const flatErrors = parsedData.error.flatten();
    return {
      success: false,
      error: flatErrors.fieldErrors,
      errorType: ErrorType.FORM_ERROR,
    };
  }

  const { currentPassword, newPassword, confirmPassword } = parsedData.data;

  if (newPassword !== confirmPassword) {
    return {
      success: false,
      error: { confirmPassword: ["Passwords do not match"] },
      errorType: ErrorType.FORM_ERROR,
    };
  }

  const userStore = getStore(StoreType.USER);
  const userWithMetadata = await userStore.getWithMetadata(currentUser.email, {
    type: "json",
  });
  const userInDB = userWithMetadata?.data as User;
  const userMetadata = userWithMetadata?.metadata as UserMetadata;

  const isPasswordValid = await compare(currentPassword, userInDB.password!);
  if (!isPasswordValid) {
    return {
      success: false,
      error: { currentPassword: ["Incorrect password"] },
      errorType: ErrorType.FORM_ERROR,
    };
  }

  const passwordHash = await hash(newPassword, 10);
  userInDB.password = passwordHash;
  userMetadata.passwordUpdatedAt = new Date().toISOString();
  await userStore.setJSON(currentUser.email, userInDB, {
    metadata: userMetadata,
  });

  revalidatePath("/profile");
  return {
    success: true,
    message: "Password updated successfully",
  };
}
