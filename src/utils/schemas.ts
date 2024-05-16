import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";


export const schemesRegistersExtended = z
  .object({
    fullname: z.string().min(2, {
      message: "Nama pengguna harus setidaknya 2 karakter.",
    }),
    type_gender: z.string().min(1, {
      message: "Jenis kelamin harus diisi.",
    }),
    age: z.string().nonempty({
      message: "Umur harus diisi.",
    }),
    status: z.string().min(1, {
      message: "Status harus diisi.",
    }),
    phone: z
      .string()
      .refine(isValidPhoneNumber, { message: "Nomor telepon tidak valid" }),
    provinsi: z.string().min(1, {
      message: "Provinsi harus diisi.",
    }),
    kota: z.string().min(1, {
      message: "Kota harus diisi.",
    }),
    kecamatan: z.string().min(1, {
      message: "Kecamatan harus diisi.",
    }),
    kelurahan: z.string().min(1, {
      message: "Kelurahan harus diisi.",
    }),
    email: z.string().email({
      message: "Silakan masukkan email yang valid.",
    }),
    password: z.string().min(6, {
      message: "Kata sandi harus setidaknya 6 karakter.",
    }),
    confirmPassword: z.string().min(6, { message: "Kata sandi tidak cocok" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Kata sandi tidak cocok",
  });