import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  Menu,
  MoreVertical,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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
                  className="flex items-center gap-2 text-lg font-semibold"
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
                  <Badge className="flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0">
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
                  className="w-full pl-8 shadow-none appearance-none bg-background md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <AvatarDropDown />
        </header>
        <main className="grid items-start flex-1 gap-4 p-4 mt-5 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid items-start gap-4 auto-rows-max md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                  <CardTitle>Reservasi Anda</CardTitle>
                  <CardDescription className="max-w-lg leading-relaxed text-balance">
                    Memperkenalkan Dashboard Reservasi Dinamis Kami untuk
                    Manajemen yang Mudah dan Analisis yang Mendalam.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Buat Reservasi Baru</Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>Minggu Ini</CardDescription>
                  <CardTitle className="text-4xl">$1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% dari minggu lalu
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="Peningkatan 25%" />
                </CardFooter>
              </Card>

              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>Bulan Ini</CardDescription>
                  <CardTitle className="text-4xl">$5,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +10% dari bulan lalu
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="Peningkatan 12%" />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2 ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-sm h-7"
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
                    className="gap-1 text-sm h-7"
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
