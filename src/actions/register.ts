"use server";
import { ErrorType, ResponseType } from "@/models/ResponseType";
import { RegisterDto, RegisterSchema, User } from "@/models/User";
import { hash } from "bcrypt";
import { getStore } from "@netlify/blobs";

export default async function register(
  registerDto: RegisterDto
): Promise<ResponseType<User>> {
  const parsedData = RegisterSchema.safeParse(registerDto);

  if (!parsedData.success) {
    const flatErrors = parsedData.error.flatten();
    return {
      success: false,
      error: flatErrors.fieldErrors,
      errorType: ErrorType.FORM_ERROR,
    };
  }

  const { email, name, password } = parsedData.data;

  const userStore = getStore("user");
  const userInDB = await userStore.get(email, { type: "json" });

  if (userInDB) {
    return {
      success: false,
      error: { email: ["Email already exists"] },
      errorType: ErrorType.FORM_ERROR,
    };
  }

  const passwordHash = await hash(password, 10);
  const newUser = { name, email, password: passwordHash };
  await userStore.setJSON(email, { ...newUser, id: email });

  return { success: true, data: { ...newUser, password: undefined } };
}
