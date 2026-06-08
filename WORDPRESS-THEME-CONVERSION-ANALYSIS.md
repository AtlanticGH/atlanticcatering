# WordPress Theme Conversion Analysis

**Site:** Atlantic Catering & Logistics Limited (static HTML/CSS/JS)  
**Scope:** Analysis only — no code changes, no redesign, no refactors.  
**Goal:** Assess compatibility for conversion to a custom WordPress PHP theme while keeping all existing design, layout, functions, and behaviors intact.

---

## Executive Summary

| Aspect | Finding |
|--------|--------|
| **Overall WordPress compatibility score** | **Medium–High** |
| **Template structure** | Header/footer are consistent and map cleanly to `header.php` / `footer.php`. One layout variant (index hero vs. interior) is easy to handle with body class / template conditionals. |
| **Content architecture** | Clear mapping to Pages, one CPT (News), optional CPTs (Team/Leadership, Services). Heavy use of structured data on Sustainability fits ACF Options or repeater fields. |
| **JavaScript** | Most logic is presentational (modals, menu, scroll). Sustainability’s JS-rendered content can be moved to PHP with the same data model. No fundamental blocker. |
| **Styling & assets** | Tailwind via CDN + custom CSS is compatible. Requires enqueue strategy and path handling; no structural change to design. |
| **Main adjustment areas** | (1) Replace static nav with `wp_nav_menu`. (2) Convert sustainability’s inline data + render to PHP (Options/ACF + template parts). (3) Replace hardcoded links with `get_permalink` / `home_url`. (4) Contact form: keep mailto or integrate CF7/WPForms. |
| **Potential blockers** | None that prevent conversion. Tailwind CDN in WordPress is acceptable; alternatively, build a static CSS from Tailwind config and enqueue it. |

---

## 1. Template & Layout Structure

### 1.1 What Maps Cleanly

- **Header:** Identical structure across all pages (logo, desktop nav, mobile hamburger, mobile panel). Markup is semantic (`<header>`, `<nav>`, `aria-*`). **Maps to:** `header.php`. Only difference: index uses `nav-over-hero` and transparent border for “over hero” state; other pages use solid nav. **Approach:** Use `body_class()` (e.g. `page-index` on front page) and optionally a conditional in the header for the extra class; no layout change.
- **Footer:** Same on every page (logo, Contact block, Compliance block, copyright + `#footer-year`). **Maps to:** `footer.php`. Year is set by JS; in WP can stay as JS or be replaced with `<?php echo date('Y'); ?>`.
- **Main content area:** Each page has `<main id="main-content">` and one or more sections. **Maps to:** `page.php`, `front-page.php`, `single.php`, etc., with the main content between `get_header()` and `get_footer()`.
- **Semantic HTML:** Skip link, landmarks, heading hierarchy, and ARIA usage are theme-friendly and should be preserved.

### 1.2 Reusable Sections → Template Parts

| Current content | WordPress approach |
|----------------|---------------------|
| Page hero (navy strip with kicker, h1, intro) | Reusable `template-parts/page-hero.php` with passed or global vars (kicker, title, intro). |
| Stats grid (index) | `template-parts/section-stats.php` or block in `front-page.php`; numbers from options/ACF. |
| Service cards grid | `template-parts/section-services.php` or loop over CPT/ACF. |
| People/leadership grid | `template-parts/section-people.php` or loop over Team CPT / ACF repeater. |
| News tiles + filters | `template-parts/section-news-tiles.php`; loop `WP_Query` for posts; filter by category/taxonomy. |
| Footer | Always `footer.php`. |

### 1.3 Layout Variants

- **Index:** Full-viewport hero with video, scroll indicator, then stats, “Who we are”, news collage, clients, services strip, footer. Optional modal (video). **Maps to:** `front-page.php` (or `home.php` if you use a static front page and this as a custom template).
- **Interior pages (About, Services, Sustainability, Contact, News, Careers):** Same header/footer; navy hero strip then page-specific content. **Maps to:** `page-about.php`, `page-services.php`, `page-sustainability.php`, etc., or one `page.php` with template parts selected by page slug or Page Template.
- **News single (article-1/2/3):** Same header/footer; article with hero, content, back link. **Maps to:** `single.php` or `single-news.php` for a News CPT.
- **Team (leadership-1/3):** Same pattern. **Maps to:** `single-team.php` if using a Team CPT.

**Conclusion:** Template and layout structure are well suited to WordPress template hierarchy and template parts. No redesign required.

---

## 2. Content Architecture

### 2.1 Content Types Identified

| Type | Current implementation | Recommended WordPress mapping |
|------|------------------------|--------------------------------|
| **Static pages** | index, about, services, sustainability, contact, careers, news (listing), ecommerce | **Pages** (or Custom Page Templates). Ecommerce could stay as a static “coming soon” page or integrate WooCommerce later. |
| **News / updates** | news.html + news/article-1.html, article-2.html, article-3.html with category (award, milestone, recognition) | **Custom Post Type “News”** (or standard Posts) with **Category** taxonomy (Award, Milestone, Recognition). Single = `single-news.php` or `single.php`. |
| **Team / leadership** | about.html embeds people cards; team/leadership-1.html, leadership-3.html as standalone profiles | **Option A:** ACF repeater on About page (current structure). **Option B:** CPT “Team” with single-team.php for full profile; archive or shortcode for grid on About. |
| **Services** | services.html: 9 service cards with name, tagline, description, image. Modal shows same. | **Option A:** ACF repeater or flexible content on Services page. **Option B:** CPT “Service” with fields for tagline, description, image; archive = grid, single = optional. |
| **Sustainability** | Large inline JS object `sustainabilityPageData` (hero, atlanticCaresMedia, atlanticCaresIntro, pillars, impactMetrics, initiatives, compliance, journey2030, cta). Rendered by JS into empty containers. | **ACF Options page** or **ACF “Sustainability” options** (repeaters, groups, repeaters for arrays). Template outputs same markup via PHP (no change to design). |
| **Navigation** | 6 items hardcoded (About, Services, Sustainability, News, Careers, Contact) | **WP Menu** (Appearance → Menus). `wp_nav_menu()` with a custom walker or CSS classes to preserve `nav-link`, `text-acll-green`, `font-medium` for current item. |
| **Contact details** | Emails, phone, address in contact.html and footer | **ACF options** or theme mods; output in `footer.php` and `page-contact.php`. |
| **Stats (index)** | 6 stat cards with `data-target` (15, 3M+, 6000, 565, 6, 3) and labels | **ACF** or **Customizer** on front page or options; output with same `data-target` and labels so existing JS still animates. |
| **Client logos** | Two rows of logo images (left/right scroll) on index | **ACF repeater** (image + name) or **Media gallery**; loop in template. |
| **Awards (about)** | 4 award cards with image, title, short text | **ACF repeater** on About page or options. |

### 2.2 Hardcoded Content That Must Become Dynamic

- **All navigation links:** Replace with `wp_nav_menu()` or `get_permalink()` for each menu item.
- **Logo URLs:** Use `get_template_directory_uri() . '/assets/images/...'` or ACF for logo image(s).
- **Canonical, og:url, og:image:** Replace with `wp_head()`, Yoast/Rank Math, or custom `add_theme_support('title-tag')` + meta tags from ACF/options.
- **Footer year:** Already dynamic (JS); can stay or become `date('Y')` in PHP.
- **Sustainability:** Entire `sustainabilityPageData` object moved to ACF Options (or equivalent) and output by PHP in `page-sustainability.php` (or template part).
- **News tiles:** Title, excerpt, link, image, category from WP (CPT or Post) + taxonomy.
- **People cards:** Name, role, bio, image from ACF repeater or Team CPT.
- **Service cards:** Name, tagline, description, image from ACF or Service CPT.
- **Contact form:** Currently mailto. Can remain client-side mailto or be replaced with Contact Form 7 / WPForms; form markup can stay similar.

**Conclusion:** Content architecture is clear. Most content fits Pages + ACF (repeaters, options). One CPT for News (and optionally Team, Service) keeps the same UX and design.

---

## 3. JavaScript Rendering & Logic

### 3.1 Current JS Responsibilities

| Feature | Where | WordPress approach |
|--------|--------|---------------------|
| Mobile menu toggle | main.js | Keep as-is. Same DOM IDs/classes in `header.php`. |
| Smooth scroll (# anchors) | main.js | Keep. No dependency on WP. |
| Profile modal (about) | main.js | Keep. Content comes from `data-*` on cards; cards can be output by PHP from ACF/CPT with same attributes. |
| Service modal (services) | main.js | Same: PHP outputs cards with `data-name`, `data-tagline`, `data-description`, `data-image` (or background image); JS unchanged. |
| Video modal (index) | main.js | Keep. Video URL can be from ACF or hardcoded in template. |
| Animated counters | main.js | Keep. PHP outputs elements with same `data-target`, `data-suffix`; no change. |
| Scroll fade-in | main.js | Keep. Same class `fade-in` on sections. |
| Service horizontal scroll (index) | main.js | Keep. Same IDs/structure. |
| Nav background (index hero) | main.js | Keep. Depends on `#hero-section` and `#main-nav`; front-page template keeps these. |
| Footer year | main.js | Keep or replace with PHP. |
| News filter (all / award / milestone / recognition) | news.html inline | Keep as JS filter, or replace with server-side (different URLs or AJAX). Tiles output by PHP loop; `data-category` from taxonomy. |
| Contact form submit | contact.html inline | mailto or replace with form plugin; handler stays server-side or mailto. |
| **Sustainability page** | sustainability.html inline | **Move to PHP:** Data currently in `sustainabilityPageData` becomes ACF Options (or stored in options table). All `render*` functions become PHP template parts or inline PHP in one or more template parts. Slider, pillar galleries, metrics, initiatives, compliance, journey, CTA all output server-side with same HTML/CSS. Minimal or no JS for “rendering”; JS only for slider behavior, lightbox, metric count-up if kept. |

### 3.2 Sustainability: JS → PHP Translation

- **Data source:** `sustainabilityPageData` → ACF Options page “Sustainability” (or multiple option groups). Repeaters for `atlanticCaresMedia`, `pillars`, `impactMetrics`, `initiatives`; groups for `hero`, `atlanticCaresIntro`, `pillarsIntro`, `impactIntro`, `compliance`, `journey2030`, `cta`.
- **Rendering:** Each `render*` function (e.g. `renderHero`, `renderAtlanticCaresIntro`, `renderAtlanticCaresMedia`, `renderPillars`, `renderImpact`, `renderInitiatives`, `renderCompliance`, `renderJourney2030`, `renderCTA`) becomes a PHP snippet that:
  - Gets data from `get_field('...')` or `get_option(...)`.
  - Outputs the same HTML structure (and CSS classes) as today.
- **Slider (Atlantic CARES):** Markup generated in PHP; keep existing JS for slide switching and auto-advance (or re-use the same script with same class names).
- **Pillar galleries / lightbox:** Static HTML for the three pillars is already in the page; only the “impact” and “initiatives” sections are JS-rendered. Those can be output by PHP; lightbox JS stays.

**Conclusion:** No fundamental incompatibility. Sustainability is the only “app-like” page; converting it to PHP templates + ACF preserves design and behavior. Existing JS for modals, menu, counters, and slider remains valid.

---

## 4. Styling & Assets

### 4.1 Current Setup

- **Tailwind:** Loaded from CDN (`https://cdn.tailwindcss.com`). Custom config in `js/tailwind-config.js` (colors: acll-navy, acll-green, acll-orange, acll-gray, acll-muted; font: Plus Jakarta Sans; letterSpacing).
- **Custom CSS:** `css/style.css` — large file with overrides, component styles, responsive rules.
- **Fonts:** Google Fonts (Plus Jakarta Sans) via link.
- **Images:** `assets/images/` (logos, photos, client logos). Video in `assets/video/`.

### 4.2 WordPress Compatibility

- **Tailwind:** Works in WordPress. Enqueue the Tailwind script (or, for production, use a built CSS file from Tailwind and enqueue that). Config can be inlined before Tailwind or compiled into the CSS. **No design change.**
- **Paths:** Replace `href="css/style.css"` and `src="js/..."` with `get_template_directory_uri() . '/css/style.css'` and same for JS. Image paths in templates: `get_template_directory_uri() . '/assets/images/...'` or ACF image field URLs.
- **Enqueue:** Use `wp_enqueue_style` and `wp_enqueue_script` in `functions.php`; dependencies (e.g. Tailwind before tailwind-config) can be declared. `wp_enqueue_script( ..., array(), null, true )` for footer.
- **Body/page class:** Use `body_class()` so that `page-index`, `page-about`, etc. are present; index can use `front-page` or a custom class for hero nav behavior.

**Conclusion:** Styling and assets are enqueue-ready. Tailwind + custom CSS can be kept as-is with path and enqueue adjustments only.

---

## 5. Interactivity & Functionality

| Feature | Stays JS? | PHP role |
|---------|-----------|----------|
| Mobile menu | Yes | Markup in header.php |
| Smooth scroll | Yes | — |
| Profile modal | Yes | Output cards with data-* in PHP |
| Service modal | Yes | Output cards with data-* in PHP |
| Video modal | Yes | Optional: video URL from ACF |
| Counters | Yes | Output stat markup with data-target in PHP |
| Fade-in on scroll | Yes | — |
| Service strip scroll | Yes | — |
| Nav background (hero) | Yes | Only on front page |
| News filter | Yes (or server-side) | Loop and data-category from taxonomy |
| Contact form | Either | mailto or form plugin; no redesign |
| Sustainability slider | Yes | Markup from PHP; JS drives slides |
| Sustainability pillar lightbox | Yes | Markup from PHP |
| Metric count-up (sustainability) | Yes | Markup from PHP with data-metric-* |

No plugin is strictly required. Contact form can stay mailto or use Contact Form 7 / WPForms for server-side handling. No change to design or layout.

---

## 6. SEO & Accessibility

### 6.1 SEO

- **Title/meta:** Each page has `<title>`, `<meta name="description">`, `<link rel="canonical">`, and Open Graph tags. **WordPress:** Use `add_theme_support('title-tag')`, and either Yoast/Rank Math for meta/OG or custom meta from ACF/options. Same values can be driven per page/post.
- **Structure:** Heading hierarchy (h1 → h2 → h3) and semantic sections are already in place and can be preserved in PHP templates.

### 6.2 Accessibility

- Skip link, ARIA on menu and modals, focus handling, and semantic HTML are theme-ready. No change needed beyond keeping the same markup when converting to PHP.

---

## 7. Security & Best Practices

### 7.1 Inline Scripts and DOM Injection

- **Sustainability:** Large inline script with `sustainabilityPageData` and `innerHTML` via `escapeHtml()`. **In WordPress:** Remove from front-end; data comes from ACF/options; output is server-side PHP with escaping (e.g. `esc_html()`, `esc_attr()`). Reduces XSS surface and is the right approach.
- **News/contact:** Small inline scripts (filter, form submit). Can stay as inline (with care) or moved to a single enqueued JS file; form handling should be server-side if not mailto.

### 7.2 Data Handling

- No sensitive data in client-side data. In WP, ACF and options are server-side; no change to security model. Contact form: if replaced with a plugin, use nonces and sanitization per plugin/WordPress standards.

### 7.3 PHP / WordPress

- Use escaping for all dynamic output (`esc_html`, `esc_attr`, `esc_url`). Use `wp_kses_post` only where HTML is intended. ACF returns values that must still be escaped when output. No new security risks if theme follows WP escaping and no raw `echo` of user or DB content.

---

## 8. What Maps Cleanly to WordPress

- Header and footer → `header.php`, `footer.php`.
- Page layout (main + sections) → `front-page.php`, `page.php`, `page-{slug}.php`, or template parts.
- Navigation → `wp_nav_menu()` with custom classes for current item.
- Static content (hero text, intros) → ACF fields or editor content; same markup.
- News listing and single → CPT (or Posts) + `archive-news.php` / `single-news.php`.
- People grid and profile modal → ACF repeater or Team CPT; same `data-*` and markup.
- Service cards and modal → ACF repeater or Service CPT; same markup.
- Sustainability data → ACF Options (or options table); PHP template parts output same HTML.
- Stats, client logos, awards → ACF or Customizer; output with same structure and `data-*` where needed.
- All CSS and JS → Enqueued with correct paths; Tailwind config and behavior unchanged.
- SEO/meta → Title tag support + Yoast/Rank Math or custom meta from ACF.

---

## 9. What Requires Adjustment (Design Unchanged)

- **Paths:** All asset and link URLs to use `get_template_directory_uri()`, `get_permalink()`, `home_url()`.
- **Navigation:** Replace static list with `wp_nav_menu()`; assign menu in dashboard; optionally custom walker for exact class names.
- **Sustainability:** Remove inline JS data and render; add ACF Options (or equivalent) and PHP template parts that output the same HTML.
- **Index hero/nav:** Ensure front page template outputs `#hero-section` and body class so existing JS and CSS still apply.
- **Contact form:** Keep mailto or switch to plugin; preserve layout and styling.
- **Footer year:** Keep JS or use PHP `date('Y')`.
- **Canonical/OG:** Switch to WP/plugin-driven meta; keep same values per page.

---

## 10. Potential Blockers or Risks

- **None that block conversion.** Risks are manageable:
  - **Tailwind CDN:** Some hosts or policies prefer no CDN; then compile Tailwind to a static CSS and enqueue it.
  - **Sustainability complexity:** More work to map every field to ACF and replicate HTML in PHP, but structure is clear; no redesign.
  - **Menu:** If `wp_nav_menu()` output doesn’t match current markup, a custom walker or `nav_menu_css_class` / `nav_menu_link_attributes` can get exact classes and structure.

---

## 11. Recommended WordPress Architecture

### 11.1 Template Files

- `header.php` — Logo, `wp_nav_menu()` (desktop + mobile), same IDs/classes.
- `footer.php` — Same footer; year via JS or PHP.
- `front-page.php` — Index: hero, stats, who we are, news collage, clients, services strip, video modal.
- `page.php` — Default for interior pages (or use specific templates).
- `page-about.php` — About content + people grid + profile modal + awards.
- `page-services.php` — Services grid + service modal.
- `page-sustainability.php` — Sustainability sections; each section a template part or inline PHP pulling from ACF Options.
- `page-contact.php` — Contact details + form.
- `page-careers.php` — Careers content.
- `page-news.php` or `home.php` — News listing (if News is CPT, use `archive-news.php`).
- `single-news.php` — Single news article (or `single.php` if using Posts).
- `single-team.php` — Optional; for standalone team profile pages.
- `template-parts/page-hero.php` — Reusable navy hero.
- `template-parts/section-stats.php`, `section-services.php`, `section-people.php`, `section-news-tiles.php`, etc. — As needed.
- `template-parts/sustainability-*.php` — One per major block (hero, atlantic-cares-intro, gallery, pillars, impact, initiatives, compliance, journey, cta) to keep `page-sustainability.php` readable.

### 11.2 Custom Post Types

- **News** — Post type with supports: title, editor, thumbnail, excerpt. Used for news tiles and single articles. Taxonomy: Category (Award, Milestone, Recognition) or custom taxonomy.
- **Team** (optional) — For leadership profiles with full bio pages; archive or shortcode for grid on About.
- **Service** (optional) — If you prefer services as entries rather than ACF repeater on one page.

### 11.3 Custom Fields (ACF)

- **Options / Theme options:** Site contact details, footer text, default OG image.
- **Sustainability options:** Full replication of `sustainabilityPageData`: hero, atlanticCaresMedia (repeater), atlanticCaresIntro, pillarsIntro, pillars (repeater), impactIntro, impactMetrics (repeater), initiativesIntro, initiatives (repeater), compliance (group with repeater subfields), journey2030 (group with repeater subfields), cta.
- **Front page:** Stats (repeater: value, label, suffix), client logos (repeater: image), video URL for hero and “Who we are”.
- **About page:** People (repeater: name, role, bio, image), awards (repeater: image, title, text).
- **Services page:** Services (repeater: name, tagline, description, image) unless using Service CPT.
- **News:** Standard post fields + category; optional ACF for featured image, excerpt, link override.

### 11.4 Conversion Strategy (Minimal-Change Approach)

1. **Create theme skeleton:** `style.css` (theme header), `functions.php` (enqueue, theme support, register nav menu), `header.php`, `footer.php`, `index.php`.
2. **Implement header/footer:** Copy current markup; replace logo and nav with `get_template_directory_uri()` and `wp_nav_menu()`; preserve IDs and classes.
3. **Implement front-page.php:** Copy index content; replace stats, clients, services with PHP loops over ACF; keep all sections and modals; same IDs/classes.
4. **Implement interior pages:** One by one (about, services, contact, careers, news listing); replace hardcoded content with ACF or editor; keep structure.
5. **Implement sustainability:** Add ACF Options for sustainability; create template parts that output same HTML from ACF; remove inline JS data and render; keep slider/lightbox JS.
6. **Implement News CPT and single:** Archive = news tiles + filter; single = article layout; taxonomy for filter.
7. **Enqueue all assets:** Tailwind (or built CSS), tailwind-config if needed, style.css, main.js; correct paths and dependencies.
8. **Test:** Menu, modals, counters, slider, filters, form, responsive behavior — all unchanged in appearance and behavior.

---

## 12. Summary Table

| Area | Compatibility | Notes |
|------|----------------|--------|
| Template structure | High | Header, footer, main map directly; one conditional for index hero. |
| Content architecture | High | Pages + ACF + optional CPTs; clear mapping. |
| JS rendering | Medium | Sustainability moves to PHP; rest of JS stays. |
| Styling & assets | High | Enqueue and path handling only. |
| Interactivity | High | No redesign; JS and PHP roles clear. |
| SEO & a11y | High | Already in good shape; WP/plugins support. |
| Security | High | Moving data to server-side improves safety. |

**Overall:** The site is suitable for conversion into a custom WordPress theme with **medium–high** compatibility. Design, layout, and behavior can be preserved; the main effort is converting the sustainability page from JS-driven to PHP/ACF-driven and wiring all content to WordPress (menus, ACF, optional CPTs) and correct asset enqueuing.
