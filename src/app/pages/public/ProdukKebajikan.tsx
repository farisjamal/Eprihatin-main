import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Filter } from "lucide-react";
import { WELFARE_PRODUCTS, PtjType } from "../../data/mockData";
import { Breadcrumb } from "../../components/shared/Breadcrumb";
import { StatusBadge } from "../../components/shared/StatusBadge";

type TabKey = "ALL" | PtjType;

const TABS: { key: TabKey; label: string }[] = [
  { key: "ALL", label: "Semua" },
  { key: "PHEP", label: "PHEP" },
  { key: "PUSAT_ISLAM", label: "Pusat Islam" },
  { key: "WAKAF", label: "Wakaf & Endowmen" },
  { key: "YAYASAN", label: "Yayasan UTHM" },
  { key: "KESIHATAN", label: "Pusat Kesihatan" },
  { key: "FAKULTI", label: "Fak. TDHEPA" },
];

export default function ProdukKebajikan() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>("ALL");
  const [search, setSearch] = useState("");

  const filtered = WELFARE_PRODUCTS.filter((p) => {
    const matchTab = activeTab === "ALL" || p.ptj === activeTab;
    const matchSearch = search === "" || 
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.penerangan.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch && p.status === "Aktif";
  });

  const formatRM = (n: number) =>
    new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Breadcrumb items={[{ label: "Utama", onClick: () => navigate("/") }, { label: "Perkhidmatan" }]} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Senarai Produk Kebajikan</h1>
        <p className="text-[#64748B]">Pilih tabung atau dana kebajikan yang ingin anda sumbangkan</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk kebajikan..."
            className="w-full h-10 pl-9 pr-4 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] focus:outline-none focus:border-[#0A2FA6] focus:ring-1 focus:ring-[#0A2FA6]/20"
          />
        </div>
        <div className="text-sm text-[#6B7280] flex items-center">
          {filtered.length} produk dijumpai
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex-shrink-0 px-4 h-9 rounded-lg text-sm font-medium transition-all"
            style={
              activeTab === tab.key
                ? { background: "#0A2FA6", color: "white" }
                : { background: "rgba(77,159,255,0.08)", color: "#0A2FA6", border: "1px solid rgba(77,159,255,0.2)" }
            }
          >
            {tab.label}
            <span className="ml-1.5 text-xs opacity-75">
              ({tab.key === "ALL"
                ? WELFARE_PRODUCTS.filter((p) => p.status === "Aktif").length
                : WELFARE_PRODUCTS.filter((p) => p.ptj === tab.key && p.status === "Aktif").length})
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#64748B]">Tiada produk dijumpai untuk carian ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const progress = product.sasaran
              ? Math.min(100, (product.jumlahTerkumpul / product.sasaran) * 100)
              : null;

            return (
              <div
                key={product.id}
                className="rounded-2xl p-5 hover:-translate-y-0.5 flex flex-col transition-all glass-panel"
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.border = "1px solid rgba(10,47,166,0.3)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.7)")}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: "rgba(77,159,255,0.08)", border: "1px solid rgba(77,159,255,0.15)" }}
                  >
                    {product.ikon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium mb-1"
                      style={{ backgroundColor: "rgba(10,47,166,0.08)", color: "#0A2FA6", border: "1px solid rgba(10,47,166,0.15)" }}
                    >
                      {product.ptjLabel}
                    </span>
                    <h3 className="font-semibold text-[#0F172A] text-sm leading-snug">{product.nama}</h3>
                  </div>
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed mb-4 flex-1 line-clamp-3">
                  {product.penerangan}
                </p>

                <div className="flex items-center gap-3 text-xs text-[#64748B] mb-3">
                  <span>💰 {formatRM(product.jumlahTerkumpul)} terkumpul</span>
                  <span>👥 {product.bilanganPenyumbang} penyumbang</span>
                </div>

                {progress !== null && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-[#64748B] mb-1">
                      <span>Kemajuan</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "#E2E8F0" }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${progress}%`, background: "#4D9FFF" }}
                      />
                    </div>
                    {product.sasaran && (
                      <p className="text-[10px] text-[#64748B] mt-1">Sasaran: {formatRM(product.sasaran)}</p>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2 mt-auto">
                  <button
                    onClick={() => navigate(`/produk/${product.id}`)}
                    className="flex-1 text-xs text-[#0A2FA6] font-medium hover:underline text-left"
                  >
                    Ketahui Lanjut →
                  </button>
                  <button
                    onClick={() => navigate(`/produk/${product.id}`)}
                    className="px-4 h-9 text-xs rounded-[10px] transition-all"
                    style={{
                      background: "rgba(10,47,166,0.15)",
                      border: "1px solid rgba(10,47,166,0.35)",
                      color: "#0A2FA6",
                      fontWeight: 700,
                    }}
                  >
                    DERMA
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}