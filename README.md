# KK Multispeciality Hospital — website

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion (History timeline only) · lucide-react · MDX blog.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` and set **one** delivery option for the appointment form (`RESEND_API_KEY` or `FORMSPREE_ENDPOINT`). Without either, requests are accepted and only logged on the server. `WHATSAPP_WEBHOOK_URL` is an optional JSON webhook for WhatsApp notifications.

## Where things live

| What | File |
|---|---|
| Name, address, phones, hours, socials, footer, partner logos | `content/site.ts` |
| Home / About / History copy | `content/home.ts`, `content/about.ts`, `content/history.ts` |
| Doctors | `content/doctors.ts` |
| Departments (one file each) | `content/departments/*.ts` |
| Blog posts (migrated from WordPress, full text) | `content/blog/*.mdx` |
| Line-art illustrations | `components/LineArt.tsx` |
| Design tokens | `tailwind.config.ts`, `app/globals.css` |

Pages render from these data files. To change hours or the phone number, edit `content/site.ts` only.

**Unconfirmed content** is stored as `null` or listed in a department's `pending` array. In `npm run dev` it shows as a dashed amber "Client to confirm" box. In production builds it renders nothing, so no placeholder text reaches visitors.

## URLs

Every old URL slug is preserved: `/about-us/`, `/meet-our-doctors/`, `/doctor/…/`, `/our-history/`, `/our-services/`, `/services/…/`, `/blog/`, `/blog/page/2/`, root-level post slugs, `/category/…/`, `/tag/…/`, `/contacts-us/`. `trailingSlash: true`. A few likely stray URLs are 301-redirected in `next.config.mjs`. Tag archives are `noindex`. Dermatology stays `noindex` and out of the sitemap until real content is approved.

All images from the old site were copied into `public/images/`, so nothing depends on `/wp-content/` after launch.

**Stock photos.** Department hero photos in `public/images/stock/` come from [Pexels](https://www.pexels.com/license/) (free for commercial use, no attribution required). Replace them with real KK Hospital photos when available: the file names say what each one shows. The source photo IDs are 7088526, 7089333, 14797855, 13119976, 6754173, 706082, 7339493, 7659567, 6129676, 5701545 and 6476083.

## Open items for the client

1. Dr. Ranjana Parekh: real bio, education and photo (the old profile had dentist template text, which was not migrated).
2. Dermatology & Cosmetology: all content and consultant (the old page had mental-health template text, which was not migrated).
3. Diagnostics & Lab: full test list, timings and report turnaround. The page currently uses only facts from elsewhere on the site, and its 3 highlight-chip lines are new wording that needs approval.
4. Working hours: the old header said "Mon–Fri 08am–09pm" but the Contact page says "10 AM–1 PM, 5–8 PM". The site uses the Contact-page hours; confirm those plus Sunday timings.
5. Patient-count stat (the old counter showed "0+"). It is hidden until a number is supplied.
6. ISO certificate: 9001:2008 is a withdrawn version. Confirm the current one.
7. Second email address from the old footer.
8. Instagram handle: `kakahospital` vs `kk_hospitalwaghodia`.
9. WhatsApp number (currently assumed to be +91 92271 00517).
10. Partner logo strip: what the logos are, so a heading can be added.
11. Pharmacy page mentions paediatrics, but there is no paediatrics department.
12. Internal Medicine consultant name.
13. Photos needed: real department photos to replace the stock images, history archive photos, a higher-resolution building photo (the current one is 800×600), and a high-res/SVG logo (the current one is 135×59).
14. Exact map coordinates (the `geo` field is omitted from schema until confirmed).
15. Patient Guide page: the footer link was removed until content exists.
