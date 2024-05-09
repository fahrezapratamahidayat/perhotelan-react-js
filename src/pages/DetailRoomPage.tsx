import Navbar from "@/components/navigation/navbar";
import { TypeDetailRoom } from "@/types";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailRoomPage() {
  const { id } = useParams();
  const [detailRoom, setDetailRoom] = useState<TypeDetailRoom[]>();

  const getRoomsData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/rooms/${id}`);
      setDetailRoom(response.data.data); // Pastikan ini adalah data yang benar
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    getRoomsData();
  }, [getRoomsData]);
  if (!detailRoom || detailRoom.length === 0) return <div>Loading...</div>;
  return (
    <div className="min-h-screen">
        <Navbar />
        <main className="w-full p-6 lg:p-4 lg:px-8">
          <div className="w-full h">
            <img src={detailRoom[0].url} alt="" />
          </div>
        </main>
    </div>
  );
}
