import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Heart, Eye, EyeOff, Info } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { DEMO_CREDENTIALS } from "../data/mockData";

// Single shared demo password — not stored in data layer
const DEMO_PASSWORD = "demo";

const ROLE_REDIRECT: Record<string, string> = {
  phep: "/admin/phep",
  "pusat-islam": "/admin/pusat-islam",
  wakaf: "/admin/wakaf",
  yayasan: "/admin/yayasan",
  kesihatan: "/admin/kesihatan",
  fakulti: "/admin/fakulti",
  bendahari: "/admin/bendahari",
  tnc: "/admin/tnc",
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const match = DEMO_CREDENTIALS.find(
      (c) => c.email === email && password === DEMO_PASSWORD
    );

    if (!match) {
      setError("E-mel atau kata laluan tidak sah. Sila semak maklumat anda.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(match.role);
      navigate(ROLE_REDIRECT[match.role] || "/admin/phep");
    }, 800);
  };

  const handleDemoLogin = (role: string) => {
    setLoading(true);
    setTimeout(() => {
      login(role);
      navigate(ROLE_REDIRECT[role] || "/admin/phep");
    }, 500);
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    height: "40px",
    padding: "0 12px",
    border: "1px solid #E2E8F0",
    borderRadius: "8px",
    fontSize: "14px",
    background: "#FFFFFF",
    color: "#0F172A",
    outline: "none",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #0A2FA6 0%, #1E40AF 50%, #4D9FFF 100%)",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)" }}
          >
            <Heart className="w-8 h-8 text-white" fill="white" />
          </div>
          <h1 className="text-2xl font-bold text-white">e-Prihatin</h1>
          <p className="text-white/70 text-sm mt-1">Sistem Pengurusan Kebajikan UTHM</p>
        </div>

        {/* Login Card */}
        <div
          className="overflow-hidden glass-panel"
        >
          <div
            className="px-6 py-4"
            style={{
              background: "rgba(248,249,251,0.8)",
              borderBottom: "1px solid rgba(226,232,240,0.6)",
            }}
          >
            <h2 className="text-[#0F172A] font-bold text-lg">Log Masuk Pentadbir</h2>
            <p className="text-[#64748B] text-xs mt-0.5">Masukkan kelayakan anda untuk meneruskan</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#0F172A] block mb-1" style={{ fontSize: "13px" }}>
                E-mel / No. Pekerja
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                style={inputBase}
                placeholder="nama@uthm.edu.my"
                required
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

            <div>
              <label className="text-xs font-semibold text-[#0F172A] block mb-1" style={{ fontSize: "13px" }}>
                Kata Laluan
              </label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  style={{ ...inputBase, paddingRight: "40px" }}
                  placeholder="••••••••"
                  required
                  onFocus={(e) => {
                    (e.target as HTMLInputElement).style.border = "1px solid #0A2FA6";
                    (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(10,47,166,0.1)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLInputElement).style.border = "1px solid #E2E8F0";
                    (e.target as HTMLInputElement).style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  aria-label={showPwd ? "Sembunyikan kata laluan" : "Tunjukkan kata laluan"}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#64748B" }}
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="rounded-lg px-3 py-2"
                style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)" }}
              >
                <p className="text-xs text-[#DC2626]">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 font-bold text-sm rounded-[10px] transition-all disabled:opacity-60 disabled:cursor-not-allowed glass-panel"
            >
              {loading ? "Memproses..." : "Log Masuk"}
            </button>
          </form>

          {/* Demo Access */}
          <div className="px-6 pb-6">
            <button
              type="button"
              onClick={() => setShowDemo(!showDemo)}
              className="w-full flex items-center justify-center gap-2 text-xs transition-colors"
              style={{ color: "#64748B" }}
            >
              <Info className="w-3.5 h-3.5" />
              {showDemo ? "Sembunyi" : "Tunjukkan"} Akaun Demo
            </button>

            {showDemo && (
              <div
                className="mt-3 overflow-hidden"
                style={{ border: "1px solid #E2E8F0", borderRadius: "12px" }}
              >
                <div className="px-3 py-2" style={{ background: "#F8F9FB", borderBottom: "1px solid #E2E8F0" }}>
                  <p className="text-xs font-semibold text-[#0F172A]">Akses Demo (Kata Laluan: demo)</p>
                </div>
                <div>
                  {DEMO_CREDENTIALS.map((cred) => (
                    <button
                      key={cred.role}
                      type="button"
                      onClick={() => handleDemoLogin(cred.role)}
                      className="w-full flex items-center justify-between px-3 py-2.5 transition-colors text-left group"
                      style={{ borderBottom: "1px solid #E2E8F0" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(77,159,255,0.06)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                    >
                      <div>
                        <p className="text-xs font-medium text-[#0F172A]">{cred.label}</p>
                        <p className="text-[10px] text-[#64748B]">{cred.email}</p>
                      </div>
                      <span className="text-[10px] text-[#0A2FA6] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                        Log Masuk →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-white/60 text-xs hover:text-white transition-colors"
          >
            ← Kembali ke Laman Utama e-Prihatin
          </button>
        </div>

        <p className="text-center text-white/40 text-[10px] mt-4">
          Sistem e-Prihatin UTHM — Universiti Tun Hussein Onn Malaysia
        </p>
      </div>
    </div>
  );
}
