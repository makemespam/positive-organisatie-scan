export type AnchorPoint = {
  key: 1 | 3 | 5 | 7 | 9;
  label: string;
  text: string;
};

export type Question = {
  id: string;
  title: string;
  prompt: string;
  quadrantId: QuadrantId;
  anchors: AnchorPoint[];
};

export type QuadrantId =
  | "samenwerking"
  | "praktijk"
  | "strategie-basis"
  | "missie-zingeving";

export type Quadrant = {
  id: QuadrantId;
  name: string;
  subtitle: string;
  feedback: string;
};

export const quadrants: Quadrant[] = [
  {
    id: "samenwerking",
    name: "Samenwerking",
    subtitle: "Intern & Flexibel",
    feedback:
      "Jullie kracht zit in verbinding: vertrouwen, openheid en onderlinge steun geven jullie team energie.",
  },
  {
    id: "praktijk",
    name: "Praktijk",
    subtitle: "Spelregels · Inbreng · Initiatief",
    feedback:
      "Jullie blinken uit in dagelijkse samenwerking: duidelijke werkafspraken en betrokkenheid helpen om stabiel te presteren.",
  },
  {
    id: "strategie-basis",
    name: "Koers & Resultaat",
    subtitle: "Extern & Beheerst",
    feedback:
      "Jullie hebben een sterke basis: heldere doelen, eigenaarschap en rolverdeling zorgen voor resultaatgericht werken.",
  },
  {
    id: "missie-zingeving",
    name: "Missie & Zingeving",
    subtitle: "Extern & Flexibel",
    feedback:
      "Jullie ervaren betekenis in het werk: talenten worden benut en jullie kijken bewust naar impact buiten het team.",
  },
];

export const questions: Question[] = [
  {
    id: "V1",
    title: "Kwetsbaarheid",
    prompt:
      "Denk aan de afgelopen week: als iemand een fout maakte of iets niet wist — was dat iets wat je deelde, of iets wat je liever voor je hield?",
    quadrantId: "samenwerking",
    anchors: [
      { key: 1, label: "1", text: "Fouten blijven verborgen, niemand laat zich kennen" },
      { key: 3, label: "3", text: "Er is voorzichtigheid, mensen wikken en wegen wat ze delen" },
      { key: 5, label: "5", text: "Soms is er openheid, maar het hangt af van de situatie" },
      { key: 7, label: "7", text: "Er is ruimte voor eerlijkheid, fouten worden bespreekbaar gemaakt" },
      { key: 9, label: "9-10", text: "Kwetsbaarheid is normaal hier, we leren openlijk van elkaar" },
    ],
  },
  {
    id: "V2",
    title: "Collectieve draagkracht",
    prompt:
      "Denk aan de afgelopen week: als het druk was, trokken teamleden zich dan terug op hun eigen werk, of pakten jullie het samen op?",
    quadrantId: "samenwerking",
    anchors: [
      { key: 1, label: "1", text: "Ieder redde zichzelf, niemand keek om" },
      { key: 3, label: "3", text: "Af en toe een handje, maar vooral eigen werk eerst" },
      { key: 5, label: "5", text: "Wisselend — soms samen, soms ieder voor zich" },
      { key: 7, label: "7", text: "We hielpen elkaar waar nodig, druk werd gedeeld" },
      { key: 9, label: "9-10", text: "We herverdeelden samen, niemand bleef er alleen voor staan" },
    ],
  },
  {
    id: "V3",
    title: "Energie & plezier",
    prompt:
      "Denk aan de afgelopen week: hoe vaak was er oprecht en ontspannen contact — een lach, een goed gesprek, iets luchts?",
    quadrantId: "samenwerking",
    anchors: [
      { key: 1, label: "1", text: "Het was puur zakelijk, geen ontspanning te bekennen" },
      { key: 3, label: "3", text: "Een moment misschien, maar het voelde gedwongen" },
      { key: 5, label: "5", text: "Hier en daar wat, maar de toon was overwegend serieus" },
      { key: 7, label: "7", text: "Er werd regelmatig gelachen en even bijgepraat" },
      { key: 9, label: "9-10", text: "Er was echte energie en verbinding, de week voelde licht" },
    ],
  },
  {
    id: "V4",
    title: "Spelregels & insluiting",
    prompt:
      "Denk aan de afgelopen week: waren de spelregels — ook de ongeschreven — helder voor iedereen, ook voor wie er nog niet lang bij zit?",
    quadrantId: "praktijk",
    anchors: [
      { key: 1, label: "1", text: "Veel ongeschreven regels, je moet ze zelf maar ontdekken" },
      { key: 3, label: "3", text: "Sommige dingen zijn duidelijk, maar er is ook veel gissen" },
      { key: 5, label: "5", text: "Het is redelijk helder, maar voor nieuwkomers nog wennen" },
      { key: 7, label: "7", text: "De meeste regels zijn transparant en worden uitgelegd" },
      { key: 9, label: "9-10", text: "Iedereen weet hoe het werkt hier, ook wie er net bij is" },
    ],
  },
  {
    id: "V5",
    title: "Vergaderdynamiek",
    prompt:
      "Denk aan de afgelopen week: voelden alle teamleden de ruimte om zich uit te spreken, of waren het steevast dezelfde mensen die het woord namen?",
    quadrantId: "praktijk",
    anchors: [
      { key: 1, label: "1", text: "Een enkeling bepaalt het gesprek, de rest zwijgt" },
      { key: 3, label: "3", text: "Er is enige variatie, maar de patronen zijn herkenbaar" },
      { key: 5, label: "5", text: "Wisselend — soms komen meer mensen aan het woord" },
      { key: 7, label: "7", text: "De meesten spreken zich uit, stille stemmen worden uitgenodigd" },
      { key: 9, label: "9-10", text: "Iedereen deed mee, alle perspectieven kwamen aan bod" },
    ],
  },
  {
    id: "V6",
    title: "Ruimte vs. controle",
    prompt:
      "Denk aan de afgelopen week: werd je vooral aangesproken op hoe je dingen deed, of op wat je ermee bereikte?",
    quadrantId: "praktijk",
    anchors: [
      { key: 1, label: "1", text: "Sterke sturing op de manier van werken, weinig eigen ruimte" },
      { key: 3, label: "3", text: "Regelmatig correctie op werkwijze, resultaat is bijzaak" },
      { key: 5, label: "5", text: "Een mix — soms ruimte, soms controle" },
      { key: 7, label: "7", text: "Grotendeels vertrouwen, je wordt aangesproken op uitkomst" },
      { key: 9, label: "9-10", text: "Volledige ruimte om het op jouw manier te doen, resultaat telt" },
    ],
  },
  {
    id: "V7",
    title: "Heldere kaders",
    prompt:
      "Denk aan de afgelopen week: waren de doelen voor jouw team concreet en meetbaar, of voelden ze vaag en voor meerdere uitleg vatbaar?",
    quadrantId: "strategie-basis",
    anchors: [
      { key: 1, label: "1", text: "Doelen zijn vaag, iedereen interpreteert ze anders" },
      { key: 3, label: "3", text: "Er is een richting, maar concrete kaders ontbreken" },
      { key: 5, label: "5", text: "Sommige doelen zijn helder, andere niet" },
      { key: 7, label: "7", text: "De meeste doelen zijn concreet en voor iedereen duidelijk" },
      { key: 9, label: "9-10", text: "Glashelder — iedereen weet wat succes er deze week uitziet" },
    ],
  },
  {
    id: "V8",
    title: "Duidelijke rolverdeling",
    prompt:
      "Denk aan de afgelopen week: wist iedereen wie waarvoor verantwoordelijk was, zonder dat je dat eerst hoefde uit te zoeken?",
    quadrantId: "strategie-basis",
    anchors: [
      {
        key: 1,
        label: "1",
        text: "Rollen overlappen of zijn onduidelijk, er valt regelmatig iets tussen wal en schip",
      },
      { key: 3, label: "3", text: "Globaal is het duidelijk, maar in de details is het zoeken" },
      { key: 5, label: "5", text: "Redelijk helder, maar af en toe is er verwarring over wie wat oppakt" },
      { key: 7, label: "7", text: "De meeste rollen zijn helder en worden ook zo beleefd" },
      {
        key: 9,
        label: "9-10",
        text: "Iedereen weet precies wat zijn of haar bijdrage is deze week",
      },
    ],
  },
  {
    id: "V9",
    title: "Gezamenlijk eigenaarschap",
    prompt:
      "Denk aan de afgelopen week: als jij twee dagen afwezig was geweest — had het team dan gewoon doorgelopen, of was er van alles blijven liggen op jouw stukken?",
    quadrantId: "strategie-basis",
    anchors: [
      { key: 1, label: "1", text: "Veel zou zijn blijven liggen, ik ben onmisbaar voor te veel" },
      { key: 3, label: "3", text: "Een deel loopt door, maar kritieke dingen wachten op mij" },
      { key: 5, label: "5", text: "Wisselend — sommige dingen lopen, andere niet" },
      { key: 7, label: "7", text: "Het meeste loopt gewoon door, het team pakt het op" },
      { key: 9, label: "9-10", text: "Het team draait volledig zelfstandig, eigenaarschap zit breed verankerd" },
    ],
  },
  {
    id: "V10",
    title: "Hoger doel",
    prompt:
      "Denk aan de afgelopen week: voelde het dagelijkse werk als een bijdrage aan iets wat er echt toe doet, of was het vooral taken afwerken?",
    quadrantId: "missie-zingeving",
    anchors: [
      { key: 1, label: "1", text: "Het werk voelde zinloos of louter functioneel" },
      { key: 3, label: "3", text: "Af en toe een moment van betekenis, maar niet structureel" },
      { key: 5, label: "5", text: "Soms voelt het als meer dan taken, maar het is niet vanzelfsprekend" },
      {
        key: 7,
        label: "7",
        text: "Regelmatig het gevoel dat we ergens aan bijdragen dat groter is",
      },
      {
        key: 9,
        label: "9-10",
        text: "Elke dag voelde als een betekenisvolle bijdrage aan het grotere doel",
      },
    ],
  },
  {
    id: "V11",
    title: "Sterke kanten benutten",
    prompt:
      "Denk aan de afgelopen week: had jij de ruimte om jouw unieke kwaliteiten op jouw eigen manier in te zetten?",
    quadrantId: "missie-zingeving",
    anchors: [
      { key: 1, label: "1", text: "Nauwelijks — het werk past niet bij wat ik goed kan" },
      { key: 3, label: "3", text: "Soms een glimp, maar de ruimte is beperkt" },
      { key: 5, label: "5", text: "Wisselend — soms in mijn kracht, soms niet" },
      { key: 7, label: "7", text: "Grotendeels wel, ik kon deze week doen waar ik goed in ben" },
      { key: 9, label: "9-10", text: "Volledig in mijn kracht — ik deed deze week precies wat bij mij past" },
    ],
  },
  {
    id: "V12",
    title: "Blik naar buiten",
    prompt:
      "Denk aan de afgelopen week: was er ruimte om te reflecteren op wat er buiten de afdeling speelt en hoe jullie daarop in kunnen spelen?",
    quadrantId: "missie-zingeving",
    anchors: [
      { key: 1, label: "1", text: "Nee, we waren volledig naar binnen gericht" },
      { key: 3, label: "3", text: "Nauwelijks — de waan van de dag domineerde" },
      { key: 5, label: "5", text: "Een enkele keer, maar niet structureel" },
      { key: 7, label: "7", text: "Er was bewust even ruimte voor de blik naar buiten" },
      {
        key: 9,
        label: "9-10",
        text: "We reflecteerden actief op de buitenwereld en wat dat van ons vraagt",
      },
    ],
  },
];

export const getAnchorForScore = (score: number, anchors: AnchorPoint[]) => {
  if (score <= 2) return anchors.find((anchor) => anchor.key === 1) ?? anchors[0];
  if (score <= 4) return anchors.find((anchor) => anchor.key === 3) ?? anchors[1];
  if (score <= 6) return anchors.find((anchor) => anchor.key === 5) ?? anchors[2];
  if (score <= 8) return anchors.find((anchor) => anchor.key === 7) ?? anchors[3];
  return anchors.find((anchor) => anchor.key === 9) ?? anchors[4];
};
