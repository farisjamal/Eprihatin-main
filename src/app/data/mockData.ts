// ─── TYPES ───────────────────────────────────────────────────────────────────

export type PtjType =
  | "PHEP"
  | "PUSAT_ISLAM"
  | "WAKAF"
  | "YAYASAN"
  | "KESIHATAN"
  | "FAKULTI"
  | "BENDAHARI"
  | "TNC_HEPA";

export type DonationStatus = "Berjaya" | "Dalam Proses" | "Gagal";
export type DeductionStatus = "Lulus" | "Gagal" | "Dalam Semakan";
export type ProductStatus = "Aktif" | "Tidak Aktif";
export type UserRole = "Kategori 1" | "Kategori 2" | "Kategori 3";
export type PaymentMethod = "Wakaf & Endowmen" | "Potongan Gaji" | "FPX" | "Pindahan Bank";
export type DonorType = "Staf UTHM" | "Alumni" | "Industri" | "Orang Awam";

export interface WelfareProduct {
  id: string;
  nama: string;
  penerangan: string;
  ptj: PtjType;
  ptjLabel: string;
  jumlahTerkumpul: number;
  sasaran?: number;
  bilanganPenyumbang: number;
  status: ProductStatus;
  ikon: string;
  warna: string;
}

export interface Donation {
  id: string;
  tarikhMasa: string;
  noRujukan: string;
  namaPenyumbang: string;
  noKadPengenalan: string;
  emel: string;
  noTelefon: string;
  jenisPenyumbang: DonorType;
  produk: string;
  ptj: PtjType;
  jumlah: number;
  kaedahBayaran: PaymentMethod;
  status: DonationStatus;
}

export interface SalaryDeduction {
  id: string;
  tarikhPermohonan: string;
  noPerkerja: string;
  namaStaf: string;
  jabatan: string;
  tabung: string;
  amaunSebulan: number;
  tempoh: string;
  tarikhMula: string;
  tarikhTamat: string;
  status: DeductionStatus;
  sebabGagal?: string;
}

export interface SystemUser {
  id: string;
  nama: string;
  ptj: string;
  jawatan: string;
  emel: string;
  peranan: UserRole;
  status: ProductStatus;
  tarikhSertai: string;
}

export interface Notification {
  id: string;
  tajuk: string;
  mesej: string;
  masa: string;
  dibaca: boolean;
  jenis: "donation" | "deduction" | "system";
}

// ─── PTJ CONFIGS ─────────────────────────────────────────────────────────────

export const PTJ_CONFIGS: Record<PtjType, { label: string; color: string; shortLabel: string }> = {
  PHEP: { label: "Pejabat Hal Ehwal Pelajar", color: "#2E7D32", shortLabel: "PHEP" },
  PUSAT_ISLAM: { label: "Pusat Islam", color: "#1565C0", shortLabel: "Pusat Islam" },
  WAKAF: { label: "Wakaf dan Endowmen", color: "#6A1B9A", shortLabel: "Wakaf & Endowmen" },
  YAYASAN: { label: "Yayasan UTHM", color: "#BF360C", shortLabel: "Yayasan UTHM" },
  KESIHATAN: { label: "Pusat Kesihatan Universiti", color: "#00695C", shortLabel: "Pusat Kesihatan" },
  FAKULTI: { label: "Fakulti TDHEPA", color: "#827717", shortLabel: "Fak. TDHEPA" },
  BENDAHARI: { label: "Pejabat Bendahari", color: "#4527A0", shortLabel: "Bendahari" },
  TNC_HEPA: { label: "TNC HEPA", color: "#37474F", shortLabel: "TNC HEPA" },
};

// ─── WELFARE PRODUCTS ─────────────────────────────────────────────────────────

export const WELFARE_PRODUCTS: WelfareProduct[] = [
  // PHEP — Dana Wang Ihsan (6 products)
  { id: "DWI-001", nama: "Dana Wang Ihsan Am", penerangan: "Tabung bantuan am untuk pelajar yang memerlukan sokongan kewangan segera dalam situasi kecemasan.", ptj: "PHEP", ptjLabel: "PHEP", jumlahTerkumpul: 145820, sasaran: 200000, bilanganPenyumbang: 312, status: "Aktif", ikon: "🎓", warna: "#2E7D32" },
  { id: "DWI-002", nama: "Dana Bantuan Kecemasan Pelajar", penerangan: "Bantuan kewangan segera untuk pelajar yang menghadapi krisis atau kemalangan yang tidak dijangka.", ptj: "PHEP", ptjLabel: "PHEP", jumlahTerkumpul: 89450, sasaran: 150000, bilanganPenyumbang: 198, status: "Aktif", ikon: "🆘", warna: "#2E7D32" },
  { id: "DWI-003", nama: "Dana Bantuan Perubatan Pelajar", penerangan: "Membantu pelajar menanggung kos rawatan perubatan yang tidak dilindungi oleh insurans.", ptj: "PHEP", ptjLabel: "PHEP", jumlahTerkumpul: 67230, sasaran: 100000, bilanganPenyumbang: 145, status: "Aktif", ikon: "🏥", warna: "#2E7D32" },
  { id: "DWI-004", nama: "Dana Kebajikan Pelajar Miskin Tegar", penerangan: "Sokongan berterusan untuk pelajar yang berasal dari keluarga berpendapatan rendah.", ptj: "PHEP", ptjLabel: "PHEP", jumlahTerkumpul: 234100, sasaran: 300000, bilanganPenyumbang: 521, status: "Aktif", ikon: "🤝", warna: "#2E7D32" },
  { id: "DWI-005", nama: "Dana Bantuan Makanan Pelajar", penerangan: "Menyediakan bantuan makanan harian untuk pelajar yang menghadapi kesukaran kewangan.", ptj: "PHEP", ptjLabel: "PHEP", jumlahTerkumpul: 45670, sasaran: 80000, bilanganPenyumbang: 89, status: "Aktif", ikon: "🍱", warna: "#2E7D32" },
  { id: "DWI-006", nama: "Dana Buku & Peralatan Pelajar", penerangan: "Membantu pelajar memperoleh buku teks dan peralatan pembelajaran yang diperlukan.", ptj: "PHEP", ptjLabel: "PHEP", jumlahTerkumpul: 31450, sasaran: 60000, bilanganPenyumbang: 67, status: "Aktif", ikon: "📚", warna: "#2E7D32" },

  // Pusat Islam — Tabung Zakat (12 products)
  { id: "TZ-001", nama: "Zakat Fitrah UTHM", penerangan: "Zakat fitrah untuk staf dan pelajar UTHM yang layak.", ptj: "PUSAT_ISLAM", ptjLabel: "Pusat Islam", jumlahTerkumpul: 198500, bilanganPenyumbang: 1245, status: "Aktif", ikon: "🌙", warna: "#1565C0" },
  { id: "TZ-002", nama: "Zakat Harta", penerangan: "Zakat ke atas harta perniagaan, emas, perak dan wang simpanan.", ptj: "PUSAT_ISLAM", ptjLabel: "Pusat Islam", jumlahTerkumpul: 567800, bilanganPenyumbang: 456, status: "Aktif", ikon: "💎", warna: "#1565C0" },
  { id: "TZ-003", nama: "Zakat Pendapatan", penerangan: "Zakat ke atas pendapatan bulanan pekerja yang mencukupi nisab.", ptj: "PUSAT_ISLAM", ptjLabel: "Pusat Islam", jumlahTerkumpul: 892340, bilanganPenyumbang: 789, status: "Aktif", ikon: "💼", warna: "#1565C0" },
  { id: "TZ-004", nama: "Zakat Perniagaan", penerangan: "Zakat ke atas perniagaan yang dijalankan oleh ahli komuniti UTHM.", ptj: "PUSAT_ISLAM", ptjLabel: "Pusat Islam", jumlahTerkumpul: 234500, bilanganPenyumbang: 123, status: "Aktif", ikon: "🏪", warna: "#1565C0" },
  { id: "TZ-005", nama: "Tabung Infaq & Sadaqah", penerangan: "Sumbangan sukarela untuk kebajikan am komuniti Islam UTHM.", ptj: "PUSAT_ISLAM", ptjLabel: "Pusat Islam", jumlahTerkumpul: 156700, bilanganPenyumbang: 934, status: "Aktif", ikon: "🤲", warna: "#1565C0" },
  { id: "TZ-006", nama: "Tabung Masjid & Surau UTHM", penerangan: "Pembiayaan penyelenggaraan dan pembangunan kemudahan masjid dan surau kampus.", ptj: "PUSAT_ISLAM", ptjLabel: "Pusat Islam", jumlahTerkumpul: 78900, sasaran: 120000, bilanganPenyumbang: 456, status: "Aktif", ikon: "🕌", warna: "#1565C0" },
  { id: "TZ-007", nama: "Dana Pelajar Asnaf", penerangan: "Bantuan khusus untuk pelajar yang tergolong dalam kategori asnaf zakat.", ptj: "PUSAT_ISLAM", ptjLabel: "Pusat Islam", jumlahTerkumpul: 345200, sasaran: 500000, bilanganPenyumbang: 678, status: "Aktif", ikon: "📖", warna: "#1565C0" },
  { id: "TZ-008", nama: "Tabung Dakwah & Tarbiah", penerangan: "Mendukung program dakwah dan pendidikan Islam di kampus UTHM.", ptj: "PUSAT_ISLAM", ptjLabel: "Pusat Islam", jumlahTerkumpul: 45600, bilanganPenyumbang: 234, status: "Aktif", ikon: "📿", warna: "#1565C0" },
  { id: "TZ-009", nama: "Tabung Anak Yatim", penerangan: "Sokongan kewangan untuk pelajar yang merupakan anak yatim.", ptj: "PUSAT_ISLAM", ptjLabel: "Pusat Islam", jumlahTerkumpul: 123400, sasaran: 200000, bilanganPenyumbang: 312, status: "Aktif", ikon: "👶", warna: "#1565C0" },
  { id: "TZ-010", nama: "Tabung Muallaf", penerangan: "Bantuan untuk muallaf yang baru memeluk Islam dalam komuniti UTHM.", ptj: "PUSAT_ISLAM", ptjLabel: "Pusat Islam", jumlahTerkumpul: 34500, bilanganPenyumbang: 89, status: "Aktif", ikon: "🌱", warna: "#1565C0" },
  { id: "TZ-011", nama: "Tabung Fisabilillah", penerangan: "Dana untuk program dan aktiviti di jalan Allah dalam konteks kampus.", ptj: "PUSAT_ISLAM", ptjLabel: "Pusat Islam", jumlahTerkumpul: 67800, bilanganPenyumbang: 198, status: "Aktif", ikon: "⭐", warna: "#1565C0" },
  { id: "TZ-012", nama: "Tabung Ibnus Sabil", penerangan: "Bantuan untuk pelajar yang terputus perjalanan atau memerlukan bantuan kecemasan.", ptj: "PUSAT_ISLAM", ptjLabel: "Pusat Islam", jumlahTerkumpul: 23400, bilanganPenyumbang: 56, status: "Aktif", ikon: "🛤️", warna: "#1565C0" },

  // Wakaf & Endowmen (10 products)
  { id: "WE-001", nama: "Wakaf Am UTHM", penerangan: "Wakaf umum untuk pembangunan infrastruktur dan kemudahan akademik universiti.", ptj: "WAKAF", ptjLabel: "Wakaf & Endowmen", jumlahTerkumpul: 1245000, sasaran: 5000000, bilanganPenyumbang: 1567, status: "Aktif", ikon: "🏛️", warna: "#6A1B9A" },
  { id: "WE-002", nama: "Wakaf Pendidikan", penerangan: "Dana untuk biasiswa dan bantuan pengajian bagi pelajar yang layak.", ptj: "WAKAF", ptjLabel: "Wakaf & Endowmen", jumlahTerkumpul: 876500, sasaran: 2000000, bilanganPenyumbang: 892, status: "Aktif", ikon: "🎓", warna: "#6A1B9A" },
  { id: "WE-003", nama: "Wakaf Penyelidikan & Inovasi", penerangan: "Membiayai penyelidikan akademik dan projek inovasi oleh pensyarah dan pelajar UTHM.", ptj: "WAKAF", ptjLabel: "Wakaf & Endowmen", jumlahTerkumpul: 456700, sasaran: 1000000, bilanganPenyumbang: 345, status: "Aktif", ikon: "🔬", warna: "#6A1B9A" },
  { id: "WE-004", nama: "Wakaf Masjid UTHM", penerangan: "Pembangunan dan penyelenggaraan kompleks masjid kampus UTHM.", ptj: "WAKAF", ptjLabel: "Wakaf & Endowmen", jumlahTerkumpul: 567800, sasaran: 1500000, bilanganPenyumbang: 678, status: "Aktif", ikon: "🕌", warna: "#6A1B9A" },
  { id: "WE-005", nama: "Wakaf Hospital Pendidikan", penerangan: "Sokongan untuk kemudahan hospital pendidikan UTHM.", ptj: "WAKAF", ptjLabel: "Wakaf & Endowmen", jumlahTerkumpul: 234500, sasaran: 800000, bilanganPenyumbang: 234, status: "Aktif", ikon: "🏥", warna: "#6A1B9A" },
  { id: "WE-006", nama: "Endowmen Kursi Profesor", penerangan: "Dana untuk mewujudkan kursi profesor dalam bidang tertentu di UTHM.", ptj: "WAKAF", ptjLabel: "Wakaf & Endowmen", jumlahTerkumpul: 345000, sasaran: 1000000, bilanganPenyumbang: 145, status: "Aktif", ikon: "👨‍🏫", warna: "#6A1B9A" },
  { id: "WE-007", nama: "Endowmen Biasiswa Pascasiswazah", penerangan: "Biasiswa untuk pelajar pascasiswazah cemerlang di UTHM.", ptj: "WAKAF", ptjLabel: "Wakaf & Endowmen", jumlahTerkumpul: 178900, sasaran: 500000, bilanganPenyumbang: 198, status: "Aktif", ikon: "🎯", warna: "#6A1B9A" },
  { id: "WE-008", nama: "Endowmen Perpustakaan Digital", penerangan: "Membiayai sumber digital dan pangkalan data untuk perpustakaan UTHM.", ptj: "WAKAF", ptjLabel: "Wakaf & Endowmen", jumlahTerkumpul: 89500, sasaran: 300000, bilanganPenyumbang: 123, status: "Aktif", ikon: "📚", warna: "#6A1B9A" },
  { id: "WE-009", nama: "Wakaf Keusahawanan Pelajar", penerangan: "Mendukung aktiviti keusahawanan dan inkubasi bisnes pelajar UTHM.", ptj: "WAKAF", ptjLabel: "Wakaf & Endowmen", jumlahTerkumpul: 67800, sasaran: 200000, bilanganPenyumbang: 89, status: "Aktif", ikon: "💡", warna: "#6A1B9A" },
  { id: "WE-010", nama: "Endowmen Sukan & Ko-Kurikulum", penerangan: "Menyokong aktiviti sukan dan ko-kurikulum pelajar UTHM di peringkat kebangsaan.", ptj: "WAKAF", ptjLabel: "Wakaf & Endowmen", jumlahTerkumpul: 45600, sasaran: 150000, bilanganPenyumbang: 67, status: "Aktif", ikon: "⚽", warna: "#6A1B9A" },

  // Yayasan UTHM
  { id: "YU-001", nama: "Tabung Yayasan UTHM", penerangan: "Tabung utama Yayasan UTHM untuk pembangunan universiti secara menyeluruh.", ptj: "YAYASAN", ptjLabel: "Yayasan UTHM", jumlahTerkumpul: 2345000, sasaran: 10000000, bilanganPenyumbang: 2341, status: "Aktif", ikon: "🌟", warna: "#BF360C" },
  { id: "YU-002", nama: "Biasiswa Yayasan UTHM", penerangan: "Biasiswa penuh untuk pelajar cemerlang dari keluarga berpendapatan rendah.", ptj: "YAYASAN", ptjLabel: "Yayasan UTHM", jumlahTerkumpul: 890000, sasaran: 2000000, bilanganPenyumbang: 678, status: "Aktif", ikon: "🎖️", warna: "#BF360C" },
  { id: "YU-003", nama: "Program Alumni Prihatin", penerangan: "Sumbangan alumni UTHM untuk generasi pelajar akan datang.", ptj: "YAYASAN", ptjLabel: "Yayasan UTHM", jumlahTerkumpul: 567800, sasaran: 1500000, bilanganPenyumbang: 1234, status: "Aktif", ikon: "👥", warna: "#BF360C" },

  // Pusat Kesihatan
  { id: "PK-001", nama: "Tabung Perubatan Pelajar", penerangan: "Bantuan kos rawatan perubatan untuk pelajar UTHM yang memerlukan.", ptj: "KESIHATAN", ptjLabel: "Pusat Kesihatan", jumlahTerkumpul: 156800, sasaran: 300000, bilanganPenyumbang: 345, status: "Aktif", ikon: "💊", warna: "#00695C" },
  { id: "PK-002", nama: "Tabung Peralatan Perubatan", penerangan: "Pengadaan peralatan perubatan moden untuk klinik kesihatan kampus.", ptj: "KESIHATAN", ptjLabel: "Pusat Kesihatan", jumlahTerkumpul: 234500, sasaran: 500000, bilanganPenyumbang: 189, status: "Aktif", ikon: "🩺", warna: "#00695C" },
  { id: "PK-003", nama: "Dana Kesihatan Mental Pelajar", penerangan: "Menyokong program kaunseling dan kesihatan mental pelajar UTHM.", ptj: "KESIHATAN", ptjLabel: "Pusat Kesihatan", jumlahTerkumpul: 89600, sasaran: 200000, bilanganPenyumbang: 234, status: "Aktif", ikon: "🧠", warna: "#00695C" },

  // Fakulti TDHEPA
  { id: "FT-001", nama: "Dana Kebajikan Pelajar TDHEPA", penerangan: "Bantuan kebajikan khusus untuk pelajar Fakulti TDHEPA.", ptj: "FAKULTI", ptjLabel: "Fak. TDHEPA", jumlahTerkumpul: 78900, sasaran: 150000, bilanganPenyumbang: 167, status: "Aktif", ikon: "🔧", warna: "#827717" },
  { id: "FT-002", nama: "Tabung Peralatan Makmal", penerangan: "Pengadaan peralatan makmal terkini untuk program akademik fakulti.", ptj: "FAKULTI", ptjLabel: "Fak. TDHEPA", jumlahTerkumpul: 45600, sasaran: 100000, bilanganPenyumbang: 89, status: "Aktif", ikon: "⚙️", warna: "#827717" },
];

// ─── MONTHLY CHART DATA ──────────────────────────────────────────────────────

export const MONTHLY_DONATIONS = [
  { bulan: "Jan", PHEP: 12500, PUSAT_ISLAM: 28000, WAKAF: 45000, YAYASAN: 35000, KESIHATAN: 8000, FAKULTI: 5500 },
  { bulan: "Feb", PHEP: 18200, PUSAT_ISLAM: 32000, WAKAF: 52000, YAYASAN: 41000, KESIHATAN: 9200, FAKULTI: 6800 },
  { bulan: "Mac", PHEP: 15600, PUSAT_ISLAM: 29500, WAKAF: 48000, YAYASAN: 38500, KESIHATAN: 7800, FAKULTI: 5200 },
  { bulan: "Apr", PHEP: 22300, PUSAT_ISLAM: 41000, WAKAF: 63000, YAYASAN: 52000, KESIHATAN: 11000, FAKULTI: 8900 },
  { bulan: "Mei", PHEP: 19800, PUSAT_ISLAM: 38500, WAKAF: 58000, YAYASAN: 47000, KESIHATAN: 10500, FAKULTI: 7600 },
  { bulan: "Jun", PHEP: 31200, PUSAT_ISLAM: 56000, WAKAF: 82000, YAYASAN: 68000, KESIHATAN: 14500, FAKULTI: 11200 },
  { bulan: "Jul", PHEP: 28500, PUSAT_ISLAM: 49000, WAKAF: 71000, YAYASAN: 58000, KESIHATAN: 12800, FAKULTI: 9800 },
  { bulan: "Ogos", PHEP: 25600, PUSAT_ISLAM: 44500, WAKAF: 65000, YAYASAN: 53000, KESIHATAN: 11500, FAKULTI: 8900 },
  { bulan: "Sep", PHEP: 21400, PUSAT_ISLAM: 36000, WAKAF: 54000, YAYASAN: 44000, KESIHATAN: 9800, FAKULTI: 7200 },
  { bulan: "Okt", PHEP: 27800, PUSAT_ISLAM: 47000, WAKAF: 69000, YAYASAN: 56000, KESIHATAN: 12300, FAKULTI: 9600 },
  { bulan: "Nov", PHEP: 33400, PUSAT_ISLAM: 58000, WAKAF: 84000, YAYASAN: 69000, KESIHATAN: 15200, FAKULTI: 11800 },
  { bulan: "Dis", PHEP: 42100, PUSAT_ISLAM: 72000, WAKAF: 105000, YAYASAN: 86000, KESIHATAN: 19000, FAKULTI: 14500 },
];

// ─── DONATIONS LIST ──────────────────────────────────────────────────────────

export const DONATIONS: Donation[] = [
  { id: "D001", tarikhMasa: "2025-03-05 09:23", noRujukan: "EP-2025-0001", namaPenyumbang: "Penyumbang Demo 01", noKadPengenalan: "000001-00-0001", emel: "demo01@example.com", noTelefon: "01X-0000001", jenisPenyumbang: "Staf UTHM", produk: "Dana Wang Ihsan Am", ptj: "PHEP", jumlah: 500, kaedahBayaran: "Potongan Gaji", status: "Berjaya" },
  { id: "D002", tarikhMasa: "2025-03-05 10:45", noRujukan: "EP-2025-0002", namaPenyumbang: "Penyumbang Demo 02", noKadPengenalan: "000002-00-0002", emel: "demo02@example.com", noTelefon: "01X-0000002", jenisPenyumbang: "Alumni", produk: "Wakaf Am UTHM", ptj: "WAKAF", jumlah: 1000, kaedahBayaran: "Wakaf & Endowmen", status: "Berjaya" },
  { id: "D003", tarikhMasa: "2025-03-05 11:12", noRujukan: "EP-2025-0003", namaPenyumbang: "Penyumbang Demo 03", noKadPengenalan: "000003-00-0003", emel: "demo03@example.com", noTelefon: "01X-0000003", jenisPenyumbang: "Industri", produk: "Endowmen Kursi Profesor", ptj: "WAKAF", jumlah: 5000, kaedahBayaran: "FPX", status: "Berjaya" },
  { id: "D004", tarikhMasa: "2025-03-04 14:30", noRujukan: "EP-2025-0004", namaPenyumbang: "Penyumbang Demo 04", noKadPengenalan: "000004-00-0004", emel: "demo04@example.com", noTelefon: "01X-0000004", jenisPenyumbang: "Orang Awam", produk: "Zakat Fitrah UTHM", ptj: "PUSAT_ISLAM", jumlah: 25, kaedahBayaran: "FPX", status: "Berjaya" },
  { id: "D005", tarikhMasa: "2025-03-04 15:22", noRujukan: "EP-2025-0005", namaPenyumbang: "Penyumbang Demo 05", noKadPengenalan: "000005-00-0005", emel: "demo05@example.com", noTelefon: "01X-0000005", jenisPenyumbang: "Staf UTHM", produk: "Dana Bantuan Kecemasan Pelajar", ptj: "PHEP", jumlah: 200, kaedahBayaran: "Potongan Gaji", status: "Dalam Proses" },
  { id: "D006", tarikhMasa: "2025-03-04 16:45", noRujukan: "EP-2025-0006", namaPenyumbang: "Penyumbang Demo 06", noKadPengenalan: "000006-00-0006", emel: "demo06@example.com", noTelefon: "01X-0000006", jenisPenyumbang: "Orang Awam", produk: "Tabung Yayasan UTHM", ptj: "YAYASAN", jumlah: 500, kaedahBayaran: "Wakaf & Endowmen", status: "Berjaya" },
  { id: "D007", tarikhMasa: "2025-03-03 09:15", noRujukan: "EP-2025-0007", namaPenyumbang: "Penyumbang Demo 07", noKadPengenalan: "000007-00-0007", emel: "demo07@example.com", noTelefon: "01X-0000007", jenisPenyumbang: "Staf UTHM", produk: "Zakat Pendapatan", ptj: "PUSAT_ISLAM", jumlah: 340, kaedahBayaran: "Potongan Gaji", status: "Berjaya" },
  { id: "D008", tarikhMasa: "2025-03-03 10:30", noRujukan: "EP-2025-0008", namaPenyumbang: "Penyumbang Demo 08", noKadPengenalan: "000008-00-0008", emel: "demo08@example.com", noTelefon: "01X-0000008", jenisPenyumbang: "Industri", produk: "Wakaf Penyelidikan & Inovasi", ptj: "WAKAF", jumlah: 2000, kaedahBayaran: "Pindahan Bank", status: "Berjaya" },
  { id: "D009", tarikhMasa: "2025-03-03 14:20", noRujukan: "EP-2025-0009", namaPenyumbang: "Penyumbang Demo 09", noKadPengenalan: "000009-00-0009", emel: "demo09@example.com", noTelefon: "01X-0000009", jenisPenyumbang: "Orang Awam", produk: "Dana Wang Ihsan Am", ptj: "PHEP", jumlah: 100, kaedahBayaran: "FPX", status: "Gagal" },
  { id: "D010", tarikhMasa: "2025-03-02 11:45", noRujukan: "EP-2025-0010", namaPenyumbang: "Penyumbang Demo 10", noKadPengenalan: "000010-00-0010", emel: "demo10@example.com", noTelefon: "01X-0000010", jenisPenyumbang: "Staf UTHM", produk: "Dana Pelajar Asnaf", ptj: "PUSAT_ISLAM", jumlah: 150, kaedahBayaran: "Potongan Gaji", status: "Berjaya" },
  { id: "D011", tarikhMasa: "2025-03-02 13:10", noRujukan: "EP-2025-0011", namaPenyumbang: "Penyumbang Demo 11", noKadPengenalan: "000011-00-0011", emel: "demo11@example.com", noTelefon: "01X-0000011", jenisPenyumbang: "Alumni", produk: "Biasiswa Yayasan UTHM", ptj: "YAYASAN", jumlah: 300, kaedahBayaran: "FPX", status: "Berjaya" },
  { id: "D012", tarikhMasa: "2025-03-01 09:00", noRujukan: "EP-2025-0012", namaPenyumbang: "Penyumbang Demo 12", noKadPengenalan: "000012-00-0012", emel: "demo12@example.com", noTelefon: "01X-0000012", jenisPenyumbang: "Industri", produk: "Tabung Perubatan Pelajar", ptj: "KESIHATAN", jumlah: 800, kaedahBayaran: "Wakaf & Endowmen", status: "Berjaya" },
];

// ─── SALARY DEDUCTIONS ───────────────────────────────────────────────────────

export const SALARY_DEDUCTIONS: SalaryDeduction[] = [
  { id: "SD001", tarikhPermohonan: "2025-03-04", noPerkerja: "UTHM-2345", namaStaf: "Ahmad Faris bin Zulkifli", jabatan: "Jabatan Sains Komputer", tabung: "Dana Wang Ihsan Am", amaunSebulan: 100, tempoh: "12 Bulan", tarikhMula: "2025-04-01", tarikhTamat: "2026-03-31", status: "Dalam Semakan" },
  { id: "SD002", tarikhPermohonan: "2025-03-03", noPerkerja: "UTHM-1234", namaStaf: "Razif bin Abdullah", jabatan: "Jabatan Kejuruteraan Awam", tabung: "Dana Bantuan Kecemasan Pelajar", amaunSebulan: 50, tempoh: "6 Bulan", tarikhMula: "2025-04-01", tarikhTamat: "2025-09-30", status: "Lulus" },
  { id: "SD003", tarikhPermohonan: "2025-03-03", noPerkerja: "UTHM-5678", namaStaf: "Azman bin Che Mat", jabatan: "Pusat Islam", tabung: "Zakat Pendapatan", amaunSebulan: 340, tempoh: "Berterusan", tarikhMula: "2025-04-01", tarikhTamat: "-", status: "Lulus" },
  { id: "SD004", tarikhPermohonan: "2025-03-02", noPerkerja: "UTHM-9012", namaStaf: "Shahrizal bin Kamarudin", jabatan: "Pejabat Pendaftar", tabung: "Dana Pelajar Asnaf", amaunSebulan: 80, tempoh: "12 Bulan", tarikhMula: "2025-04-01", tarikhTamat: "2026-03-31", status: "Dalam Semakan" },
  { id: "SD005", tarikhPermohonan: "2025-03-01", noPerkerja: "UTHM-3456", namaStaf: "Faizah binti Mohamad", jabatan: "Perpustakaan UTHM", tabung: "Tabung Yayasan UTHM", amaunSebulan: 200, tempoh: "6 Bulan", tarikhMula: "2025-03-01", tarikhTamat: "2025-08-31", status: "Gagal", sebabGagal: "Maklumat pekerja tidak lengkap." },
  { id: "SD006", tarikhPermohonan: "2025-02-28", noPerkerja: "UTHM-7890", namaStaf: "Norzaini binti Yahya", jabatan: "Jabatan Matematik", tabung: "Dana Wang Ihsan Am", amaunSebulan: 150, tempoh: "3 Bulan", tarikhMula: "2025-04-01", tarikhTamat: "2025-06-30", status: "Lulus" },
  { id: "SD007", tarikhPermohonan: "2025-02-27", noPerkerja: "UTHM-2109", namaStaf: "Zulkarnain bin Rusli", jabatan: "Jabatan Mekanikal", tabung: "Wakaf Pendidikan", amaunSebulan: 300, tempoh: "12 Bulan", tarikhMula: "2025-03-01", tarikhTamat: "2026-02-28", status: "Dalam Semakan" },
];

// ─── SYSTEM USERS ─────────────────────────────────────────────────────────────

export const SYSTEM_USERS: SystemUser[] = [
  { id: "U001", nama: "Dr. Rashidah binti Mohd Aris", ptj: "PHEP", jawatan: "Pengarah PHEP", emel: "rashidah@uthm.edu.my", peranan: "Kategori 1", status: "Aktif", tarikhSertai: "2024-01-15" },
  { id: "U002", nama: "Ustaz Hafizuddin bin Rahmat", ptj: "Pusat Islam", jawatan: "Pengarah Pusat Islam", emel: "hafizuddin@uthm.edu.my", peranan: "Kategori 1", status: "Aktif", tarikhSertai: "2024-01-15" },
  { id: "U003", nama: "Pn. Norzalinda binti Hassan", ptj: "Wakaf & Endowmen", jawatan: "Pengurus Wakaf", emel: "norzalinda@uthm.edu.my", peranan: "Kategori 1", status: "Aktif", tarikhSertai: "2024-02-01" },
  { id: "U004", nama: "En. Kamarudin bin Abdul Ghani", ptj: "Yayasan UTHM", jawatan: "Ketua Eksekutif", emel: "kamarudin@uthm.edu.my", peranan: "Kategori 1", status: "Aktif", tarikhSertai: "2024-01-20" },
  { id: "U005", nama: "Dr. Fauziah binti Sulaiman", ptj: "Pusat Kesihatan", jawatan: "Pengarah Perubatan", emel: "fauziah@uthm.edu.my", peranan: "Kategori 1", status: "Aktif", tarikhSertai: "2024-02-10" },
  { id: "U006", nama: "Prof. Dr. Ahmad Zairi bin Mat Zuki", ptj: "Fakulti TDHEPA", jawatan: "Dekan Fakulti", emel: "ahmadzairi@uthm.edu.my", peranan: "Kategori 1", status: "Aktif", tarikhSertai: "2024-01-25" },
  { id: "U007", nama: "En. Roslan bin Hamzah", ptj: "Pejabat Bendahari", jawatan: "Bendahari Universiti", emel: "roslan@uthm.edu.my", peranan: "Kategori 1", status: "Aktif", tarikhSertai: "2024-01-15" },
  { id: "U008", nama: "Prof. Madya Dr. Sazilah binti Ahmad Saman", ptj: "TNC HEPA", jawatan: "Timbalan Naib Canselor HEPA", emel: "sazilah@uthm.edu.my", peranan: "Kategori 2", status: "Aktif", tarikhSertai: "2024-01-15" },
  { id: "U009", nama: "Pn. Zalina binti Zakaria", ptj: "PHEP", jawatan: "Penolong Pendaftar", emel: "zalina@uthm.edu.my", peranan: "Kategori 2", status: "Aktif", tarikhSertai: "2024-03-01" },
  { id: "U010", nama: "En. Hairul Nizam bin Mokhtar", ptj: "Pusat Islam", jawatan: "Pembantu Tadbir", emel: "hairul@uthm.edu.my", peranan: "Kategori 2", status: "Tidak Aktif", tarikhSertai: "2024-04-01" },
];

// ─── NOTIFICATIONS ───────────────────────────────────────────────────────────

export const NOTIFICATIONS: Notification[] = [
  { id: "N001", tajuk: "Sumbangan Baharu Diterima", mesej: "Sumbangan RM1,000 diterima daripada Siti Nurhaliza untuk Wakaf Am UTHM.", masa: "5 minit lalu", dibaca: false, jenis: "donation" },
  { id: "N002", tajuk: "Permohonan Potongan Gaji", mesej: "Permohonan potongan gaji baharu daripada Ahmad Faris menunggu kelulusan.", masa: "1 jam lalu", dibaca: false, jenis: "deduction" },
  { id: "N003", tajuk: "Laporan Bulanan Sedia", mesej: "Laporan sumbangan bulan Februari 2025 telah dijana dan sedia untuk dimuat turun.", masa: "2 jam lalu", dibaca: true, jenis: "system" },
  { id: "N004", tajuk: "Sumbangan RM5,000 Diterima", mesej: "Sumbangan besar diterima daripada Mohd Hafiz bin Roslan untuk Endowmen Kursi Profesor.", masa: "3 jam lalu", dibaca: true, jenis: "donation" },
  { id: "N005", tajuk: "Permohonan Diluluskan", mesej: "Permohonan potongan gaji Razif bin Abdullah telah diluluskan oleh Pejabat Bendahari.", masa: "1 hari lalu", dibaca: true, jenis: "deduction" },
];

// ─── ADMIN ROLE PROFILES ─────────────────────────────────────────────────────

export interface AdminProfile {
  id: string;
  nama: string;
  ptj: PtjType;
  jawatan: string;
  emel: string;
  avatar: string;
  peranan: "full" | "readonly" | "bendahari";
}

export const ADMIN_PROFILES: Record<string, AdminProfile> = {
  phep: { id: "A001", nama: "Pentadbir PHEP (Demo)", ptj: "PHEP", jawatan: "Pengarah PHEP", emel: "phep.admin@demo.eprihatin.my", avatar: "PA", peranan: "full" },
  "pusat-islam": { id: "A002", nama: "Pentadbir Pusat Islam (Demo)", ptj: "PUSAT_ISLAM", jawatan: "Pengarah Pusat Islam", emel: "islam.admin@demo.eprihatin.my", avatar: "PI", peranan: "full" },
  wakaf: { id: "A003", nama: "Pentadbir Wakaf (Demo)", ptj: "WAKAF", jawatan: "Pengurus Wakaf", emel: "wakaf.admin@demo.eprihatin.my", avatar: "WA", peranan: "full" },
  yayasan: { id: "A004", nama: "Pentadbir Yayasan (Demo)", ptj: "YAYASAN", jawatan: "Ketua Eksekutif Yayasan", emel: "yayasan.admin@demo.eprihatin.my", avatar: "YA", peranan: "full" },
  kesihatan: { id: "A005", nama: "Pentadbir Kesihatan (Demo)", ptj: "KESIHATAN", jawatan: "Pengarah Perubatan", emel: "kesihatan.admin@demo.eprihatin.my", avatar: "KA", peranan: "full" },
  fakulti: { id: "A006", nama: "Pentadbir Fakulti (Demo)", ptj: "FAKULTI", jawatan: "Dekan Fakulti TDHEPA", emel: "fakulti.admin@demo.eprihatin.my", avatar: "FA", peranan: "full" },
  bendahari: { id: "A007", nama: "Pentadbir Bendahari (Demo)", ptj: "BENDAHARI", jawatan: "Bendahari Universiti", emel: "bendahari.admin@demo.eprihatin.my", avatar: "BA", peranan: "bendahari" },
  tnc: { id: "A008", nama: "Pentadbir TNC HEPA (Demo)", ptj: "TNC_HEPA", jawatan: "Timbalan Naib Canselor HEPA", emel: "tnc.admin@demo.eprihatin.my", avatar: "TA", peranan: "readonly" },
};

// ─── DEMO CREDENTIALS ────────────────────────────────────────────────────────

// Demo accounts — password is a single shared demo key defined in Login.tsx
export const DEMO_CREDENTIALS = [
  { label: "PHEP (Super Admin)", email: "phep.admin@demo.eprihatin.my", role: "phep" },
  { label: "Pusat Islam", email: "islam.admin@demo.eprihatin.my", role: "pusat-islam" },
  { label: "Wakaf & Endowmen", email: "wakaf.admin@demo.eprihatin.my", role: "wakaf" },
  { label: "Yayasan UTHM", email: "yayasan.admin@demo.eprihatin.my", role: "yayasan" },
  { label: "Pusat Kesihatan", email: "kesihatan.admin@demo.eprihatin.my", role: "kesihatan" },
  { label: "Fakulti TDHEPA", email: "fakulti.admin@demo.eprihatin.my", role: "fakulti" },
  { label: "Pejabat Bendahari", email: "bendahari.admin@demo.eprihatin.my", role: "bendahari" },
  { label: "TNC HEPA (Baca Sahaja)", email: "tnc.admin@demo.eprihatin.my", role: "tnc" },
];
