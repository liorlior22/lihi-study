"use client";
import { useState } from "react";
import { motivationQuotes } from "../data/motivation-quotes";
const KEY = "lihi-motivation-quotes";
type Saved = { remaining: number[]; current: number | null };
function shuffled(exclude:number|null){const values=motivationQuotes.map((_,i)=>i);for(let i=values.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[values[i],values[j]]=[values[j],values[i]]}if(exclude!==null&&values[0]===exclude&&values.length>1)[values[0],values[1]]=[values[1],values[0]];return values}
export function MotivationQuoteCard(){const[quote,setQuote]=useState<string|null>(null);const[version,setVersion]=useState(0);function reveal(){let saved:Saved={remaining:[],current:null};try{saved=JSON.parse(localStorage.getItem(KEY)??"null")??saved}catch{}let remaining=saved.remaining.filter(i=>i>=0&&i<motivationQuotes.length&&i!==saved.current);if(!remaining.length)remaining=shuffled(saved.current);const current=remaining.shift()!;localStorage.setItem(KEY,JSON.stringify({remaining,current} satisfies Saved));setQuote(motivationQuotes[current]);setVersion(v=>v+1)}return <button className="motivation-card" onClick={reveal}><span>💪</span><div><b>לחץ כאן בשעה קשה למשפט מוטיבציה</b><small>(כל לחיצה תציג משפט אחר)</small>{quote&&<blockquote key={version}>{quote}</blockquote>}</div><i>←</i></button>}
