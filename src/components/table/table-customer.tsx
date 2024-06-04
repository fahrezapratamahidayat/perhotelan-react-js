import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { useSWRConfig } from 'swr';
import axios from 'axios';
import { Resevasi, reservasiTypes } from '@/types';
import { formatCurrency, formatDate } from '@/utils/helpers';

interface Props {
  data: Resevasi | undefined;
  selectedReservation: (item: reservasiTypes) => void;
  selectedReservationId: number | null;
}
export default function TableCustomer({ data, selectedReservation, selectedReservationId }: Props) {
  const { mutate } = useSWRConfig();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Informasi Tamu</TableHead>
    <TableHead className="hidden sm:table-cell">Status</TableHead>
    <TableHead className="hidden md:table-cell">Tanggal Check-in</TableHead>
    <TableHead className="hidden md:table-cell">Durasi Menginap</TableHead>
    <TableHead className="text-right">Jumlah Pembayaran</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.datas?.map((item) => (
          <TableRow
            className={`${
              selectedReservationId === item.idReservasi ? "bg-accent" : ""
            }`}
            key={item.idReservasi}
            onClick={() => selectedReservation(item)}
          >
            <TableCell>
              <div className="font-medium">{item.tamu.namaTamu}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {item.tamu.emailTamu}
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge className="text-xs" variant="secondary">
                {item.statusReservasi}
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">{formatDate(item.tanggalCheckOut, "dd MMM yyyy")}</TableCell>
            <TableCell className="hidden md:table-cell">{item.durasiMenginap} malam</TableCell>
            <TableCell className="text-right">
              {formatCurrency(item.Pembayaran.jumlahBayar)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
