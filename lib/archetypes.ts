export type Scores = {
  samenwerking: number;
  praktijk: number;
  strategie: number;
  missie: number;
};
// ─── ARCHETYPE DEFINITIES ────────────────────────────────────────────────────
const archetypen = [
  {
    id: "positieve_organisatie",
    naam: "De Positieve Organisatie",
    ideaal: { s: 8.5, p: 8.5, st: 8.5, m: 8.5 },
    tagline: "Zeldzaam en kostbaar — jullie floreren op alle vlakken.",
    risico: "Behoud de scherpte. Breedte zonder keuzes leidt tot vermoeidheid.",
  },
  {
    id: "presterend_eiland",
    naam: "Het Presterende Eiland",
    ideaal: { s: 3.5, p: 8.5, st: 8.5, m: 8.5 },
    tagline: "Jullie leveren — maar de mens achter het werk verdwijnt naar de achtergrond.",
    risico: "Stil verloop en onzichtbaar talent zijn de eerste symptomen.",
  },
  {
    id: "inspirerende_chaos",
    naam: "De Inspirerende Chaos",
    ideaal: { s: 8.5, p: 3.5, st: 8.5, m: 8.5 },
    tagline: "Warm, gedreven en resultaatgericht — maar de structuur ontbreekt.",
    risico: "Nieuwe mensen verdwalen. Besluiten verdampen na de vergadering.",
  },
  {
    id: "gezellig_drijfzand",
    naam: "Het Gezellige Drijfzand",
    ideaal: { s: 8.5, p: 8.5, st: 3.5, m: 8.5 },
    tagline: "Fijn team, goede sfeer — maar wie is waarvoor verantwoordelijk?",
    risico: "'We zijn een hecht team' wordt een excuus voor inconsistente output.",
  },
  {
    id: "efficiente_machine",
    naam: "De Efficiënte Machine",
    ideaal: { s: 8.5, p: 8.5, st: 8.5, m: 3.5 },
    tagline: "Alles klopt op papier. Maar het waarom ontbreekt.",
    risico: "Motivatie daalt zodra het tegenzit. Mensen voeren uit, maar geloven niet meer.",
  },
  {
    id: "theekransje",
    naam: "Het Gezellige Theekransje",
    ideaal: { s: 8.5, p: 8.5, st: 3.5, m: 3.5 },
    tagline: "Warm en geordend — maar zonder richting of resultaat.",
    risico: "Risico op irrelevantie. Men werkt hard aan relaties, niet aan impact.",
  },
  {
    id: "gedreven_cowboys",
    naam: "De Gedreven Cowboys",
    ideaal: { s: 8.5, p: 3.5, st: 8.5, m: 3.5 },
    tagline: "Sterke verbinding, sterke resultaten — chaotisch en zonder hoger doel.",
    risico: "Wint op de korte termijn, verliest mensen op de lange.",
  },
  {
    id: "bevlogen_gemeenschap",
    naam: "De Bevlogen Gemeenschap",
    ideaal: { s: 8.5, p: 3.5, st: 3.5, m: 8.5 },
    tagline: "Diep verbonden en gedreven door zingeving — maar zonder structuur of resultaat.",
    risico: "Veel energie, weinig output. De missie blijft een droom.",
  },
  {
    id: "resultatenboer",
    naam: "De Resultatenboer",
    ideaal: { s: 3.5, p: 3.5, st: 8.5, m: 8.5 },
    tagline: "Doelen worden gehaald — maar mensen zijn uitwisselbaar.",
    risico: "Breekbaar bij tegenwind. Er is geen leerklimaat en weinig veiligheid.",
  },
  {
    id: "professionele_eenzame",
    naam: "De Professionele Eenzame",
    ideaal: { s: 3.5, p: 8.5, st: 3.5, m: 8.5 },
    tagline: "Correct en met overtuiging — maar los van elkaar en zonder meetbare output.",
    risico: "Specialisten die langs elkaar heen werken.",
  },
  {
    id: "bureaucratische_presteerder",
    naam: "De Bureaucratische Presteerder",
    ideaal: { s: 3.5, p: 8.5, st: 8.5, m: 3.5 },
    tagline: "Structuur en resultaten kloppen — maar er is geen hart en geen richting.",
    risico: "Loyaal en correct, maar passieloos. Kwetsbaar bij verandering.",
  },
  {
    id: "warm_wrak",
    naam: "Het Warme Wrak",
    ideaal: { s: 8.5, p: 3.5, st: 3.5, m: 3.5 },
    tagline: "Iedereen houdt van elkaar — maar er is geen structuur, doel of resultaat.",
    risico: "De verbinding is het laatste houvast. Zonder interventie volgt ontbinding.",
  },
  {
    id: "lege_machine",
    naam: "De Lege Procedure-machine",
    ideaal: { s: 3.5, p: 8.5, st: 3.5, m: 3.5 },
    tagline: "De processen kloppen — maar er is geen ziel, richting of verbinding.",
    risico: "Men doet wat gevraagd wordt. Niet meer, niet minder.",
  },
  {
    id: "eenzame_strateeg",
    naam: "De Eenzame Strateeg",
    ideaal: { s: 3.5, p: 3.5, st: 8.5, m: 3.5 },
    tagline: "Heldere doelen, maar één of twee mensen trekken de kar.",
    risico: "Overbelasting van de leider. De rest volgt of haakt af.",
  },
  {
    id: "bevlogen_puinhoop",
    naam: "De Bevlogen Puinhoop",
    ideaal: { s: 3.5, p: 3.5, st: 3.5, m: 8.5 },
    tagline: "Hoog gevoel van missie — maar geen enkel fundament om het te realiseren.",
    risico: "Veel goede wil, weinig structuur. Typisch vroeg stadium.",
  },
  {
    id: "uitgeblust",
    naam: "De Uitgebluste Organisatie",
    ideaal: { s: 3.5, p: 3.5, st: 3.5, m: 3.5 },
    tagline: "Dit is geen functionerend team meer — dit is een team in crisis.",
    risico: "Interventie is nodig. Bel ons.",
  },
];

// ─── GEWICHTEN ────────────────────────────────────────────────────────────────
// Strategie weegt zwaarder: zonder basis op orde ondermijnt het alles
const gewichten = { s: 1.0, p: 1.0, st: 1.2, m: 1.0 };

// ─── CLASSIFICATIE FUNCTIE ────────────────────────────────────────────────────
export function bepaalArchetype(scores: Scores) {
  // scores = { samenwerking: 6.2, praktijk: 7.8, strategie: 4.1, missie: 8.3 }

  const invoer = {
    s:  scores.samenwerking,
    p:  scores.praktijk,
    st: scores.strategie,
    m:  scores.missie,
  };

  // Bereken gewogen Euclidische afstand tot elk archetype
  const resultaten = archetypen.map(archetype => {
    const afstand = Math.sqrt(
      gewichten.s  * Math.pow(invoer.s  - archetype.ideaal.s,  2) +
      gewichten.p  * Math.pow(invoer.p  - archetype.ideaal.p,  2) +
      gewichten.st * Math.pow(invoer.st - archetype.ideaal.st, 2) +
      gewichten.m  * Math.pow(invoer.m  - archetype.ideaal.m,  2)
    );
    return { ...archetype, afstand };
  });

  // Sorteer op afstand — kleinste afstand = beste match
  resultaten.sort((a, b) => a.afstand - b.afstand);

  // Geef top-3 terug: beste match + twee runners-up voor nuance
  return {
    beste:    resultaten[0],
    runner1:  resultaten[1],
    runner2:  resultaten[2],
    // Zekerheidspercentage: hoe ver ligt #2 van #1?
    // Groot verschil = hoge zekerheid, klein verschil = grensgebied
    zekerheid: Math.min(100, Math.round(
      ((resultaten[1].afstand - resultaten[0].afstand) / resultaten[1].afstand) * 200
    )),
  };
}