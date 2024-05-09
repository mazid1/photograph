import { z } from "zod";
import { PhotoSchema } from "./Photo";

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterFlattenedErrors = z.inferFlattenedErrors<
  typeof RegisterSchema
>;

export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterDto = z.infer<typeof RegisterSchema>;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string().optional(),
  liked: z.record(z.string(), PhotoSchema),
});
export type User = z.infer<typeof UserSchema>;
