import ResultaatPagina from "@/components/ResultaatPagina";

type ScorePayload = {
  samenwerking: { label: string; score: number; vragen: number[] };
  praktijk: { label: string; score: number; vragen: number[] };
  strategie: { label: string; score: number; vragen: number[] };
  missie: { label: string; score: number; vragen: number[] };
};

type ResultaatRouteProps = {
  searchParams: Promise<{ data?: string }>;
};

export default async function ResultaatRoute({ searchParams }: ResultaatRouteProps) {
  const params = await searchParams;
  const encoded = params?.data;
  let payload: { naam?: string; email?: string; scores?: ScorePayload } = {};

  if (encoded) {
    try {
      payload = JSON.parse(decodeURIComponent(encoded));
    } catch {
      payload = {};
    }
  }
  return (
    <ResultaatPagina
      scores={payload.scores ?? null}
      naam={payload.naam ?? ""}
      email={payload.email ?? ""}
    />
  );
}
