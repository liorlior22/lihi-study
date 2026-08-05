import Image from "next/image";
import { RedHeader } from "../components/red-header";
import { MotivationQuoteCard } from "../components/motivation-quote-card";

export default function Home() {
  return <><RedHeader/><main className="dashboard-page">
    <section className="dashboard-hero">
      <h1 dir="ltr">Welcome to Lihi&apos;s Last Test!</h1>
      <MotivationQuoteCard/>
    </section>
    <section className="family-gallery" aria-label="התמונות של ליהי">
      <article><Image src="/assets/china-white-stars.svg" alt="דגל סין עם כוכבים לבנים" fill sizes="(max-width: 760px) 100vw, 33vw"/></article>
      <article className="family-club"><Image src="/assets/hapoel-tel-aviv.png" alt="סמל הפועל תל אביב" fill sizes="(max-width: 760px) 100vw, 33vw"/></article>
      <article><Image src="/assets/lihi-sunglasses.png" alt="דני התינוקת עם משקפי שמש" fill sizes="(max-width: 760px) 100vw, 33vw"/></article>
    </section>
  </main></>;
}
