import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

interface DataReserveProps {
  data: any;
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
  console.log(data);
  const formattedCheckInDate = format(
    new Date(data.checkInDate),
    "dd MMMM yyyy"
  );
  function calculateCheckOutDate(checkInDate: Date, duration: number): Date {
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkInDate.getDate() + duration);
    checkOutDate.setHours(11, 0, 0, 0); // Set waktu check-out pukul 11:00
    return checkOutDate;
  }
  const checkOutDate = calculateCheckOutDate(
    new Date(data.checkInDate),
    parseInt(data.duration)
  );
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md px-5 py-4 rounded-lg">
        <DialogHeader>
          <DialogTitle>Detail Reservasi</DialogTitle>
          <DialogDescription>
            Jika Data Data Reservasi Sudah Sesuai Silahkan Konfirmasi
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tighter">Data Tamu</h2>
          <div className="flex items-center justify-between gap-3 text-base font-semibold">
            <span>Nama Lengkap</span>
            <span>{data.fullname}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-base font-semibold">
            <span>Email</span>
            <span>{data.email}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-base font-semibold">
            <span>Nomer Handphone</span>
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-base font-semibold">
            <span>Check in</span>
            <span>{formattedCheckInDate}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-base font-semibold">
            <span>Durasi Menginap</span>
            <span>{data.duration}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-base font-semibold">
            <span>Check out</span>
            <span>{format(checkOutDate, "dd MMMM yyyy")}</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-base font-semibold">
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
      </DialogContent>
    </Dialog>
  );
}
