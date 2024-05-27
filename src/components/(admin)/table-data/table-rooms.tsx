import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TypeRooms } from "@/types";
import { formatCurrency } from "@/utils/helpers";

export default function TableRooms({ data }: { data: TypeRooms }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kamar</CardTitle>
        <CardDescription>
          Kelola kamar Anda dan lihat performa penjualan mereka.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Fasilitas
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((room) => (
              <TableRow>
                <TableCell className="hidden sm:table-cell">
                  <img
                    alt={room.images[0].name}
                    className="object-cover rounded-md aspect-square"
                    height="100"
                    src={room.images[0].url}
                    width="100"
                  />
                </TableCell>
                <TableCell className="font-medium">{room.namaKamar}</TableCell>
                <TableCell>
                  <Badge variant="outline">{room.statusKamar}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {" "}
                  Rp. {""}
                  {formatCurrency(
                    room.hargaKamar * (1 - room.diskonKamar / 100) +
                      room.fasilitasKamar.hargaFasilitas
                  )}
                </TableCell>
                <TableCell className="hidden md:table-cell">{room.typeKamar}</TableCell>
                <TableCell className="hidden md:table-cell">
                  2023-07-12 10:42 AM
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="w-4 h-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Menampilkan{" "}
          <strong>
            {data.currentPage * data.limit - data.limit + 1}-
            {Math.min(data.currentPage * data.limit, data.totalRooms)}
          </strong>{" "}
          dari <strong>{data.totalRooms}</strong> kamar
        </div>
      </CardFooter>
    </Card>
  );
}
