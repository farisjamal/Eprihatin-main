import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Heart, ArrowRight, ChevronRight, GraduationCap, Moon, Building2,
  Star, Stethoscope, Wrench, TrendingUp, Users, CheckCircle, Quote
} from "lucide-react";
import { WELFARE_PRODUCTS, PTJ_CONFIGS, PtjType } from "../../data/mockData";

const CAMPUS_IMAGE = "https://images.unsplash.com/photo-1768720407727-f4c4b9a17e58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwZ3JlZW4lMjBidWlsZGluZyUyMGFjYWRlbWljfGVufDF8fHx8MTc3MjY4NjY1M3ww&ixlib=rb-4.1.0&q=80&w=1080";

const PTJ_TABS: { key: PtjType | "ALL"; label: string; icon: React.ReactNode; desc: string }[] = [
  { key: "ALL", label: "Semua PTj", icon: <Star className="w-5 h-5" />, desc: "Semua tabung kebajikan UTHM" },
  { key: "PHEP", label: "Hal Ehwal Pelajar", icon: <GraduationCap className="w-5 h-5" />, desc: "Dana Wang Ihsan — bantuan pelajar" },
  { key: "PUSAT_ISLAM", label: "Pusat Islam", icon: <Moon className="w-5 h-5" />, desc: "Tabung Zakat & Infaq" },
  { key: "WAKAF", label: "Wakaf & Endowmen", icon: <Building2 className="w-5 h-5" />, desc: "Pembangunan berterusan universiti" },
  { key: "YAYASAN", label: "Yayasan UTHM", icon: <Star className="w-5 h-5" />, desc: "Biasiswa & pembangunan" },
  { key: "KESIHATAN", label: "Pusat Kesihatan", icon: <Stethoscope className="w-5 h-5" />, desc: "Tabung perubatan & kesihatan" },
  { key: "FAKULTI", label: "Fakulti TDHEPA", icon: <Wrench className="w-5 h-5" />, desc: "Dana kebajikan fakulti" },
];

const STATS = [
  { label: "Jumlah Sumbangan Terkumpul", value: "RM 8.2 Juta+", icon: <TrendingUp className="w-6 h-6 text-[#F9A825]" /> },
  { label: "Bilangan Penyumbang", value: "12,500+", icon: <Users className="w-6 h-6 text-[#F9A825]" /> },
  { label: "Produk Kebajikan Aktif", value: "40+", icon: <CheckCircle className="w-6 h-6 text-[#F9A825]" /> },
  { label: "PTj Terlibat", value: "6 PTj", icon: <Building2 className="w-6 h-6 text-[#F9A825]" /> },
];

const TESTIMONIALS = [
  { nama: "Ahmad Faris bin Zulkifli", peranan: "Staf UTHM", quote: "Platform ini memudahkan saya menderma secara bulanan melalui potongan gaji. Proses yang mudah dan telus.", avatar: "AF" },
  { nama: "Siti Nurhaliza binti Mahmud", peranan: "Alumni UTHM", quote: "Sebagai alumni, saya gembira dapat menyumbang untuk generasi pelajar seterusnya melalui sistem yang bersepadu ini.", avatar: "SN" },
  { nama: "Mohd Hafiz bin Roslan", peranan: "Industri", quote: "Syarikat kami telah menyumbang untuk Wakaf Penyelidikan. Surat pengecualian cukai dihasilkan secara automatik — sangat cekap!", avatar: "MH" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<PtjType | "ALL">("ALL");

  const filteredProducts = activeTab === "ALL"
    ? WELFARE_PRODUCTS.filter((p) => p.status === "Aktif").slice(0, 6)
    : WELFARE_PRODUCTS.filter((p) => p.ptj === activeTab && p.status === "Aktif").slice(0, 6);

  const formatRM = (n: number) =>
    new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR", maximumFractionDigits: 0 }).format(n);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${CAMPUS_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2FA6]/95 via-[#0A2FA6]/85 to-[#4D9FFF]/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#F9A825]/20 border border-[#F9A825]/40 rounded-full px-4 py-1.5 mb-6">
              <Heart className="w-4 h-4 text-[#F9A825]" fill="#F9A825" />
              <span className="text-[#F9A825] text-sm font-medium">Platform Kebajikan Rasmi UTHM</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              e-Prihatin —{" "}
              <span className="text-[#F9A825]">Pilihan Untuk</span>{" "}
              Memberi Bantuan
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              Platform sumbangan kebajikan dalam talian yang berpusat untuk Universiti Tun Hussein Onn Malaysia.
              Menderma dengan mudah, selamat, dan telus.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/perkhidmatan")}
                className="inline-flex items-center gap-2 px-6 h-12 font-bold rounded-[10px] hover:opacity-90 transition-all shadow-lg"
                style={{ background: "#F9A825", color: "#0F172A" }}
              >
                <Heart className="w-5 h-5" />
                Mula Menderma
              </button>
              <button
                onClick={() => navigate("/perkhidmatan")}
                className="inline-flex items-center gap-2 px-6 h-12 bg-transparent border-2 border-white text-white font-semibold rounded-[10px] hover:bg-white/10 transition-colors"
              >
                Lihat Laporan
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10" style={{ background: "#0A2FA6" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PTj Tabs + Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Produk Kebajikan UTHM</h2>
            <p className="text-[#64748B] max-w-2xl mx-auto">
              Pilih tabung atau dana yang ingin anda sumbangkan. Setiap sumbangan anda memberi impak nyata kepada komuniti UTHM.
            </p>
          </div>

          {/* PTj Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-3 mb-8 scrollbar-hide">
            {PTJ_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={
                  activeTab === tab.key
                    ? { background: "#0A2FA6", color: "white", boxShadow: "0 4px 12px rgba(10,47,166,0.3)" }
                    : { background: "rgba(77,159,255,0.08)", color: "#0A2FA6", border: "1px solid rgba(77,159,255,0.2)" }
                }
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const progress = product.sasaran
                ? Math.min(100, (product.jumlahTerkumpul / product.sasaran) * 100)
                : null;

              return (
                <div
                  key={product.id}
                  className="rounded-2xl p-5 hover:-translate-y-0.5 group transition-all cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(20px) saturate(160%)",
                    border: "1px solid rgba(255,255,255,0.7)",
                    borderRadius: "16px",
                    boxShadow: "0 4px 24px rgba(100,116,139,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.border = "1px solid rgba(10,47,166,0.3)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.border = "1px solid rgba(255,255,255,0.7)")}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ backgroundColor: "rgba(77,159,255,0.08)", border: "1px solid rgba(77,159,255,0.15)" }}
                    >
                      {product.ikon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
                          style={{ backgroundColor: "rgba(10,47,166,0.08)", color: "#0A2FA6", border: "1px solid rgba(10,47,166,0.15)" }}
                        >
                          {product.ptjLabel}
                        </span>
                      </div>
                      <h3 className="font-semibold text-[#0F172A] leading-snug text-sm">
                        {product.nama}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#64748B] leading-relaxed mb-4 line-clamp-2">
                    {product.penerangan}
                  </p>

                  {progress !== null && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-[#64748B] mb-1">
                        <span>{formatRM(product.jumlahTerkumpul)} terkumpul</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#E2E8F0" }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${progress}%`, background: "#4D9FFF" }}
                        />
                      </div>
                      {product.sasaran && (
                        <p className="text-[10px] text-[#64748B] mt-1">
                          Sasaran: {formatRM(product.sasaran)}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2">
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

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/perkhidmatan")}
              className="inline-flex items-center gap-2 px-6 h-11 text-sm rounded-[10px] transition-all"
              style={{
                background: "rgba(77,159,255,0.10)",
                border: "1px solid rgba(77,159,255,0.35)",
                color: "#0A2FA6",
                fontWeight: 700,
              }}
            >
              Lihat Semua Produk Kebajikan
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16" style={{ background: "#F8F9FB" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Cara Menderma</h2>
            <p className="text-[#64748B]">Proses yang mudah dan selamat dalam 4 langkah mudah</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Pilih Tabung", desc: "Pilih tabung kebajikan yang sesuai dengan hasrat sumbangan anda.", icon: "🎯" },
              { step: "02", title: "Isi Borang", desc: "Masukkan maklumat peribadi dan jumlah sumbangan yang dikehendaki.", icon: "📝" },
              { step: "03", title: "Buat Pembayaran", desc: "Bayar melalui FPX, pindahan bank, atau potongan gaji (staf sahaja).", icon: "💳" },
              { step: "04", title: "Terima Resit", desc: "Resit dan surat pengecualian cukai dijana secara automatik.", icon: "📄" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
                  style={{ background: "#0A2FA6", boxShadow: "0 4px 20px rgba(10,47,166,0.3)" }}
                >
                  {item.icon}
                </div>
                <div className="inline-block bg-[#F9A825] text-[#0F172A] text-xs font-bold px-2.5 py-0.5 rounded-full mb-2">
                  Langkah {item.step}
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2">{item.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Apa Kata Penyumbang Kami</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px) saturate(160%)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: "16px", boxShadow: "0 4px 24px rgba(100,116,139,0.12), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
                <Quote className="w-6 h-6 text-[#4D9FFF] mb-3 opacity-70" />
                <p className="text-sm text-[#0F172A] leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "#0A2FA6" }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">{t.nama}</p>
                    <p className="text-xs text-[#64748B]">{t.peranan}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ background: "#0A2FA6" }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Mulakan Perjalanan Memberi Anda Hari Ini</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Setiap sumbangan, besar atau kecil, memberi impak nyata kepada pelajar dan komuniti UTHM.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/perkhidmatan")}
              className="px-8 h-12 bg-[#F9A825] text-[#0F172A] font-bold rounded-[10px] hover:bg-[#F57F17] transition-colors"
            >
              Derma Sekarang
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 h-12 bg-transparent border-2 border-white text-white font-semibold rounded-[10px] hover:bg-white/10 transition-colors"
            >
              Log Masuk Pentadbir
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}