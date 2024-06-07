import {
  ArrowUpDown,
  ChevronDown,
  Edit2,
  EyeIcon,
  MoreHorizontal,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Image, Rooms } from "@/types";
import { formatCurrency, formatDate } from "@/utils/helpers";
import React, { useEffect, useMemo, useState } from "react";
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
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { mutate } from "swr";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { useMediaQuery } from "usehooks-ts";
import { useRoomManagement,useRoomManagementStore } from "@/hooks/use-room-management"; // Pastikan ini diimpor dengan benar

export const columns: ColumnDef<Rooms>[] = [
  {
    accessorKey: "Gambar",
    header: ({ column }) => <div className="hidden sm:table-cell">Gambar</div>,
    cell: ({ row }) => {
      const url: Image[] = row.getValue("Gambar");
      return (
        <img
          className="hidden object-cover rounded-md aspect-square sm:table-cell"
          height="100"
          src={url[0].urlGambar}
          width="100"
        />
      );
    },
  },
  {
    accessorKey: "namaKamar",
    header: ({ column }) => <div className="">Nama Kamar</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("namaKamar")}</div>;
    },
  },
  {
    accessorKey: "statusKamar",
    header: ({ column }) => <div className="">Status Kamar</div>,
    cell: ({ row }) => {
      return <Badge variant="outline">{row.getValue("statusKamar")}</Badge>;
    },
  },
  {
    accessorKey: "hargaKamar",
    header: ({ column, table }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            const isSortedAsc = column.getIsSorted() === "asc";
            table.setSorting([{ id: column.id, desc: isSortedAsc }]);
          }}
        >
          Harga Kamar
          <ArrowUpDown
            className={`ml-2 w-4 h-4 ${
              column.getIsSorted()
                ? column.getIsSorted() === "asc"
                  ? "rotate-180"
                  : ""
                : ""
            }`}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      const hargaKamar = row.getValue<number>("hargaKamar");
      const diskonKamar = row.original.diskonKamar;
      const price = hargaKamar * (1 - diskonKamar / 100);
      return (
        <div className="p-4 align-middle [&:has([role=checkbox])]:pr-0 hidden sm:table-cell">
          Rp. {formatCurrency(price)}
        </div>
      );
    },
  },
  {
    accessorKey: "tipeKamar",
    header: () => <div className="hidden sm:table-cell">Tipe Kamar</div>,
    cell: ({ row }) => {
      return (
        <div className="hidden font-medium sm:table-cell">
          {row.getValue("tipeKamar")}
        </div>
      );
    },
  },
  {
    accessorKey: "tanggalDibuat",
    header: () => <div className="hidden sm:table-cell">Tanggal Dibuat</div>,
    cell: ({ row }) => {
      return (
        <div className="hidden font-medium sm:table-cell">
          {formatDate(row.original.tanggalDibuat, "dd MMM yyyy HH:mm")}
        </div>
      );
    },
  },
  {
    accessorKey: "tanggalDiupdate",
    header: () => <div className="hidden sm:table-cell">Tanggal DiUpdate</div>,
    cell: ({ row }) => {
      return (
        <div className="hidden font-medium sm:table-cell">
          {formatDate(row.original.tanggalDiupdate, "dd MMM yyyy HH:mm")}
        </div>
      );
    },
  },
  {
    header: () => <div className="">Action</div>,
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { handleDelete,handleEdit, handleView } = useRoomManagement();
      const room = row.original;
      const roomId = room.idKamar;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="w-4 h-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleView(roomId)}>
              <EyeIcon className="mr-2 w-4 h-4" />
              Lihat
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEdit(roomId)}>
              <Edit2 className="mr-2 w-4 h-4" />
              Edit kamar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(roomId, room)}
            >
              <Trash2 className="mr-2 w-4 h-4" />
              Hapus kamar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function TableRooms<TData extends Rooms, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const [roomsId, setRoomsId] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] = useState({} as Rooms);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [statusFilter, setStatusFilter] = useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const filteredData = useMemo(() => {
    return data.filter((room) => {
      return statusFilter ? room.statusKamar === statusFilter : true;
    });
  }, [data, statusFilter]);

  const isSmall = useMediaQuery("(max-width: 640px)"); // Tailwind sm
  const isMedium = useMediaQuery("(min-width: 641px) and (max-width: 768px)"); // Tailwind md
  const isLarge = useMediaQuery("(min-width: 769px) and (max-width: 1024px)"); // Tailwind lg
  const isExtraLarge = useMediaQuery("(min-width: 1025px)"); // Tailwind xl

  const { dialogEdit,setDialogEdit } = useRoomManagementStore();
  const { onDelete } = useRoomManagement();
  
  useEffect(() => {
    if (isSmall) {
      setColumnVisibility({
        Gambar: false,
        hargaKamar: false,
        tipeKamar: false,
        tanggalDibuat: false,
        tanggalDiupdate: false,
        namaKamar: true,
        statusKamar: true,
        actions: true,
      });
    } else if (isMedium || isLarge) {
      setColumnVisibility((prev) => ({
        ...prev,
        Gambar: false,
        hargaKamar: true,
        tipeKamar: true,
        tanggalDibuat: false,
        tanggalDiupdate: false,
      }));
    } else if (isExtraLarge) {
      setColumnVisibility((prev) => ({
        ...prev,
        Gambar: true,
        tanggalDibuat: true,
        tanggalDiupdate: false,
      }));
    }
  }, [isSmall, isMedium, isLarge, isExtraLarge]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

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
          <div className="flex flex-wrap gap-2 pb-4 lg:flex-row lg:items-center">
            <Input
              placeholder="Cari Kamar disini ..."
              value={(table.getState().globalFilter as string) ?? ""}
              onChange={(event) => {
                const value = event.target.value;
                table.setGlobalFilter(value);
              }}
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="lg:ml-auto">
                  Columns <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className={cn(`capitalize`, {})}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="">
                  Filter Status <ChevronDown className="ml-2 w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setStatusFilter("")}>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={() => setStatusFilter("")}
                    checked={statusFilter === ""}
                  >
                    Semua
                  </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setStatusFilter("Tersedia")}>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={() => setStatusFilter("Tersedia")}
                    checked={statusFilter === "Tersedia"}
                  >
                    Tersedia
                  </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setStatusFilter("Dipesan")}>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={() => setStatusFilter("Dipesan")}
                    checked={statusFilter === "Dipesan"}
                  >
                    Dipesan
                  </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center">
              <Button
                className="ml-auto"
                onClick={() => navigate("/admin/rooms/create")}
              >
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Tambah Kamar
                </span>{" "}
                <PlusCircle className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
          <Table>
            {" "}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        {/* <CardFooter>
          <div className="text-xs text-muted-foreground">
            Menampilkan{" "}
            <strong>
              {data.currentPage * data.limit - data.limit + 1}-
              {Math.min(data.currentPage * data.limit, data.totalRooms)}
            </strong>{" "}
            dari <strong>{data.totalRooms}</strong> kamar
          </div>
        </CardFooter> */}
      </Card>
      <div className="flex justify-end items-center py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Menampilkan
          <strong> {table.getFilteredRowModel().rows.length}</strong> kamar
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
