import z from "zod";

export const loginSchema = z.object({
  email: z.email("Harap masukan email yang valid"),
  password: z.string().min(1, "Password harus diisi"),
});

export const registerSchema = z
  .object({
    email: z.email("Harap masukan email yang valid"),
    password: z.string().min(1, "Password harus diisi"),
    confirmPassword: z.string().min(1, "Konfirmasi password harus diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password harus sama",
    path: ["confirmPassword"],
  });
