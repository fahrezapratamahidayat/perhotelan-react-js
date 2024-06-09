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
      navigate("/auth/login", {
        state: { from: location.pathname },
        replace: true,
      });
      return;
    }

    if (
      adminOnly &&
      userData?.peran !== "Admin" &&
      userData?.peran !== "Pegawai"
    ) {
      toast({
        title: "Unauthorized",
        description: "You are not authorized to access this page",
        variant: "destructive",
      });
      navigate("/auth/login", {
        state: { from: location.pathname },
        replace: true,
      });
    }
  }, [login, adminOnly, userData, toast, navigate, location]);

  if (
    login &&
    (!adminOnly ||
      (adminOnly && userData?.peran === "Admin") ||
      userData?.peran === "Pegawai")
  ) {
    return children;
  }

  return null;
}
