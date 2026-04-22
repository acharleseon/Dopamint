# Dopamint Frontend Design System & Architecture

This document outlines the complete design system, technical architecture, animation strategies, and typography rules for the **Dopamint** frontend.

---

## 1. Theme & Aesthetic: Minimal Brutalism
The application uses a "WMF Style" Minimal Brutalist aesthetic. It prioritizes high contrast, geometric precision, and bold typography over soft shadows or complex gradients. The design communicates speed, reliability, and edge-technology.

### Core Design Tokens

**Color Palette:**
- **Primary:** `#ffe701` (Brand Yellow) — Used for primary buttons, highlights, and active states.
- **Secondary:** `#fffa7d` (Soft Yellow) — Used for subtle glows and hover states.
- **Background:** `#ffffff` (Pure White) — The dominant canvas color, providing maximum contrast.
- **Text (Primary):** `#0d0d0d` (Near Black) — Used for headings, borders, and major UI elements.
- **Text (Muted):** `#555555` — Used for secondary descriptions and subtitles.

**Structural Elements:**
- **Borders:** Strict `1px` or `2px` solid black borders (`var(--color-text)`) define containers, cards, and grid sections.
- **Shadows:** Avoids soft drop shadows. Uses hard-edged brutalist shadows (e.g., `4px 4px 0px var(--color-primary)`) on interactive hover states.

---

## 2. Typography
The typographic hierarchy is intentionally aggressive, using tightly tracked, oversized titles paired with highly legible body copy.

- **Display & Titles (`var(--font-title)`):** **Mango Grotesque** (Bold, Uppercase)
  - Used for massive hero headlines and section titles.
  - Sized dynamically using `clamp()` (e.g., `clamp(3.5rem, 8vw, 7.5rem)`).
  - Letter spacing is tightened (`-0.02em`) with a compressed line-height (`0.85`).
- **Headings (`var(--font-heading)`):** **Inter** (ExtraBold - 800)
  - Used for card titles, section labels, and component-level headers.
  - Tight tracking (`-0.03em`) and solid line-height (`0.95`).
- **Body & UI Text (`var(--font-body)`):** **Poppins** (Light 300 to Bold 700)
  - Used for paragraphs, buttons, and small UI labels.
  - Small labels often use heavy tracking (`letter-spacing: 0.15em`) and uppercase formatting.

---

## 3. Frontend Architecture
The application is built using a modern React stack optimized for high-performance visual rendering.

**Tech Stack:**
- **Framework:** React + Vite
- **Styling:** Vanilla CSS (`index.css`) for global design tokens, combined with inline React styles for dynamic, GSAP-driven properties.
- **3D Rendering:** Spline (`@splinetool/react-spline`) for lightweight, embedded 3D scenes.
- **Routing:** Single-page scroll architecture. Sections are targeted via IDs (`#runtime`, `#protocol`, `#voice`).

**Component Structure:**
- The app is divided into distinct, self-contained `<section>` components (`Hero`, `Ecosystem`, `WhyDopamint`, `Pipeline`, etc.).
- Each section is responsible for its own GSAP scroll triggers and internal state.
- A global `Navbar` manages scroll-spy logic (tracking active sections) and mobile menu state.

---

## 4. Animation & Interaction System
Motion is a core pillar of the Dopamint design. It relies on a combination of DOM animation, Physics-based dragging, and Canvas-based interactive environments.

### Libraries Used:
- **GSAP & ScrollTrigger:** The backbone of all reveal animations. Used for staggering elements as they enter the viewport (`y: 20, opacity: 0` to `y: 0, opacity: 1`).
- **Framer Motion:** Used specifically in the `Stack.jsx` component for spring-physics dragging and throwing mechanics.

### Custom Interactive Components:
1. **`ScrambledText` (React + GSAP):** 
   - A custom typing/decoding effect applied to all major headlines. It cycles through random characters before resolving to the actual text, giving a "terminal/hacker" feel.
2. **`GridDistortion` (HTML5 Canvas):** 
   - Used in the Final CTA section. Renders a geometric mesh of nodes and lines that magnetically bend and distort around the user's cursor.
3. **`DotGrid` (HTML5 Canvas):** 
   - Used in the Testnet CTA. A grid of dots that responds to mouse movement with a shockwave/ripple physics effect on click.
4. **`PixelTransition` (HTML5 Canvas / CSS):**
   - Used in the Ecosystem section. A blocky, pixelated transition effect that reveals content on hover.
5. **`Stack` (Framer Motion):**
   - A swipeable, interactive deck of 3D-rotated cards used to showcase UI concepts.
6. **`MagnetLines` (CSS Variables + JS):**
   - A grid of lines that rotate individually to track the cursor's position, providing a physical, magnetic feel.

---

## 5. Layout Strategies
- **Grid Systems:** Heavy reliance on CSS Grid (`display: grid`) for component layouts, transitioning from `repeat(4, 1fr)` on desktop to `1fr` on mobile.
- **Scroll Restoration:** Browser scroll restoration is explicitly set to `manual` in `App.tsx` with a forced `scrollTo(0, 0)` to ensure users always experience the Hero animation sequence on fresh loads.
- **Z-Indexing:** Strict z-index management ensures interactive canvas backgrounds stay behind text layers, while overlays and sticky navbars remain on top.
