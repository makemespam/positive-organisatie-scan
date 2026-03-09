import Image from "next/image";
import { uitlegCopy } from "@/lib/copy";

export default function UitlegPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-black text-gray-800 mb-4">{uitlegCopy.titel}</h1>

        <details className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm" open>
          <summary className="cursor-pointer list-none font-semibold text-[#006d82]">
            Toon toelichting op het model
          </summary>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
              <Image
                src={uitlegCopy.graphicPad}
                alt="Quinn model van de Positieve Organisatie Scan"
                width={1200}
                height={700}
                className="h-auto w-full rounded-lg object-contain"
              />
              <p className="mt-2 text-xs text-gray-500">
                Als de afbeelding niet zichtbaar is: zet de graphic op `{uitlegCopy.graphicPad}`.
              </p>
            </div>
            <p className="text-sm leading-relaxed text-gray-700">{uitlegCopy.toelichting}</p>
          </div>
        </details>
      </div>
    </main>
  );
}
