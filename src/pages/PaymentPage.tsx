import Navbar from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CardContent, Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AllPaymentMethod,
  CardDataReservasion,
  CardPaymentMethodATM,
  CardPaymentMethodBank,
  CardPaymentMethodDebit,
  CardPaymentMethodEwallet,
  CardPaymentMethodOTC,
} from "@/components/card/card-reservation";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { Resevasi, reservasiTypes } from "@/types";
import { format, parseISO } from "date-fns";
import { formatPhoneNumber } from "@/utils/helpers";

export default function PaymentPage() {
  const [activeTab, setActiveTab] = useState<string>("");
  const { mutate } = useSWRConfig();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const paymentId = query.get("paymentId");
  const reservasionId = query.get("reservationId");

  const fetcher = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/reservation/${reservasionId}`
    );
    return response.data.data
  };

  const { data: dataReservasion } = useSWR<reservasiTypes>(
    `/api/reservation/${reservasionId}`,
    fetcher
  );
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <Navbar />
      <main className="flex flex-col lg:justify-between mx-8 lg:flex-row md:py-24 lg:py-2 lg:p-2">
        <AllPaymentMethod
          className="hidden lg:flex"
          tab={activeTab}
          setTab={handleTabClick}
        />
        <Card className="w-full border-none lg:hidden">
          <CardHeader className="px-0">
            <CardTitle className="text-left">Reservation Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 px-0 mx-0">
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">
                Reservation Number
              </span>
              <span className="font-medium">
                {dataReservasion?.reservationId}
              </span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">Nama Kamar</span>
              <span className="font-medium">
                {dataReservasion?.kamar.namaKamar}
              </span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">Hotel Type</span>
              <span className="font-medium">
                {dataReservasion?.kamar.typeKamar}
              </span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">
                Check-in Date
              </span>
              <div className="font-medium">
                {dataReservasion?.tanggalCheckIn
                  ? format(
                      parseISO(dataReservasion.tanggalCheckIn),
                      "LLL dd, y"
                    )
                  : "Tanggal tidak tersedia"}
              </div>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">
                Durasi Menginap
              </span>
              <span className="font-medium">
                {" "}
                {dataReservasion?.durasiMenginap}
              </span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">
                Check-out Date
              </span>
              <span className="font-medium">
                {" "}
                {dataReservasion?.tanggalCheckIn
                  ? format(
                      parseISO(dataReservasion.tanggalCheckOut),
                      "LLL dd, y"
                    )
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
              <span className="font-medium">
                {dataReservasion?.tamu.namaTamu}
              </span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">Email</span>
              <span className="font-medium">
                {dataReservasion?.tamu.emailTamu}
              </span>
            </div>
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground ">
                Phone Number
              </span>
              <span className="font-medium">
                {dataReservasion?.tamu.nomerTelephoneTamu
                  ? formatPhoneNumber(dataReservasion.tamu.nomerTelephoneTamu)
                  : ""}
              </span>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-5 mt-10 lg:mt-0">
          <h1 className="text-2xl font-semibold leading-none tracking-tight lg:hidden">
            Plih metode pembayaran
          </h1>
          <Separator orientation="horizontal" className="lg:hidden" />
          <div className="flex flex-col mt-2">
            <div className="flex flex-col">
              <h1 className="text-base lg:hidden">Kartu Kredit</h1>
              <Button
                className={"flex items-center justify-center lg:hidden"}
                onClick={() => handleTabClick("creditCard")}
              >
                Kartu Kredit
                <img
                  src="../../public/image 8.png"
                  alt=""
                  className="h-5 mt-2"
                />
              </Button>
              {activeTab === "creditCard" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="p-5 rounded-2xl"
                  variants={variants}
                  transition={{ duration: 0.5 }}
                >
                  <CardPaymentMethodDebit
                    data={dataReservasion as reservasiTypes}
                  />
                </motion.div>
              )}
            </div>
            <div className="flex flex-col">
              <Button
                variant={"ghost"}
                className={"lg:hidden"}
                onClick={() => handleTabClick("bankTransfer")}
              >
                Bank Transfer
              </Button>
              {activeTab === "bankTransfer" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="p-5 rounded-2xl"
                  variants={variants}
                  transition={{ duration: 0.5 }}
                >
                  <CardPaymentMethodBank
                    data={dataReservasion as reservasiTypes}
                  />
                </motion.div>
              )}
            </div>
            <div className="flex flex-col">
              <Button
                variant={"ghost"}
                className={"lg:hidden"}
                onClick={() => handleTabClick("atm")}
              >
                ATM
              </Button>
              {activeTab === "atm" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="p-5 rounded-2xl"
                  variants={variants}
                  transition={{ duration: 0.5 }}
                >
                  <CardPaymentMethodATM
                    data={dataReservasion as reservasiTypes}
                  />
                </motion.div>
              )}
            </div>
            <div className="flex flex-col">
              <Button
                variant={"ghost"}
                className={"lg:hidden"}
                onClick={() => handleTabClick("otc")}
              >
                Bank Transfer
              </Button>
              {activeTab === "otc" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="p-5 rounded-2xl"
                  variants={variants}
                  transition={{ duration: 0.5 }}
                >
                  <CardPaymentMethodOTC
                    data={dataReservasion as reservasiTypes}
                  />
                </motion.div>
              )}
            </div>
            <div className="flex flex-col">
              <Button
                variant={"ghost"}
                className={"lg:hidden"}
                onClick={() => handleTabClick("ewallet")}
              >
                E-Wallet
              </Button>
              {activeTab === "ewallet" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="p-5 rounded-2xl"
                  variants={variants}
                  transition={{ duration: 0.5 }}
                >
                  <CardPaymentMethodEwallet data={dataReservasion as reservasiTypes} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
        <CardDataReservasion data={dataReservasion as reservasiTypes} />
      </main>
    </>
  );
}
