import Navbar from "@/components/navigation/navbar";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { addDays, format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "react-router-dom";
import useUserStore from "@/hooks/use-session";
import { useForm } from "react-hook-form";
import ReservationForm from "@/components/form/form-reserve";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import { detailRoom } from "@/types";

import ErrorPage from "@/components/error/error-page";
export default function ReservasiFormPage() {
  const { id } = useParams();
  const [checkInDate, setCheckInDate] = React.useState<Date | undefined>();
  const [duration, setDuration] = React.useState<number>(1);
  const checkOutDate = checkInDate ? addDays(checkInDate, duration) : undefined;
  const { userData } = useUserStore();
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get(`http://localhost:3000/api/rooms/${id}`);
    return response.data.datas;
  };

  const { data, error, isLoading } = useSWR<detailRoom>(`/rooms`, fetcher);
  if(isLoading) return <div>Loading...</div>
  if(error) return <ErrorPage error={error} reset={() => mutate("/rooms")}/>
  return (
    <>
      <Navbar />
      <ReservationForm id={id} data={data as detailRoom} />
      {/* <div className="w-full max-w-lg px-5 py-4 rounded-lg ">
          <div className="">
            <h2 className="text-2xl font-bold tracking-tighter">
              Informasi Anda
            </h2>
            <p className="text-muted-foreground">Silahkan isi data diri anda</p>
          </div>
          <form className="w-full mt-3 space-y-4">
            <div className="flex flex-col gap-3">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap Sesuai KTP</Label>
                <Input
                  id="name"
                  placeholder="Masukan nama anda"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Masukan email anda"
                  required
                  autoComplete="off"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="NomerHandphone">Nomer Handphone</Label>
                <PhoneInput
                  id="NomerHandphone"
                  placeholder="Nomor Telepon"
                  international
                  value={"+6287826700009"}
                  defaultCountry="ID"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reservationFor">Untuk siapa anda memesan</Label>
                <Select>
                  <SelectTrigger id="reservationFor" className="">
                    <SelectValue placeholder="Pilih untuk siapa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Untuk saya sendiri</SelectItem>
                    <SelectItem value="family">Untuk keluarga</SelectItem>
                    <SelectItem value="guest">Untuk orang lain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="requests">Permintaan Khusus (Opsional)</Label>
                <Textarea
                  className="min-h-[100px]"
                  id="requests"
                  placeholder="Masukan Permintaan Khusus"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="w-full max-w-md px-5 py-4 rounded-lg bg-muted/40">
          <div className="">
            <h2 className="text-2xl font-bold tracking-tighter">
              Detail Reservasi Kamar
            </h2>
            <p className="text-muted-foreground">
              Silahkan isi detail reservasi kamar anda
            </p>
            <div className="flex flex-col mt-3">
              <h2 className="text-xl font-medium tracking-tighter">
                Staycation Rooms
              </h2>
              <span>Rp. 200k/ malam</span>
            </div>
            <form className="mt-6 space-y-">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="checkInDate">Tanggal Check In</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="checkInDate"
                      variant={"outline"}
                      className={cn(
                        " justify-start text-left font-normal",
                        !checkInDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {checkInDate ? (
                        format(checkInDate, "LLL dd, y")
                      ) : (
                        <span>Pilih Tanggal Check In</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full">
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={checkInDate}
                      onSelect={setCheckInDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Durasi Menginap</Label>
                <Select onValueChange={(value) => setDuration(Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Durasi" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(9).keys()].map((i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1} malam
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkOutDate">Tanggal Check Out</Label>
                <Input
                  id="checkOutDate"
                  value={checkOutDate ? format(checkOutDate, "LLL dd, y") : ""}
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">Jumlah Tamu</Label>
                <Select>
                  <SelectTrigger id="guests">
                    <SelectValue placeholder="Pilih jumlah tamu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 tamu</SelectItem>
                    <SelectItem value="2">2 tamu</SelectItem>
                    <SelectItem value="3">3 tamu</SelectItem>
                    <SelectItem value="4">4 tamu</SelectItem>
                    <SelectItem value="5">5 tamu</SelectItem>
                    <SelectItem value="6">6 tamu</SelectItem>
                    <SelectItem value="7">7 tamu</SelectItem>
                    <SelectItem value="8">8 tamu</SelectItem>
                    <SelectItem value="9">9 tamu</SelectItem>
                    <SelectItem value="10">10 tamu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="w-full max-w-md px-5 py-4 mt-5 rounded-lg bg-muted/40">
                <div className="">
                  <h2 className="text-2xl font-bold tracking-tighter">
                    Total Pembayaran
                  </h2>
                  <div className="flex flex-col mt-5 space-y-2">
                    <div className="flex justify-between">
                      <span>Harga Total</span>
                      <span>Rp. 200k x {duration} malam</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Promo atau Diskon</span>
                      <span>Rp. 0</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>Rp. {200000 * duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link to={`/rooms/${id}/reserve/payment`}>
                <Button
                  className="w-full mt-5"
                  type="submit"
                  onClick={() => {}}
                >
                  Pesan Kamar
                </Button>
              </Link>
            </form>
          </div>
        </div> */}
    </>
  );
}
