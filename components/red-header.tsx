"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  ["/", "דף הבית"],
  ["/exams", "מבחנים"],
  ["/study", "קטעי לימוד וסיכומים"],
  ["/leaderboard", "מצטיין כיתתי"],
];

export function RedHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return <header className="professional-header"><div className="professional-nav">
    <Link href="/" className="minimal-home" aria-label="דף הבית"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 12 4l8 7.5V20h-5v-5H9v5H4z"/></svg></Link>
    <nav id="main-navigation" aria-label="ניווט ראשי" className={open ? "open" : ""}>{links.map(([href, label]) => <Link onClick={() => setOpen(false)} key={href} href={href} className={pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)) ? "active" : ""}>{label}</Link>)}</nav>
    <button type="button" className="professional-menu" onClick={() => setOpen(!open)} aria-label={open ? "סגירת תפריט" : "פתיחת תפריט"} aria-expanded={open} aria-controls="main-navigation"><span/><span/><span/></button>
  </div></header>;
}

export function RedPage({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return <><RedHeader/><main className="inner-page"><h1>{title}</h1><p>{subtitle}</p><div className="placeholder-grid">{children}</div></main></>;
}
