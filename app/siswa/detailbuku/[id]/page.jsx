import { fetchBookById } from "@/lib/action";
import Link from "next/link";
import Navbar from "@/components/NavBar";
import { Calendar, BookOpenText, Languages, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DetailBukuPage({ params }) {
  const { id } = await params;
  const book = await fetchBookById(id);

  if (!book) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <h1 className="text-2xl font-semibold text-red-500">
          Buku tidak ditemukan ❌
        </h1>
        <Link className="bg-primary2 text-white py-1 px-2 font-semibold text-lg">Kembali Ke Homepage?</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 scroll-smooth items-center">
        <Navbar></Navbar>
        <div className="mt-30 flex gap-10 items-center justify-center border-b-2 pb-10 w-10/12 px-20">
            <img src={book.gambar || '/images/template-thumbnail.png'} alt={book.nama_buku} className="w-80 h-auto rounded-2xl" />
            <div className="gap-5 flex flex-col">
                <h1 className="text-md italic bg-primary2 rounded-full px-3 py-1 w-fit text-white">{book.genre_buku}</h1>
                <h1 className="text-4xl font-medium">{book.nama_buku}</h1>
                <h1 className="text-lg">Oleh <strong>{book.author}</strong></h1>
                <div className="flex gap-15 text-center">
                    <div className="flex flex-col justify-center items-center">
                        <Calendar className="bg-cyan-100 p-2 rounded-md text-blue-800" size={40} />
                        <h1 className="font-medium">Tahun Rilis</h1>
                        <h1>2009</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <BookOpenText className="bg-yellow-100 p-2 rounded-md text-yellow-800" size={40} />
                        
                        <h1 className="font-medium">Halaman</h1>
                        <h1>420</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Languages className="bg-green-100 p-2 rounded-md text-green-800" size={40} />
                        
                        <h1 className="font-medium">Bahasa</h1>
                        <h1>English</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <Building2 className="bg-red-100 p-2 rounded-md text-red-800" size={40} />
                        <h1 className="font-medium">Penerbit</h1>
                        <h1>PT. Gramedia</h1>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button className='w-3/4 py-1 text-lg h-15 bg-primary2 hover:bg-accent2'>Pinjam Buku</Button>
                    <Button className='w-1/4 py-1 text-lg h-15 bg-white border-2 border-primary2 text-primary2 hover:bg-primary2 hover:text-white'>Simpan</Button>
                </div>
                <h1>Id Buku : <strong>{book.id_buku}</strong></h1>
            </div>
        </div>
        <div className="p-20 py-0 w-10/12 flex flex-col gap-5 border-b-2">
            <h1 className="font-medium text-2xl">Deskripsi</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem eius voluptas dolore ducimus tenetur impedit earum error velit repellendus ipsam sint optio accusantium pariatur totam adipisci praesentium repudiandae aliquid atque labore laboriosam veritatis iste, sunt aspernatur hic. Minus eveniet provident cupiditate et amet reprehenderit deserunt cum tempore! Voluptas, ex dolore.</p>
        </div>
    </div>
  );
}
