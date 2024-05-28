import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useUserStore from "@/hooks/use-session";
import { useToast } from "@/components/ui/use-toast";

interface AuthRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
}

export default function AuthRoute({ children, adminOnly }: AuthRouteProps) {
  const { userData, checkUserToken } = useUserStore();
  const { login } = checkUserToken();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!login) {
      // Jika tidak login, arahkan kembali ke halaman login dengan state dari halaman sebelumnya
      navigate("/auth/login", {
        state: { from: location.pathname },
        replace: true,
      });
      return;
    }

    if (adminOnly && userData?.roleTamu !== "Admin") {
      toast({
        title: "Unauthorized",
        description: "You are not authorized to access this page",
        variant: "destructive",
      });
      // Jika tidak memiliki peran admin, arahkan kembali ke halaman login dengan state dari halaman sebelumnya
      navigate("/auth/login", {
        state: { from: location.pathname },
        replace: true,
      });
    }
  }, [login, adminOnly, userData, toast, navigate, location]);

  // Jika login dan userData valid, atau kondisi admin tidak diperlukan, tampilkan children
  if (login && (!adminOnly || (adminOnly && userData?.roleTamu === "Admin"))) {
    return children;
  }

  // Jika belum login atau sedang menunggu data, tampilkan null
  // Pengguna tidak akan melihat apa-apa selama kondisi ini
  return null;
}
