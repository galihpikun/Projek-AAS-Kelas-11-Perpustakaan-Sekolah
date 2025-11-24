import Link from "next/link"; 
import { Search } from "lucide-react";
 
 export default function Navbar() {
    return (
        <nav className="flex justify-around items-center h-18 bg-[#C89F68] text-white w-full fixed z-10 shadow-2xl">
        <h1 className="text-xl font-semibold">📚 Perpus.</h1>
        <ol className="flex gap-5">
          <li>
            <a href="/siswa/home" className=" hover:font-medium ">Home</a>
          </li>
          <li>
            <a href="/siswa/genre" className=" hover:font-medium ">Saved</a>
          </li>
          <li>
            <a href="/siswa/history" className=" hover:font-medium ">History</a>
          </li>
        </ol>
          <div className="relative w-10/12 max-w-lg">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
      <input
        type="text"
        placeholder="Cari buku..."
        className="w-full pl-12 pr-4 py-2 bg-white border rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
      />
    </div>
        <div className="flex gap-5">
          <Link href='/siswa/profile' className="hover:shadow-2xl hover:scale-105 transition-transform"><img src="/images/profile.png" className="w-10 h-10" alt="" /></Link>
        </div>
      </nav>

    )

 }