"use client";

import { Button } from "@/components/ui/button";
import { exportExcel } from "@/lib/ExcelJabing";

export default function ExportButtons({ rows }) {
  return (
      <Button onClick={() => exportExcel(rows)} className="bg-secondary2 hover:bg-accent2 transition-transform">
        Export Excel
      </Button>
  );
}

