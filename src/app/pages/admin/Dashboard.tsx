import React from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { DollarSign, Users, Package, Clock, TrendingUp, Eye } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { MONTHLY_DONATIONS, DONATIONS, WELFARE_PRODUCTS, SALARY_DEDUCTIONS, PTJ_CONFIGS } from "../../data/mockData";
import { StatsCard } from "../../components/shared/StatsCard";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { Breadcrumb } from "../../components/shared/Breadcrumb";

const formatRM = (n: number) =>
  new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR", maximumFractionDigits: 0 }).format(n);

const PTJ_CHART_KEY: Record<string, string> = {
  PHEP: "PHEP",
  PUSAT_ISLAM: "PUSAT_ISLAM",
  WAKAF: "WAKAF",
  YAYASAN: "YAYASAN",
  KESIHATAN: "KESIHATAN",
  FAKULTI: "FAKULTI",
};

const PIE_COLORS = ["#4D9FFF", "#F9A825", "#0A2FA6", "#7C3AED", "#DC2626", "#0891B2"];



export default function Dashboard() {
  const { currentAdmin } = useAuth();
  if (!currentAdmin) return null;

  const ptj = currentAdmin.ptj;
  const ptjKey = PTJ_CHART_KEY[ptj] || "PHEP";
  const ptjConfig = PTJ_CONFIGS[ptj];
  const isReadonly = currentAdmin.peranan === "readonly";
  const isBendahari = currentAdmin.peranan === "bendahari";

  const myProducts = WELFARE_PRODUCTS.filter((p) => p.ptj === ptj);
  const myDonations = DONATIONS.filter((d) => d.ptj === ptj);
  const pendingDeductions = SALARY_DEDUCTIONS.filter((d) => d.status === "Dalam Semakan");

  const totalCollected = myProducts.reduce((sum, p) => sum + p.jumlahTerkumpul, 0);
  const totalDonors = myProducts.reduce((sum, p) => sum + p.bilanganPenyumbang, 0);
  const activeProducts = myProducts.filter((p) => p.status === "Aktif").length;

  const universityTotal = WELFARE_PRODUCTS.reduce((sum, p) => sum + p.jumlahTerkumpul, 0);
  const universityDonors = WELFARE_PRODUCTS.reduce((sum, p) => sum + p.bilanganPenyumbang, 0);
  const universityActiveProducts = WELFARE_PRODUCTS.filter((p) => p.status === "Aktif").length;

  const chartData = MONTHLY_DONATIONS.map((d) => ({
    bulan: d.bulan,
    jumlah: (d as Record<string, unknown>)[ptjKey] as number || 0,
  }));

  const newApps = SALARY_DEDUCTIONS.filter((d) => d.status === "Dalam Semakan").length;
  const lulusToday = SALARY_DEDUCTIONS.filter((d) => d.status === "Lulus").length;
  const gagalCount = SALARY_DEDUCTIONS.filter((d) => d.status === "Gagal").length;

  const ptjBreakdown = Object.entries(PTJ_CHART_KEY).map(([ptjId, key], i) => ({
    name: PTJ_CONFIGS[ptjId as keyof typeof PTJ_CONFIGS]?.shortLabel || ptjId,
    value: WELFARE_PRODUCTS.filter((p) => p.ptj === ptjId).reduce((sum, p) => sum + p.jumlahTerkumpul, 0),
    color: PIE_COLORS[i],
  }));

  return (
    <div className="space-y-6">
      {/* Read-only notice */}
      {isReadonly && (
        <div
          className="rounded-xl px-5 py-3 flex items-center gap-3"
          style={{ background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)" }}
        >
          <Eye className="w-5 h-5 text-[#D97706] flex-shrink-0" />
          <p className="text-sm text-[#D97706] font-medium">
            Mod Tontonan Sahaja — Anda tidak mempunyai kebenaran untuk mengubah data.
          </p>
        </div>
      )}

      <Breadcrumb items={[{ label: "Dashboard" }]} />
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {isBendahari ? "Dashboard — Pejabat Bendahari" : isReadonly ? "Papan Pemuka (Tontonan Sahaja)" : `Dashboard — ${ptjConfig.label}`}
        </h1>
        <p className="text-[var(--muted-foreground)] text-sm mt-1">
          {new Date().toLocaleDateString("ms-MY", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Stats Row */}
      {isBendahari ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Permohonan Baharu" value={newApps} icon={<Clock className="w-5 h-5 text-[#D97706]" />} iconBg="bg-[#FFFBEB]" change={`${newApps} menunggu tindakan`} changeType="neutral" />
          <StatsCard title="Dalam Semakan" value={pendingDeductions.length} icon={<Clock className="w-5 h-5 text-[#4D9FFF]" />} iconBg="bg-[#EEF4FF]" />
          <StatsCard title="Lulus" value={lulusToday} icon={<Users className="w-5 h-5 text-[#16A34A]" />} iconBg="bg-[#F0FDF4]" />
          <StatsCard title="Gagal" value={gagalCount} icon={<Package className="w-5 h-5 text-[#DC2626]" />} iconBg="bg-[#FEF2F2]" />
        </div>
      ) : isReadonly ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Jumlah Sumbangan UTHM" value={formatRM(universityTotal)} icon={<DollarSign className="w-5 h-5 text-[#0A2FA6]" />} iconBg="bg-[#EEF4FF]" />
          <StatsCard title="Jumlah Penyumbang" value={universityDonors.toLocaleString()} icon={<Users className="w-5 h-5 text-[#F9A825]" />} iconBg="bg-[#FFFBEB]" />
          <StatsCard title="Produk Aktif" value={universityActiveProducts} icon={<Package className="w-5 h-5 text-[#4D9FFF]" />} iconBg="bg-[#EEF4FF]" />
          <StatsCard title="PTj Terlibat" value="6 PTj" icon={<TrendingUp className="w-5 h-5 text-[#7C3AED]" />} iconBg="bg-[#F5F3FF]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Sumbangan"
            value={formatRM(totalCollected)}
            icon={<DollarSign className="w-5 h-5 text-[#0A2FA6]" />}
            iconBg="bg-[#EEF4FF]"
            change="▲ 12.5% bulan ini"
            changeType="up"
          />
          <StatsCard
            title="Jumlah Penyumbang"
            value={totalDonors.toLocaleString()}
            icon={<Users className="w-5 h-5 text-[#F9A825]" />}
            iconBg="bg-[#FFFBEB]"
            change="▲ 8.3% bulan ini"
            changeType="up"
          />
          <StatsCard
            title="Produk Aktif"
            value={activeProducts}
            icon={<Package className="w-5 h-5 text-[#4D9FFF]" />}
            iconBg="bg-[#EEF4FF]"
          />
          {ptj === "PHEP" ? (
            <StatsCard
              title="Permohonan Potongan Gaji"
              value={pendingDeductions.length}
              icon={<Clock className="w-5 h-5 text-[#D97706]" />}
              iconBg="bg-[#FFFBEB]"
              change="Menunggu kelulusan"
              changeType="neutral"
            />
          ) : (
            <StatsCard
              title="Sumbangan Bulan Ini"
              value={formatRM((chartData[chartData.length - 1]?.jumlah || 0))}
              icon={<TrendingUp className="w-5 h-5 text-[#7C3AED]" />}
              iconBg="bg-[#F5F3FF]"
            />
          )}
        </div>
      )}

      {/* Bendahari alert */}
      {isBendahari && newApps > 0 && (
        <div
          className="rounded-xl px-5 py-3"
          style={{ background: "rgba(217,119,6,0.08)", border: "1px solid rgba(217,119,6,0.2)" }}
        >
          <p className="text-sm font-semibold text-[#D97706]">
            ⚠️ {newApps} Permohonan Menunggu Tindakan
          </p>
          <p className="text-xs text-[#D97706]/80 mt-0.5">
            Sila semak dan luluskan permohonan potongan gaji yang tertunggak.
          </p>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 p-5 glass-panel">
          <h2 className="font-semibold text-[var(--foreground)] mb-4 pb-2 border-b-2 border-[var(--primary)] inline-block" style={{ fontWeight: 700 }}>
            {isReadonly ? "Trend Sumbangan Keseluruhan UTHM" : isBendahari ? "Trend Permohonan Potongan Gaji" : `Trend Sumbangan Bulanan — ${ptjConfig.shortLabel}`}
          </h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              {isReadonly ? (
                <BarChart data={MONTHLY_DONATIONS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => formatRM(v)} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="PHEP" fill="#4D9FFF" name="PHEP" />
                  <Bar dataKey="PUSAT_ISLAM" fill="#0A2FA6" name="Pusat Islam" />
                  <Bar dataKey="WAKAF" fill="#F9A825" name="Wakaf" />
                </BarChart>
              ) : (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => formatRM(v)} />
                  <Line
                    type="monotone"
                    dataKey="jumlah"
                    stroke="#4D9FFF"
                    strokeWidth={2.5}
                    dot={{ fill: "#4D9FFF", r: 4 }}
                    name="Jumlah (RM)"
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie / Side Chart */}
        <div className="p-5 glass-panel">
          <h2 className="font-semibold text-[var(--foreground)] mb-4 pb-2 border-b-2 border-[var(--primary)] inline-block text-sm" style={{ fontWeight: 700 }}>
            Peratusan Mengikut PTj
          </h2>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ptjBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  dataKey="value"
                >
                  {ptjBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => formatRM(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-1.5">
            {ptjBreakdown.slice(0, 4).map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-[#64748B]">{item.name}</span>
                </div>
                <span className="font-medium text-[#0F172A]">{formatRM(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Donations / Recent Applications */}
      <div className="glass-panel" style={{ overflow: "hidden" }}>
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h2 className="font-semibold text-[var(--foreground)]" style={{ fontWeight: 700 }}>
            {isBendahari ? "Permohonan Potongan Gaji Terkini" : "Sumbangan Terkini"}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(77,159,255,0.06)" }}>
                {(isBendahari
                  ? ["Tarikh", "No. Pekerja", "Nama Staf", "Tabung", "Amaun/Bulan", "Status"]
                  : ["Tarikh", "Nama Penyumbang", "Produk", "Jumlah", "Kaedah", "Status"]
                ).map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-[#0F172A] whitespace-nowrap uppercase tracking-wide" style={{ color: "#64748B", fontWeight: 600 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isBendahari ? (
                SALARY_DEDUCTIONS.slice(0, 7).map((d, i) => (
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
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{d.tarikhPermohonan}</td>
                    <td className="px-4 py-3 text-xs font-mono text-[var(--primary)]">{d.noPerkerja}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[var(--foreground)]">{d.namaStaf}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] max-w-[160px]"><p className="truncate">{d.tabung}</p></td>
                    <td className="px-4 py-3 text-xs font-semibold">RM {d.amaunSebulan}</td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  </tr>
                ))
              ) : (
                (isReadonly ? DONATIONS : myDonations.length > 0 ? myDonations : DONATIONS).slice(0, 8).map((d, i) => (
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
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{d.tarikhMasa}</td>
                    <td className="px-4 py-3 text-xs font-medium text-[var(--foreground)]">{d.namaPenyumbang}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] max-w-[180px]"><p className="truncate">{d.produk}</p></td>
                    <td className="px-4 py-3 text-xs font-semibold text-[var(--primary)] whitespace-nowrap">{formatRM(d.jumlah)}</td>
                    <td className="px-4 py-3 text-xs text-[var(--muted-foreground)] whitespace-nowrap">{d.kaedahBayaran}</td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
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
