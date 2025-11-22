import Link from "next/link"; 
 
 export default function Navbar() {
    return (
        <nav className="flex justify-around items-center h-18 bg-[#3665DD]  text-white w-full fixed z-10">
        <h1 className="text-xl font-semibold">Perpus.</h1>
        <ol className="flex gap-5">
          <li><a href="/siswa/home">Home</a></li>
          <li><a href="#about">Genre</a></li>
          <li><a href="#features">Personal Activity</a></li>
        </ol>
        
        <a href=""><img src="/images/profile.png" alt="" className="w-10 h-10" /></a>
      </nav>
    )

 }