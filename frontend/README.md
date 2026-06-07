# AZ Hôtel des Arts — Frontend (Next.js 15)

The public-facing website for **AZ Hôtel des Arts** in Rabat, Morocco.

## Stack

- **Next.js 15** (App Router) · React 19 · TypeScript
- **Tailwind CSS** for styling with a tailored design system (`tailwind.config.ts`)
- **Framer Motion** for premium reveal animations
- **SWR** for client-side data fetching
- **react-hook-form + zod** for forms and validation
- **embla-carousel** + **yet-another-react-lightbox** for galleries

## Project structure

```
app/                    App-Router pages, layouts, and route metadata
  layout.tsx            Root layout — fonts, header, footer, JSON-LD
  page.tsx              Home page composing all 15 sections
  rooms/                /rooms and /rooms/[slug]
  blog/                 /blog and /blog/[slug]
  book/                 Full multi-step booking flow
  auth/                 Sign-in & registration
  legal/[slug]/         Privacy, terms, cookies, accessibility
  sitemap.ts            Dynamic sitemap.xml
  robots.ts             robots.txt
  opengraph-image.tsx   On-the-fly OG image generation
components/             Reusable UI primitives, layout, booking widgets
sections/               15 home-page sections (Hero, About, Rooms, …)
hooks/                  Custom React hooks (scroll, availability)
lib/                    Site config, fetchers, formatting helpers, content
public/                 Brand assets, photographs, fonts, manifest
styles/, types/, utils/ Auxiliary
```

## Sections of the home page

1. Hero — fullscreen video w/ booking form  
2. About  
3. Rooms & Suites  
4. Restaurant  
5. Spa & Wellness  
6. Activities & Experiences  
7. Meetings & Conferences  
8. Weddings & Events  
9. Testimonials  
10. Photo Gallery  
11. Blog  
12. Contact (map + form)  
13. FAQ  
14. Newsletter  
15. Footer (root layout)

## Develop

```bash
cp .env.example .env.local
npm install
npm run dev    # http://localhost:3000
```

## Build & run

```bash
npm run build
npm start
```

## Image attribution

Sample photographs in `/public/images/**` are intended to be replaced with
licensed photography of the hotel. The placeholders shipped here are the same
photos already provided alongside this project.
