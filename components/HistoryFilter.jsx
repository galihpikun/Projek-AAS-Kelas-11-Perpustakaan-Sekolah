"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { requestReturn } from "@/lib/action";

export default function HistoryClient({ rows, result, totalBorrows }) {
  const [filter, setFilter] = useState("all");

  const filteredData = rows.filter((item) => {
    if (filter === "ongoing") return item.status === "ongoing";
    if (filter === "returned") return item.status === "returned";
    if (filter === "late") return item.status === "late";
    return true;
  });

  return (
    <section>
      <div className="flex gap-3 items-center mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md shadow transition 
      ${filter === "all" ? "bg-primary2 text-white" : "bg-white"}`}>
          Semua ({totalBorrows})
        </button>

        <button
          onClick={() => setFilter("ongoing")}
          className={`px-4 py-2 rounded-md shadow transition 
      ${filter === "ongoing" ? "bg-primary2 text-white" : "bg-white"}`}>
          Dipinjam ({result.total_ongoing})
        </button>

        <button
          onClick={() => setFilter("returned")}
          className={`px-4 py-2 rounded-md shadow transition 
      ${filter === "returned" ? "bg-primary2 text-white" : "bg-white"}`}>
          Dikembalikan ({result.total_returned})
        </button>

        <button
          onClick={() => setFilter("late")}
          className={`px-4 py-2 rounded-md shadow transition 
      ${filter === "late" ? "bg-primary2 text-white" : "bg-white"}`}>
          Terlambat ({result.total_late})
        </button>
      </div>

      <div className="gap-5 flex flex-col">
        {filteredData.map((item) => (
          <div
            key={item.borrow_id}
            className="w-full h-50 shadow rounded-xl overflow-hidden flex justify-between items-center">
            <div className="flex gap-5 items-center">
              <img
                src={item.gambar || "/images/template-thumbnail.png"}
                className="w-40 h-full object-cover"
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">{item.nama_buku}</h1>
                <p className="text-sm text-gray-600">{item.author}</p>
                <p className="text-sm">
                  Pinjam:{" "}
                  <b>
                    {new Date(item.borrow_date).toLocaleDateString("id-ID")}
                  </b>
                </p>
              </div>
            </div>

            <form action={requestReturn} className="pr-5">
              <input type="hidden" name="id" value={item.borrow_id} />

              {item.status === "requested_return" || item.status === "pending" ? (
                <Button disabled className="bg-gray-400">
                  Menunggu Konfirmasi
                </Button>
              ) : item.status === "returned" ? (
                <Button disabled className="bg-green-600">
                  Sudah Dikembalikan
                </Button>
              ) : item.status === "late" ? (
                <Button type="submit" className="bg-red-600">
                  Terlambat
                </Button>
              ) : (
                <Button type="submit">Kembalikan Buku</Button>
              )}
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}
