"use client";

type SectionLink={label:string;targetId:string};

export function StudySectionNav({sections,repeated}:{sections:SectionLink[];repeated:string[]}){
  function alignTarget(target:HTMLElement){
    const header=document.querySelector<HTMLElement>(".professional-header");
    const offset=(header?.getBoundingClientRect().height??0)+16;
    const top=target.getBoundingClientRect().top+window.scrollY-offset;
    window.scrollTo({top,behavior:"smooth"});
  }
  function jumpToSection(event:React.MouseEvent<HTMLAnchorElement>,targetId:string){
    event.preventDefault();
    const target=document.getElementById(targetId);
    if(!target)return;
    if(window.matchMedia("(max-width: 760px)").matches)event.currentTarget.closest("details")?.removeAttribute("open");
    window.history.replaceState(null,"",`#${targetId}`);
    alignTarget(target);
    [250,700,1400].forEach(delay=>window.setTimeout(()=>alignTarget(target),delay));
  }
  return <details open><summary>ניווט בפרק</summary><div><h2>תוכן הפרק</h2>{sections.map(section=><a href={`#${section.targetId}`} onClick={event=>jumpToSection(event,section.targetId)} key={section.targetId}>{section.label}</a>)}<h2>חוזר במבחנים</h2>{repeated.map(item=><span key={item}>{item}</span>)}</div></details>;
}
