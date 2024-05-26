import { Resevasi, reservasiTypes } from "@/types";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency, formatPhoneNumber } from "@/utils/helpers";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

interface PaymentProps {
  data: reservasiTypes;
}

export const CardDataReservasion = ({ data }: PaymentProps) => {
  return (
    <>
      <div className="lg:flex flex-col  w-[350px] hidden">
        <Card className="w-full border-none bg-muted/40">
          <CardHeader className="">
            <CardTitle className="text-left">Reservation Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">
                Reservation Number
              </span>
              <span className="font-medium">{data?.reservationId}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">Nama Kamar</span>
              <span className="font-medium">{data?.kamar.namaKamar}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">Hotel Type</span>
              <span className="font-medium">{data?.kamar.typeKamar}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">
                Check-in Date
              </span>
              <div className="font-medium">
                {data?.tanggalCheckIn
                  ? format(parseISO(data.tanggalCheckIn), "LLL dd, y", {
                      locale: id,
                    })
                  : "Tanggal tidak tersedia"}
              </div>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">
                Durasi Menginap
              </span>
              <span className="font-medium"> {data?.durasiMenginap}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">
                Check-out Date
              </span>
              <span className="font-medium">
                {" "}
                {data?.tanggalCheckIn
                  ? format(parseISO(data.tanggalCheckOut), "LLL dd, y")
                  : "Tanggal tidak tersedia"}
              </span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">
                Guest Details
              </span>
              <span className="font-medium">2 Adults, 1 Child</span>
            </div>
            <div className="grid gap-1 mt-5">
              <span className="text-sm text-muted-foreground ">Nama Tamu</span>
              <span className="font-medium">{data?.tamu.namaTamu}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">Email</span>
              <span className="font-medium">{data?.tamu.emailTamu}</span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">
                Phone Number
              </span>
              <span className="font-medium">
                {data?.tamu.nomerTelephoneTamu
                  ? formatPhoneNumber(data.tamu.nomerTelephoneTamu)
                  : ""}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export const CardPaymentMethodDebit = ({ data }: PaymentProps) => {
  const { toast } = useToast();
  const navigate = useNavigate()
  const handlePayment = async (payment: reservasiTypes, metodePembayaran: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api//confirm-payment",
        {
          paymentId: payment.Payment.paymentId,
          amount: 936000,
          metodePembayaran,
        }
      );
      if (response.data.status === 200) {
        toast({
          title: "Success",
          description: response.data.message,
        });
        navigate("/reservations");
      } else {
        toast({
          title: "Something went wrong",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.response.data.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex flex-col pt-[5px] ">
      <div className="flex items-center">
        <h1 className="text-[2rem] font-black">Kartu Kredit/Debit</h1>
        <img src="/image 8.png" alt="" className="mt-3 ml-3" />
      </div>
      <div className="flex flex-col gap-4 mt-10 ">
        <Label className="text-left">Nomor Kartu Kredit</Label>
        <Input placeholder="0000 0000 0000 0000" />
      </div>
      <div className="flex flex-col gap-4 mt-10 ">
        <Label className="text-left">Masa Berlaku</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="MM/YY" />
          <Input placeholder="3-4 digits" />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-10 ">
        <Label className="text-left">Nama di Kartu</Label>
        <Input placeholder="John Doe" />
      </div>
      <div className="flex flex-col gap-4 mt-10 ">
        <h1 className="text-2xl font-bold text-left">Rincian Harga</h1>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-left">Harga</p>
            <h2 className="text-base font-bold text-right">
              Rp.{""}
              {formatCurrency(data.Payment.jumlahBayar)}
            </h2>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-left">Total</p>
          <h2 className="text-base font-bold text-right">
            Rp.{""}
            {formatCurrency(data.Payment.jumlahBayar)}
          </h2>
        </div>
        <div className="flex self-end mt-2">
          <Button
            className="justify-end text-white bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              data && handlePayment(data, "Kartu Kredit/Debit");
            }}
          >
            Bayar Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CardPaymentMethodBank = ({ data }: PaymentProps) => {
  return (
    <div className="flex flex-col pt-[5px] ">
      <div className="flex flex-col">
        <h1 className="text-[2rem] font-black">Bank Transfer</h1>
        <span>
          Anda bisa Transfer dari layanan perbankan apapun (m-Banking, SMS
          banking atau ATM)
        </span>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <h1 className="text-xl font-semibold leading-none tracking-tight">
          Pilih Rekening Tujuan{" "}
        </h1>
        <Button className="flex items-center justify-start h-[54px] ">
          <Checkbox id="1" className="mr-4" />
          Transfer BCA
          <img src="/bca.png" alt="" className="ml-auto" />
        </Button>
        <Button className="flex items-center justify-start h-[54px] ">
          {" "}
          <Checkbox id="2" className="mr-4" />
          Transfer Mandiri
          <img src="/mandiri.png" alt="" className="ml-auto" />
        </Button>
        <Button className="flex items-center justify-start h-[54px] ">
          {" "}
          <Checkbox id="3" className="mr-4" />
          Transfer BRI
          <img src="/bri.png" alt="" className="ml-auto" />
        </Button>
        <Button className="flex items-center justify-start h-[54px] ">
          {" "}
          <Checkbox id="4" className="mr-4" />
          Transfer BNI
          <img src="/bni.png" alt="" className="ml-auto" />
        </Button>
      </div>
      <div className="flex flex-col gap-4 mt-10 ">
        <h1 className="text-2xl font-bold text-left">Rincian Harga</h1>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-left">Harga</p>
            <h2 className="text-base font-bold text-right">
              {" "}
              Rp.{""}
              {formatCurrency(data.Payment.jumlahBayar)}
            </h2>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-left">Total</p>
          <h2 className="text-base font-bold text-right">
            {" "}
            Rp.{""}
            {formatCurrency(data.Payment.jumlahBayar)}
          </h2>
        </div>
        <div className="flex self-end mt-2 h-[54px]">
          <Button className="justify-end text-white bg-blue-500 hover:bg-blue-600">
            Bayar Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CardPaymentMethodATM = ({ data }: PaymentProps) => {
  return (
    <div className="flex flex-col pt-[5px] ">
      <div className="flex flex-col">
        <h1 className="text-[2rem] font-black">Bank Transfer</h1>
        <span>
          Anda bisa Transfer dari layanan perbankan apapun (m-Banking, SMS
          banking atau ATM)
        </span>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <h1 className="text-xl font-semibold leading-none tracking-tight">
          Pilih Rekening Tujuan{" "}
        </h1>
        <Button className="flex items-center justify-start h-[54px] ">
          <Checkbox id="1" className="mr-4" />
          Transfer BCA
          <img src="/bca.png" alt="" className="ml-auto" />
        </Button>
        <Button className="flex items-center justify-start h-[54px] ">
          {" "}
          <Checkbox id="2" className="mr-4" />
          Transfer Mandiri
          <img src="/mandiri.png" alt="" className="ml-auto" />
        </Button>
        <Button className="flex items-center justify-start h-[54px] ">
          {" "}
          <Checkbox id="3" className="mr-4" />
          Transfer BRI
          <img src="/bri.png" alt="" className="ml-auto" />
        </Button>
        <Button className="flex items-center justify-start h-[54px] ">
          {" "}
          <Checkbox id="4" className="mr-4" />
          Transfer BNI
          <img src="/bni.png" alt="" className="ml-auto" />
        </Button>
      </div>
      <div className="flex flex-col gap-4 mt-10 ">
        <h1 className="text-2xl font-bold text-left">Rincian Harga</h1>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-left">Harga</p>
            <h2 className="text-base font-bold text-right">
              {" "}
              Rp.{""}
              {formatCurrency(data.Payment.jumlahBayar)}
            </h2>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-left">Total</p>
          <h2 className="text-base font-bold text-right">
            {" "}
            Rp.{""}
            {formatCurrency(data.Payment.jumlahBayar)}
          </h2>
        </div>
        <div className="flex self-end mt-2 h-[54px]">
          <Button className="justify-end text-white bg-blue-500 hover:bg-blue-600">
            Bayar Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CardPaymentMethodEwallet = ({ data }: PaymentProps) => {
  return (
    <div className="flex flex-col pt-[5px] w-[542px]">
      <div className="flex flex-col">
        <h1 className="text-[2rem] font-black">E-Wallet</h1>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <h1 className="text-xl font-semibold leading-none tracking-tight">
          Pilih E-Wallet Tujuan{" "}
        </h1>
        <Button className="flex items-center justify-start h-[54px] ">
          <Checkbox id="1" className="mr-4" />
          Dana
          <img src="/dana.png" alt="" className="ml-auto" />
        </Button>
        <Button className="flex items-center justify-start h-[54px] ">
          {" "}
          <Checkbox id="2" className="mr-4" />
          Ovo
          <img src="/ovo.png" alt="" className="ml-auto" />
        </Button>
        <Button className="flex items-center justify-start h-[54px] ">
          {" "}
          <Checkbox id="2" className="mr-4" />
          Gopay
          <img src="/Gopay.png" alt="" className="ml-auto" />
        </Button>
      </div>
      <div className="flex flex-col gap-4 mt-10 ">
        <h1 className="text-2xl font-bold text-left">Rincian Harga</h1>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-left">Harga</p>
            <h2 className="text-base font-bold text-right">
              {" "}
              Rp.{""}
              {formatCurrency(data.Payment.jumlahBayar)}
            </h2>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-left">Total</p>
          <h2 className="text-base font-bold text-right">
            {" "}
            Rp.{""}
            {formatCurrency(data.Payment.jumlahBayar)}
          </h2>
        </div>
        <div className="flex self-end mt-2 h-[54px]">
          <Button className="justify-end text-white bg-blue-500 hover:bg-blue-600">
            Bayar Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};
export const CardPaymentMethodOTC = ({ data }: PaymentProps) => {
  return (
    <div className="flex flex-col pt-[5px] lg:w-[542px]">
      <div className="flex flex-col">
        <h1 className="text-[2rem] font-black">Merchant OTC</h1>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <h1 className="text-xl font-semibold leading-none tracking-tight">
          Pilih Merchant Tujuan{" "}
        </h1>
        <Button className="flex items-center justify-start h-[54px] ">
          <Checkbox id="1" className="mr-4" />
          Indomaret
          <img src="/indomaret.png" alt="" className="ml-auto" />
        </Button>
        <Button className="flex items-center justify-start h-[54px] ">
          {" "}
          <Checkbox id="2" className="mr-4" />
          Alfamart
          <img src="/alfamart.png" alt="" className="ml-auto" />
        </Button>
      </div>
      <div className="flex flex-col gap-4 mt-10 ">
        <h1 className="text-2xl font-bold text-left">Rincian Harga</h1>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="text-left">Harga</p>
            <h2 className="text-base font-bold text-right">
              {" "}
              Rp.{""}
              {formatCurrency(data.Payment.jumlahBayar)}
            </h2>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-left">Total</p>
          <h2 className="text-base font-bold text-right">
            {" "}
            Rp.{""}
            {formatCurrency(data.Payment.jumlahBayar)}
          </h2>
        </div>
        <div className="flex self-end mt-2 h-[54px]">
          <Button className="justify-end text-white bg-blue-500 hover:bg-blue-600">
            Bayar Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};

export const AllPaymentMethod = ({
  className,
  tab,
  setTab,
}: {
  className?: string;
  tab: string;
  setTab: (value: string) => void;
}) => {
  return (
    <>
      <div
        className={`${className} flex flex-col w-[350px] h-[85vh] gap-1 lg:gap-[45px] px-5 py-6 rounded-lg bg-muted/40`}
      >
        <Button
          variant={"ghost"}
          className={`${tab === "creditCard" ? "bg-accent" : ""}`}
          onClick={() => setTab("creditCard")}
        >
          Kartu Kredit
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => setTab("bankTransfer")}
          className={`${tab === "bankTransfer" ? "bg-accent" : ""}`}
        >
          Bank Transfer
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => setTab("atm")}
          className={`${tab === "atm" ? "bg-accent" : ""}`}
        >
          ATM
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => setTab("otc")}
          className={`${tab === "otc" ? "bg-accent" : ""}`}
        >
          OTC-Non Bank
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => setTab("ewallet")}
          className={`${tab === "ewallet" ? "bg-accent" : ""}`}
        >
          E-Wallet
        </Button>
      </div>
    </>
  );
};
