# kiki-tech-portfolio

Technical portfolio for Karis Ruth Jumawan: backend/cloud projects, system
architecture, automation tools, and hardware/software builds, each written up
as a structured case study.

Split out of the original unified portfolio (`kiki-portfolio`). Its sibling is
`kiki-creative-portfolio` (motion design and video).

## Run it

```bash
npm install
npm run dev   # http://localhost:3000
```

The creative portfolio runs on :3001, so both can be open side by side and the
cross-links work locally.

## Adding or editing a case study

Everything lives in [`lib/case-studies.ts`](lib/case-studies.ts). Each entry
follows the same shape:

| Field | Renders as |
| --- | --- |
| `problem` | 01 Problem |
| `solution[]` | 02 Solution (bullets) |
| `architecture[]` | 03 Architecture: an animated left-to-right flow; a stage with several `nodes` stacks them |
| `stack[]` | 04 Stack chips |
| `results[]` | 05 Results |
| `metrics[]` (optional) | Stat tiles under the title. Only add real numbers |
| `links[]` | 06 Repos & demos. Empty shows a "code isn't public, ask me" note |

A new entry automatically gets a card on the home page and a static page at
`/work/<slug>`.

## Deploy (Vercel)

Set `NEXT_PUBLIC_CREATIVE_URL` to the creative site's URL (see `.env.example`).
