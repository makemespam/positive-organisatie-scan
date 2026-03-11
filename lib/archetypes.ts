// lib/archetypes.ts
// Positieve Organisatie Scan — Uiterwaarden
// Archetype classificatie op basis van het Wiel van Quinn

export type Scores = {
  samenwerking: number;
  praktijk: number;
  strategie: number;
  missie: number;
};

export type Archetype = {
  id: string;
  naam: string;
  tagline: string;           // één zin, waarderend + scherp
  omschrijving: string;      // vier zinnen, waarderend met verbeterpunten
  risico: string;            // één zin, concreet risico
  herkenbaar: string;        // contexten/sectoren waar dit veel voorkomt
  ideaal: { s: number; p: number; st: number; m: number };
  dominantKwadrant: "s" | "p" | "st" | "m" | "geen";
  speciaal?: boolean;        // voor het 5555-archetype
};

export const archetypen: Archetype[] = [

  // ─── ALLE VIER HOOG ────────────────────────────────────────────────────────
  {
    id: "positieve_organisatie",
    naam: "De Positieve Organisatie",
    tagline: "Jullie floreren op alle vlakken — dat is zeldzamer dan het lijkt.",
    omschrijving:
      "Jullie team heeft iets bijzonders opgebouwd: een cultuur waarin verbinding, structuur, resultaat én zingeving elkaar versterken in plaats van tegenwerken. " +
      "Dat is niet vanzelfsprekend — de meeste teams excelleren op één of twee kwadranten en laten de rest liggen. " +
      "De uitdaging voor jullie is niet groeien, maar behouden: breedte zonder bewuste keuzes leidt tot versnippering en stille vermoeidheid. " +
      "Blijf investeren in alle vier de assen, ook als de druk toeneemt — juist dan is de verleiding groot om terug te vallen op alleen resultaat of alleen verbinding.",
    risico: "Versnippering van energie: als alles belangrijk is, wordt niets meer prioriteit.",
    herkenbaar: "Volwassen coöperaties, purpose-gedreven scale-ups, goed geleide familiebedrijven, toonaangevende zorgorganisaties.",
    ideaal: { s: 8.5, p: 8.5, st: 8.5, m: 8.5 },
    dominantKwadrant: "geen",
  },

  // ─── ÉÉN LAAG ──────────────────────────────────────────────────────────────
  {
    id: "presterende_eilanden",
    naam: "De Presterende Eilanden",
    tagline: "Jullie leveren indrukwekkende resultaten — de mens achter het werk verdient meer aandacht.",
    omschrijving:
      "Dit team weet hoe het moet presteren: processen kloppen, doelen zijn helder en de missie wordt serieus genomen. " +
      "Wat er ontbreekt is de onderstroom van echte verbinding — de informele gesprekken, de gezamenlijke lach, het gevoel dat je er niet alleen voor staat. " +
      "Talent verdwijnt hier niet luid, maar stil: mensen vertrekken of trekken zich terug zonder dat het opvalt, omdat de resultaten op papier nog steeds kloppen. " +
      "Een kleine investering in de menselijke kant — veiligheid, kwetsbaarheid, plezier — heeft hier een buitenproportioneel groot effect op duurzaamheid en behoud.",
    risico: "Stil verloop en onzichtbaar talent: de beste mensen vertrekken als eersten.",
    herkenbaar: "Professionele dienstverlening, IT-teams, advocatenkantoren, academische afdelingen, consultancybureaus.",
    ideaal: { s: 3.5, p: 8.5, st: 8.5, m: 8.5 },
    dominantKwadrant: "p",
  },
  {
    id: "inspirerende_chaos",
    naam: "De Inspirerende Chaos",
    tagline: "Jullie energie en gedrevenheid zijn aanstekelijk — nu de structuur nog.",
    omschrijving:
      "Weinig teams hebben zoveel drive als dit: mensen gaan voor elkaar door het vuur, de doelen zijn ambitieus en het werk voelt zinvol. " +
      "Maar de structuur die al die energie moet omzetten in consistente resultaten ontbreekt — vergaderingen lopen uit, besluiten worden genomen maar niet uitgevoerd, nieuwe mensen verdwalen in ongeschreven regels. " +
      "De frustratie die hier ontstaat is niet gebrek aan inzet, maar gebrek aan houvast: mensen weten niet goed wie waarvoor verantwoordelijk is en welke spelregels er eigenlijk gelden. " +
      "Een relatief kleine investering in heldere afspraken en besluitvormingsstructuur maakt al die goede energie veel effectiever.",
    risico: "Goede mensen raken uitgeput door de chaos en missen de structuur om hun talent kwijt te kunnen.",
    herkenbaar: "Startups, creatieve bureaus, jonge zorgteams, maatschappelijke organisaties in groeifase, innovatieafdelingen.",
    ideaal: { s: 8.5, p: 3.5, st: 8.5, m: 8.5 },
    dominantKwadrant: "s",
  },
  {
    id: "warme_stagnatie",
    naam: "De Warme Stagnatie",
    tagline: "Jullie zijn een fijn team om deel van uit te maken — en jullie weten zelf ook dat er meer in zit.",
    omschrijving:
      "De verbinding in dit team is oprecht: mensen kennen elkaar, helpen elkaar en werken met plezier samen. " +
      "Maar ergens in de vertaling van goede bedoelingen naar concrete resultaten gaat het mis — rollen zijn vaag, doelen worden niet scherp gemaakt en resultaatverantwoordelijkheid wordt zachtjes vermeden. " +
      "Het risico is dat 'we zijn een hecht team' een onbewust schild wordt tegen lastige gesprekken over wie wat levert. " +
      "De winst zit hier in het toevoegen van helderheid zónder de warmte te verliezen — dat is precies het terrein waarop positieve organisaties zich onderscheiden.",
    risico: "Gezelligheid als excuus: de goede sfeer maskeert gebrek aan resultaatdiscipline totdat het te laat is.",
    herkenbaar: "Non-profitorganisaties, onderwijsteams, overheidsafdelingen, langlopende projectteams, HR-afdelingen.",
    ideaal: { s: 8.5, p: 8.5, st: 3.5, m: 8.5 },
    dominantKwadrant: "s",
  },
  {
    id: "efficiente_machine",
    naam: "De Efficiënte Machine",
    tagline: "Jullie presteren betrouwbaar en gestructureerd — het waarom mag meer ruimte krijgen.",
    omschrijving:
      "Dit team functioneert goed: processen zijn op orde, samenwerking is prettig en resultaten worden gehaald. " +
      "Wat ontbreekt is het verhaal achter het werk — de reden waarom het ertoe doet, de verbinding met een groter doel dat mensen motiveert ook als het even tegenzit. " +
      "Dat gemis is op goede dagen nauwelijks voelbaar, maar op moeilijke momenten — reorganisaties, tegenwind, verloop — blijkt het fundament broos. " +
      "Teams die investeren in zingeving en betekenis worden veerkrachtiger, niet zachter: mensen die weten waarom ze doen wat ze doen, presteren ook beter.",
    risico: "Motivatieverlies bij tegenwind: mensen voeren uit maar geloven er niet meer in.",
    herkenbaar: "Grote corporates, productiebedrijven, shared service centers, financiële instellingen, uitvoeringsorganisaties.",
    ideaal: { s: 8.5, p: 8.5, st: 8.5, m: 3.5 },
    dominantKwadrant: "st",
  },

  // ─── TWEE LAAG ─────────────────────────────────────────────────────────────
  {
    id: "gezellige_bubbel",
    naam: "De Gezellige Bubbel",
    tagline: "Jullie hebben een warme basis — nu richting en resultaat er nog bij.",
    omschrijving:
      "Er is échte verbinding in dit team: mensen zijn betrokken bij elkaar en de onderlinge processen zijn prettig. " +
      "Maar zowel de resultaatdiscipline als de zingeving ontbreken, waardoor het team vooral naar binnen is gekeerd en de buitenwereld — klanten, organisatie, maatschappij — op afstand blijft. " +
      "Het gevaar is dat dit team zichzelf als goed functionerend ervaart, terwijl de omgeving het als weinig relevant beschouwt. " +
      "De eerste stap is niet harder werken, maar het gesprek aangaan over: waar willen we als team écht naartoe, en wat levert ons werk op voor anderen?",
    risico: "Irrelevantie: een fijn team dat weinig bijdraagt aan de organisatiedoelen verliest uiteindelijk zijn bestaansrecht.",
    herkenbaar: "Ondersteunende diensten, stafafdelingen, langlopende overheidsprojecten, teams na een fusie of reorganisatie.",
    ideaal: { s: 8.5, p: 8.5, st: 3.5, m: 3.5 },
    dominantKwadrant: "s",
  },
  {
    id: "gedreven_cowboys",
    naam: "De Gedreven Cowboys",
    tagline: "Jullie halen resultaten en staan voor elkaar klaar — nu het grotere verhaal nog.",
    omschrijving:
      "Dit team heeft pit: de verbinding is sterk, de resultaatgerichtheid ook, en als er iets moet gebeuren gebeurt het. " +
      "Maar structuur en zingeving ontbreken — het draait om de prestatie van nu, niet om duurzaam floreren op de langere termijn. " +
      "Mensen raken hier uitstekende professionals, maar missen een context die hun werk betekenisvol maakt buiten het directe resultaat. " +
      "Het investeren in een helder 'waarom' en werkbare afspraken voorkomt dat de energie van nu ten koste gaat van de mensen van morgen.",
    risico: "Korte termijn winst, lange termijn verlies: de beste mensen vertrekken als de energie opraakt.",
    herkenbaar: "Salesteams, crisisteams, vastgoed, handelsbedrijven, commerciële afdelingen van grote organisaties.",
    ideaal: { s: 8.5, p: 3.5, st: 8.5, m: 3.5 },
    dominantKwadrant: "s",
  },
  {
    id: "bevlogen_gemeenschap",
    naam: "De Bevlogen Gemeenschap",
    tagline: "Jullie geloof in de missie en de verbinding onderling zijn een krachtig fundament — nu de uitvoering nog.",
    omschrijving:
      "Weinig dingen zijn waardevoller dan een team dat écht gelooft in wat het doet én elkaar graag ziet. " +
      "Maar zonder heldere structuur en resultaatdiscipline blijft de missie een droom: er wordt veel gepraat over het grotere doel, maar de vertaling naar concrete stappen en verantwoordelijkheden ontbreekt. " +
      "De frustratie die hier langzaam opbouwt is die van mensen die hard willen bijdragen maar niet goed weten hoe of waarvoor ze precies verantwoordelijk zijn. " +
      "Een stevige basis op orde — heldere rollen, meetbare doelen — is hier geen bedreiging voor de cultuur, maar de katalysator die al die energie eindelijk productief maakt.",
    risico: "De missie blijft een droom: energie en betrokkenheid worden verspild zonder structuur om het te realiseren.",
    herkenbaar: "Ideële organisaties, sociale ondernemingen, nieuwe coöperaties, religieuze instellingen, activistische teams.",
    ideaal: { s: 8.5, p: 3.5, st: 3.5, m: 8.5 },
    dominantKwadrant: "m",
  },
  {
    id: "resultatenboer",
    naam: "De Resultatenboer",
    tagline: "Jullie weten wat succes is en halen het — de mens en het proces mogen meer aandacht.",
    omschrijving:
      "Doelen worden gehaald, de strategie is helder en de missie wordt serieus genomen — dat is meer dan veel teams kunnen zeggen. " +
      "Maar de investering in mensen en processen is laag: er is weinig psychologische veiligheid, weinig structuur voor samenwerking en mensen voelen zich eerder uitwisselbaar dan gewaardeerd. " +
      "Dit werkt zolang de markt meewerkt en de resultaten makkelijk komen, maar de organisatie is broos: bij tegenwind of verloop valt de kennis en motivatie weg die nodig is om te herstellen. " +
      "Een betere basis op het menselijke en procesmatige vlak maakt de resultaten niet minder — maar wel duurzamer.",
    risico: "Broosheid: zonder menselijk en procesmatig fundament is één crisis genoeg om te destabiliseren.",
    herkenbaar: "Groeiende scale-ups, handelsbedrijven, resultaatgedreven non-profits, politieke organisaties.",
    ideaal: { s: 3.5, p: 3.5, st: 8.5, m: 8.5 },
    dominantKwadrant: "st",
  },
  {
    id: "professionele_eenzame",
    naam: "De Professionele Eenzame",
    tagline: "Jullie zijn vakbekwaam en gedreven — samen zouden jullie veel meer bereiken.",
    omschrijving:
      "Individueel zijn de mensen in dit team sterk: ze werken correct, kennen hun vak en geloven in wat ze doen. " +
      "Maar de verbinding tussen die mensen en de discipline om gezamenlijk resultaten te boeken ontbreken — men werkt naast elkaar in plaats van met elkaar. " +
      "Vergaderingen zijn informatief maar niet besluitvormend, kennis wordt niet gedeeld en de collectieve kracht van het team wordt nauwelijks benut. " +
      "De winst zit hier in samenwerking: niet als sociaal doel, maar als professionele strategie — teams die kennis delen en op elkaar voortbouwen presteren structureel beter.",
    risico: "Verspilling van collectief talent: de optelsom is minder dan de som der delen.",
    herkenbaar: "Specialistenteams, onderzoeksgroepen, medische maatschappen, freelance-collectieven, wetenschappelijke instituten.",
    ideaal: { s: 3.5, p: 8.5, st: 3.5, m: 8.5 },
    dominantKwadrant: "p",
  },
  {
    id: "loyale_uitvoerder",
    naam: "De Loyale Uitvoerder",
    tagline: "Jullie leveren betrouwbaar wat gevraagd wordt — meer mag ook.",
    omschrijving:
      "Dit team is de ruggengraat van veel organisaties: processen kloppen, doelen worden gehaald en mensen doen loyaal hun werk. " +
      "Maar er is weinig dat de mensen bindt aan elkaar of aan een groter verhaal — men voert uit, maar gelooft er niet in, en de verbinding tussen collega's is functioneel maar niet warm. " +
      "Dat is niet erg zolang de context stabiel is, maar bij verandering — nieuw management, nieuwe strategie, crisis — ontbreekt het adaptief vermogen. " +
      "Investeren in zingeving en verbinding is hier geen luxe, maar een strategische noodzaak voor de langere termijn.",
    risico: "Rigiditeit bij verandering: loyaal en correct, maar passieloos en onvoldoende adaptief.",
    herkenbaar: "Overheidsuitvoeringsorganisaties, grote ondersteunende diensten, administratieve afdelingen, publieke nutsbedrijven.",
    ideaal: { s: 3.5, p: 8.5, st: 8.5, m: 3.5 },
    dominantKwadrant: "p",
  },

  // ─── DRIE LAAG ─────────────────────────────────────────────────────────────
  {
    id: "taaie_kern",
    naam: "De Taaie Kern",
    tagline: "Jullie verbinding is oprecht en waardevol — gebruik die nu als startpunt voor herstel.",
    omschrijving:
      "Temidden van alle uitdagingen is er iets wat veel teams niet hebben: mensen die elkaar écht mogen en voor elkaar willen gaan. " +
      "Die verbinding is geen bijzaak — het is het fundament waarop herstel gebouwd kan worden, en het is meer waard dan het op dit moment misschien lijkt. " +
      "Maar zonder structuur, richting en resultaatdiscipline is warmte alleen niet genoeg om het team vooruit te brengen: er is behoefte aan houvast van buitenaf en een duidelijk begin. " +
      "De eerste stap is klein en concreet: één gedeeld doel voor de komende maand, één heldere afspraak over wie wat doet — en dan voortbouwen op de verbinding die er al is.",
    risico: "Ontbinding: zonder interventie van buitenaf lost de warmte uiteindelijk op in frustratie.",
    herkenbaar: "Teams na langdurige onzekerheid, afdelingen na meerdere reorganisaties, zorgteams onder hoge werkdruk.",
    ideaal: { s: 8.5, p: 3.5, st: 3.5, m: 3.5 },
    dominantKwadrant: "s",
  },
  {
    id: "holle_structuur",
    naam: "De Holle Structuur",
    tagline: "De processen staan — nu alleen nog de mensen en het verhaal er achter.",
    omschrijving:
      "Er is iets solides in dit team: de structuren en procedures functioneren, en dat geeft houvast in een verder uitdagende context. " +
      "Maar de drie andere pijlers ontbreken bijna volledig — er is weinig verbinding, weinig zingeving en weinig resultaatgerichtheid voorbij het uitvoeren van taken. " +
      "Mensen doen wat gevraagd wordt, maar weten niet goed waarvoor, met wie ze het eigenlijk doen of wat het oplevert. " +
      "De structuur die er al is vormt een goede basis: de volgende stap is er betekenis en menselijkheid in brengen, en dat begint met het gesprek over wat dit team eigenlijk wil zijn.",
    risico: "Uitholling: de procedures blijven overeind, maar de mensen die ze uitvoeren haken steeds verder af.",
    herkenbaar: "Teams na fusies of overnames, afdelingen in krimpende organisaties, uitvoeringslagen van grote bureaucratieën.",
    ideaal: { s: 3.5, p: 8.5, st: 3.5, m: 3.5 },
    dominantKwadrant: "p",
  },
  {
    id: "ongedeelde_visie",
    naam: "De Ongedeelde Visie",
    tagline: "De richting is helder — nu het team er nog achter zien te krijgen.",
    omschrijving:
      "Er is een duidelijk doel en iemand — of een kleine groep — die weet waar het naartoe moet. " +
      "Maar de rest van het team volgt meer dan dat het meedenkt: er is weinig verbinding, weinig gedeelde structuur en weinig gevoel van gezamenlijke zingeving. " +
      "De trekker(s) raken hier vroeg of laat overbelast, terwijl het team om hen heen onderbezet is in verantwoordelijkheid en betrokkenheid. " +
      "De sleutel zit in het distribueren van eigenaarschap: niet de strategie bijstellen, maar anderen uitnodigen er deel van uit te maken.",
    risico: "Overbelasting van de leider en afhankelijkheid: als de trekker wegvalt, valt het team stil.",
    herkenbaar: "Ondernemingen met een dominante oprichter, kleine bureaus, eenpersoons-geleide projectteams, jonge politieke bewegingen.",
    ideaal: { s: 3.5, p: 3.5, st: 8.5, m: 3.5 },
    dominantKwadrant: "st",
  },
  {
    id: "bevlogen_pionier",
    naam: "De Bevlogen Pionier",
    tagline: "Jullie geloof in de zaak is indrukwekkend — nu het fundament nog.",
    omschrijving:
      "Er is iets wat niet gekopieerd kan worden: een team dat diep gelooft in wat het doet en daarvoor wil gaan. " +
      "Maar zonder structuur, samenwerking en resultaatdiscipline blijft de missie een gevoel in plaats van een werkelijkheid — de energie is er, de uitvoering niet. " +
      "Dit is vaak het patroon van een beginfase: veel ambitie, weinig systeem, en de overtuiging dat de goede bedoelingen het gebrek aan organisatie zullen compenseren. " +
      "Ze doen dat niet — maar het goede nieuws is dat de basis van zingeving, die het moeilijkste is om te bouwen, er al is.",
    risico: "Burnout en desillusie: mensen die hard lopen voor een missie zonder structuur raken eerder uitgeput dan anderen.",
    herkenbaar: "Jonge NGO's, grassroots-bewegingen, maatschappelijke initiatieven, startups in pre-product fase, activistische collectieven.",
    ideaal: { s: 3.5, p: 3.5, st: 3.5, m: 8.5 },
    dominantKwadrant: "m",
  },

  // ─── ALLE VIER LAAG ────────────────────────────────────────────────────────
  {
    id: "uitgeblust",
    naam: "De Uitgebluste Organisatie",
    tagline: "Dit vraagt om meer dan een scan — jullie verdienen echte ondersteuning.",
    omschrijving:
      "Een score als deze vertelt een verhaal van een team dat het zwaar heeft gehad: verbinding, structuur, richting en zingeving zijn allemaal ver te zoeken. " +
      "Dat is niet iets wat mensen zichzelf aandoen — het is het resultaat van omstandigheden, druk of een context die het team heeft uitgeput. " +
      "Een scan kan de situatie benoemen, maar niet oplossen: wat hier nodig is, is een gesprek met mensen die begrijpen hoe organisaties vastlopen en hoe ze weer in beweging komen. " +
      "Als je dit herkent, is de moed om het in te vullen al een eerste stap — de volgende stap is contact opnemen.",
    risico: "Verdere uitputting zonder interventie: dit lost zichzelf niet op.",
    herkenbaar: "Teams na langdurige crisis, organisaties in zwaar vaarwater, afdelingen na traumatische veranderprocessen.",
    ideaal: { s: 3.5, p: 3.5, st: 3.5, m: 3.5 },
    dominantKwadrant: "geen",
  },

  // ─── SPECIAAL: SOLIDE MIDDENVELD (gemiddeld ~5 op alle kwadranten) ──────────
  {
    id: "solide_middenveld",
    naam: "Het Solide Middenveld",
    tagline: "Jullie team functioneert — geen crisis, maar ook nog geen floreren.",
    omschrijving:
      "Dit is het profiel van een team dat zijn werk doet, redelijk samenwerkt en een gevoel van richting heeft — maar op geen enkel kwadrant echt uitblinkt. " +
      "Dat is eerlijker en herkenbaarder dan het klinkt: de meeste teams zitten hier een groot deel van de tijd, zeker in periodes van verandering of hoge werkdruk. " +
      "Het goede nieuws is dat er op alle vier de kwadranten groeipotentieel zit — en dat een kleine, gerichte investering op het laagst scorende kwadrant vaak een buitenproportioneel groot effect heeft op het geheel. " +
      "Als je bij het invullen het gevoel had dat de vragen moeilijk te beantwoorden waren omdat 'het zo wisselend is' — dan is dat zelf al een waardevol inzicht.",
    risico: "Comfortabele middelmatigheid: zonder gerichte aandacht blijft het team hangen waar het nu is.",
    herkenbaar:
      "Teams in transitie, afdelingen na een reorganisatie, groepen met een nieuw samengestelde samenstelling, organisaties in een stabiele maar weinig uitdagende fase.",
    ideaal: { s: 5.0, p: 5.0, st: 5.0, m: 5.0 },
    dominantKwadrant: "geen",
    speciaal: true,
  },
];

// ─── GEWICHTEN ────────────────────────────────────────────────────────────────
// Strategie weegt zwaarder: zonder basis op orde ondermijnt het alles
const gewichten = { s: 1.0, p: 1.0, st: 1.2, m: 1.0 };

// ─── CLASSIFICATIE FUNCTIE ────────────────────────────────────────────────────
// rawScores: optioneel — de 12 individuele antwoorden vóór middeling.
// Als alle 12 exact 5 zijn, is de scan waarschijnlijk niet serieus ingevuld.
// Het Solide Middenveld-archetype wint gewoon op afstand als gemiddelden ~5 zijn;
// isDefaultIngevuld is puur een UI-signaal, geen archetype-override.
export function bepaalArchetype(
  scores: Scores,
  rawScores?: number[]
): {
  beste: Archetype;
  runner1: Archetype;
  runner2: Archetype;
  zekerheid: number;
  isDefaultIngevuld: boolean;
} {
  // Detecteer of élke individuele vraag op exact 5 is blijven staan
  const isDefaultIngevuld = rawScores
    ? rawScores.every(s => s === 5)
    : false;

  const invoer = {
    s:  scores.samenwerking,
    p:  scores.praktijk,
    st: scores.strategie,
    m:  scores.missie,
  };

  // Alle archetypen doen mee — Solide Middenveld wint vanzelf bij ~5 scores
  const resultaten = archetypen.map(archetype => {
    const afstand = Math.sqrt(
      gewichten.s  * Math.pow(invoer.s  - archetype.ideaal.s,  2) +
      gewichten.p  * Math.pow(invoer.p  - archetype.ideaal.p,  2) +
      gewichten.st * Math.pow(invoer.st - archetype.ideaal.st, 2) +
      gewichten.m  * Math.pow(invoer.m  - archetype.ideaal.m,  2)
    );
    return { ...archetype, afstand };
  });

  // Sorteer op afstand — kleinste = beste match
  resultaten.sort((a, b) => a.afstand - b.afstand);

  // Zekerheidspercentage: hoe groter het verschil tussen #1 en #2, hoe zekerder
  const zekerheid = Math.min(100, Math.round(
    ((resultaten[1].afstand - resultaten[0].afstand) / resultaten[1].afstand) * 200
  ));

  return {
    beste:    resultaten[0],
    runner1:  resultaten[1],
    runner2:  resultaten[2],
    zekerheid,
    isDefaultIngevuld,
  };
}