"use client";
import { useSearchParams } from "next/navigation";
import { ExamRunner } from "./exam-runner";
import { allQuestions, associationQuestions, improvisedQuestions, questionsByYear } from "../lib/exams";
import { sourceExamQuestions } from "../lib/source-exams";
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
  } else if (mode === "association") {
    questions = associationQuestions[value] ?? [];
    const titles: Record<string, string> = { foundations: "מבחן האיגוד — יסודות הרפואה הסינית", western: "מבחן האיגוד — רפואה מערבית", acupuncture: "מבחן האיגוד — דיקור", "point-location": "מבחן האיגוד — איתור נקודות", herbs: "מבחן האיגוד — צמחי מרפא" };
    title = titles[value] ?? "מבחן האיגוד";
  } else if (mode === "source") {
    questions = sourceExamQuestions[value] ?? [];
    const parts = value.split("-");
    const year = parts.pop();
    const topic = parts.join("-");
    const titles: Record<string, string> = { herbs: "צמחי מרפא", foundations: "יסודות הרפואה הסינית", acupuncture: "דיקור", "point-location": "איתור נקודות", western: "רפואה מערבית" };
    title = `מבחן ${titles[topic] ?? "האיגוד"} ${year}`;
  } else if (mode === "improvised") {
    questions = improvisedQuestions[value] ?? [];
    title = value === "western-1" ? "מבחן מערבי מאולתר 1" : "מבחן מאולתר";
  } else if (mode === "topic") {
    questions = allQuestions.filter((question) => question.topic === value);
    title = `תרגול בנושא ${value}`;
  } else {
    questions = allQuestions;
  }

  return <ExamRunner questions={questions} title={title} sessionKey={`${mode}:${value || "all"}`} />;
}
