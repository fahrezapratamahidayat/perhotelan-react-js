import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Users2,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { AvatarDropDown } from "@/components/dropdown/avatar-dropdown";
import NavbarAdmin from "@/components/navigation/navbarAdmin";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TableTransactions from "@/components/table/table-transactions";
import useSWR, { useSWRConfig } from "swr";
import { analytics, analyticsmonthly, reservasiTypes } from "@/types";
import axios from "axios";
import { formatCurrency } from "@/utils/helpers";
import { Overview } from "@/components/card/card-analytics";
import { NavbarMobile } from "@/components/navigation/nvabar-mobile";

  const fetcher = async (url: string) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${url}`);
      return data.data;
    } catch (error: any) {
      throw new Error(`Gagal mengambil data dari server: ${error.response?.statusText || error.message}`);
    }
  };
export function Dashboard() {
  const { mutate } = useSWRConfig();
  const {
    data: Reservasi,
    error: errorReservasi,
    isValidating: isLoadingReservasi,
  } = useSWR<reservasiTypes[]>("successful-reservations", fetcher);

  const {
    data: analyticsData,
    error: errorAnalytics,
    isValidating: isLoadingAnalytics,
  } = useSWR<analytics>("analytics", fetcher);
  const {
    data: analyticsMonthlyData,
    error: errorAnalyticsMonthly,
    isValidating: isLoadingAnalyticsMonthly,
  } = useSWR<analyticsmonthly>("analytics/monthly-revenue", fetcher);

 if (isLoadingReservasi || isLoadingAnalytics || isLoadingAnalyticsMonthly) return <div>Loading...</div>;
 if (errorReservasi || errorAnalytics || errorAnalyticsMonthly)
   return (
     <div>Error: {errorReservasi?.message || errorAnalytics?.message}</div>
   );
   console.log(analyticsMonthlyData)
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavbarAdmin />
      <div className="flex flex-col">
        <NavbarMobile />
        <main className="flex-1 p-8 pt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Total Pendapatan
                </CardTitle>
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(analyticsData?.totalPendapatan ?? 0)}
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Total Pengguna
                </CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData?.totalPengguna ?? 0}
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Total Reservasi
                </CardTitle>
                <CreditCard className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData?.totalReservasi ?? 0}
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">
                  Total Kamar
                </CardTitle>
                <Activity className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData?.totalKamar}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview data={analyticsMonthlyData as undefined} />
              </CardContent>
            </Card>
            <Card
              className="col-span-4 lg:col-span-3"
              x-chunk="dashboard-01-chunk-4"
            >
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Transactions</CardTitle>
                  <CardDescription>
                    Transaksi terbaru dari Perhotelan Anda.
                  </CardDescription>
                </div>
                <Button asChild size="sm" className="gap-1 ml-auto">
                  <Link to="#">
                    View All
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="max-w-lg">
                <TableTransactions data={Reservasi} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
