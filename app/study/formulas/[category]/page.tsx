import Link from "next/link";
import {notFound} from "next/navigation";
import {RedHeader} from "../../../../components/red-header";
import {formulaCategories,formulaCategory} from "../../../../lib/formulas";
export function generateStaticParams(){return formulaCategories.map(category=>({category:category.id}))}
export default async function FormulaCategoryPage({params}:{params:Promise<{category:string}>}){const{category:id}=await params;const category=formulaCategory(id);if(!category)notFound();return <><RedHeader/><main className="study-library"><header><span>קטגוריית פורמולות</span><h1>{category.title}</h1><p>{category.summary}</p></header><nav className="study-breadcrumbs"><Link href="/study/formulas">← כל קטגוריות הפורמולות</Link><span>עמודי PDF {category.pages}</span></nav><section className="study-topic-grid">{category.subtopics.map((subtopic,i)=><Link href={`/study/formulas/${category.id}/${subtopic.id}`} key={subtopic.id}><span>{String(i+1).padStart(2,"0")}</span><h2>{subtopic.title}</h2><p>חומר המקור המלא מתוך הספר, ללא קיצור או שינוי.</p><small>עמודים {subtopic.pages}</small><b>לפתיחת תת־הפרק ←</b></Link>)}</section></main></>}
