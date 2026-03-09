export const QUESTION_COUNT = 12;

export type ScorePayload = {
  samenwerking: { label: string; score: number; vragen: number[] };
  praktijk: { label: string; score: number; vragen: number[] };
  strategie: { label: string; score: number; vragen: number[] };
  missie: { label: string; score: number; vragen: number[] };
};

export function encodeAnswersToV(answers: number[]): string {
  if (answers.length !== QUESTION_COUNT) return "";
  return answers
    .map((score) => {
      if (score < 1 || score > 10) return "5";
      return score === 10 ? "0" : String(score);
    })
    .join("");
}

export function decodeVToAnswers(v: string): number[] | null {
  if (!v || v.length !== QUESTION_COUNT || !/^[0-9]{12}$/.test(v)) return null;
  return v.split("").map((char) => (char === "0" ? 10 : Number(char)));
}

export function buildScoresFromAnswers(answers: number[]): ScorePayload {
  const samenwerking = answers.slice(0, 3);
  const praktijk = answers.slice(3, 6);
  const strategie = answers.slice(6, 9);
  const missie = answers.slice(9, 12);

  const avg = (values: number[]) =>
    values.length ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1)) : 0;

  return {
    samenwerking: { label: "Samenwerking", score: avg(samenwerking), vragen: samenwerking },
    praktijk: { label: "Praktijk", score: avg(praktijk), vragen: praktijk },
    strategie: { label: "Strategie & Basis op orde", score: avg(strategie), vragen: strategie },
    missie: { label: "Missie & Zingeving", score: avg(missie), vragen: missie },
  };
}
