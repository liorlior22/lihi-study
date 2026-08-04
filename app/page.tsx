import Image from "next/image";
import Link from "next/link";
import { RedHeader } from "../components/red-header";

export default function Home() {
  return <><RedHeader/><main className="red-home">
    <section className="red-hero">
      <h1>Welcome to the Lihi Last Test!!!</h1>
      <div className="star-separator"><i/>★ <b>★</b> ★<i/></div>
      <p>הדרך שלך להצליח בבחינת הצמ״ר</p>
      <Link href="/study" className="red-cta"><svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 1 4 17.5zM20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5a2.5 2.5 0 0 1 2.5 2.5z"/></svg>התחל ללמוד</Link>
    </section>
    <section className="image-cards" aria-label="גלריית ליהי">
      <article><Image src="/assets/china-white-stars.svg" alt="דגל סין עם כוכבים לבנים" fill sizes="(max-width: 800px) 92vw, 31vw"/></article>
      <article className="logo-card"><Image src="/assets/hapoel-tel-aviv.png" alt="סמל הפועל תל אביב" fill sizes="(max-width: 800px) 92vw, 31vw"/></article>
      <article><Image src="/assets/lihi-sunglasses.png" alt="ליהי עם משקפי שמש" fill sizes="(max-width: 800px) 92vw, 31vw"/></article>
    </section>
  </main></>
}
