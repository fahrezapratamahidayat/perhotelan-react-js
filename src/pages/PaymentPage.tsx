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

export default function PaymentPage() {
  const [activeTab, setActiveTab] = useState<string>("");

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
      <main className="flex flex-col justify-around mx-8 lg:flex-row md:py-24 lg:py-4 lg:p-4">
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
                  <CardPaymentMethodDebit />
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
                  <CardPaymentMethodBank />
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
                  <CardPaymentMethodATM />
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
                  <CardPaymentMethodOTC />
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
                  <CardPaymentMethodEwallet />
                </motion.div>
              )}
            </div>
          </div>
        </div>
        <CardDataReservasion />
      </main>
    </>
  );
}
