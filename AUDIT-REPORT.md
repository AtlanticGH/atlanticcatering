# Atlantic Catering & Logistics Limited – Full Website Audit

**Date:** 2025  
**Scope:** Architecture, rendering, JavaScript, performance, accessibility, SEO, styling, security.  
**Repository:** atlantic-website (static HTML, Tailwind CDN, vanilla JS.)

---

## High-level system summary

- **Stack:** Static HTML5, Tailwind CSS via CDN, vanilla JavaScript (IIFE in `main.js`), optional inline page-specific scripts (sustainability).
- **Structure:** Flat folder (HTML at root, `css/`, `js/`, `assets/images|video|icons|logos`, `news/`, `team/`). No build step, no shared templates.
- **Rendering:** Mostly static HTML. Sustainability page uses a large inline script that defines `sustainabilityPageData` and multiple `render*` functions; sections are filled via `innerHTML` on `DOMContentLoaded`.
- **Strengths:** Semantic sections, consistent nav/footer patterns, Tailwind theme, IntersectionObserver for counters/fade-in, mobile menu and modals with ARIA. Sustainability is partially data-driven and CMS-ready in concept.
- **Risks:** Render-blocking Tailwind and fonts; no shared component layer (nav/footer duplicated); sustainability injects unescaped data into `innerHTML` (XSS if data source is untrusted); missing asset (hero.webm); client logo paths may be case-sensitive on some hosts.

---

## 1. Architecture & structure

| # | Category        | Severity | File & line                      | What’s wrong | Why it matters | Recommended fix |
|---|-----------------|----------|----------------------------------|--------------|----------------|-----------------|
| 1 | Architecture    | High     | All HTML files                   | Nav, utility panel, and footer are copy-pasted across every page. No shared partial or include. | Any change (e.g. link, label) must be edited in many files; risk of drift and inconsistency. | Introduce a minimal build (e.g. Eleventy, or PHP includes) or a single `nav.html`/`footer.html` included via SSI or JS fetch + insert. |
| 2 | Architecture    | Medium   | sustainability.html (inline script) | ~1,000+ lines of page-specific JS live inside the HTML file (data + render + lightbox + slider). | Hard to maintain, test, or reuse; bloats one page. | Move to `js/sustainability.js` (or `js/pages/sustainability.js`), load after Tailwind; keep only a small inline bootstrap that calls `initSustainability(sustainabilityPageData)` if data must stay in HTML, or load data from a JSON file. |
| 3 | Architecture    | Low      | js/main.js                       | Global-scope logic (menu, modals, counters, scroll, nav) runs on every page; some elements (e.g. profile modal, service modal, video modal) exist only on specific pages. | No real bug, but unnecessary work and potential for missing elements. | Guard each feature: `if (document.getElementById('profile-modal')) { ... }`. Already partially done; ensure all modal/scroll logic is behind existence checks. |
| 4 | Reusability     | Medium   | index, about, services, etc.     | No shared “section hero” or “card” component. Similar hero and card markup repeated. | Hard to enforce consistent layout and behaviour for future pages. | For a future CMS/WordPress/Next: define reusable blocks (hero, card, CTA) and a single data shape; keep current HTML as reference for those blocks. |

---

## 2. Rendering logic

| # | Category   | Severity | File & line                                      | What’s wrong | Why it matters | Recommended fix |
|---|------------|----------|--------------------------------------------------|--------------|----------------|-----------------|
| 5 | Rendering  | High     | sustainability.html (inline script, multiple)    | All section content is set via `section.innerHTML = \`...\`` with template literals interpolating `sustainabilityPageData`. If any value contains `</script>` or `<img onerror=...>`, it can break the page or execute script. | Unsafe DOM insertion if data ever comes from a CMS or user; currently data is static so risk is low until data source changes. | When inserting text from data, escape HTML: e.g. `function escapeHtml(s) { const div = document.createElement('div'); div.textContent = s; return div.innerHTML; }` and use `${escapeHtml(item.title)}` (and same for description, label, etc.). For URLs in `href`, validate or sanitize (allow only relative paths or allowlisted domains). |
| 6 | Rendering  | Medium   | sustainability.html (renderHero, renderPillars, …) | Duplicate rendering patterns: each `render*` builds a big template string and assigns `innerHTML`. No shared helper for “section wrapper” or “card.” | More code, harder to change layout or fix escaping in one place. | Extract a small helper, e.g. `function renderSection(id, html) { const el = document.getElementById(id); if (el) el.innerHTML = html; }`, and optionally a `escapeHtml` used inside every template that outputs text. |
| 7 | Rendering  | Low      | sustainability.html (DOMContentLoaded)          | Order of execution: `renderHero`, `renderAtlanticCaresMedia`, `renderPillars`, … then `setupMetricCountUp`, `setupAtlanticCaresSlider`, `setupPillarGalleryLightbox`. Slider/lightbox depend on DOM rendered by the same script. | If someone reorders or splits scripts, slider/lightbox might run before DOM exists. | Document the contract (“run after all render*”) or wrap setup in a single `function initSustainabilityUI() { setupAtlanticCaresSlider(); setupPillarGalleryLightbox(); }` and call after all `render*`. |
| 8 | Rendering  | Low      | index, about, etc.                               | Most content is static HTML (hero, stats, clients, services). Not data-driven. | Fine for current scope; only matters for CMS/headless migration. | For CMS: replace static blocks with placeholders and feed content from API or build-time data; keep current HTML as fallback or reference. |

---

## 3. JavaScript health

| # | Category | Severity | File & line                          | What’s wrong | Why it matters | Recommended fix |
|---|----------|----------|--------------------------------------|--------------|----------------|-----------------|
| 9 | JS       | Medium   | js/main.js (profile modal bio)      | `profileModalBio.innerHTML = ''` then `p.textContent = text`. Bio text is set with `textContent`, so no HTML injection there; only clearing uses `innerHTML`. | Low risk; `textContent` is safe. No change strictly required. | For consistency and future-proofing, avoid `innerHTML` for user-derived content; keep using `textContent` for bio paragraphs. |
| 10| JS       | Low      | js/main.js (smooth scroll)           | `document.querySelectorAll('a[href^="#"]')` runs at load and binds one listener per anchor. No teardown. | Many anchors on index (e.g. clients, services) mean many listeners. Minor memory/CPU. | Optional: delegate from `document`: one `click` listener, check `e.target.closest('a[href^="#"]')` and then `scrollIntoView`. |
| 11| JS       | Low      | js/main.js (scroll/resize)          | `window.addEventListener('scroll', updateNavBackground)` and `resize` with no throttle. | On scroll-heavy pages (e.g. index with hero), `updateNavBackground` can fire very often. | Throttle: e.g. `let raf = null; function updateNavBackground() { if (raf) return; raf = requestAnimationFrame(() => { updateNavBackgroundImpl(); raf = null; }); }` or throttle by time (100ms). |
| 12| JS       | Low      | sustainability.html (setupPillarGalleryLightbox) | Global `document.addEventListener('keydown', ...)` for arrow/Escape. Never removed. | If sustainability were a SPA view that gets unmounted, the listener would remain. Currently single-page so acceptable. | For a future SPA or view lifecycle, remove the keydown listener when the view is torn down. |
| 13| JS       | Low      | js/main.js (initCounters)           | `initAllCounters()` is called on DOMContentLoaded or immediately if already loaded. IntersectionObserver and `el.dataset.animated = 'true'` prevent double animation. | No bug; logic is correct. | None. |

---

## 4. Performance & optimization

| # | Category    | Severity | File & line                    | What’s wrong | Why it matters | Recommended fix |
|---|-------------|----------|--------------------------------|--------------|----------------|-----------------|
| 14| Performance | High     | All HTML `<head>`              | Tailwind is loaded from CDN (`cdn.tailwindcss.com`) and `tailwind-config.js` in `<head>` with no `defer`. Same for Google Fonts and `style.css`. Parsing/execution blocks rendering. | Slower FCP and TTI, especially on slow networks. | Defer non-critical JS: `<script src="js/tailwind-config.js" defer></script>`. Keep Tailwind CDN as-is unless you switch to a built CSS. Add `rel="preload"` for `style.css` and critical fonts if desired. |
| 15| Performance | High     | index.html (hero video)        | Hero uses `<video>` with two `<source>` (herobw.mp4, hero.webm). `hero.webm` is referenced in three places (hero + who-we-are + video modal); if the file does not exist, each load will 404. | Wasted requests and possible console errors; no functional break if mp4 exists. | Verify `assets/video/hero.webm` exists. If not, remove `<source src="assets/video/hero.webm" type="video/webm">` from index.html (and any other page that references it) until you have a WebM encode. |
| 16| Performance | Medium   | index.html, sustainability.html | No `loading="lazy"` on hero background image/video (hero is above the fold). Other images use `loading="lazy"` appropriately. | Correct as-is; hero should not be lazy. | No change. |
| 17| Performance | Medium   | css/style.css                  | Single ~1,100-line stylesheet with page- and component-specific rules. Tailwind CDN is full build (large). | Full Tailwind + full custom CSS on every page. | For production: use Tailwind CLI build with content paths from your HTML to purge unused utilities; consider splitting critical above-the-fold CSS if needed. |
| 18| Performance | Low      | sustainability.html            | Large inline script runs after DOM is parsed; then main.js loads. No code splitting. | One heavy parse/execute on sustainability. | Move sustainability script to external `js/sustainability.js` and load with `defer` so it doesn’t block parsing; optionally load it only on the sustainability page. |

---

## 5. Accessibility (WCAG)

| # | Category | Severity | File & line                         | What’s wrong | Why it matters | Recommended fix |
|---|----------|----------|-------------------------------------|--------------|----------------|-----------------|
| 19| A11y     | Medium   | css/style.css (headings)            | Global rule `h1..h6 { color: #55BE52; }` overrides Tailwind. Some sections (e.g. hero, navy sections) correctly override to white. Sustainability pillar titles and other content use `text-slate-900`/`text-acll-navy` in class, but the global green can still apply in edge cases. | Heading colour must meet contrast (e.g. 4.5:1 on background). Green on white is generally OK; ensure no green on light gray fails. | Audit all headings: hero/navy → white; elsewhere → navy/dark. Ensure no heading uses green on #EAEAEA below 4.5:1. Add a single source of truth (e.g. utility class `.heading-page`) for non-hero headings. |
| 20| A11y     | Low      | index.html (hero video)             | Hero video has `aria-hidden="true"` and no captions. | Decorative video is fine to hide; if it ever carries information, add captions and remove aria-hidden. | No change if video is decorative. |
| 21| A11y     | Low      | js/main.js (mobile menu)            | Menu toggles `aria-expanded` and body scroll. Focus is not trapped in the menu when open; focus can tab to content behind. | Keyboard users can tab out of the menu into the page. | When opening: focus first link in mobile menu; optionally trap focus (focus loop) until menu is closed. When closing: return focus to the hamburger button. |
| 22| A11y     | Low      | sustainability.html (lightbox)      | Lightbox has `aria-modal="true"` and close button with `aria-label="Close"`. Escape and backdrop click close. | Good. Ensure focus is moved into the lightbox when opened and restored when closed. | On open: focus the close button or the image. On close: focus the thumbnail that opened the lightbox. |
| 23| A11y     | Low      | Multiple (skip link)               | No “Skip to main content” link. | Keyboard users must tab through full nav before reaching main. | Add `<a href="#main-content" class="sr-only focus:not-sr-only ...">Skip to main content</a>` at top of body and `id="main-content"` on `<main>`. |

---

## 6. SEO & indexability

| # | Category | Severity | File & line                    | What’s wrong | Why it matters | Recommended fix |
|---|----------|----------|--------------------------------|--------------|----------------|-----------------|
| 24| SEO      | High     | sustainability.html            | Hero, pillars, initiatives, compliance, impact, journey, CTA are rendered by JS. Crawlers that execute JS will see content; those that don’t may see empty sections. | Risk of thin or empty content in JS-disabled or quick crawlers. | For critical content (hero, H1, first paragraph), consider server-rendered or static fallback inside the section containers (e.g. `<noscript>` or default HTML that JS replaces). Or ensure your main crawler (e.g. Googlebot) runs JS and test with “Fetch as Google.” |
| 25| SEO      | Medium   | All pages                       | Canonical and OG URLs use `https://www.atlanticcatering-gh.com/`. If the live domain differs, these are wrong. | Wrong canonicals can split signals or cause incorrect social previews. | Replace with the real production domain (or a config variable if you introduce a build step). |
| 26| SEO      | Low      | index, about, services, etc.    | Each page has unique `<title>` and `<meta name="description">`. Good. No JSON-LD (Organization, LocalBusiness). | Rich results and knowledge panel could be improved. | Add JSON-LD for Organization (and LocalBusiness if relevant) with name, url, logo, contact. |
| 27| SEO      | Low      | Internal links                  | Links use `.html` (e.g. `about.html`, `services.html`). Clean and crawlable. | No issue. | Optional: if you move to a server or SPA, consider pretty URLs (e.g. `/about`) and redirects. |

---

## 7. Styling & UI consistency

| # | Category | Severity | File & line                         | What’s wrong | Why it matters | Recommended fix |
|---|----------|----------|-------------------------------------|--------------|----------------|-----------------|
| 28| Styling  | Medium   | css/style.css vs Tailwind           | Custom CSS repeats colours already in Tailwind config (e.g. `#55BE52`, `#0B1C2D`, `#EAEAEA`). Gradients and section backgrounds are hardcoded in CSS. | Two sources of truth for brand colours; theme changes require edits in both. | Prefer Tailwind utilities where possible (e.g. `bg-acll-green`). For gradients, add a Tailwind theme extension (e.g. `backgroundImage: { 'gradient-stats': '...' }`) or keep a small set of custom classes that reference CSS variables that match Tailwind theme. |
| 29| Styling  | Low      | Multiple HTML files                 | Header height and nav layout are consistent (h-20 lg:h-24, same nav links). Index uses a different header style over hero (transparent then solid); other pages use solid. | Intentional; no bug. | None. |
| 30| Styling  | Low      | index.html (client logos)            | Client logo filenames in HTML are lowercase (e.g. `vivo.png`, `modec.png`). File systems on Linux/some hosts are case-sensitive (e.g. `Vivo.png` vs `vivo.png`). | 404s and broken images if actual files use different casing. | Ensure filenames on disk match exactly (e.g. all lowercase as in HTML), or use a build step that normalizes paths. |

---

## 8. Security & stability

| # | Category | Severity | File & line                                  | What’s wrong | Why it matters | Recommended fix |
|---|----------|----------|----------------------------------------------|--------------|----------------|-----------------|
| 31| Security | High     | sustainability.html (all innerHTML)          | Rendered strings are built with template literals and inserted via `innerHTML`. Values from `sustainabilityPageData` are not escaped. If that data ever comes from a CMS or API, malicious payloads could run in the page. | XSS risk when data source is not fully trusted. | Introduce `escapeHtml(str)` and use it for every text field (title, description, label, etc.). For `href`, allow only safe values (e.g. relative paths or allowlisted hostnames) or use `setAttribute('href', url)` after validation. |
| 32| Security | Low      | js/main.js (profile modal)                   | Bio text is set with `textContent` per paragraph; no innerHTML for user content. Image URL is taken from data attributes or style. | If card data were user-controlled, image URL could be `javascript:...`. Currently static. | When binding profile/service data from an API, validate image URLs (e.g. allow only same-origin or https URLs). |
| 33| Security | Low      | Site-wide                                   | No sensitive keys or API tokens in repo. Mailto and external links only. | Good. | Keep secrets out of front-end; use server-side or serverless for any keys. |

---

## 9. Bugs and layout issues

| # | Category | Severity | File & line                    | What’s wrong | Why it matters | Recommended fix |
|---|----------|----------|--------------------------------|--------------|----------------|-----------------|
| 34| Bug      | High     | index.html (video source)      | `<source src="assets/video/hero.webm" type="video/webm">` is present; if the file is missing, browser will 404. | Console errors and extra request. | Remove the webm `<source>` if `hero.webm` is not in the repo, or add the file. |
| 35| Bug      | Medium   | index.html (client logos)       | References like `assets/images/clients/vivo.png`, `steval.png`, `ctp.png`, `modec.png`, etc. Actual folder listing showed names like `Vivo.png`, `Steval.png`, `MODEC.png`, `ctp.png`. Case mismatch can break on case-sensitive servers. | Broken client logos on production. | Align filenames: either rename files to lowercase to match HTML or update HTML to match exact filenames. |
| 36| Bug      | Low      | js/main.js (smooth scroll)      | `document.querySelector(href)` for `href="#contact"` works; for hash with special characters or missing ID, target can be null and the handler still attaches (preventDefault only when target exists). | No incorrect behaviour; click just doesn’t scroll when target is missing. | Optional: if `!target`, don’t add the listener, or add and in handler check again and let default (navigate to hash) occur. |

---

## 10. Strategic recommendations

### Refactored architecture (medium term)

1. **Shared layout**
   - Single “layout” that includes: nav, main (placeholder), footer.
   - Options: static site generator (Eleventy, 11ty), PHP/SSI includes, or a small Node script that concatenates fragments.

2. **Sustainability**
   - Move inline script to `js/sustainability.js`.
   - Load data from `data/sustainability.json` (fetched at load) or keep a minimal inline `<script>window.sustainabilityPageData = { ... };</script>` and have the external script read it.
   - Use a single `escapeHtml` (and optional `sanitizeUrl`) for all user- or CMS-sourced strings before inserting into the DOM.

3. **Performance**
   - Build Tailwind with content purge and ship a single `tailwind.min.css`.
   - Defer non-critical JS; keep one small inline script only if needed for critical path (e.g. nav).
   - Ensure `hero.webm` exists or remove references.

### WordPress conversion

- Use the current HTML/CSS as the basis for a theme (header.php, footer.php, page templates).
- Replace sustainability’s `sustainabilityPageData` with ACF (Advanced Custom Fields) or Gutenberg blocks; render in PHP and avoid heavy client-side rendering for above-the-fold content.
- Enqueue Tailwind (or a compiled stylesheet) and `main.js`; add page-specific script only for sustainability if you keep slider/lightbox in JS.

### Headless CMS

- Keep the current site as the front end; add a build step (e.g. Eleventy, Next.js) that fetches content from headless CMS at build time.
- Map CMS content to `sustainabilityPageData` (and any other JSON shapes); run the same render functions at build time to produce static HTML, or move to a component model (e.g. React/Vue) and hydrate only where needed.
- Ensure all rendered text is escaped in the CMS → HTML pipeline.

### Next.js migration

- One route per page (e.g. `/`, `/about`, `/services`, `/sustainability`, `/news`, `/careers`, `/contact`).
- Shared `Layout` (nav + footer); each page imports its section components.
- Sustainability: fetch data in `getStaticProps` (or getServerSideProps), pass to page; render on server so content is in the initial HTML for SEO.
- Use Next `<Image>` for images and optional WebP; keep Tailwind with PostCSS.

---

## Summary table (by severity)

| Severity  | Count | Areas |
|-----------|-------|--------|
| Critical  | 0     | — |
| High      | 5     | Architecture (duplication), Rendering (innerHTML/XSS), Performance (blocking scripts, missing webm), Security (XSS), Bug (webm/logos) |
| Medium    | 9     | Architecture (inline script, guards), Rendering (helpers), JS (listeners), Performance (CSS/fonts), A11y (headings, menu focus), SEO (JS content, canonicals), Styling (colour duplication), Bug (logo case) |
| Low       | 12+   | Reusability, execution order, throttle, keydown cleanup, lazy load, script split, a11y (skip link, focus trap), SEO (JSON-LD), styling consistency, security (URL validation), smooth-scroll edge case |

**Priority order for fixes:**  
1) Escape all sustainability `innerHTML` inputs (security + stability).  
2) Confirm or remove `hero.webm` and fix client logo filenames (bugs).  
3) Defer non-critical scripts and add skip link + menu focus handling (performance + a11y).  
4) Extract sustainability script to a file and consider shared nav/footer (architecture).

---

## Appendix: Exact code snippets for critical fixes

### A. HTML escape for sustainability (Security – Issue #5, #31)

Add at the top of the sustainability inline script (before `const sustainabilityPageData`):

```javascript
function escapeHtml(str) {
  if (str == null) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
```

Then in every template literal that outputs text from data, use `escapeHtml(...)` instead of raw interpolation. Examples:

- Hero: `${escapeHtml(data.title)}`, `${escapeHtml(data.subtitle)}`
- Breadcrumb: `${escapeHtml(item.label)}`
- Pillars: `${escapeHtml(pillar.title)}`, `${escapeHtml(pillar.description)}`
- Initiatives: `${escapeHtml(item.name)}`, `${escapeHtml(item.description)}`, `${escapeHtml(item.focus)}`
- Compliance: `${escapeHtml(data.heading)}`, `${escapeHtml(data.body)}`, and each list item text
- Impact: `${escapeHtml(metric.label)}`
- Journey 2030: `${escapeHtml(p.title)}`, `${escapeHtml(p.objective)}`, `${escapeHtml(g.title)}`, each `item` in commitment groups, `${escapeHtml(data.careersBody)}`, `${escapeHtml(data.careersCtaLabel)}`
- CTA: `${escapeHtml(cta.heading)}`, `${escapeHtml(cta.body)}`, `${escapeHtml(cta.primaryLabel)}`, `${escapeHtml(cta.secondaryLabel)}`

For `href` attributes (e.g. breadcrumb, CTA, careers link): keep `href="${item.href}"` only if the value is always a safe relative path or allowlisted URL; otherwise validate or use a helper that returns `#` for invalid URLs.

### B. Skip to main content (Accessibility – Issue #23)

Add as the first focusable element inside `<body>`, before the utility panel:

```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-acll-navy focus:text-white focus:rounded-md">Skip to main content</a>
```

Add `id="main-content"` to the `<main>` element on every page. In Tailwind, ensure `sr-only` is available (it is in default Tailwind: `position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0`). If not, add to `style.css`:

```css
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
```

### C. Remove or add hero.webm (Bug – Issue #34)

If the file does not exist, remove from all pages:

- In `index.html`: delete the line `<source src="assets/video/hero.webm" type="video/webm" />` inside the hero `<video>` and inside the who-we-are video and the video modal.
- Search for `hero.webm` across the repo and remove each `<source>` that references it.
