import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
export default function NavbarAdmin() {
  const pathname = useLocation().pathname;
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex flex-col gap-2 h-full max-h-screen">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex gap-2 items-center font-semibold">
            <Package2 className="w-6 h-6" />
            <span className="">Luxury Hotel</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto w-8 h-8">
            <Bell className="w-4 h-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to="/admin/dashboard"
              className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg ${
                pathname.includes("/dashboard") ? "bg-muted" : "hover:bg-muted"
              } text-primary hover:text-primary`}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="/admin/orders"
              className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg ${
                pathname.includes("/orders") ? "bg-muted" : "hover:bg-muted"
              } text-primary hover:text-primary`}
            >
              <ShoppingCart className="w-4 h-4" />
              Orders
              <Badge className="flex justify-center items-center ml-auto w-6 h-6 rounded-full shrink-0">
                6
              </Badge>
            </Link>
            <Link
              to="/admin/rooms"
              className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg ${
                pathname.includes("/rooms") ? "bg-muted" : "hover:bg-muted"
              } text-primary hover:text-primary`}
            >
              <Package className="w-4 h-4" />
              Rooms{" "}
            </Link>
            <Link
              to="/admin/customers"
              className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg ${
                pathname.includes("/customers") ? "bg-muted" : "hover:bg-muted"
              } text-primary hover:text-primary`}
            >
              <Users className="w-4 h-4" />
              Customers
            </Link>
            <Link
              to="/admin/analytics"
              className={`flex items-center gap-3 px-3 py-2 transition-all rounded-lg ${
                pathname.includes("/analytics") ? "bg-muted" : "hover:bg-muted"
              } text-primary hover:text-primary`}
            >
              <LineChart className="w-4 h-4" />
              Analytics
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
