import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RoomsPage from "./pages/RoomsPage";
import DetailRoomPage from "./pages/DetailRoomPage";
import ReservasiFormPage from "./pages/ReservasiFormPage";
import PaymentPage from "./pages/PaymentPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="rooms" element={<RoomsPage />}>
          <Route path=":id" element={<DetailRoomPage />}>
            <Route path="reserve" element={<ReservasiFormPage />}>
              <Route path="payment" element={<PaymentPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
