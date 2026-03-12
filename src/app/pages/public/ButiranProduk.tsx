import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Users, TrendingUp, CreditCard, Info } from "lucide-react";
import { WELFARE_PRODUCTS } from "../../data/mockData";
import { Breadcrumb } from "../../components/shared/Breadcrumb";

export default function ButiranProduk() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = WELFARE_PRODUCTS.find((p) => p.id === id);

  const [form, setForm] = useState({
    jumlah: "",
    nama: "",
    nokp: "",
    emel: "",
    telefon: "",
    jenisPenyumbang: "",
    kaedahBayaran: "wakaf",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Produk Tidak Dijumpai</h1>
        <button onClick={() => navigate("/perkhidmatan")} className="text-[#0A2FA6] hover:underline">
          ← Kembali ke Senarai Produk
        </button>
      </div>
    );
  }

  const formatRM = (n: number) =>
    new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR", maximumFractionDigits: 0 }).format(n);

  const progress = product.sasaran
    ? Math.min(100, (product.jumlahTerkumpul / product.sasaran) * 100)
    : null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.jumlah || Number(form.jumlah) <= 0) e.jumlah = "Sila masukkan jumlah yang sah.";
    if (!form.nama.trim()) e.nama = "Nama penyumbang diperlukan.";
    if (!form.nokp.trim()) e.nokp = "No. Kad Pengenalan diperlukan.";
    if (!form.emel.trim() || !form.emel.includes("@")) e.emel = "Alamat e-mel tidak sah.";
    if (!form.telefon.trim()) e.telefon = "No. telefon diperlukan.";
    if (!form.jenisPenyumbang) e.jenisPenyumbang = "Sila pilih jenis penyumbang.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (form.kaedahBayaran === "potongan") {
      navigate("/potongan-gaji", {
        state: { produk: product.nama, jumlah: form.jumlah, nama: form.nama },
      });
    } else {
      navigate("/pembayaran", {
        state: {
          produk: product.nama,
          jumlah: form.jumlah,
          nama: form.nama,
          nokp: form.nokp,
          emel: form.emel,
        },
      });
    }
  };

  const inputClass = (field: string) =>
    `w-full h-10 px-3 border rounded-lg text-sm focus:outline-none focus:ring-1 ${
      errors[field]
        ? "border-[#DC2626] focus:ring-[#DC2626]/20"
        : "border-[#E2E8F0] focus:border-[#0A2FA6] focus:ring-[#0A2FA6]/10"
    }`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Breadcrumb
        items={[
          { label: "Utama", onClick: () => navigate("/") },
          { label: "Perkhidmatan", onClick: () => navigate("/perkhidmatan") },
          { label: product.nama },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left — Product Info */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ backgroundColor: `${product.warna}15` }}
            >
              {product.ikon}
            </div>
            <div>
              <span
                className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium mb-2"
                style={{ backgroundColor: `${product.warna}15`, color: product.warna }}
              >
                {product.ptjLabel}
              </span>
              <h1 className="text-2xl font-bold text-[#0F172A]">{product.nama}</h1>
            </div>
          </div>

          <div className="p-5 glass-panel">
            <h2 className="font-semibold text-[#0F172A] mb-3 pb-2 border-b-2 border-[#0A2FA6] inline-block" style={{ fontWeight: 700 }}>
              Tentang Tabung Ini
            </h2>
            <p className="text-sm text-[#0F172A] leading-relaxed">{product.penerangan}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl p-4" style={{ background: "rgba(77,159,255,0.08)", border: "1px solid rgba(77,159,255,0.15)" }}>
              <div className="flex items-center gap-2 text-[#0A2FA6] mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium">Jumlah Terkumpul</span>
              </div>
              <p className="text-xl font-bold text-[#0A2FA6]">{formatRM(product.jumlahTerkumpul)}</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: "rgba(249,168,37,0.08)", border: "1px solid rgba(249,168,37,0.2)" }}>
              <div className="flex items-center gap-2 mb-1" style={{ color: "#D97706" }}>
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium">Bilangan Penyumbang</span>
              </div>
              <p className="text-xl font-bold" style={{ color: "#D97706" }}>{product.bilanganPenyumbang.toLocaleString()}</p>
            </div>
          </div>

          {progress !== null && (
            <div className="p-5 glass-panel">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#64748B]">Kemajuan Sasaran</span>
                <span className="font-semibold text-[#0A2FA6]">{Math.round(progress)}%</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "#E2E8F0" }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${progress}%`, background: "#4D9FFF" }}
                />
              </div>
              <div className="flex justify-between text-xs text-[#64748B] mt-1">
                <span>{formatRM(product.jumlahTerkumpul)} dikumpul</span>
                {product.sasaran && <span>Sasaran: {formatRM(product.sasaran)}</span>}
              </div>
            </div>
          )}
        </div>

        {/* Right — Donation Form */}
        <div className="lg:col-span-2">
          <div className="p-6 sticky top-24 glass-panel">
            <h2 className="font-bold text-[#0F172A] text-lg mb-5 pb-2 border-b-2 border-[#0A2FA6] inline-block" style={{ fontWeight: 700 }}>
              Borang Sumbangan
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Amount */}
              <div>
                <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>
                  Jumlah Sumbangan (RM) <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B] font-medium">RM</span>
                  <input
                    type="number"
                    min="1"
                    value={form.jumlah}
                    onChange={(e) => { setForm({ ...form, jumlah: e.target.value }); setErrors({ ...errors, jumlah: "" }); }}
                    className={`${inputClass("jumlah")} pl-10`}
                    placeholder="0.00"
                  />
                </div>
                {errors.jumlah && <p className="text-xs text-[#DC2626] mt-1">{errors.jumlah}</p>}
                <div className="flex gap-2 mt-2">
                  {["25", "50", "100", "500"].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setForm({ ...form, jumlah: amt })}
                      className="flex-1 h-7 text-xs rounded-lg font-medium transition-all"
                      style={{ background: "rgba(77,159,255,0.10)", border: "1px solid rgba(77,159,255,0.35)", color: "#0A2FA6" }}
                    >
                      RM{amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>
                  Nama Penyumbang <span className="text-[#DC2626]">*</span>
                </label>
                <input type="text" value={form.nama} onChange={(e) => { setForm({ ...form, nama: e.target.value }); setErrors({ ...errors, nama: "" }); }} className={inputClass("nama")} placeholder="Nama penuh mengikut Kad Pengenalan" />
                {errors.nama && <p className="text-xs text-[#DC2626] mt-1">{errors.nama}</p>}
              </div>

              {/* IC */}
              <div>
                <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>
                  No. Kad Pengenalan / Passport <span className="text-[#DC2626]">*</span>
                </label>
                <input type="text" value={form.nokp} onChange={(e) => { setForm({ ...form, nokp: e.target.value }); setErrors({ ...errors, nokp: "" }); }} className={inputClass("nokp")} placeholder="880512-01-5678" />
                {errors.nokp && <p className="text-xs text-[#DC2626] mt-1">{errors.nokp}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>
                  E-mel <span className="text-[#DC2626]">*</span>
                </label>
                <input type="email" value={form.emel} onChange={(e) => { setForm({ ...form, emel: e.target.value }); setErrors({ ...errors, emel: "" }); }} className={inputClass("emel")} placeholder="contoh@email.com" />
                {errors.emel && <p className="text-xs text-[#DC2626] mt-1">{errors.emel}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>
                  No. Telefon <span className="text-[#DC2626]">*</span>
                </label>
                <input type="tel" value={form.telefon} onChange={(e) => { setForm({ ...form, telefon: e.target.value }); setErrors({ ...errors, telefon: "" }); }} className={inputClass("telefon")} placeholder="0123456789" />
                {errors.telefon && <p className="text-xs text-[#DC2626] mt-1">{errors.telefon}</p>}
              </div>

              {/* Donor Type */}
              <div>
                <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>
                  Jenis Penyumbang <span className="text-[#DC2626]">*</span>
                </label>
                <select value={form.jenisPenyumbang} onChange={(e) => { setForm({ ...form, jenisPenyumbang: e.target.value }); setErrors({ ...errors, jenisPenyumbang: "" }); }} className={inputClass("jenisPenyumbang")}>
                  <option value="">-- Pilih Jenis Penyumbang --</option>
                  <option value="Staf UTHM">Staf UTHM</option>
                  <option value="Alumni">Alumni UTHM</option>
                  <option value="Industri">Industri / Korporat</option>
                  <option value="Orang Awam">Orang Awam</option>
                </select>
                {errors.jenisPenyumbang && <p className="text-xs text-[#DC2626] mt-1">{errors.jenisPenyumbang}</p>}
              </div>

              {/* Payment Method */}
              <div>
                <label className="block mb-2" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>
                  Kaedah Pembayaran <span className="text-[#DC2626]">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all" style={form.kaedahBayaran === "wakaf" ? { border: "1px solid rgba(10,47,166,0.4)", background: "rgba(77,159,255,0.06)" } : { border: "1px solid #E2E8F0" }}>
                    <input type="radio" name="kaedah" value="wakaf" checked={form.kaedahBayaran === "wakaf"} onChange={(e) => setForm({ ...form, kaedahBayaran: e.target.value })} className="mt-0.5" style={{ accentColor: "#0A2FA6" }} />
                    <div>
                      <p className="text-xs font-medium text-[#0F172A]">Tabung Wakaf & Endowmen UTHM</p>
                      <p className="text-[10px] text-[#64748B]">FPX / Pindahan Bank</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-all" style={form.kaedahBayaran === "potongan" ? { border: "1px solid rgba(10,47,166,0.4)", background: "rgba(77,159,255,0.06)" } : { border: "1px solid #E2E8F0" }}>
                    <input type="radio" name="kaedah" value="potongan" checked={form.kaedahBayaran === "potongan"} onChange={(e) => setForm({ ...form, kaedahBayaran: e.target.value })} className="mt-0.5" style={{ accentColor: "#0A2FA6" }} />
                    <div>
                      <p className="text-xs font-medium text-[#0F172A]">Potongan Gaji</p>
                      <p className="text-[10px] text-[#64748B]">Staf UTHM sahaja</p>
                    </div>
                  </label>
                </div>
                {form.kaedahBayaran === "potongan" && (
                  <div className="mt-2 flex items-start gap-2 rounded-lg p-3" style={{ background: "rgba(217,119,6,0.06)", border: "1px solid rgba(217,119,6,0.2)" }}>
                    <Info className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-[#D97706]">
                      Borang potongan gaji akan dipaparkan setelah anda klik "Derma Sekarang". Permohonan akan disemak oleh Pejabat Bendahari.
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-11 font-bold text-sm rounded-[10px] transition-all mt-2"
                style={{
                  background: "rgba(10,47,166,0.2)",
                  border: "1px solid rgba(10,47,166,0.45)",
                  color: "#0A2FA6",
                  fontWeight: 700,
                  boxShadow: "0 2px 12px rgba(10,47,166,0.15)",
                }}
              >
                DERMA SEKARANG
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}