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
import TableRooms from "@/components/(admin)/table-data/table-rooms";
import { AvatarDropDown } from "@/components/dropdown/avatar-dropdown";
import NavbarAdmin from "@/components/navigation/navbarAdmin";
import { NavbarMobile } from "@/components/navigation/nvabar-mobile";
import TableUsers, { columns } from "@/components/table/table-users";
import { ColumnDef } from "@tanstack/react-table";
import { Tamu } from "@/types";

export function CustumersPage() {
  const { mutate } = useSWRConfig();

  const fetcher = async () => {
    const params = { statuskamar: "reserved" };
    const response = await axios.get("http://localhost:3000/api/users");
    return response.data.datas;
  };
  const navigate = useNavigate();

  const { data, error, isLoading } = useSWR("/users", fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavbarAdmin />
      <div className="flex flex-col">
        <NavbarMobile />
        <main className="grid flex-1 gap-4 items-start p-4 mt-5 sm:px-6 sm:py-0 md:gap-8">
          <TableUsers data={data} columns={columns} />
        </main>
      </div>
    </div>
  );
}
