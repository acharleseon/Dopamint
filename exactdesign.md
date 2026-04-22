# Dopamint Master Design System & Architecture Specification
**Purpose:** This document is an exact, pixel-perfect specification for the Dopamint frontend. It is designed to be fed to an AI to perfectly recreate the website, its layout, its animations, and its exact aesthetic.

---

## 1. GLOBAL DESIGN TOKENS (index.css)
The aesthetic is **High-Contrast Minimal Brutalism (WMF Style)**. No soft shadows, no complex gradients. Strict borders, high contrast, geometric precision.

### Colors
- **Primary (Yellow):** `#ffe701`
- **Secondary (Soft Yellow):** `#fffa7d`
- **Background (White):** `#ffffff`
- **Text (Black):** `#0d0d0d`
- **Muted Text:** `#555555`
- **Borders:** `rgba(13,13,13,0.10)` or `1px solid var(--color-text)`
- **Glow:** `0 0 20px rgba(255, 231, 1, 0.55), 0 0 50px rgba(255, 231, 1, 0.25)`

### Typography
- **Titles (H1/Display):** `Mango Grotesque` (Bold, Uppercase, letter-spacing: -0.02em, line-height: 0.85). Example size: `clamp(3.5rem, 6.5vw, 6rem)`.
- **Headings (H2/H3):** `Inter` (Weight: 800, letter-spacing: -0.03em, line-height: 0.95).
- **Body & Buttons:** `Poppins` (Weights 300 to 700).

### Buttons (`.btn`)
- **Primary:** Black background, white text. Hover: Changes to Yellow background, black text, translateY(-1px), adds small yellow glow.
- **Yellow (`.btn-yellow`):** Used for primary CTAs (e.g., Hero section). Bright yellow background, black text, 1px black border. Hover: Background stays yellow, text remains black, emits a vibrant yellow neon glow (`box-shadow: 0px 0px 25px 8px rgba(255, 231, 1, 0.5)`), and lifts via `translateY(-2px)`.
- **Outline:** Transparent background, black border/text. Hover: Yellow background, yellow border, black text.
- **Padding:** `14px 28px`. **Text:** 13px, uppercase, 600 weight, `0.08em` letter-spacing.

### Layout Constants
- **Container Max Width:** `1280px`. Padding: `24px`.
- **Section Padding:** `var(--space-5xl) 0` (120px top/bottom).
- **Icons:** Material Symbols Outlined (Fill 0, Weight 300, Opsz 24).

---

## 2. REUSABLE UI PATTERNS

### Section Labels (`.section-label`)
Small tags placed above section titles.
- **Background:** Yellow (`#ffe701`), Text: Black (`#0d0d0d`)
- **Padding:** `4px 10px`, Font: 11px Poppins, 600 weight, uppercase, `0.18em` tracking.
- **Format:** Contains an icon followed by text (e.g., `[Icon] ECOSYSTEM`).

### Base Card (`.card`)
- **Border:** `1px solid rgba(13,13,13,0.1)`. Background: `#fff`. Padding: `32px`.
- **Hover:** Border turns solid black (`#0d0d0d`).
- **Glow Card:** On hover, border turns black and gets a brutalist drop shadow: `box-shadow: 4px 4px 0px var(--color-primary)`.

---

## 3. ANIMATION SYSTEM (GSAP & React)
Every section is animated on scroll using `gsap.ScrollTrigger`.
- **Reveal Strategy:** Elements inside a section (labels, titles, cards) start at `opacity: 0, y: 30` (or similar).
- **Trigger:** ScrollTrigger triggers when the section hits `start: 'top 80%'` or `top 75%`.
- **Animation:** `gsap.to({ opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' })`.

### Custom Interactive Canvas/Component Animations
1. **`ScrambledText`:** Wraps all `<h2>` section titles. Cycles random characters before locking into the target string.
2. **`GridDistortion`:** Canvas background. Draws a grid of nodes/lines that bend, warp, and get pulled magnetically toward the user's cursor.
3. **`DotGrid`:** Canvas background. A field of dots that repels from the cursor and ripples violently (shockwave) on mouse click.
4. **`MagnetLines`:** Grid of small CSS lines (e.g., 6x6) that individually rotate to point toward the user's cursor using math inside a `mousemove` event.
5. **`Stack` (Framer Motion):** A deck of overlapping UI cards with spring physics. Cards can be dragged and thrown to the back of the deck.
6. **`PixelTransition`:** CSS grid transition that hides/reveals an image by animating the scale of tiny grid cells (pixel blocks) in a staggered pattern on hover.

---

## 4. SECTION-BY-SECTION EXACT ARCHITECTURE

### Navbar
- **Style:** Sticky top, `64px` height, solid black bottom border, pure white background.
- **Left:** Dopamint Logo.
- **Middle:** Desktop Links (Runtime, Protocol, Voice, Developers, Pricing).
- **Right:** "Get Started" outline button.
- **Mobile:** Fullscreen overlay menu using GSAP `clip-path` circle reveal from top right.

### 1. Hero Section
- **Background:** Split layout or subtle canvas elements. Uses `Spline` 3D model (if required) in background with `pointer-events: none`.
- **Content:** "POWERED BY $DOPE" tag. Massive Title: "Real-time infrastructure for AI companions." Subtext explaining twin/agent layers.
- **Interactive Element:** A 6x6 `MagnetLines` widget placed decoratively next to the text.
- **Buttons:** Primary Button ("Start Building →") and secondary button ("Documentation").

### 2. Marquee Ticker
- **Style:** Infinite scrolling text banner. Black background, Yellow Text.
- **Items:** Separated by diamond bullets `◆`. (Low Latency, On-Chain Memory, Voice Native, Multimodal, Production Ready).

### 3. What Is Dopamint (Section)
- **Title:** "One API. Infinite identities."
- **Layout:** CSS Grid (2 columns). Displays 4 distinct audience boxes (Influencer, Founder, Developer, Researcher).
- **Card Style:** Top header has an inverted tag (`background: black, color: yellow` for role). Below is a bold, italicized quote from the persona.

### 4. Ecosystem (Products)
- **Title:** "One runtime. Two seats at the table. Own it. Build it. Monetize it."
- **Layout:** 2 massive product rows stacked vertically inside a single bordered container (`DOPEkin` and `DOPEtwin`).
- **Cinematic Cards:** Both DOPEkin and DOPEtwin utilize a unified card design language featuring `16px` border-radius, `cover` object-fit images, and dark gradient overlays `linear-gradient(to top, rgba(0,0,0,0.9), transparent)` so text pops cleanly on top.
- **DOPEkin Carousel:** Powered by `CoverflowGallery`. An automated 3D cinematic carousel scrolling through characters. Cards lift smoothly (`y: -8`) and cast a yellow glowing shadow on hover.
- **DOPEtwin Grid:** A responsive 5-column grid powered by `HoverFlipCard`. Cards share the cinematic design on the front and cleanly flip using CSS transforms to reveal detailed text on the back.
- **Footer Row:** Under both product sections, the description text is cleanly left-aligned while the "EXPLORE" button sits parallel on the right, structured in a `.eco-footer-row` flex container (which gracefully stacks on mobile).

### 5. Why Dopamint (Features)
- **Title:** "Built for relationships, not transactions."
- **Layout:** Asymmetric grid or staggered cards.
- **Features:** Focuses on "Amnesia vs Memory" and "Stateful Interactions". Cards use brutalist hover (`4px 4px 0px yellow`). Includes icons for each feature.

### 6. Pipeline (Runtime Architecture)
- **Title:** "How it works under the hood."
- **Layout:** Dark mode section (`background: black`, `text: white`). 
- **Visual:** A flowchart built using CSS flexbox. Circles for inputs (Live Voice) connected via dashed lines (`border-bottom: 2px dashed #333`) to core processing blocks (Turn Detection, Safety Layer, Stateful Routing, TTS).

### 7. Who Section (Audience)
- **Title:** "Built for scale."
- **Layout:** 4 columns. Cards feature a yellow icon box.
- **Cards:** Consumer App Founders, Media & IP Owners, Creators & Influencers, AI Researchers.

### 8. Testnet CTA (Section)
- **Layout:** Center aligned. Label: "TESTNET". Title: "Testnet opening soon."
- **Background:** Absolute positioned `DotGrid` canvas (reacts to clicks with shockwaves).
- **Content:** Paragraph about early access and $DOPE rewards. Input field with a "Join Waitlist" button inside the input container.

### 9. Developers
- **Title:** "Built for shipping, not experimenting."
- **Layout:** 2 columns. Left: Subtitle and Pills. Right: Terminal window mockup.
- **Capability Pills:** Yellow feature tags in a grid layout. Hovering triggers a silky-smooth CSS transition (`cubic-bezier(0.25, 1, 0.5, 1)`): lifting the pill `translateY(-4px) scale(1.03)`, dropping a soft shadow, and fading the background to white with black text.
- **Terminal:** Black window with macOS style traffic lights. Typing animation inside showing code deployment (`npm install @dopamint/core`).

### 10. Pricing
- **Title:** "Start simple. Scale when it works."
- **Layout:** 3 Columns.
- **Tiers:** BUILD (Free), SCALE ($249/mo), ENTERPRISE (Custom).
- **Visuals:** The middle "SCALE" card is highlighted (black background, yellow text) and sits slightly higher in the grid (`transform: scale(1.05)` or `-y` offset).

### 11. Final CTA
- **Layout:** Pure Yellow Background (`var(--color-primary)`). Solid black top border.
- **Background:** Absolute positioned `GridDistortion` canvas (nodes stretching magnetically to cursor).
- **Content:** Massive bold text: "Build AI systems that persist, adapt, and feel alive." Button: Outline button (black border/text).

### 12. Footer
- **Layout:** Flex row, spaced out.
- **Left:** Logo and "POWERED BY $DOPE" tag.
- **Center:** Two rows of nav links (Main links: Runtime, Protocol, Pricing... Social links: Twitter/X, Discord). Uses subtle underline hover animations.
- **Right:** Copyright text: "© 2026 Dopamint. All rights reserved. Powered by $DOPE."

---

## DEPLOYMENT NOTES FOR AI CLONING
If an AI is prompted to rebuild this site from scratch, it must:
1. Copy the EXACT `index.css` root tokens and fonts provided in Section 1.
2. Ensure `gsap.ScrollTrigger` is registered globally and every major wrapper has `opacity: 0` before GSAP animates it in `useEffect`.
3. Not use generic CSS shadows or gradients. Only use harsh borders, solid yellow/black fills, and explicit canvas components for interactive backgrounds.
4. Import and use the exact custom components (`ScrambledText` on all H2s, `DotGrid` on CTA section, `GridDistortion` on Final CTA) to match the kinetic, interactive brutalist feel.
