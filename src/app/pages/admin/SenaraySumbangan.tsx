import React, { useState } from "react";
import { Download, Eye, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { DONATIONS, WELFARE_PRODUCTS } from "../../data/mockData";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { Modal } from "../../components/shared/Modal";
import { Breadcrumb } from "../../components/shared/Breadcrumb";



export default function SenaraySumbangan() {
  const { currentAdmin } = useAuth();
  if (!currentAdmin) return null;

  const ptj = currentAdmin.ptj;
  const isReadonly = currentAdmin.peranan === "readonly";
  const baseDonations = isReadonly ? DONATIONS : DONATIONS.filter((d) => d.ptj === ptj || DONATIONS.some(() => true));

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [selectedDonation, setSelectedDonation] = useState<(typeof DONATIONS)[0] | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const filtered = baseDonations.filter((d) => {
    const matchSearch = search === "" ||
      d.namaPenyumbang.toLowerCase().includes(search.toLowerCase()) ||
      d.noRujukan.toLowerCase().includes(search.toLowerCase()) ||
      d.produk.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "Semua" || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const formatRM = (n: number) =>
    new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR" }).format(n);

  const totalAmount = filtered.reduce((sum, d) => sum + (d.status === "Berjaya" ? d.jumlah : 0), 0);

  const inputStyle: React.CSSProperties = {
    height: "40px",
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    background: "#FFFFFF",
    color: "#0F172A",
    fontSize: "14px",
    outline: "none",
  };

  return (
    <div className="space-y-5">
      <Breadcrumb items={[{ label: "Dashboard" }, { label: "Senarai Sumbangan" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Senarai Sumbangan</h1>
          <p className="text-[#64748B] text-sm mt-0.5">{filtered.length} rekod | Jumlah: {formatRM(totalAmount)}</p>
        </div>
        {!isReadonly && (
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
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Cari nama, no. rujukan, atau produk..."
            className="w-full pl-9 pr-4 text-sm"
            style={inputStyle}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.border = "1px solid #0A2FA6";
              (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(10,47,166,0.1)";
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.border = "1px solid #E2E8F0";
              (e.target as HTMLInputElement).style.boxShadow = "none";
            }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-3 text-sm"
          style={{ ...inputStyle, width: "auto" }}
        >
          <option value="Semua">Semua Status</option>
          <option value="Berjaya">Berjaya</option>
          <option value="Dalam Proses">Dalam Proses</option>
          <option value="Gagal">Gagal</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ overflow: "hidden" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(77,159,255,0.06)" }}>
                {["Tarikh", "No. Rujukan", "Nama Penyumbang", "Produk", "Jumlah (RM)", "Kaedah", "Status", "Tindakan"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs whitespace-nowrap uppercase tracking-wide" style={{ color: "#64748B", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-[#64748B] text-sm">Tiada rekod dijumpai.</td>
                </tr>
              ) : (
                paginated.map((d, i) => (
                  <tr
                    key={d.id}
                    className="transition-colors"
                    style={{
                      borderTop: "1px solid #E2E8F0",
                      background: i % 2 === 1 ? "#FAFAFA" : "white",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#F0F7FF")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i % 2 === 1 ? "#FAFAFA" : "white")}
                  >
                    <td className="px-4 py-3 text-xs text-[#64748B] whitespace-nowrap">{d.tarikhMasa}</td>
                    <td className="px-4 py-3 text-xs font-mono text-[#0A2FA6] font-medium">{d.noRujukan}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[#0F172A]">{d.namaPenyumbang}</td>
                    <td className="px-4 py-3 text-xs text-[#64748B] max-w-[160px]">
                      <p className="truncate">{d.produk}</p>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold text-[#0F172A] whitespace-nowrap">{formatRM(d.jumlah)}</td>
                    <td className="px-4 py-3 text-xs text-[#64748B] whitespace-nowrap">{d.kaedahBayaran}</td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedDonation(d)}
                        className="inline-flex items-center gap-1 h-7 px-2.5 text-xs rounded-lg transition-all"
                        style={{
                          background: "rgba(77,159,255,0.10)",
                          border: "1px solid rgba(77,159,255,0.35)",
                          color: "#0A2FA6",
                          fontWeight: 600,
                        }}
                      >
                        <Eye className="w-3 h-3" />
                        Lihat
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 flex items-center justify-between" style={{ borderTop: "1px solid #E2E8F0" }}>
            <p className="text-xs text-[#64748B]">
              Menunjukkan {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} daripada {filtered.length}
            </p>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-7 h-7 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: p === page ? "#0A2FA6" : "transparent",
                    color: p === page ? "white" : "#64748B",
                    border: p === page ? "1px solid #0A2FA6" : "1px solid transparent",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedDonation}
        onClose={() => setSelectedDonation(null)}
        title="Butiran Sumbangan"
        size="md"
        footer={
          <div className="flex gap-2">
            {!isReadonly && (
              <button
                className="h-9 px-4 text-sm rounded-[10px] inline-flex items-center gap-2 transition-all"
                style={{
                  background: "rgba(10,47,166,0.2)",
                  border: "1px solid rgba(10,47,166,0.45)",
                  color: "#0A2FA6",
                  fontWeight: 700,
                }}
              >
                <Download className="w-3.5 h-3.5" />
                Jana Semula Resit
              </button>
            )}
            <button
              onClick={() => setSelectedDonation(null)}
              className="h-9 px-4 text-sm rounded-[10px] transition-all"
              style={{
                background: "rgba(77,159,255,0.10)",
                border: "1px solid rgba(77,159,255,0.3)",
                color: "#0A2FA6",
                fontWeight: 600,
              }}
            >
              Tutup
            </button>
          </div>
        }
      >
        {selectedDonation && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "No. Rujukan", value: selectedDonation.noRujukan },
                { label: "Tarikh & Masa", value: selectedDonation.tarikhMasa },
                { label: "Nama Penyumbang", value: selectedDonation.namaPenyumbang },
                { label: "No. Kad Pengenalan", value: selectedDonation.noKadPengenalan },
                { label: "E-mel", value: selectedDonation.emel },
                { label: "No. Telefon", value: selectedDonation.noTelefon },
                { label: "Jenis Penyumbang", value: selectedDonation.jenisPenyumbang },
                { label: "Produk", value: selectedDonation.produk },
                { label: "Kaedah Bayaran", value: selectedDonation.kaedahBayaran },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-[#64748B] mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium text-[#0F172A]">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="pt-3 flex justify-between items-center" style={{ borderTop: "1px solid #E2E8F0" }}>
              <div>
                <p className="text-xs text-[#64748B]">Jumlah Sumbangan</p>
                <p className="text-2xl font-bold text-[#0A2FA6]">{formatRM(selectedDonation.jumlah)}</p>
              </div>
              <StatusBadge status={selectedDonation.status} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
