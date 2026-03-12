import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Shield, CreditCard, Building, Loader2, Lock } from "lucide-react";
import { Breadcrumb } from "../../components/shared/Breadcrumb";

const BANKS = [
  { id: "maybank", name: "Maybank2U", logo: "🏦" },
  { id: "cimb", name: "CIMB Clicks", logo: "🏦" },
  { id: "rhb", name: "RHB Bank", logo: "🏦" },
  { id: "public", name: "Public Bank", logo: "🏦" },
  { id: "bsn", name: "Bank Simpanan Nasional", logo: "🏦" },
  { id: "ambank", name: "AmBank", logo: "🏦" },
];

export default function Pembayaran() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { produk?: string; jumlah?: string; nama?: string; nokp?: string; emel?: string } || {};

  const [selectedBank, setSelectedBank] = useState("");
  const [processing, setProcessing] = useState(false);

  const produk = state.produk || "Produk Kebajikan UTHM";
  const jumlah = state.jumlah || "0";
  const nama = state.nama || "Penyumbang";

  const formatRM = (n: string) =>
    new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR" }).format(Number(n));

  const handlePayment = () => {
    if (!selectedBank) return;
    setProcessing(true);
    setTimeout(() => {
      navigate("/resit", {
        state: {
          produk,
          jumlah,
          nama,
          nokp: state.nokp,
          emel: state.emel,
          bank: BANKS.find((b) => b.id === selectedBank)?.name,
          noRujukan: `EP-${Date.now().toString().slice(-8)}`,
        },
      });
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Breadcrumb
        items={[
          { label: "Utama", onClick: () => navigate("/") },
          { label: "Perkhidmatan", onClick: () => navigate("/perkhidmatan") },
          { label: "Pembayaran" },
        ]}
      />

      <h1 className="text-2xl font-bold text-[#0F172A] mb-6">Pembayaran Sumbangan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summary */}
        <div className="space-y-4">
          <div className="p-5 glass-panel">
            <h2 className="font-semibold text-[#0F172A] mb-4 pb-2 border-b-2 border-[#0A2FA6] inline-block" style={{ fontWeight: 700 }}>
              Ringkasan Sumbangan
            </h2>
            <div className="space-y-3">
              {[
                { label: "Tabung / Dana", value: produk },
                { label: "Nama Penyumbang", value: nama },
                { label: "Kaedah Bayaran", value: "FPX — Perbankan Dalam Talian" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between gap-4">
                  <span className="text-xs text-[#64748B]">{item.label}</span>
                  <span className="text-xs font-medium text-[#0F172A] text-right">{item.value}</span>
                </div>
              ))}
              <div className="pt-3 mt-2 flex justify-between items-center" style={{ borderTop: "1px solid #E2E8F0" }}>
                <span className="text-sm font-semibold text-[#0F172A]">Jumlah Sumbangan</span>
                <span className="text-xl font-bold text-[#0A2FA6]">{formatRM(jumlah)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "rgba(22,163,74,0.06)", border: "1px solid rgba(22,163,74,0.2)" }}>
            <Shield className="w-5 h-5 text-[#16A34A] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#16A34A]">Transaksi Selamat & Terjamin</p>
              <p className="text-xs text-[#16A34A]/80 mt-0.5">
                Pembayaran anda diproses secara selamat melalui gerbang pembayaran yang disahkan oleh Bank Negara Malaysia.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="p-5 glass-panel">
          <h2 className="font-semibold text-[#0F172A] mb-4 pb-2 border-b-2 border-[#0A2FA6] inline-block" style={{ fontWeight: 700 }}>
            Pilih Bank (FPX)
          </h2>

          {processing ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Loader2 className="w-10 h-10 text-[#0A2FA6] animate-spin mb-4" />
              <p className="font-semibold text-[#0F172A]">Memproses pembayaran...</p>
              <p className="text-xs text-[#64748B] mt-1">Sila jangan tutup halaman ini.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {BANKS.map((bank) => (
                  <label
                    key={bank.id}
                    className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all"
                    style={
                      selectedBank === bank.id
                        ? { border: "1px solid rgba(10,47,166,0.4)", background: "rgba(77,159,255,0.06)" }
                        : { border: "1px solid #E2E8F0" }
                    }
                  >
                    <input
                      type="radio"
                      name="bank"
                      value={bank.id}
                      checked={selectedBank === bank.id}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      style={{ accentColor: "#0A2FA6" }}
                    />
                    <span className="text-lg">{bank.logo}</span>
                    <span className="text-xs font-medium text-[#0F172A]">{bank.name}</span>
                  </label>
                ))}
              </div>

              <button
                onClick={handlePayment}
                disabled={!selectedBank}
                className="w-full h-11 font-bold text-sm rounded-[10px] transition-all flex items-center justify-center gap-2"
                style={
                  selectedBank
                    ? { background: "rgba(10,47,166,0.2)", border: "1px solid rgba(10,47,166,0.45)", color: "#0A2FA6", fontWeight: 700, boxShadow: "0 2px 12px rgba(10,47,166,0.12)" }
                    : { background: "rgba(203,213,225,0.2)", border: "1px solid rgba(203,213,225,0.3)", color: "#CBD5E1", cursor: "not-allowed" }
                }
              >
                <Lock className="w-4 h-4" />
                Sahkan Pembayaran — {formatRM(jumlah)}
              </button>

              <button
                onClick={() => navigate(-1)}
                className="w-full h-9 mt-3 text-sm rounded-[10px] transition-all"
                style={{ border: "1px solid #E2E8F0", color: "#64748B", background: "transparent" }}
              >
                ← Kembali
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}