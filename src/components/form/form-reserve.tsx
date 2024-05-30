import { schemasReserveExtended } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { addDays, addHours, format } from "date-fns";
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
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { z } from "zod";
import { detailRoom } from "@/types";
import axios from "axios";
import useUserStore from "@/hooks/use-session";
import { useToast } from "../ui/use-toast";
import { DialogDataReserve } from "../dialog/dialog-data-reserve";
import { formatCurrency } from "@/utils/helpers";
const formSchema: z.ZodType = schemasReserveExtended;

interface formProps {
  id: string | undefined;
  data: detailRoom;
}
export default function ReservationForm({ id, data }: formProps) {
  const [checkInDate, setCheckInDate] = React.useState<Date | undefined>();
  const [duration, setDuration] = React.useState<number>(1);
  const checkOutDate = checkInDate ? addDays(checkInDate, duration) : undefined;
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const { userData } = useUserStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      reservationFor: "",
      requests: "",
      checkInDate: "",
      duration: "",
      guests: "",
    },
  });

  function calculateCheckOutDate(checkInDate: Date, duration: number): Date {
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkInDate.getDate() + duration);
    checkOutDate.setHours(11, 0, 0, 0);
    return checkOutDate;
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setOpenDialog(true);
  };

  async function confirmSubmit(values: z.infer<typeof formSchema>) {
    const checkInDate = new Date(values.checkInDate);
    const duration = parseInt(values.duration);
    const checkOutDate = calculateCheckOutDate(checkInDate, duration);
    const paymentDeadline = addHours(new Date(values.checkInDate), -24);
    const formattedPaymentDeadline = format(
      paymentDeadline,
      "dd MMMM yyyy HH:mm"
    );
    try {
      const respone = await axios.post(
        "http://localhost:3000/api/reservation",
        {
          noKamar: data.nomerKamar,
          noTamu: 1,
          checkIn: checkInDate,
          checkOut: checkOutDate,
          durasiInap: duration,
        }
      );
      if (respone.data.status === 200) {
        toast({
          title: "Success",
          description: `Reservation Success, Payment Deadline at ${formattedPaymentDeadline}`,
        });
        navigate(
          `/rooms/${id}/reserve/payment?reservationId=${respone.data.data.reservationId}&paymentId=${respone.data.data.paymentId}`
        );
      } else {
        toast({
          title: "Failed",
          description: "Reservation Failed",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  const fullPhone = userData?.nomerTelephoneTamu;
  const phoneWithoutCountryCode = fullPhone?.startsWith("62")
    ? fullPhone.substring(2)
    : fullPhone;

  useEffect(() => {
    form.reset({
      fullname: userData?.namaTamu,
      email: userData?.emailTamu,
      phone: `+62${phoneWithoutCountryCode}`,
    });
  }, [userData?.namaTamu, userData?.emailTamu, form, phoneWithoutCountryCode]);
  return (
    <>
      <DialogDataReserve
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        data={form.getValues()}
        onConfirm={() => {
          confirmSubmit(form.getValues());
          setOpenDialog(false);
        }}
        onCancel={() => setOpenDialog(false)}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-around gap-5 lg:mx-32 lg:flex-row md:py-24 lg:py-4 lg:p-4"
        >
          <div className="w-full max-w-lg px-5 py-4 rounded-lg bg-muted/40 ">
            <div className="">
              <h2 className="text-2xl font-bold tracking-tighter">
                Informasi Anda
              </h2>
              <p className="text-muted-foreground">
                Silahkan isi data diri anda
              </p>
            </div>
            <div className="w-full mt-3 space-y-4 ">
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap Sesuai KTP</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan nama anda"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan nama anda"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomer Handphone</FormLabel>
                      <FormControl>
                        <PhoneInput
                          id="NomerHandphone"
                          placeholder="Nomor Telepon"
                          international
                          defaultCountry="ID"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reservationFor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Untuk siapa anda memesan</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="reservationFor" className="">
                            <SelectValue placeholder="Pilih untuk siapa" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="self">
                              Untuk saya sendiri
                            </SelectItem>
                            <SelectItem value="family">
                              Untuk keluarga
                            </SelectItem>
                            <SelectItem value="guest">
                              Untuk orang lain
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="requests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Permintaan Khusus (Opsional)</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[100px]"
                          id="requests"
                          placeholder="Masukan Permintaan Khusus"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="w-full max-w-lg px-5 py-4 rounded-lg bg-muted/40">
            <div className="">
              <h2 className="text-2xl font-bold tracking-tighter">
                Detail Reservasi Kamar
              </h2>
              <p className="text-muted-foreground">
                Silahkan isi detail reservasi kamar anda
              </p>
              <div className="flex flex-col mt-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-medium tracking-tighter">
                    Staycation Rooms
                  </h2>
                  <span className="text-base font-semibold text-muted-foreground">
                    ({data.typeKamar})
                  </span>
                </div>
                <span className="text-base font-semibold">
                  Rp.{" "}
                  {formatCurrency(
                    data.hargaKamar * (1 - data.diskonKamar / 100)
                  )}
                  / malam
                </span>
              </div>
              <div className="mt-6 space-y-2">
                <FormField
                  control={form.control}
                  name="checkInDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-2">
                      <FormLabel>Tanggal Check In</FormLabel>
                      <FormControl>
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
                              disabled={{ before: new Date() }}
                              onSelect={(date) => {
                                setCheckInDate(date);
                                field.onChange(date);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Durasi Menginap</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            setDuration(Number(value));
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Durasi" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(9).keys()].map((i) => (
                              <SelectItem
                                key={i + 1}
                                value={(i + 1).toString()}
                              >
                                {i + 1} malam
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex flex-col space-y-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="checkOutDate"
                        variant={"outline"}
                        className={cn(
                          " justify-start text-left font-normal",
                          !checkOutDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {checkOutDate ? (
                          format(checkOutDate, "LLL dd, y")
                        ) : (
                          <span></span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <Calendar
                        initialFocus
                        mode="single"
                        selected={checkOutDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jumlah Tamu</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="guests">
                            <SelectValue placeholder="Pilih jumlah tamu" />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(10).keys()].map((i) => (
                              <SelectItem
                                key={i + 1}
                                value={(i + 1).toString()}
                              >
                                {i + 1} tamu
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Separator />
                <div className="w-full max-w-md px-5 py-4 mt-5 rounded-lg bg-muted/40">
                  <div className="">
                    <h2 className="text-2xl font-bold tracking-tighter">
                      Total Pembayaran
                    </h2>
                    <div className="flex flex-col mt-5 space-y-2">
                      <div className="flex justify-between">
                        <span>Harga Total</span>
                        <span>
                          Rp. {data.hargaKamar} x {duration} malam
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Promo atau Diskon</span>
                        <span>Rp. {data.diskonKamar}%</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>
                          Rp.{" "}
                          {formatCurrency(
                            data.hargaKamar *
                              duration *
                              (1 - data.diskonKamar / 100)  
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-5" type="submit">
                  Pesan Kamar
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

// <FormField
//   control={form.control}
//   name="checkOutDate"
//   render={({ field }) => (
//     <FormItem className="flex flex-col space-y-2">
//       <FormLabel>Tanggal Check Out</FormLabel>
//       <FormControl>
//         {/* <Input
//           id="checkOutDate"
//           {...field}
//           readOnly
//           value={
//             checkOutDate
//               ? format(checkOutDate, "LLL dd, y")
//               : ""
//           }
//         /> */}
//       </FormControl>
//     </FormItem>
//   )}
// />
