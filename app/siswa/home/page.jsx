import Navbar from "@/components/NavBar";
import Link from "next/link";
import { fetchBooks } from "@/lib/action";

export default async function HomeSiswaPage() {
  const { books } = await fetchBooks();
  return (
    <div className="flex flex-col gap-20 scroll-smooth">
      <Navbar></Navbar>

      <section
        className="flex flex-col items-center justify-center mt-30 text-white mb-20"
        id="home">
        <img
          src="/images/herosection.jpeg"
          alt=""
          className="w-full h-[600px] object-cover absolute opacity-40"
        />
        <div className="flex items-center justify-center text-center p-20 gap-25 text-black z-1">
          <img
            src="/images/herosection.png"
            alt="books-art"
            className="w-70 h-auto"
          />
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-4xl font-semibold">
              Jelajahi Dunia Buku Bertema Perpustakaan Firman
            </h1>
            <p className="text-lg">
              Perpustakaan Firman adalah platform digital yang menyediakan akses
              mudah ke berbagai koleksi buku berkualitas tinggi. Temukan buku
              favorit Anda dan nikmati pengalaman membaca yang menyenangkan
              bersama kami.
            </p>
            <div className="flex gap-5 items-center">
              <Link
                href="/signup"
                className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-md w-max mt-4 hover:bg-blue-600 hover:text-white">
                Get Started
              </Link>
              <Link
                href="#about"
                className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-md w-max mt-4 hover:bg-white hover:text-blue-600">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

     <section className="mt-10">
  <h1 className="font-semibold text-2xl mb-6 text-center">For you</h1>

  <div className="grid grid-cols-4 gap-10 place-items-center w-full px-30">
    {books.map((book) => (
      <div
        key={book.id_buku}
        className="bg-white shadow-xl rounded-xl w-[230px] overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col"
      >
        <img
          src={book.gambar || "/images/template-thumbnail.png"}
          alt="Thumbnail Buku"
          className="w-full h-[330px] object-cover"
        />

        <div className="p-4 flex flex-col gap-1">
          <h1 className="font-semibold text-lg leading-tight">{book.nama_buku}</h1>
          <p className="text-sm text-gray-600">{book.author}</p>
          <p className="text-sm text-gray-500 italic">{book.genre_buku}</p>

          <span
            className={`text-sm font-semibold ${
              book.status === "tersedia" ? "text-green-600" : "text-red-600"
            }`}
          >
            {book.status}
          </span>
        </div>
      </div>
    ))}
  </div>
</section>

  <section className="mt-10">
  <h1 className="font-semibold text-2xl mb-6 text-center">For You</h1>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-10 place-items-center">
    {books.map((book) => (
      <div
        key={book.id_buku}
        className="bg-white shadow-lg rounded-xl w-[400px] h-[220px] overflow-hidden flex hover:scale-[1.02] transition-all duration-300"
      >
 
        <img
          src={book.gambar || "/images/template-thumbnail.png"}
          alt="Thumbnail Buku"
          className="w-[160px] h-[300px] object-cover"
        />


        <div className="p-4 flex flex-col justify-between w-full">
          <div>
            <h1 className="font-semibold text-lg">{book.nama_buku}</h1>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="text-sm text-gray-500 italic">{book.genre_buku}</p>
          </div>

          <span
            className={`text-sm font-semibold ${
              book.status === "tersedia" ? "text-green-600" : "text-red-600"
            }`}
          >
            {book.status}
          </span>
        </div>
      </div>
    ))}
  </div>
</section>


    </div>
  );
}
