"use client";

import Link from "next/link";
import { useState } from "react";
import { associationQuestions, improvisedQuestions, mixedQuestions, questionsByYear, generatedQuestions } from "../lib/exams";
import { ExamCard } from "./exam-card";
import { sourceExamQuestions } from "../lib/source-exams";

const years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2024];
const sourceYears = [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];
const specificationUrl = "https://www.tcmisrael.org/wp-content/uploads/2025/06/%D7%9E%D7%A4%D7%A8%D7%98-%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%90%D7%97%D7%A8%D7%95%D7%9F-2022-15.9.pdf";
const topics = [
  { key: "foundations", number: "01", title: "יסודות הרפואה הסינית", description: "מבחני יסודות לפי שנה" },
  { key: "western", number: "02", title: "רפואה מערבית", description: "מבחנים מלאים ומאולתרים" },
  { key: "acupuncture", number: "03", title: "דיקור", description: "מבחני דיקור לפי שנה" },
  { key: "point-location", number: "04", title: "איתור נקודות", description: "מבחנים ותרשימי גוף" },
  { key: "herbs", number: "05", title: "צמחי מרפא", description: "מבחן צמחי המרפא" },
] as const;
type TopicKey = typeof topics[number]["key"];

function MixedExamCard({ examKey, title }: { examKey: TopicKey; title: string }) {
  const count = mixedQuestions[examKey]?.length ?? 0;
  return <article className="exam-select-card association-exam-card mixed-exam-card">
    <div className="exam-year">הכול</div><h2>מבחן מעורב — {title}</h2><p>{count} שאלות ייחודיות מכל שנות המבחנים, ללא כפילויות</p>
    <div className="exam-card-actions"><Link href={`/exams/run?mode=mixed&value=${examKey}`}>התחלת מבחן מעורב</Link></div>
  </article>;
}

function AssociationCard({ examKey, title }: { examKey: TopicKey; title: string }) {
  return <article className="exam-select-card association-exam-card">
    <div className="exam-year">איגוד</div><h2>מבחן האיגוד — {title}</h2><p>{associationQuestions[examKey].length} שאלות עם תשובות מאומתות מהמפרט הרשמי</p>
    <div className="exam-card-actions"><Link href={`/exams/run?mode=association&value=${examKey}`}>התחלת מבחן</Link><a href={specificationUrl} target="_blank" rel="noreferrer">צפייה במפרט</a></div>
  </article>;
}

function SourceExams({ examKey, title }: { examKey: "foundations" | "acupuncture" | "point-location" | "herbs"; title: string }) {
  return <div className="exam-year-grid source-exam-grid">{sourceYears.map(year => { const key = `${examKey}-${year}`; const questions = sourceExamQuestions[key] ?? []; return <article className="exam-select-card source-exam-card" key={key}>
    <div className="exam-year">{year}</div><h2>{title}</h2><p>מבחן האיגוד {year} • מבחן מקורי ותשובון</p>
    <div className="exam-card-actions">{questions.length > 0 ? <Link href={`/exams/run?mode=source&value=${key}`}>התחלת מבחן ({questions.length})</Link> : <a href={`/exams-pdf/${examKey}-${year}.pdf`} target="_blank">צפייה במקור</a>}<a href={`/exams-pdf/${examKey}-${year}-answers.pdf`} target="_blank">צפייה בתשובון</a></div>
  </article>})}</div>;
}

export function ExamCatalog() {
  const [selected, setSelected] = useState<TopicKey>("western");
  const topic = topics.find(item => item.key === selected)!;

  return <section className="exam-catalog">
    <div className="exam-topic-cards" role="tablist" aria-label="בחירת נושא מבחנים">{topics.map(item => <button type="button" role="tab" aria-selected={selected === item.key} className={selected === item.key ? "active" : ""} onClick={() => setSelected(item.key)} key={item.key}>
      <span>{item.number}</span><b>{item.title}</b><small>{item.description}</small>
    </button>)}</div>

    <div className="exam-topic-panel" role="tabpanel">
      <header><span>נושא {topic.number}</span><h2>{topic.title}</h2></header>
      {selected === "foundations" && <><div className="exam-year-grid featured-topic-exams"><MixedExamCard examKey="foundations" title="יסודות הרפואה הסינית"/><AssociationCard examKey="foundations" title="יסודות הרפואה הסינית"/></div><SourceExams examKey="foundations" title="יסודות הרפואה הסינית"/></>}
      {selected === "western" && <><div className="exam-year-grid featured-topic-exams"><MixedExamCard examKey="western" title="רפואה מערבית"/><AssociationCard examKey="western" title="רפואה מערבית"/><article className="exam-select-card association-exam-card">
        <div className="exam-year">1</div><h2>מבחן מערבי מאולתר 1</h2><p>{improvisedQuestions["western-1"].length} שאלות מסודרות עם תשובות והסברים</p>
        <div className="exam-card-actions"><Link href="/exams/run?mode=improvised&value=western-1">התחלת מבחן</Link><a href="https://www.quizme.co.il/quiz-discussion/7566" target="_blank" rel="noreferrer">צפייה במקור</a></div>
      </article><article className="exam-select-card association-exam-card">
        <div className="exam-year">צ׳אט</div><h2>גיליון שאלות שהצ׳אט המציא</h2><p>{generatedQuestions["western-chat-100"].length} שאלות חדשות לתרגול נוסף ברפואה מערבית, עם תשובות והסברים</p>
        <div className="exam-card-actions"><Link href="/exams/run?mode=generated&value=western-chat-100">התחלת תרגול</Link></div>
      </article></div><div className="exam-year-grid"><article className="exam-select-card source-exam-card">
        <div className="exam-year">2012</div><h2>רפואה מערבית</h2><p>30 שאלות מאומתות • זמין</p>
        <div className="exam-card-actions"><Link href="/exams/run?mode=source&value=western-2012">התחלת מבחן</Link><a href="/exams-pdf/western-2012-answers.pdf" target="_blank">צפייה בתשובון</a></div>
      </article>{years.map(year => { const count = questionsByYear[year]?.length ?? 0; return <ExamCard key={year} year={year} count={count} available={count === 30}/>; })}</div></>}
      {selected === "acupuncture" && <><div className="exam-year-grid featured-topic-exams"><MixedExamCard examKey="acupuncture" title="דיקור"/><AssociationCard examKey="acupuncture" title="דיקור"/></div><SourceExams examKey="acupuncture" title="דיקור"/></>}
      {selected === "point-location" && <><div className="exam-year-grid featured-topic-exams"><MixedExamCard examKey="point-location" title="איתור נקודות"/><AssociationCard examKey="point-location" title="איתור נקודות"/></div><SourceExams examKey="point-location" title="איתור נקודות"/></>}
      {selected === "herbs" && <><div className="exam-year-grid featured-topic-exams"><MixedExamCard examKey="herbs" title="צמחי מרפא"/><AssociationCard examKey="herbs" title="צמחי מרפא"/></div><SourceExams examKey="herbs" title="צמחי מרפא"/></>}
    </div>
  </section>;
}
