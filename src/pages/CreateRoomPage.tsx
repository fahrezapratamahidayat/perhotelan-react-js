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
import { Link } from "react-router-dom";
import { AvatarDropDown } from "@/components/dropdown/avatar-dropdown";
import { FormCreateRoom } from "@/components/form/form-create-room";
import NavbarAdmin from "@/components/navigation/navbarAdmin";
import { NavbarMobile } from "@/components/navigation/nvabar-mobile";

export default function CreateRoomPage() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavbarAdmin />
      <div className="flex flex-col">
        <NavbarMobile />
        <main className="grid flex-1 gap-4 items-start p-4 mt-5 sm:px-6 sm:py-0 md:gap-8">
          <FormCreateRoom />
        </main>
      </div>
    </div>
  );
}