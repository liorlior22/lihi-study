import Image from "next/image";
import Link from "next/link";
import { RedHeader } from "../../../components/red-header";
import { sourcePages } from "../../../lib/study";

export default function FullSummary(){
  return <><RedHeader/><main className="digital-textbook full-summary-page">
    <nav><Link href="/study">← חזרה לקטעי לימוד וסיכומים</Link><span>90 עמודים בחומר המקור</span></nav>
    <header><span>הסיכום הגדול</span><h1>כל חומר הלימוד</h1><p>הסיכום המלא לפי סדר העמודים המקורי.</p></header>
    <article className="source-content full-summary-content">{sourcePages.map(page=><figure id={`page-${page.page}`} key={page.page}><figcaption>עמוד {page.page} בחומר המקור</figcaption><Image src={`/study-pages/page-${String(page.page).padStart(3,"0")}.jpg`} alt={`הסיכום הגדול — עמוד ${page.page}`} width={940} height={1329} sizes="(max-width: 760px) 100vw, 900px"/></figure>)}</article>
  </main></>;
}
