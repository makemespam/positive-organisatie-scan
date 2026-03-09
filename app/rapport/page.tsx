import ResultaatPagina from "@/components/ResultaatPagina";
import { buildScoresFromAnswers, decodeVToAnswers } from "@/lib/report-url";

type RapportRouteProps = {
  searchParams: Promise<{ v?: string; n?: string; e?: string }>;
};

export default async function RapportRoute({ searchParams }: RapportRouteProps) {
  const params = await searchParams;
  const answers = params?.v ? decodeVToAnswers(params.v) : null;
  const scores = answers ? buildScoresFromAnswers(answers) : null;

  return (
    <ResultaatPagina
      scores={scores}
      naam={params?.n ?? ""}
      email={params?.e ?? ""}
      answers={answers ?? []}
    />
  );
}
