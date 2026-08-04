"use client";
import { useSearchParams } from "next/navigation";
import { ExamRunner } from "./exam-runner";
import { allQuestions, questionsByYear } from "../lib/exams";
import type { ExamQuestion } from "../types/exam";

export function ExamLoader() {
  const params = useSearchParams();
  const mode = params.get("mode") ?? "random";
  const value = params.get("value") ?? "";
  let questions: ExamQuestion[] = [];
  let title = "מבחן מעורב";

  if (mode === "year") {
    const yearly = questionsByYear[Number(value)] ?? [];
    questions = yearly.length === 30 ? yearly : [];
    title = `מבחן רפואה מערבית ${value}`;
  } else if (mode === "topic") {
    questions = allQuestions.filter((question) => question.topic === value);
    title = `תרגול בנושא ${value}`;
  } else {
    questions = allQuestions;
  }

  return <ExamRunner questions={questions} title={title} sessionKey={`${mode}:${value || "all"}`} />;
}
