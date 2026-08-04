import Link from"next/link";import{RedHeader}from"../components/red-header";import{MotivationQuoteCard}from"../components/motivation-quote-card";
const cards=[
 {href:"/study",icon:"📚",title:"קטעי לימוד",text:"כל חומר הלימוד מסודר לפי נושאים"},
 {href:"/exams",icon:"📝",title:"מבחנים",text:"בחינות, תרגול ותוצאות"},
 {href:"/flashcards",icon:"🃏",title:"כרטיסיות",text:"שינון ממוקד בקצב שלך"},
 {href:"/progress",icon:"📈",title:"ההתקדמות שלי",text:"ציונים, זמן למידה ומגמות"},
 {href:"/exams/run?mode=mistakes",icon:"❌",title:"טעויות אחרונות",text:"חזרה על שאלות שדורשות חיזוק"},
 {href:"/progress",icon:"🏆",title:"מבחן אחרון",text:"צפייה בתוצאה ובפירוט האחרון"}
];
export default function Home(){return <><RedHeader/><main className="dashboard-page"><section className="dashboard-welcome"><div><span>מרכז הלמידה שלך</span><h1>ברוכה הבאה ליהי ❤️</h1><p>עוד צעד אחד בדרך להסמכה.</p></div><Link href="/exams">המשך למבחנים ←</Link></section><section className="dashboard-grid">{cards.map(card=><Link href={card.href} key={card.title}><span>{card.icon}</span><div><h2>{card.title}</h2><p>{card.text}</p></div><i>←</i></Link>)}</section><MotivationQuoteCard/></main></>}
