import { useEffect } from "react";
import useUserStore from "./use-session";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const checkUserToken = useUserStore((state) => state.checkUserToken);

  useEffect(() => {
    checkUserToken();
  }, [checkUserToken]);

  return <>{children}</>;
}

const useCheckSession = () => {
  const { toast } = useToast();
  const { checkUserToken } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = checkUserToken();
    if (!checkToken.login) {
      toast({
        title: "Session Expired",
        description: "Please login again",
        variant: "destructive",
      });
      navigate("/auth/login");
    }
  }, [checkUserToken, navigate, toast]);
};

// eslint-disable-next-line react-refresh/only-export-components
export default useCheckSession;
