window.loadV2Bank=async function(){
  const response=await fetch('vocab-bank.json?v=7',{cache:'no-store'});
  if(!response.ok) throw new Error(`vocab-bank.json HTTP ${response.status}`);
  const data=await response.json();
  const source=Array.isArray(data)?data:data.words;
  if(!Array.isArray(source)) throw new Error('invalid vocab-bank.json');

  const merged=new Map();
  for(const item of source){
    const word=String(item?.word||'').trim().toLowerCase();
    const answers=[...new Set((item?.answers||[]).map(x=>String(x).trim()).filter(Boolean))];
    if(!word||!answers.length) continue;
    if(!merged.has(word)) merged.set(word,{word,answers});
    else{
      const current=merged.get(word);
      for(const answer of answers) if(!current.answers.includes(answer)) current.answers.push(answer);
    }
  }

  return [...merged.values()].sort((a,b)=>a.word.localeCompare(b,'en'));
};
