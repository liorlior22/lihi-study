import Link from "next/link";
import { ClinicShell } from "./clinic-shell";

export default function Home() {
  return (
    <ClinicShell active="ראשי">
      <section className="clinic-home-hero">
        <div className="clinic-home-copy">
          <span className="clinic-eyebrow">LIHI CLINIC</span>
          <h1>הקליניקה שלי</h1>
          <p>המקום שלך לנהל טיפולים, מטופלים ותורים בצורה שקטה, מסודרת ונעימה.</p>
          <div className="clinic-home-actions">
            <Link href="/patients" className="clinic-primary-link">המטופלים שלי</Link>
            <button type="button" className="clinic-secondary-action">יומן טיפולים</button>
          </div>
        </div>

        <div className="clinic-treatment-visual" aria-label="איור של חדר טיפולים עם מיטת טיפול">
          <svg viewBox="0 0 720 520" role="img" aria-hidden="true">
            <defs>
              <linearGradient id="roomGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f7efe0" />
                <stop offset="100%" stopColor="#e8f0e7" />
              </linearGradient>
              <linearGradient id="bedBlanket" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#76988b" />
                <stop offset="100%" stopColor="#9bb4aa" />
              </linearGradient>
            </defs>

            <rect x="22" y="22" width="676" height="476" rx="42" fill="url(#roomGlow)" />
            <circle cx="584" cy="108" r="52" fill="#fff9eb" opacity=".9" />
            <path d="M548 108h72M584 72v72" stroke="#ead7ac" strokeWidth="4" strokeLinecap="round" opacity=".7" />
            <ellipse cx="356" cy="430" rx="242" ry="35" fill="#d9ded5" opacity=".7" />
            <rect x="172" y="298" width="374" height="92" rx="30" fill="#fffdfa" stroke="#d9dfd6" strokeWidth="5" />
            <rect x="194" y="315" width="110" height="54" rx="24" fill="#eee5d4" />
            <path d="M307 312h219c13 0 23 10 23 23v42H307z" fill="url(#bedBlanket)" />
            <path d="M210 389v46M510 389v46" stroke="#6c756f" strokeWidth="10" strokeLinecap="round" />
            <path d="M184 435h54M482 435h54" stroke="#6c756f" strokeWidth="10" strokeLinecap="round" />
            <path d="M132 311v112" stroke="#876f55" strokeWidth="8" strokeLinecap="round" />
            <path d="M102 316h62l-18-59h-26z" fill="#e6c991" />
            <circle cx="133" cy="249" r="8" fill="#d8b66f" />
            <rect x="568" y="323" width="69" height="79" rx="9" fill="#b68a61" />
            <rect x="562" y="315" width="82" height="12" rx="6" fill="#8e6848" />
            <path d="M602 315c-3-35 5-65 24-88M601 315c-20-29-22-55-8-78M603 315c15-24 35-41 60-49" stroke="#5e806f" strokeWidth="7" strokeLinecap="round" />
            <ellipse cx="631" cy="225" rx="26" ry="13" transform="rotate(-38 631 225)" fill="#789b86" />
            <ellipse cx="588" cy="235" rx="23" ry="12" transform="rotate(34 588 235)" fill="#89a996" />
            <ellipse cx="661" cy="266" rx="24" ry="12" transform="rotate(-18 661 266)" fill="#6f927d" />
            <path d="M82 125c32-33 73-50 122-50" stroke="#b9cbbf" strokeWidth="5" strokeLinecap="round" opacity=".75" />
            <circle cx="82" cy="125" r="7" fill="#8dac9b" />
            <circle cx="204" cy="75" r="7" fill="#8dac9b" />
          </svg>
        </div>
      </section>
    </ClinicShell>
  );
}
