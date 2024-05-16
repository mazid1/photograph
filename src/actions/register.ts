"use server";
import { ErrorType, ResponseType } from "@/models/ResponseType";
import { RegisterDto, RegisterSchema, User, UserMetadata } from "@/models/User";
import { hash } from "bcrypt";
import { getStore } from "@netlify/blobs";
import { StoreType } from "./type";

export default async function register(
  prevState: ResponseType<RegisterDto, never>,
  formData: FormData
): Promise<ResponseType<RegisterDto, never>> {
  const registerDto: RegisterDto = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };
  const parsedData = RegisterSchema.safeParse(registerDto);

  if (!parsedData.success) {
    const flatErrors = parsedData.error.flatten();
    return {
      success: false,
      error: flatErrors.fieldErrors,
      errorType: ErrorType.FORM_ERROR,
    };
  }

  const { email, name, password, confirmPassword } = parsedData.data;

  if (password !== confirmPassword) {
    return {
      success: false,
      error: { confirmPassword: ["Passwords do not match"] },
      errorType: ErrorType.FORM_ERROR,
    };
  }

  const userStore = getStore(StoreType.USER);
  const userInDB = await userStore.get(email, { type: "json" });

  if (userInDB) {
    return {
      success: false,
      error: { email: ["Email already exists"] },
      errorType: ErrorType.FORM_ERROR,
    };
  }

  const passwordHash = await hash(password, 10);
  const newUser: User = {
    id: email,
    name,
    email,
    password: passwordHash,
    liked: {},
  };
  const userMetadata: UserMetadata = {
    createdAt: new Date().toISOString(),
    passwordUpdatedAt: new Date().toISOString(),
  };
  await userStore.setJSON(email, newUser, { metadata: userMetadata });

  return {
    success: true,
    message: "User registered successfully",
  };
}
