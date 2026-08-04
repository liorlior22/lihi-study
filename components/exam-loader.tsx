"use client";
import { useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { ExamRunner } from "./exam-runner";
import { allQuestions, questionMap, questionsByYear } from "../lib/exams";
import type { ExamQuestion } from "../types/exam";

const emptySubscribe = () => () => {};
const getMistakesSnapshot = () => localStorage.getItem("lihi-exam-mistakes") ?? "[]";
const getServerSnapshot = () => "[]";

export function ExamLoader() {
  const params = useSearchParams();
  const mode = params.get("mode") ?? "random";
  const value = params.get("value") ?? "";
  const mistakesRaw = useSyncExternalStore(emptySubscribe, getMistakesSnapshot, getServerSnapshot);
  let questions: ExamQuestion[] = [];
  let title = "מבחן מעורב";

  if (mode === "year") {
    questions = questionsByYear[Number(value)] ?? [];
    title = `מבחן רפואה מערבית ${value}`;
  } else if (mode === "topic") {
    questions = allQuestions.filter((question) => question.topic === value);
    title = `תרגול בנושא ${value}`;
  } else if (mode === "mistakes") {
    let ids: string[] = [];
    try { ids = JSON.parse(mistakesRaw) as string[]; } catch { ids = []; }
    questions = ids.map((id) => questionMap.get(id)).filter((question): question is ExamQuestion => Boolean(question));
    title = "תרגול הטעויות שלי";
  } else {
    questions = allQuestions;
  }

  return <ExamRunner questions={questions} title={title} sessionKey={`${mode}:${value || "all"}`} />;
}
