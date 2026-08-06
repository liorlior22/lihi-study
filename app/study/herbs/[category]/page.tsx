import Link from "next/link";
import {notFound} from "next/navigation";
import {RedHeader} from "../../../../components/red-header";
import {herbCategories,herbCategory} from "../../../../lib/herbs";
export function generateStaticParams(){return herbCategories.map(category=>({category:category.id}))}
export default async function CategoryPage({params}:{params:Promise<{category:string}>}){const{category:id}=await params;const category=herbCategory(id);if(!category)notFound();return <><RedHeader/><main className="study-library"><header><span>קטגוריית צמחים</span><h1>{category.title}</h1><p>{category.summary}</p></header><nav className="study-breadcrumbs"><Link href="/study/herbs">← כל קטגוריות הצמחים</Link><span>עמודי PDF {category.pages}</span></nav><section className="study-topic-grid">{category.subtopics.map((subtopic,i)=><Link href={`/study/herbs/${category.id}/${subtopic.id}`} key={subtopic.id}><span>{String(i+1).padStart(2,"0")}</span><h2>{subtopic.title}</h2><p>חומר המקור המלא מתוך הספר, ללא קיצור או שינוי.</p><small>עמודים {subtopic.pages}</small><b>לפתיחת תת־הנושא ←</b></Link>)}</section></main></>}
