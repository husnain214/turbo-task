import * as z from "zod";

export const signupSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.email("Email is invalid").nonempty("Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("Email is invalid").nonempty("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
