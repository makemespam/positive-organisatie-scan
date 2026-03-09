"use client";

import Image from "next/image";
import emailjs from "@emailjs/browser";
import { useState, useEffect, useRef } from "react";

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

const kwadrantVraagStart = {
  samenwerking: 1,
  praktijk: 4,
  strategie: 7,
  missie: 10,
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
      {gridRadii.map((f, i) => (
        <circle key={i} cx={cx} cy={cy} r={maxR * f} fill="none" stroke="#e5e7eb" strokeWidth={1} strokeDasharray="3 3" />
      ))}
      {kwadranten.map(({ angle }, i) => {
        const [x, y] = polarToXY(angle, maxR);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e5e7eb" strokeWidth={1} />;
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
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Eerste stap volgende week</div>
            <p className="text-gray-700 text-sm font-medium">{tip.actie}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultaatPagina({ scores = null, naam = "", email = "" }) {
  const veiligeScores = scores ?? defaultScores;
  const [laag, setLaag] = useState(1);
  const [emailVerzonden, setEmailVerzonden] = useState(false);
  const [emailInput, setEmailInput] = useState(email ?? "");
  const [mailError, setMailError] = useState("");
  const rapportRef = useRef(null);

  const sterk = sterksteKwadrant(veiligeScores);
  const zwak = zwaksteKwadrant(veiligeScores);
  const verr = verrassingKwadrant(veiligeScores);
  const gem = gemiddelde(veiligeScores);
  const gemSl = scoreLabel(gem);

  async function handleRapportAanvragen() {
    setMailError("");
    const quadrantSummary = [
      `${veiligeScores.samenwerking.label}: ${veiligeScores.samenwerking.score.toFixed(1)}`,
      `${veiligeScores.praktijk.label}: ${veiligeScores.praktijk.score.toFixed(1)}`,
      `${veiligeScores.strategie.label}: ${veiligeScores.strategie.score.toFixed(1)}`,
      `${veiligeScores.missie.label}: ${veiligeScores.missie.score.toFixed(1)}`,
    ].join("\n");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_USER_TEMPLATE_ID,
        {
          name: naam,
          email: emailInput,
          quadrant_scores: quadrantSummary,
          strongest_quadrant: veiligeScores[sterk[0]].label,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        {
          participant_name: naam,
          participant_email: emailInput,
          quadrant_scores: quadrantSummary,
          strongest_quadrant: veiligeScores[sterk[0]].label,
          admin_email: ADMIN_EMAIL,
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

          <div className="space-y-3">
            <button onClick={() => setLaag(2)} className="w-full py-4 rounded-2xl text-white font-bold text-base shadow-md hover:opacity-90 transition-opacity" style={{ background: `linear-gradient(135deg, ${brand.groen}, ${brand.blauw})` }}>
              Bekijk het volledige rapport
            </button>
            <button onClick={() => setLaag(3)} className="w-full py-4 rounded-2xl font-bold text-base border-2 transition-all hover:shadow-md" style={{ borderColor: brand.oranje, color: brand.oranje, background: "white" }}>
              Bespreek dit in een Scan-reflectie
            </button>
          </div>
        </div>

        {laag >= 2 && (
          <div ref={rapportRef} className="mt-4 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-2">Volledig rapport</div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {[zwak[0], ...Object.keys(veiligeScores).filter((k) => k !== zwak[0])].map((key) => (
              <RapportSectie key={key} kwadrant={key} data={veiligeScores[key]} />
            ))}

            <div className="rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-6" style={{ background: `linear-gradient(135deg, ${brand.roze}, white)` }}>
              <div className="p-6">
                <h3 className="font-black text-gray-800 text-lg mb-2" style={{ fontFamily: "'Alegreya Sans', Georgia, serif" }}>
                  Ontvang dit rapport in je mailbox
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
                        Stuur
                      </button>
                    </div>
                    {mailError && <p className="text-xs text-red-600 break-all">EmailJS fout: {mailError}</p>}
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <button onClick={() => setLaag(3)} className="w-full py-4 rounded-2xl text-white font-bold text-base shadow-md hover:opacity-90 transition-opacity" style={{ background: `linear-gradient(135deg, ${brand.oranje}, ${brand.donkerrood})` }}>
                Plan een Scan-reflectie gesprek →
              </button>
            </div>
          </div>
        )}

        {laag >= 3 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 px-2">Scan-reflectie</div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <a
              href="mailto:team@uiterwaarden.com?subject=Scan-reflectie"
              className="block w-full py-5 rounded-2xl text-white font-black text-lg text-center shadow-lg hover:opacity-90 transition-all hover:scale-[1.01]"
              style={{ background: `linear-gradient(135deg, ${brand.oranje} 0%, ${brand.donkerrood} 100%)` }}
            >
              Plan jouw Scan-reflectie →
            </a>
            <p className="text-center text-gray-400 text-xs mt-3">Kies zelf een moment · Gratis · 20 minuten</p>
          </div>
        )}
      </main>
    </div>
  );
}
