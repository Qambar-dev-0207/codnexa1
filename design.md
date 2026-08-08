# 🎨 Design Clone Reference: Vivid Motion

## Purpose
This file contains the design clone specifications for [Vivid Motion](https://vividmotion.co/), extracted from the source website files and styling structure. This serves as the design specification for building the Codnexa Software Services website.

---

## 0. Source

| Field | Value |
|---|---|
| Primary URL | |
| Additional pages/routes | /work, /about, /services, /journal, /contact |
| Target stack for rebuild | HTML5 + CSS3 + Vanilla JavaScript |
| Why this reference | Premium, minimal, dark-editorial style featuring high contrast serif headings and smooth animation states. |

---

## 1. Design Tokens

### 1a. Color Palette

| Token | Hex / RGB | Usage | Notes |
|---|---|---|---|
| `primary` | `#e63a0f` | Main brand color, buttons, accents | Orange-500 |
| `primary-hover` | `#eb613f` | Accent hover state | Orange-400 |
| `background` (page) | `#0a0a0a` | Main background color | Neutral-1000 |
| `surface` (cards/sections) | `#191919` | Cards, inner sections | Neutral-950 |
| `text-primary` | `#ffffff` | Primary text and headings | White |
| `text-muted` | `#9e9e9e` | Muted secondary text, details | Neutral-500 |
| `border` | `#282828` | Subtle layout borders | Neutral-900 |
| `success` | `#2e7d32` | Standard green alert / status | Custom fallback |
| gradient(s) | `linear-gradient(135deg, #e63a0f 0%, #eb613f 100%)` | Interactive hover transitions | Subtle orange glow |

### 1b. Typography Scale

| Element | Font Family | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Display / H1 | `"PP Editorial New", "Times New Roman", sans-serif` | 4.0rem (64px) | 600 | 1.1em | Normal |
| H2 | `"PP Editorial New", "Times New Roman", sans-serif` | 2.5rem (40px) | 500 | 1.2em | Normal |
| H3 | `"PP Editorial New", "Times New Roman", sans-serif` | 1.75rem (28px) | 500 | 1.2em | Normal |
| Body | `"Inter Tight", Arial, sans-serif` | 1.0rem (16px) | 400 | 1.3em | Normal |
| Small / Caption | `"Inter Tight", Arial, sans-serif` | 0.875rem (14px) | 400 | 1.3em | Normal |
| Monospace | `"Oxygen Mono", monospace` | 0.875rem (14px) | 400 | 1.3em | Normal |

- Heading font source: Self-hosted / Premium serif fonts. We will fallback to "Cormorant Garamond" from Google Fonts.
- Body font source: "Inter Tight" (Fallback: Google Fonts "Inter").
- Monospace font: "Oxygen Mono" (Fallback: Google Fonts "Oxygen Mono" or system monospace).
- Text-transform usage: All menus / tags are standard casing; minor labels use lowercase or uppercase as accent.
- Link styling: Underlined on hover, transitions over 0.3s.

### 1c. Spacing, Radius & Shadow Scale

| Token | Value | Where used |
|---|---|---|
| Base unit | `0.25rem` (4px) | All margin/padding is calculated as multiples of this. |
| `space-sm` | `0.5rem` (8px) | Minor inner paddings, margins |
| `space-md` | `1.0rem` (16px) | Standard grid gap, text elements |
| `space-lg` | `2.0rem` (32px) | Section components spacing |
| `space-xl` | `4.0rem` (64px) | Standard section vertical padding |
| `radius-sm` | `4px` | Small buttons / badges |
| `radius-md` | `8px` | Small cards, buttons |
| `radius-lg` | `16px` | Interactive cards, sections |

### 1d. Breakpoints

| Name | Min-width | Layout notes |
|---|---|---|
| Mobile | `< 768px` | Single-column stacks, mobile drawer menu |
| Tablet | `768px - 1024px` | Split columns (2 columns), collapsed navbar |
| Desktop | `1024px+` | Full 3-column / 4-column grids, horizontal nav links |

---

## 2. Overall Aesthetic & Voice
- Style category: Editorial Dark-First Minimalist
- Mood & tone: Premium, Intelligent, Meticulous, Tech-Forward
- Copywriting tone: Assertive, minimal, second-person ("We build what you need to lead.")

---

## 3. Information Architecture
- **Header:** Sticky navbar, blurred background on scroll (`backdrop-filter`). Left-aligned Logo (Codnexa), right-aligned nav links (Work, Services, Journal, Contact), and an orange "Start a Project" CTA button.
- **Footer:** 4-column layout. Contact details, office locations, social handles, links to privacy terms, and a dynamic newsletter/project input.

---

## 4. Page-by-Page Breakdown
- **Landing Page (Home):**
  - **Hero:** Canvas floating particle nodes, massive display title ("Creative software studio built for scale."), two-button CTA.
  - **Services Section:** Editorial grids with expanding accordions for Strategy, Design, and Development services.
  - **Portfolio Section:** 3 featured project cards with image hover-zoom.
  - **Journal Section:** Minimalist list of insights with hover-underline links.
  - **Inquiry CTA:** Dark full-width banner with an action-oriented headline and form.
  - **Footer:** Deep columns.

---

## 5. Layout & Grid
- Max content width: `1200px` (or `width: calc(var(--_spacing---size) * 180)` = 72rem = `1152px`)
- Grid system: CSS Flexbox for layouts, CSS Grid (12-column template) for desktop project cards.
- Section vertical padding: `space-xl` (64px) for desktop, `space-lg` (32px) for mobile.

---

## 6. Component Inventory

| Component | Variants | Key styles (bg, border, radius, shadow, padding) | States (hover/active/focus/disabled) | Notes |
|---|---|---|---|---|
| Button | Primary | bg: `#e63a0f`, text: `#fff`, border-radius: `8px` | bg: `#eb613f`, transition: `0.3s` | |
| Button | Secondary | bg: `transparent`, border: `1px solid #282828`, text: `#fff` | bg: `#fff`, text: `#0a0a0a` | |
| Card | Portfolio | bg: `#191919`, border: `1px solid #282828`, overflow: hidden | Zoom image by 5%, slide-up overlay | |
| Nav | Desktop | bg: `rgba(10,10,10,0.8)`, backdrop-filter: `blur(10px)` | Scrolled state: slide down & add border-bottom | |
| Custom Cursor | Fluid | bg: `#e63a0f` dot, border: `1px solid #e63a0f` outer ring | Expands on hover of interactive links | Desktop only |

---

## 7. Backgrounds & Surface Effects
- Solid deep black (`#0a0a0a`) background with dark gray lines / borders (`#282828`) separating sections.
- Canvas animation overlay on Hero to create depth.
- Glassmorphic navbar (`backdrop-filter: blur(12px)`).

---

## 8. Motion, Animation & 3D
- **Custom Cursor:** Smooth mouse position lerp (linear interpolation) for the trailing ring cursor.
- **Scroll Fade-in:** Fade and translation on Y-axis for sections as they enter the screen (`IntersectionObserver`).
- **Accordion:** Smooth height slide transition when toggling services.

---

## 15. Design Tokens Export (ready-to-paste)

**`globals.css`**
```css
:root {
  --color-primary: #e63a0f;
  --color-primary-hover: #eb613f;
  --color-background: #0a0a0a;
  --color-surface: #191919;
  --color-text-primary: #ffffff;
  --color-text-muted: #9e9e9e;
  --color-border: #282828;

  --font-heading: "Cormorant Garamond", "Times New Roman", serif;
  --font-body: "Inter", "Inter Tight", Arial, sans-serif;

  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1.0rem;
  --space-lg: 2.0rem;
  --space-xl: 4.0rem;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;

  --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.2);
  --shadow-lg: 0 10px 20px rgba(0,0,0,0.4);
}
```

---

## ✅ Implementation Checklist
- [x] Section 1 tokens filled → exported to Section 15
- [x] Layout grid & breakpoints matched (Section 5)
- [x] Header & footer rebuilt
- [x] Components rebuilt from Section 6 inventory
- [x] Backgrounds/surfaces/shadows matched (Section 7)
- [x] Animations & 3D recreated (Section 8): manual visual pass
- [x] Responsive QA across all breakpoints
- [x] Side-by-side visual review vs. original
