"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AnswerId, ExamQuestion, ExamSession, SavedAttempt } from "../types/exam";
import { studyIdForExamTopic } from "../lib/study";

const CORRECT = "תשובה נכונה, אבל ליהי גרוסמן אנגלצ׳ין פתרה את זה מהר יותר!!!";
const WRONG = "לא נכון, הלוואי שתטעו בזה גם במבחן וליהי תענה נכון !";
const NOTICE = "שימו לב: בכל שאלה ניתן לבדוק את התשובה מיד או לעבור לשאלה הבאה ולקבל את כל התשובות בסוף המבחן.";
const SESSION = "lihi-exam-session";
const MISTAKES = "lihi-exam-mistakes";
const HISTORY = "lihi-exam-history";

function mix<T>(items: T[]) { return [...items].sort(() => Math.random() - .5); }

export function ExamRunner({ questions, title, sessionKey }: { questions: ExamQuestion[]; title: string; sessionKey: string }) {
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [attempts, setAttempts] = useState<SavedAttempt[]>([]);
  const [selected, setSelected] = useState<AnswerId | null>(null);
  const [checked, setChecked] = useState(false);
  const [startedAt, setStartedAt] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(1);
  const ordered = useMemo(() => sessionKey.includes("random") ? mix(questions) : questions, [questions, sessionKey]);
  const current = ordered[index];

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION);
      if (raw) {
        const saved = JSON.parse(raw) as ExamSession;
        if (saved.key === sessionKey && !saved.completedAt) {
          const restoredIndex = Math.min(saved.index, Math.max(0, ordered.length - 1));
          const restoredAttempt = saved.attempts.find((attempt) => attempt.questionId === ordered[restoredIndex]?.id && attempt.checkedImmediately);
          setStarted(saved.started ?? true); setIndex(restoredIndex); setAttempts(saved.attempts); setStartedAt(saved.startedAt);
          if (restoredAttempt) { setSelected(restoredAttempt.selected); setChecked(true); }
        }
      }
    } finally { setReady(true); }
  }, [ordered, sessionKey]);

  useEffect(() => {
    if (!ready || !ordered.length || !started) return;
    localStorage.setItem(SESSION, JSON.stringify({ key: sessionKey, title, questionIds: ordered.map(q => q.id), index, attempts, startedAt, started } satisfies ExamSession));
  }, [ready, started, index, attempts, ordered, sessionKey, startedAt, title]);

  if (!ready) return <div className="exam-loading">טוען את הבחינה…</div>;
  if (!ordered.length) return <div className="exam-empty"><h1>אין עדיין שאלות זמינות</h1><p>הבחינה תיפתח לאחר אימות התשובות.</p><Link href="/exams">חזרה לכל המבחנים</Link></div>;
  if (!started) return <section className="exam-intro"><span>מוכנה להתחיל?</span><h1>{title}</h1><p>{NOTICE}</p><div><b>{ordered.length}</b> שאלות</div><button onClick={() => { setStartedAt(Date.now()); setStarted(true); }}>התחלת המבחן</button></section>;

  function immediateCheck() {
    if (!selected || checked) return;
    const attempt: SavedAttempt = { questionId: current.id, selected, correct: selected === current.correctAnswer, checkedImmediately: true };
    setAttempts(existing => [...existing.filter(item => item.questionId !== current.id), attempt]);
    setChecked(true);
  }

  function finish(completed: SavedAttempt[]) {
    const completedAt = Date.now();
    const mistakes = completed.filter(a => !a.correct).map(a => a.questionId);
    localStorage.setItem(MISTAKES, JSON.stringify(mistakes));
    const result = { key: sessionKey, title, completedAt, startedAt, correct: completed.filter(a => a.correct).length, total: ordered.length };
    let history: unknown[] = []; try { history = JSON.parse(localStorage.getItem(HISTORY) ?? "[]") as unknown[]; } catch { history = []; }
    localStorage.setItem(HISTORY, JSON.stringify([...history, result]));
    localStorage.setItem(SESSION, JSON.stringify({ key: sessionKey, title, questionIds: ordered.map(q => q.id), index, attempts: completed, startedAt, started: true, completedAt } satisfies ExamSession));
    setElapsedSeconds(Math.max(1, Math.round((completedAt - startedAt) / 1000))); setAttempts(completed); setIndex(ordered.length);
  }

  function restart() {
    localStorage.removeItem(SESSION); setStarted(false); setIndex(0); setAttempts([]); setSelected(null); setChecked(false); setStartedAt(0); setElapsedSeconds(1);
  }

  function next() {
    const existing = attempts.find(item => item.questionId === current.id);
    const attempt = existing ?? { questionId: current.id, selected, correct: selected === current.correctAnswer, checkedImmediately: false };
    const updated = [...attempts.filter(item => item.questionId !== current.id), attempt];
    if (index === ordered.length - 1) { finish(updated); return; }
    setAttempts(updated); setIndex(i => i + 1); setSelected(null); setChecked(false);
  }

  if (index >= ordered.length) {
    const correct = attempts.filter(a => a.correct).length;
    const wrong = attempts.filter(a => !a.correct);
    const unanswered = attempts.filter(a => a.selected === null).length;
    return <section className="exam-results"><div className="result-score"><b>{Math.round(correct / ordered.length * 100)}%</b><span>{correct} מתוך {ordered.length} תשובות נכונות</span></div><div className="result-stats"><div><b>{wrong.length}</b><span>טעויות</span></div><div><b>{unanswered}</b><span>שאלות שלא נענו</span></div><div><b>{Math.floor(elapsedSeconds / 60)}:{String(elapsedSeconds % 60).padStart(2, "0")}</b><span>זמן כולל</span></div></div><div className="full-review"><h2>פירוט כל השאלות</h2>{ordered.map((q, i) => { const answer = attempts.find(a => a.questionId === q.id); const studyId=studyIdForExamTopic(q.topic);return <article className={answer?.correct ? "review-correct" : "review-wrong"} key={q.id}><small>שאלה {i + 1} • {q.topic}</small><h3>{q.question}</h3><p>הבחירה שלך: <b>{answer?.selected ? `${answer.selected}. ${q.options.find(o => o.id === answer.selected)?.text}` : "לא נענתה"}</b></p><p>התשובה הנכונה: <strong>{q.correctAnswer}. {q.options.find(o => o.id === q.correctAnswer)?.text}</strong></p><p>הסבר: {q.explanation || "הסבר עדיין לא נוסף"}</p>{q.explanation&&studyId&&<Link className="study-explanation-link" href={`/study/${studyId}`}>לקטע הלימוד המלא ←</Link>}</article> })}</div><div className="result-actions">{wrong.length > 0 && <Link href="/exams/run?mode=mistakes">תרגול הטעויות שלי</Link>}<button onClick={restart}>מבחן חדש</button><Link href="/exams">חזרה לכל המבחנים</Link></div></section>;
  }

  const currentStudyId=studyIdForExamTopic(current.topic);return <section className="exam-runner"><header><div><small>{title}</small><b>שאלה {index + 1} מתוך {ordered.length}</b></div><span>{Math.round((index / ordered.length) * 100)}%</span></header><div className="exam-progress"><i style={{ width: `${((index + 1) / ordered.length) * 100}%` }} /></div><article className="question-card"><div className="question-meta"><span>שאלה {current.questionNumber}</span><span>{current.topic}</span></div><h1>{current.question}</h1><div className="answer-list">{current.options.map(o => { let state = selected === o.id ? "selected" : ""; if (checked && o.id === current.correctAnswer) state = "correct"; else if (checked && selected === o.id) state = "incorrect"; return <button disabled={checked} className={state} key={o.id} onClick={() => setSelected(o.id)}><b>{o.id}</b><span>{o.text}</span></button> })}</div>{checked && <div className={`answer-feedback ${selected === current.correctAnswer ? "right" : "wrong"}`}>{selected === current.correctAnswer ? CORRECT : WRONG}<p>{current.explanation||"הסבר עדיין לא נוסף"}</p>{current.explanation&&currentStudyId&&<Link href={`/study/${currentStudyId}`}>לקטע הלימוד המלא ←</Link>}</div>}<div className="question-actions dual-actions"><button disabled={!selected || checked} onClick={immediateCheck}>בדיקת תשובה</button><button className="next-unchecked" onClick={next}>שאלה הבאה</button></div></article></section>;
}

export const feedbackMessages = { CORRECT, WRONG, NOTICE };
