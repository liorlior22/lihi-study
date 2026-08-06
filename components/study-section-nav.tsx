"use client";

import { useEffect } from "react";

type SectionLink={label:string;targetId:string};

const RETRY_DELAYS=[80,240,600];

function alignTarget(targetId:string,behavior:ScrollBehavior="auto"){
  const target=document.getElementById(targetId);
  if(!target)return;
  const header=document.querySelector<HTMLElement>(".professional-header");
  const offset=(header?.getBoundingClientRect().height??0)+16;
  const top=window.scrollY+target.getBoundingClientRect().top-offset;
  window.scrollTo({top:Math.max(0,top),behavior});
}

function keepTargetAligned(targetId:string){
  alignTarget(targetId,"smooth");
  const timers=RETRY_DELAYS.map(delay=>window.setTimeout(()=>alignTarget(targetId),delay));
  const image=document.getElementById(targetId)?.querySelector("img");
  if(image&&!image.complete){
    image.addEventListener("load",()=>alignTarget(targetId),{once:true});
  }else if(image){
    image.decode?.().then(()=>alignTarget(targetId)).catch(()=>{});
  }
  return()=>timers.forEach(timer=>window.clearTimeout(timer));
}

export function StudySectionNav({sections,repeated}:{sections:SectionLink[];repeated:string[]}){
  useEffect(()=>{
    const targetId=decodeURIComponent(window.location.hash.slice(1));
    if(!targetId)return;
    return keepTargetAligned(targetId);
  },[]);

  function jumpToSection(event:React.MouseEvent<HTMLAnchorElement>,targetId:string){
    event.preventDefault();
    if(!document.getElementById(targetId))return;
    if(window.matchMedia("(max-width: 760px)").matches)event.currentTarget.closest("details")?.removeAttribute("open");
    window.history.replaceState(null,"",`#${targetId}`);
    keepTargetAligned(targetId);
  }
  return <details open><summary>ניווט בפרק</summary><div><h2>תוכן הפרק</h2>{sections.map(section=><a href={`#${section.targetId}`} onClick={event=>jumpToSection(event,section.targetId)} key={section.targetId}>{section.label}</a>)}<h2>חוזר במבחנים</h2>{repeated.map(item=><span key={item}>{item}</span>)}</div></details>;
}
