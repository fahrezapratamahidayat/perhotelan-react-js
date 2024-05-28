import { Edit2, EyeIcon, MoreHorizontal, Trash2 } from "lucide-react";
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
import { Rooms, TypeRooms } from "@/types";
import { formatCurrency } from "@/utils/helpers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { mutate } from "swr";

export default function TableRooms({ data }: { data: TypeRooms }) {
  const [roomsId, setRoomsId] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] = useState({} as Rooms);
  const [dialogEdit, setDialogEdit] = useState<boolean>(false);
  const navigate = useNavigate();
  const{toast }= useToast()

  const handleEdit = (id: number) => {
    setRoomsId(id);
    navigate(`/admin/rooms/edit/${id}`);
  };

  const handleDelete = (id: number, room: Rooms) => {
    setDialogEdit(true);
    setRoomsId(id);
    setSelectedRoom(room)
  };

  async function onDelete() {
    try {
      const respone = await axios.delete(`http://localhost:3000/api/rooms/${roomsId}`);
      if (respone.data.status === 200) {
        toast({
          title: "Berhasil",
          description: respone.data.message,
        });
        setDialogEdit(false);
        mutate("/rooms");
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <AlertDialog open={dialogEdit} onOpenChange={setDialogEdit}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apa kamu yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Anda akan menghapus data kamar yang dipilih secara permanen.
              Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin
              melanjutkan?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col gap-3">
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>Konfirmasi</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
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
                  <TableCell className="font-medium">
                    {room.namaKamar}
                  </TableCell>
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
                  <TableCell className="hidden md:table-cell">
                    {room.typeKamar}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    2023-07-12 10:42 AM
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => navigate(`/rooms/${room.nomerKamar}`)}
                        >
                          <EyeIcon className="w-4 h-4 mr-2" />
                          Lihat
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEdit(room.nomerKamar)}
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit kamar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className=""
                          onClick={() => handleDelete(room.nomerKamar, room)}
                        >
                          <Trash2 className="w-4 h-4 mr-2 " />
                          Hapus kamar
                        </DropdownMenuItem>
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
    </>
  );
}
