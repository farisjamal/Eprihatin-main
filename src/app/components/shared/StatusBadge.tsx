import React from "react";

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Aktif:           { bg: "rgba(22,163,74,0.1)",   text: "#16A34A", border: "rgba(22,163,74,0.2)" },
  "Tidak Aktif":   { bg: "rgba(220,38,38,0.1)",   text: "#DC2626", border: "rgba(220,38,38,0.2)" },
  Berjaya:         { bg: "rgba(22,163,74,0.1)",   text: "#16A34A", border: "rgba(22,163,74,0.2)" },
  Lulus:           { bg: "rgba(22,163,74,0.1)",   text: "#16A34A", border: "rgba(22,163,74,0.2)" },
  "Dalam Proses":  { bg: "rgba(217,119,6,0.1)",   text: "#D97706", border: "rgba(217,119,6,0.2)" },
  "Dalam Semakan": { bg: "rgba(217,119,6,0.1)",   text: "#D97706", border: "rgba(217,119,6,0.2)" },
  Menunggu:        { bg: "rgba(217,119,6,0.1)",   text: "#D97706", border: "rgba(217,119,6,0.2)" },
  Gagal:           { bg: "rgba(220,38,38,0.1)",   text: "#DC2626", border: "rgba(220,38,38,0.2)" },
  Dikembalikan:    { bg: "rgba(220,38,38,0.1)",   text: "#DC2626", border: "rgba(220,38,38,0.2)" },
  Ditolak:         { bg: "rgba(220,38,38,0.1)",   text: "#DC2626", border: "rgba(220,38,38,0.2)" },
  Draf:            { bg: "rgba(100,116,139,0.1)", text: "#64748B", border: "rgba(100,116,139,0.2)" },
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] || {
    bg: "rgba(100,116,139,0.1)",
    text: "#64748B",
    border: "rgba(100,116,139,0.2)",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={{
        backgroundColor: style.bg,
        color: style.text,
        border: `1px solid ${style.border}`,
      }}
    >
      {status}
    </span>
  );
}
