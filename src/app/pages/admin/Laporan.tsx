import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { Download, FileText, Eye } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { MONTHLY_DONATIONS, WELFARE_PRODUCTS, DONATIONS, PTJ_CONFIGS } from "../../data/mockData";
import { StatsCard } from "../../components/shared/StatsCard";
import { Breadcrumb } from "../../components/shared/Breadcrumb";

const PIE_COLORS = ["#4D9FFF", "#F9A825", "#0A2FA6", "#7C3AED", "#DC2626", "#0891B2"];

const formatRM = (n: number) =>
  new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR", maximumFractionDigits: 0 }).format(n);



export default function Laporan() {
  const { currentAdmin } = useAuth();
  if (!currentAdmin) return null;

  const isReadonly = currentAdmin.peranan === "readonly";
  const isBendahari = currentAdmin.peranan === "bendahari";
  const ptj = currentAdmin.ptj;

  const myProducts = isReadonly
    ? WELFARE_PRODUCTS
    : WELFARE_PRODUCTS.filter((p) => p.ptj === ptj);

  const myDonations = isReadonly ? DONATIONS : DONATIONS.filter((d) => d.ptj === ptj);

  const totalSumbangan = myDonations.filter((d) => d.status === "Berjaya").reduce((sum, d) => sum + d.jumlah, 0);
  const bilanganPenyumbang = myDonations.filter((d) => d.status === "Berjaya").length;
  const purataSumbangan = bilanganPenyumbang > 0 ? totalSumbangan / bilanganPenyumbang : 0;

  const ptjKey = ({ PHEP: "PHEP", PUSAT_ISLAM: "PUSAT_ISLAM", WAKAF: "WAKAF", YAYASAN: "YAYASAN", KESIHATAN: "KESIHATAN", FAKULTI: "FAKULTI" } as Record<string, string>)[ptj] || "PHEP";

  const chartData = MONTHLY_DONATIONS.map((d) => ({
    bulan: d.bulan,
    jumlah: isReadonly
      ? Object.values(d).slice(1).reduce((sum: number, v) => sum + (typeof v === "number" ? v : 0), 0)
      : (d as Record<string, number | string>)[ptjKey] as number || 0,
  }));

  const wakafCount = myDonations.filter((d) => d.kaedahBayaran === "Wakaf & Endowmen" || d.kaedahBayaran === "FPX" || d.kaedahBayaran === "Pindahan Bank").length;
  const potonganCount = myDonations.filter((d) => d.kaedahBayaran === "Potongan Gaji").length;
  const total = wakafCount + potonganCount;

  const pieData = [
    { name: "Pembayaran Terus", value: wakafCount, pct: total ? Math.round((wakafCount / total) * 100) : 0 },
    { name: "Potongan Gaji", value: potonganCount, pct: total ? Math.round((potonganCount / total) * 100) : 0 },
  ];

  const ptjBreakdown = Object.keys(PTJ_CONFIGS)
    .filter((k) => !["BENDAHARI", "TNC_HEPA"].includes(k))
    .map((k, i) => ({
      name: PTJ_CONFIGS[k as keyof typeof PTJ_CONFIGS].shortLabel,
      value: WELFARE_PRODUCTS.filter((p) => p.ptj === k).reduce((sum, p) => sum + p.jumlahTerkumpul, 0),
      color: PIE_COLORS[i],
    }));

  return (
    <div className="space-y-5">
      <Breadcrumb items={[{ label: "Dashboard" }, { label: "Laporan & Statistik" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">
            {isReadonly ? "Laporan Sumbangan (Tontonan Sahaja)" : "Laporan & Statistik"}
          </h1>
          <p className="text-[#64748B] text-sm mt-0.5">
            {isReadonly ? "Data keseluruhan UTHM" : `Data bagi ${PTJ_CONFIGS[ptj].label}`}
          </p>
        </div>
        {!isReadonly && (
          <div className="flex gap-2">
            <button
              className="inline-flex items-center gap-2 px-4 h-10 text-sm rounded-[10px] transition-all"
              style={{
                background: "rgba(10,47,166,0.2)",
                border: "1px solid rgba(10,47,166,0.45)",
                color: "#0A2FA6",
                fontWeight: 700,
                boxShadow: "0 2px 12px rgba(10,47,166,0.12)",
              }}
            >
              <FileText className="w-4 h-4" />
              Jana Laporan PDF
            </button>
            <button
              className="inline-flex items-center gap-2 px-4 h-10 text-sm rounded-[10px] transition-all"
              style={{
                background: "rgba(77,159,255,0.10)",
                border: "1px solid rgba(77,159,255,0.35)",
                color: "#0A2FA6",
                fontWeight: 600,
              }}
            >
              <Download className="w-4 h-4" />
              Eksport Excel
            </button>
          </div>
        )}
        {isReadonly && (
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)" }}
          >
            <Eye className="w-4 h-4 text-[#D97706]" />
            <span className="text-xs text-[#D97706] font-medium">Mod Tontonan Sahaja</span>
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="Jumlah Sumbangan (RM)"
          value={formatRM(totalSumbangan)}
          icon={<span className="text-xl">💰</span>}
          iconBg="bg-[#EEF4FF]"
        />
        <StatsCard
          title="Bilangan Penyumbang"
          value={bilanganPenyumbang.toLocaleString()}
          icon={<span className="text-xl">👥</span>}
          iconBg="bg-[#FFFBEB]"
        />
        <StatsCard
          title="Purata Sumbangan (RM)"
          value={formatRM(purataSumbangan)}
          icon={<span className="text-xl">📊</span>}
          iconBg="bg-[#EEF4FF]"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 p-5 glass-panel">
          <h2 className="font-semibold text-[#0F172A] mb-4 pb-2 border-b-2 border-[#0A2FA6] inline-block" style={{ fontWeight: 700 }}>
            Trend Sumbangan Bulanan (2025)
          </h2>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              {isReadonly ? (
                <BarChart data={MONTHLY_DONATIONS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => formatRM(v)} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="PHEP" fill="#4D9FFF" name="PHEP" stackId="a" />
                  <Bar dataKey="PUSAT_ISLAM" fill="#0A2FA6" name="Pusat Islam" stackId="a" />
                  <Bar dataKey="WAKAF" fill="#F9A825" name="Wakaf" stackId="a" />
                  <Bar dataKey="YAYASAN" fill="#7C3AED" name="Yayasan" stackId="a" />
                  <Bar dataKey="KESIHATAN" fill="#0891B2" name="Kesihatan" stackId="a" />
                  <Bar dataKey="FAKULTI" fill="#DC2626" name="Fakulti" stackId="a" />
                </BarChart>
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => formatRM(v)} />
                  <Bar dataKey="jumlah" fill="#4D9FFF" name="Jumlah Sumbangan (RM)" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="p-5 glass-panel">
          <h2 className="font-semibold text-[#0F172A] mb-4 pb-2 border-b-2 border-[#0A2FA6] inline-block text-sm" style={{ fontWeight: 700 }}>
            {isReadonly ? "Mengikut PTj" : "Mengikut Kaedah Bayaran"}
          </h2>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={isReadonly ? ptjBreakdown : pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  dataKey="value"
                  label={({ pct }) => pct ? `${pct}%` : ""}
                  labelLine={false}
                >
                  {(isReadonly ? ptjBreakdown : pieData).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={isReadonly ? (entry as { color: string }).color : PIE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => isReadonly ? formatRM(v) : `${v} penyumbang`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-2">
            {(isReadonly ? ptjBreakdown : pieData).slice(0, 4).map((item, i) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: (item as { color?: string }).color || PIE_COLORS[i] }}
                  />
                  <span className="text-[#64748B]">{item.name}</span>
                </div>
                <span className="font-medium text-[#0F172A]">
                  {isReadonly ? formatRM(item.value) : `${item.value}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Summary Table */}
      <div className="glass-panel" style={{ overflow: "hidden" }}>
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(226,232,240,0.6)" }}>
          <h2 className="font-semibold text-[#0F172A]" style={{ fontWeight: 700 }}>Ringkasan Mengikut Produk</h2>
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
              {myProducts.map((p, i) => (
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
                  <td className="px-4 py-3 text-xs font-medium text-[#0F172A]">{p.nama}</td>
                  <td className="px-4 py-3 text-xs text-[#64748B]">{p.ptjLabel}</td>
                  <td className="px-4 py-3 text-xs text-[#0F172A]">{p.bilanganPenyumbang.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-[#0A2FA6]">{formatRM(p.jumlahTerkumpul)}</td>
                </tr>
              ))}
              <tr style={{ borderTop: "2px solid #0A2FA6", background: "rgba(77,159,255,0.06)" }}>
                <td colSpan={3} className="px-4 py-3 text-xs font-bold text-[#0F172A]">JUMLAH</td>
                <td className="px-4 py-3 text-xs font-bold text-[#0F172A]">
                  {myProducts.reduce((sum, p) => sum + p.bilanganPenyumbang, 0).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-xs font-bold text-[#0A2FA6]">
                  {formatRM(myProducts.reduce((sum, p) => sum + p.jumlahTerkumpul, 0))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
