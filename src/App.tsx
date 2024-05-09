import { useState } from "react";
import Navbar from "./components/navigation/navbar";
import { Button } from "./components/ui/button";
import useUserStore from "./hooks/use-session";
import { redirect, useNavigate } from "react-router-dom";

export default function Example() {
  const navigate = useNavigate();
  const { userData, setUserData, checkUserToken, signOut } = useUserStore();

  return (
    <div className="min-h-screen ">
      <Navbar />
    </div>
  );
}
