import * as XLSX from "xlsx";

export function exportExcel(rows) {
  const data = rows.map((item) => ({
    "ID Peminjaman": item.borrow_id,
    "Judul Buku": item.nama_buku,
    Author: item.author,
    Peminjam: item.user_name,
    "Tanggal Pinjam": new Date(item.borrow_date).toLocaleDateString("id-ID"),
    "Tenggat Waktu": new Date(item.due_date).toLocaleDateString("id-ID"),
    Status: item.status,
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "Peminjaman");
  XLSX.writeFile(wb, "data-peminjaman.xlsx");
  
}