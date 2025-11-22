import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col gap-25 scroll-smooth">
      <nav className="flex justify-around items-center h-18 bg-[#C89F68] text-white w-full fixed z-10 shadow-2xl">
        <h1 className="text-xl font-semibold">📚 Perpus.</h1>
        <ol className="flex gap-5">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About Us</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="">Books</a>
          </li>
        </ol>
        <div className="flex gap-5">
          <Link
            className="px-6 py-1 font-semibold rounded-md bg-white text-primary2 hover:bg-accent2 transition-all duration-300"
            href="login">
            Login
          </Link>
          <Link
            href="/signup"
            className="px-6 rounded-md py-1 font-semibold bg-[#4A3F35] hover:bg-accent2 transition-all duration-300">
            Signup
          </Link>
        </div>
      </nav>

      <section
        className="flex flex-col items-center justify-center mt-30 text-white mb-10"
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
              Jelajahi Dunia Buku bertema Perpustakaan Firman
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
                className="px-6 py-2 bg-white text-[#C89F68] font-semibold rounded-md w-max mt-4 hover:bg-[#C89F68] hover:text-white">
                Get Started
              </Link>
              <Link
                href="#about"
                className="px-6 py-2 border-2 border-[#C89F68] text-[#C89F68] font-semibold rounded-md w-max mt-4 hover:bg-[#EAD5B7] hover:text-[#2E2A26]">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="flex justify-around items-center gap-10 p-20">
        <div className="flex flex-col gap-3">
          <h3 className="rounded-full bg-[#C89F68] w-fit px-3 py-1 text-lg font-medium text-white">
            About us
          </h3>
          <h1 className="text-3xl">
            Website Simulasi Peminjaman Buku SMK Taruna Bhakti
          </h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, sint
            cumque deserunt quaerat recusandae vel reprehenderit id odio non
            vitae qui similique optio quo quidem.
          </p>

          <div className="flex gap-3 items-center">
            <img
              src="/images/books.png"
              alt="icon buku"
              className="w-10 h-auto bg-[#C89F68] p-3 rounded-md"
            />
            <p className="font-medium text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing agung.
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <img
              src="/images/admin-alt.png"
              alt="icon buku"
              className="w-10 h-auto bg-[#C89F68] p-3 rounded-md"
            />
            <p className="font-medium text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Firman?
            </p>
          </div>
        </div>

        <img
          src="/images/about.jpeg"
          alt=""
          className="w-[500px] h-[400px] rounded-3xl shadow-2xl"
        />
      </section>


      <section className="flex flex-col items-center gap-5 p-20 pb-25 bg-primary2 text-black justify-center text-center" id="features">
        <h1 className="text-xl font-semibold rounded-full bg-[#C89F68] w-fit px-5 py-2 text-white">
          Our Features
        </h1>
        <div className="flex items-center justify-center gap-10">
          <div className="w-[400px] h-auto rounded-2xl flex flex-col gap-2 hover:scale-105 transition-transform duration-300 shadow-xl bg-white">
            <img
              src="/images/admin.jpg"
              alt=""
              className="rounded-t-2xl h-[250px] object-cover"
            />
            <div className="px-5 pb-5 gap-2 flex flex-col">
              <h2 className="text-xl font-medium">Admin Mengelola Buku</h2>
              <p className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque illo reiciendis iure quod tempora non!</p>
            </div>
          </div>

          <div className="w-[400px] h-auto rounded-2xl flex flex-col gap-2 hover:scale-105 transition-transform duration-300 shadow-xl bg-white">
            <img
              src="/images/bukuberlimpah.jpg"
              alt=""
              className="rounded-t-2xl h-[250px] object-cover"
            />
            <div className="px-5 pb-5 gap-2 flex flex-col">
              <h2 className="text-xl font-medium">Bukunya Banyak Jrit</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, dolores laboriosam? Quibusdam magnam iure facilis.</p>
                          </div>
          </div>

          <div className="w-[400px] h-auto rounded-2xl flex flex-col gap-2 hover:scale-105 transition-transform duration-300 shadow-xl bg-white">
            <img
              src="/images/database.jpeg"
              alt=""
              className="rounded-t-2xl h-[250px] object-cover"
            />
            <div className="px-5 pb-5 gap-2 flex flex-col">
              <h2 className="text-xl font-medium">
                Memakai sistem database canggih
              </h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium molestias sapiente quo maiores rerum sequi.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <div className="flex gap-10 justify-around items-center px-30">
          <img
            src="/images/berserk.png"
            alt="buku1"
            className="w-[500px] shadow-2xl rounded-full"
          />
          <div className="flex  flex-col gap-2">
            <h1 className="font-semibold text-xl px-3 py-2 rounded-full bg-primary2 w-fit text-white">
              Semua Buku Populer Ada.
            </h1>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
              blanditiis repudiandae. Nesciunt non expedita tempora inventore
              adipisci ducimus voluptates, facere aliquam molestias perferendis,
              nemo, quo ipsa porro. Corrupti hic nesciunt consectetur, adipisci
              eos dolore vitae saepe sunt beatae neque quae. Similique eos ab
              debitis. Optio ad sunt explicabo consectetur laborum.
            </p>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-10 justify-around items-center px-30">
          <img
            src="/images/nocon.png"
            alt="buku1"
            className="w-[500px] shadow-2xl rounded-full"
          />
          <div className="flex text-right flex-col gap-2">
            <h1 className="font-semibold text-xl px-3 py-2 rounded-full bg-primary2 w-fit text-white">
              Servis admin yang handal.
            </h1>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat,
              blanditiis repudiandae. Nesciunt non expedita tempora inventore
              adipisci ducimus voluptates, facere aliquam molestias perferendis,
              nemo, quo ipsa porro. Corrupti hic nesciunt consectetur, adipisci
              eos dolore vitae saepe sunt beatae neque quae. Similique eos ab
              debitis. Optio ad sunt explicabo consectetur laborum.
            </p>
          </div>
        </div>
      </section>

      <Footer></Footer>     
    </main>
  );
}
