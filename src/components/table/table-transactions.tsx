import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { reservasiTypes } from "@/types";
import { formatCurrency, formatDate } from "@/utils/helpers";

interface props {
  data: reservasiTypes[] | undefined;
}
export default function TableTransactions({ data }: props) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead className="">Tipe</TableHead>
            <TableHead className="">Tanggal</TableHead>
            <TableHead className="text-right">Harga</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.idReservasi}>
              <TableCell className="">
                <div className="font-medium">{item.tamu.namaTamu}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {item.tamu.emailTamu}
                </div>
              </TableCell>
              <TableCell className="">reservasi</TableCell>
              <TableCell className="">
                {formatDate(item.Pembayaran.tanggalBayar, "dd MMM yyyy HH:mm")}
              </TableCell>
              <TableCell className="text-right">{formatCurrency(item.Pembayaran.jumlahBayar)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
