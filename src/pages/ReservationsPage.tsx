import ReservationsList from "@/components/card/reservation-list";
import Navbar from "@/components/navigation/navbar";
import useUserStore from "@/hooks/use-session";
import { reservasiTypes } from "@/types";
import axios from "axios";
import React from "react";
import useSWR, { useSWRConfig } from "swr";

export default function ReservationsPage() {
  const { userData } = useUserStore();
  const { mutate } = useSWRConfig();

  const fetcher = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/reservation/user/${userData?.tamuId}`
    );
    return response.data.data;
  };

  const { data, error, isLoading } = useSWR<reservasiTypes[]>(
    "/reservations",
    fetcher
  );
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:justify-between lg:flex-col ">
        {data?.map((reservation: reservasiTypes, index: number) => (
          <ReservationsList
            key={reservation.reservationId}
            data={reservation}
            index={index}
          />
        ))}
      </div>
    </>
  );
}
