import Navbar from "@/components/navigation/navbar";
import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useUserStore from "@/hooks/use-session";
import axios from "axios";
import { useRoomStore } from "@/hooks/use-get-rooms";
import { Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Datum, TypeRooms } from "@/types";
import { CardHotel } from "@/components/card/cardHotel";

export default function RoomsPage() {
  const [roomsData, setRoomsData] = useState<Datum[]>([]);

  const getRoomsData = useCallback(async () => {
    const res = await axios
      .get("http://localhost:3000/api/rooms")
      .then((res) => res.data)
      .catch((err) => console.log(err));
    setRoomsData(res.data);
  }, [setRoomsData]);

  useEffect(() => {
    getRoomsData();
  }, [getRoomsData]);
  return (
    <div className="min-h-screen ">
      <Navbar />
      <main className="w-full p-6 lg:p-4 lg:px-8">
        <div className="grid grid-cols-4 gap-4">
          {roomsData && roomsData.length > 0 ? (
            roomsData?.map((room: Datum) => (
              <CardHotel key={room.Nama_kamar} data={room} className="w-full" />
            ))
          ) : (
            <p>No rooms found</p>
          )}
        </div>
      </main>
    </div>
  );
}
