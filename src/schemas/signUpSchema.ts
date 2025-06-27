import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least two characters")
  .max(20, "Username must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9]+$/, "Username must not contain special characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
