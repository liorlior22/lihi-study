"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [["/", "דף הבית"], ["/exams", "מבחנים"], ["/study", "קטעי לימוד וסיכומים"], ["/about", "אודות ליהי"]];

export function RedHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="red-header">
    <div className="red-nav-wrap">
      <Link href="/" className="header-home" aria-label="דף הבית">
        <svg viewBox="0 0 24 24"><path d="M3 11.5 12 3l9 8.5v9a.5.5 0 0 1-.5.5H15v-6H9v6H3.5a.5.5 0 0 1-.5-.5z"/></svg>
      </Link>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="פתיחת תפריט"><span/><span/><span/></button>
      <nav className={open ? "open" : ""}>{links.map(([href, label]) => <Link onClick={() => setOpen(false)} key={href} href={href} className={pathname === href ? "active" : ""}>{label}</Link>)}</nav>
      <Link href="/" className="club-logo"><Image src="/assets/hapoel-tel-aviv.png" alt="סמל הפועל תל אביב" width={112} height={112} priority /></Link>
    </div>
  </header>
}

export function RedPage({title, subtitle, children}:{title:string;subtitle:string;children:React.ReactNode}) {
  return <><RedHeader/><main className="inner-page"><div className="mini-stars">★ <b>★</b> ★</div><h1>{title}</h1><p>{subtitle}</p><div className="placeholder-grid">{children}</div></main></>
}
