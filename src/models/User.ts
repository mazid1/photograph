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
  confirmPassword: z.string(),
});

export type RegisterFlattenedErrors = z.inferFlattenedErrors<
  typeof RegisterSchema
>;

export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterDto = z.infer<typeof RegisterSchema>;

export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().optional(),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

export const UserSchema = UserProfileSchema.extend({
  password: z.string().optional(),
  liked: z.record(z.string(), PhotoSchema),
});
export type User = z.infer<typeof UserSchema>;

export const UserMetadataSchema = z.object({
  createdAt: z.string().datetime(),
  passwordUpdatedAt: z.string().datetime(),
});
export type UserMetadata = z.infer<typeof UserMetadataSchema>;

export const ChangePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
});
export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
