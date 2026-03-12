import React, { useState } from "react";
import { CheckSquare, Search, Eye } from "lucide-react";
import { SALARY_DEDUCTIONS, SalaryDeduction } from "../../../data/mockData";
import { StatusBadge } from "../../../components/shared/StatusBadge";
import { Modal } from "../../../components/shared/Modal";
import { Breadcrumb } from "../../../components/shared/Breadcrumb";

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.55)",
  backdropFilter: "blur(20px) saturate(160%)",
  border: "1px solid rgba(255,255,255,0.7)",
  borderRadius: "16px",
  boxShadow: "0 4px 24px rgba(100,116,139,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
};

const inputStyle: React.CSSProperties = {
  height: "40px",
  border: "1px solid #E2E8F0",
  borderRadius: "8px",
  background: "#FFFFFF",
  color: "#0F172A",
  fontSize: "14px",
  outline: "none",
};

export default function PermohonanPotongan() {
  const [deductions, setDeductions] = useState<SalaryDeduction[]>(SALARY_DEDUCTIONS);
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState<SalaryDeduction | null>(null);
  const [perluPindaan, setPerluPindaan] = useState(false);
  const [gagalReason, setGagalReason] = useState("");
  const [showGagalInput, setShowGagalInput] = useState(false);
  const [pindaanData, setPindaanData] = useState({ tarikhMula: "", amaunSebulan: "" });

  const filtered = deductions.filter((d) => {
    const matchStatus = statusFilter === "Semua" || d.status === statusFilter;
    const matchSearch = search === "" || d.namaStaf.toLowerCase().includes(search.toLowerCase()) || d.noPerkerja.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const updateStatus = (id: string, status: SalaryDeduction["status"], sebab?: string) => {
    setDeductions(deductions.map((d) => d.id === id ? { ...d, status, sebabGagal: sebab } : d));
    setSelectedApp(null);
    setShowGagalInput(false);
    setGagalReason("");
    setPerluPindaan(false);
  };

  const pendingCount = deductions.filter((d) => d.status === "Dalam Semakan").length;

  return (
    <div className="space-y-5">
      <Breadcrumb items={[{ label: "Dashboard" }, { label: "Permohonan Potongan Gaji" }]} />

      {pendingCount > 0 && (
        <div
          className="rounded-xl px-5 py-3"
          style={{ background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)" }}
        >
          <p className="text-sm font-semibold text-[#D97706]">⚠️ {pendingCount} Permohonan Menunggu Tindakan</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Senarai Permohonan Potongan Gaji</h1>
          <p className="text-[#64748B] text-sm mt-0.5">{filtered.length} permohonan</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama staf atau no. pekerja..."
            className="w-full pl-9 pr-4 text-sm"
            style={inputStyle}
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
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 text-sm"
          style={{ ...inputStyle, width: "auto" }}
        >
          <option value="Semua">Semua Status</option>
          <option value="Dalam Semakan">Dalam Semakan</option>
          <option value="Lulus">Lulus</option>
          <option value="Gagal">Gagal</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ ...glassCard, overflow: "hidden" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(77,159,255,0.06)" }}>
                {["Bil", "Tarikh", "No. Pekerja", "Nama Staf", "Tabung", "Amaun/Bulan", "Tempoh", "Status", "Tindakan"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs whitespace-nowrap uppercase tracking-wide" style={{ color: "#64748B", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
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
                  <td className="px-4 py-3 text-xs text-[#64748B]">{i + 1}</td>
                  <td className="px-4 py-3 text-xs text-[#64748B] whitespace-nowrap">{d.tarikhPermohonan}</td>
                  <td className="px-4 py-3 text-xs font-mono text-[#0A2FA6]">{d.noPerkerja}</td>
                  <td className="px-4 py-3 text-xs font-medium text-[#0F172A]">{d.namaStaf}</td>
                  <td className="px-4 py-3 text-xs text-[#64748B] max-w-[160px]"><p className="truncate">{d.tabung}</p></td>
                  <td className="px-4 py-3 text-xs font-semibold">RM {d.amaunSebulan}</td>
                  <td className="px-4 py-3 text-xs text-[#64748B] whitespace-nowrap">{d.tempoh}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => { setSelectedApp(d); setPerluPindaan(false); setShowGagalInput(false); setPindaanData({ tarikhMula: d.tarikhMula, amaunSebulan: d.amaunSebulan.toString() }); }}
                      className="inline-flex items-center gap-1 h-7 px-2.5 text-xs rounded-lg transition-all"
                      style={{
                        background: "rgba(77,159,255,0.10)",
                        border: "1px solid rgba(77,159,255,0.35)",
                        color: "#0A2FA6",
                        fontWeight: 600,
                      }}
                    >
                      <Eye className="w-3 h-3" />
                      Semak
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={!!selectedApp}
        onClose={() => { setSelectedApp(null); setShowGagalInput(false); setPerluPindaan(false); }}
        title="Semakan Permohonan Potongan Gaji"
        size="lg"
        footer={
          selectedApp?.status === "Dalam Semakan" ? (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => { setShowGagalInput(false); updateStatus(selectedApp.id, "Lulus"); }}
                className="h-9 px-4 text-sm rounded-[10px] flex items-center gap-2 transition-all"
                style={{
                  background: "rgba(22,163,74,0.12)",
                  border: "1px solid rgba(22,163,74,0.35)",
                  color: "#16A34A",
                  fontWeight: 700,
                }}
              >
                <CheckSquare className="w-4 h-4" /> LULUS
              </button>
              {perluPindaan && (
                <button
                  onClick={() => updateStatus(selectedApp.id, "Lulus")}
                  className="h-9 px-4 text-sm rounded-[10px] transition-all"
                  style={{
                    background: "rgba(249,168,37,0.12)",
                    border: "1px solid rgba(249,168,37,0.4)",
                    color: "#92400E",
                    fontWeight: 700,
                  }}
                >
                  Pindaan & Lulus
                </button>
              )}
              <button
                onClick={() => setShowGagalInput(true)}
                className="h-9 px-4 text-sm rounded-[10px] transition-all"
                style={{
                  background: "rgba(220,38,38,0.12)",
                  border: "1px solid rgba(220,38,38,0.3)",
                  color: "#DC2626",
                  fontWeight: 700,
                }}
              >
                GAGAL
              </button>
              <button
                onClick={() => { setSelectedApp(null); setShowGagalInput(false); }}
                className="h-9 px-4 text-sm rounded-[10px] transition-all"
                style={{
                  background: "rgba(77,159,255,0.10)",
                  border: "1px solid rgba(77,159,255,0.3)",
                  color: "#0A2FA6",
                  fontWeight: 600,
                }}
              >
                Tutup
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSelectedApp(null)}
              className="h-9 px-4 text-sm rounded-[10px] transition-all"
              style={{
                background: "rgba(77,159,255,0.10)",
                border: "1px solid rgba(77,159,255,0.3)",
                color: "#0A2FA6",
                fontWeight: 600,
              }}
            >
              Tutup
            </button>
          )
        }
      >
        {selectedApp && (
          <div className="space-y-5">
            {/* Staff Details */}
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center"
                  style={{ background: "#0A2FA6" }}
                >1</span>
                Maklumat Staf
              </h3>
              <div
                className="grid grid-cols-2 gap-3 rounded-lg p-3"
                style={{ background: "#F8F9FB", border: "1px solid #E2E8F0" }}
              >
                {[
                  { label: "Nama", value: selectedApp.namaStaf },
                  { label: "No. Pekerja", value: selectedApp.noPerkerja },
                  { label: "Jabatan", value: selectedApp.jabatan },
                  { label: "Tarikh Permohonan", value: selectedApp.tarikhPermohonan },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-[#64748B] mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium text-[#0F172A]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deduction Details */}
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center"
                  style={{ background: "#0A2FA6" }}
                >2</span>
                Butiran Permohonan
              </h3>
              <div
                className="grid grid-cols-2 gap-3 rounded-lg p-3"
                style={{ background: "#F8F9FB", border: "1px solid #E2E8F0" }}
              >
                {[
                  { label: "Tabung", value: selectedApp.tabung },
                  { label: "Amaun/Bulan", value: `RM ${selectedApp.amaunSebulan}` },
                  { label: "Tempoh", value: selectedApp.tempoh },
                  { label: "Tarikh Mula", value: selectedApp.tarikhMula },
                  { label: "Tarikh Tamat", value: selectedApp.tarikhTamat },
                  { label: "Status Semasa", value: selectedApp.status },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-[#64748B] mb-0.5">{item.label}</p>
                    <p className="text-sm font-medium text-[#0F172A]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Amendment */}
            {selectedApp.status === "Dalam Semakan" && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-[#0F172A]">Perlu Pindaan?</h3>
                  <button
                    type="button"
                    onClick={() => setPerluPindaan(!perluPindaan)}
                    className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                    style={{ background: perluPindaan ? "#0A2FA6" : "#E2E8F0" }}
                  >
                    <span
                      className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                      style={{ transform: perluPindaan ? "translateX(24px)" : "translateX(4px)" }}
                    />
                  </button>
                </div>
                {perluPindaan && (
                  <div
                    className="rounded-lg p-3 space-y-3"
                    style={{ background: "rgba(217,119,6,0.06)", border: "1px solid rgba(217,119,6,0.2)" }}
                  >
                    <div>
                      <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Tarikh Mula (Pindaan)</label>
                      <input
                        type="date"
                        value={pindaanData.tarikhMula}
                        onChange={(e) => setPindaanData({ ...pindaanData, tarikhMula: e.target.value })}
                        style={{ width: "100%", height: "40px", padding: "0 12px", border: "1px solid #E2E8F0", borderRadius: "8px", background: "#FFFFFF", fontSize: "14px", outline: "none" }}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.border = "1px solid #0A2FA6";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.border = "1px solid #E2E8F0";
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Amaun Potongan Sebulan (Pindaan) (RM)</label>
                      <input
                        type="number"
                        value={pindaanData.amaunSebulan}
                        onChange={(e) => setPindaanData({ ...pindaanData, amaunSebulan: e.target.value })}
                        style={{ width: "100%", height: "40px", padding: "0 12px", border: "1px solid #E2E8F0", borderRadius: "8px", background: "#FFFFFF", fontSize: "14px", outline: "none" }}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.border = "1px solid #0A2FA6";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.border = "1px solid #E2E8F0";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Reject Reason */}
            {showGagalInput && (
              <div
                className="rounded-lg p-3 space-y-3"
                style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)" }}
              >
                <p className="text-xs font-semibold text-[#DC2626]">Sebab Penolakan</p>
                <textarea
                  value={gagalReason}
                  onChange={(e) => setGagalReason(e.target.value)}
                  className="w-full h-20 px-3 py-2 text-sm outline-none rounded-lg"
                  style={{ border: "1px solid #E2E8F0", background: "#FFFFFF", resize: "none" }}
                  placeholder="Masukkan sebab penolakan..."
                />
                <button
                  onClick={() => updateStatus(selectedApp.id, "Gagal", gagalReason)}
                  disabled={!gagalReason.trim()}
                  className="h-9 px-4 text-sm rounded-[10px] transition-all disabled:opacity-50"
                  style={{
                    background: "rgba(220,38,38,0.12)",
                    border: "1px solid rgba(220,38,38,0.3)",
                    color: "#DC2626",
                    fontWeight: 700,
                  }}
                >
                  Sahkan Penolakan
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
