import Link from "next/link";
import { RedHeader } from "../../components/red-header";
import { ExamCard } from "../../components/exam-card";
import { allQuestions, questionsByYear } from "../../lib/exams";
const years=[2013,2014,2015,2016,2017,2018,2019,2024];
export default function Exams(){return <><RedHeader/><main className="exams-page"><div className="section-heading"><span>הכנה ממוקדת לבחינה</span><h1>מבחנים ותרגול</h1><p>תרגול המבוסס רק על שאלות ותשובות שאומתו מתוך חומרי המקור.</p></div><section className="smart-exams"><Link href="/exams/run?mode=random"><b>מבחן מעורב אקראי</b><span>{allQuestions.length} שאלות מאומתות</span></Link></section><h2 className="exam-list-title">מבחנים לפי שנה</h2><section className="exam-year-grid">{years.map(year=>{const count=questionsByYear[year]?.length??0;return <ExamCard key={year} year={year} count={count} available={count===30}/>})}</section></main></>}
