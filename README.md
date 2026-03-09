# Positieve Organisatie Scan

Interactieve webapp voor de Positieve Organisatie Scan (12 vragen, 4 kwadranten), gebouwd met Next.js App Router en klaar voor embed in een iframe op een WordPress/Divi-site.

## Stack

- Next.js + React
- Tailwind CSS
- Recharts (radar/spinnenweb)
- Framer Motion (vraagtransities)
- EmailJS (voorbereide e-mailafhandeling)

## Lokaal starten

```bash
npm install
npm run dev
```

Open daarna [http://localhost:3000](http://localhost:3000).

## EmailJS configureren

Gebruik environment variables i.p.v. hardcoded keys.

1. Kopieer `.env.example` naar `.env.local`
2. Vul de waarden in:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_USER`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- `NEXT_PUBLIC_ADMIN_EMAIL`

Voor EmailJS templates kun je direct deze HTML-bestanden gebruiken:

- `docs/emailjs-user-result-template.html`
- `docs/emailjs-admin-notification-template.html`

## Structuur

- `app/page.tsx`: volledige scan-flow (welkom -> vragen -> lead -> resultaat)
- `lib/scan-config.ts`: vragen, ankerteksten en kwadrantinformatie
- `docs/*.html`: kopieerbare EmailJS template-opmaak
