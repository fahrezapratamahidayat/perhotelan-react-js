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

export const schemasLoginExtended = z
  .object({
    email: z.string().email({
      message: "Silakan masukkan email yang valid.",
    }),
    password: z.string().min(6, {
      message: "Kata sandi harus setidaknya 6 karakter.",
    }),
  })

export const schemasReserveExtended = z.object({
  fullname: z.string().nonempty("Nama lengkap sesuai KTP diperlukan"),
  email: z.string().email("Email tidak valid").nonempty("Email diperlukan"),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Nomor telepon tidak valid" }),
  reservationFor: z.string().nonempty("Pilih untuk siapa anda memesan"),
  requests: z.string().optional(),
  checkInDate: z.date({
    required_error: "A date of birth is required.",
  }),
  // checkOutDate: z.date({
  //   required_error: "A date of birth is required.",
  // }),
  duration: z.string().min(1, "Durasi Menginap diperlukan"),
  guests: z.string().min(1, "Jumlah Tamu diperlukan"),
})


export const schemasCreateRoom  = z.object({
  namaKamar: z.string().min(1, "Nama kamar harus diisi."),
  descriptionKamar: z.string().min(1, "Deskripsi kamar harus diisi."),
  ukuranKamar: z.string().min(1, "Ukuran kamar harus diisi."),
  typeKamar: z.enum(["Standard", "Deluxe", "Suite", "Premium"]).refine(val => ["Standard", "Deluxe", "Suite", "Premium"].includes(val), { message: "Priority is required" }),
  diskonKamar: z.string().optional(),
  statusKamar: z.enum(["Tersedia", "TidakTersedia", "SedangDiperbaiki", "Dipesan", "Lainnya"]).refine(val => ["Tersedia", "TidakTersedia", "SedangDiperbaiki", "Dipesan", "Lainnya"].includes(val), { message: "Priority is required" }),
  images: z.array(z.instanceof(File)),
});