import { useEffect } from "react";
import useUserStore from "./use-session";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    const checkUserToken = useUserStore((state) => state.checkUserToken);
  
    useEffect(() => {
      checkUserToken();
    }, [checkUserToken]);
    
  
    return <>{children}</>;
  }
  