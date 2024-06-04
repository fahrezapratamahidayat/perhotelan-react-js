import {
  Bell,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useParams } from "react-router-dom";
import { AvatarDropDown } from "@/components/dropdown/avatar-dropdown";
import { FormCreateRoom } from "@/components/form/form-create-room";
import useSWR, { useSWRConfig } from "swr";
import { Rooms } from "@/types";
import axios from "axios";
import { FormEditRoom } from "@/components/form/form-edit-room";
import NavbarAdmin from "@/components/navigation/navbarAdmin";
import { NavbarMobile } from "@/components/navigation/nvabar-mobile";

export default function EditRoomPage() {
  const {mutate } = useSWRConfig()
  const { id } = useParams()
  
  const fetcher = async () => {
    const response = await axios.get(`http://localhost:3000/api/rooms/${id}`);
    return response.data.datas;
  }

  const { data, error, isLoading } = useSWR<Rooms>(`/rooms/${id}`, fetcher);
  if(error) return <div>failed to load</div>;
  if(isLoading) return <div>loading...</div>;
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavbarAdmin />
      <div className="flex flex-col">
        <NavbarMobile />
        <main className="grid flex-1 gap-4 items-start p-4 mt-5 sm:px-6 sm:py-0 md:gap-8">
          <FormEditRoom data={data as Rooms} id={id as string} />
        </main>
      </div>
    </div>
  );
}
