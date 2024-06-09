import React, { useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { useSWRConfig } from "swr";
import { Resevasi, reservasiTypes } from "@/types";
import { formatDate } from "@/utils/helpers";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, Filter, PlusCircle } from "lucide-react";
import { cn } from "@/utils/cn";

interface Props {
  data: Resevasi | undefined;
  selectedReservation: (item: reservasiTypes) => void;
  selectedReservationId: number | null;
}

export const columns: ColumnDef<reservasiTypes>[] = [
  {
    accessorKey: "infoTamu",
    header: ({ column }) => <div className="text-left">Informasi Tamu</div>,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <div className="font-medium">{row.original.tamu.namaTamu}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {row.original.tamu.emailTamu}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "statusReservasi",
    header: ({ column }) => <div className="hidden sm:table-cell">Status</div>,
    cell: ({ row }) => (
      <div className="hidden sm:table-cell">
        <Badge variant="secondary">{row.original.statusReservasi}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "tanggalCheckIn",
    header: ({ column }) => (
      <div className="hidden sm:table-cell">Tgl Check In</div>
    ),
    cell: ({ row }) => (
      <div className="hidden sm:table-cell">
        {formatDate(row.original.tanggalCheckIn, "dd MMM yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "durasiMenginap",
    header: ({ column }) => (
      <div className="hidden sm:table-cell">Durasi Menginap</div>
    ),
    cell: ({ row }) => (
      <div className="hidden sm:table-cell">
        {row.original.durasiMenginap} Hari
      </div>
    ),
  },
  {
    accessorKey: "tanggalCheckOut",
    header: ({ column }) => (
      <div className="hidden sm:table-cell">Tgl Check Out</div>
    ),
    cell: ({ row }) => (
      <div className="">
        {" "}
        {formatDate(row.original.tanggalCheckOut, "dd MMM yyyy")}
      </div>
    ),
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectedReservation: (item: reservasiTypes) => void;
}
export default function TableCustomer<TData extends reservasiTypes, TValue>({
  data,
  selectedReservation,
}: DataTableProps<TData, TValue>) {
  const { mutate } = useSWRConfig();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [statusFilter, setStatusFilter] = React.useState("Menunggu");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const filteredData = useMemo(() => {
    return data.filter((room) => {
      return statusFilter ? room.statusReservasi === statusFilter : true;
    });
  }, [data, statusFilter]);

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
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Reservasi Hotel</CardTitle>
          <CardDescription>Reservasi terbaru dari hotel Anda.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 pb-4 lg:flex-row lg:items-center">
            <Input
              placeholder="Cari Reservasi disini..."
              value={(table.getState().globalFilter as string) ?? ""}
              onChange={(event) => {
                const value = event.target.value;
                table.setGlobalFilter(value);
              }}
              className="max-w-[250px]"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="lg:ml-auto">
                  Columns <ChevronDown className="w-4 h-4 ml-1 mt-0.5" />
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
                  <Filter className="w-4 h-4 mr-2" />
                  Filter Status
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
                <DropdownMenuItem onSelect={() => setStatusFilter("Diterima")}>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={() => setStatusFilter("Diterima")}
                    checked={statusFilter === "Diterima"}
                  >
                    Diterima
                  </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setStatusFilter("Menunggu")}>
                  <DropdownMenuCheckboxItem
                    onCheckedChange={() => setStatusFilter("Menunggu")}
                    checked={statusFilter === "Menunggu"}
                  >
                    Menunggu
                  </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setStatusFilter("Dibatalkan")}
                >
                  <DropdownMenuCheckboxItem
                    onCheckedChange={() => setStatusFilter("Dibatalkan")}
                    checked={statusFilter === "Dibatalkan"}
                  >
                    Dibatalkan
                  </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex items-center">
              <Button className="ml-auto">
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Buat Reservasi
                </span>{" "}
                <PlusCircle className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
          <Table>
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
                      <TableCell
                        className=""
                        key={cell.id}
                        onClick={() => {
                          if (cell.row.original) {
                            selectedReservation(row.original);
                          }
                        }}
                      >
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
      </Card>
    </>
  );
}
