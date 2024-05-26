import { reservasiTypes } from "@/types";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

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
  const batasWaktuBayar = new Date(data.Payment.batasWaktuBayar);
  const isExpired = batasWaktuBayar < hariIni;
  const isOverdue = batasWaktuBayar.getDate() > hariIni.getDate();
  return (
    <>
      <div className="flex flex-col justify-start gap-5 mx-10 mb-10 lg:items-center lg:flex-row">
        <div className="w-full h-64 lg:w-72 lg:h-44 md:w-full md:h-80 sm:w-full sm:h-72">
          <img
            src={`${data.kamar.images[0].url}`}
            alt={`Gambar ${data.kamar.namaKamar}`}
            className="object-cover w-full h-full rounded-md aspect-square"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-semibold">{index + 1}.</h1>
            <div className="flex items-center gap-1">
              <h1 className="text-xl font-bold">{data.kamar.namaKamar}</h1>
              <span className="text-sm font-medium text-muted-foreground">
                {data.kamar?.typeKamar ?? "Tipe tidak tersedia"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>Check in: </span>
            <span className="text-sm font-medium text-muted-foreground">
              {formatDate(data.tanggalCheckIn, "LLL dd, y")}
            </span>
            <span>Check out: </span>
            <span className="text-sm font-medium text-muted-foreground">
              {formatDate(data.tanggalCheckOut, "LLL dd, y")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>Durasi Menginap: </span>
            <span className="text-sm font-medium text-muted-foreground">
              {data.durasiMenginap} malam
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>Jumlah Tamu: </span>
            <span className="text-sm font-medium text-muted-foreground">
              3 orang
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>Status Pembayaran: </span>
            <span className="text-sm font-medium text-muted-foreground">
              {data.Payment.statusPembayaran}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>Status Pemesanan: </span>
            <span className="text-sm font-medium text-muted-foreground">
              {data.statusReservasi}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>Batas Waktu Bayar: </span>
            <span className="text-sm font-medium text-muted-foreground">
              {formatDate(data.Payment.batasWaktuBayar, "dd MMMM yyyy HH:mm")}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 mt-3 lg:hidden">
            {data.Payment.statusPembayaran === "lunas" && !isOverdue ? (
              <Button
                className="w-full"
                variant={"outline"}
                onClick={() => navigate(`/reservations/${data.reservationId}`)}
              >
                Lihat Pesanan
              </Button>
            ) : (
              <Button
                className="w-full"
                variant={"outline"}
                onClick={() =>
                  navigate(
                    `/rooms/${data.noKamar}/reserve/payment?reservationId=${data.reservationId}&paymentId=${data.noPayment}`
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
        <div className="flex-col hidden gap-3 lg:my-auto lg:ml-auto lg:flex">
          {data.Payment.statusPembayaran === "lunas" && !isOverdue ? (
            <Button
              className="w-full"
              variant={"outline"}
              onClick={() => navigate(`/reservations/${data.reservationId}`)}
            >
              Lihat Pesanan
            </Button>
          ) : (
            <Button
              className="w-full"
              variant={"outline"}
              onClick={() =>
                navigate(
                  `/rooms/${data.noKamar}/reserve/payment?reservationId=${data.reservationId}&paymentId=${data.noPayment}`
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
