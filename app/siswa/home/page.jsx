import Navbar from "@/components/NavBar";
import Link from "next/link";
import { fetchBooks, fetchBorrows } from "@/lib/action";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { Book, Bookmark, LibraryBig } from "lucide-react";

export default async function HomeSiswaPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(user);
  const { books, totalBooks } = await fetchBooks();
  const {totalBorrows} = await fetchBorrows();

  return (
    <div className="flex flex-col gap-20 scroll-smooth items-center">
      <Navbar></Navbar>

      <section className="flex flex-col gap-8 w-full justify-center items-center mt-10">
        <div className="w-10/12 rounded-2xl h-[200px] bg-linear-65 from-[#C89F68] to-[#A57744] mt-20 text-white flex flex-col justify-center items-center gap-4 shadow-lg shadow-orange-300/50">
          <h1 className="text-4xl font-semibold">
            Welcome Back {user.name} 👋
          </h1>
          <h2 className="text-xl font-medium">
            Selamat datang di Perpus dan Temukan & pinjam buku favoritmu!
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 w-10/12">
          <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
            <Book
              size={50}
              className="p-2 bg-blue-100 rounded-md text-blue-500"
            />
            <div>
              <div className="text-sm text-slate-400">
                Buku Yang Sedang Dipinjam
              </div>
              <div className="text-2xl font-semibold mt-2">{totalBorrows}</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
            <LibraryBig
              size={50}
              className="p-2 bg-amber-100 rounded-md text-amber-500"
            />
            <div>
              <div className="text-sm text-slate-400">
                Total Buku di Perpustakaan
              </div>
              <div className="text-2xl font-semibold mt-2">{totalBooks}</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
            <Bookmark
              size={50}
              className="p-2 bg-green-100 rounded-md text-green-500"
            />
            <div>
              <div className="text-sm text-slate-400">
                Total Buku yang disimpan
              </div>
              <div className="text-2xl font-semibold mt-2">10</div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <h1 className="font-semibold text-2xl mb-6 text-center">For You</h1>

        <div className="grid grid-cols-3 gap-8 w-fit px-10 place-items-center mx-auto">
          {books.map((book) => (
            <div
              key={book.id_buku}
              className="bg-white shadow-lg rounded-xl w-[420px] h-[220px] overflow-hidden flex hover:scale-[1.02] transition-all duration-300">
              <img
                src={book.gambar || "/images/template-thumbnail.png"}
                alt="Thumbnail Buku"
                className="w-[160px] h-[300px] object-cover"
              />

              <div className="p-4 flex flex-col justify-between w-full">
                <div className="gap-1 flex flex-col">
                  <p className="text-sm italic bg-primary2 rounded-full px-2 py-1 w-fit text-white">
                    {book.genre_buku}
                  </p>
                  <h1 className="font-semibold text-lg">{book.nama_buku}</h1>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <span
                    className={`text-sm font-semibold ${
                      book.status === "tersedia"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}>
                    {book.status}
                  </span>
                </div>
                <Link
                  href={`/siswa/detailbuku/${book.id_buku}`}
                  className="py-1 font-medium rounded-sm bg-primary2 text-white text-center">
                  Baca Buku
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer></Footer>
    </div>
  );
}
