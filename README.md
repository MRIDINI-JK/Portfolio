# Digital Canvas Portfolio

Immersive 3D Developer Portfolio — Build Spec (Refined)

Role: You are a world-class frontend designer, UX engineer, and creative developer building an immersive 3D portfolio for a 3rd-year CSE student preparing for software engineering placements.

Prime directive: recruiters must understand who this person is, what they build, and how to reach them within 30 seconds — no matter how elaborate the 3D layer gets. Storytelling and navigation always outrank spectacle.

0. Ground Rules (apply everywhere, stated once)

Never fabricate data. Stats, achievements, ratings, testimonials — if the user hasn't supplied it, render a clearly-marked placeholder/empty state, not a made-up number.

Every animation needs a purpose (storytelling → navigation → hierarchy → engagement → performance, in that priority order). If you can't name the purpose, cut it.

Respect prefers-reduced-motion globally — one implementation, referenced by every animated component, not re-solved per section.

Mobile is not "desktop, shrunk." 3D scenes, hover interactions, and particle density are re-authored for touch, not scaled down.

1. Tech Stack

React + TypeScript

Next.js (App Router) — recommended over Vite because a portfolio needs shareable links with proper <meta>/OG tags when recruiters forward it. Use Vite only if you specifically want a pure SPA and don't care about link previews.

Tailwind CSS

Three.js + React Three Fiber + Drei

Framer Motion (UI/scroll animation) + GSAP (only for timeline-heavy 3D camera sequences Framer can't express cleanly — don't use both for the same animation)

Lucide React icons

Structure:

components/
  sections/        (Hero, About, Skills, Projects, Experience, DSA, Achievements, Contact)
  3d/              (scene, camera rig, particle systems, per-section 3D variants)
  ui/              (buttons, cards, custom cursor, nav)
lib/               (portfolio.ts config, utils)
hooks/             (useScrollProgress, useReducedMotion, useDeviceTier, etc.)
assets/


All content is sourced from lib/portfolio.ts — no hardcoded copy in components.

2. Site Structure (nav ↔ section numbering, reconciled)

# Nav label Section 3D motif for that section — HOME Hero Digital universe / holographic terminal 01 ABOUT About Floating knowledge nodes 02 SKILLS Skills Technology constellation 03 PROJECTS Projects Floating project objects 04 EXPERIENCE Experience Evolving vertical timeline 05 DSA Problem Solving Algorithm/data-structure visualization 06 ACHIEVEMENTS Achievements Animated card wall 07 CONTACT Contact Minimal futuristic environment

The 3D world evolves across these seven states as one continuous scene rather than resetting per section — treat it as a single WebGL canvas with state transitions, not seven separate mounts, for both narrative continuity and performance.

3. Global Design Language

Deep black/charcoal base, subtle gradients, careful glassmorphism, neon accents, fine grid backgrounds, soft glow, noise texture for depth.

Reference points (do not copy): Apple product pages, Linear, Vercel, Awwwards portfolios, cyberpunk UI. Original visual identity only.

Large display typography for section headings; generous whitespace; strong hierarchy over density.

Section numbering shown as 01 — ABOUT per the table above.

4. Hero Section

Hi, I'm [NAME]

Headline: Computer Science Engineer building intelligent digital systems.

Animated role line: Software Engineer • AI/ML Builder • Problem Solver • Full-Stack Developer

One-line intro: I build intelligent, scalable and interactive software systems while constantly exploring new technologies.

CTA hierarchy (don't present all three as equal-weight):

Primary: Explore My Work → scrolls to Projects

Secondary: Download Resume

Tertiary/text link: Let's Connect → scrolls to Contact

Status chip: ● Open to Opportunities

Scroll cue: Scroll to explore ↓

3D scene sits beside/behind content, reacts subtly to cursor + scroll (position only — don't let it fight for attention with the headline).

5. Custom Cursor

Small glowing core + expanding ring, smoothly interpolated, magnetic pull toward primary CTAs, distinct hover state over interactive elements. Disabled entirely on touch devices (not simplified — removed, since there's no cursor to replace).

6. Navigation

Floating/sticky bar; compacts on scroll; glass/blurred background; active-section highlight; smooth-scroll between sections; initials as logo. Mobile: collapses to a touch-friendly menu, not a squeezed desktop bar.

7. About

Left: short intro, current education, career interests. Right: interactive 3D/animated profile element.

Chips: 🎓 CSE · 📍 India · 💻 Software Development · 🤖 AI/ML · 🌐 Full-Stack · ⚡ Competitive Programming

Timeline (edit years to match actual history):

Started deeper exploration of software development

Built AI/ML and full-stack projects

Advanced development, system design, and placement prep

(Keep this data-driven from portfolio.ts — verify the years against the real timeline; a 3rd-year student's start year and current year should line up.)

8. Skills — "Skill Constellation"

3D rotating constellation, grouped: Languages, Frontend, Backend, AI/ML, Tools, Databases (full list retained from original brief — plug directly into portfolio.ts).

On hover/tap: icon, name, qualitative level, one-line description. Use qualitative labels only — Learning / Familiar / Working Knowledge / Strong / Advanced — never fabricated percentages.

9. Featured Projects

Large interactive cards with 3D tilt, glow, and animated metadata on hover (tap-triggered on mobile). Each card: name, one-line problem statement, description, stack, GitHub link, live demo, image/video, key features.

Given the 30-second recruiter goal, lead with 3–4 strongest projects as full cards; the remaining projects go in a secondary "More Projects" grid so the primary view doesn't overwhelm. Suggested lead set (reorder by actual strength): TruthGuard AI, CypherX, SoundGuard, GigShield — move Smart Crop Advisory and Civic Issue Reporting Platform to the secondary grid unless you'd rank them higher.

Detail view (opens on click, full-screen case study): Problem → Solution → Architecture (interactive diagram, animates data flow on scroll) → Technology → Implementation → Challenges → Results → GitHub/Demo links.

10. DSA / Problem Solving

Title: Problem Solving. Show LeetCode rating, problems solved, contest history, strong topics, current focus — all sourced from real data or explicit placeholders, never invented.

Contribution heatmap (GitHub/LeetCode style) + clickable "DSA constellation" (Arrays, Strings, Binary Search, Trees, Graphs, DP, Greedy, Backtracking, Heap, Hashing), each showing a qualitative strength bar, e.g. Dynamic Programming ████████░░ Strong.

11. Experience

Vertical timeline, scroll-animated, evolving as the user scrolls. Each entry: organization, role, duration, responsibilities, technologies, achievements.

12. Achievements

Animated card wall across: Hackathons, Competitive Programming, Certifications, Academic, Research, Open Source. Each card: icon, title, description, date, link. Placeholder cards only where data is missing — never invented entries.

13. GitHub / Activity

Live GitHub stats if API/credentials are available; otherwise a clean, honest placeholder component (not a mocked-up fake feed).

14. Resume

Heading: Want the complete picture? Body: Download my resume for a detailed overview of my experience, projects and technical skills. Buttons: Download Resume, View Resume (opens in new tab).

15. Contact

Heading: Let's build something meaningful. Email / LinkedIn / GitHub / Resume links + form (Name, Email, Message) with button Send Message →. Subtle animated 3D background, minimal — this is the wind-down of the journey, not another showcase.

16. Footer

[NAME] · Building systems. Solving problems. Exploring what's next. · GitHub / LinkedIn / Email / Resume · © 2026 [NAME]. Built with React + Three.js.

17. Loading Screen

[INITIALS] → Initializing portfolio... → progress indicator → System ready. → transition in. Target under 2–3s; if 3D assets are slow, progressively load them rather than blocking the page.

18. Performance & Accessibility (single source of truth)

Lazy-load and code-split 3D components; Intersection Observer to mount/unmount scene segments; device-tier detection to scale particle count and shadow quality down on lower-end hardware (this is the single mechanism — don't re-implement per-section).

Compressed/optimized assets, appropriate image formats.

Target 90+ Lighthouse performance where reasonably achievable.

Semantic HTML, full keyboard navigation, visible focus states, sufficient contrast, ARIA labels, alt text.

prefers-reduced-motion handled once at the root (see §0) and consumed everywhere else.

19. Content Config (lib/portfolio.ts)

Single typed config object driving every section — name, role, tagline, education, skills, projects, experience, achievements, social. No component should hardcode copy that belongs here.

20. Pre-Ship Checklist

Every section renders with real or clearly-placeholder data (no lorem ipsum).

Every nav link scrolls to the correct section.

Mobile pass: touch interactions replace hover, 3D scene simplified, no desktop-squeezed layouts.

3D performance pass on a mid-tier device.

Reduced-motion mode verified.

Remove any animation that doesn't serve storytelling/navigation/hierarchy.

No console errors, no broken links.

Portfolio still looks premium with 3D effects disabled entirely.

All copy editable from portfolio.ts alone.

Open Questions Before This Is Buildable

These weren't specified in the original brief and need real values, not placeholders, for the site to ship:

Actual name, initials, and location.

Real project links (GitHub repos + live demos) for at least the lead 3–4 projects.

Actual resume file (PDF) to link/download.

Real LeetCode/Codeforces handle and current stats (or explicit "not yet tracked" placeholder).

Timeline years — confirm start year vs. current year so the About timeline is internally consistent.

Contact form backend — where should submissions go (email service, form API, etc.)? This needs a real endpoint, not just UI.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ed9fe4b6-6e54-45c9-a8ae-2c2768f32495).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
