import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col bg-[#222831] text-white gap-20 scroll-smooth">
      <nav className="flex justify-around items-center h-18 bg-[#393E46] text-white w-full fixed z-10">
        <h1 className="text-xl font-semibold">Logo</h1>
        <ol className="flex gap-5">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="">Books</a></li>
        </ol>
        <div className="flex gap-5">
          <Link className="px-6 py-1 font-semibold rounded-md bg-[#222832]" href="login">Login</Link>
          <Link href="/signup" className="px-6 rounded-md py-1 font-semibold bg-[#3665DD]">Signup</Link>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center mt-30" id="home">
        <div className="bg-linear-to-r from-cyan-500 to-blue-500 h-[400px] w-11/12 rounded-xl flex items-center justify-center text-center p-20 gap-25">
        <img src="/images/herosection.png" alt="books-art" className="w-70 h-auto" />
          <div className="flex flex-col gap-2 text-left">
            <h1 className="text-4xl font-semibold">Jelajahi Dunia Buku Bertema Perpustakaan Firman</h1>
            <p className="text-lg">Perpustakaan Firman adalah platform digital yang menyediakan akses mudah ke berbagai koleksi buku berkualitas tinggi. Temukan buku favorit Anda dan nikmati pengalaman membaca yang menyenangkan bersama kami.</p>
            <div className="flex gap-5 items-center">
              <Link href="/signup" className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-md w-max mt-4 hover:bg-blue-600 hover:text-white">Get Started</Link>
              <Link href="#about" className="px-6 py-2 border-2 border-white text-white font-semibold rounded-md w-max mt-4 hover:bg-white hover:text-blue-600">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="flex justify-around items-center gap-10 p-20 ">
        <div className="flex flex-col gap-3">
          <h3 className="rounded-full bg-[#3665DD] w-fit px-3 py-1 text-lg font-medium">About us</h3>
        <h1 className="text-3xl ">Website Simulasi Peminjaman Buku SMK Taruna Bhakti</h1>
        <p className="text-lg ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius, sint cumque deserunt quaerat recusandae vel reprehenderit id odio non vitae qui similique optio quo quidem. Cum molestias consectetur odit assumenda natus quia excepturi vitae, magni distinctio voluptates, quam, sunt corrupti!</p>
        <div className="flex gap-3 items-center">
          <img src="/images/books.png" alt="icon buku" className="w-10 h-auto bg-[#3665DD] p-3 rounded-md" />
          <p className="font-medium text-lg">Lorem ipsum dolor sit amet consectetur adipisicing agung.</p>
        </div>
        <div className="flex gap-3 items-center">
          <img src="/images/admin-alt.png" alt="icon buku" className="w-10 h-auto bg-[#3665DD] p-3 rounded-md" />
          <p className="font-medium text-lg">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Firman?</p>
        </div>
        </div>
        <img src="/images/about.jpeg" alt="" className="w-[500px] h-[400px] rounded-3xl shadow-2xl " />
      </section>
      
      <section className="flex flex-col items-center gap-10 px-20" id="features">
        <h1 className="text-xl font-semibold rounded-full bg-[#3665DD] w-fit px-5 py-2">Our Features</h1>
        <div className="flex items-center justify-center gap-10">
          <div className="bg-[#393E46] w-[400px] h-auto rounded-2xl flex flex-col gap-2 hover:scale-105 transition-transform duration-300">
            <img src="/images/admin.jpg" alt=""  className="rounded-t-2xl h-[250px] object-cover"/>
            <div className="px-5 pb-5 gap-3">
              <h2 className="text-xl font-medium">Admin Mengelola Buku</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio, ipsum cupiditate! Nihil amet neque voluptatibus culpa eligendi cum sed beatae!</p>
            </div>
          </div>
          <div className="bg-[#393E46] w-[400px] h-auto rounded-2xl flex flex-col gap-2 hover:scale-105 transition-transform duration-300">
            <img src="/images/bukuberlimpah.jpg" alt=""  className="rounded-t-2xl h-[250px] object-cover"/>
            <div className="px-5 pb-5 gap-3">
              <h2 className="text-xl font-medium">Bukunya Banyak Jrit</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio, ipsum cupiditate! Nihil amet Hentai neque voluptatibus culpa eligendi cum sed beatae!</p>
            </div>
          </div>
          <div className="bg-[#393E46] w-[400px] h-auto rounded-2xl flex flex-col gap-2 hover:scale-105 transition-transform duration-300">
            <img src="/images/database.jpeg" alt=""  className="rounded-t-2xl h-[250px] object-cover"/>
            <div className="px-5 pb-5 gap-3">
              <h2 className="text-xl font-medium">Memakai sistem database canggih</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio, ipsum cupiditate! Nihil amet Hentai neque voluptatibus culpa eligendi cum sed beatae!</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="bg-[#393E46] w-full h-20 flex justify-center items-center">
          <p className="text-white font-light">© 2024 Perpustakaan Firman. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )

}