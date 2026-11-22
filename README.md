# Bini Cooperations

[![Bini.js](https://img.shields.io/badge/Bini.js-10.0.17-00CFFF?style=flat-square)](https://bini.js.org)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.19.0-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)

The website for **Bini Cooperations**, an early-stage technology company building useful software and meaningful products that can grow far beyond where we start.

We design and build custom software, web applications, business systems, and digital products around real operational needs. This repository is the company site, built with [Bini.js](https://bini.js.org), our own open-source React framework.

---

## Pages

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Who we are, what we build, and a way to get in touch |
| `/services` | Services | The kinds of software we design and build |
| `/framework` | Framework | Bini.js: quick start, features, and the package ecosystem |
| `/about` | About | Our approach, how we think, and our open-source work |
| `/contact` | Contact | Email, WhatsApp, phone, LinkedIn, and a message form |

The contact form has no backend. It opens the visitor's email app with a message addressed to us.

---

## Getting started

Requires **Node.js >= 20.19.0**.

```bash
pnpm install
pnpm run dev
```

The dev server runs at `http://localhost:3000`.

| Command | Description |
| --- | --- |
| `pnpm run dev` | Start the dev server with HMR |
| `pnpm run build` | Build for production and prerender every route into `dist/` |
| `pnpm run start` | Serve the production build with bini-server |
| `pnpm run preview` | Preview the production build |
| `pnpm run deploy` | Generate the GitHub Actions workflows to deploy from GitHub |

---

## Project structure

```text
src/
  app/          Pages, one file per route (page.tsx is the home page)
  components/   Shared UI: navbar and footer, hero, services, and ui helpers
  lib/          Scroll and animation helpers
public/         Static assets, including logo.svg
```

Pages are routed by file name through **bini-router**, so adding a file to `src/app/` adds a route.

### Design conventions

- Pages share one layout rhythm: a hero-sized heading, then sections separated by thin `#15171B` rules.
- Colors, fonts, and the `Reveal` entrance animation come from `src/components/ui`. Reuse them instead of adding new styles.
- Navigation links live in `src/components/navbar.tsx` (`NAV_LINKS` for the header, `FOOTER_NAV` for the footer). Update both when adding a page.
- Motion respects `prefers-reduced-motion`.

---

## Built with

- [Bini.js](https://bini.js.org) for routing, prerendering, the production server, and the dev overlay
- [React](https://react.dev) and TypeScript
- [Tailwind CSS](https://tailwindcss.com) for styling
- [lucide-react](https://lucide.dev) for icons

---

## Contact

| | |
| --- | --- |
| Email | [binicooperations@gmail.com](mailto:binicooperations@gmail.com) |
| WhatsApp | [+94 70 385 0455](https://wa.me/94703850455) |
| Phone | [+94 78 729 6686](tel:+94787296686) |
| LinkedIn | [Bini Cooperations](https://www.linkedin.com/company/bini-cooperation/) |

---

## Bini.js

Alongside client work, we build and maintain Bini.js. See the [documentation](https://bini.js.org/) or the [source on GitHub](https://github.com/Binidu01/bini-cli) for the CLI, platform targets, and the package ecosystem.
