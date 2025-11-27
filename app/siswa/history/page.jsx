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
import HistoryClient from "@/components/HistoryFilter";

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
          <div className="gap-5 flex flex-col">
            <HistoryClient rows={rows} result={result} totalBorrows={totalBorrows} />
          </div>
        </section>
      </main>
    </div>
  );
}
