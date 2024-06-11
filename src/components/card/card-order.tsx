import React, { useState } from "react";
import { Separator } from "../ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  DownloadIcon,
  MoreVertical,
  Truck,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { reservasiTypes } from "@/types";
import { formatCurrency, formatDate, formatPhoneNumber } from "@/utils/helpers";
import ExportPDF from "../pdf/reservasion";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useSWRConfig } from "swr";
import useUserStore from "@/hooks/use-session";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

export default function CardOrder({ data }: { data: reservasiTypes }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const { toast } = useToast();
  const { mutate } = useSWRConfig();
  const { userData } = useUserStore();

  const handleExportToPDF = () => {
    console.log("Memulai proses ekspor...");
    setShowModal(true);
  };

  const handleUpdateReservasion = async () => {
    setIsloading(true);
    try {
      const respone = await axios.put(`http://localhost:3000/api/reservation`, {
        reservationId: data.idReservasi,
        statusReservasi: "Diterima",
        noPegawai: userData?.idPegawai,
      });
      if (respone.data.status === 200) {
        toast({
          title: "Success",
          description: `berhasil di konfirimasi`,
        });
      } else {
        toast({
          title: "Error",
          description: `gagal konfirmasi gagal`,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
      mutate("/reservation");
    }
  };

  return (
    <>
      <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="flex gap-2 items-center text-lg group">
              Reservasi {data.idReservasi}
              <Button
                size="icon"
                variant="outline"
                className="w-6 h-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Copy className="w-3 h-3" />
                <span className="sr-only">Salin ID Reservasi</span>
              </Button>
            </CardTitle>
            <CardDescription>
              Tanggal: {formatDate(data.tanggalCheckIn, "dd MMMM yyyy")}
            </CardDescription>
          </div>
          <div className="flex gap-1 items-center ml-auto">
            <Button size="sm" variant="outline" className="gap-1 h-8">
              <Truck className="h-3.5 w-3.5" />
              <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                Lacak Pesanan
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="w-8 h-8">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">Lainnya</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportToPDF}>
                  Ekspor
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Hapus</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Detail Reservasi</div>
            <ul className="grid gap-3">
              <li className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  {data.kamar.namaKamar} <span>x 1 Malam</span>
                </span>
                <span>Rp. {formatCurrency(data.kamar.hargaKamar)}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-muted-foreground">Durasi Menginap</span>
                <span>{data.durasiMenginap} Malam</span>
              </li>
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3">
              <li className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span>
                  {formatCurrency(data.kamar.hargaKamar * data.durasiMenginap)}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-muted-foreground">Diskon / Promo</span>
                <span>{data.kamar.diskonKamar}%</span>
              </li>
              <li className="flex justify-between items-center font-semibold">
                <span className="text-muted-foreground">Total</span>
                <span>
                  {formatCurrency(
                    (data.kamar.hargaKamar *
                      data.durasiMenginap *
                      (100 - data.kamar.diskonKamar)) /
                      100
                  )}
                </span>
              </li>
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Informasi Pelanggan</div>
            <dl className="grid gap-3">
              <div className="flex justify-between items-center">
                <dt className="text-muted-foreground">No Pelanggan</dt>
                <dd>{data.tamu.idTamu}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-muted-foreground">Nama Pelanggan</dt>
                <dd>{data.tamu.namaTamu}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-muted-foreground">Email</dt>
                <dd>
                  <a href={`mailto:${data.tamu.emailTamu}`}>
                    {data.tamu.emailTamu}
                  </a>
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-muted-foreground">Telepon</dt>
                <dd>
                  <a href={`http://wa.me/${data.tamu.nomorTeleponTamu}`}>
                    {formatPhoneNumber(data.tamu.nomorTeleponTamu)}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            <div className="font-semibold">Informasi Pembayaran</div>
            <dl className="grid gap-3">
              <div className="flex justify-between items-center">
                <dt className="flex gap-1 items-center text-muted-foreground">
                  <CreditCard className="w-4 h-4" />
                  {data.Pembayaran.metodePembayaran}
                </dt>
                <dd>
                  {data.Pembayaran.metodePembayaran !== "????"
                    ? "**** **** **** 4532"
                    : "????"}
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-muted-foreground">Status Pembayaran</dt>
                <dd>{data.Pembayaran.statusPembayaran}</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-muted-foreground">Status Reservasi</dt>
                <dd>{data.statusReservasi}</dd>
              </div>
            </dl>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-3">
            {data.Pembayaran.statusPembayaran === "lunas" &&
              data.statusReservasi !== "Diterima" && (
                <Button className="w-full" onClick={handleUpdateReservasion}>
                  Konfirmasi Reservasi
                </Button>
              )}
            {data.Pembayaran.statusPembayaran === "lunas" &&
              data.statusReservasi === "Diterima" && (
                <Button
                  variant="suucces"
                  className="w-full"
                  onClick={handleUpdateReservasion}
                  disabled={data.statusReservasi === "Diterima"}
                >
                  Sudah DiKonfirimasi
                </Button>
              )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center px-6 py-3 border-t bg-muted/50">
          <div className="text-xs text-muted-foreground">
            Diperbarui <time dateTime="2023-11-23">23 November 2023</time>
          </div>
          <Pagination className="mr-0 ml-auto w-auto">
            <PaginationContent>
              <PaginationItem>
                <Button size="icon" variant="outline" className="w-6 h-6">
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span className="sr-only">Reservasi Sebelumnya</span>
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button size="icon" variant="outline" className="w-6 h-6">
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="sr-only">Reservasi Berikutnya</span>
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
        {showModal && (
          <>
            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogTrigger asChild>
                <Button variant="outline">Download PDF</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[450px] p-6 bg-white rounded-lg shadow-lg dark:bg-gray-900">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">Download PDF</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Klik tombol di bawah ini untuk mengunduh PDF
                    </p>
                  </div>
                  <div className="flex justify-center items-center">
                    <Button>
                      <DownloadIcon className="mr-2 w-5 h-5" />
                      <ExportPDF data={data} />
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </Card>
    </>
  );
}
