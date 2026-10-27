import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Email is required.")
    .email("Please enter a valid email address."),

  password: z.string().nonempty("Password is required."),
});

export const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .nonempty("Email is required.")
      .email("Please enter a valid email address."),

    password: z
      .string()
      .min(6, "Password must contain at least 6 characters.")
      .regex(/[A-Za-z]/, "Password must contain at least one letter.")
      .regex(
        /[^A-Za-z0-9\s]/,
        "Password must contain at least one special character.",
      ),

    confirmPassword: z.string().nonempty("Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;

export type RegisterFormValues = z.infer<typeof registerSchema>;
