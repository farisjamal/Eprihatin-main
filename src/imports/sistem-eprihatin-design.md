# Stitch Design Prompt — Sistem e-Prihatin UTHM

---

## 1. PROJECT OVERVIEW

Design a complete, production-ready desktop web application called **Sistem e-Prihatin UTHM** — a centralised online welfare donation management platform for Universiti Tun Hussein Onn Malaysia (UTHM). The system enables donors (public, staff, alumni, industry) to contribute to UTHM's welfare funds online, and allows each responsible department (PTj) to manage their own welfare products, view donations, and generate reports — all within a single integrated platform.

The system replaces a fragmented, manual, department-by-department process where each PTj managed their own donations separately with no unified platform, no integrated data, and no ability to generate tax exemption letters.

---

## 2. DESIGN SYSTEM — MANDATORY GLOBAL RULES

### 2.1 Color Palette (extracted from existing landing page)

| Role | Color | Usage |
|---|---|---|
| Primary Green | `#2E7D32` (dark forest green) | Sidebar background, primary buttons, active nav states |
| Accent Gold/Yellow | `#F9A825` | CTA buttons ("DERMA"), highlights, badges, alerts |
| Light Green | `#E8F5E9` | Card backgrounds, table row hovers, sidebar hover states |
| White | `#FFFFFF` | Main content area background, cards |
| Dark Text | `#1A1A1A` | Headings, body text |
| Muted Text | `#6B7280` | Secondary labels, placeholder text, captions |
| Border/Divider | `#E5E7EB` | Card borders, table borders, input outlines |
| Success | `#388E3C` | Status "Lulus", success toasts |
| Danger/Error | `#D32F2F` | Status "Gagal", error states |
| Warning | `#F57C00` | Pending status, warnings |
| Sidebar Text | `#FFFFFF` | Navigation labels on dark sidebar |

### 2.2 Typography

- **Font family**: Inter (primary), fallback to system-ui
- **Headings**: Bold, dark (`#1A1A1A`), sizes: H1 28px, H2 22px, H3 18px
- **Body**: Regular 14px, `#1A1A1A`
- **Labels / captions**: 12px, `#6B7280`
- **All Bahasa Malaysia** for labels, navigation, form fields, status text, and headings

### 2.3 Layout — Admin Interface (ALL PTj Dashboards)

All admin/PTj interfaces share this IDENTICAL layout. No variation is permitted between PTj interfaces.

```
┌─────────────────────────────────────────────────────────┐
│  TOP HEADER BAR (full width, white bg, subtle shadow)   │
│  [e-Prihatin Logo + UTHM crest]   [PTj Name]  [Avatar] │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│  LEFT        │   MAIN CONTENT AREA                      │
│  SIDEBAR     │   (white background, 24px padding)       │
│  (dark       │                                          │
│  green       │                                          │
│  #2E7D32)    │                                          │
│              │                                          │
│  Fixed       │                                          │
│  width:      │                                          │
│  240px       │                                          │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘
```

### 2.4 Sidebar Design Rules

- Background: `#2E7D32`
- Logo + system name at top of sidebar
- PTj name shown below logo (e.g., "Pejabat Hal Ehwal Pelajar")
- Nav items: white text, 14px, with icons (Heroicons or similar line icons)
- Active nav item: white text on slightly lighter green (`#388E3C`), left accent bar in gold `#F9A825`
- Hover state: `#388E3C` background
- Logout button pinned at bottom of sidebar
- NO nested accordion menus — flat navigation only

### 2.5 Component Standards

**Cards:**
- White background, `border-radius: 12px`, subtle box-shadow `0 1px 4px rgba(0,0,0,0.08)`
- 20px internal padding
- Section header in H2 with a 3px bottom border in `#2E7D32`

**Tables:**
- Header row: `#E8F5E9` background, bold 13px labels
- Row hover: `#F1F8E9`
- Alternating rows: white / `#FAFAFA`
- Action buttons in table rows: small, outlined, 28px height
- Always include status badges (pill-shaped)

**Status Badges (pill-shaped):**
- Lulus / Aktif: green bg `#E8F5E9`, green text `#2E7D32`
- Gagal / Tidak Aktif: red bg `#FFEBEE`, red text `#D32F2F`
- Dalam Semakan / Menunggu: amber bg `#FFF8E1`, amber text `#F57C00`

**Buttons:**
- Primary (CTA): gold `#F9A825`, dark text, bold, `border-radius: 8px`, 40px height
- Secondary: white bg, `#2E7D32` border + text
- Danger: red `#D32F2F`, white text
- Disabled: grey `#9E9E9E`

**Form Inputs:**
- Border: `#E5E7EB`, `border-radius: 8px`, 40px height
- Focus: `#2E7D32` border, subtle green glow
- All labels in Bahasa Malaysia, above the input field

**Modals:**
- Centred overlay with `backdrop-filter: blur(2px)`
- Header: `#2E7D32` background, white title text
- Footer: action buttons right-aligned

### 2.6 Public-Facing (Donor/User) Layout

Matches the landing page style shown in the reference screenshot:
- Full-width header navigation: `e-Prihatin` logo left, nav links centre, Login button right (gold)
- Hero section: dark green gradient with white text, UTHM building image
- Content sections on white background with generous vertical spacing
- Footer: dark green background (`#1B5E20`), white text, three columns

---

## 3. USER INTERFACE — PUBLIC / PENYUMBANG (DONOR) SIDE

### Screen 3.1 — Landing Page (reference design already exists, match this style exactly)

- Top navigation: Logo left | Utama, Perkhidmatan, Soalan Lazim, Hubungi Kami | Login/Masuk button (gold)
- Hero section: Full-width dark green gradient banner, UTHM campus image background, heading "e-Prihatin — Pilihan Untuk Memberi Bantuan", subtext, two CTA buttons: "Mula Menderma" (gold) and "Lihat Laporan" (outlined white)
- PTj Services row: Icon cards for each PTj — Pejabat Hal Ehwal Pelajar, Pusat Islam, Wakaf dan Endowmen, Semua Fakulti, Yayasan UTHM — horizontally scrollable with active/selected state
- Welfare Products Grid: 2×3 card grid per PTj section, each card shows: fund icon, fund name, description, "Ketahui Lanjut" link and "DERMA" gold button
- Footer: three-column dark green footer with quick links, system info, and vision statement

### Screen 3.2 — Senarai Produk Kebajikan (Welfare Products Listing)

- Breadcrumb: Utama > Perkhidmatan
- PTj filter tabs across the top: All | PHEP | Pusat Islam | Wakaf & Endowmen | Yayasan UTHM | Pusat Kesihatan | Fakulti TDHEPA
- Product cards in a 3-column grid:
  - Fund icon (colour-coded by PTj)
  - Fund name (bold)
  - PTj label (small badge)
  - Short description
  - Target amount (if applicable)
  - "Ketahui Lanjut" text link
  - "DERMA" gold button

**Welfare Products to show (from FSR):**
- Dana Wang Ihsan (6 products under PHEP)
- Tabung Zakat (12 products under Pusat Islam)
- Tabung Wakaf dan Endowmen (10 products)
- Yayasan UTHM products
- Pusat Kesihatan products
- Fakulti TDHEPA products

### Screen 3.3 — Butiran Produk Kebajikan (Fund Detail Page)

- Back navigation
- Fund name as page title (H1)
- PTj badge
- Full description of the welfare product
- Fund statistics: Total collected, number of donors
- Donation form on right side:
  - "Jumlah Sumbangan (RM)" — number input
  - "Nama Penyumbang" — text input
  - "No. Kad Pengenalan / Passport" — text input
  - "E-mel" — email input
  - "No. Telefon" — tel input
  - "Jenis Penyumbang" — dropdown: Staf UTHM / Alumni / Industri / Orang Awam
  - "Kaedah Pembayaran" — radio: "Tabung Wakaf & Endowmen UTHM" / "Potongan Gaji (Staf UTHM sahaja)"
  - Conditional: if Potongan Gaji selected → show notice that salary deduction form will follow
  - "DERMA SEKARANG" gold CTA button

### Screen 3.4 — Pembayaran (Payment Gateway — Wakaf & Endowmen)

- Summary panel: fund name, donor name, amount
- Payment method selector (FPX / bank transfer simulation)
- "Sahkan Pembayaran" button
- Loading/processing state indicator

### Screen 3.5 — Resit & Surat Pengecualian Cukai (Receipt + Tax Exemption)

- Success confirmation header (green checkmark icon)
- "Terima kasih atas sumbangan anda!"
- Donation receipt card:
  - Reference number
  - Date & time
  - Donor name & IC number
  - Fund name
  - Amount donated
  - Payment method
- Tax exemption letter card (automatically generated):
  - UTHM letterhead
  - Donor details
  - Donation details
  - Tax exemption statement
- Two action buttons: "Muat Turun Resit (PDF)" and "Muat Turun Surat Pengecualian Cukai (PDF)"
- "Kembali ke Laman Utama" link

### Screen 3.6 — Borang Potongan Gaji (Salary Deduction Form — for UTHM Staff)

- Shown after donor selects "Potongan Gaji" as payment method
- Form fields:
  - "No. Pekerja" — text input
  - "Jabatan" — text input
  - "Amaun Potongan Sebulan (RM)" — number input
  - "Tarikh Mula Potongan" — date picker
  - "Tempoh Potongan" — dropdown: 3 bulan / 6 bulan / 12 bulan / Berterusan
  - "Tabung Pilihan" — auto-filled from previous selection
- Submit button: "Hantar Permohonan Potongan Gaji"
- Information notice: "Permohonan anda akan disemak oleh Pejabat Bendahari dalam masa 3 hari bekerja."

### Screen 3.7 — Semak Sejarah Sumbangan (Donation History — for logged-in donors)

- Table: Date | Fund | Amount | Method | Status | Action
- Status badges: Berjaya / Dalam Proses / Gagal
- Filter by: date range, fund, status
- "Muat Turun Resit" action per row

### Screen 3.8 — Semak Kelulusan Potongan Gaji

- Table of salary deduction applications for this donor
- Columns: Tarikh Hantar | Tabung | Amaun/Bulan | Tempoh | Status | Tarikh Kemaskini
- Status: Lulus (green) / Gagal (red) / Dalam Semakan (amber)

---

## 4. LOGIN PAGE (SHARED — ALL ROLES)

Single login page for ALL users (admin PTj, Bendahari, TNC HEPA, read-only admin):

- Centred card on dark green gradient background
- e-Prihatin logo + UTHM crest at top
- "Log Masuk Pentadbir" title
- Fields: "E-mel / No. Pekerja", "Kata Laluan"
- "Log Masuk" primary button (gold)
- Footer note: "Sistem e-Prihatin UTHM — Universiti Tun Hussein Onn Malaysia"
- After login, system automatically routes each user to their PTj-specific dashboard based on their role. User does NOT choose their PTj manually.

---

## 5. ADMIN INTERFACES — PTj-BASED ROLE SYSTEM

**CRITICAL RULE**: Each PTj logs in and is automatically shown ONLY their authorised interface. All PTj interfaces share the IDENTICAL sidebar structure and layout system but show only the modules and data relevant to their PTj.

---

### 5A. PHEP — Pejabat Hal Ehwal Pelajar

**Role**: Full access admin. Manages Dana Wang Ihsan (6 products). System owner/super-admin.

**Sidebar navigation:**
- 📊 Dashboard
- 🎁 Produk Kebajikan (Dana Wang Ihsan)
- 💰 Senarai Sumbangan
- 📋 Laporan & Statistik
- 🖨️ Cetakan
- 👥 Pengurusan Pengguna *(PHEP-only — for managing all PTj user accounts)*
- ⚙️ Tetapan Sistem *(PHEP-only)*

**Screen 5A-1: Dashboard PHEP**
- Top stats row (4 cards): Total Sumbangan Hari Ini (RM) | Total Penyumbang Aktif | Produk Aktif | Permohonan Potongan Gaji Menunggu
- Chart: Bar chart — Monthly donation trend (12 months) for Dana Wang Ihsan
- Recent donations table: last 10 donations — donor name, fund, amount, method, status
- Quick actions: "Tambah Produk", "Jana Laporan", "Cetak Senarai"

**Screen 5A-2: Produk Kebajikan — Senarai**
- Page title: "Produk Kebajikan — Dana Wang Ihsan"
- "Tambah Produk" gold button top right
- Table: Bil | Nama Produk | Penerangan Ringkas | Jumlah Disumbang (RM) | Status (Aktif/Tidak Aktif) | Tindakan (Edit / Nyahaktif)
- 6 products shown (Dana Wang Ihsan breakdown)

**Screen 5A-3: Produk Kebajikan — Tambah / Edit**
- Modal or full page form:
  - "Nama Produk" — text input
  - "Penerangan" — textarea
  - "Sasaran Sumbangan (RM)" — number input (optional)
  - "Status" — toggle: Aktif / Tidak Aktif
  - "Gambar/Ikon Produk" — file upload
- Save and Cancel buttons

**Screen 5A-4: Senarai Sumbangan**
- Filter bar: Date range | Produk | Kaedah Bayaran | Status
- Table: Tarikh | No. Rujukan | Nama Penyumbang | Produk | Jumlah (RM) | Kaedah | Status | Tindakan (Lihat Butiran)
- Export button: "Eksport Excel"
- Pagination

**Screen 5A-5: Butiran Sumbangan (Modal/Drawer)**
- Full donor details
- Payment details
- Receipt preview
- Tax exemption letter status
- "Jana Semula Resit" button if needed

**Screen 5A-6: Laporan & Statistik**
- Filter: PTj (All or specific) | Date range | Fund
- Summary cards: Total sumbangan (RM) | Bilangan penyumbang | Purata sumbangan (RM)
- Stacked bar chart: Comparison across all 6 PTj by month
- Pie chart: Breakdown by payment method (Wakaf & Endowmen vs Potongan Gaji)
- Table: Per-product summary — Nama Produk | PTj | Bilangan Sumbangan | Jumlah (RM)
- "Jana Laporan PDF" gold button | "Eksport Excel" secondary button

**Screen 5A-7: Cetakan**
- Print preview page
- Dropdown: select report type (Senarai Sumbangan / Laporan Statistik / Senarai Penyumbang)
- Date range filter
- "Cetak" button and "Muat Turun PDF" button

**Screen 5A-8: Pengurusan Pengguna** *(PHEP-only feature)*
- Table of all system users across all PTj:
  - Nama | PTj | Jawatan | E-mel | Peranan | Status | Tindakan
- "Tambah Pengguna" button
- Role filter: Kategori 1 (Full Access) | Kategori 2 (Read-only) | Kategori 3 (Penyumbang)
- Edit user modal: change role, activate/deactivate, reset password

---

### 5B. Pusat Islam

**Role**: Full access admin for Tabung Zakat (12 products).

**Sidebar navigation:**
- 📊 Dashboard
- 🎁 Produk Kebajikan (Tabung Zakat)
- 💰 Senarai Sumbangan
- 📋 Laporan & Statistik
- 🖨️ Cetakan

**Screen 5B-1: Dashboard Pusat Islam**
- Stats cards: Total Sumbangan Zakat (RM) | Penyumbang Hari Ini | Produk Zakat Aktif | Sumbangan Bulan Ini
- Line chart: Monthly Zakat collection trend
- Recent donations table specific to Zakat funds

**Screen 5B-2: Produk Kebajikan — Tabung Zakat**
- "Tambah Produk Zakat" button
- Table: 12 Zakat products listed with Bil | Nama Produk | Penerangan | Jumlah Terkumpul (RM) | Status | Tindakan
- Edit/view per product

**Screen 5B-3: Senarai Sumbangan (Zakat only)**
- Same layout as 5A-4 but filtered to Zakat-only data
- Note: Zakat donations show specific zakat type (Zakat Fitrah / Zakat Harta / etc.)
- Filter by: Jenis Zakat | Date range | Status

**Screen 5B-4: Laporan & Statistik (Zakat)**
- Zakat-specific report: breakdown by zakat type
- Bar chart by month
- "Jana Laporan PDF" button

**Screen 5B-5: Cetakan**
- Same as 5A-7 but scoped to Pusat Islam data only

---

### 5C. Wakaf dan Endowmen

**Role**: Full access admin for Tabung Wakaf & Endowmen (10 products). Also acts as payment gateway manager.

**Sidebar navigation:**
- 📊 Dashboard
- 🎁 Produk Kebajikan (Wakaf & Endowmen)
- 💰 Senarai Sumbangan
- 🔄 Pengurusan Pembayaran *(Wakaf-specific — manages payment gateway transactions)*
- 📋 Laporan & Statistik
- 🖨️ Cetakan

**Screen 5C-1: Dashboard Wakaf & Endowmen**
- Stats: Total Wakaf Terkumpul (RM) | Total Endowmen (RM) | Transaksi Hari Ini | Penyumbang Baharu
- Dual chart: Wakaf vs Endowmen monthly comparison
- Recent transactions table

**Screen 5C-2: Produk Kebajikan — Wakaf & Endowmen**
- 10 products listed
- Table with same structure as 5A-2
- Separate tabs: "Wakaf" | "Endowmen"

**Screen 5C-3: Senarai Sumbangan**
- Same layout scoped to Wakaf & Endowmen only
- Additional column: "Jenis" (Wakaf / Endowmen)

**Screen 5C-4: Pengurusan Pembayaran** *(Wakaf-specific)*
- Payment transactions list from the payment gateway
- Columns: Tarikh | No. Transaksi | Nama Penyumbang | Jumlah (RM) | Status Bayaran | Tindakan
- Status: Berjaya / Gagal / Dikembalikan
- "Semak Transaksi" action button per row

**Screen 5C-5: Laporan & Statistik**
- Wakaf & Endowmen specific — same report structure

**Screen 5C-6: Cetakan**
- Standard print screen scoped to Wakaf & Endowmen data

---

### 5D. Yayasan UTHM

**Role**: Full access admin for Yayasan UTHM welfare products.

**Sidebar navigation:**
- 📊 Dashboard
- 🎁 Produk Kebajikan (Yayasan UTHM)
- 💰 Senarai Sumbangan
- 📋 Laporan & Statistik
- 🖨️ Cetakan

**Screen 5D-1: Dashboard Yayasan UTHM**
- Stats: Total Sumbangan Yayasan | Penyumbang Aktif | Produk Aktif
- Bar chart: Monthly trend
- Recent donations table

**Screen 5D-2: Produk Kebajikan — Yayasan UTHM**
- Table of Yayasan products with standard CRUD controls

**Screen 5D-3: Senarai Sumbangan**
- Scoped to Yayasan UTHM data

**Screen 5D-4: Laporan & Statistik**
- Yayasan UTHM specific report

**Screen 5D-5: Cetakan**
- Standard print screen

---

### 5E. Pusat Kesihatan Universiti

**Role**: Full access admin for Pusat Kesihatan welfare products.

**Sidebar navigation:**
- 📊 Dashboard
- 🎁 Produk Kebajikan (Pusat Kesihatan)
- 💰 Senarai Sumbangan
- 📋 Laporan & Statistik
- 🖨️ Cetakan

**Screen 5E-1: Dashboard Pusat Kesihatan**
- Stats: Total Sumbangan | Penyumbang Hari Ini | Produk Aktif
- Chart: Monthly donations for Pusat Kesihatan products
- Recent donations

**Screen 5E-2: Produk Kebajikan — Pusat Kesihatan**
- Standard product management table

**Screen 5E-3: Senarai Sumbangan**
- Scoped to Pusat Kesihatan

**Screen 5E-4: Laporan & Statistik**
- Health-centre specific report

**Screen 5E-5: Cetakan**
- Standard print screen

---

### 5F. Fakulti-Fakulti TDHEPA

**Role**: Full access admin per faculty. Each faculty sees only their own welfare products.

**Sidebar navigation:**
- 📊 Dashboard
- 🎁 Produk Kebajikan (Nama Fakulti)
- 💰 Senarai Sumbangan
- 📋 Laporan & Statistik
- 🖨️ Cetakan

**Screen 5F-1: Dashboard Fakulti**
- Faculty name shown prominently in sidebar and page header
- Stats: Total Sumbangan Fakulti | Penyumbang | Produk Aktif
- Monthly donations chart
- Recent donations table

**Screen 5F-2: Produk Kebajikan — Fakulti**
- Faculty-scoped product list

**Screen 5F-3: Senarai Sumbangan**
- Scoped to that faculty's products

**Screen 5F-4: Laporan & Statistik**
- Faculty-level report only

**Screen 5F-5: Cetakan**
- Faculty-scoped print

---

### 5G. Pejabat Bendahari

**Role**: Full access for salary deduction (potongan gaji) approval workflow. Also has read access to donation reports.

**Sidebar navigation:**
- 📊 Dashboard
- 📝 Permohonan Potongan Gaji
- ✅ Kelulusan Potongan Gaji
- 📋 Laporan Sumbangan (Read-only)
- 🖨️ Cetakan

**Screen 5G-1: Dashboard Pejabat Bendahari**
- Stats cards: Permohonan Baharu | Dalam Semakan | Lulus Hari Ini | Gagal Hari Ini
- Table: Recent incoming salary deduction applications with status
- Alert badge: "X Permohonan Menunggu Tindakan" (amber alert bar at top if pending applications exist)

**Screen 5G-2: Senarai Permohonan Potongan Gaji**
- Filter: Status (Semua / Menunggu / Dalam Semakan / Lulus / Gagal) | Date range
- Table: Bil | Tarikh Permohonan | No. Pekerja | Nama Staf | Tabung | Amaun/Bulan (RM) | Tempoh | Status | Tindakan
- "Semak" action button → opens detail modal
- Bulk action: "Lulus Semua Yang Dipilih" (with confirmation)

**Screen 5G-3: Butiran & Semakan Permohonan (Modal)**
- Staff details: Nama, No. Pekerja, Jabatan
- Application details: Tabung, Amaun Potongan Sebulan, Tarikh Mula, Tempoh
- "Perlu Pindaan?" toggle
  - If YES: show editable fields — Tarikh Mula, Tarikh Tamat, Amaun Potongan Sebulan
- Decision buttons:
  - "LULUS" (green button) — sets status to LULUS
  - "GAGAL" (red button) — requires reason input
  - "Pindaan & Lulus" (amber) — saves amendments then approves
- Status updates immediately visible, system notifies donor

**Screen 5G-4: Kelulusan Potongan Gaji — Senarai Diluluskan**
- Table of all approved deductions
- Columns: Nama Staf | Tabung | Amaun/Bulan | Tarikh Mula | Tarikh Tamat | Status Potongan Semasa
- Actions: Tangguhkan / Tamatkan potongan

**Screen 5G-5: Laporan Sumbangan (Read-only)**
- Same report view as PHEP 5A-6 but read-only (no edit/print controls)
- Cannot modify data, only view summary statistics

**Screen 5G-6: Cetakan**
- Print salary deduction approval lists
- Date range filter
- "Cetak Senarai Potongan Gaji" button

---

### 5H. TNC HEPA / Timbalan Dekan HEPA

**Role**: Read-only. Can ONLY view donation reports and statistics. Cannot add, edit, delete, or print anything.

**Sidebar navigation:**
- 📊 Papan Pemuka (Dashboard — read-only)
- 📋 Laporan Sumbangan
- 📈 Statistik Produk Bantuan

**Screen 5H-1: Dashboard (Read-only)**
- Top-of-page notice bar: "Mod Tontonan Sahaja — Anda tidak mempunyai kebenaran untuk mengubah data."
- Summary cards (no interactivity): Total Sumbangan Keseluruhan UTHM (RM) | Jumlah Penyumbang | Produk Aktif | PTj Terlibat
- University-wide donation trend chart (all PTj combined)
- Top 5 most-donated funds (ranked list)
- Breakdown by PTj (donut chart)

**Screen 5H-2: Laporan Sumbangan (Read-only)**
- Filter: PTj | Date range (only for viewing, no export buttons)
- Full summary report view: same data as PHEP report screen
- NO "Jana Laporan", "Eksport Excel", or "Cetak" buttons — these are completely hidden
- Data is visible but no action buttons present

**Screen 5H-3: Statistik Produk Bantuan (Read-only)**
- Product-level statistics across all PTj
- Bar chart: Top 10 products by total donations
- Table: All active products — Nama Produk | PTj | Bilangan Sumbangan | Jumlah (RM)
- No action buttons

---

## 6. CROSS-CUTTING SCREENS

### Screen 6.1 — Profil Pengguna (All logged-in users)
- Avatar, name, PTj/role
- Change password form
- Last login info

### Screen 6.2 — Notifikasi
- Bell icon in header for all admin users
- Dropdown: recent notifications (new donation, deduction approval status update)
- Mark as read / clear all

### Screen 6.3 — Halaman Ralat 404
- e-Prihatin branded, green theme
- "Halaman tidak dijumpai" message
- "Kembali ke Laman Utama" button

### Screen 6.4 — Unauthorized Access (403)
- Shown if a PTj user tries to access another PTj's data via direct URL
- "Anda tidak mempunyai kebenaran untuk mengakses halaman ini."
- Redirect to their own dashboard

---

## 7. DESIGN CONSISTENCY CHECKLIST (enforce across ALL screens)

- [ ] All screens use the same sidebar (240px, #2E7D32)
- [ ] All admin headers show: e-Prihatin logo | PTj name | user avatar + name
- [ ] Status badges are always pill-shaped, colour-coded consistently
- [ ] All buttons follow the 3-type system: Primary (gold), Secondary (outlined green), Danger (red)
- [ ] All tables have the same header styling (#E8F5E9 background)
- [ ] All forms use the same input field styling
- [ ] All text is in Bahasa Malaysia
- [ ] No PTj interface shows data or modules from another PTj
- [ ] TNC HEPA interface has NO create/edit/delete/print buttons anywhere
- [ ] Pejabat Bendahari shows ONLY salary deduction workflow + read-only reports
- [ ] Charts use the same color palette as the design system (greens, gold, soft variants)
- [ ] Page titles are consistently placed below the breadcrumb at H1 size
- [ ] Breadcrumbs present on all admin pages (e.g., "Dashboard > Produk Kebajikan > Tambah Produk")

---

## 8. SCREEN COUNT SUMMARY

| Interface | Screens |
|---|---|
| Public / Penyumbang | 8 screens |
| Login | 1 screen |
| PHEP Admin | 8 screens |
| Pusat Islam | 5 screens |
| Wakaf & Endowmen | 6 screens |
| Yayasan UTHM | 5 screens |
| Pusat Kesihatan | 5 screens |
| Fakulti TDHEPA | 5 screens |
| Pejabat Bendahari | 6 screens |
| TNC HEPA / Timbalan Dekan | 3 screens |
| Cross-cutting (Profile, Notif, 404, 403) | 4 screens |
| **TOTAL** | **56 screens** |

---

## 9. REFERENCE DESIGN NOTE

The existing landing page (screenshot provided) must be used as the exact visual reference for:
- Color palette (dark green #2E7D32, gold #F9A825)
- Typography scale
- Card style (rounded corners, subtle shadow)
- Button style (gold "DERMA" button, outlined secondary button)
- Navigation bar structure
- Footer layout and dark green footer background

All other screens must feel like they are part of the SAME product — a natural extension of this landing page's design language into the admin and donor-flow screens.

---

*End of Stitch Prompt — Sistem e-Prihatin UTHM*
*Prepared based on: Kertas Kerja Cadangan Pembangunan Sistem Baharu, Feasibility Study Report (FSR), and Carta Alir Proses Sumbangan*