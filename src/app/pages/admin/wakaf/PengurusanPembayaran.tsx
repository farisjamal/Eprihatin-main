import React, { useState } from "react";
import { Search, Eye } from "lucide-react";
import { DONATIONS } from "../../../data/mockData";
import { StatusBadge } from "../../../components/shared/StatusBadge";
import { Modal } from "../../../components/shared/Modal";
import { Breadcrumb } from "../../../components/shared/Breadcrumb";

const PAYMENT_STATUSES = [
  { status: "Berjaya", count: 8 },
  { status: "Dalam Proses", count: 2 },
  { status: "Gagal", count: 1 },
];

export default function PengurusanPembayaran() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [selected, setSelected] = useState<typeof DONATIONS[0] | null>(null);

  const transactions = DONATIONS.filter((d) => 
    d.kaedahBayaran === "Wakaf & Endowmen" || d.kaedahBayaran === "FPX" || d.kaedahBayaran === "Pindahan Bank"
  );

  const filtered = transactions.filter((d) => {
    const matchStatus = statusFilter === "Semua" || d.status === statusFilter;
    const matchSearch = search === "" || d.namaPenyumbang.toLowerCase().includes(search.toLowerCase()) || d.noRujukan.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const formatRM = (n: number) =>
    new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR" }).format(n);

  return (
    <div className="space-y-5">
      <Breadcrumb items={[{ label: "Dashboard" }, { label: "Pengurusan Pembayaran" }]} />
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Pengurusan Pembayaran</h1>
        <p className="text-[#64748B] text-sm mt-0.5">Transaksi pembayaran gerbang — Wakaf & Endowmen</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {PAYMENT_STATUSES.map((s) => (
          <div key={s.status} className="rounded-xl p-4" style={{
            background: s.status === "Berjaya" ? "rgba(22,163,74,0.08)" : s.status === "Dalam Proses" ? "rgba(217,119,6,0.08)" : "rgba(220,38,38,0.08)",
            border: s.status === "Berjaya" ? "1px solid rgba(22,163,74,0.2)" : s.status === "Dalam Proses" ? "1px solid rgba(217,119,6,0.2)" : "1px solid rgba(220,38,38,0.2)",
          }}>
            <p className="text-2xl font-bold" style={{ color: s.status === "Berjaya" ? "#16A34A" : s.status === "Dalam Proses" ? "#D97706" : "#DC2626" }}>{s.count}</p>
            <p className="text-xs text-[#64748B]">{s.status}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama atau no. transaksi..." className="w-full h-10 pl-9 pr-4 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#0A2FA6]" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-10 px-3 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none">
          <option value="Semua">Semua Status</option>
          <option value="Berjaya">Berjaya</option>
          <option value="Dalam Proses">Dalam Proses</option>
          <option value="Gagal">Gagal</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden glass-panel">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(77,159,255,0.06)" }}>
                {["Tarikh", "No. Transaksi", "Nama Penyumbang", "Jumlah (RM)", "Status Bayaran", "Tindakan"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs whitespace-nowrap uppercase tracking-wide" style={{ color: "#64748B", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <tr key={d.id} className="transition-colors" style={{ borderTop: "1px solid #E2E8F0", background: i % 2 === 1 ? "#FAFAFA" : "white" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#F0F7FF")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i % 2 === 1 ? "#FAFAFA" : "white")}
                >
                  <td className="px-4 py-3 text-xs text-[#64748B] whitespace-nowrap">{d.tarikhMasa}</td>
                  <td className="px-4 py-3 text-xs font-mono text-[#0A2FA6]">{d.noRujukan}</td>
                  <td className="px-4 py-3 text-xs font-medium text-[#0F172A]">{d.namaPenyumbang}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-[#0F172A]">{formatRM(d.jumlah)}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(d)} className="inline-flex items-center gap-1 h-7 px-2.5 text-xs rounded-lg transition-all" style={{ background: "rgba(77,159,255,0.10)", border: "1px solid rgba(77,159,255,0.35)", color: "#0A2FA6", fontWeight: 600 }}>
                      <Eye className="w-3 h-3" />
                      Semak
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Butiran Transaksi" size="md"
        footer={<button onClick={() => setSelected(null)} className="h-9 px-4 text-sm rounded-[10px]" style={{ background: "rgba(77,159,255,0.10)", border: "1px solid rgba(77,159,255,0.3)", color: "#0A2FA6", fontWeight: 600 }}>Tutup</button>}
      >
        {selected && (
          <div className="space-y-3">
            {[
              { label: "No. Transaksi", value: selected.noRujukan },
              { label: "Tarikh & Masa", value: selected.tarikhMasa },
              { label: "Nama Penyumbang", value: selected.namaPenyumbang },
              { label: "Produk", value: selected.produk },
              { label: "Kaedah Bayaran", value: selected.kaedahBayaran },
              { label: "Jumlah", value: formatRM(selected.jumlah) },
              { label: "Status", value: selected.status },
            ].map((item) => (
              <div key={item.label} className="flex justify-between pb-2" style={{ borderBottom: "1px solid #E2E8F0" }}>
                <span className="text-xs text-[#64748B]">{item.label}</span>
                <span className="text-xs font-medium text-[#0F172A]">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}