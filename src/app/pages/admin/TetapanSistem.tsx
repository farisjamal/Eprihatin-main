import React, { useState } from "react";
import { Save, Shield, Bell, Globe } from "lucide-react";
import { Breadcrumb } from "../../components/shared/Breadcrumb";

export default function TetapanSistem() {
  const [settings, setSettings] = useState({
    namaSystem: "Sistem e-Prihatin UTHM",
    emelNotifikasi: "eprihatin@uthm.edu.my",
    kadarCukai: "5",
    notifDerma: true,
    notifPotongan: true,
    notifLaporan: false,
    maintenanceMode: false,
    maxUpload: "5",
    sessionTimeout: "30",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = "w-full h-10 px-3 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#0A2FA6] focus:ring-1 focus:ring-[#0A2FA6]/20";

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      type="button"
      onClick={onChange}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
      style={{ background: checked ? "#0A2FA6" : "#E2E8F0" }}
    >
      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" style={{ transform: checked ? "translateX(24px)" : "translateX(4px)" }} />
    </button>
  );

  return (
    <div className="space-y-5">
      <Breadcrumb items={[{ label: "Dashboard" }, { label: "Tetapan Sistem" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Tetapan Sistem</h1>
          <p className="text-[#64748B] text-sm mt-0.5">Konfigurasi sistem e-Prihatin UTHM</p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-4 h-10 font-semibold text-sm rounded-[10px] transition-all"
          style={saved ? { background: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.35)", color: "#16A34A", fontWeight: 700 } : { background: "rgba(10,47,166,0.2)", border: "1px solid rgba(10,47,166,0.45)", color: "#0A2FA6", fontWeight: 700, boxShadow: "0 2px 12px rgba(10,47,166,0.12)" }}
        >
          <Save className="w-4 h-4" />
          {saved ? "Disimpan!" : "Simpan Perubahan"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="p-5 space-y-4" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px) saturate(160%)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: "16px", boxShadow: "0 4px 24px rgba(100,116,139,0.12), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-[#0A2FA6]" />
            <h2 className="font-semibold text-[#0F172A]" style={{ fontWeight: 700 }}>Tetapan Umum</h2>
          </div>
          <div>
            <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Nama Sistem</label>
            <input value={settings.namaSystem} onChange={(e) => setSettings({ ...settings, namaSystem: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>E-mel Notifikasi Sistem</label>
            <input type="email" value={settings.emelNotifikasi} onChange={(e) => setSettings({ ...settings, emelNotifikasi: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Kadar Pengecualian Cukai (%)</label>
            <input type="number" value={settings.kadarCukai} onChange={(e) => setSettings({ ...settings, kadarCukai: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Had Muat Naik Fail (MB)</label>
            <input type="number" value={settings.maxUpload} onChange={(e) => setSettings({ ...settings, maxUpload: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Masa Tamat Sesi (Minit)</label>
            <input type="number" value={settings.sessionTimeout} onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })} className={inputClass} />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <div className="p-5 space-y-4" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px) saturate(160%)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: "16px", boxShadow: "0 4px 24px rgba(100,116,139,0.12), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-[#0A2FA6]" />
              <h2 className="font-semibold text-[#0F172A]" style={{ fontWeight: 700 }}>Tetapan Notifikasi</h2>
            </div>
            {[
              { label: "Notifikasi Sumbangan Baharu", key: "notifDerma" },
              { label: "Notifikasi Permohonan Potongan Gaji", key: "notifPotongan" },
              { label: "Notifikasi Laporan Dijana", key: "notifLaporan" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#0F172A]">{item.label}</p>
                  <p className="text-xs text-[#64748B]">Hantar e-mel apabila berlaku</p>
                </div>
                <Toggle
                  checked={(settings as Record<string, boolean | string>)[item.key] as boolean}
                  onChange={() => setSettings({ ...settings, [item.key]: !(settings as Record<string, boolean | string>)[item.key] })}
                />
              </div>
            ))}
          </div>

          <div className="p-5" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px) saturate(160%)", border: "1px solid rgba(255,255,255,0.7)", borderRadius: "16px", boxShadow: "0 4px 24px rgba(100,116,139,0.12), inset 0 1px 0 rgba(255,255,255,0.9)" }}>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-[#0A2FA6]" />
              <h2 className="font-semibold text-[#0F172A]" style={{ fontWeight: 700 }}>Keselamatan Sistem</h2>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-[#0F172A]">Mod Penyelenggaraan</p>
                <p className="text-xs text-[#64748B]">Sekat akses awam semasa penyelenggaraan</p>
              </div>
              <Toggle
                checked={settings.maintenanceMode}
                onChange={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
              />
            </div>
            {settings.maintenanceMode && (
              <div className="rounded-lg p-3" style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)" }}>
                <p className="text-xs text-[#DC2626] font-semibold">⚠️ Amaran: Mod penyelenggaraan aktif. Pengguna awam tidak dapat mengakses sistem.</p>
              </div>
            )}
            <div className="pt-4 mt-4" style={{ borderTop: "1px solid #E2E8F0" }}>
              <p className="text-xs text-[#64748B] mb-2">Maklumat Sistem</p>
              <div className="space-y-1">
                {[
                  { label: "Versi Sistem", value: "v2.1.0" },
                  { label: "Tarikh Kemaskini", value: "05 Mac 2025" },
                  { label: "Persekitaran", value: "Pengeluaran (Production)" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-xs">
                    <span className="text-[#64748B]">{item.label}</span>
                    <span className="font-medium text-[#0F172A]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}