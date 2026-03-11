"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { getAnchorForScore, getScoreLabel, quadrants, questions } from "@/lib/scan-config";
import { encodeAnswersToV } from "@/lib/report-url";
import { uitlegCopy } from "@/lib/copy";

type Step = "welcome" | "questions" | "lead";

type Lead = {
  name: string;
  email: string;
};

const brand = {
  oranje: "#f79648",
  donkerrood: "#c86059",
  blauw: "#314a7b",
  groen: "#006d82",
};

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array.from({ length: questions.length }, () => 5));
  const [lead, setLead] = useState<Lead>({ name: "", email: "" });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const currentScore = answers[currentQuestionIndex];
  const currentScoreLabel = getScoreLabel(currentScore);
  const currentAnchor = getAnchorForScore(currentScore, currentQuestion.anchors);
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleNextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setStep("lead");
      return;
    }
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingLead(true);
    const v = encodeAnswersToV(answers);
    const n = encodeURIComponent(lead.name);
    const e = encodeURIComponent(lead.email);

    setIsSubmittingLead(false);
    router.push(`/rapport?v=${v}&n=${n}&e=${e}`);
  };

  const handleSkipLead = () => {
    const v = encodeAnswersToV(answers);
    const n = encodeURIComponent(lead.name);
    router.push(`/rapport?v=${v}&n=${n}&skip=1`);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Image src="/logo.png" alt="Uiterwaarden" width={120} height={40} className="object-contain" />
          <div className="text-xs text-gray-400">Positieve Organisatie Scan</div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-2xl rounded-3xl border border-gray-100 bg-white p-5 shadow-sm mt-6 mb-8 sm:p-8">
        {step === "welcome" && (
          <section className="space-y-6">
            <div className="inline-flex rounded-full px-3 py-1 text-sm font-medium" style={{ background: "#e8f4f0", color: brand.groen }}>
              Positieve Organisatie Scan
            </div>
            <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl" style={{ fontFamily: "'Alegreya Sans', Georgia, serif" }}>
              In 5 minuten inzicht in waar jullie team floreert
            </h1>
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              Deze scan is een korte, positieve momentopname van de afgelopen week. Er zijn geen goede
              of foute antwoorden: je ontdekt waar energie zit en waar groeikansen liggen.
            </p>
            <ul className="space-y-2 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
              <li>12 vragen verdeeld over 4 kwadranten</li>
              <li>Slider van 1 tot 10 met duidelijke betekenis per score</li>
              <li>Direct een visueel resultaat met persoonlijk feedbacksignaal</li>
            </ul>
            <button
              type="button"
              onClick={() => setStep("questions")}
              className="inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-white transition focus:outline-none focus-visible:ring-2"
              style={{ background: `linear-gradient(135deg, ${brand.groen}, ${brand.blauw})` }}
            >
              Start de scan
            </button>

            <details className="rounded-2xl border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer text-sm font-semibold" style={{ color: brand.groen }}>
                {uitlegCopy.titel}
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-sm leading-relaxed text-slate-600">{uitlegCopy.toelichting}</p>
                <Image
                  src={uitlegCopy.graphicPad}
                  alt="Competing Values Framework van Robert Quinn"
                  width={1200}
                  height={700}
                  className="h-auto w-full rounded-lg object-contain"
                />
              </div>
            </details>
          </section>
        )}

        {step === "questions" && (
          <section className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>
                  Vraag {currentQuestionIndex + 1} van {questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <motion.div
                  className="h-full rounded-full"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35 }}
                  style={{ background: brand.groen }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="space-y-3">
                  <p className="text-sm font-medium uppercase tracking-wide" style={{ color: brand.groen }}>
                    {currentQuestion.id} · {quadrants.find((item) => item.id === currentQuestion.quadrantId)?.name}
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-900" style={{ fontFamily: "'Alegreya Sans', Georgia, serif" }}>{currentQuestion.title}</h2>
                  <p className="leading-relaxed text-slate-600">{currentQuestion.prompt}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <label htmlFor="score" className="mb-3 block text-sm font-medium text-slate-700">
                    Jouw score: <span className="font-semibold" style={{ color: brand.groen }}>{currentScore}</span>
                  </label>
                  <input
                    id="score"
                    type="range"
                    min={1}
                    max={10}
                    value={currentScore}
                    onChange={(event) => {
                      const newValue = Number(event.target.value);
                      setAnswers((prev) => prev.map((score, index) => (index === currentQuestionIndex ? newValue : score)));
                    }}
                    className="h-4 w-full cursor-pointer"
                    style={{ accentColor: brand.groen }}
                  />
                  <div className="mt-4 rounded-xl border p-3" style={{ borderColor: "#c8dae5", background: "#eef5f8" }}>
                    <p className="text-sm font-semibold" style={{ color: brand.blauw }}>
                      Betekenis
                    </p>
                    <p className="mt-1 text-sm" style={{ color: brand.blauw }}>
                      {currentScoreLabel} · {currentAnchor.text}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Vorige
                  </button>
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="inline-flex min-h-12 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white transition"
                    style={{ background: brand.groen }}
                  >
                    {currentQuestionIndex === questions.length - 1 ? "Naar je resultaat" : "Volgende"}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
        )}

        {step === "lead" && (
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900" style={{ fontFamily: "'Alegreya Sans', Georgia, serif" }}>Ontvang je resultaten en uitgebreide rapport</h2>
            <p className="text-slate-600">
              Vul je naam en e-mailadres in. Dan kun je direct door naar je scanresultaat en is de
              e-mailafhandeling voorbereid voor verzending.
            </p>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Naam
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={lead.name}
                  onChange={(event) => setLead((prev) => ({ ...prev, name: event.target.value }))}
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  placeholder="Jouw naam"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  E-mailadres
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={lead.email}
                  onChange={(event) => setLead((prev) => ({ ...prev, email: event.target.value }))}
                  className="min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                  placeholder="naam@bedrijf.nl"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingLead}
                className="inline-flex min-h-12 items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
                style={{ background: `linear-gradient(135deg, ${brand.oranje}, ${brand.donkerrood})` }}
              >
                {isSubmittingLead ? "Bezig met verwerken..." : "Bekijk mijn resultaat"}
              </button>
              <button
                type="button"
                onClick={handleSkipLead}
                className="block text-sm text-slate-500 underline underline-offset-2 hover:text-slate-700"
              >
                Sla e-mail over en bekijk direct je resultaat
              </button>
            </form>
          </section>
        )}

      </main>
    </div>
  );
}
