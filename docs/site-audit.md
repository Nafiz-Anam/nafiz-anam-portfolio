# Site audit: high-ticket positioning

Scope: `apps/web` source code, static content, metadata, and config. Not covered: live site rendering, Lighthouse/CWV numbers, and CMS/DB content (case studies, testimonials, blog posts, site-config values live in Postgres and were not read). Items marked "needs check" depend on that.

## Fixed in this pass

| Issue | Fix |
| --- | --- |
| Em dashes in visible copy (contact form helper, contact confirmation, OG alt text, page title template, JSON-LD names, RSS title, draft banners, stats band, case study template, placeholder testimonials) | Replaced with periods, colons, commas, or `\|` in titles |
| Case study template used "we"/"Services We Provided" | Now "I" / "Services provided:" |
| Employer name: GrainX vs Grain Marketplace | Standardised on Grain Marketplace (2 of 3 mentions, and the timeline) |
| Project count: 800+ vs 100+ | Standardised on 500+ everywhere (confirmed by you): AuthoritySnapshot, StatsBand, placeholder default, CMS default, How I Work copy |
| Services heading said "Six Ways", 8 services listed | "Eight Ways I Get Involved" |
| "Two Kinds of Clients", 3 listed | "Three Kinds"; the 4 FAQ answers (home, home JSON-LD, contact page, contact template) updated to match |
| `llms.txt` missing Tracking & Analytics and Ecommerce Engineering, and had an em dash | Added both, removed the dash |
| Contact form missing Tracking & Analytics and Ecommerce categories | Added to both forms |
| Dead mock content in `lib/article-content.ts`, `lib/case-study-content.ts` | Data removed, types kept (templates import them) |
| About timeline gap 2019 to 2021 | Added "Freelance Software Engineer, 2019 to 2021" entry. **Review the wording.** |
| No Content-Security-Policy | Added to `apps/web` and `apps/cms` (`next.config.mjs`). CMS also gets the other security headers it lacked. Removed the unused `apps/cms/next.config.ts` (Next 14 ignores it). API already gets CSP from helmet. **Not tested in a browser.** If GTM loads extra tags (Meta, TikTok, etc.), add their hosts to `script-src`, `connect-src` and `img-src` in `apps/web/next.config.mjs`. |

## Not fixed: needs your input

1. **Case study intros (DB content).** The six live case studies are CMS data, so they cannot be fixed in code. The summaries use "we/our" and old agency lines. `packages/db/prisma/seed-case-study-demo.ts` still contains "Ready to take your business to the next level?" and the "We developed..." voice. If that seed is run on prod it reintroduces the problem. To rewrite them I need, per project: client type, your role, the real outcome numbers, and whether the client is public.
2. **Missing case studies for the headline services.** No SaaS, marketplace, infrastructure, tracking, or Servero.io proof. Highest-impact content gap for funded founders. A Servero.io case study (your own product, no client permission needed) is the fastest to ship.

## Found in code, not yet changed

Ordered by impact on a high-ticket buyer.

1. **Intro overlay on non-home routes.** The homepage now skips the splash and the hero no longer waits on JS (recent perf commits). Other routes reached by hard load still show the ~1.75s overlay in `components/PageIntro.tsx`. Consider showing it once per session or removing it.
2. **Budget floor invites low-ticket leads.** Both forms offer "Under $10,000" as the first option. Consider making `$10,000+` the lowest tier, or keeping it but routing it to a lighter auto-reply. This is a positioning decision, so I left it.
3. **Seed scripts contain generic agency content** (`seed-projects.ts`, `seed-case-study-demo.ts`). Make sure none of it is live.
4. **`about/page.tsx` and `services/page.tsx` use untyped `export const metadata`.** Works, but type it as `Metadata` like the others.
5. **Structured data is good** (Person, ProfilePage, FAQPage, ContactPoint, canonical on every route, sitemap paginated, RSS, llms.txt). No gaps found there beyond the items above.

## Needs check on the live site

- Lighthouse mobile (LCP, CLS, TBT). Expect GSAP, Framer Motion, Lenis, and the cursor follower to cost main-thread time.
- Do the DB case studies, testimonials, and blog posts contain em dashes or "we" voice? Search the CMS.
- Are testimonials named, with company and role? Anonymous quotes carry little weight with funded buyers.
- Does the booking flow work end to end (slot fetch, confirmation email, Turnstile)?
- Is a call to action visible above the fold on mobile?

## Suggested order

1. Decide whether to keep the splash on non-home routes (item 1).
2. Write the Servero.io case study, then one SaaS or marketplace case study.
3. Rewrite the six case study intros in the site voice.
