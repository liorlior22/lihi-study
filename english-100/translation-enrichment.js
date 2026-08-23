const EN_HE_WIKTIONARY_URL='https://raw.githubusercontent.com/open-dsl-dict/wiktionary-dict/master/src/en-he-enwiktionary.txt';

function stripTranslationMeta(value){
  return (value||'')
    .replace(/\/[^/]*\//g,' ')
    .replace(/\{[^}]*\}/g,' ')
    .replace(/\[[^\]]*\]/g,' ')
    .replace(/\([^)]*\)/g,' ')
    .replace(/\.{2,}/g,' ')
    .replace(/\s+/g,' ')
    .trim();
}

function parseWiktionaryHebrew(text){
  const map=new Map();
  for(const rawLine of text.split(/\r?\n/)){
    const line=rawLine.trim();
    if(!line||line.startsWith('#')||!line.includes('::')) continue;
    const split=line.split('::');
    const left=(split.shift()||'').trim();
    const right=split.join('::').trim();
    const head=left
      .replace(/\{[^}]*\}/g,' ')
      .replace(/\([^)]*\)/g,' ')
      .replace(/\s+/g,' ')
      .trim()
      .toLowerCase();
    if(!/^[a-z]+$/.test(head)) continue;
    const answers=[];
    for(const part of right.split(/[;,]/)){
      const cleaned=stripTranslationMeta(part);
      if(!cleaned||!/[\u05D0-\u05EA]/.test(cleaned)) continue;
      if(!answers.includes(cleaned)) answers.push(cleaned);
    }
    if(!answers.length) continue;
    const existing=map.get(head)||[];
    for(const answer of answers){
      if(!existing.includes(answer)) existing.push(answer);
    }
    map.set(head,existing.slice(0,8));
  }
  return map;
}

async function enrichVocabularyTranslations(){
  try{
    const response=await fetch(EN_HE_WIKTIONARY_URL,{cache:'no-store'});
    if(!response.ok) throw new Error('translation source unavailable');
    const dict=parseWiktionaryHebrew(await response.text());
    let translated=0;
    for(const item of WORDS){
      const extra=dict.get(item.word)||[];
      const merged=[...(item.answers||[])];
      for(const answer of extra){
        if(!merged.includes(answer)) merged.push(answer);
      }
      item.answers=merged.slice(0,8);
      if(item.answers.length) translated++;
    }
    localStorage.setItem('english100.translationCoverage',JSON.stringify({translated,total:WORDS.length,source:'Wiktionary EN→HE'}));
    renderLetters();
    console.info(`[English 100] translations ready: ${translated}/${WORDS.length}`);
  }catch(error){
    console.warn('[English 100] translation enrichment failed',error);
  }
}

(async()=>{
  for(let i=0;i<100&&(!Array.isArray(WORDS)||!WORDS.length);i++) await new Promise(r=>setTimeout(r,50));
  if(Array.isArray(WORDS)&&WORDS.length) enrichVocabularyTranslations();
})();
