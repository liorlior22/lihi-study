import data from "../../data/content.json";
import { RedHeader } from "../../components/red-header";
import { Icon } from "../../components/icons";

const summary = [
  ["78%", "התקדמות כוללת", "+8% החודש"],
  ["24.5", "שעות למידה", "+3.2 השבוע"],
  ["386", "שאלות שנפתרו", "84% דיוק"],
  ["12", "רצף ימים", "שיא אישי: 18"],
];

export default function Progress() {
  return <><RedHeader/><main className="progress-professional">
    <header><span>מעקב אישי</span><h1>ההתקדמות שלי</h1><p>תמונה ברורה של קצב הלמידה, הדיוק והנושאים שכדאי לחזק.</p></header>
    <section className="progress-summary">{summary.map(item=><article key={item[1]}><small>{item[1]}</small><b>{item[0]}</b><span>{item[2]}</span></article>)}</section>
    <div className="progress-columns">
      <section className="progress-panel"><h2>זמן למידה השבוע</h2><p>סה״כ 6 שעות ו־19 דקות</p><div className="progress-chart">{data.weekly.map(day=><div key={day.day}><b>{day.minutes}</b><i style={{height:`${day.minutes*2}px`}}/><span>{day.day}</span></div>)}</div></section>
      <section className="progress-panel"><h2>התקדמות לפי נושא</h2><div className="topic-progress">{data.topics.map(topic=><article key={topic.id}><div><b>{topic.title}</b><span>{topic.progress}%</span></div><i><b style={{width:`${topic.progress}%`}}/></i></article>)}</div></section>
    </div>
    <section className="progress-panel insights"><h2>תובנות עבורך</h2><div><article><Icon name="trophy"/><b>הישג חדש</b><p>פתרת 100 שאלות החודש.</p></article><article><Icon name="target"/><b>כדאי לחזק</b><p>מומלץ לחזור על מערכת הנשימה.</p></article><article><Icon name="flame"/><b>זמן הלמידה החזק שלך</b><p>הביצועים הטובים ביותר הם בערב.</p></article></div></section>
  </main></>;
}
