import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const CardDataReservasion = () => {
  return (
    <>
      <div className="lg:flex flex-col pt-[5px] w-[350px] px-5 py-6 hidden">
        <Card className="w-full max-w-md border-none bg-muted/40">
          <CardHeader>
            <CardTitle>Reservation Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">
                Reservation Number
              </span>
              <span className="font-medium">12345</span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">Hotel Name</span>
              <span className="font-medium">The Ritz-Carlton, New York</span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">Hotel Type</span>
              <span className="font-medium">Luxury Hotel</span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">
                Check-in Date
              </span>
              <div className="font-medium">June 15, 2023</div>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">Guest Name</span>
              <span className="font-medium">John Doe</span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">
                Guest Details
              </span>
              <span className="font-medium">2 Adults, 1 Child</span>
            </div>
            <div className="grid gap-1 mt-5">
              <span className="text-sm text-muted-foreground ">Guest</span>
              <span className="font-medium">Fahreza Pratama Hidayat</span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">Email</span>
              <span className="font-medium">fahreza@gmail.com</span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">
                Phone Number
              </span>
              <span className="font-medium">+62 812 3456 7890</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export const CardPaymentMethodDebit = () => {
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
            <h2 className="text-base font-bold text-right">Rp. 1.000.000</h2>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-left">Total</p>
          <h2 className="text-base font-bold text-right">Rp. 1.000.000</h2>
        </div>
        <div className="flex self-end mt-2">
          <Button className="justify-end text-white bg-blue-500 hover:bg-blue-600">
            Bayar Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CardPaymentMethodBank = () => {
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
            <h2 className="text-base font-bold text-right">Rp. 1.000.000</h2>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-left">Total</p>
          <h2 className="text-base font-bold text-right">Rp. 1.000.000</h2>
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

export const CardPaymentMethodATM = () => {
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
            <h2 className="text-base font-bold text-right">Rp. 1.000.000</h2>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-left">Total</p>
          <h2 className="text-base font-bold text-right">Rp. 1.000.000</h2>
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

export const CardPaymentMethodEwallet = () => {
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
            <h2 className="text-base font-bold text-right">Rp. 1.000.000</h2>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-left">Total</p>
          <h2 className="text-base font-bold text-right">Rp. 1.000.000</h2>
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
export const CardPaymentMethodOTC = () => {
  return (
    <div className="flex flex-col pt-[5px] w-[542px]">
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
            <h2 className="text-base font-bold text-right">Rp. 1.000.000</h2>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-left">Total</p>
          <h2 className="text-base font-bold text-right">Rp. 1.000.000</h2>
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
