export default function Footer() {
    return (
        <footer className="w-full bg-[#C89F68] text-white">
        <div className="flex justify-around items-start gap-10 p-10">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 select-none">
              📚 Perpus.
            </h2>
            <p className="text-sm mt-2 opacity-80">
              Platform perpustakaan digital untuk memudahkan siswa mengakses dan
              meminjam buku kapan saja. <br />
              Lorem ipsum dolor sit amet, consectetur <br />
              adipisicing elit. Minus neque sapiente totam dolores consequatur{" "}
              <br />
              alias commodi magni quasi impedit? Laboriosam.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Navigasi</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a href="#home" className="hover:text-black transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-black transition">
                  About
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-black transition">
                  Features
                </a>
              </li>
              <li>
                <a href="/books" className="hover:text-black transition">
                  Books
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Kontak</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Email: admin@perpus.com</li>
              <li>Telp: 0882-xxxx-xxxx</li>
              <li>Lokasi: Bekasi, Jawa Barat</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/30 py-4 text-center text-sm opacity-80">
          © 2024 Perpustakaan Firman. All rights reserved.
        </div>
      </footer>
    )
}