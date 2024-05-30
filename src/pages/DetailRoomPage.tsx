import Navbar from "@/components/navigation/navbar";
import { detailRoom } from "@/types";
import axios from "axios";
import { FireExtinguisherIcon, Flame, Heart, ShieldCheck } from "lucide-react";
import { SVGProps } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FasilityRoomPremium } from "@/components/room/roomDetails";
import { Separator } from "@/components/ui/separator";
import useUserStore from "@/hooks/use-session";
import { formatCurrency } from "@/utils/helpers";
import ErrorPage from "@/components/error/error-page";

export default function DetailRoomPage() {
  const { id } = useParams();
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  const { userData } = useUserStore();

  const fetcher = async () => {
    const response = await axios.get(`http://localhost:3000/api/rooms/${id}`);
    return response.data.datas;
  };

  const { data, error, isLoading } = useSWR<detailRoom>(`/rooms`, fetcher);
if (error) return <ErrorPage error={error} reset={() => mutate("/rooms")} />;
if (!data || !data.images || data.images.length === 0)
  return <div>Loading...</div>;
if (isLoading) return <div>Loading...</div>;
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="grid gap-4">
            <img
              alt="Hotel Room"
              className="object-cover aspect-video rounded-xl"
              height={600}
              src={data.images[0].url}
              width={800}
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {data.namaKamar}
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              {data.deskripsiKamar} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Nam officiis error, cupiditate reiciendis,
              impedit, velit hic fugiat esse nemo earum ut amet nulla? Animi
              suscipit qui minima soluta enim est necessitatibus, fugiat iusto
              reiciendis rerum fuga. Laudantium a, modi voluptas laborum maiores
              eum, laboriosam, recusandae voluptate quaerat ad veniam
              perspiciatis.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-17">
        <div className="container grid items-start gap-6 px-4 md:px-6 lg:grid-cols-[1fr_400px] lg:gap-12">
          <div className="grid gap-8">
            <div className="grid gap-2">
              <h2 className="text-2xl font-bold">Room Details</h2>
              <FasilityRoomPremium data={data} />
            </div>
            <div className="grid gap-2">
              <h2 className="text-2xl font-bold">Safety and cleanliness</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6" />
                  <div className="text-muted-foreground">Daily cleaning</div>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6" />
                  <div className="text-muted-foreground">
                    Disinfection and Sterilization
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FireExtinguisherIcon className="w-6 h-6" />
                  <div className="text-muted-foreground">
                    Fire Extinguishers
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-6 h-6" />
                  <div className="text-muted-foreground">Smoke Detector</div>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <h2 className="text-2xl font-bold">Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {data.images.map((image) => (
                  <img
                    key={image.id}
                    alt="Hotel Room"
                    className="object-cover aspect-video rounded-xl"
                    height={600}
                    src={image.url}
                    width={800}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <Card>
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="flex items-center justify-between w-full gap-0.5">
                  <CardTitle>{data.namaKamar}</CardTitle>
                  <Heart />
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Tentang Kamar</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Harga per malam
                      </span>
                      <span>Rp. {formatCurrency(data.hargaKamar)}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Diskon / Promo
                      </span>
                      <span>{data.diskonKamar}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Type Kamar
                      </span>
                      <span>{data.typeKamar}</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col gap-4 mt-4">
                  <Button
                    className="w-full"
                    onClick={() => {
                      if (userData) {
                        navigate(`/rooms/${id}/reserve`);
                      } else {
                        alert("Please login first");
                      }
                    }}
                  >
                    Resevasi Sekarang
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

function BedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  );
}

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function DiscIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function RulerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
      <path d="m14.5 12.5 2-2" />
      <path d="m11.5 9.5 2-2" />
      <path d="m8.5 6.5 2-2" />
      <path d="m17.5 15.5 2-2" />
    </svg>
  );
}

function WifiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h.01" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <path d="M5 12.859a10 10 0 0 1 14 0" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    </svg>
  );
}
