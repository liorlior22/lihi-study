import Link from "next/link";
import { RedHeader } from "../../components/red-header";
import { ExamCard } from "../../components/exam-card";
import { allQuestions, associationQuestions, improvisedQuestions, questionsByYear } from "../../lib/exams";

const years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2024];
const associationExams = [
  ["foundations", "יסודות הרפואה הסינית"],
  ["western", "רפואה מערבית"],
  ["acupuncture", "דיקור"],
  ["point-location", "איתור נקודות"],
  ["herbs", "צמחי מרפא"],
] as const;

export default function Exams() {
  return <><RedHeader/><main className="exams-page">
    <div className="section-heading"><span>הכנה ממוקדת לבחינה</span><h1>מבחנים ותרגול</h1><p>תרגול המבוסס רק על שאלות ותשובות שאומתו מתוך חומרי המקור.</p></div>
    <section className="smart-exams"><Link href="/exams/run?mode=random"><b>מבחן מעורב אקראי</b><span>{allQuestions.length} שאלות מאומתות ברפואה מערבית</span></Link></section>
    <h2 className="exam-list-title">מבחני האיגוד — שאלות הדוגמה הרשמיות</h2>
    <section className="exam-year-grid association-exam-grid">{associationExams.map(([key, title]) => <article className="exam-select-card association-exam-card" key={key}>
      <div className="exam-year">איגוד</div><h2>מבחן האיגוד — {title}</h2><p>{associationQuestions[key].length} שאלות עם תשובות מאומתות מהמפרט הרשמי</p>
      <div className="exam-card-actions"><Link href={`/exams/run?mode=association&value=${key}`}>התחלת מבחן</Link><a href="https://www.tcmisrael.org/wp-content/uploads/2025/06/%D7%9E%D7%A4%D7%A8%D7%98-%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%90%D7%97%D7%A8%D7%95%D7%9F-2022-15.9.pdf" target="_blank" rel="noreferrer">צפייה במפרט</a></div>
    </article>)}</section>
    <h2 className="exam-list-title">מבחנים מערביים מאולתרים</h2>
    <section className="exam-year-grid improvised-exam-grid"><article className="exam-select-card association-exam-card">
      <div className="exam-year">1</div><h2>מבחן מערבי מאולתר 1</h2><p>{improvisedQuestions["western-1"].length} שאלות מסודרות עם תשובות והסברים</p>
      <div className="exam-card-actions"><Link href="/exams/run?mode=improvised&value=western-1">התחלת מבחן</Link><a href="https://www.quizme.co.il/quiz-discussion/7566" target="_blank" rel="noreferrer">צפייה במקור</a></div>
    </article></section>
    <h2 className="exam-list-title annual-exams-title">מבחני רפואה מערבית לפי שנה</h2>
    <section className="exam-year-grid">{years.map(year => { const count = questionsByYear[year]?.length ?? 0; return <ExamCard key={year} year={year} count={count} available={count === 30}/>; })}</section>
  </main></>;
}
