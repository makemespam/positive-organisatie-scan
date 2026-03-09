"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { getAnchorForScore, quadrants, questions } from "@/lib/scan-config";

type Step = "welcome" | "questions" | "lead";

type Lead = {
  name: string;
  email: string;
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

    const samenwerking = answers.slice(0, 3);
    const praktijk = answers.slice(3, 6);
    const strategie = answers.slice(6, 9);
    const missie = answers.slice(9, 12);

    const avg = (values: number[]) =>
      values.length ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1)) : 0;

    const scores = {
      samenwerking: { label: "Samenwerking", score: avg(samenwerking), vragen: samenwerking },
      praktijk: { label: "Praktijk", score: avg(praktijk), vragen: praktijk },
      strategie: { label: "Strategie & Basis op orde", score: avg(strategie), vragen: strategie },
      missie: { label: "Missie & Zingeving", score: avg(missie), vragen: missie },
    };

    const payload = encodeURIComponent(
      JSON.stringify({
        naam: lead.name,
        email: lead.email,
        scores,
      }),
    );

    setIsSubmittingLead(false);
    router.push(`/resultaat?data=${payload}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6">
      <main className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        {step === "welcome" && (
          <section className="space-y-6">
            <div className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
              Positieve Organisatie Scan
            </div>
            <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
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
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              Start de scan
            </button>
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
                  className="h-full rounded-full bg-sky-500"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35 }}
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
                  <p className="text-sm font-medium uppercase tracking-wide text-sky-700">
                    {currentQuestion.id} · {quadrants.find((item) => item.id === currentQuestion.quadrantId)?.name}
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-900">{currentQuestion.title}</h2>
                  <p className="leading-relaxed text-slate-600">{currentQuestion.prompt}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                  <label htmlFor="score" className="mb-3 block text-sm font-medium text-slate-700">
                    Jouw score: <span className="font-semibold text-sky-700">{currentScore}</span>
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
                    className="h-4 w-full cursor-pointer accent-sky-600"
                  />
                  <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-3">
                    <p className="text-sm font-semibold text-sky-800">
                      Betekenis bij score {currentAnchor.label}
                    </p>
                    <p className="mt-1 text-sm text-sky-700">{currentAnchor.text}</p>
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
                    className="inline-flex min-h-12 items-center justify-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
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
            <h2 className="text-2xl font-semibold text-slate-900">Ontvang je resultaten en uitgebreide rapport</h2>
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
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-sky-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmittingLead ? "Bezig met verwerken..." : "Bekijk mijn resultaat"}
              </button>
            </form>
          </section>
        )}

      </main>
    </div>
  );
}
