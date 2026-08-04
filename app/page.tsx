import Image from"next/image";import Link from"next/link";import{RedHeader}from"../components/red-header";import{MotivationQuoteCard}from"../components/motivation-quote-card";
const cards=[
 {href:"/study",icon:"📚",title:"קטעי לימוד",text:"כל חומר הלימוד מסודר לפי נושאים"},
 {href:"/exams",icon:"📝",title:"מבחנים",text:"בחינות, תרגול ותוצאות"},
 {href:"/flashcards",icon:"🃏",title:"כרטיסיות",text:"שינון ממוקד בקצב שלך"},
 {href:"/progress",icon:"📈",title:"ההתקדמות שלי",text:"ציונים, זמן למידה ומגמות"},
 {href:"/exams/run?mode=mistakes",icon:"❌",title:"טעויות אחרונות",text:"חזרה על שאלות שדורשות חיזוק"},
 {href:"/progress",icon:"🏆",title:"מבחן אחרון",text:"צפייה בתוצאה ובפירוט האחרון"}
];
export default function Home(){return <><RedHeader/><main className="dashboard-page"><section className="dashboard-welcome"><div><span>מרכז הלמידה שלך</span><h1>ברוכה הבאה ליהי ❤️</h1><p>עוד צעד אחד בדרך להסמכה.</p></div><Link href="/exams">המשך למבחנים ←</Link></section><section className="dashboard-grid">{cards.map(card=><Link href={card.href} key={card.title}><span>{card.icon}</span><div><h2>{card.title}</h2><p>{card.text}</p></div><i>←</i></Link>)}</section><MotivationQuoteCard/><section className="family-gallery" aria-label="התמונות של ליהי"><article><Image src="/assets/china-white-stars.svg" alt="דגל סין עם כוכבים לבנים" fill sizes="(max-width: 760px) 100vw, 33vw"/></article><article className="family-club"><Image src="/assets/hapoel-tel-aviv.png" alt="סמל הפועל תל אביב" fill sizes="(max-width: 760px) 100vw, 33vw"/></article><article><Image src="/assets/lihi-sunglasses.png" alt="דני התינוקת עם משקפי שמש" fill sizes="(max-width: 760px) 100vw, 33vw"/></article></section></main></>}
