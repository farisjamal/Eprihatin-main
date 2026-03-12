import React, { useState } from "react";
import { Plus, Edit2, UserX, Search } from "lucide-react";
import { SYSTEM_USERS, SystemUser } from "../../data/mockData";
import { StatusBadge } from "../../components/shared/StatusBadge";
import { Modal } from "../../components/shared/Modal";
import { Breadcrumb } from "../../components/shared/Breadcrumb";

export default function PengurusanPengguna() {
  const [users, setUsers] = useState<SystemUser[]>(SYSTEM_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Semua");
  const [editUser, setEditUser] = useState<SystemUser | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [newForm, setNewForm] = useState({ nama: "", ptj: "", jawatan: "", emel: "", peranan: "Kategori 1" as SystemUser["peranan"] });

  const filtered = users.filter((u) => {
    const matchSearch = search === "" || u.nama.toLowerCase().includes(search.toLowerCase()) || u.emel.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "Semua" || u.peranan === roleFilter;
    return matchSearch && matchRole;
  });

  const openEdit = (u: SystemUser) => { setEditUser({ ...u }); setModalOpen(true); };

  const handleSaveEdit = () => {
    if (!editUser) return;
    setUsers(users.map((u) => u.id === editUser.id ? editUser : u));
    setModalOpen(false);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map((u) => u.id === id ? { ...u, status: u.status === "Aktif" ? "Tidak Aktif" : "Aktif" } : u));
  };

  const handleAddUser = () => {
    const newUser: SystemUser = {
      id: `U${Date.now()}`,
      ...newForm,
      status: "Aktif",
      tarikhSertai: new Date().toISOString().split("T")[0],
    };
    setUsers([...users, newUser]);
    setAddModal(false);
    setNewForm({ nama: "", ptj: "", jawatan: "", emel: "", peranan: "Kategori 1" });
  };

  const inputClass = "w-full h-10 px-3 text-[#0F172A] text-sm outline-none rounded-lg";

  return (
    <div className="space-y-5">
      <Breadcrumb items={[{ label: "Dashboard" }, { label: "Pengurusan Pengguna" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Pengurusan Pengguna</h1>
          <p className="text-[#64748B] text-sm mt-0.5">Urus akaun semua pengguna sistem e-Prihatin</p>
        </div>
        <button
          onClick={() => setAddModal(true)}
          className="inline-flex items-center gap-2 px-4 h-10 text-sm rounded-[10px] transition-all glass-panel"
        >
          <Plus className="w-4 h-4" />
          Tambah Pengguna
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau e-mel..."
            className="w-full h-10 pl-9 pr-4 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:border-[#0A2FA6]"
          />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="h-10 px-3 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none">
          <option value="Semua">Semua Peranan</option>
          <option value="Kategori 1">Kategori 1 (Akses Penuh)</option>
          <option value="Kategori 2">Kategori 2 (Baca Sahaja)</option>
          <option value="Kategori 3">Kategori 3 (Penyumbang)</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden glass-panel">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(77,159,255,0.06)" }}>
                {["Nama", "PTj", "Jawatan", "E-mel", "Peranan", "Status", "Tindakan"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs whitespace-nowrap uppercase tracking-wide" style={{ color: "#64748B", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={u.id} className="transition-colors" style={{ borderTop: "1px solid #E2E8F0", background: i % 2 === 1 ? "#FAFAFA" : "white" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#F0F7FF")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = i % 2 === 1 ? "#FAFAFA" : "white")}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ background: "#0A2FA6" }}>
                        {u.nama.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                      </div>
                      <p className="text-xs font-medium text-[#0F172A]">{u.nama}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#64748B]">{u.ptj}</td>
                  <td className="px-4 py-3 text-xs text-[#64748B]">{u.jawatan}</td>
                  <td className="px-4 py-3 text-xs text-[#0F172A]">{u.emel}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium" style={
                      u.peranan === "Kategori 1" ? { background: "rgba(10,47,166,0.08)", color: "#0A2FA6", border: "1px solid rgba(10,47,166,0.2)" } :
                      u.peranan === "Kategori 2" ? { background: "rgba(77,159,255,0.08)", color: "#4D9FFF", border: "1px solid rgba(77,159,255,0.2)" } :
                      { background: "rgba(249,168,37,0.08)", color: "#D97706", border: "1px solid rgba(249,168,37,0.2)" }
                    }>
                      {u.peranan}
                    </span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(u)} className="inline-flex items-center gap-1 h-7 px-2 text-xs rounded-lg transition-all" style={{ background: "rgba(77,159,255,0.10)", border: "1px solid rgba(77,159,255,0.35)", color: "#0A2FA6", fontWeight: 600 }}>
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </button>
                      <button onClick={() => toggleUserStatus(u.id)} className="inline-flex items-center gap-1 h-7 px-2 text-xs rounded-lg transition-all" style={u.status === "Aktif" ? { background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)", color: "#DC2626", fontWeight: 600 } : { background: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.25)", color: "#16A34A", fontWeight: 600 }}>
                        <UserX className="w-3 h-3" />
                        {u.status === "Aktif" ? "Nyahaktif" : "Aktif"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Edit Pengguna" size="md"
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="h-9 px-4 text-sm rounded-[10px]" style={{ background: "rgba(77,159,255,0.10)", border: "1px solid rgba(77,159,255,0.3)", color: "#0A2FA6", fontWeight: 600 }}>Batal</button>
            <button onClick={handleSaveEdit} className="h-9 px-4 text-sm rounded-[10px]" style={{ background: "rgba(10,47,166,0.2)", border: "1px solid rgba(10,47,166,0.45)", color: "#0A2FA6", fontWeight: 700 }}>Simpan</button>
          </>
        }
      >
        {editUser && (
          <div className="space-y-4">
            <div>
              <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Nama</label>
              <input value={editUser.nama} onChange={(e) => setEditUser({ ...editUser, nama: e.target.value })} className={inputClass} style={{ border: "1px solid #E2E8F0", borderRadius: "8px", background: "#FFFFFF" }} />
            </div>
            <div>
              <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Peranan</label>
              <select value={editUser.peranan} onChange={(e) => setEditUser({ ...editUser, peranan: e.target.value as SystemUser["peranan"] })} className={inputClass} style={{ border: "1px solid #E2E8F0", borderRadius: "8px", background: "#FFFFFF" }}>
                <option value="Kategori 1">Kategori 1 (Akses Penuh)</option>
                <option value="Kategori 2">Kategori 2 (Baca Sahaja)</option>
                <option value="Kategori 3">Kategori 3 (Penyumbang)</option>
              </select>
            </div>
            <div>
              <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Status</label>
              <select value={editUser.status} onChange={(e) => setEditUser({ ...editUser, status: e.target.value as "Aktif" | "Tidak Aktif" })} className={inputClass} style={{ border: "1px solid #E2E8F0", borderRadius: "8px", background: "#FFFFFF" }}>
                <option value="Aktif">Aktif</option>
                <option value="Tidak Aktif">Tidak Aktif</option>
              </select>
            </div>
            <div className="rounded-lg p-3" style={{ background: "rgba(217,119,6,0.06)", border: "1px solid rgba(217,119,6,0.2)" }}>
              <p className="text-xs text-[#D97706]">⚠️ Untuk tetapkan semula kata laluan, sila hubungi pentadbir sistem UTHM.</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Modal */}
      <Modal isOpen={addModal} onClose={() => setAddModal(false)} title="Tambah Pengguna Baharu" size="md"
        footer={
          <>
            <button onClick={() => setAddModal(false)} className="h-9 px-4 text-sm rounded-[10px]" style={{ background: "rgba(77,159,255,0.10)", border: "1px solid rgba(77,159,255,0.3)", color: "#0A2FA6", fontWeight: 600 }}>Batal</button>
            <button onClick={handleAddUser} className="h-9 px-4 text-sm rounded-[10px]" style={{ background: "rgba(10,47,166,0.2)", border: "1px solid rgba(10,47,166,0.45)", color: "#0A2FA6", fontWeight: 700 }}>Tambah</button>
          </>
        }
      >
        <div className="space-y-4">
          {[
            { label: "Nama Penuh", field: "nama", placeholder: "Nama penuh" },
            { label: "PTj", field: "ptj", placeholder: "Cth: PHEP" },
            { label: "Jawatan", field: "jawatan", placeholder: "Jawatan rasmi" },
            { label: "E-mel", field: "emel", placeholder: "nama@uthm.edu.my" },
          ].map((item) => (
            <div key={item.field}>
              <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>{item.label} *</label>
              <input
                value={(newForm as Record<string, string>)[item.field]}
                onChange={(e) => setNewForm({ ...newForm, [item.field]: e.target.value })}
                className={inputClass}
                style={{ border: "1px solid #E2E8F0", borderRadius: "8px", background: "#FFFFFF" }}
                placeholder={item.placeholder}
              />
            </div>
          ))}
          <div>
            <label className="block mb-1" style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>Peranan *</label>
            <select value={newForm.peranan} onChange={(e) => setNewForm({ ...newForm, peranan: e.target.value as SystemUser["peranan"] })} className={inputClass} style={{ border: "1px solid #E2E8F0", borderRadius: "8px", background: "#FFFFFF" }}>
              <option value="Kategori 1">Kategori 1 (Akses Penuh)</option>
              <option value="Kategori 2">Kategori 2 (Baca Sahaja)</option>
              <option value="Kategori 3">Kategori 3 (Penyumbang)</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}