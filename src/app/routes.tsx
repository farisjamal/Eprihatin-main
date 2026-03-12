import { createBrowserRouter, Navigate } from "react-router";

// Layouts
import { PublicLayout } from "./components/layout/PublicLayout";
import { AdminLayout } from "./components/layout/AdminLayout";

// Public pages
import LandingPage from "./pages/public/LandingPage";
import ProdukKebajikan from "./pages/public/ProdukKebajikan";
import ButiranProduk from "./pages/public/ButiranProduk";
import Pembayaran from "./pages/public/Pembayaran";
import Resit from "./pages/public/Resit";
import PotonganGaji from "./pages/public/PotonganGaji";
import SejarahSumbangan from "./pages/public/SejarahSumbangan";
import FAQ from "./pages/public/FAQ";

// Auth
import Login from "./pages/Login";

// Admin common
import Dashboard from "./pages/admin/Dashboard";
import AdminProdukKebajikan from "./pages/admin/ProdukKebajikan";
import SenaraySumbangan from "./pages/admin/SenaraySumbangan";
import Laporan from "./pages/admin/Laporan";
import Cetakan from "./pages/admin/Cetakan";
import PengurusanPengguna from "./pages/admin/PengurusanPengguna";
import TetapanSistem from "./pages/admin/TetapanSistem";

// Bendahari
import PermohonanPotongan from "./pages/admin/bendahari/PermohonanPotongan";
import KelulusanPotongan from "./pages/admin/bendahari/KelulusanPotongan";

// Wakaf
import PengurusanPembayaran from "./pages/admin/wakaf/PengurusanPembayaran";

// TNC
import TncStatistik from "./pages/admin/tnc/Statistik";

// Error pages
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

// Standard admin routes (shared for all full-access PTj)
const standardAdminChildren = [
  { index: true, Component: Dashboard },
  { path: "produk", Component: AdminProdukKebajikan },
  { path: "sumbangan", Component: SenaraySumbangan },
  { path: "laporan", Component: Laporan },
  { path: "cetakan", Component: Cetakan },
];

export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "perkhidmatan", Component: ProdukKebajikan },
      { path: "produk/:id", Component: ButiranProduk },
      { path: "pembayaran", Component: Pembayaran },
      { path: "resit", Component: Resit },
      { path: "potongan-gaji", Component: PotonganGaji },
      { path: "sejarah-sumbangan", Component: SejarahSumbangan },
      { path: "faq", Component: FAQ },
      { path: "hubungi", Component: FAQ }, // Reuse FAQ for now
    ],
  },

  // Login
  { path: "/login", Component: Login },

  // Admin Routes — PHEP (super admin)
  {
    path: "/admin/phep",
    Component: AdminLayout,
    children: [
      ...standardAdminChildren,
      { path: "pengguna", Component: PengurusanPengguna },
      { path: "tetapan", Component: TetapanSistem },
    ],
  },

  // Admin Routes — Pusat Islam
  {
    path: "/admin/pusat-islam",
    Component: AdminLayout,
    children: standardAdminChildren,
  },

  // Admin Routes — Wakaf & Endowmen
  {
    path: "/admin/wakaf",
    Component: AdminLayout,
    children: [
      ...standardAdminChildren,
      { path: "pembayaran", Component: PengurusanPembayaran },
    ],
  },

  // Admin Routes — Yayasan UTHM
  {
    path: "/admin/yayasan",
    Component: AdminLayout,
    children: standardAdminChildren,
  },

  // Admin Routes — Pusat Kesihatan
  {
    path: "/admin/kesihatan",
    Component: AdminLayout,
    children: standardAdminChildren,
  },

  // Admin Routes — Fakulti TDHEPA
  {
    path: "/admin/fakulti",
    Component: AdminLayout,
    children: standardAdminChildren,
  },

  // Admin Routes — Pejabat Bendahari
  {
    path: "/admin/bendahari",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "permohonan", Component: PermohonanPotongan },
      { path: "kelulusan", Component: KelulusanPotongan },
      { path: "laporan", Component: Laporan },
      { path: "cetakan", Component: Cetakan },
    ],
  },

  // Admin Routes — TNC HEPA (read-only)
  {
    path: "/admin/tnc",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "laporan", Component: Laporan },
      { path: "statistik", Component: TncStatistik },
    ],
  },

  // Error pages
  { path: "/403", Component: Unauthorized },
  { path: "*", Component: NotFound },
]);
