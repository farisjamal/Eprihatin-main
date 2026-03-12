import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Info, CheckCircle } from "lucide-react";
import { Breadcrumb } from "../../components/shared/Breadcrumb";

export default function PotonganGaji() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { produk?: string; jumlah?: string; nama?: string } || {};

  const [form, setForm] = useState({
    noPekerja: "",
    jabatan: "",
    amaunSebulan: state.jumlah || "",
    tarikhMula: "",
    tempoh: "",
    tabung: state.produk || "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.noPekerja.trim()) e.noPekerja = "No. Pekerja diperlukan.";
    if (!form.jabatan.trim()) e.jabatan = "Jabatan diperlukan.";
    if (!form.amaunSebulan || Number(form.amaunSebulan) <= 0) e.amaunSebulan = "Amaun sah diperlukan.";
    if (!form.tarikhMula) e.tarikhMula = "Tarikh mula diperlukan.";
    if (!form.tempoh) e.tempoh = "Tempoh diperlukan.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full h-10 px-3 border rounded-lg text-sm focus:outline-none focus:ring-1 ${
      errors[field]
        ? "border-[#DC2626] focus:ring-[#DC2626]/20"
        : "border-[#E2E8F0] focus:border-[#0A2FA6] focus:ring-[#0A2FA6]/10"
    }`;

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-6 py-16 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(22,163,74,0.10)", border: "1px solid rgba(22,163,74,0.2)" }}>
          <CheckCircle className="w-10 h-10 text-[#16A34A]" />
        </div>
        <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Permohonan Dihantar!</h1>
        <p className="text-[#64748B] mb-6">
          Permohonan potongan gaji anda telah berjaya dihantar. Sila tunggu kelulusan daripada Pejabat Bendahari.
        </p>
        <div className="rounded-xl p-4 text-left mb-6" style={{ background: "rgba(217,119,6,0.06)", border: "1px solid rgba(217,119,6,0.2)" }}>
          <p className="text-xs font-semibold text-[#D97706] mb-2">Maklumat Penting</p>
          <p className="text-xs text-[#D97706]">
            Permohonan anda akan disemak oleh Pejabat Bendahari dalam masa 3 hari bekerja.
            Anda akan dimaklumkan melalui e-mel setelah keputusan dibuat.
          </p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="px-6 h-11 text-white font-semibold rounded-[10px] transition-all"
          style={{ background: "#0A2FA6", boxShadow: "0 2px 12px rgba(10,47,166,0.25)" }}
        >
          Kembali ke Laman Utama
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Breadcrumb
        items={[
          { label: "Utama", onClick: () => navigate("/") },
          { label: "Borang Potongan Gaji" },
        ]}
      />
      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Borang Potongan Gaji</h1>
      <p className="text-[#64748B] mb-6 text-sm">
        Untuk staf UTHM sahaja. Permohonan akan disemak dan diluluskan oleh Pejabat Bendahari.
      </p>

      <div className="rounded-xl p-4 flex items-start gap-3 mb-6" style={{ background: "rgba(217,119,6,0.06)", border: "1px solid rgba(217,119,6,0.2)" }}>
        <Info className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
        <p className="text-xs text-[#D97706]">
          Permohonan anda akan disemak oleh Pejabat Bendahari dalam masa <strong>3 hari bekerja</strong>.
          Potongan gaji akan bermula pada tarikh yang dipilih setelah permohonan diluluskan.
        </p>
      </div>

      <div className="p-6 glass-panel">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>
                No. Pekerja <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={form.noPekerja}
                onChange={(e) => { setForm({ ...form, noPekerja: e.target.value }); setErrors({ ...errors, noPekerja: "" }); }}
                className={inputClass("noPekerja")}
                placeholder="UTHM-XXXX"
              />
              {errors.noPekerja && <p className="text-xs text-[#DC2626] mt-1">{errors.noPekerja}</p>}
            </div>

            <div>
              <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>
                Jabatan <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={form.jabatan}
                onChange={(e) => { setForm({ ...form, jabatan: e.target.value }); setErrors({ ...errors, jabatan: "" }); }}
                className={inputClass("jabatan")}
                placeholder="Cth: Jabatan Sains Komputer"
              />
              {errors.jabatan && <p className="text-xs text-[#DC2626] mt-1">{errors.jabatan}</p>}
            </div>
          </div>

          <div>
            <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>
              Tabung Pilihan <span className="text-[#DC2626]">*</span>
            </label>
            <input
              type="text"
              value={form.tabung}
              readOnly
              className="w-full h-10 px-3 border border-[#E2E8F0] rounded-lg text-sm"
              style={{ background: "#F8F9FB", color: "#64748B" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>
                Amaun Potongan Sebulan (RM) <span className="text-[#DC2626]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">RM</span>
                <input
                  type="number"
                  min="1"
                  value={form.amaunSebulan}
                  onChange={(e) => { setForm({ ...form, amaunSebulan: e.target.value }); setErrors({ ...errors, amaunSebulan: "" }); }}
                  className={`${inputClass("amaunSebulan")} pl-10`}
                  placeholder="0.00"
                />
              </div>
              {errors.amaunSebulan && <p className="text-xs text-[#DC2626] mt-1">{errors.amaunSebulan}</p>}
            </div>

            <div>
              <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>
                Tarikh Mula Potongan <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="date"
                value={form.tarikhMula}
                onChange={(e) => { setForm({ ...form, tarikhMula: e.target.value }); setErrors({ ...errors, tarikhMula: "" }); }}
                className={inputClass("tarikhMula")}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.tarikhMula && <p className="text-xs text-[#DC2626] mt-1">{errors.tarikhMula}</p>}
            </div>
          </div>

          <div>
            <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>
              Tempoh Potongan <span className="text-[#DC2626]">*</span>
            </label>
            <select
              value={form.tempoh}
              onChange={(e) => { setForm({ ...form, tempoh: e.target.value }); setErrors({ ...errors, tempoh: "" }); }}
              className={inputClass("tempoh")}
            >
              <option value="">-- Pilih Tempoh --</option>
              <option value="3 Bulan">3 Bulan</option>
              <option value="6 Bulan">6 Bulan</option>
              <option value="12 Bulan">12 Bulan</option>
              <option value="Berterusan">Berterusan (sehingga dibatalkan)</option>
            </select>
            {errors.tempoh && <p className="text-xs text-[#DC2626] mt-1">{errors.tempoh}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 h-11 text-sm font-medium rounded-[10px] transition-all"
              style={{ border: "1px solid #E2E8F0", color: "#64748B", background: "transparent" }}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 h-11 font-bold text-sm rounded-[10px] transition-all"
              style={{ background: "rgba(10,47,166,0.2)", border: "1px solid rgba(10,47,166,0.45)", color: "#0A2FA6", fontWeight: 700, boxShadow: "0 2px 12px rgba(10,47,166,0.12)" }}
            >
              Hantar Permohonan Potongan Gaji
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}