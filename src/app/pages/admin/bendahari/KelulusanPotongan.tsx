import React from "react";
import { PauseCircle, XCircle } from "lucide-react";
import { SALARY_DEDUCTIONS } from "../../../data/mockData";
import { StatusBadge } from "../../../components/shared/StatusBadge";
import { Breadcrumb } from "../../../components/shared/Breadcrumb";



export default function KelulusanPotongan() {
  const approved = SALARY_DEDUCTIONS.filter((d) => d.status === "Lulus");

  return (
    <div className="space-y-5">
      <Breadcrumb items={[{ label: "Dashboard" }, { label: "Kelulusan Potongan Gaji" }]} />
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Senarai Potongan Gaji Diluluskan</h1>
        <p className="text-[#64748B] text-sm mt-0.5">{approved.length} rekod diluluskan</p>
      </div>

      <div className="glass-panel" style={{ overflow: "hidden" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(77,159,255,0.06)" }}>
                {["Nama Staf", "Jabatan", "Tabung", "Amaun/Bulan", "Tarikh Mula", "Tarikh Tamat", "Tempoh", "Status", "Tindakan"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs whitespace-nowrap uppercase tracking-wide" style={{ color: "#64748B", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {approved.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-[#64748B] text-sm">
                    Tiada rekod potongan gaji diluluskan.
                  </td>
                </tr>
              ) : (
                approved.map((d, i) => (
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
                    <td className="px-4 py-3 text-xs font-medium text-[#0F172A]">{d.namaStaf}</td>
                    <td className="px-4 py-3 text-xs text-[#64748B]">{d.jabatan}</td>
                    <td className="px-4 py-3 text-xs text-[#64748B] max-w-[160px]"><p className="truncate">{d.tabung}</p></td>
                    <td className="px-4 py-3 text-xs font-semibold text-[#0A2FA6]">RM {d.amaunSebulan}</td>
                    <td className="px-4 py-3 text-xs text-[#64748B] whitespace-nowrap">{d.tarikhMula}</td>
                    <td className="px-4 py-3 text-xs text-[#64748B] whitespace-nowrap">{d.tarikhTamat}</td>
                    <td className="px-4 py-3 text-xs text-[#64748B] whitespace-nowrap">{d.tempoh}</td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          className="inline-flex items-center gap-1 h-7 px-2 text-xs rounded-lg transition-all"
                          style={{
                            background: "rgba(217,119,6,0.08)",
                            border: "1px solid rgba(217,119,6,0.3)",
                            color: "#D97706",
                            fontWeight: 600,
                          }}
                        >
                          <PauseCircle className="w-3 h-3" />
                          Tangguh
                        </button>
                        <button
                          className="inline-flex items-center gap-1 h-7 px-2 text-xs rounded-lg transition-all"
                          style={{
                            background: "rgba(220,38,38,0.08)",
                            border: "1px solid rgba(220,38,38,0.25)",
                            color: "#DC2626",
                            fontWeight: 600,
                          }}
                        >
                          <XCircle className="w-3 h-3" />
                          Tamat
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
