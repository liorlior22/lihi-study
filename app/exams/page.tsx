import Link from "next/link";
import { RedHeader } from "../../components/red-header";
import { ExamCatalog } from "../../components/exam-catalog";
import { allQuestions } from "../../lib/exams";

export default function Exams() {
  return <><RedHeader/><main className="exams-page">
    <div className="section-heading"><span>הכנה ממוקדת לבחינה</span><h1>מבחנים ותרגול</h1><p>בחרו כרטיסיית נושא וצפו רק במבחנים השייכים אליה.</p></div>
    <section className="smart-exams"><Link href="/exams/run?mode=random"><b>מבחן מעורב אקראי</b><span>{allQuestions.length} שאלות מאומתות ברפואה מערבית</span></Link></section>
    <ExamCatalog/>
  </main></>;
}
