# Stitch Addendum Prompt — Donor Flow (No Login Required)

> This prompt is an addendum to the existing e-Prihatin UTHM design.
> Do NOT redesign or override any existing screens.
> Only add or update the screens specified below.

---

## CONTEXT

The existing design currently routes "Semak Sumbangan Saya" (footer link) without any authentication screen. This is intentional and correct. Donors do NOT need to register or log in to donate or check their donation history. Update the following screens to reflect this flow accurately.

---

## UPDATE Screen 3.7 — Semak Sumbangan Saya (No Login Required)

Replace any login/register gate on this screen with a **verification form** instead:

- Page title: "Semak Sejarah Sumbangan Anda"
- Short instruction text: "Masukkan maklumat anda untuk melihat sejarah sumbangan."
- Two fields:
  - "No. Kad Pengenalan / Passport" — text input
  - "E-mel" — email input
- "Semak Sekarang" gold CTA button
- After submission → display donation history table below the form:
  - Columns: Tarikh | Produk Kebajikan | PTj | Jumlah (RM) | Kaedah | Status badge | Tindakan
  - "Tindakan" column: download receipt icon + download tax letter icon (if applicable)
- If no records found: show empty state — "Tiada rekod sumbangan dijumpai untuk maklumat ini."

---

## UPDATE Screen 3.8 — Semak Kelulusan Potongan Gaji (Login Required — Staff Only)

This screen requires login. Add a clear entry point distinction:

- On the "Semak Sumbangan Saya" page, add a **secondary link** below the verification form:
  - Text: "Staf UTHM? Semak status potongan gaji anda di sini →"
  - This link routes to the **staff login page** (existing Screen 4 — Login Page)
  - After login, staff is routed to their salary deduction status screen

---

## SUMMARY — Authentication Rules to Apply Across All Public Screens

| Tindakan | Perlu Log Masuk? |
|---|---|
| Melayari produk kebajikan | Tidak |
| Membuat sumbangan (Wakaf & Endowmen) | Tidak |
| Muat turun resit & surat cukai | Tidak |
| Semak sejarah sumbangan | Tidak — guna IC + e-mel sahaja |
| Permohonan potongan gaji | Ya — staf UTHM sahaja |
| Semak status potongan gaji | Ya — staf UTHM sahaja |

---

> Apply these changes only to Screens 3.7 and 3.8.
> All other screens, design system rules, and admin interfaces remain unchanged.