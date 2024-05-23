import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rooms } from "@/types";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface CardHotelProps {
  data: Rooms;
  className?: string;
}

export function CardHotel({ data, className }: CardHotelProps) {
  return (
    <Card>
      <div className="overflow-hidden transition-shadow rounded-lg shadow-lg ">
        <div className="relative overflow-hidden transition duration-1000 transform group">
          <img
            alt="Hotel Image"
            className="object-cover w-full h-56 transition-transform group-hover:scale-105"
            height={400}
            src={data.images[0].url}
            style={{
              aspectRatio: "600/400",
              objectFit: "cover",
            }}
            width={600}
          />
          {/* <div className="absolute top-0 left-0 w-full h-full">
            <h1>test</h1>`
          </div> */}
          <div className="absolute left-0 flex items-center justify-center w-full h-full cursor-pointer -bottom-full bg-black/50 backdrop-blur-sm group-hover:bottom-0"></div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xl font-semibold">{data.namaKamar}</span>
          </div>
          <div className="flex items-center mb-2">
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            <span className="ml-2 text-muted-foreground">
              ({data.ratingKamar})
            </span>
          </div>
          <p className="mb-4 text-muted-foreground line-clamp-2">
            Luxurious beachfront resort with private beach access and
            world-class spa.
          </p>
          <div className="flex flex-col">
            <div className="flex items-center gap-x-1">
              <span className="text-base font-semibold">
                {" "}
                {(data.hargaKamar * (1 - data.diskonKamar / 100) + data.fasilitasKamar.hargaFasilitas).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </span>
              <span className="text-base"> /night</span>
            </div>
          </div>
          <Link
            to={`/rooms/${data.nomerKamar}?name=${data.namaKamar}&type=${data.typeKamar}`}
          >
            <Button className="w-full mt-3">Lihat Detail</Button>
          </Link>
        </CardContent>
      </div>
    </Card>
  );
}

function StarIcon(props: React.ComponentPropsWithoutRef<"svg">) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
