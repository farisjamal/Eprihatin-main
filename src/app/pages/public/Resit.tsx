import React from "react";
import { useNavigate, useLocation } from "react-router";
import { CheckCircle, Download, FileText, Home, Printer } from "lucide-react";

export default function Resit() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    produk?: string; jumlah?: string; nama?: string;
    nokp?: string; emel?: string; bank?: string; noRujukan?: string;
  } || {};

  const produk = state.produk || "Produk Kebajikan UTHM";
  const jumlah = state.jumlah || "0";
  const nama = state.nama || "Penyumbang";
  const nokp = state.nokp || "-";
  const bank = state.bank || "FPX";
  const noRujukan = state.noRujukan || `EP-${Date.now().toString().slice(-8)}`;
  const tarikh = new Date().toLocaleDateString("ms-MY", {
    day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

  const formatRM = (n: string) =>
    new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR" }).format(Number(n));

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(22,163,74,0.10)", border: "1px solid rgba(22,163,74,0.2)" }}>
          <CheckCircle className="w-10 h-10 text-[#16A34A]" />
        </div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Sumbangan Berjaya Diterima!</h1>
        <p className="text-[#64748B]">Terima kasih atas sumbangan ikhlas anda kepada UTHM.</p>
      </div>

      {/* Receipt Card */}
      <div className="overflow-hidden mb-6 glass-panel">
        <div className="px-6 py-4" style={{ background: "#0A2FA6" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-lg">RESIT RASMI</p>
              <p className="text-white/70 text-xs">Sistem e-Prihatin UTHM</p>
            </div>
            <div className="text-right">
              <p className="text-[#F9A825] font-mono font-bold">{noRujukan}</p>
              <p className="text-white/70 text-xs">No. Rujukan</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {[
              { label: "Tarikh & Masa", value: tarikh },
              { label: "Nama Penyumbang", value: nama },
              { label: "No. Kad Pengenalan", value: nokp },
              { label: "Tabung / Dana", value: produk },
              { label: "Kaedah Bayaran", value: bank },
              { label: "Status", value: "Berjaya" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs text-[#64748B] mb-0.5">{item.label}</p>
                <p className="text-sm font-medium text-[#0F172A]">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid #E2E8F0" }}>
            <div>
              <p className="text-xs text-[#64748B]">Jumlah Sumbangan</p>
              <p className="text-3xl font-bold text-[#0A2FA6]">{formatRM(jumlah)}</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(22,163,74,0.10)", color: "#16A34A", border: "1px solid rgba(22,163,74,0.2)" }}>
                <CheckCircle className="w-3.5 h-3.5" />
                Berjaya
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Exemption Letter */}
      <div className="overflow-hidden mb-6 glass-panel">
        <div className="px-6 py-4 flex items-center gap-3" style={{ background: "rgba(249,168,37,0.08)", borderBottom: "1px solid rgba(249,168,37,0.25)" }}>
          <FileText className="w-5 h-5 text-[#D97706]" />
          <div>
            <p className="font-semibold text-[#0F172A] text-sm">Surat Pengecualian Cukai (Sec. 44(6) Akta Cukai Pendapatan 1967)</p>
            <p className="text-xs text-[#64748B]">Dijana secara automatik — Sah untuk tujuan potongan cukai</p>
          </div>
        </div>
        <div className="p-6">
          <div className="rounded-lg p-6" style={{ border: "1px solid #E2E8F0", background: "#F8F9FB" }}>
            <div className="text-center mb-6 pb-4" style={{ borderBottom: "1px solid #E2E8F0" }}>
              <p className="font-bold text-[#0F172A]">UNIVERSITI TUN HUSSEIN ONN MALAYSIA (UTHM)</p>
              <p className="text-xs text-[#64748B]">86400 Parit Raja, Batu Pahat, Johor</p>
              <p className="text-xs text-[#64748B]">Tel: +607-453 7000 | www.uthm.edu.my</p>
            </div>
            <div className="text-center mb-6">
              <p className="text-sm font-bold text-[#0F172A] uppercase border-b-2 border-[#0A2FA6] inline-block pb-1">
                SURAT PENGESAHAN SUMBANGAN / PENGECUALIAN CUKAI
              </p>
            </div>
            <div className="text-xs text-[#0F172A] space-y-3 leading-relaxed">
              <p>Dengan hormatnya, dimaklumkan bahawa pihak kami telah menerima sumbangan daripada:</p>
              <div className="rounded p-3 space-y-1" style={{ background: "white", border: "1px solid #E2E8F0" }}>
                <p><strong>Nama:</strong> {nama}</p>
                <p><strong>No. Kad Pengenalan:</strong> {nokp}</p>
                <p><strong>Tabung/Dana:</strong> {produk}</p>
                <p><strong>Jumlah Sumbangan:</strong> {formatRM(jumlah)}</p>
                <p><strong>Tarikh:</strong> {tarikh}</p>
                <p><strong>No. Rujukan:</strong> {noRujukan}</p>
              </div>
              <p>
                Sumbangan ini layak untuk pengecualian cukai di bawah Seksyen 44(6) Akta Cukai Pendapatan 1967.
                UTHM merupakan institusi yang diluluskan di bawah peruntukan berkenaan.
              </p>
              <p className="text-[#64748B] text-[10px]">
                *Surat ini dijana secara elektronik dan sah tanpa tandatangan basah.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 h-11 text-sm rounded-[10px] transition-all"
          style={{ background: "rgba(10,47,166,0.2)", border: "1px solid rgba(10,47,166,0.45)", color: "#0A2FA6", fontWeight: 700, boxShadow: "0 2px 12px rgba(10,47,166,0.12)" }}
        >
          <Download className="w-4 h-4" />
          Muat Turun Resit (PDF)
        </button>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-5 h-11 text-sm rounded-[10px] transition-all"
          style={{ background: "rgba(77,159,255,0.10)", border: "1px solid rgba(77,159,255,0.35)", color: "#0A2FA6", fontWeight: 600 }}
        >
          <Printer className="w-4 h-4" />
          Muat Turun Surat Pengecualian Cukai
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm transition-colors"
          style={{ color: "#64748B" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#0A2FA6")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#64748B")}
        >
          <Home className="w-4 h-4" />
          Kembali ke Laman Utama
        </button>
      </div>
    </div>
  );
}