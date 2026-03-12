import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { Eye } from "lucide-react";
import { WELFARE_PRODUCTS, PTJ_CONFIGS } from "../../../data/mockData";
import { Breadcrumb } from "../../../components/shared/Breadcrumb";

const formatRM = (n: number) =>
  new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR", maximumFractionDigits: 0 }).format(n);

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(20px) saturate(160%)",
  border: "1px solid rgba(255,255,255,0.7)",
  borderRadius: "16px",
  boxShadow: "0 4px 24px rgba(100,116,139,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
};

const PTJ_COLORS: Record<string, string> = {
  PHEP: "#4D9FFF",
  PUSAT_ISLAM: "#0A2FA6",
  WAKAF: "#F9A825",
  YAYASAN: "#7C3AED",
  KESIHATAN: "#0891B2",
  FAKULTI: "#DC2626",
};

export default function TncStatistik() {
  const top10 = [...WELFARE_PRODUCTS]
    .sort((a, b) => b.jumlahTerkumpul - a.jumlahTerkumpul)
    .slice(0, 10);

  const barData = top10.map((p) => ({
    nama: p.nama.split(" ").slice(0, 3).join(" "),
    jumlah: p.jumlahTerkumpul,
    color: PTJ_COLORS[p.ptj] || "#4D9FFF",
  }));

  return (
    <div className="space-y-5">
      <Breadcrumb items={[{ label: "Papan Pemuka" }, { label: "Statistik Produk Bantuan" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Statistik Produk Bantuan</h1>
          <p className="text-[#64748B] text-sm mt-0.5">Keseluruhan UTHM — Tontonan sahaja</p>
        </div>
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)" }}
        >
          <Eye className="w-4 h-4 text-[#D97706]" />
          <span className="text-xs text-[#D97706] font-medium">Mod Tontonan Sahaja</span>
        </div>
      </div>

      {/* Top 10 Bar Chart */}
      <div className="p-5" style={glassCard}>
        <h2 className="font-semibold text-[#0F172A] mb-4 pb-2 border-b-2 border-[#0A2FA6] inline-block" style={{ fontWeight: 700 }}>
          10 Produk Tertinggi Mengikut Jumlah Sumbangan
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="nama" tick={{ fontSize: 9 }} width={110} />
              <Tooltip formatter={(v: number) => formatRM(v)} />
              <Bar dataKey="jumlah" fill="#4D9FFF" name="Jumlah (RM)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* All products table */}
      <div style={{ ...glassCard, overflow: "hidden" }}>
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(226,232,240,0.6)" }}>
          <h2 className="font-semibold text-[#0F172A]" style={{ fontWeight: 700 }}>Semua Produk Aktif</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(77,159,255,0.06)" }}>
                {["Bil", "Nama Produk", "PTj", "Bilangan Sumbangan", "Jumlah (RM)"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs uppercase tracking-wide" style={{ color: "#64748B", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {WELFARE_PRODUCTS.filter((p) => p.status === "Aktif")
                .sort((a, b) => b.jumlahTerkumpul - a.jumlahTerkumpul)
                .map((p, i) => (
                  <tr
                    key={p.id}
                    className="transition-colors"
                    style={{
                      borderTop: "1px solid #E2E8F0",
                      background: i % 2 === 1 ? "#FAFAFA" : "white",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#F0F7FF")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i % 2 === 1 ? "#FAFAFA" : "white")}
                  >
                    <td className="px-4 py-3 text-xs text-[#64748B]">{i + 1}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[#0F172A]">
                      <div className="flex items-center gap-2">
                        <span>{p.ikon}</span>
                        <span>{p.nama}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{
                          backgroundColor: `${PTJ_COLORS[p.ptj] || "#4D9FFF"}15`,
                          color: PTJ_COLORS[p.ptj] || "#4D9FFF",
                          border: `1px solid ${PTJ_COLORS[p.ptj] || "#4D9FFF"}30`,
                        }}
                      >
                        {p.ptjLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#0F172A]">{p.bilanganPenyumbang.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-[#0A2FA6]">{formatRM(p.jumlahTerkumpul)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
