import z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be contain at least 2 character.")
    .max(255),
  surname: z
    .string()
    .min(2, "Surname must contain be at least 2 characters.")
    .max(255),
  email: z.string().email("Invalid email address."),
  password: z
    .string()
    .min(6, "Password must be contain at least 6 characters.")
    .max(255),
});
