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

Vul in `app/page.tsx` de placeholders in:

- `YOUR_SERVICE_ID`
- `YOUR_TEMPLATE_ID_USER`
- `YOUR_TEMPLATE_ID_ADMIN`
- `YOUR_PUBLIC_KEY`
- `admin@example.com`

Zolang deze placeholders niet zijn ingevuld, wordt de scan wel getoond en berekend, maar wordt e-mailverzending overgeslagen.

## Structuur

- `app/page.tsx`: volledige scan-flow (welkom -> vragen -> lead -> resultaat)
- `lib/scan-config.ts`: vragen, ankerteksten en kwadrantinformatie
