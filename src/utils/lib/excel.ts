import * as XLSX from 'xlsx';

export const exportToExcel = (data: any) => {
    const ws = XLSX.utils.json_to_sheet(data.datas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Reservasi");
    XLSX.writeFile(wb, "data_reservasi.xlsx");
};