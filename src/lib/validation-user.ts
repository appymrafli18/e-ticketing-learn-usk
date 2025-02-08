import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string().min(4, "Nama minimal 4 karakter"),
    username: z.string().min(4, "Username minimal 4 karakter"),
    password: z
      .string()
      .min(6, "Password minimal 6 karakter")
      .regex(/[A-Z]/, "Password harus mengandung huruf besar")
      .regex(/[a-z]/, "Password harus mengandung huruf kecil")
      .regex(/[0-9]/, "Password harus mengandung angka"),
    confirmPassword: z.string(),
    email: z.string().email(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });


