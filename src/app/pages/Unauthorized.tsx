import React from "react";
import { useNavigate } from "react-router";
import { ShieldOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const PTJ_PATHS: Record<string, string> = {
  PHEP: "/admin/phep",
  PUSAT_ISLAM: "/admin/pusat-islam",
  WAKAF: "/admin/wakaf",
  YAYASAN: "/admin/yayasan",
  KESIHATAN: "/admin/kesihatan",
  FAKULTI: "/admin/fakulti",
  BENDAHARI: "/admin/bendahari",
  TNC_HEPA: "/admin/tnc",
};

export default function Unauthorized() {
  const navigate = useNavigate();
  const { currentAdmin } = useAuth();

  const dashboardPath = currentAdmin ? (PTJ_PATHS[currentAdmin.ptj] || "/login") : "/login";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#F9FAFB]"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="text-center px-6">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.15)" }}>
          <ShieldOff className="w-10 h-10 text-[#DC2626]" />
        </div>
        <h1 className="text-7xl font-bold text-[#DC2626] mb-2">403</h1>
        <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Akses Dinafikan</h2>
        <p className="text-[#64748B] mb-8 max-w-sm mx-auto">
          Anda tidak mempunyai kebenaran untuk mengakses halaman ini. Sila hubungi pentadbir sistem
          jika anda merasakan ini adalah satu kesilapan.
        </p>
        <button
          onClick={() => navigate(dashboardPath)}
          className="inline-flex items-center gap-2 px-6 h-11 text-white font-semibold rounded-[10px] transition-all"
          style={{ background: "#0A2FA6", boxShadow: "0 2px 12px rgba(10,47,166,0.25)" }}
        >
          Kembali ke Dashboard Saya
        </button>
        <p className="text-xs text-[#6B7280] mt-8">
          Sistem e-Prihatin UTHM — Universiti Tun Hussein Onn Malaysia
        </p>
      </div>
    </div>
  );
}