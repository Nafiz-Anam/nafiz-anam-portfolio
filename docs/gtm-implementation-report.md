# GTM Implementation Report

Every event from the tracking plan is wired into the codebase, and the GTM container itself is now built out (v2) — tags, trigger, variables, real GA4 Measurement ID. What's left is verification + a few things only the GTM/GA4 UI can do.

**Status:** 17 events live in code · GTM container built and configured, **not yet published** (still a draft workspace) · GA4 DebugView verification not yet done

---

## GTM container (built 2026-09-05)

Account `6375131073`, container **`nafizanam.com - web v2`** (`GTM-MF2BSK9W`, containerId `263228431`), default workspace `2`. Built via the GTM MCP tools, not the UI.

- **Built-in variables enabled:** Event, Page URL, Page Path, Page Hostname, Referrer
- **20 Data Layer Variables**, one per event param key (`DLV - <key>`): question_text, nav_label, duration_mins, service_name, source_page, cta_location, form_name, field_name, error_type, category, budget_range, topic_name, case_study_title, search_term, location, project_type, timeline, article_slug, percent, platform
- **1 Constant variable** `GA4 - Measurement ID` = `G-X7F8WQB3PE` (real value, set 2026-09-05)
- **1 trigger** `CE - Tracked dataLayer Events` (Custom Event, regex-matches all 17 event names below — this is the same custom-event fan-in for every event, not one trigger per event)
- **2 tags, both live (unpaused):**
  - `GA4 - Configuration` (type `googtag`) — fires on All Pages, `tagId` = `{{GA4 - Measurement ID}}`
  - `GA4 - Custom Events` (type `gaawe`) — fires on the trigger above, `eventName` = `{{Event}}`, `measurementIdOverride` = `{{GA4 - Measurement ID}}`, all 20 DLVs mapped as GA4 event params via `eventSettingsTable`. One generic tag for every event, not 17 bespoke ones — GTM omits any param that resolves undefined for a given event, so this is safe.

There's also a second, empty, unrelated container **`nafizanam.com - server v2`** (`GTM-KWNKPWKQ`, containerId `263238072`, usageContext `server`) — reserved for a future server-side tagging setup, not part of this work.

### Known gap: `page_path` isn't forwarded on custom events

The original code-side plan (below) has every event auto-attach `page_path` via `trackEvent()`. The GA4 Custom Events tag does **not** currently map that key to a GA4 event param — there's no `DLV - page_path` and it's not in `eventSettingsTable`. GA4 still gets `page_location`/`page_referrer` for free from the Configuration tag's automatic page_view, but the per-event `page_path` value itself is dropped. Fix: add a `DLV - page_path` variable and one more row in the event tag's `eventSettingsTable` if this is wanted on every event row in GA4.

## Setup checklist

1. ~~Create the GTM container~~ — done, `GTM-MF2BSK9W`.
2. ~~Paste it into the CMS~~ — done, CMS → Settings → General → `Google Tag Manager Container ID` field exists (`apps/cms/app/settings/page.tsx`); **confirm the actual CMS site-config row has `GTM-MF2BSK9W`, not the built-in field wiring** — this report doesn't cover the CMS data itself, only the GTM container.
3. ~~Add the GA4 Configuration tag~~ — done, `GA4 - Configuration`, live.
4. **Add the built-in Scroll Depth trigger** — GTM → Triggers → new → Scroll Depth, thresholds 25/50/75/90, fires on All Pages. Still not created. This is the only event on the list that isn't in the codebase — GTM tracks it natively. No corresponding GA4 event tag exists for it either.
5. ~~Per-event trigger/tag wiring~~ — done, but via **one shared trigger + one shared tag** (see above) instead of one pair per event; functionally equivalent, less container clutter.
6. **Mark the real conversions** — `call_booking_confirmed`, `form_submit_contact`, and `form_submit_homepage` → GA4 Admin → Events → toggle "Mark as conversion". Not `cta_book_call_click` — that's intent, not a booked call. Not done — GA4 Admin UI only, not reachable via the GTM API/MCP tools used here.
7. **Publish the GTM workspace** — everything above is still an unpublished draft (`Workspace Changes` in the GTM UI). Preview it, then Submit to create a version and go live. Not done.
8. **Verify in GA4 DebugView before trusting any of it** — enable the GTM Preview panel, click through the site, confirm each event and its parameters land as expected, and specifically check the `page_path` gap above. Not done.

---

## Event catalog

Every event carries `page_path` automatically.

### `cta_book_call_click`

Any "Book a Call / Discovery Call" button, anywhere — opens the in-page booking modal.

**Fires from:** `components/sections/BookingButton.tsx`

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/services` | Auto-attached to every event. |
| `cta_location` | always | `hero`, `footer` … | Which of the 23 instances was clicked — full list below. |
| `case_study_title` | conditional | `"Fintech Ledger Rebuild"` | Only on the two case-study detail page CTAs. |
| `article_slug` | conditional | `why-saas-products-fail-year-two` | Only on the end-of-article CTA (`cta_location: blog_cta`). |

`cta_location` values observed in code (23):

```
nav, hero, stats_band, footer, insights_hero, how_it_work_hero, how_it_work_cta,
about_hero, about_cta, services_hero, services_cta, case_studies_hero, case_studies_cta,
case_studies_empty_state, case_study_final_cta, case_study_detail_hero,
case_study_detail_final, service_page_hero, service_page_final_cta, blog_cta,
contact_hero, contact_connect_card, contact_final_cta
```

### `call_booking_confirmed`

The real conversion — fires only once `POST /booking` succeeds, not on the button click.

**Fires from:** `components/sections/BookingModal.tsx`, after the API call resolves

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/contact` | Page the modal was opened from. |
| `duration_mins` | always | `30` | Slot length from the booking config. |

### `form_submit_contact`

Successful `POST /contact` from the Contact page's Project Inquiry form.

**Fires from:** `components/templates/ContactPageTemplate.tsx` → `ProjectInquiryForm`

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/contact` | |
| `project_type` | always | `new-mvp` | Raw select value: new-mvp / scaling / legacy / automation / consulting / retainer / other. `null` if left blank. |
| `budget_range` | always | `25-50k` | under-10k … 100k-plus, undecided. `null` if blank. |
| `timeline` | always | `1-3mo` | asap / 1-3mo / 3-6mo / flexible. `null` if blank. |

### `form_submit_homepage`

Successful `POST /contact` from the homepage "Let's Get Connected" form.

**Fires from:** `components/sections/ContactSection.tsx`

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/` | |
| `category` | always | `"AI & Automation"` | Full label text, not a slug — this form uses labels directly as values. |
| `budget_range` | always | `"$25,000 – $50,000"` | Same — full label text. |

### `whatsapp_click`

Click on any `wa.me` link.

**Fires from:** `Footer.tsx` (via `TrackedLink`), `ContactPageTemplate.tsx` side panel

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/contact` | |
| `location` | always | `footer`, `contact_side_panel` | 2 instances currently. |

### `email_click`

Click on any `mailto:hi@nafizanam.com` link.

**Fires from:** `Footer.tsx`, and 3 spots in `ContactPageTemplate.tsx`

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/contact` | |
| `location` | always | `footer`, `contact_hero`, `contact_side_panel`, `contact_connect_card` | 4 instances currently. |

### `scroll_depth`

25/50/75/90% scroll thresholds, any page. **No code** — this is GTM's built-in Scroll Depth trigger (step 4 in setup). GTM sends `Scroll Depth Threshold` and `Scroll Depth Units` automatically; no `dataLayer.push` in the codebase for this one.

### `faq_toggle_open`

Any FAQ accordion item opened (fires on open only, not close), on every page that uses the shared `Accordion` component.

**Fires from:** `components/Accordion.tsx`

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/how-i-work` | |
| `question_text` | always | `"What if I don't know exactly what I need yet?"` | The exact question string. |

### `nav_link_click`

Any main nav link, including the Services mega-menu items and its "View All Services" link.

**Fires from:** `components/sections/Nav.tsx`

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/` | |
| `nav_label` | always | `Services`, `Custom Software Development`, `View All Services` | |

### `social_link_click`

Footer LinkedIn / GitHub / Facebook icons.

**Fires from:** `components/sections/Footer.tsx` (via `TrackedLink`)

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/` | |
| `platform` | always | `LinkedIn`, `GitHub`, `Facebook` | |

### `service_card_click`

Homepage service card, or the "Learn More" link on the Services page card.

**Fires from:** `components/sections/Services.tsx` (homepage), `components/sections/services/ServicesOverview.tsx` (services page)

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/` | |
| `service_name` | always | `"Custom Software Development"` | |
| `source_page` | always | `homepage`, `services_page` | |

### `case_study_card_click`

Case study card — image, title, or "Read Case Study" link, on the Case Studies grid.

**Fires from:** `components/sections/case-studies/CaseStudiesGrid.tsx`

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/case-studies` | |
| `case_study_title` | always | `"Fintech Ledger Rebuild"` | |

### `case_study_search`

Typing in the Case Studies search box. Debounced 800ms after the last keystroke, and only fires for a non-empty query — avoids firing on every keystroke.

**Fires from:** `components/sections/case-studies/CaseStudiesGrid.tsx`

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/case-studies` | |
| `search_term` | always | `"fintech"` | |

### `insights_topic_filter_click`

Clicking a topic pill on the Insights page.

**Fires from:** `components/sections/insights/ArticlesSection.tsx`

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/insights` | |
| `topic_name` | always | `"Architecture"`, `"All"` | |

### `article_scroll_depth`

25/50/75/100% scroll on a blog article. Custom-tracked (not the GTM built-in trigger) so it can carry `article_slug`; each threshold fires once per page view.

**Fires from:** `components/templates/ArticlePageTemplate.tsx`

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/insights/why-saas-products-fail-year-two` | |
| `article_slug` | always | `why-saas-products-fail-year-two` | |
| `percent` | always | `25`, `50`, `75`, `100` | |

### `blog_cta_click` — merged into `cta_book_call_click`

Not a separate event. The end-of-article CTA fires `cta_book_call_click` with `cta_location: "blog_cta"` and `article_slug` attached — see that event above. Keeping it as one event avoids double-counting a single click.

### `calendar_booking_click` — merged into `cta_book_call_click`

Not a separate event. There's no standalone calendar link on this site — the "Booking Calendar" card on the Contact page opens the same in-app modal as every other booking button, so it fires `cta_book_call_click` with `cta_location: "contact_connect_card"`.

### `form_start`

First field interaction (focus) on either contact form. Fires once per form per page load.

**Fires from:** `components/templates/ContactPageTemplate.tsx` (Project Inquiry form), `components/sections/ContactSection.tsx` (homepage form)

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/contact` | |
| `form_name` | always | `contact_page`, `homepage` | |

### `form_field_budget_selected`

Budget dropdown selection, on either form — fires even if the form is never submitted.

**Fires from:** `ContactPageTemplate.tsx` and `ContactSection.tsx`

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/contact` | |
| `budget_range` | always | `25-50k` (contact page, raw value) or `"$25,000 – $50,000"` (homepage, label text) | Same value shape difference as the two submit events. |

### `form_error`

Validation failure on submit, on either form. Fires once per failing field.

**Fires from:** `ContactPageTemplate.tsx` and `ContactSection.tsx`

| Parameter | Sent | Example | Notes |
|---|---|---|---|
| `page_path` | always | `/contact` | |
| `field_name` | always | `email`, `description` | |
| `error_type` | always | `"Enter a valid email address"` | The validation message itself, not a coded error type. |

---

## Deviations from the original draft plan

- **`call_booking_confirmed` is the real conversion, not the CTA click.** Booking isn't Calendly — it's an in-app modal that posts to `/booking`. Mark this one as the GA4 conversion, not `cta_book_call_click`.
- **`calendar_booking_click` and `blog_cta_click` were folded into `cta_book_call_click`** (with `cta_location` / `article_slug` params) rather than kept as separate events, since both are the same physical button click as every other booking CTA — a separate event would have double-counted one click.
- **`scroll_depth` has no code** — it's GTM's built-in Scroll Depth trigger, set up entirely in the GTM UI (step 4 above).
