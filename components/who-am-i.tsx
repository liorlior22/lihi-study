"use client";

import { useMemo, useState } from "react";
import { cleanExamText } from "../lib/exam-text";
import { buildWhoAmIGame, whoAmIHerbQuestions, whoAmILocationQuestions, type WhoAmIQuestion } from "../lib/who-am-i";

function MysteryIcon() {
  return <svg aria-hidden="true" viewBox="0 0 120 120" className="h-24 w-24 drop-shadow-[0_12px_24px_rgba(176,20,31,0.18)]"><defs><linearGradient id="whoamiGradient" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#b8141f"/><stop offset="100%" stopColor="#156c50"/></linearGradient></defs><circle cx="60" cy="60" r="56" fill="#fff" stroke="url(#whoamiGradient)" strokeWidth="8"/><path d="M37 69c7-17 18-28 33-34" fill="none" stroke="#156c50" strokeLinecap="round" strokeWidth="8"/><path d="M68 28c10 2 18 9 22 19" fill="none" stroke="#7dc5a7" strokeLinecap="round" strokeWidth="8"/><path d="M30 79c8-3 15-2 24 3" fill="none" stroke="#b8141f" strokeLinecap="round" strokeWidth="8"/><circle cx="86" cy="77" r="16" fill="#fff2f3" stroke="#b8141f" strokeWidth="5"/><path d="M84 71c0-3 2-5 5-5 3 0 5 2 5 5 0 3-2 4-4 6-1 1-2 2-2 4" fill="none" stroke="#b8141f" strokeLinecap="round" strokeWidth="4"/><circle cx="88" cy="85" r="2.8" fill="#b8141f"/></svg>;
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-2xl border border-[#eadfe0] bg-white px-4 py-3 text-center shadow-sm"><small className="block text-xs font-bold text-[#7b696c]">{label}</small><b className="mt-1 block text-xl text-[#123f33]">{value}</b></div>;
}

export function WhoAmIGame() {
  const initialGame = useMemo(() => buildWhoAmIGame(), []);
  const [game, setGame] = useState<WhoAmIQuestion[]>(initialGame);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = game[index] ?? null;
  const answered = selected !== null;
  const correctOption = current?.options.find((option) => option.id === current.correctAnswer) ?? null;
  const selectedCorrect = answered && selected === current?.correctAnswer;

  function startNewGame() {
    setGame(buildWhoAmIGame());
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setStarted(true);
  }

  function choose(answerId: string) {
    if (!current || answered) return;
    setSelected(answerId);
    if (answerId === current.correctAnswer) {
      setScore((value) => value + 1);
    }
  }

  function nextQuestion() {
    if (!current) return;
    if (index + 1 >= game.length) {
      setFinished(true);
      setSelected(null);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  }

  return <section className="mx-auto w-full max-w-5xl space-y-5" dir="rtl">
    <article className="overflow-hidden rounded-[28px] border border-[#ecdfe1] bg-gradient-to-br from-[#fff7f7] via-white to-[#f1fbf7] p-6 shadow-[0_18px_50px_rgba(18,63,51,0.08)] sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="flex justify-center lg:justify-start"><div className="rounded-[30px] bg-white/90 p-4 shadow-[0_15px_40px_rgba(184,20,31,0.12)]"><MysteryIcon/></div></div>
        <div>
          <span className="inline-flex rounded-full bg-[#b8141f]/10 px-4 py-2 text-sm font-black text-[#a40f19]">משחק חדש • בלי לידרבורד</span>
          <h1 className="mt-3 text-3xl font-black text-[#123f33] sm:text-4xl">מי אני?</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#365247] sm:text-lg">משחק תרגול אחד שמשלב שני עולמות: <strong>מי אני?</strong> בצמחי מרפא ו־<strong>איפה אני?</strong> באיתור נקודות. בשאלות האיתור תקבלי תיאור מיקום אנטומי ותצטרכי לזהות את הנקודה הנכונה.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Stat label="שאלות צמחים" value={whoAmIHerbQuestions.length} />
            <Stat label="שאלות איתור" value={whoAmILocationQuestions.length} />
            <Stat label="סה״כ במשחק" value={game.length} />
          </div>
          {!started && <button type="button" onClick={startNewGame} className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#b8141f] px-6 py-3 text-base font-black text-white shadow-[0_15px_30px_rgba(184,20,31,0.18)] transition hover:-translate-y-0.5 hover:bg-[#a00f19]">התחילי משחק</button>}
        </div>
      </div>
    </article>

    {started && !finished && current && <article className="rounded-[26px] border border-[#eadfe0] bg-white p-5 shadow-[0_15px_40px_rgba(18,63,51,0.07)] sm:p-7">
      <header className="flex flex-col gap-4 border-b border-[#f0e7e8] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-black ${current.mode === "herb" ? "bg-[#e8f6ef] text-[#156c50]" : "bg-[#fff0f2] text-[#a40f19]"}`}>{current.badge}</span>
          <h2 className="mt-3 text-2xl font-black text-[#123f33]">{current.title}</h2>
          <p className="mt-2 text-sm leading-6 text-[#5e7370]">{current.hint}</p>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:min-w-[260px]">
          <Stat label="ניקוד" value={score} />
          <Stat label="שאלה" value={`${index + 1}/${game.length}`} />
          <Stat label="נותרו" value={game.length - index - 1} />
        </div>
      </header>

      <div className="mt-6 rounded-3xl bg-[#f8fbfa] p-5 text-right shadow-inner shadow-[#eef4f1]">
        <p className="text-lg font-bold leading-8 text-[#123f33]">{cleanExamText(current.clue)}</p>
      </div>

      <div className="mt-6 grid gap-3">
        {current.options.map((option) => {
          const isSelected = selected === option.id;
          const isCorrect = answered && option.id === current.correctAnswer;
          const isWrongSelected = answered && isSelected && option.id !== current.correctAnswer;
          const classes = isCorrect
            ? "border-[#1f8a64] bg-[#ebfaf2] text-[#14553f]"
            : isWrongSelected
              ? "border-[#cb3a45] bg-[#fff2f3] text-[#8b1720]"
              : isSelected
                ? "border-[#d3d9d6] bg-[#f4f7f6]"
                : "border-[#e5e7e6] bg-white hover:border-[#b8141f] hover:bg-[#fff8f8]";
          return <button type="button" key={option.id} disabled={answered} onClick={() => choose(option.id)} className={`flex min-h-14 items-center gap-4 rounded-2xl border px-4 py-3 text-right text-base font-semibold transition ${classes}`}><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f7e9ea] text-sm font-black text-[#a40f19]">{option.id}</span><span>{cleanExamText(option.text)}</span></button>;
        })}
      </div>

      {answered && current && <div className="mt-6 rounded-3xl border border-[#ecdfe1] bg-[#fffdfd] p-5">
        <p className={`text-lg font-black ${selectedCorrect ? "text-[#156c50]" : "text-[#a40f19]"}`}>{selectedCorrect ? "תשובה נכונה — יפה מאוד." : "לא נכון, אבל בדיוק בשביל זה מתרגלים."}</p>
        <p className="mt-3 text-base leading-7 text-[#233b33]"><strong>התשובה הנכונה:</strong> {correctOption ? cleanExamText(correctOption.text) : "—"}</p>
        <p className="mt-3 text-base leading-7 text-[#405851]"><strong>הסבר:</strong> {cleanExamText(current.explanation)}</p>
        <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={nextQuestion} className="min-h-12 rounded-2xl bg-[#123f33] px-5 py-3 font-black text-white">{index + 1 >= game.length ? "סיום המשחק" : "לשאלה הבאה"}</button><button type="button" onClick={startNewGame} className="min-h-12 rounded-2xl border border-[#d5ddda] bg-white px-5 py-3 font-black text-[#123f33]">ערבוב חדש מהתחלה</button></div>
      </div>}
    </article>}

    {started && finished && <article className="rounded-[26px] border border-[#eadfe0] bg-white p-6 text-center shadow-[0_15px_40px_rgba(18,63,51,0.07)] sm:p-8">
      <span className="inline-flex rounded-full bg-[#e8f6ef] px-4 py-2 text-sm font-black text-[#156c50]">סיימת את המשחק</span>
      <h2 className="mt-4 text-3xl font-black text-[#123f33]">כל הכבוד!</h2>
      <p className="mt-3 text-lg leading-7 text-[#425a52]">סיימת {game.length} שאלות מעורבות של צמחים ואיתור נקודות.</p>
      <div className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-3">
        <Stat label="ניקוד סופי" value={score} />
        <Stat label="סה״כ שאלות" value={game.length} />
        <Stat label="אחוז הצלחה" value={`${Math.round((score / Math.max(game.length, 1)) * 100)}%`} />
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-3"><button type="button" onClick={startNewGame} className="min-h-12 rounded-2xl bg-[#b8141f] px-6 py-3 font-black text-white">משחק חדש</button><button type="button" onClick={() => { setStarted(false); setFinished(false); setSelected(null); }} className="min-h-12 rounded-2xl border border-[#d5ddda] bg-white px-6 py-3 font-black text-[#123f33]">חזרה למסך הפתיחה</button></div>
    </article>}
  </section>;
}
