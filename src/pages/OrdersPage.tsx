import {
  File,
  Home,
  LineChart,
  ListFilter,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import NavbarAdmin from "@/components/navigation/navbarAdmin";
import { AvatarDropDown } from "@/components/dropdown/avatar-dropdown";
import TableCustomer from "@/components/table/table-customer";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { Resevasi, reservasiTypes } from "@/types";
import { useEffect, useState } from "react";
import CardOrder from "@/components/card/card-order";
import * as XLSX from "xlsx";
import { id } from "date-fns/locale";

export function OrdersPage() {
  const { mutate } = useSWRConfig();
  const [selectedReservation, setSelectedReservation] = useState(
    {} as reservasiTypes
  );
  const [selectedReservationId, setSelectedReservationId] = useState<number>(0);

  const fetcher = async () => {
    const res = await axios.get("http://localhost:3000/api/reservation");
    return res.data;
  };

  const { data, error, isLoading } = useSWR<Resevasi>("/reservation", fetcher);

  useEffect(() => {
    if (data && data.datas && data.datas.length > 0) {
      setSelectedReservation(data.datas[0]);
      setSelectedReservationId(data.datas[0].idReservasi);
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
    const cleanedData = cleanDataForExport(data?.datas || []);
    const ws = XLSX.utils.json_to_sheet(cleanedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Reservasi");
    XLSX.writeFile(wb, "data_reservasi.xlsx");
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavbarAdmin />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="#"
                  className="flex gap-2 items-center text-lg font-semibold"
                >
                  <Package2 className="w-6 h-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Orders
                  <Badge className="flex justify-center items-center ml-auto w-6 h-6 rounded-full shrink-0">
                    6
                  </Badge>
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="w-5 h-5" />
                  Rooms
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="w-5 h-5" />
                  Customers
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="w-5 h-5" />
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex-1 w-full">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search Rooms..."
                  className="pl-8 w-full shadow-none appearance-none bg-background md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <AvatarDropDown />
        </header>
        <main className="grid flex-1 gap-4 items-start p-4 mt-5 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max gap-4 items-start md:gap-8 lg:col-span-2">
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="flex gap-2 items-center ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 h-7 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Fulfilled
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Declined
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Refunded
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1 h-7 text-sm"
                    onClick={exportToExcel}
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                </div>
              </div>
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Reservasi Hotel</CardTitle>
                    <CardDescription>
                      Reservasi terbaru dari hotel Anda.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TableCustomer
                      data={data}
                      selectedReservation={handleSelectReservation}
                      selectedReservationId={selectedReservationId}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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
