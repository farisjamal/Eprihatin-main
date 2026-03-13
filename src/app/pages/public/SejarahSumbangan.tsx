import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  Download,
  FileText,
  Search,
  ClipboardList,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { DONATIONS } from "../../data/mockData";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { Breadcrumb } from "../../components/shared/Breadcrumb";

// PTj label map
const PTJ_LABEL: Record<string, string> = {
  PHEP: "PHEP",
  PUSAT_ISLAM: "Pusat Islam",
  WAKAF: "Wakaf & Endowmen",
  YAYASAN: "Yayasan UTHM",
  KESIHATAN: "Pusat Kesihatan",
  FAKULTI: "Fak. TDHEPA",
  BENDAHARI: "Bendahari",
  TNC_HEPA: "TNC HEPA",
};

// Determine if a donation qualifies for a tax exemption letter
// (Wakaf & Endowmen payments or Yayasan with Berjaya status)
const hasTaxLetter = (d: (typeof DONATIONS)[0]) =>
  d.status === "Berjaya" &&
  (d.kaedahBayaran === "Wakaf & Endowmen" || d.ptj === "YAYASAN");

export default function SejarahSumbangan() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ ic: "", emel: "" });
  const [errors, setErrors] = useState<{ ic?: string; emel?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<typeof DONATIONS>([]);

  const formatRM = (n: number) =>
    new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR" }).format(n);

  const validate = () => {
    const e: { ic?: string; emel?: string } = {};
    const IC_REGEX = /^\d{6}-\d{2}-\d{4}$|^\d{12}$/;
    if (!form.ic.trim()) {
      e.ic = "No. Kad Pengenalan diperlukan.";
    } else if (!IC_REGEX.test(form.ic.trim())) {
      e.ic = "Format tidak sah. Contoh: 880512-01-5678";
    }
    if (!form.emel.trim()) e.emel = "Alamat e-mel diperlukan.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emel))
      e.emel = "Format e-mel tidak sah.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // Filter mock data by IC and email (case-insensitive)
    const found = DONATIONS.filter(
      (d) =>
        d.noKadPengenalan.replace(/-/g, "") ===
        form.ic.replace(/-/g, "").trim() &&
        d.emel.toLowerCase() === form.emel.trim().toLowerCase()
    );
    setResults(found);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setResults([]);
    setForm({ ic: "", emel: "" });
    setErrors({});
  };

  const inputClass = (field: keyof typeof errors) =>
    `w-full h-11 px-4 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${errors[field]
      ? "border-[#DC2626] focus:ring-[#DC2626]/20"
      : "border-[#E2E8F0] focus:border-[#0A2FA6] focus:ring-[#0A2FA6]/20"
    }`;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <Breadcrumb
        items={[
          { label: "Utama", onClick: () => navigate("/") },
          { label: "Semak Sejarah Sumbangan" },
        ]}
      />

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0F172A] mb-1">
          Semak Sejarah Sumbangan Anda
        </h1>
        <p className="text-sm text-[#6B7280]">
          Masukkan maklumat anda untuk melihat sejarah sumbangan.
        </p>
      </div>

      {/* Verification Form Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(77,159,255,0.10)", border: "1px solid rgba(77,159,255,0.2)" }}>
            <Search className="w-4 h-4 text-[#0A2FA6]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0F172A]">Pengesahan Identiti</p>
            <p className="text-xs text-[#64748B]">Tiada akaun diperlukan — masukkan IC dan e-mel sahaja</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* IC / Passport */}
            <div>
              <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                No. Kad Pengenalan / Passport{" "}
                <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                value={form.ic}
                onChange={(e) => {
                  setForm({ ...form, ic: e.target.value });
                  setErrors({ ...errors, ic: undefined });
                }}
                placeholder="Cth: 880512-01-5678"
                className={inputClass("ic")}
                disabled={submitted}
              />
              {errors.ic && (
                <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.ic}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                E-mel <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="email"
                value={form.emel}
                onChange={(e) => {
                  setForm({ ...form, emel: e.target.value });
                  setErrors({ ...errors, emel: undefined });
                }}
                placeholder="Cth: nama@emel.com"
                className={inputClass("emel")}
                disabled={submitted}
              />
              {errors.emel && (
                <p className="text-xs text-[#DC2626] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.emel}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            {!submitted ? (
              <button
                type="submit"
                className="h-11 px-8 text-sm flex items-center gap-2 btn-primary"
              >
                <Search className="w-4 h-4" />
                Semak Sekarang
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="h-11 px-8 text-sm btn-secondary"
              >
                Semak Semula
              </button>
            )}
          </div>
        </form>

        {/* Staff secondary link */}
        <div className="mt-5 pt-5" style={{ borderTop: "1px solid #E2E8F0" }}>
          <p className="text-sm text-[#64748B]">
            Staf UTHM?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#0A2FA6] font-medium hover:underline inline-flex items-center gap-1"
            >
              Semak status potongan gaji anda di sini
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </p>
        </div>
      </div>

      {/* Results */}
      {submitted && (
        <div>
          {/* Result summary bar */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
            style={
              results.length > 0
                ? { background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.2)" }
                : { background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)" }
            }
          >
            {results.length > 0 ? (
              <>
                <CheckCircle className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                <p className="text-sm text-[#16A34A] font-medium">
                  {results.length} rekod sumbangan dijumpai untuk maklumat yang dimasukkan.
                </p>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-[#D97706] flex-shrink-0" />
                <p className="text-sm text-[#D97706] font-medium">
                  Tiada rekod sumbangan dijumpai untuk maklumat ini.
                </p>
              </>
            )}
          </div>

          {results.length > 0 && (
            <div className="overflow-hidden glass-panel">
              <div className="px-5 py-3.5 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(226,232,240,0.6)" }}>
                <ClipboardList className="w-4 h-4 text-[#0A2FA6]" />
                <h2 className="text-sm font-semibold text-[#0F172A]">
                  Senarai Sumbangan
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "rgba(77,159,255,0.06)" }}>
                      {[
                        "Tarikh",
                        "Produk Kebajikan",
                        "PTj",
                        "Jumlah (RM)",
                        "Kaedah",
                        "Status",
                        "Tindakan",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs whitespace-nowrap uppercase tracking-wide"
                          style={{ color: "#64748B", fontWeight: 600 }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((d, i) => (
                      <tr
                        key={d.id}
                        className="transition-colors"
                        style={{
                          borderTop: "1px solid #E2E8F0",
                          background: i % 2 === 1 ? "#FAFAFA" : "white",
                        }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#F0F7FF")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i % 2 === 1 ? "#FAFAFA" : "white")}
                      >
                        <td className="px-4 py-3 text-xs text-[#64748B] whitespace-nowrap">{d.tarikhMasa}</td>
                        <td className="px-4 py-3 text-xs text-[#0F172A] max-w-[180px]">
                          <p className="truncate font-medium">{d.produk}</p>
                          <p className="text-[#64748B] font-mono text-[11px] mt-0.5">{d.noRujukan}</p>
                        </td>
                        <td className="px-4 py-3 text-xs text-[#64748B] whitespace-nowrap">{PTJ_LABEL[d.ptj] ?? d.ptj}</td>
                        <td className="px-4 py-3 text-xs font-semibold text-[#0F172A] whitespace-nowrap">{formatRM(d.jumlah)}</td>
                        <td className="px-4 py-3 text-xs text-[#64748B] whitespace-nowrap">{d.kaedahBayaran}</td>
                        <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            {d.status === "Berjaya" && (
                              <button className="inline-flex items-center gap-1 h-7 px-2.5 text-xs rounded-lg transition-all" style={{ background: "rgba(77,159,255,0.10)", border: "1px solid rgba(77,159,255,0.35)", color: "#0A2FA6", fontWeight: 600 }}>
                                <Download className="w-3 h-3" />
                                <span>Resit</span>
                              </button>
                            )}
                            {hasTaxLetter(d) && (
                              <button className="inline-flex items-center gap-1 h-7 px-2.5 text-xs rounded-lg transition-all" style={{ background: "rgba(249,168,37,0.10)", border: "1px solid rgba(249,168,37,0.35)", color: "#92400E", fontWeight: 600 }}>
                                <FileText className="w-3 h-3" />
                                <span>Surat Cukai</span>
                              </button>
                            )}
                            {d.status !== "Berjaya" && !hasTaxLetter(d) && (
                              <span className="text-xs text-[#D1D5DB]">—</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-5 py-3" style={{ borderTop: "1px solid #E2E8F0", background: "#F8F9FB" }}>
                <p className="text-xs text-[#64748B]">
                  Jumlah sumbangan:{" "}
                  <span className="font-semibold text-[#0F172A]">
                    {formatRM(results.reduce((sum, d) => sum + (d.status === "Berjaya" ? d.jumlah : 0), 0))}
                  </span>{" "}
                  (daripada {results.filter((d) => d.status === "Berjaya").length} transaksi berjaya)
                </p>
              </div>
            </div>
          )}

          {results.length === 0 && (
            <div className="rounded-xl p-8 text-center glass-panel">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "#F8F9FB" }}>
                <ClipboardList className="w-6 h-6 text-[#CBD5E1]" />
              </div>
              <p className="text-sm font-medium text-[#94A3B8]">Tiada rekod sumbangan dijumpai untuk maklumat ini.</p>
              <p className="text-xs text-[#CBD5E1] mt-1">Sila pastikan No. Kad Pengenalan dan e-mel yang dimasukkan adalah tepat.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}