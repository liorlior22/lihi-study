"use client";

type SectionLink={label:string;targetId:string};

export function StudySectionNav({sections,repeated}:{sections:SectionLink[];repeated:string[]}){
  function jumpToSection(event:React.MouseEvent<HTMLAnchorElement>,targetId:string){
    event.preventDefault();
    const target=document.getElementById(targetId);
    if(!target)return;
    if(window.matchMedia("(max-width: 760px)").matches)event.currentTarget.closest("details")?.removeAttribute("open");
    window.history.pushState(null,"",`#${targetId}`);
    requestAnimationFrame(()=>requestAnimationFrame(()=>target.scrollIntoView({behavior:"smooth",block:"start"})));
  }
  return <details open><summary>ניווט בפרק</summary><div><h2>תוכן הפרק</h2>{sections.map(section=><a href={`#${section.targetId}`} onClick={event=>jumpToSection(event,section.targetId)} key={section.label}>{section.label}</a>)}<h2>חוזר במבחנים</h2>{repeated.map(item=><span key={item}>{item}</span>)}</div></details>;
}
