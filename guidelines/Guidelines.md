# System Guidelines — Sistem e-Prihatin UTHM

---

# General Guidelines

* Desktop-only layout. Minimum width 1280px. Never design for mobile or tablet.
* Use flexbox and grid for all layouts. Only use absolute positioning for decorative elements or overlays.
* All UI text, labels, button text, headings, placeholders, and error messages must be in Bahasa Malaysia. English only for technical acronyms (PTj, KPI, PDF, Excel, FPX, Dashboard).
* Keep components consistent across all screens. Never introduce a new pattern that doesn't exist elsewhere in the system.
* All admin PTj dashboards share the same layout structure. Never vary the sidebar, header, or content area structure between PTj interfaces.
* Role-based access is absolute. TNC HEPA and Timbalan Dekan screens must have zero create/edit/delete/approve buttons — not hidden, not disabled, completely absent.
* After admin login, the system routes automatically to the correct PTj dashboard. Never show a PTj selection screen.

---

# Design System Guidelines

* Base font size: 14px
* Font family: Inter, fallback system-ui
* All date formats: "DD MMM YYYY" (e.g., "10 Jun 2025")
* All currency formats: "RM 1,000.00"
* Status badges are always pill-shaped. Never use square or rectangular badges.
* Never use a dropdown if there are 2 or fewer options — use radio buttons or toggle instead.
* Breadcrumbs must be present on all admin pages.
* Page title (H1) always sits directly below the breadcrumb.
* Never use nested accordion menus in the sidebar. Flat navigation only.
* Charts always use Electric Blue `#4D9FFF` as primary color and Gold `#F9A825` as secondary.
* Bottom toolbar (if used on any screen) must never exceed 4 items.

---

# Color System

* Background Base: `#FFFFFF`
* Background Surface: `#F8F9FB`
* Primary Dark Blue: `#0A2FA6`
* Electric Blue: `#4D9FFF`
* Gold Accent: `#F9A825`
* Dark Text: `#0F172A`
* Muted Text: `#64748B`
* Divider: `#E2E8F0`
* Success: `#16A34A`
* Danger: `#DC2626`
* Warning: `#D97706`
* Footer Background: `#0F172A`

---

# Liquid Glass

All of the following components must use liquid glass treatment globally across all screens:

* Sidebar
* Top navigation bar (admin and public)
* Dashboard KPI cards
* Product cards (public pages)
* Modals
* Form container panels
* Chart container cards

### Liquid Glass Spec (light variant):
```
background: rgba(255, 255, 255, 0.55);
backdrop-filter: blur(20px) saturate(160%);
border: 1px solid rgba(255, 255, 255, 0.7);
border-radius: 16px;
box-shadow: 0 4px 24px rgba(100, 116, 139, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
```

* Never apply liquid glass to table rows, breadcrumbs, or plain text sections.
* Liquid glass must always sit against a white or `#F8F9FB` background to render correctly.

---

# Button

Buttons are interactive elements used to trigger actions throughout the system. All buttons use liquid glass treatment with Electric Blue as the base accent.

### Liquid Glass Button Base Spec:
```
background: rgba(77, 159, 255, 0.15);
backdrop-filter: blur(12px) saturate(160%);
border: 1px solid rgba(77, 159, 255, 0.35);
border-radius: 10px;
font-weight: 600;
height: 40px;
color: #0A2FA6;
box-shadow: 0 2px 12px rgba(10, 47, 166, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
```

### Hover State:
```
background: rgba(77, 159, 255, 0.25);
border-color: rgba(77, 159, 255, 0.5);
box-shadow: 0 4px 20px rgba(10, 47, 166, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
```

### Variants

* Primary Button
  * Purpose: Main action per section (Simpan, Hantar, Log Masuk, DERMA)
  * Visual Style: Liquid glass with stronger blue tint `rgba(10,47,166,0.2)`, border `rgba(10,47,166,0.45)`, text `#0A2FA6`, bold
  * Usage: One primary button per form or modal

* Secondary Button
  * Purpose: Supporting or alternative actions (Batal, Kembali, Eksport)
  * Visual Style: Liquid glass base spec — lighter tint
  * Usage: Appears alongside primary button

* Danger Button
  * Purpose: Destructive actions (Gagal, Padam, Tolak)
  * Visual Style: Liquid glass with red tint — `rgba(220,38,38,0.12)` bg, `rgba(220,38,38,0.3)` border, `#DC2626` text
  * Usage: Always paired with a confirmation dialog before executing

* Ghost Button
  * Purpose: Least important actions, inline text actions
  * Visual Style: No background, no border, `#0A2FA6` text, underline on hover
  * Usage: For actions that should be available but not emphasized

* Disabled Button
  * Visual Style: `rgba(203,213,225,0.2)` bg, `rgba(203,213,225,0.3)` border, `#CBD5E1` text, no blur effect
  * Usage: When action is unavailable

---

# Sidebar

* Width: 240px, fixed
* Background: liquid glass over `#F8F9FB` base
* Top: e-Prihatin logo + system name
* Below logo: PTj name label (e.g., "Pejabat Hal Ehwal Pelajar"), 12px, muted
* Nav items: 14px, `#0F172A` text, line icon left-aligned
* Active state: `rgba(10,47,166,0.1)` background pill + 3px left accent bar `#0A2FA6` + text `#0A2FA6`
* Hover state: `rgba(10,47,166,0.06)` background pill
* Logout button: pinned at bottom, danger ghost style
* No nested accordion menus — flat list only

---

# Top Navigation Bar

* Height: 64px
* Liquid glass treatment: `rgba(255,255,255,0.75)` + `backdrop-filter: blur(20px)`
* Bottom border: `rgba(226,232,240,0.6)`
* Left: e-Prihatin logo + PTj name (admin) or nav links (public)
* Right: notification bell + avatar with initials + PTj badge (admin) / Login button (public)
* Sticky/fixed on scroll

---

# Cards

* Border radius: 16px
* Liquid glass treatment
* Internal padding: 20px
* Section header: H2, `#0F172A`, bold, with 3px bottom border in `#0A2FA6`
* On hover (product cards): border shifts to `rgba(10,47,166,0.3)`, soft blue shadow

---

# Tables

* Container: liquid glass card wrapper
* Header row: `#F8F9FB` background, `#64748B` text, 12px uppercase, semi-bold
* Row height: 48px
* Row divider: `#E2E8F0`
* Row hover: `#F8FAFF`
* Cell text: `#0F172A`, 14px
* Action buttons in rows: 28px height, secondary button style
* Status badges: always pill-shaped, color-coded as defined in Color System
* Always include pagination for tables with more than 10 rows

---

# Forms

* All labels: above input field, 13px, semi-bold, `#0F172A`
* Input height: 40px
* Input border: `#E2E8F0`, `border-radius: 8px`
* Input background: `#FFFFFF`
* Focus state: border `#0A2FA6`, outer glow `0 0 0 3px rgba(10,47,166,0.1)`
* Placeholder text: `#94A3B8`
* Error text: 12px, `#DC2626`, displayed directly below the relevant field
* Required field indicator: red asterisk `*` after label
* Form container: liquid glass card

---

# Modals

* Max width: 560px (standard), 800px (wide/detail modals)
* Overlay: `rgba(15,23,42,0.4)` + `backdrop-filter: blur(6px)`
* Container: liquid glass
* Header: `rgba(248,249,251,0.8)` + bottom border `rgba(226,232,240,0.6)`, bold title `#0F172A`
* Body: 24px padding
* Footer: right-aligned buttons, always Primary + Secondary pair (or Primary + Danger for destructive actions)
* Always include a close (×) icon in the top-right of the header

---

# Status Badges

Badges are always pill-shaped with soft-tinted background. Never use solid fill.

* Lulus / Aktif / Berjaya: `rgba(22,163,74,0.1)` bg, `#16A34A` text, `rgba(22,163,74,0.2)` border
* Gagal / Ditolak / Tidak Aktif: `rgba(220,38,38,0.1)` bg, `#DC2626` text, `rgba(220,38,38,0.2)` border
* Dalam Semakan / Menunggu: `rgba(217,119,6,0.1)` bg, `#D97706` text, `rgba(217,119,6,0.2)` border
* Draf: `rgba(100,116,139,0.1)` bg, `#64748B` text, `rgba(100,116,139,0.2)` border