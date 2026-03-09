import ResultaatPagina from "@/components/ResultaatPagina";

type ResultaatRouteProps = {
  searchParams: Promise<{ data?: string }>;
};

export default async function ResultaatRoute({ searchParams }: ResultaatRouteProps) {
  const params = await searchParams;
  const encoded = params?.data;
  let payload: { naam?: string; email?: string; scores?: unknown } = {};

  if (encoded) {
    try {
      payload = JSON.parse(decodeURIComponent(encoded));
    } catch {
      payload = {};
    }
  }
  return (
    <ResultaatPagina
      scores={(payload.scores as any) ?? null}
      naam={payload.naam ?? ""}
      email={payload.email ?? ""}
    />
  );
}
