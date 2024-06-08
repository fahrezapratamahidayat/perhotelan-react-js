import { Home, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import NavbarAdmin from "@/components/navigation/navbarAdmin";
import { AvatarDropDown } from "@/components/dropdown/avatar-dropdown";
import TableCustomer, { columns } from "@/components/table/table-customer";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { reservasiTypes } from "@/types";
import { useEffect, useState } from "react";
import CardOrder from "@/components/card/card-order";
import * as XLSX from "xlsx";
import { NavbarMobile } from "@/components/navigation/nvabar-mobile";

export function OrdersPage() {
  const { mutate } = useSWRConfig();
  const [selectedReservation, setSelectedReservation] = useState(
    {} as reservasiTypes
  );
  const [selectedReservationId, setSelectedReservationId] = useState<number>(0);

  const fetcher = async () => {
    const res = await axios.get("http://localhost:3000/api/reservation");
    return res.data.datas;
  };

  const { data, error, isLoading } = useSWR<reservasiTypes[]>("/reservation", fetcher);

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedReservation(data[0]);
      setSelectedReservationId(data[0].idReservasi);
    }
  }, [data]);

  const handleSelectReservation = (item: reservasiTypes) => {
    setSelectedReservation(item);
    setSelectedReservationId(item.idReservasi);
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const cleanDataForExport = (data: reservasiTypes[]) => {
    return data
      .filter((item) => !!(item.tamu && item.Pembayaran))
      .map((item, index) => ({
        ...item,
        no: index + 1,
        idReservasi: item.idReservasi || "N/A",
        idTamu: item.tamu.idTamu || "N/A",
        idPembayaran: item.Pembayaran.idPembayaran || "N/A",
        idKamar: item.kamar.idKamar || "N/A",
        emailTamu: item.tamu.emailTamu || "N/A",
        namaTamu: item.tamu.namaTamu || "N/A",
        tanggalCheckIn: item.tanggalCheckIn || "N/A",
        tanggalCheckOut: item.tanggalCheckOut || "N/A",
        statusPembayaran: item.Pembayaran.statusPembayaran || "N/A",
      }));
  };
  const exportToExcel = () => {
    const cleanedData = cleanDataForExport(data || []);
    const ws = XLSX.utils.json_to_sheet(cleanedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Reservasi");
    XLSX.writeFile(wb, "data_reservasi.xlsx");
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavbarAdmin />
      <div className="flex flex-col">
        <NavbarMobile />  
        <main className="grid flex-1 gap-4 items-start p-4 mt-5 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max gap-4 items-start md:gap-8 lg:col-span-2">
              <TableCustomer
                data={data as reservasiTypes[]}
                selectedReservation={handleSelectReservation}
                columns={columns}
              />
          </div>
          <div>
            {selectedReservation.idReservasi && (
              <CardOrder data={selectedReservation} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
