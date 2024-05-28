import { Bell, Home, LineChart, Package, Package2, ShoppingCart, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export default function NavbarAdmin() {
  return (
    <div className="border-r bg-muted/40 md:block">
      <div className="flex flex-col h-full max-h-screen gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="w-6 h-6" />
            <span className="">Luxury Hotel</span>
          </Link>
          <Button variant="outline" size="icon" className="w-8 h-8 ml-auto">
            <Bell className="w-4 h-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="/admin/orders"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
            >
              <ShoppingCart className="w-4 h-4" />
              Orders
              <Badge className="flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0">
                6
              </Badge>
            </Link>
            <Link
              to="/admin/rooms"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg bg-muted text-primary hover:text-primary"
            >
              <Package className="w-4 h-4" />
              Rooms{" "}
            </Link>
            <Link
              to="/admin/customers"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
            >
              <Users className="w-4 h-4" />
              Customers
            </Link>
            <Link
              to="/admin/analytics"
              className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
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
