import {
  Database,
  History,
  LifeBuoy,
  Link2,
  ListOrderedIcon,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Suspense } from "react";
import useUserStore from "@/hooks/use-session";
import { Link, useLocation } from "react-router-dom";
import { DashboardIcon } from "@radix-ui/react-icons";
export function AvatarDropDown() {
  const { checkUserToken, signOut, userData } = useUserStore();
  const { login } = checkUserToken();
  const location = useLocation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      {(userData && userData.peran === "Pegawai") ||
      userData?.peran === "Admin" ? (
        <DropdownMenuContent className="w-56 mt-2 mr-4">
          <DropdownMenuLabel
            className={`flex flex-col ${login ? "" : "hidden"}`}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <h3 className="text-sm font-medium">
                {userData?.namaTamu || userData?.namaPegawai} ({userData?.peran}
                )
              </h3>
              <p className="text-sm text-muted-foreground">
                {userData?.emailTamu || userData?.emailPegawai}
              </p>
            </Suspense>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className={` ${login ? "" : "hidden"}`} />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <DashboardIcon className="w-4 h-4 mr-2" />
              <Link to={"/admin/dashboard"}>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ListOrderedIcon className="w-4 h-4 mr-2" />
              <Link to={"/admin/orders"}>Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Database className="w-4 h-4 mr-2" />
              <Link to={"/admin/rooms"}>Kamar</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LifeBuoy className="w-4 h-4 mr-2" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={` ${login ? "" : "hidden"}`}>
            <LogOut className="w-4 h-4 mr-2" />
            <Button
              className="h-0 px-0 py-0"
              variant={"ghost"}
              onClick={() => signOut()}
            >
              {" "}
              Log out
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className={` ${login ? "hidden" : ""}`}>
            <Link2 className="w-4 h-4 mr-2" />
            <Link to={`/auth/login?callbackUrl=${location.pathname}`}>
              Login
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="w-56 mt-2 mr-4">
          <DropdownMenuLabel
            className={`flex flex-col ${login ? "" : "hidden"}`}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <h3 className="text-sm font-medium">{userData?.namaTamu}</h3>
              <p className="text-sm text-muted-foreground">
                {userData?.emailTamu}
              </p>
            </Suspense>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className={` ${login ? "" : "hidden"}`} />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              <Link to={"/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              <Link to={"/settings"}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <History className="w-4 h-4 mr-2" />
              <Link to={"/reservations"}>Reservations</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LifeBuoy className="w-4 h-4 mr-2" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={` ${login ? "" : "hidden"}`}>
            <LogOut className="w-4 h-4 mr-2" />
            <Button
              className="h-0 px-0 py-0"
              variant={"ghost"}
              onClick={() => signOut()}
            >
              {" "}
              Log out
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className={` ${login ? "hidden" : ""}`}>
            <Link2 className="w-4 h-4 mr-2" />
            <Link to={`/auth/login?callbackUrl=${location.pathname}`}>
              Login
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
