"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./icons";

const nav=[
  ["/","ראשי","home"],["/topics","נושאי לימוד","topics"],["/flashcards","כרטיסיות","cards"],
  ["/practice","תרגול שאלות","practice"],["/exams","מבחני סימולציה","exam"],["/progress","ההתקדמות שלי","progress"],["/tutor","העוזר החכם","ai"]
];
export function Shell({children}:{children:React.ReactNode}){
 const path=usePathname(); const [open,setOpen]=useState(false);
 return <div className="min-h-screen md:grid md:grid-cols-[250px_1fr]">
  {open&&<button aria-label="סגירת תפריט" className="fixed inset-0 z-30 bg-[#0d2d23]/35 md:hidden" onClick={()=>setOpen(false)}/>} 
  <aside className={`fixed right-0 top-0 z-40 flex h-full w-[270px] flex-col border-l border-[#dce9e3] bg-white px-4 py-6 transition-transform md:sticky md:w-auto md:translate-x-0 ${open?"translate-x-0":"translate-x-full"}`}>
   <div className="mb-8 flex items-center justify-between px-2"><Link href="/" className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#176c51] text-xl font-black text-white shadow-lg shadow-emerald-900/15">L</span><span><b className="block text-[21px] leading-5 text-[#123d31]">LIHI STUDY</b><small className="text-[#769087]">לומדים חכם. מצליחים.</small></span></Link><button className="md:hidden" onClick={()=>setOpen(false)}><Icon name="close"/></button></div>
   <nav className="space-y-1">{nav.map(([href,label,icon])=>{const active=path===href;return <Link onClick={()=>setOpen(false)} key={href} href={href} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold transition ${active?"bg-[#eaf6f0] text-[#176c51]":"text-[#526761] hover:bg-[#f4f8f6] hover:text-[#173f33]"}`}><Icon name={icon} size={19}/>{label}{active&&<span className="mr-auto h-1.5 w-1.5 rounded-full bg-[#20805f]"/>}</Link>})}</nav>
   <div className="mt-auto rounded-2xl bg-[#123f33] p-4 text-white"><div className="mb-2 flex items-center gap-2 text-sm font-bold"><Icon name="spark" size={17} className="text-[#95e0bd]"/>טיפ יומי</div><p className="text-xs leading-5 text-[#d7e9e1]">למידה של 25 דקות ברצף יעילה יותר משעה עם הסחות דעת.</p></div>
  </aside>
  <section className="min-w-0">
   <header className="sticky top-0 z-20 flex h-[72px] items-center gap-3 border-b border-[#e4ebe7]/90 bg-white/85 px-4 backdrop-blur-xl sm:px-7"><button aria-label="פתיחת תפריט" className="grid h-10 w-10 place-items-center rounded-xl border border-[#e2e9e6] md:hidden" onClick={()=>setOpen(true)}><Icon name="menu"/></button><div className="relative hidden max-w-md flex-1 sm:block"><Icon name="search" size={18} className="absolute right-3.5 top-3 text-[#82938d]"/><input aria-label="חיפוש" placeholder="מה תרצי ללמוד היום?" className="h-11 w-full rounded-xl border border-[#e2e9e6] bg-[#f8faf9] pr-11 pl-4 text-sm outline-none focus:border-[#76b69e]"/></div><div className="mr-auto flex items-center gap-3"><button aria-label="התראות" className="relative grid h-10 w-10 place-items-center rounded-xl border border-[#e2e9e6] bg-white"><Icon name="bell" size={19}/><i className="absolute left-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#e78458]"/></button><div className="h-8 w-px bg-[#e7ece9]"/><div className="flex items-center gap-2"><span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#dbf2e7] to-[#a8d8c3] font-bold text-[#15543f]">ל</span><span className="hidden text-sm sm:block"><b className="block">ליהי</b><small className="text-[#71847d]">תלמידה</small></span></div></div></header>
   <main className="mx-auto max-w-[1380px] p-4 sm:p-7 lg:p-9">{children}</main>
  </section>
 </div>
}
