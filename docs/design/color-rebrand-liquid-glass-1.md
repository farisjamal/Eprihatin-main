# Stitch Addendum Prompt — Color Rebrand & Liquid Glass Effect
# Sistem e-Prihatin UTHM

> This prompt is a standalone addendum to the existing e-Prihatin UTHM design.
> Do NOT redesign layouts, screen structures, or any existing flows.
> Only apply the new color system and liquid glass effect as specified below.

---

## 1. NEW COLOR SYSTEM — REPLACE ALL PREVIOUS COLORS

Replace the entire previous color palette with the following light theme. Background is clean white throughout.

| Role | Color | Usage |
|---|---|---|
| Background Base | `#FFFFFF` | Page background, body — all screens |
| Background Surface | `#F8F9FB` | Section backgrounds, content area behind cards |
| Primary Blue | `#0A2FA6` | Primary accent, active nav states, links, focus rings |
| Electric Blue | `#4D9FFF` | Highlights, icon accents, chart lines |
| Blue Glow (subtle) | `rgba(10,47,166,0.08)` | Ambient glow behind hero sections, decorative only |
| Dark Text | `#0F172A` | Headings, primary body text |
| Muted Text | `#64748B` | Secondary labels, placeholders, captions |
| Divider | `#E2E8F0` | Borders, table lines, input outlines |
| Success | `#16A34A` | Status Lulus, Aktif, Berjaya |
| Danger | `#DC2626` | Status Gagal, Ditolak, error states |
| Warning | `#D97706` | Status Dalam Semakan, Menunggu |
| Gold Accent | `#F9A825` | "DERMA" CTA buttons, primary action buttons |
| Glass Surface | `rgba(255,255,255,0.55)` | Liquid glass component background |
| Glass Border | `rgba(255,255,255,0.7)` | Liquid glass component borders |
| Glass Shadow | `rgba(100,116,139,0.15)` | Drop shadow on glass components |

---

## 2. LIQUID GLASS EFFECT — APPLY TO ALL SPECIFIED COMPONENTS

Apply liquid glass morphism styling to the following components across ALL screens. On a white background, liquid glass appears as a frosted, semi-transparent white panel with soft shadows and a subtle border — creating depth without darkness.

### Liquid Glass CSS Specification (light variant):
```
background: rgba(255, 255, 255, 0.55);
backdrop-filter: blur(20px) saturate(160%);
-webkit-backdrop-filter: blur(20px) saturate(160%);
border: 1px solid rgba(255, 255, 255, 0.7);
border-radius: 16px;
box-shadow: 0 4px 24px rgba(100, 116, 139, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
```

### Components to Apply Liquid Glass To:

**Sidebar (ALL PTj admin dashboards):**
- Sidebar base background: `#F8F9FB`
- Sidebar panel itself: liquid glass treatment — creates a frosted panel effect over the content behind it
- Each nav item on hover: `rgba(10,47,166,0.06)` background pill
- Active nav item: `rgba(10,47,166,0.1)` background + left accent bar `#0A2FA6` (3px) + blue text `#0A2FA6`
- Inactive nav item text: `#0F172A`
- Sidebar border-right: `rgba(226,232,240,0.8)`

**Dashboard KPI Cards (ALL PTj dashboards):**
- Full liquid glass treatment on each stat card
- Subtle top edge glow: `box-shadow: 0 0 0 1px rgba(10,47,166,0.1), 0 4px 24px rgba(100,116,139,0.1)`
- Icon: Electric Blue `#4D9FFF` on a `rgba(10,47,166,0.08)` circle background
- Value text: `#0F172A`, bold, large
- Label text: `#64748B`, 13px

**Modals (ALL modals across all screens):**
- Overlay: `rgba(15,23,42,0.4)` + `backdrop-filter: blur(6px)`
- Modal container: liquid glass
- Modal header: `rgba(248,249,251,0.8)` + bottom border `rgba(226,232,240,0.6)`
- Modal title: `#0F172A`, bold

**Top Navigation Bar — Admin (ALL PTj dashboards):**
- Liquid glass treatment
- Background: `rgba(255,255,255,0.75)` + `backdrop-filter: blur(20px)`
- Bottom border: `rgba(226,232,240,0.6)`
- Logo and text: `#0F172A`
- Sticky/fixed positioning

**Top Navigation Bar — Public (Landing page and all public screens):**
- Same liquid glass treatment as admin navbar
- Nav links: `#0F172A`, hover adds `rgba(10,47,166,0.07)` pill background
- "Log Masuk" / CTA button: gold `#F9A825` solid — NOT glass

**Product Cards — Public Pages:**
- Liquid glass on each welfare product card
- On hover: border shifts to `rgba(10,47,166,0.3)`, soft blue shadow `0 8px 24px rgba(10,47,166,0.08)`
- Fund name: `#0F172A`, bold
- Description: `#64748B`
- PTj badge: `rgba(10,47,166,0.08)` bg, `#0A2FA6` text
- "DERMA" button: gold solid — NOT glass

**Form Panels — Public donation form, login page, salary deduction form:**
- Form container card: liquid glass
- Input fields: white background `#FFFFFF`, border `#E2E8F0`, `border-radius: 8px`
- Input focus: border `#0A2FA6`, outer glow `0 0 0 3px rgba(10,47,166,0.1)`
- Input text: `#0F172A`
- Placeholder: `#94A3B8`
- Labels: `#0F172A`, 13px, semi-bold

**Chart Containers — ALL dashboard screens:**
- Chart wrapper: liquid glass card
- Primary chart color: Electric Blue `#4D9FFF`
- Secondary chart color: Gold `#F9A825`
- Chart grid lines: `rgba(226,232,240,0.8)`
- Chart labels: `#64748B`

**Status Badges — ALL screens:**
- Lulus / Aktif: `rgba(22,163,74,0.1)` bg, `#16A34A` text, `rgba(22,163,74,0.2)` border
- Gagal / Ditolak: `rgba(220,38,38,0.1)` bg, `#DC2626` text, `rgba(220,38,38,0.2)` border
- Dalam Semakan: `rgba(217,119,6,0.1)` bg, `#D97706` text, `rgba(217,119,6,0.2)` border

---

## 3. PUBLIC PAGES — LIGHT THEME APPLICATION

Apply the new light color system to ALL public-facing screens:

**Landing Page:**
- Page background: `#FFFFFF`
- Hero section: white base + very subtle radial blue glow `rgba(10,47,166,0.06)` decorative only
- Hero heading: `#0F172A`, bold
- Hero subtext: `#64748B`
- PTj service cards: liquid glass
- Welfare product section background: `#F8F9FB`
- Footer background: `#0F172A` (dark navy — keeps contrast for footer)
- Footer text: `rgba(255,255,255,0.7)`
- Footer headings: `#FFFFFF`

**All Other Public Screens (product listing, detail, forms, receipt):**
- Background: `#FFFFFF` or `#F8F9FB` alternating by section
- All cards and panels: liquid glass
- All headings: `#0F172A`
- All body text: `#64748B`
- Breadcrumbs: `#94A3B8`

---

## 4. ADMIN PAGES — LIGHT THEME APPLICATION

Apply to ALL PTj admin dashboards:

**Page Background:** `#F8F9FB`
**Content Area Background:** `#FFFFFF`
**Sidebar:** Liquid glass as specified in Section 2
**Tables:**
- Table container: liquid glass card wrapper
- Table header row: `#F8F9FB` background, `#64748B` text, 12px uppercase semi-bold
- Table rows: white background
- Row hover: `#F8FAFF` (very light blue tint)
- Row divider: `#E2E8F0`
- Cell text: `#0F172A`
- Action buttons in rows: outlined, white bg, `#E2E8F0` border, `#0F172A` text

**All section headings on admin pages:** `#0F172A`, bold
**All breadcrumbs:** `#94A3B8`
**All page subtitles:** `#64748B`

---

## 5. BUTTONS — FINAL RULES (apply everywhere)

ALL buttons use liquid glass treatment with electric blue as the base accent color. No solid-fill buttons except Danger.

### Liquid Glass Button Base Spec:
```
background: rgba(77, 159, 255, 0.15);
backdrop-filter: blur(12px) saturate(160%);
-webkit-backdrop-filter: blur(12px) saturate(160%);
border: 1px solid rgba(77, 159, 255, 0.35);
border-radius: 10px;
color: #0A2FA6;
font-weight: 600;
height: 40px;
box-shadow: 0 2px 12px rgba(30, 111, 255, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
```

### Hover State (all glass buttons):
```
background: rgba(77, 159, 255, 0.25);
border-color: rgba(77, 159, 255, 0.5);
box-shadow: 0 4px 20px rgba(30, 111, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.7);
```

| Button Type | Variation |
|---|---|
| Primary CTA ("DERMA", "Log Masuk", "Hantar", "Simpan") | Liquid glass + stronger blue tint `rgba(10,47,166,0.2)` + border `rgba(10,47,166,0.45)` + text `#0A2FA6`, bold |
| Secondary ("Batal", "Kembali", "Eksport") | Liquid glass base spec — lighter tint, same border |
| Danger ("Gagal", "Padam") | Liquid glass with red tint — `rgba(220,38,38,0.12)` bg, `rgba(220,38,38,0.3)` border, `#DC2626` text |
| Ghost/Text button | No background, `#0A2FA6` text, underline on hover |
| Disabled | `rgba(203,213,225,0.2)` bg, `rgba(203,213,225,0.3)` border, `#CBD5E1` text, no blur |

---

## 6. WHAT TO KEEP UNCHANGED

- All screen layouts, grid structures, and content hierarchy
- All Bahasa Malaysia text and labels
- All navigation flows and user journeys
- All screen counts and module structures
- All role-based access rules per PTj
- All PTj-specific sidebar menu items and screen content

---

> Apply this color rebrand and liquid glass treatment globally across all 56 screens.
> Do not alter any layout, screen structure, or content from the existing design.