# Content Source & Production Stabilization Audit

**Date:** Production stabilization audit  
**Constraint:** All visible content sourced from JavaScript where possible; no layout/structure/class changes.

---

## 1. Content Source Audit

### 1.1 Already JS-sourced (single source of truth)

| Location | Content | Data source | Rendered by |
|----------|---------|-------------|-------------|
| **sustainability.html** | Hero (kicker, title, subtitle), pillars, impact metrics, initiatives, compliance, Journey 2030, CTA, Atlantic CARES media slider | `sustainabilityPageData` (inline script) | `renderHero`, `renderPillars`, `renderImpact`, `renderInitiatives`, `renderCompliance`, `renderJourney2030`, `renderCTA`, `renderAtlanticCaresMedia` |
| **about.html** (profile modal) | Name, role, bio in modal | `data-name`, `data-role`, `data-bio` on `.people-card` | `main.js` `openProfileModal()` |
| **services.html** (service modal) | Service name, tagline, description | `data-name`, `data-tagline`, `data-description` on `.service-card` | `main.js` `openServiceModal()` |
| **All pages** | Footer copyright year | N/A (dynamic year) | `main.js`: `footerYear.textContent = new Date().getFullYear()` |

### 1.2 Hardcoded in HTML (not JS-controlled)

| Page | Section / element | Content type | Notes |
|------|-------------------|--------------|--------|
| **index.html** | Nav (desktop + mobile) | Link labels: About, Services, Sustainability, News, Careers, Contact | Duplicated in 2 places |
| **index.html** | Hero | H1, subtitle, CTA button labels, scroll label | |
| **index.html** | Stats | Numbers (data-target) + labels ("Locations across 6 regions", etc.) | Numbers animated by JS; labels hardcoded |
| **index.html** | Who we are, clients, news, service tiles, footer | All headings, body text, links, footer tagline/headings | |
| **about.html** | Hero, achievements, Our team heading/copy, people cards (structure + visible name/role in markup), group image, workforce stats labels, footer | All visible text | People card content also in data-* (modal); card labels duplicated in HTML |
| **services.html** | Hero, service cards (labels in HTML + data-*), footer | Headings, card titles, footer | |
| **contact.html** | Hero, form labels, address, footer | All visible text | |
| **careers.html** | Hero, body copy, footer | All visible text | |
| **news.html** | Hero, filters, cards, footer | All visible text | |
| **ecommerce.html** | Hero, body, footer | All visible text | |
| **team/leadership-*.html** | Full page content + footer | Name, role, bio, footer | |
| **news/article-*.html** | Article title, date, body, footer | All visible text | |

### 1.3 Duplication (HTML + JS or HTML + data-*)

- **about.html** People cards: name and role appear both in the card markup (e.g. `<h3>Maud Lindsay-Gamrat</h3>`) and in `data-name` / `data-role`. Modal reads from data-*; visible card text is hardcoded.
- **services.html** Service cards: same pattern (visible title/copy in HTML, modal from data-*).

---

## 2. JS Rendering Validation

### 2.1 sustainability.html

- **Execution:** All rendering runs inside `document.addEventListener("DOMContentLoaded", ...)`. Order: renderHero → renderAtlanticCaresMedia → renderPillars → … → setupMetricCountUp → setupAtlanticCaresSlider → setupPillarGalleryLightbox.
- **Containers:** Each `render*` uses `document.getElementById(...)` and returns early if container is null (`if (!section) return`).
- **Idempotency:** No duplicate injection; sections are overwritten via `innerHTML` or single `appendChild` of built nodes.
- **Risk:** If `sustainabilityPageData` were undefined (e.g. script error above), later code would throw. **Fix:** Add guard at start of DOMContentLoaded callback.

### 2.2 main.js

- **Execution:** Script is loaded with `defer` at end of `<body>`, so DOM is ready when script runs. No DOMContentLoaded wrapper.
- **Modals:** Profile and service modals only bind if corresponding elements exist (`if (profileModal)` etc.). Video modal uses `videoTrigger` with null checks.
- **Counters:** `initAllCounters` runs on DOMContentLoaded if `document.readyState === 'loading'`, else immediately. Safe.
- **Footer year:** Only set if `footerYear` element exists.

### 2.3 Race conditions

- sustainability.html inline script runs in order; then `main.js` (defer) runs. No shared DOM targets between the two for initial content; lightbox and modals are independent. No race identified.

---

## 3. Safe Migration to JS (Constraint: No structural refactor)

**Constraint reminder:** *"If moving content to JS would require structural refactoring, do NOT change it. Flag it as Out of scope due to constraints."*

- **Full migration** of all hardcoded content (nav, hero, stats labels, footer copy, all page-specific text across 13 HTML files) would require:
  - Adding stable hooks (e.g. `id` or `data-content` keys) to every text-bearing element.
  - Introducing a shared and/or per-page content object and injection loop in JS.
- **Assessment:** This would touch hundreds of elements and require consistent patterns across all pages. Classed as **structural refactoring** under the current constraints.
- **Verdict:** **Out of scope due to constraints.** No change applied for these areas.

**Already compliant:** sustainability.html content is fully JS-sourced; about/services modals and footer year are JS-driven. No change to their data shapes or output.

---

## 4. Load Order & Stability Fixes Applied

### 4.1 sustainability.html – Guard for missing data

- **Issue:** If `sustainabilityPageData` were not defined (e.g. script error or partial load), the DOMContentLoaded callback would throw when calling `renderHero(data.hero)`.
- **File:** `sustainability.html` (inline script, DOMContentLoaded callback).
- **Fix:** At the start of the DOMContentLoaded callback, check for `sustainabilityPageData` and exit early if missing.

**Before:**
```javascript
document.addEventListener("DOMContentLoaded", function () {
  const data = sustainabilityPageData;
  renderHero(data.hero);
  ...
});
```

**After:**
```javascript
document.addEventListener("DOMContentLoaded", function () {
  if (typeof sustainabilityPageData === "undefined" || !sustainabilityPageData) return;
  const data = sustainabilityPageData;
  renderHero(data.hero);
  ...
});
```

**Visual change:** None. Prevents runtime error when data is missing.

### 4.2 main.js – Defensive check for mobile menu links

- **Issue:** `mobileMenu.querySelectorAll('a')` runs only inside `if (mobileMenuBtn && mobileMenu)`, so `mobileMenu` is non-null. No change required.
- **Verified:** All other getElementById/querySelector usages are either guarded (e.g. `if (profileModal)`) or used on optional features (e.g. video modal on index only). No additional guard added.

### 4.3 main.js – Footer year guard (already present)

- **Line 398–399:** `if (footerYear) footerYear.textContent = ...` — already safe. No change.

---

## 5. Performance (Non-Visual)

- **Re-renders:** sustainability only injects once on DOMContentLoaded. main.js does not re-inject content. No unnecessary re-renders.
- **DOM references:** main.js caches elements at load time (e.g. `profileModal`, `footerYear`). Acceptable; no layout thrashing observed.
- **No change applied.**

---

## 6. SEO & Accessibility (Invisible Only)

- **Sustainability:** Rendered content is in the DOM after JS runs; crawlers that execute JS will see it. Heading hierarchy is preserved by render functions.
- **Other pages:** Content is in static HTML; crawlable without JS.
- **ARIA:** Modals use `aria-hidden`, `aria-modal`; no change. Skip link and `id="main-content"` already present.
- **No change applied.**

---

## 7. Fix Summary

| # | Issue | File | Fix | Visual change |
|---|--------|------|-----|----------------|
| 1 | sustainability DOMContentLoaded could throw if `sustainabilityPageData` missing | sustainability.html | Guard: `if (typeof sustainabilityPageData === "undefined" || !sustainabilityPageData) return;` at start of callback | None |

---

## 8. Final Validation Checklist

- [x] sustainability page loads with JS as single source of truth for its content.
- [x] No structural or class changes; no new frameworks or refactors.
- [x] Content that is already JS-sourced remains CMS-mappable (sustainabilityPageData, data-* on cards).
- [x] Hardcoded content on other pages flagged as out of scope; no migration applied.
- [x] One minimal stability fix applied (sustainability data guard).
- [x] Load order: main.js deferred; sustainability inline runs then main.js; counters use DOMContentLoaded when needed.
