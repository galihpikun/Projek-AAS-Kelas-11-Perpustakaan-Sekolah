import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Book, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { confirmReturn, fetchBorrowsAdmin } from "@/lib/action";
import { fetchAdminStats } from "@/lib/fetchDashboard";

export default async function BorrowingsPage() {
  const { rows, totalBorrows } = await fetchBorrowsAdmin();
  const result = await fetchAdminStats();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
              <BreadcrumbItem>Admin</BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Borrowings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-col bg-primary2 gap-4 p-5 h-full">
          <section className="grid grid-cols-4 gap-4 w-full">
            <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
              <Book
                size={50}
                className="p-2 bg-blue-100 rounded-md text-blue-500"
              />
              <div>
                <div className="text-sm text-slate-400">Total Peminjaman</div>
                <div className="text-2xl font-semibold mt-2">
                  {totalBorrows}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
              <Clock
                size={50}
                className="p-2 bg-amber-100  rounded-md text-amber-500"
              />
              <div>
                <div className="text-sm text-slate-400">Sedang Dipinjam</div>
                <div className="text-2xl font-semibold mt-2">
                  {result.total_ongoing}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
              <CheckCircle
                size={50}
                className="p-2 bg-green-100 rounded-md text-green-500"
              />
              <div>
                <div className="text-sm text-slate-400">Dikembalikan</div>
                <div className="text-2xl font-semibold mt-2">
                  {result.total_returned}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
              <AlertTriangle
                size={50}
                className="p-2 bg-red-100 rounded-md text-red-500"
              />
              <div>
                <div className="text-sm text-slate-400">Terlambat</div>
                <div className="text-2xl font-semibold mt-2 text-rose-600">
                  {result.total_late}
                </div>
              </div>
            </div>
          </section>

          <div className="p-5 shadow-2xl rounded-xl w-full bg-white">
            <Table>
              <TableCaption>
                List peminjaman user di <strong>Perpus.</strong>
              </TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">ID Peminjaman</TableHead>
                  <TableHead className="text-center">Gambar</TableHead>
                  <TableHead className="text-center">Judul Buku</TableHead>
                  <TableHead className="text-center">Author</TableHead>
                  <TableHead className="text-center">Tanggal Pinjam</TableHead>
                  <TableHead className="text-center">Tenggat Waktu</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Konfirmas</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((item) => (
                  <TableRow key={item.borrow_id}>
                    <TableCell className="text-center align-middle">
                      {item.borrow_id}
                    </TableCell>

                    <TableCell className="text-center align-middle">
                      <div className="flex justify-center">
                        <img
                          src={item.gambar || "/images/template-thumbnail.png"}
                          alt="Thumbnail Buku"
                          className="w-16 h-20 object-cover rounded"
                        />
                      </div>
                    </TableCell>

                    <TableCell className="text-center align-middle">
                      {item.nama_buku}
                    </TableCell>

                    <TableCell className="text-center align-middle">
                      {item.author}
                    </TableCell>

                    <TableCell className="text-center align-middle">
                      {new Date(item.borrow_date).toLocaleDateString("id-ID")}
                    </TableCell>

                    <TableCell className="text-center align-middle">
                      {new Date(item.due_date).toLocaleDateString("id-ID")}
                    </TableCell>

                    <TableCell
                      className={`text-center align-middle font-bold ${
                        item.status === "ongoing"
                          ? "text-blue-700"
                          : item.status === "requested_return"
                          ? "text-yellow-600"
                          : item.status === "returned"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}>
                      {item.status}
                    </TableCell>

                    <TableCell className="flex justify-center ">
                      <form action={confirmReturn}>
                        <input
                          type="hidden"
                          value={item.borrow_id}
                          name="idBorrow"
                        />
                        <input
                          type="hidden"
                          value={item.id_buku}
                          name="idBuku"
                        />
                        {item.status === "requested_return" ? (
                          <Button>Konfirmasi</Button>
                        ) : (
                          <Button
                            disabled
                            className="bg-gray-400 cursor-not-allowed">
                            No Interaction
                          </Button>
                        )}
                      </form>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
