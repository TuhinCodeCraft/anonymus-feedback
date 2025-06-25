import { z } from "zod";

export const signInSchema = z.object({
    identifier: z.string(), // identifier can be an email or username it's an important keyword in production
    password: z.string()
})