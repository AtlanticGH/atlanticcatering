# Bug Fix & Stability Report

**Date:** Applied during analysis/troubleshoot pass  
**Scope:** Minimal, safe fixes only. No visual changes, no refactors, no new libraries.  
**Principle:** HTML remains structure/containers; JS is the single source of truth for data-driven content. All fixes prevent runtime errors when data or DOM elements are missing.

---

## 1. Sustainability page – render functions (sustainability.html)

**Issue:** Render functions could throw if `sustainabilityPageData` had missing or malformed keys (e.g. `data.hero`, `intro`, `metrics`, `cta` undefined), or if arrays were missing.

### 1.1 renderHero(data)
- **Before:** `if (!section) return;`
- **After:** `if (!section || !data) return;`
- **Reason:** Avoids reading `data.kicker`/`data.title`/`data.subtitle` when `data` is undefined.

### 1.2 renderPillars(intro, pillars)
- **Before:** `if (!section) return;`
- **After:** `if (!section || !intro || !Array.isArray(pillars) || !pillars.length) return;`
- **Reason:** Prevents access to `intro.kicker` or iterating non-arrays.

### 1.3 renderImpact(intro, metrics)
- **Before:** `if (!section) return;`
- **After:** `if (!section || !intro || !Array.isArray(metrics) || !metrics.length) return;`
- **Reason:** Ensures `intro` and a non-empty metrics array exist before template use.

### 1.4 renderInitiatives(intro, initiatives)
- **Before:** `if (!section) return;`
- **After:** `if (!section || !intro || !Array.isArray(initiatives) || !initiatives.length) return;`
- **Reason:** Same pattern; avoids null/undefined and non-array iteration.

### 1.5 renderCompliance(data)
- **Before:** `if (!section) return;`
- **After:** `if (!section || !data || !Array.isArray(data.frameworks) || !Array.isArray(data.standards) || !Array.isArray(data.reporting)) return;`
- **Reason:** Ensures `data` and required arrays exist before building markup.

### 1.6 renderJourney2030(data)
- **Before:** `if (!section || !data) return;` then `data.priorities` and `data.commitmentGroups` used directly.
- **After:** Introduced local arrays with fallbacks:
  - `const priorities = Array.isArray(data.priorities) ? data.priorities : [];`
  - `const commitmentGroups = Array.isArray(data.commitmentGroups) ? data.commitmentGroups : [];`
  - Template uses `priorities` and `commitmentGroups` instead of `data.priorities` / `data.commitmentGroups`.
- **Reason:** Prevents throw when `data.priorities` or `data.commitmentGroups` is missing or not an array.

### 1.7 renderCTA(cta)
- **Before:** `if (!section) return;`
- **After:** `if (!section || !cta) return;`
- **Reason:** Avoids reading `cta.kicker`/`cta.heading`/`cta.body` when `cta` is undefined.

---

## 2. Contact form – safe field access (contact.html)

**Issue:** Submit handler used `document.getElementById('contact-name')` (and similar) inline. If any of these IDs were removed or renamed, calling `.value` on null would throw.

- **Before:** Direct `document.getElementById('...').value` in submit handler.
- **After:**
  - Resolve required elements once: `nameEl`, `emailEl`; `if (!nameEl || !emailEl) return;` so script does not attach submit if required fields are missing.
  - In submit handler: resolve `subjectEl`, `messageEl`, `phoneEl` and use conditional access (e.g. `messageEl ? messageEl.value : ''`, `(subjectEl && subjectEl.value) ? subjectEl.value : 'Contact form'`).
- **Reason:** No `.value` on null; subject default remains "Contact form" when field is missing or empty.

---

## 3. Main.js – counter animation (js/main.js)

**Issue:** `parseInt(el.dataset.target, 10)` can return `NaN` (e.g. missing or invalid `data-target`). Passing `NaN` into the animation could produce invalid textContent.

- **Before:** `const target = parseInt(el.dataset.target, 10) || 0;` (and unused `suffix` variable).
- **After:** `const targetNum = parseInt(el.dataset.target, 10); const target = (targetNum === targetNum) ? targetNum : 0;` then `animateValue(el, 0, target, duration);`. Removed unused `suffix` from this block (suffix still read inside `animateValue` via `el.dataset.suffix`).
- **Reason:** Explicit NaN check ensures only a valid number is passed; avoids odd display or logic from NaN.

---

## 4. Sustainability page – Atlantic CARES intro from JS (sustainability.html)

**Issue:** Visible copy (“Our framework”, “Atlantic CARES”, and the two paragraphs) was static HTML. Requirement: HTML only as containers; JS single source of truth for visible content.

- **Before:** Static block in HTML:
  - `<p id="atlantic-cares-heading">Our framework</p>`
  - `<h2>Atlantic CARES</h2>`
  - Two `<p>` with body text (including `<strong>5% of our annual revenue</strong>`).
- **After:**
  - Added `atlanticCaresIntro` to `sustainabilityPageData`: `kicker`, `heading`, `body1`, `body2`, `body2Bold`, `body2Rest` (body2 split so `<strong>` can be applied with escaped text).
  - Added `renderAtlanticCaresIntro(data)` that guards `if (!container \|\| !data) return` and sets `container.innerHTML` with the same structure and classes; `escapeHtml` used for all interpolated strings.
  - Replaced the static block with a single container: `<div id="atlantic-cares-intro"><!-- Content rendered from JS --></div>`.
  - In `DOMContentLoaded`: `if (data.atlanticCaresIntro) renderAtlanticCaresIntro(data.atlanticCaresIntro);` before `renderAtlanticCaresMedia`.
- **Reason:** All visible content in the Atlantic CARES section now loads from JS; layout and design unchanged.

---

## 5. Main.js – smooth scroll anchor href guard (js/main.js)

**Issue:** For links with `href^="#"`, `anchor.getAttribute('href')` can be null in edge cases. Passing null to `document.querySelector(href)` would throw.

- **Before:** `if (href === '#') return;`
- **After:** `if (!href || href === '#') return;`
- **Reason:** Prevents `querySelector(null)`; no visual or behavioural change when href is valid.

---

## Visual & behaviour confirmation

- **Layout / design:** Unchanged. No class renames, no structural HTML changes beyond replacing static copy with a single container filled by JS.
- **Data-driven content:** Sustainability page visible content (hero, Atlantic CARES intro, gallery, pillars, impact, initiatives, compliance, journey, CTA) now loads entirely from `sustainabilityPageData` on `DOMContentLoaded`; guards prevent runs when data is missing or invalid.
- **Contact:** Form still submits via `mailto:` with the same fields; only access to those fields is null-safe.
- **Counters:** Stat and workforce numbers still animate the same way when `data-target` is present and numeric; when missing/invalid they animate to 0 instead of potentially showing NaN.
- **Smooth scroll:** Behaviour unchanged; only null/empty href is now guarded.

---

## Files touched

| File | Change summary |
|------|----------------|
| `sustainability.html` | Null/array guards in render functions; safe `priorities`/`commitmentGroups`; added `atlanticCaresIntro` data, `renderAtlanticCaresIntro()`, container `#atlantic-cares-intro`, and init call so Atlantic CARES intro loads from JS. |
| `contact.html` | Required elements resolved once and guarded; submit handler uses null-safe field access and subject default. |
| `js/main.js` | Counter init NaN-safe target; smooth-scroll guard `if (!href \|\| href === '#') return`. |

No new libraries, no refactors of control flow or markup structure beyond the single container swap, and no intentional visual regression.
