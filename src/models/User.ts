import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const RegisterSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterFlattenedErrors = z.inferFlattenedErrors<
  typeof RegisterSchema
>;

export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterDto = z.infer<typeof RegisterSchema>;

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string().optional(),
});
export type User = z.infer<typeof UserSchema>;
