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

export default async function users() {
  const { books, totalBooks } = await fetchBooks();

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
                  <BreadcrumbPage>Books</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <DialogAddBook></DialogAddBook>
        </header>
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <h1>
            Total Buku yang terdaftar <strong>{totalBooks}</strong>
          </h1>
          <div className="p-5 shadow-2xl rounded-xl w-full">
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
