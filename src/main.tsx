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
import { AuthWrapper } from "./hooks/session-provider.tsx";
import RoomsPage from "./pages/RoomsPage.tsx";
import DetailRoomPage from "./pages/DetailRoomPage.tsx";
import ReservasiFormPage from "./pages/ReservasiFormPage.tsx";
import PaymentPage from "./pages/PaymentPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ReservationsPage from "./pages/ReservationsPage.tsx";
import { DashBoardRoomsPage } from "./pages/DasboardRoomsAdmin.tsx";
import CreateRoomPage from "./pages/CreateRoomPage.tsx";
import AuthRoute from "./middlewares/auth-route.tsx";
import EditRoomPage from "./pages/EditRoomPage.tsx";
import { OrdersPage } from "./pages/OrdersPage.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import { CustumersPage } from "./pages/CustumersPage.tsx";
import { LoginAdminPage } from "./pages/LoginAdminPage.tsx";
import CreateOrdersPage from "./pages/createOrdersPage.tsx";

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
    path: "auth/login/pegawai",
    element: <LoginAdminPage />,
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
  {
    path: "reservations",
    element: <ReservationsPage />,
  },
  {
    path: "admin/dashboard",
    element: (
      <AuthRoute adminOnly={true}>
        <Dashboard />
      </AuthRoute>
    ),
  },
  {
    path: "admin/rooms",
    element: (
      <AuthRoute adminOnly={true}>
        <DashBoardRoomsPage />
      </AuthRoute>
    ),
  },
  {
    path: "admin/orders",
    element: (
      <AuthRoute adminOnly={true}>
        <OrdersPage />
      </AuthRoute>
    ),
  },
  {
    path: "admin/orders/create",
    element: (
      <AuthRoute adminOnly={true}>
        <CreateOrdersPage />
      </AuthRoute>
    ),
  },
  {
    path: "admin/rooms/create",
    element: (
      <AuthRoute adminOnly={true}>
        <CreateRoomPage />
      </AuthRoute>
    ),
  },
  {
    path: "admin/rooms/edit/:id",
    element: (
      <AuthRoute adminOnly={true}>
        <EditRoomPage />
      </AuthRoute>
    ),
  },
  {
    path: "admin/customers",
    element: (
      <AuthRoute adminOnly={true}>
        <CustumersPage />
      </AuthRoute>
    ),
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthWrapper>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Toaster />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthWrapper>
  </React.StrictMode>
);
