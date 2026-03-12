import React from "react";
import { useNavigate } from "react-router";
import { Heart, Home } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="text-center px-6">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(10,47,166,0.08)", border: "1px solid rgba(10,47,166,0.15)" }}>
          <Heart className="w-10 h-10 text-[#0A2FA6]" />
        </div>
        <h1 className="text-7xl font-bold text-[#0A2FA6] mb-2">404</h1>
        <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Halaman Tidak Dijumpai</h2>
        <p className="text-[#64748B] mb-8 max-w-sm mx-auto">
          Maaf, halaman yang anda cari tidak wujud atau telah dipindahkan.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 h-11 text-white font-semibold rounded-[10px] transition-all"
          style={{ background: "#0A2FA6", boxShadow: "0 2px 12px rgba(10,47,166,0.25)" }}
        >
          <Home className="w-4 h-4" />
          Kembali ke Laman Utama
        </button>
        <p className="text-xs text-[#6B7280] mt-8">Sistem e-Prihatin UTHM — Universiti Tun Hussein Onn Malaysia</p>
      </div>
    </div>
  );
}