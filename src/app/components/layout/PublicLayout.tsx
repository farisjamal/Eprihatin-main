import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router";
import { Menu, X, Heart, Phone, Mail, MapPin } from "lucide-react";

export function PublicLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Utama", path: "/" },
    { label: "Perkhidmatan", path: "/perkhidmatan" },
    { label: "Soalan Lazim", path: "/faq" },
    { label: "Hubungi Kami", path: "/hubungi" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isHome = location.pathname === "/";

  return (
    <div className={`min-h-screen flex flex-col relative ${!isHome ? 'spatial-ui' : ''}`} style={{ fontFamily: "'Inter', system-ui, sans-serif", background: !isHome ? "var(--surface)" : "#F8F9FB" }}>
      {/* Header */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 max-w-7xl mx-auto w-full">
        <header
          className="glass-panel w-full transition-all duration-300"
          style={{ borderRadius: mobileOpen ? "24px" : "9999px" }}
        >
          <div className="px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <button onClick={() => navigate("/")} className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(10,47,166,0.12)", border: "1px solid rgba(10,47,166,0.2)" }}
              >
                <Heart className="w-5 h-5 text-[#0A2FA6]" fill="currentColor" />
              </div>
              <div className="text-left">
                <span className="font-bold text-[#0A2FA6] text-base leading-tight block">e-Prihatin</span>
                <span className="text-[10px] text-[#64748B] leading-tight block">UTHM</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="text-sm font-medium transition-colors"
                  style={{
                    color: isActive(link.path) ? "#0A2FA6" : "#64748B",
                    borderBottom: isActive(link.path) ? "2px solid #0A2FA6" : "2px solid transparent",
                    paddingBottom: "2px",
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-5 h-10 font-semibold text-sm rounded-[10px] transition-all btn-primary"
              >
                Log Masuk
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              style={{ color: "#0A2FA6" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div
              className="md:hidden absolute top-full left-0 right-0 mt-2 px-6 py-4 space-y-3 glass-panel shadow-lg"
              style={{ borderRadius: "24px", background: "rgba(255,255,255,0.95)" }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => { navigate(link.path); setMobileOpen(false); }}
                  className="block w-full text-left text-sm py-2 transition-colors"
                  style={{ color: isActive(link.path) ? "#0A2FA6" : "#0F172A" }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => navigate("/login")}
                className="w-full h-10 font-semibold text-sm rounded-full btn-primary"
              >
                Log Masuk
              </button>
            </div>
          )}
        </header>
      </div>

      {/* Main Content */}
      <main className={`flex-1 ${!isHome ? "pt-28" : ""}`}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ background: "#0F172A", color: "white" }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" fill="white" />
                </div>
                <div>
                  <span className="font-bold text-white text-base block">Sistem e-Prihatin</span>
                  <span className="text-xs text-white/70 block">UTHM</span>
                </div>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                Platform pengurusan sumbangan kebajikan berpusat untuk Universiti Tun Hussein Onn Malaysia.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Pautan Pantas</h4>
              <ul className="space-y-2">
                {[
                  { label: "Laman Utama", path: "/" },
                  { label: "Senarai Produk Kebajikan", path: "/perkhidmatan" },
                  { label: "Semak Sumbangan Saya", path: "/sejarah-sumbangan" },
                  { label: "Log Masuk Pentadbir", path: "/login" },
                ].map((link) => (
                  <li key={link.path}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Hubungi Kami</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-white/70">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Pejabat Hal Ehwal Pelajar, UTHM, 86400 Parit Raja, Batu Pahat, Johor</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-white/70">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+607-453 7000</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-white/70">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>eprihatin@uthm.edu.my</span>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <p className="text-xs text-white/50">
              © 2025 Sistem e-Prihatin UTHM — Universiti Tun Hussein Onn Malaysia. Hak Cipta Terpelihara.
            </p>
            <p className="text-xs text-white/50">
              Dibangunkan oleh Pejabat Hal Ehwal Pelajar UTHM
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
