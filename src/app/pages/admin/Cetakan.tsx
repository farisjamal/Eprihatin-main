import React, { useState } from "react";
import { Printer, Download, FileText } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Breadcrumb } from "../../components/shared/Breadcrumb";
import { PTJ_CONFIGS } from "../../data/mockData";



const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "40px",
  padding: "0 12px",
  border: "1px solid #E2E8F0",
  borderRadius: "8px",
  background: "#FFFFFF",
  color: "#0F172A",
  fontSize: "14px",
  outline: "none",
};

export default function Cetakan() {
  const { currentAdmin } = useAuth();
  if (!currentAdmin) return null;

  const isBendahari = currentAdmin.peranan === "bendahari";
  const ptjConfig = PTJ_CONFIGS[currentAdmin.ptj];

  const [reportType, setReportType] = useState(isBendahari ? "Senarai Potongan Gaji" : "Senarai Sumbangan");
  const [dateFrom, setDateFrom] = useState("2025-01-01");
  const [dateTo, setDateTo] = useState("2025-03-05");
  const [previewing, setPreviewing] = useState(false);

  const reportTypes = isBendahari
    ? ["Senarai Potongan Gaji", "Laporan Kelulusan Potongan Gaji"]
    : ["Senarai Sumbangan", "Laporan Statistik", "Senarai Penyumbang"];

  const handlePreview = () => setPreviewing(true);
  const handlePrint = () => window.print();

  return (
    <div className="space-y-5">
      <Breadcrumb items={[{ label: "Dashboard" }, { label: "Cetakan" }]} />
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Cetakan Laporan</h1>
        <p className="text-[#64748B] text-sm mt-0.5">Jana dan cetak laporan mengikut keperluan</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Print Settings */}
        <div className="p-5 space-y-4 glass-panel">
          <h2 className="font-semibold text-[#0F172A] pb-2 border-b-2 border-[#0A2FA6] inline-block" style={{ fontWeight: 700 }}>
            Tetapan Laporan
          </h2>

          <div>
            <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Jenis Laporan</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              style={inputStyle}
              onFocus={(e) => {
                (e.target as HTMLSelectElement).style.border = "1px solid #0A2FA6";
                (e.target as HTMLSelectElement).style.boxShadow = "0 0 0 3px rgba(10,47,166,0.1)";
              }}
              onBlur={(e) => {
                (e.target as HTMLSelectElement).style.border = "1px solid #E2E8F0";
                (e.target as HTMLSelectElement).style.boxShadow = "none";
              }}
            >
              {reportTypes.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Tarikh Dari</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
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

          <div>
            <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Tarikh Hingga</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
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

          <div className="space-y-2 pt-2">
            <button
              onClick={handlePreview}
              className="w-full h-10 text-sm rounded-[10px] flex items-center justify-center gap-2 transition-all"
              style={{
                background: "rgba(10,47,166,0.2)",
                border: "1px solid rgba(10,47,166,0.45)",
                color: "#0A2FA6",
                fontWeight: 700,
                boxShadow: "0 2px 12px rgba(10,47,166,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              <FileText className="w-4 h-4" />
              Pratonton Laporan
            </button>
            <button
              onClick={handlePrint}
              className="w-full h-10 text-sm rounded-[10px] flex items-center justify-center gap-2 transition-all"
              style={{
                background: "rgba(249,168,37,0.15)",
                border: "1px solid rgba(249,168,37,0.5)",
                color: "#92400E",
                fontWeight: 700,
              }}
            >
              <Printer className="w-4 h-4" />
              {isBendahari ? "Cetak Senarai Potongan Gaji" : "Cetak"}
            </button>
            <button
              className="w-full h-10 text-sm rounded-[10px] flex items-center justify-center gap-2 transition-all"
              style={{
                background: "rgba(77,159,255,0.10)",
                border: "1px solid rgba(77,159,255,0.35)",
                color: "#0A2FA6",
                fontWeight: 600,
              }}
            >
              <Download className="w-4 h-4" />
              Muat Turun PDF
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          <div className="glass-panel" style={{ overflow: "hidden", height: "100%" }}>
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{ borderBottom: "1px solid rgba(226,232,240,0.6)", background: "rgba(248,249,251,0.8)" }}
            >
              <FileText className="w-5 h-5 text-[#64748B]" />
              <span className="text-sm font-medium text-[#0F172A]">Pratonton Laporan</span>
            </div>

            {previewing ? (
              <div className="p-8">
                {/* Letterhead */}
                <div className="text-center mb-8 pb-6" style={{ borderBottom: "2px solid #0A2FA6" }}>
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: "rgba(10,47,166,0.1)", border: "1px solid rgba(10,47,166,0.2)" }}
                  >
                    <span className="text-2xl">❤️</span>
                  </div>
                  <h1 className="font-bold text-[#0F172A] text-lg">UNIVERSITI TUN HUSSEIN ONN MALAYSIA</h1>
                  <p className="text-[#64748B] text-sm">Sistem e-Prihatin — {ptjConfig.label}</p>
                  <div
                    className="mt-3 rounded-lg px-4 py-2 inline-block"
                    style={{ background: "rgba(77,159,255,0.08)", border: "1px solid rgba(77,159,255,0.2)" }}
                  >
                    <p className="font-semibold text-[#0A2FA6] text-sm">{reportType.toUpperCase()}</p>
                    <p className="text-xs text-[#64748B]">Tempoh: {dateFrom} hingga {dateTo}</p>
                  </div>
                </div>

                {/* Mock report content */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Jumlah Rekod", value: "12" },
                      { label: "Jumlah Sumbangan", value: "RM 45,670" },
                      { label: "Tarikh Jana", value: new Date().toLocaleDateString("ms-MY") },
                    ].map((item) => (
                      <div key={item.label} className="text-center rounded-lg p-3" style={{ border: "1px solid #E2E8F0" }}>
                        <p className="text-lg font-bold text-[#0F172A]">{item.value}</p>
                        <p className="text-xs text-[#64748B]">{item.label}</p>
                      </div>
                    ))}
                  </div>

                  <table className="w-full text-xs rounded-lg overflow-hidden" style={{ border: "1px solid #E2E8F0" }}>
                    <thead>
                      <tr style={{ background: "rgba(77,159,255,0.06)" }}>
                        {["Bil", "Tarikh", "Nama", "Produk", "Jumlah"].map((h) => (
                          <th key={h} className="px-3 py-2 text-left font-bold text-[#0F172A]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <tr key={n} style={{ borderTop: "1px solid #E2E8F0" }}>
                          <td className="px-3 py-2 text-[#64748B]">{n}</td>
                          <td className="px-3 py-2">2025-03-0{n}</td>
                          <td className="px-3 py-2">Penyumbang {n}</td>
                          <td className="px-3 py-2">Dana Kebajikan</td>
                          <td className="px-3 py-2 font-semibold text-[#0A2FA6]">RM {(n * 150).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="text-right pt-3" style={{ borderTop: "1px solid #E2E8F0" }}>
                    <p className="text-xs text-[#64748B]">Dijana pada: {new Date().toLocaleString("ms-MY")}</p>
                    <p className="text-xs text-[#64748B]">Sistem e-Prihatin UTHM</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center p-8">
                <FileText className="w-12 h-12 mb-3" style={{ color: "#E2E8F0" }} />
                <p className="text-sm text-[#64748B]">Klik "Pratonton Laporan" untuk melihat laporan di sini.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
