import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { reservasiTypes } from "@/types";
import { formatDate } from "@/utils/helpers";

// Membuat gaya untuk dokumen PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

interface MyDocumentProps {
  data: reservasiTypes;
}

const MyDocument: React.FC<MyDocumentProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Nama Pelanggan: {data.tamu.namaTamu}</Text>
        <Text>Email: {data.tamu.emailTamu}</Text>
        <Text>Telepon: {data.tamu.nomorTeleponTamu}</Text>
        <Text>Status Reservasi: {data.statusReservasi}</Text>
        <Text>Tipe Reservasi: {data.jenisReservasi}</Text>
        <Text>
          Tgl Check In: {formatDate(data.tanggalCheckIn, "dd MMM yyyy")}
        </Text>
        <Text>
          Tgl Check Out: {formatDate(data.tanggalCheckOut, "dd MMM yyyy")}
        </Text>
        <Text>Durasi Menginap: {data.durasiMenginap} Hari</Text>
        <Text>Total Harga: {data.Pembayaran.jumlahBayar}</Text>
        <Text>Metode Pembayaran: {data.Pembayaran.metodePembayaran}</Text>
        <Text>Status Pembayaran: {data.Pembayaran.statusPembayaran}</Text>
        <Text>Kode Transaksi: {data.Pembayaran.idPembayaran}</Text>
      </View>
    </Page>
  </Document>
);

interface ExportPDFProps {
  data: reservasiTypes;
}

// Komponen untuk link download
const ExportPDF: React.FC<ExportPDFProps> = ({ data }) => (
  <div>
    <PDFDownloadLink
      document={<MyDocument data={data} />}
      fileName="data-reservasi.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download"
      }
    </PDFDownloadLink>
  </div>
);

export default ExportPDF;
