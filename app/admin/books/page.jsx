import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { fetchBooks } from "@/lib/action";
import { DialogAddBook } from "@/components/DialogAddBook";
import { deleteData } from "@/lib/action";
import { DialogEditBook } from "@/components/DialogEditBook";
import { Library,CheckCircle, Clock } from "lucide-react";
import { fetchBooksCount } from "@/lib/fetchDashboard";

export default async function users() {
  const { books, totalBooks } = await fetchBooks();
  const {Available, Unavailable} = await fetchBooksCount();

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
                  <BreadcrumbPage>Books</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <DialogAddBook></DialogAddBook>
        </header>
        <div className="flex flex-col bg-primary2 h-full gap-4 p-5">
          <section className="grid grid-cols-3 gap-4 w-full">
            <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
              <Library
                size={50}
                className="p-2 bg-blue-100 rounded-md text-blue-500"
              />
              <div>
                <div className="text-sm text-slate-400">Total Buku</div>
                <div className="text-2xl font-semibold mt-2">
                  {totalBooks}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
              <CheckCircle
                size={50}
                className="p-2 bg-amber-100  rounded-md text-amber-500"
              />
              <div>
                <div className="text-sm text-slate-400">Buku Yang Tersedia</div>
                <div className="text-2xl font-semibold mt-2">
                  {Available}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
              <Clock
                size={50}
                className="p-2 bg-green-100 rounded-md text-green-500"
              />
              <div>
                <div className="text-sm text-slate-400">Buku Yang Dipinjam</div>
                <div className="text-2xl font-semibold mt-2">
                  {Unavailable}
                </div>
              </div>
            </div>
            
          </section>

          <div className="p-5 shadow-2xl rounded-xl w-full bg-white">
            <Table>
              <TableCaption>
                List Buku yang terdafatar di <strong>Perpus.</strong>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center">
                    ID Buku
                  </TableHead>
                  <TableHead className="text-center">Gambar</TableHead>
                  <TableHead className="text-center">Nama Buku</TableHead>
                  <TableHead className="text-center">Genre</TableHead>
                  <TableHead className="text-center">Author</TableHead>
                  <TableHead className="text-center">Status</TableHead>

                  <TableHead className="text-center">Interactive</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id_buku}>
                    <TableCell className="text-center align-middle">
                      {book.id_buku}
                    </TableCell>

                    <TableCell className="text-center align-middle">
                      <div className="flex justify-center">
                        <img
                          src={book.gambar || "/images/template-thumbnail.png"}
                          alt="Thumbnail Buku"
                          className="w-16 h-20 object-cover rounded"
                        />
                      </div>
                    </TableCell>

                    <TableCell className="text-center align-middle">
                      {book.nama_buku}
                    </TableCell>

                    <TableCell className="text-center align-middle">
                      {book.genre_buku}
                    </TableCell>

                    <TableCell className="text-center align-middle">
                      {book.author}
                    </TableCell>

                    <TableCell className={`text-center align-middle font-bold ${
                        book.status === "tersedia"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}>
                      {book.status}
                    </TableCell>

                    <TableCell className="text-center align-middle">
                      <div className="flex justify-center gap-4">
                        <form action={deleteData}>
                          <input type="hidden" value={book.id_buku} name="id" />
                          <button className="bg-red-500 text-white px-2 py-2 rounded-md">
                            Hapus
                          </button>
                        </form>

                        <DialogEditBook book={book} />
                      </div>
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
