import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { addHours, format } from "date-fns";

interface DataReserveProps {
  data: {
    fullname: string;
    email: string;
    phone: string;
    checkInDate: string;
    checkOutDate: string;
    duration: string;
    guests: string;
    requests: string;
  };
  onClose: () => void;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
export function DialogDataReserve({
  data,
  onClose,
  open,
  onConfirm,
  onCancel,
}: DataReserveProps) {
  if(!open) return
  const formattedCheckInDate = format(
    new Date(data.checkInDate),
    "dd MMMM yyyy"
  );
  function calculateCheckOutDate(checkInDate: Date, duration: number): Date {
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkInDate.getDate() + duration);
    checkOutDate.setHours(11, 0, 0, 0);
    return checkOutDate;
  }
  const checkOutDate = calculateCheckOutDate(
    new Date(data.checkInDate),
    parseInt(data.duration)
  );
const paymentDeadline = addHours(new Date(data.checkInDate), -24);
const formattedPaymentDeadline = format(paymentDeadline, "dd MMMM yyyy HH:mm");
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg px-5 py-4 rounded-lg">
        <DialogHeader className="flex items-center">
          <DialogTitle>Detail Reservasi</DialogTitle>
          <DialogDescription>
            Jika Data Reservasi Sudah Sesuai Silahkan Konfirmasi
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 text-sm font-semibold">
            <span>Nama Lengkap</span>
            <span>{data.fullname}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm font-semibold">
            <span>Email</span>
            <span>{data.email}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm font-semibold">
            <span>Nomer Handphone</span>
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm font-semibold">
            <span>Check in</span>
            <span>{formattedCheckInDate}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm font-semibold">
            <span>Durasi Menginap</span>
            <span>{data.duration}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm font-semibold">
            <span>Check out</span>
            <span>{format(checkOutDate, "dd MMMM yyyy")}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm font-semibold">
            <span>Jumlah Tamu</span>
            <span>{data.guests}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button type="submit" onClick={onConfirm}>
            Konfirmasi
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Batal
          </Button>
        </div>
        <DialogFooter>
          <p className="text-red-500">
            Harap melakukan pembayaran sebelum tanggal{" "}
            {formattedPaymentDeadline} untuk menghindari pembatalan reservasi.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
