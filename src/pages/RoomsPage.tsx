import Navbar from "@/components/navigation/navbar";
import axios from "axios";
import { Rooms } from "@/types";
import { CardHotel } from "@/components/card/cardHotel";
import useSwr, { useSWRConfig } from "swr";
import ErrorPage from "@/components/error/error-page";

export default function RoomsPage() {
  const { mutate } = useSWRConfig();

  const fetcher = async () => {
    const response = await axios.get("http://localhost:3000/api/rooms");
    return response.data.data;
  };

  const reset = () => {
    mutate("/rooms");
  };

  const { data, error, isLoading } = useSwr("/rooms", fetcher);
  if (error) return <ErrorPage error={error} reset={reset} />;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="min-h-screen ">
      <Navbar />
      <main className="w-full p-6 lg:p-4 lg:px-8">
        <div className="grid grid-cols-4 gap-4">
          {data && data.length > 0 ? (
            data.map((room: Rooms) => (
              <CardHotel key={room.nomerKamar} data={room} className="w-full" />
            ))
          ) : (
            <p>No rooms found</p>
          )}
        </div>
      </main>
    </div>
  );
}
