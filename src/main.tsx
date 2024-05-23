import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage.tsx";
import axios from "axios";
import { Toaster } from "./components/ui/toaster.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import { ThemeProvider } from "./components/providers/theme-provider.tsx";
import CreateRoomPage from "./pages/CreateRoomPage.tsx";
import { AuthWrapper } from "./hooks/session-provider.tsx";
import RoomsPage from "./pages/RoomsPage.tsx";
import DetailRoomPage from "./pages/DetailRoomPage.tsx";
import ReservasiFormPage from "./pages/ReservasiFormPage.tsx";
import PaymentPage from "./pages/PaymentPage.tsx";
import HomePage from "./pages/HomePage.tsx";

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "auth/login",
    element: <LoginPage />,
  },
  {
    path: "auth/register",
    element: <RegisterPage />,
  },
  {
    path: "rooms",
    element: <RoomsPage />,
  },
  {
    path: "rooms/:id",
    element: <DetailRoomPage />,
  },
  {
    path: "rooms/:id/reserve",
    element: <ReservasiFormPage />,
  },
  {
    path: "rooms/:id/reserve/payment",
    element: <PaymentPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthWrapper>
      <ThemeProvider>
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthWrapper>
  </React.StrictMode>
);
