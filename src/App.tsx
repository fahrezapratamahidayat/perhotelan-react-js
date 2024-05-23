import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RoomsPage from "./pages/RoomsPage";
import DetailRoomPage from "./pages/DetailRoomPage";
import ReservasiFormPage from "./pages/ReservasiFormPage";
import PaymentPage from "./pages/PaymentPage";
import LoginForm from "./components/form/login-form";
import RegisterForm from "./components/form/register-form";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="rooms/:id" element={<DetailRoomPage />} />
        <Route path="rooms/:id/reserve" element={<ReservasiFormPage />} />
        <Route path="rooms/:id/reserve/payment" element={<PaymentPage />} />
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/auth/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}
