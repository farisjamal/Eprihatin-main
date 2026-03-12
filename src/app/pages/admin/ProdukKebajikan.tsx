import React, { useState } from "react";
import { Plus, Edit2, PowerOff, Save } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { WELFARE_PRODUCTS, WelfareProduct } from "../../data/mockData";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { Modal } from "../../components/shared/Modal";
import { Breadcrumb } from "../../components/shared/Breadcrumb";

const PRODUK_LABEL: Record<string, string> = {
  PHEP: "Dana Wang Ihsan",
  PUSAT_ISLAM: "Tabung Zakat",
  WAKAF: "Wakaf & Endowmen",
  YAYASAN: "Yayasan UTHM",
  KESIHATAN: "Pusat Kesihatan",
  FAKULTI: "Fak. TDHEPA",
};

const WAKAF_TABS = ["Semua", "Wakaf", "Endowmen"];



const inputClass = "w-full h-10 px-3 text-[#0F172A] text-sm outline-none rounded-lg";
const inputStyle: React.CSSProperties = {
  border: "1px solid #E2E8F0",
  borderRadius: "8px",
  background: "#FFFFFF",
  color: "#0F172A",
  fontSize: "14px",
};

export default function AdminProdukKebajikan() {
  const { currentAdmin } = useAuth();
  if (!currentAdmin) return null;

  const ptj = currentAdmin.ptj;
  const myProducts = WELFARE_PRODUCTS.filter((p) => p.ptj === ptj);

  const [products, setProducts] = useState<WelfareProduct[]>(myProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<WelfareProduct | null>(null);
  const [wakafTab, setWakafTab] = useState("Semua");
  const [form, setForm] = useState({
    nama: "", penerangan: "", sasaran: "", status: "Aktif" as "Aktif" | "Tidak Aktif",
  });

  const formatRM = (n: number) =>
    new Intl.NumberFormat("ms-MY", { style: "currency", currency: "MYR", maximumFractionDigits: 0 }).format(n);

  const openAdd = () => {
    setEditProduct(null);
    setForm({ nama: "", penerangan: "", sasaran: "", status: "Aktif" });
    setModalOpen(true);
  };

  const openEdit = (p: WelfareProduct) => {
    setEditProduct(p);
    setForm({ nama: p.nama, penerangan: p.penerangan, sasaran: p.sasaran?.toString() || "", status: p.status });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editProduct) {
      setProducts(products.map((p) =>
        p.id === editProduct.id
          ? { ...p, nama: form.nama, penerangan: form.penerangan, sasaran: form.sasaran ? Number(form.sasaran) : undefined, status: form.status }
          : p
      ));
    } else {
      const newProduct: WelfareProduct = {
        id: `NEW-${Date.now()}`,
        nama: form.nama,
        penerangan: form.penerangan,
        ptj,
        ptjLabel: PRODUK_LABEL[ptj] || "",
        jumlahTerkumpul: 0,
        sasaran: form.sasaran ? Number(form.sasaran) : undefined,
        bilanganPenyumbang: 0,
        status: form.status,
        ikon: "📦",
        warna: "#0A2FA6",
      };
      setProducts([...products, newProduct]);
    }
    setModalOpen(false);
  };

  const toggleStatus = (id: string) => {
    setProducts(products.map((p) =>
      p.id === id ? { ...p, status: p.status === "Aktif" ? "Tidak Aktif" : "Aktif" } : p
    ));
  };

  const displayed = ptj === "WAKAF" && wakafTab !== "Semua"
    ? products.filter((p) => {
      if (wakafTab === "Wakaf") return p.nama.toLowerCase().includes("wakaf");
      if (wakafTab === "Endowmen") return p.nama.toLowerCase().includes("endowmen");
      return true;
    })
    : products;

  return (
    <div className="space-y-5">
      <Breadcrumb items={[{ label: "Dashboard" }, { label: "Produk Kebajikan" }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Produk Kebajikan</h1>
          <p className="text-[#64748B] text-sm mt-0.5">{PRODUK_LABEL[ptj] || ""} — {products.length} produk</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 h-10 text-sm rounded-[10px] transition-all glass-panel"
        >
          <Plus className="w-4 h-4" />
          Tambah Produk
        </button>
      </div>

      {/* Wakaf tabs */}
      {ptj === "WAKAF" && (
        <div className="flex gap-2">
          {WAKAF_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setWakafTab(tab)}
              className="px-4 h-9 rounded-lg text-sm font-medium transition-all"
              style={{
                background: wakafTab === tab ? "#0A2FA6" : "rgba(77,159,255,0.1)",
                color: wakafTab === tab ? "white" : "#0A2FA6",
                border: wakafTab === tab ? "1px solid #0A2FA6" : "1px solid rgba(77,159,255,0.3)",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Table */}
      <div className="glass-panel" style={{ overflow: "hidden" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(77,159,255,0.06)" }}>
                {["Bil", "Nama Produk", "Penerangan", "Jumlah Disumbang (RM)", "Penyumbang", "Status", "Tindakan"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs whitespace-nowrap uppercase tracking-wide" style={{ color: "#64748B", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.map((p, i) => (
                <tr
                  key={p.id}
                  className="transition-colors"
                  style={{
                    borderTop: "1px solid #E2E8F0",
                    background: i % 2 === 1 ? "#FAFAFA" : "white",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#F0F7FF")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i % 2 === 1 ? "#FAFAFA" : "white")}
                >
                  <td className="px-4 py-3 text-xs text-[#64748B]">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{p.ikon}</span>
                      <p className="text-xs font-semibold text-[#0F172A]">{p.nama}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#64748B] max-w-[220px]">
                    <p className="line-clamp-2">{p.penerangan}</p>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-[#0A2FA6] whitespace-nowrap">{formatRM(p.jumlahTerkumpul)}</td>
                  <td className="px-4 py-3 text-xs text-[#0F172A]">{p.bilanganPenyumbang.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(p)}
                        className="inline-flex items-center gap-1 h-7 px-2.5 text-xs rounded-lg transition-all"
                        style={{
                          background: "rgba(77,159,255,0.1)",
                          border: "1px solid rgba(77,159,255,0.35)",
                          color: "#0A2FA6",
                          fontWeight: 600,
                        }}
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => toggleStatus(p.id)}
                        className="inline-flex items-center gap-1 h-7 px-2.5 text-xs rounded-lg transition-all"
                        style={
                          p.status === "Aktif"
                            ? { background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)", color: "#DC2626", fontWeight: 600 }
                            : { background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.25)", color: "#16A34A", fontWeight: 600 }
                        }
                      >
                        <PowerOff className="w-3 h-3" />
                        {p.status === "Aktif" ? "Nyahaktif" : "Aktifkan"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editProduct ? "Edit Produk Kebajikan" : "Tambah Produk Kebajikan Baharu"}
        size="md"
        footer={
          <>
            <button
              onClick={() => setModalOpen(false)}
              className="h-9 px-4 text-sm rounded-[10px] transition-all"
              style={{
                background: "rgba(77,159,255,0.10)",
                border: "1px solid rgba(77,159,255,0.3)",
                color: "#0A2FA6",
                fontWeight: 600,
              }}
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="h-9 px-4 text-sm rounded-[10px] inline-flex items-center gap-2 transition-all"
              style={{
                background: "rgba(10,47,166,0.2)",
                border: "1px solid rgba(10,47,166,0.45)",
                color: "#0A2FA6",
                fontWeight: 700,
                boxShadow: "0 2px 12px rgba(10,47,166,0.12)",
              }}
            >
              <Save className="w-4 h-4" />
              Simpan
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Nama Produk *</label>
            <input
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className={inputClass}
              style={inputStyle}
              placeholder="Nama produk kebajikan"
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
            <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Penerangan *</label>
            <textarea
              value={form.penerangan}
              onChange={(e) => setForm({ ...form, penerangan: e.target.value })}
              className="w-full px-3 py-2 text-sm outline-none resize-none rounded-lg"
              style={{ ...inputStyle, height: "80px" }}
              rows={3}
              placeholder="Huraian produk kebajikan ini..."
              onFocus={(e) => {
                (e.target as HTMLTextAreaElement).style.border = "1px solid #0A2FA6";
                (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 0 3px rgba(10,47,166,0.1)";
              }}
              onBlur={(e) => {
                (e.target as HTMLTextAreaElement).style.border = "1px solid #E2E8F0";
                (e.target as HTMLTextAreaElement).style.boxShadow = "none";
              }}
            />
          </div>
          <div>
            <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Sasaran Sumbangan (RM) — Pilihan</label>
            <input
              type="number"
              value={form.sasaran}
              onChange={(e) => setForm({ ...form, sasaran: e.target.value })}
              className={inputClass}
              style={inputStyle}
              placeholder="0"
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
            <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Status</label>
            <div className="flex gap-3">
              {["Aktif", "Tidak Aktif"].map((s) => (
                <label key={s} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={form.status === s}
                    onChange={(e) => setForm({ ...form, status: e.target.value as "Aktif" | "Tidak Aktif" })}
                    style={{ accentColor: "#0A2FA6" }}
                  />
                  <span className="text-sm text-[#0F172A]">{s}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
