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

axios.defaults.withCredentials = true;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    path: "/create-room",
    element: <CreateRoomPage />,
  },
  {
    path: "/rooms",
    element: <RoomsPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
    <ThemeProvider>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);
