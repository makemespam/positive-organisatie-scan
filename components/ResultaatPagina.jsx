"use client";

import Image from "next/image";
import emailjs from "@emailjs/browser";
import { useState, useEffect } from "react";
import { bepaalArchetype } from "@/lib/archetypes";
import { encodeAnswersToV } from "@/lib/report-url";

const EMAILJS_SERVICE_ID = (process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "").trim();
const EMAILJS_USER_TEMPLATE_ID = (process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_USER ?? "").trim();
const EMAILJS_ADMIN_TEMPLATE_ID = (process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_ADMIN ?? "").trim();
const EMAILJS_PUBLIC_KEY = (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "").trim();
const ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "").trim();

const brand = {
  oranje: "#f79648",
  geel: "#f8c158",
  rood: "#ee6556",
  donkerrood: "#c86059",
  blauw: "#314a7b",
  groen: "#006d82",
  aqua: "#8cb4ac",
  lichtblauw: "#c8dae5",
  roze: "#fee8db",
  lichtgeel: "#fff2e4",
};

const kwadrantKleuren = {
  samenwerking: brand.groen,
  praktijk: brand.blauw,
  strategie: brand.donkerrood,
  missie: brand.oranje,
};

const kwadrantLicht = {
  samenwerking: "#e8f4f0",
  praktijk: "#e8ecf4",
  strategie: "#faf0ef",
  missie: "#fef5ed",
};

const defaultScores = {
  samenwerking: { label: "Samenwerking", score: 0, vragen: [0, 0, 0] },
  praktijk: { label: "Praktijk", score: 0, vragen: [0, 0, 0] },
  strategie: { label: "Strategie & Basis op orde", score: 0, vragen: [0, 0, 0] },
  missie: { label: "Missie & Zingeving", score: 0, vragen: [0, 0, 0] },
};
/**
 * @typedef {{
 * samenwerking: { label: string, score: number, vragen: number[] },
 * praktijk: { label: string, score: number, vragen: number[] },
 * strategie: { label: string, score: number, vragen: number[] },
 * missie: { label: string, score: number, vragen: number[] },
 * }} ResultaatScores
 */

const kwadrantVraagStart = {
  samenwerking: 1,
  praktijk: 4,
  strategie: 7,
  missie: 10,
};

const vraagTitels = [
  "Kwetsbaarheid",
  "Collectieve draagkracht",
  "Energie & plezier",
  "Spelregels & insluiting",
  "Vergaderdynamiek",
  "Ruimte vs. controle",
  "Heldere kaders",
  "Duidelijke rolverdeling",
  "Gezamenlijk eigenaarschap",
  "Hoger doel",
  "Sterke kanten benutten",
  "Blik naar buiten",
];

const archetypeTips = {
  positieve_organisatie: {
    titel: "ReVlectie",
    tip: "Vraag jezelf elke vrijdag af: Wat gaf me deze week Vreugde, Verbinding en Vooruitgang?",
    bron: "(p.7, actie 4)",
  },
  presterend_eiland: {
    titel: "Erken moeite",
    tip: "Waardeer de intentie en inspanningen van je medewerker expliciet.",
    bron: "(p.10, actie 3)",
  },
  inspirerende_chaos: {
    titel: "Schaalvragen eigenaarschap",
    tip: "Stel schaalvragen. Vraag bijvoorbeeld: op een schaal van 1-10, hoe zeker ben je?",
    bron: "(p.12)",
  },
  gezellig_drijfzand: {
    titel: "Begin met betekenis",
    tip: "Begin met betekenis in plaats van taken: waarom is dit project belangrijk, en voor wie?",
    bron: "(p.16)",
  },
  efficiente_machine: {
    titel: "Gouden moment",
    tip: "Vraag teamleden naar een moment waarop ze echt trots waren of geraakt werden, als ingang naar zingeving.",
    bron: "(p.16)",
  },
  theekransje: {
    titel: "Waardenwandeling",
    tip: "Waar werd je enthousiast van de afgelopen tijd en wat is er nodig om dat te verdubbelen?",
    bron: "(p.16)",
  },
  gedreven_cowboys: {
    titel: "Jaardoel",
    tip: "Voeg aan het gesprek over jaardoelen de vraag toe: wat wil je dit jaar bijdragen waar je over 5 jaar nog met voldoening op terugkijkt?",
    bron: "(p.16)",
  },
  bevlogen_gemeenschap: {
    titel: "Schaalvragen + open vragen",
    tip: "Stel open vragen, zoals: wat zie jij als de volgende stap?",
    bron: "(p.12)",
  },
  resultatenboer: {
    titel: "Vier succes, hoe klein ook",
    tip: "Vier ook de andere successen, zoals de inspanningen en de samenwerking.",
    bron: "(p.11, actie 4)",
  },
  professionele_eenzame: {
    titel: "Collegiale coaching",
    tip: "Introduceer collegiale coaching waarbij teamleden leren waarderende vragen te stellen.",
    bron: "(p.12)",
  },
  bureaucratische_presteerder: {
    titel: "Intentie",
    tip: "Begin je dag met een intentie: hoe wil je vandaag zijn in je team, in plaats van wat je gaat doen?",
    bron: "(p.7, actie 1)",
  },
  warm_wrak: {
    titel: "Positieve uitzondering",
    tip: "Ga in je team geregeld op zoek naar een positieve uitzondering. Ontdek wat er in deze uitzondering verborgen ligt waar het team meer van wil in de toekomst.",
    bron: "(p.14, actie 2)",
  },
  lege_machine: {
    titel: "Check-in + Eigen houding",
    tip: "Wees in je team open over wat je intentie was, wat er anders is gegaan en wat je ervan hebt geleerd zonder jezelf te veroordelen.",
    bron: "(p.11, actie 5)",
  },
  eenzame_strateeg: {
    titel: "Collegiale coaching + open vragen",
    tip: "Introduceer collegiale coaching en begeleid de volgende stap door te vragen: Wat zie jij als de volgende stap?",
    bron: "(p.12)",
  },
  bevlogen_puinhoop: {
    titel: "Turbo brainstorm",
    tip: "Heb je een probleem te pakken? Stop met analyseren en ga creeren. Zet een stopwatch op 5 minuten.",
    bron: "(p.14, actie 3)",
  },
  uitgeblust: {
    titel: "Maak ruimte bij stress",
    tip: "Creëer een gezamenlijke pauze om te herstellen van stress met ademhalingsoefeningen of een buitenwandeling.",
    bron: "(p.14, actie 4)",
  },
  solide_middenveld: {
    titel: "Energiebarometer",
    tip: "Laat je medewerkers aangeven hoe ze in hun energie zitten.",
    bron: "(p.14, actie 1)",
  },
};

function gemiddelde(scores) {
  return Object.values(scores).reduce((s, k) => s + k.score, 0) / Object.keys(scores).length;
}

function sterksteKwadrant(scores) {
  return Object.entries(scores).sort((a, b) => b[1].score - a[1].score)[0];
}

function zwaksteKwadrant(scores) {
  return Object.entries(scores).sort((a, b) => a[1].score - b[1].score)[0];
}

function verrassingKwadrant(scores) {
  const gem = gemiddelde(scores);
  return Object.entries(scores).sort((a, b) => Math.abs(b[1].score - gem) - Math.abs(a[1].score - gem))[1];
}

function scoreLabel(score) {
  if (score >= 8.5) return { label: "Uitstekend", kleur: brand.groen };
  if (score >= 7) return { label: "Sterk", kleur: brand.groen };
  if (score >= 5.5) return { label: "Groeiend", kleur: brand.oranje };
  if (score >= 4) return { label: "Aandacht", kleur: brand.donkerrood };
  return { label: "Prioriteit", kleur: brand.rood };
}

const tips = {
  samenwerking: {
    kort: "Jullie verbinding is jullie kracht - voed die bewust.",
    lang: "Teams die hoog scoren op samenwerking hebben een stevige basis van vertrouwen. De volgende stap is om die verbinding te verdiepen: maak ruimte voor echte gesprekken naast de taakgerichte overleggen.",
    actie: "Plan volgende week een 15-minuten check-in zonder agenda - alleen de vraag: 'Hoe zit jij erin?'",
  },
  praktijk: {
    kort: "Heldere spelregels zijn de smeerolie van een vlot draaiend team.",
    lang: "Bij teams die op Praktijk groeikansen hebben, zien we vaak dat ongeschreven regels veel energie kosten. De winst zit niet in meer procedures, maar in het expliciet maken van wat iedereen al aanvoelt.",
    actie: "Vraag je team: 'Welke drie dingen zou je een nieuwe collega op dag een willen vertellen?'",
  },
  strategie: {
    kort: "Floreren vraagt om een stevige basis: heldere doelen, duidelijke rollen.",
    lang: "Teams die lager scoren op Strategie & Basis op orde hebben vaak niet te weinig ambitie, maar te weinig helderheid. Wie is waarvoor verantwoordelijk? Waaraan meten we succes?",
    actie: "Maak samen een 'wie doet wat'-overzicht voor de komende maand.",
  },
  missie: {
    kort: "Jullie zingeving is een motor - gebruik hem bewust.",
    lang: "Teams met een hoge Missie-score weten waarom ze doen wat ze doen. Houd dit levend door regelmatig te vieren wat jullie al bereikt hebben.",
    actie: "Start je volgende teamoverleg met: 'Waar zijn we afgelopen week trots op?'",
  },
};

const praktijkrichtingPerVraag = {
  1: {
    laag: "Kwetsbaarheid is hier nog een uitdaging, maar tegelijk een kansrijk startpunt voor groei en meer psychologische veiligheid.",
    midden: "Kwetsbaarheid lijkt hier een belangrijk ankerpunt: fouten en twijfels worden steeds vaker bespreekbaar.",
    hoog: "Kwetsbaarheid is hier jullie sterkste punt: fouten mogen besproken worden en dat versterkt veiligheid en lerend vermogen.",
  },
  2: {
    laag: "Collectieve draagkracht is nu nog kwetsbaar, maar juist daarom een kansrijk thema om als team samen op te bouwen.",
    midden: "Collectieve draagkracht is hier een zichtbaar sterk punt: in drukke periodes lukt het vaker om elkaar op te vangen.",
    hoog: "Collectieve draagkracht is hier jullie sterkste punt: bij drukte vangen jullie elkaar op en dragen jullie de last samen.",
  },
  3: {
    laag: "Energie en plezier vragen aandacht, maar zijn kansrijk om bewust ruimte te geven in jullie teamritme.",
    midden: "Energie en plezier zijn hier een sterk punt: er ontstaat regelmatig ontspanning en verbinding.",
    hoog: "Energie en plezier zijn hier jullie sterkste punt: de positieve teamdynamiek vormt een stevige buffer tegen stress.",
  },
  4: {
    laag: "Spelregels en insluiting zijn nog een uitdaging, maar vormen een kansrijk startpunt voor meer duidelijkheid en veiligheid.",
    midden: "Spelregels en insluiting zijn hier een sterk punt: de basis is herkenbaar en helpt nieuwe mensen mee te doen.",
    hoog: "Spelregels en insluiting zijn hier jullie sterkste punt: de basis is helder en nieuwkomers stappen soepel in.",
  },
  5: {
    laag: "Vergaderdynamiek is nog een uitdaging, maar kansrijk om met kleine interventies meer stemmen aan tafel te krijgen.",
    midden: "Vergaderdynamiek is hier een sterk punt: verschillende teamleden krijgen merkbaar ruimte om bij te dragen.",
    hoog: "Vergaderdynamiek is hier jullie sterkste punt: overleggen zijn inclusief en benutten de aanwezige denkkracht optimaal.",
  },
  6: {
    laag: "Ruimte en vertrouwen zijn nog een uitdaging, maar kansrijk om stap voor stap meer autonomie te versterken.",
    midden: "Ruimte en vertrouwen zijn hier een sterk punt: er ontstaat vaker sturing op resultaat in plaats van controle op detail.",
    hoog: "Ruimte en vertrouwen zijn hier jullie sterkste punt: jullie sturen op resultaat en dat vergroot autonomie en werkplezier.",
  },
  7: {
    laag: "Kaders en doelen zijn nu nog een uitdaging, maar een kansrijk thema om mee te starten voor meer focus.",
    midden: "Kaders en doelen zijn hier jullie sterkste punt: de richting is voldoende duidelijk om gericht stappen te zetten.",
    hoog: "Kaders en doelen zijn glashelder, dat geeft een prachtige basis om als team doelgericht te versnellen.",
  },
  8: {
    laag: "Rolverdeling is nu nog een uitdaging, maar een kansrijk startpunt om meer rust en voorspelbaarheid te brengen.",
    midden: "Rolverdeling is hier jullie sterkste punt: verantwoordelijkheden zijn duidelijk genoeg om goed samen te werken.",
    hoog: "Rolverdeling is hier glashelder: iedereen weet precies wie wat oppakt en dat voorkomt ruis en dubbel werk.",
  },
  9: {
    laag: "Eigenaarschap op resultaat is nog een uitdaging, maar kansrijk om stap voor stap breder in het team te verankeren.",
    midden: "Eigenaarschap op resultaat is hier een sterk punt: verantwoordelijkheid wordt al door meerdere mensen gedragen.",
    hoog: "Eigenaarschap op resultaat is hier jullie sterkste punt: het team draait zelfstandig door en pakt breed verantwoordelijkheid.",
  },
  10: {
    laag: "Betekenis en hoger doel zijn nog een uitdaging, maar juist kansrijk om nieuwe energie in het dagelijkse werk te brengen.",
    midden: "Hoger doel is hier een sterk punt: het team voelt in toenemende mate de link tussen taken en betekenis.",
    hoog: "Hoger doel is hier jullie sterkste punt: het werk voelt betekenisvol en duidelijk verbonden aan de grotere missie.",
  },
  11: {
    laag: "Werken vanuit sterke kanten is nog een uitdaging, maar een kansrijk vertrekpunt om meer energie los te maken.",
    midden: "Sterke kanten benutten is hier een sterk punt: er is al ruimte om kwaliteiten passend in te zetten.",
    hoog: "Sterke kanten benutten is hier jullie sterkste punt: teamleden werken zichtbaar vanuit hun eigen kracht.",
  },
  12: {
    laag: "Blik naar buiten is nog een uitdaging, maar een kansrijk thema om wendbaarheid en toekomstgerichtheid te versterken.",
    midden: "Blik naar buiten is hier een sterk punt: er is al regelmatig aandacht voor de omgeving en wat die vraagt.",
    hoog: "Blik naar buiten is hier jullie sterkste punt: jullie reflecteren actief op de omgeving en blijven daardoor wendbaar.",
  },
};

function praktijkrichtingVoorKwadrant(kwadrant, vragen) {
  const start = kwadrantVraagStart[kwadrant];
  const besteScore = Math.max(...vragen);
  const indexBinnenKwadrant = vragen.findIndex((v) => v === besteScore);
  const vraagNummer = start + Math.max(indexBinnenKwadrant, 0);
  const varianten = praktijkrichtingPerVraag[vraagNummer];
  if (!varianten) return "Dit thema is kansrijk om verder te versterken in jullie volgende teamweek.";
  if (besteScore <= 4) return varianten.laag;
  if (besteScore <= 7) return varianten.midden;
  return varianten.hoog;
}

function QuinnWiel({ scores, size = 280, animated = true }) {
  const [progress, setProgress] = useState(animated ? 0 : 1);
  useEffect(() => {
    if (!animated) return;
    let start = null;
    const duration = 1200;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setProgress(p < 1 ? p * p * (3 - 2 * p) : 1);
      if (p < 1) requestAnimationFrame(step);
    }
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [animated]);

  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.38;
  const gridRadii = [0.25, 0.5, 0.75, 1];

  const kwadranten = [
    { key: "missie", label: "Missie &\nZingeving", angle: -45 },
    { key: "strategie", label: "Strategie &\nBasis", angle: 45 },
    { key: "praktijk", label: "Praktijk", angle: 135 },
    { key: "samenwerking", label: "Samen-\nwerking", angle: -135 },
  ];

  function polarToXY(angle, r) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  }

  const polygonPoints = kwadranten.map(({ key, angle }) => {
    const r = (scores[key].score / 10) * maxR * progress;
    return polarToXY(angle, r);
  });

  const polygonPath =
    polygonPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ") +
    " Z";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={maxR} fill="rgba(140, 180, 172, 0.28)" />
      <circle cx={cx} cy={cy} r={maxR * 0.6} fill="rgba(255, 236, 179, 0.34)" />
      <circle cx={cx} cy={cy} r={maxR * 0.3} fill="rgba(255, 182, 193, 0.34)" />
      {gridRadii.map((f, i) => (
        <circle key={i} cx={cx} cy={cy} r={maxR * f} fill="none" stroke="#94a3b8" strokeWidth={1.2} strokeDasharray="3 2" />
      ))}
      {kwadranten.map(({ angle }, i) => {
        const [x, y] = polarToXY(angle, maxR);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#64748b" strokeWidth={1.4} />;
      })}
      <path d={polygonPath} fill="#006d82" fillOpacity={0.15} stroke="#006d82" strokeWidth={2} strokeLinejoin="round" />
      {kwadranten.map(({ key, angle }, i) => {
        const r = (scores[key].score / 10) * maxR * progress;
        const [x, y] = polarToXY(angle, r);
        const kleur = kwadrantKleuren[key];
        return <circle key={i} cx={x} cy={y} r={5} fill={kleur} stroke="white" strokeWidth={2} />;
      })}
      {kwadranten.map(({ key, label, angle }) => {
        const [x, y] = polarToXY(angle, maxR + 24);
        const kleur = kwadrantKleuren[key];
        const lines = label.split("\n");
        const anchor = x < cx - 5 ? "end" : x > cx + 5 ? "start" : "middle";
        return (
          <text key={key} x={x} y={y - (lines.length - 1) * 6} textAnchor={anchor} fontSize={9} fontFamily="Roboto, sans-serif" fontWeight="600" fill={kleur} letterSpacing="0.3">
            {lines.map((l, i) => (
              <tspan key={i} x={x} dy={i === 0 ? 0 : 13}>
                {l}
              </tspan>
            ))}
          </text>
        );
      })}
      <circle cx={cx} cy={cy} r={3} fill="#006d82" />
    </svg>
  );
}

function ScoreBalk({ score, kleur, animated = true }) {
  const [w, setW] = useState(animated ? 0 : score * 10);
  useEffect(() => {
    if (!animated) return;
    const t = setTimeout(() => setW(score * 10), 200);
    return () => clearTimeout(t);
  }, [score, animated]);

  return (
    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out" style={{ width: `${w}%`, background: kleur }} />
    </div>
  );
}

function SignaalKaart({ type, titel, tekst, kleur, licht, icon }) {
  return (
    <div className="rounded-2xl p-5 flex gap-4 items-start" style={{ background: licht, borderLeft: `4px solid ${kleur}` }}>
      <div className="text-2xl flex-shrink-0 mt-0.5">{icon}</div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: kleur }}>
          {type}
        </div>
        <div className="font-bold text-gray-800 mb-1 text-sm leading-snug" style={{ fontFamily: "'Alegreya Sans', Georgia, serif" }}>
          {titel}
        </div>
        <div className="text-gray-600 text-sm leading-relaxed">{tekst}</div>
      </div>
    </div>
  );
}

function RapportSectie({ kwadrant, data }) {
  const kleur = kwadrantKleuren[kwadrant];
  const licht = kwadrantLicht[kwadrant];
  const tip = tips[kwadrant];
  const sl = scoreLabel(data.score);
  const praktijkrichting = praktijkrichtingVoorKwadrant(kwadrant, data.vragen);

  return (
    <div className="mb-8 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="flex items-center justify-between px-6 py-4" style={{ background: kleur }}>
        <div>
          <div className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Wiel van Quinn</div>
          <div className="text-white font-bold text-lg leading-tight" style={{ fontFamily: "'Alegreya Sans', Georgia, serif" }}>
            {data.label}
          </div>
        </div>
        <div className="text-right">
          <div className="text-white text-3xl font-black" style={{ fontFamily: "'Alegreya Sans', Georgia, serif" }}>
            {data.score.toFixed(1)}
          </div>
          <div className="text-white/80 text-xs font-medium">{sl.label}</div>
        </div>
      </div>

      <div className="px-6 py-5 bg-white">
        <div className="mb-5">
          <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Scores per vraag</div>
          <div className="space-y-2">
            {data.vragen.map((v, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-16 flex-shrink-0">V{kwadrantVraagStart[kwadrant] + i}</span>
                <div className="flex-1">
                  <ScoreBalk score={v} kleur={kleur} />
                </div>
                <span className="text-sm font-bold w-6 text-right" style={{ color: kleur }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-4 mb-4" style={{ background: licht }}>
          <div className="text-sm font-bold mb-2 italic" style={{ color: kleur, fontFamily: "'Alegreya Sans', Georgia, serif" }}>
            &quot;{tip.kort}&quot;
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{tip.lang}</p>
        </div>

        <div className="flex gap-3 items-start">
          <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-0.5" style={{ background: kleur }}>
            →
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Wat gaat er al goed</div>
            <p className="text-gray-700 text-sm font-medium">{praktijkrichting}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{ scores?: ResultaatScores | null, naam?: string, email?: string, answers?: number[] }} props
 */
export default function ResultaatPagina({ scores = null, naam = "", email = "", answers = [] }) {
  const veiligeScores = scores ?? defaultScores;
  const [emailVerzonden, setEmailVerzonden] = useState(false);
  const [emailInput, setEmailInput] = useState(email ?? "");
  const [mailError, setMailError] = useState("");

  const sterk = sterksteKwadrant(veiligeScores);
  const zwak = zwaksteKwadrant(veiligeScores);
  const verr = verrassingKwadrant(veiligeScores);
  const gem = gemiddelde(veiligeScores);
  const gemSl = scoreLabel(gem);
  const archetypeResultaat = bepaalArchetype({
    samenwerking: veiligeScores.samenwerking.score,
    praktijk: veiligeScores.praktijk.score,
    strategie: veiligeScores.strategie.score,
    missie: veiligeScores.missie.score,
  }, answers);
  const { beste, runner1, runner2, zekerheid } = archetypeResultaat;
  const archetypeTop3 = [beste, runner1, runner2];
  const actieveArchetypeTip = archetypeTips[beste.id] ?? {
    titel: "Eerste stap voor volgende week",
    tip: "Plan een kort teammoment om samen te bepalen wat jullie komende week als team willen versterken.",
    bron: "Bron onbekend",
  };
  const rapportLink =
    answers.length === 12
      ? `https://positive-organisatie-scan.vercel.app/rapport?v=${encodeAnswersToV(answers)}&n=${encodeURIComponent(naam)}&e=${encodeURIComponent(emailInput)}`
      : "https://positive-organisatie-scan.vercel.app/";

  const bepaalArchetypeKleur = () => {
    const ideaal = beste?.ideaal ?? {};
    const top = Object.entries(ideaal).sort((a, b) => b[1] - a[1])[0]?.[0];
    if (top === "s") return { kleur: brand.groen, licht: kwadrantLicht.samenwerking };
    if (top === "p") return { kleur: brand.blauw, licht: kwadrantLicht.praktijk };
    if (top === "st") return { kleur: brand.donkerrood, licht: kwadrantLicht.strategie };
    return { kleur: brand.oranje, licht: kwadrantLicht.missie };
  };

  const archetypeStijl = bepaalArchetypeKleur();
  const zekerheidTekst =
    zekerheid > 70
      ? "Duidelijke match"
      : zekerheid >= 40
        ? "Sterke match"
        : `Jullie zijn onderweg - je zit op de grens van ${beste.naam} en ${runner1.naam}`;
  const laag1Samenvatting = `Topmatch: ${beste.naam}. Gemiddelde teamscore: ${gem.toFixed(1)} (${gemSl.label}).`;
  const laag2Samenvatting = `Verdieping: sterkste kwadrant is ${veiligeScores[sterk[0]].label}; groeikans ligt bij ${veiligeScores[zwak[0]].label}.`;
  const laag3Samenvatting = `Gespreksfocus: verbind ${runner1.naam} en ${runner2.naam} met concrete teamafspraken voor de komende 2 weken.`;
  const defaultWaarschuwing = archetypeResultaat.isDefaultIngevuld
    ? "Let op: alle 12 antwoorden staan op 5. Dit lijkt op een standaardinvulling en geeft mogelijk geen betrouwbaar teambeeld."
    : "";
  const antwoordenSamenvatting = answers.length
    ? answers.map((score, index) => `V${index + 1} (${vraagTitels[index] ?? "Vraag"}): ${score}`).join("\n")
    : [
        ...veiligeScores.samenwerking.vragen.map((v, i) => `V${i + 1}: ${v}`),
        ...veiligeScores.praktijk.vragen.map((v, i) => `V${i + 4}: ${v}`),
        ...veiligeScores.strategie.vragen.map((v, i) => `V${i + 7}: ${v}`),
        ...veiligeScores.missie.vragen.map((v, i) => `V${i + 10}: ${v}`),
      ].join("\n");

  async function handleRapportAanvragen() {
    setMailError("");
    const quadrantSummary = [
      `${veiligeScores.samenwerking.label}: ${veiligeScores.samenwerking.score.toFixed(1)}`,
      `${veiligeScores.praktijk.label}: ${veiligeScores.praktijk.score.toFixed(1)}`,
      `${veiligeScores.strategie.label}: ${veiligeScores.strategie.score.toFixed(1)}`,
      `${veiligeScores.missie.label}: ${veiligeScores.missie.score.toFixed(1)}`,
    ].join("\n");
    const rapportVolgorde = [zwak[0], ...Object.keys(veiligeScores).filter((k) => k !== zwak[0])];
    const kwadrantRapportVolledig = rapportVolgorde
      .map((key) => {
        const data = veiligeScores[key];
        const praktijkrichting = praktijkrichtingVoorKwadrant(key, data.vragen);
        return `${data.label}\n- Inzicht: ${tips[key].lang}\n- Wat gaat er al goed: ${praktijkrichting}`;
      })
      .join("\n\n");

    const signaalKracht = `${veiligeScores[sterk[0]].label}: ${tips[sterk[0]].kort}`;
    const signaalGroeikans = `${veiligeScores[zwak[0]].label}: ${tips[zwak[0]].kort}`;
    const signaalOpvallend = `${veiligeScores[verr[0]].label}: scoort ${verr[1].score.toFixed(1)} - ${Math.abs(verr[1].score - gem) > 1.5 ? "opvallend afwijkend van jullie gemiddelde." : "iets om in de gaten te houden."}`;

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_USER_TEMPLATE_ID,
        {
          name: naam,
          email: emailInput,
          rapport_link: rapportLink,
          quadrant_scores: quadrantSummary,
          strongest_quadrant: veiligeScores[sterk[0]].label,
          answers: antwoordenSamenvatting,
          archetype_top1_naam: archetypeTop3[0].naam,
          archetype_top1_tagline: archetypeTop3[0].tagline,
          archetype_top1_omschrijving: archetypeTop3[0].omschrijving,
          archetype_top1_risico: archetypeTop3[0].risico,
          archetype_top1_herkenbaar: archetypeTop3[0].herkenbaar,
          archetype_tip_titel: actieveArchetypeTip.titel,
          archetype_tip_tekst: actieveArchetypeTip.tip,
          archetype_tip_bron: actieveArchetypeTip.bron,
          ebook_tip_label: "Onze beste tip op basis van jouw persoonlijke scan",
          archetype_top2_naam: archetypeTop3[1].naam,
          archetype_top2_tagline: archetypeTop3[1].tagline,
          archetype_top3_naam: archetypeTop3[2].naam,
          archetype_top3_tagline: archetypeTop3[2].tagline,
          archetype_zekerheid: `${zekerheid}%`,
          archetype_zekerheid_label: zekerheidTekst,
          archetype_default_waarschuwing: defaultWaarschuwing,
          laag1_samenvatting: laag1Samenvatting,
          laag2_samenvatting: laag2Samenvatting,
          laag3_samenvatting: laag3Samenvatting,
          kwadrant_rapport_volledig: kwadrantRapportVolledig,
          signaal_kracht: signaalKracht,
          signaal_groeikans: signaalGroeikans,
          signaal_opvallend: signaalOpvallend,
          sparring_link: "mailto:team@uiterwaarden.com?subject=Aanvraag%20Sparring%20Sessie%20naar%20aanleiding%20van%20Scan",
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        {
          participant_name: naam,
          participant_email: emailInput,
          rapport_link: rapportLink,
          quadrant_scores: quadrantSummary,
          strongest_quadrant: veiligeScores[sterk[0]].label,
          admin_email: ADMIN_EMAIL,
          answers: antwoordenSamenvatting,
          archetype_top1_naam: archetypeTop3[0].naam,
          archetype_tip_titel: actieveArchetypeTip.titel,
          archetype_tip_tekst: actieveArchetypeTip.tip,
          archetype_tip_bron: actieveArchetypeTip.bron,
          archetype_top2_naam: archetypeTop3[1].naam,
          archetype_top3_naam: archetypeTop3[2].naam,
          archetype_zekerheid: `${zekerheid}%`,
          archetype_default_waarschuwing: defaultWaarschuwing,
          laag1_samenvatting: laag1Samenvatting,
          laag2_samenvatting: laag2Samenvatting,
          laag3_samenvatting: laag3Samenvatting,
          kwadrant_rapport_volledig: kwadrantRapportVolledig,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      setEmailVerzonden(true);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      setMailError(msg);
      setEmailVerzonden(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Roboto, sans-serif" }}>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Uiterwaarden" width={120} height={40} className="object-contain" />
          </div>
          <div className="text-xs text-gray-400">Positieve Organisatie Scan</div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: brand.groen }}>
              Jouw resultaat
            </div>
            <h1 className="text-3xl font-black text-gray-800 leading-tight mb-2" style={{ fontFamily: "'Alegreya Sans', Georgia, serif" }}>
              {naam ? `Goed gedaan, ${naam}` : "Jouw team in beeld"}
            </h1>
            <p className="text-gray-500 text-sm">Momentopname van de afgelopen week · {new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long" })}</p>
          </div>

          <div className="rounded-3xl border p-5 mb-5" style={{ borderColor: archetypeStijl.kleur, background: archetypeStijl.licht }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: archetypeStijl.kleur }}>
              Jouw team past het meest bij
            </p>
            <h2 className="text-3xl font-bold text-gray-800 leading-tight" style={{ fontFamily: "'Alegreya Sans', Georgia, serif" }}>
              {beste.naam}
            </h2>
            <p className="mt-2 text-sm italic text-gray-700">{beste.tagline}</p>
            <p className="mt-2 text-sm text-gray-700">{beste.omschrijving}</p>
            <p className="mt-2 text-xs text-gray-500">{beste.risico}</p>
            <div className="mt-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "white", color: archetypeStijl.kleur }}>
              {zekerheidTekst}
            </div>
            {archetypeResultaat.isDefaultIngevuld && (
              <p className="mt-3 text-xs text-amber-700">
                Let op: alle 12 antwoorden staan op 5. Dit lijkt op een standaardinvulling en geeft mogelijk geen betrouwbaar teambeeld.
              </p>
            )}
            {zekerheid < 60 && (
              <p className="mt-3 text-xs text-gray-500">
                Runners-up: {runner1.naam} · {runner2.naam}
              </p>
            )}
            <div className="mt-4 rounded-xl bg-white/80 border border-white px-3 py-2">
              <p className="text-xs text-gray-600">
                Top 3 archetypen: <strong>1.</strong> {beste.naam} · <strong>2.</strong> {runner1.naam} · <strong>3.</strong> {runner2.naam}
              </p>
            </div>
          </div>

          <div className="rounded-2xl p-5 mb-5 border border-amber-100" style={{ background: "linear-gradient(135deg, #fff9ef, #fff4df)" }}>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold tracking-wide text-amber-800 border border-amber-200">
                  <span aria-hidden="true">📘</span>
                  Onze beste tip op basis van jouw persoonlijke scan
                </p>
                <h3 className="mt-3 font-bold text-gray-800 text-lg leading-snug" style={{ fontFamily: "'Alegreya Sans', Georgia, serif" }}>
                  {actieveArchetypeTip.titel}
                </h3>
                <p className="mt-2 text-sm text-gray-700">{actieveArchetypeTip.tip}</p>
                <p className="mt-3 text-xs italic text-gray-500">Bron: {actieveArchetypeTip.bron}</p>
                <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
                  Je ontvangt dit e-book gratis bij de bespreking van jouw scan.
                </div>
              </div>
              <div className="hidden sm:block flex-shrink-0">
                <Image
                  src="/voorkant-ebook-25-tips-positief-leiderschap.png"
                  alt="Cover van 25 Krachtige Acties voor Positief Leiderschap"
                  width={96}
                  height={140}
                  className="rounded-md border border-amber-200 object-cover shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-5">
            <div className="flex flex-col items-center">
              <QuinnWiel scores={veiligeScores} size={280} animated />
              <div className="mt-4 text-center">
                <div className="text-5xl font-black" style={{ color: gemSl.kleur, fontFamily: "'Alegreya Sans', Georgia, serif" }}>
                  {gem.toFixed(1)}
                </div>
                <div className="text-sm font-semibold mt-1" style={{ color: gemSl.kleur }}>
                  {gemSl.label}
                </div>
                <div className="text-gray-400 text-xs mt-1">gemiddelde over alle kwadranten</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 mb-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Per kwadrant</div>
            <div className="space-y-4">
              {Object.entries(veiligeScores).map(([key, data]) => {
                const kleur = kwadrantKleuren[key];
                const sl = scoreLabel(data.score);
                return (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm font-semibold text-gray-700">{data.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: kwadrantLicht[key], color: kleur }}>
                          {sl.label}
                        </span>
                        <span className="text-sm font-black" style={{ color: kleur }}>
                          {data.score.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <ScoreBalk score={data.score} kleur={kleur} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <SignaalKaart type="Jullie kracht" titel={veiligeScores[sterk[0]].label} tekst={tips[sterk[0]].kort} kleur={kwadrantKleuren[sterk[0]]} licht={kwadrantLicht[sterk[0]]} icon="✦" />
            <SignaalKaart type="Groeikans deze week" titel={veiligeScores[zwak[0]].label} tekst={tips[zwak[0]].kort} kleur={kwadrantKleuren[zwak[0]]} licht={kwadrantLicht[zwak[0]]} icon="↗" />
            <SignaalKaart
              type="Opvallend signaal"
              titel={veiligeScores[verr[0]].label}
              tekst={`Scoort ${verr[1].score.toFixed(1)} - ${Math.abs(verr[1].score - gem) > 1.5 ? "opvallend afwijkend van je gemiddelde" : "iets om in de gaten te houden"}.`}
              kleur={kwadrantKleuren[verr[0]]}
              licht={kwadrantLicht[verr[0]]}
              icon="◎"
            />
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-center border border-gray-100">
            <p className="text-gray-500 text-xs leading-relaxed">
              <span className="font-semibold text-gray-700">Een 10 is niet het doel.</span> Een uitgebalanceerd team floreert.
            </p>
          </div>
        </div>

        <div className="mt-4 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-2">Volledig rapport per kwadrant</div>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {[zwak[0], ...Object.keys(veiligeScores).filter((k) => k !== zwak[0])].map((key) => (
            <RapportSectie key={key} kwadrant={key} data={veiligeScores[key]} />
          ))}

          <div className="rounded-2xl border border-gray-200 bg-white p-5 mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Archetype-verdieping</p>
            <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Alegreya Sans', Georgia, serif" }}>
              Top 2 en 3 als ontwikkelrichting
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Naast jullie hoofdprofiel <strong>{beste.naam}</strong> wijzen de volgende archetypen op kansrijke nuances in jullie ontwikkeling.
            </p>
            <ul className="mt-3 space-y-2 text-sm text-gray-700">
              <li><strong>2. {runner1.naam}:</strong> {runner1.tagline}</li>
              <li><strong>3. {runner2.naam}:</strong> {runner2.tagline}</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-orange-200 p-6 mb-6" style={{ background: "linear-gradient(135deg, #fff3ec, #fffaf5)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-2">Sparring</p>
            <h3 className="font-black text-gray-800 text-xl mb-2" style={{ fontFamily: "'Alegreya Sans', Georgia, serif" }}>
              Sparren over jullie uitslag?
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Inbegrepen bij deze scan is een korte kennismaking / sparring sessie met een van onze coaches. - 20 minuten, geen agenda, geen verkooppraatje. We bekijken samen wat jullie profiel zegt en wat een zinvolle eerste stap zou zijn.
            </p>
            <a
              href="mailto:team@uiterwaarden.com?subject=Aanvraag%20Sparring%20Sessie%20naar%20aanleiding%20van%20Scan"
              className="inline-block mt-4 px-4 py-2 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${brand.oranje}, ${brand.donkerrood})` }}
            >
              Plan een sparring sessie
            </a>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-6" style={{ background: `linear-gradient(135deg, ${brand.roze}, white)` }}>
            <div className="p-6">
              <h3 className="font-black text-gray-800 text-lg mb-2" style={{ fontFamily: "'Alegreya Sans', Georgia, serif" }}>
                Mail mijn rapport
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">We sturen je resultaten direct naar je inbox.</p>
              {emailVerzonden ? (
                <div className="rounded-xl p-4 text-center" style={{ background: kwadrantLicht.samenwerking }}>
                  <div className="text-2xl mb-1">✓</div>
                  <p className="font-bold text-sm" style={{ color: brand.groen }}>
                    Rapport onderweg naar {emailInput}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="jouw@email.nl"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 bg-white"
                      style={{ "--tw-ring-color": brand.groen }}
                    />
                    <button onClick={handleRapportAanvragen} className="px-5 py-3 rounded-xl text-white text-sm font-bold flex-shrink-0 hover:opacity-90 transition-opacity" style={{ background: brand.groen }}>
                      Mail mijn rapport
                    </button>
                  </div>
                  {mailError && <p className="text-xs text-red-600 break-all">EmailJS fout: {mailError}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
