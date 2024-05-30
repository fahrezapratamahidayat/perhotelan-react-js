import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { reservasiTypes } from '@/types'; // Pastikan path ini benar sesuai dengan definisi tipe Anda

// Membuat gaya untuk dokumen PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

interface MyDocumentProps {
  data: reservasiTypes; // Gunakan interface yang sesuai untuk data
}

// Membuat komponen dokumen PDF
const MyDocument: React.FC<MyDocumentProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Nama Pelanggan: {data.tamu.namaTamu}</Text>
        <Text>Email: {data.tamu.emailTamu}</Text>
        <Text>Telepon: {data.tamu.nomerTelephoneTamu}</Text>
      </View>
    </Page>
  </Document>
);

interface ExportPDFProps {
  data: reservasiTypes; // Gunakan interface yang sesuai untuk data
}

// Komponen untuk link download
const ExportPDF: React.FC<ExportPDFProps> = ({ data }) => (
  <div>
    <PDFDownloadLink document={<MyDocument data={data} />} fileName="data-reservasi.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>
  </div>
);

export default ExportPDF;