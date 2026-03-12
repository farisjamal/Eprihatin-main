import React, { useState } from "react";
import { useNavigate, useLocation, Outlet, Navigate } from "react-router";
import {
  LayoutDashboard, Gift, DollarSign, BarChart2, Printer,
  Users, Settings, FileText, CheckSquare, RefreshCw,
  TrendingUp, LogOut, Bell, Heart, Menu
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { PTJ_CONFIGS, NOTIFICATIONS, PtjType } from "../../data/mockData";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

function getNavItems(ptj: PtjType, role: "full" | "readonly" | "bendahari"): NavItem[] {
  const base = `/admin/${ptjToPath(ptj)}`;

  if (role === "bendahari") {
    return [
      { icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard", path: `${base}` },
      { icon: <FileText className="w-4 h-4" />, label: "Permohonan Potongan Gaji", path: `${base}/permohonan` },
      { icon: <CheckSquare className="w-4 h-4" />, label: "Kelulusan Potongan Gaji", path: `${base}/kelulusan` },
      { icon: <BarChart2 className="w-4 h-4" />, label: "Laporan Sumbangan", path: `${base}/laporan` },
      { icon: <Printer className="w-4 h-4" />, label: "Cetakan", path: `${base}/cetakan` },
    ];
  }

  if (role === "readonly") {
    return [
      { icon: <LayoutDashboard className="w-4 h-4" />, label: "Papan Pemuka", path: `${base}` },
      { icon: <BarChart2 className="w-4 h-4" />, label: "Laporan Sumbangan", path: `${base}/laporan` },
      { icon: <TrendingUp className="w-4 h-4" />, label: "Statistik Produk Bantuan", path: `${base}/statistik` },
    ];
  }

  // Full access
  const navItems: NavItem[] = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard", path: `${base}` },
    { icon: <Gift className="w-4 h-4" />, label: "Produk Kebajikan", path: `${base}/produk` },
    { icon: <DollarSign className="w-4 h-4" />, label: "Senarai Sumbangan", path: `${base}/sumbangan` },
  ];

  if (ptj === "WAKAF") {
    navItems.push({ icon: <RefreshCw className="w-4 h-4" />, label: "Pengurusan Pembayaran", path: `${base}/pembayaran` });
  }

  navItems.push(
    { icon: <BarChart2 className="w-4 h-4" />, label: "Laporan & Statistik", path: `${base}/laporan` },
    { icon: <Printer className="w-4 h-4" />, label: "Cetakan", path: `${base}/cetakan` },
  );

  if (ptj === "PHEP") {
    navItems.push(
      { icon: <Users className="w-4 h-4" />, label: "Pengurusan Pengguna", path: `${base}/pengguna` },
      { icon: <Settings className="w-4 h-4" />, label: "Tetapan Sistem", path: `${base}/tetapan` },
    );
  }

  return navItems;
}

function ptjToPath(ptj: PtjType): string {
  const map: Record<PtjType, string> = {
    PHEP: "phep",
    PUSAT_ISLAM: "pusat-islam",
    WAKAF: "wakaf",
    YAYASAN: "yayasan",
    KESIHATAN: "kesihatan",
    FAKULTI: "fakulti",
    BENDAHARI: "bendahari",
    TNC_HEPA: "tnc",
  };
  return map[ptj];
}

export function AdminLayout() {
  const { currentAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!currentAdmin) {
    return <Navigate to="/login" replace />;
  }

  const ptjConfig = PTJ_CONFIGS[currentAdmin.ptj];
  const navItems = getNavItems(currentAdmin.ptj, currentAdmin.peranan);
  const unreadCount = NOTIFICATIONS.filter((n) => !n.dibaca).length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#F8F9FB" }}
    >
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col transition-all duration-300 glass-panel ${sidebarOpen ? "w-60" : "w-0 overflow-hidden"
          }`}
      >
        {/* Logo Section */}
        <div
          className="px-4 py-5 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(226,232,240,0.6)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(10,47,166,0.12)", border: "1px solid rgba(10,47,166,0.2)" }}
            >
              <Heart className="w-5 h-5 text-[#0A2FA6]" fill="currentColor" />
            </div>
            <div>
              <span className="font-bold text-[#0A2FA6] text-sm block leading-tight">e-Prihatin</span>
              <span className="text-[10px] text-[#64748B] block leading-tight">Sistem Kebajikan UTHM</span>
            </div>
          </div>
          <div
            className="rounded-lg px-3 py-2"
            style={{ background: "rgba(10,47,166,0.06)", border: "1px solid rgba(10,47,166,0.1)" }}
          >
            <p className="text-[10px] text-[#64748B] uppercase tracking-wider mb-0.5">PTj</p>
            <p className="text-xs text-[#0A2FA6] font-semibold leading-snug">{ptjConfig.label}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== `/admin/${ptjToPath(currentAdmin.ptj)}` &&
                location.pathname.startsWith(item.path));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all relative"
                style={{
                  background: isActive ? "rgba(10,47,166,0.10)" : "transparent",
                  color: isActive ? "#0A2FA6" : "#0F172A",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(10,47,166,0.06)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full"
                    style={{ background: "#0A2FA6" }}
                  />
                )}
                <span className="flex-shrink-0" style={{ color: isActive ? "#F9A825" : "#64748B" }}>
                  {item.icon}
                </span>
                <span className="font-medium text-left" style={{ fontSize: "14px" }}>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 flex-shrink-0" style={{ borderTop: "1px solid rgba(226,232,240,0.6)" }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
            style={{ color: "#DC2626" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(220,38,38,0.06)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span style={{ fontWeight: 500 }}>Log Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-0"}`}
      >
        {/* Top Header */}
        <header
          className="h-16 flex items-center px-5 gap-4 sticky top-0 z-20 glass-panel"
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="transition-colors"
            style={{ color: "#64748B" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#0A2FA6")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#64748B")}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#0A2FA6]" />
            <span className="font-semibold text-[#0A2FA6] text-sm">Sistem e-Prihatin</span>
          </div>

          <div className="h-5 w-px" style={{ background: "#E2E8F0" }} />
          <span className="text-sm text-[#64748B] hidden sm:block">{ptjConfig.label}</span>

          <div className="flex-1" />

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
              style={{ color: "#64748B" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(10,47,166,0.06)";
                (e.currentTarget as HTMLElement).style.color = "#0A2FA6";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "#64748B";
              }}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#F9A825] rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div
                className="absolute right-0 top-11 w-80 z-50 rounded-xl overflow-hidden glass-panel"
              >
                <div
                  className="px-4 py-3 flex items-center justify-between"
                  style={{ borderBottom: "1px solid rgba(226,232,240,0.6)" }}
                >
                  <span className="font-semibold text-sm text-[#0F172A]">Notifikasi</span>
                  <button className="text-xs text-[#0A2FA6] hover:underline">Tandai semua dibaca</button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {NOTIFICATIONS.map((n) => (
                    <div
                      key={n.id}
                      className="px-4 py-3 last:border-0"
                      style={{
                        borderBottom: "1px solid rgba(226,232,240,0.4)",
                        background: !n.dibaca ? "rgba(77,159,255,0.04)" : "transparent",
                      }}
                    >
                      <p className="text-xs font-semibold text-[#0F172A]">{n.tajuk}</p>
                      <p className="text-xs text-[#64748B] mt-0.5 line-clamp-2">{n.mesej}</p>
                      <p className="text-[10px] text-[#64748B] mt-1">{n.masa}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "#0A2FA6" }}
            >
              {currentAdmin.avatar}
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-xs font-semibold text-[#0F172A] leading-tight">
                {currentAdmin.nama.split(" ").slice(0, 2).join(" ")}
              </p>
              <p className="text-[10px] text-[#64748B] leading-tight">{currentAdmin.jawatan}</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6" style={{ background: "#F8F9FB" }}>
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          style={{ background: "rgba(15,23,42,0.2)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
