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

import { confirmReturn, fetchBorrows } from "@/lib/action";

export default async function BorrowingsPage() {
  const borrows = await fetchBorrows();

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
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Borrowings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <h1>
            Total Peminjaman <strong>{borrows.length}</strong>
          </h1>

          <div className="p-5 shadow-2xl rounded-xl w-full">
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
                {borrows.map((item) => (
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

                    <TableCell>
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
