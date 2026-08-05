import type { ExamQuestion } from "../types/exam";

export function correctOptionFor(question: ExamQuestion) {
  return question.options.find(option => option.id === question.correctAnswer);
}

export function explanationForQuestion(question: ExamQuestion) {
  if (question.explanation.trim()) return question.explanation.trim();
  const correct = correctOptionFor(question);
  return `לפי מפתח התשובות המאומת של מבחן ${question.year}, תשובה ${question.correctAnswer}${correct ? ` — ${correct.text}` : ""} היא התשובה הנכונה. שאר האפשרויות אינן תואמות למפתח הרשמי של שאלה זו.`;
}
