
import { type ClientUploadedFileData } from "uploadthing/types"
import { string } from "zod";

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> { }

export interface TypeProvinsi {
    id: number;
    name: string;
    code: string;
}


export interface TypeRooms {
    message: string;
    status_Code: number;
    data: Rooms[];
    currentPage: number;
    totalPage: number;
    totalRooms: number;
    limit: number;
}

export interface Rooms {
    idKamar: number;
    deskripsiKamar: string;
    namaKamar: string;
    ukuranKamar: string;
    hargaKamar: number;
    tipeKamar: "Standar" | "Deluxe" | "Suite" | "Premium";
    ratingKamar: number;
    diskonKamar: any;
    statusKamar: "Tersedia" | "TidakTersedia" | "SedangDiperbaiki" | "Dipesan" | "Lainnya";
    tanggalDibuat: string;
    tanggalDiupdate: string;
    Gambar: {
        idGambar: number;
        namaGambar: string;
        urlGambar: string;
        idKamar: number;
    }[];
}

export interface Image {
    idGambar: number;
    namaGambar: string;
    urlGambar: string;
    idKamar: number;
}


export interface detailRoom {
    idKamar: number;
    deskripsiKamar: string;
    namaKamar: string;
    ukuranKamar: string;
    hargaKamar: number;
    tipeKamar: "Standar" | "Deluxe" | "Suite" | "Premium";
    ratingKamar: number;
    diskonKamar: any;
    statusKamar: "Tersedia" | "TidakTersedia" | "SedangDiperbaiki" | "Dipesan" | "Lainnya";
    Gambar: Image[]
    Komentar: Komentar[]
}


export interface userData {
    idTamu: number;
    namaTamu: string;
    emailTamu: string;
    peranTamu: string;
    statusTamu: string;
    pekerjaan: string;
    tanggalDibuat: string;
    tanggalDiupdate: string;
    jenisKelamin: string;
    provinsi: string;
    kecamatan: string;
    kelurahan: string;
    kota: string;
    nomorTeleponTamu: string;
    umurTamu: number;
    exp: number;
    iat: number
}

export interface Resevasi {
    status: number;
    message: string;
    datas: reservasiTypes[];
}

export interface reservasiTypes {
    idReservasi: number;
    idKamar: number;
    idTamu: number;
    idPembayaran: number;
    tanggalCheckIn: any;
    tanggalCheckOut: any;
    durasiMenginap: number;
    statusReservasi: "Diterima" | "Dibatalkan" | "Dibayar" | "Dipesan";
    jenisReservasi: "Pemesanan" | "Reservasi" | "Booking";
    jumlahTamu: number;
    permintaanTamu: string;
    kamar: Kamar;
    tamu: Tamu;
    Pembayaran: Payment;
}
export interface Payment {
    idPembayaran: number;
    idTamu: number;
    idReservasi: number;
    jumlahBayar: number;
    tanggalBayar: string;
    batasWaktuBayar: string;
    metodePembayaran: string;
    statusPembayaran: string;
}

export interface Kamar {
    idKamar: number;
    deskripsiKamar: string;
    namaKamar: string;
    ukuranKamar: string;
    hargaKamar: number;
    tipeKamar: "Standar" | "Deluxe" | "Suite" | "Premium";
    ratingKamar: number;
    diskonKamar: any;
    statusKamar: "Tersedia" | "Tidak Tersedia" | "Sedang Diperbaiki" | "Dipesan" | "Lainnya";
    Gambar: Image[];
}

export interface Tamu {
    idTamu: number;
    namaTamu: string;
    emailTamu: string;
    peranTamu: string;
    statusTamu: string;
    pekerjaan: string;
    tanggalDibuat: string;
    tanggalDiupdate: string;
    jenisKelamin: string;
    provinsi: string;
    kecamatan: string;
    kelurahan: string;
    kota: string;
    nomorTeleponTamu: string;
    umurTamu: number;
    exp: number;
    iat: number
}

export type analytics = {
    totalPendapatan: number;
    totalPengguna: number;
    totalReservasi: number
    totalKamar: number
}


export type analyticsmonthly = {
    name: string;
    total: number;
}


export type Komentar = {
    idKomentar: number;
    idTamu: number;
    idKamar: number;
    TipeKomentar: "Kamar" | "Hotel"
    jumlahLike: number;
    Komentar: string;
    tanggalDibuat: any;
    tamu: {
        namaTamu: string
        kota: string;
        provinsi: string
    }
}

