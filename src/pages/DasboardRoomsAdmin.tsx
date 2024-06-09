import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { File, ListFilter, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import TableRooms, { columns } from "@/components/(admin)/table-data/table-rooms";
import { AvatarDropDown } from "@/components/dropdown/avatar-dropdown";
import NavbarAdmin from "@/components/navigation/navbarAdmin";
import { NavbarMobile } from "@/components/navigation/nvabar-mobile";

export function DashBoardRoomsPage() {
  const { mutate } = useSWRConfig();

  const fetcher = async () => {
    const params = { statuskamar: "reserved" };
    const response = await axios.get("http://localhost:3000/api/rooms", {
      params,
    });
    return response.data;
  };
  const navigate = useNavigate();

  const { data, error, isLoading } = useSWR("/rooms", fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavbarAdmin />
      <div className="flex flex-col">
        <NavbarMobile />
        <main className="grid flex-1 gap-4 items-start p-4 mt-5 sm:px-6 sm:py-0 md:gap-8">
          {data.data && data.data.length ? (
            <div defaultValue="flex">
              {/* <div className="flex items-center">
                <div className="flex gap-2 items-center mb-3 ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1 h-8">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Active
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Archived
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm" variant="outline" className="gap-1 h-8">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Export
                    </span>
                  </Button>
                  <Button
                    size="sm"
                    className="gap-1 h-8"
                    onClick={() => navigate("/admin/rooms/create")}
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Tambah Kamar
                    </span>
                  </Button>
                </div>
              </div> */}
              <TableRooms data={data.data} columns={columns} />
            </div>
          ) : (
            <div
              className="flex flex-1 justify-center items-center h-full rounded-lg border border-dashed shadow-sm"
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col gap-1 items-center text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  Anda Belum Memiliki Kama
                </h3>
                <p className="text-sm text-muted-foreground">
                  Anda dapat mulai menjual begitu Anda menambahkan produk.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => navigate("/admin/rooms/create")}
                >
                  Tambah Kamar
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
