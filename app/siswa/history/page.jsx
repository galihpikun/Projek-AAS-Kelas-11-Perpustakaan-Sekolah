import Navbar from "@/components/NavBar";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Book,
  CircleDollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchBorrows, requestReturn } from "@/lib/action";
import { fetchUserStats } from "@/lib/fetchDashboard";

export default async function history() {
  const { rows, totalBorrows } = await fetchBorrows();
  const result = await fetchUserStats();

  return (
    <div className="flex flex-col items-center">
      <Navbar></Navbar>

      <main className="flex flex-col gap-10 mt-30 w-full px-30">
        <section>
          <h1 className="text-3xl font-semibold">Riwayat Peminjaman</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora,
            sequi.
          </p>
        </section>

        <section className="grid grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
            <Book
              size={50}
              className="p-2 bg-blue-100 rounded-md text-blue-500"
            />
            <div>
              <div className="text-sm text-slate-400">Total Peminjaman</div>
              <div className="text-2xl font-semibold mt-2">{totalBorrows}</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
            <Clock
              size={50}
              className="p-2 bg-amber-100  rounded-md text-amber-500"
            />
            <div>
              <div className="text-sm text-slate-400">Sedang Dipinjam</div>
              <div className="text-2xl font-semibold mt-2">{result.total_ongoing}</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
            <CheckCircle
              size={50}
              className="p-2 bg-green-100 rounded-md text-green-500"
            />
            <div>
              <div className="text-sm text-slate-400">Dikembalikan</div>
              <div className="text-2xl font-semibold mt-2">{result.total_returned}</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
            <AlertTriangle
              size={50}
              className="p-2 bg-red-100 rounded-md text-red-500"
            />
            <div>
              <div className="text-sm text-slate-400">Terlambat</div>
              <div className="text-2xl font-semibold mt-2 text-rose-600">
                {result.total_late}
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex gap-5 items-center">
            <CircleDollarSign
              size={50}
              className="p-2 bg-purple-100 rounded-md text-purple-500"
            />
            <div>
              <div className="text-sm text-slate-400">Total Denda</div>
              <div className="text-2xl font-semibold mt-2">Rp {result.total_fines}</div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex gap-3 items-center mb-4">
            <button className="px-4 py-2 rounded-md bg-white text-slate-600 shadow hover:bg-slate-100">
              Semua ({totalBorrows})
            </button>
            <button className="px-4 py-2 rounded-md bg-white text-slate-600 shadow hover:bg-slate-100">
              Dipinjam ({result.total_ongoing})
            </button>
            <button className="px-4 py-2 rounded-md bg-white text-slate-600 shadow hover:bg-slate-100">
              Dikembalikan ({result.total_returned})
            </button>
            <button className="px-4 py-2 rounded-md bg-white text-slate-600 shadow hover:bg-slate-100">
              Terlambat ({result.total_late})
            </button>
          </div>

          <div className="gap-5 flex flex-col">
            {rows.map((item) => (
              <div key={item.borrow_id}>
                <div className="w-full h-50 shadow rounded-xl overflow-hidden flex justify-between items-center">
                  <div className="flex gap-5 items-center">
                    <img
                      src={item.gambar || "/images/template-thumbnail.png"}
                      alt="/cover"
                      className="w-40 h-full object-cover"
                    />
                    <div className="flex flex-col gap-8">
                      <h1 className="text-sm italic bg-primary2 rounded-full px-2 py-1 w-fit text-white">
                        {item.genre_buku}
                      </h1>
                      <div className="gap-1 flex-col flex">
                        <h1 className="text-2xl font-semibold">
                          {item.nama_buku}
                        </h1>
                        <h1 className="text-sm text-gray-600">{item.author}</h1>
                      </div>
                      <h1 className="text-sm text-gray-600">
                        Tanggal Pinjam :
                        <strong>
                          {new Date(item.borrow_date).toLocaleDateString(
                            "id-ID"
                          )}
                        </strong>
                      </h1>
                    </div>
                  </div>
                  <form action={requestReturn} className="pr-5 flex flex-col items-end gap-5">
                    <h1 className="text-sm text-gray-600">
                      Deadline Pengembalian :
                      <strong>
                        {new Date(item.due_date).toLocaleDateString("id-ID")}
                      </strong>
                    </h1>
                    <input type="hidden" value={item.borrow_id} name="id" />
                    {item.status === "requested_return" ? (
                      <Button
                        disabled
                        className="bg-gray-400 cursor-not-allowed">
                        Tunggu Konfirmasi Admin
                      </Button>
                    ) : item.status === "returned" ? (
                      <Button
                        disabled
                        className="bg-green-500 cursor-not-allowed hover:bg-green-500">
                        Sudah Dikembalikan
                      </Button>
                    ) : item.status === "late" ? (
                      <Button
                        disabled
                        className="bg-red-500 cursor-not-allowed hover:bg-red-500">
                        Terlambat Dikembalikan
                      </Button>
                    ) : (
                      <Button>Kembalikan Buku</Button>
                    )}
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
