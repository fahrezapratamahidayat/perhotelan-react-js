import { reservasiTypes } from "@/types";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, User2 } from "lucide-react";

interface ReservationsListProps {
  data: reservasiTypes;
  index: number;
}
export default function ReservationsList({
  data,
  index,
}: ReservationsListProps) {
  const navigate = useNavigate();
  const hariIni = new Date();
  const batasWaktuBayar = new Date(data.Pembayaran.batasWaktuBayar);
  const isExpired = batasWaktuBayar < hariIni;
  const isOverdue = batasWaktuBayar.getDate() > hariIni.getDate();
  return (
    <>
      <div className="flex flex-col gap-5 justify-start p-4 mb-10 rounded-lg lg:mx-10 lg:items-center lg:flex-row">
        <div className="w-full h-64 lg:w-72 lg:h-44 md:w-full md:h-80 sm:w-full sm:h-72">
          <img
            src={`${data.kamar.Gambar[0].urlGambar}`}
            alt={`Gambar ${data.kamar.namaKamar}`}
            className="object-cover w-full h-full rounded-md aspect-square"
          />
        </div>  
        <div className="flex flex-col">
          <div className="flex gap-1 items-center">
            <div className="flex gap-1 items-center">
              <h1 className="text-xl font-bold">{data.kamar.namaKamar}</h1>
              <span className="text-sm font-medium text-muted-foreground">
                {data.kamar?.tipeKamar ?? "Tipe tidak tersedia"}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Calendar className="w-4 h-4" />
            <span>Check in: </span>
            <span className="text-sm font-medium text-muted-foreground">
              {formatDate(data.tanggalCheckIn, "LLL dd, y")}
            </span>
            <span>Check out: </span>
            <span className="text-sm font-medium text-muted-foreground">
              {formatDate(data.tanggalCheckOut, "LLL dd, y")}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <Clock className="w-4 h-4" />
            <span>Durasi Menginap: </span>
            <span className="text-sm font-medium text-muted-foreground">
              {data.durasiMenginap} malam
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <User2 className="w-4 h-4" />
            <span>Jumlah Tamu: </span>
            <span className="text-sm font-medium text-muted-foreground">
              3 orang
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span>Total Pembayaran: </span>
            <span className="text-sm font-medium text-muted-foreground">
              Rp. {formatCurrency(data.Pembayaran.jumlahBayar)}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span>Status Pembayaran: </span>
            <span className="text-sm font-medium text-muted-foreground">
              {data.Pembayaran.statusPembayaran}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span>Status Pemesanan: </span>
            <span className="text-sm font-medium text-muted-foreground">
              {data.statusReservasi}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span>Batas Waktu Bayar: </span>
            <span className="text-sm font-medium text-muted-foreground">
              {formatDate(data.Pembayaran.batasWaktuBayar, "dd MMMM yyyy HH:mm")}
            </span>
          </div>
          <div className="flex flex-col gap-1 items-center mt-3 lg:hidden">
            {data.Pembayaran.statusPembayaran === "lunas" ? (
              <Button
                className="w-full text-white bg-success hover:bg-success/50"
                onClick={() => navigate(`/reservations/${data.idReservasi}`)}
              >
                Lihat Pesanan
              </Button>
            ) : (
              <Button
                className="w-full"
                variant={"outline"}
                onClick={() =>
                  navigate(
                    `/rooms/${data.idKamar}/reserve/payment?reservationId=${data.idReservasi}&paymentId=${data.idPembayaran}`
                  )
                }
              >
                bayar sekarang
              </Button>
            )}
            <Button className="w-full" variant={"destructive"}>
              Cancel Reservation
            </Button>
          </div>
        </div>
        <div className="hidden flex-col gap-3 lg:my-auto lg:ml-auto lg:flex">
          {data.Pembayaran.statusPembayaran === "lunas"  ? (
            <Button
              className="w-full text-white bg-success hover:bg-success/50"
              onClick={() => navigate(`/reservations/${data.idReservasi}`)}
            >
              Lihat Pesanan
            </Button>
          ) : (
            <Button
              className="w-full"
              onClick={() =>
                navigate(
                  `/rooms/${data.idKamar}/reserve/payment?reservationId=${data.idReservasi}&paymentId=${data.idPembayaran}`
                )
              }
            >
              bayar sekarang
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
