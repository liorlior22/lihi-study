const V2_DICT_SOURCES=[
  'https://cdn.jsdelivr.net/gh/open-dict-data/wikidict-en@master/data/he-en_wiki.txt',
  'https://raw.githubusercontent.com/open-dict-data/wikidict-en/master/data/he-en_wiki.txt'
];
const V2_FREQ_SOURCES=[
  'https://cdn.jsdelivr.net/gh/david47k/top-english-wordlists@master/top_english_words_lower_50000.txt',
  'https://raw.githubusercontent.com/david47k/top-english-wordlists/master/top_english_words_lower_50000.txt'
];
const V2_KEY='english100-v2-5200-text-1';

function v2CleanHebrew(value){
  return (value||'')
    .replace(/[\u0591-\u05C7]/g,'')
    .replace(/\s+/g,' ')
    .trim();
}

async function v2FetchText(sources,label){
  const errors=[];
  for(const url of sources){
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),30000);
    try{
      const response=await fetch(url,{cache:'force-cache',signal:controller.signal});
      if(!response.ok) throw new Error(`HTTP ${response.status}`);
      const text=await response.text();
      if(text.length<10000) throw new Error('response too small');
      return text;
    }catch(error){
      errors.push(`${url}: ${error.message}`);
    }finally{
      clearTimeout(timer);
    }
  }
  throw new Error(`${label} failed: ${errors.join(' | ')}`);
}

function v2ParseDictionary(text){
  const map=new Map();
  for(const rawLine of text.split(/\r?\n/)){
    if(!rawLine) continue;
    const tab=rawLine.indexOf('\t');
    if(tab<1) continue;
    const hebrew=v2CleanHebrew(rawLine.slice(0,tab));
    const english=rawLine.slice(tab+1).trim().toLowerCase();
    if(!hebrew||!/[\u05D0-\u05EA]/.test(hebrew)||!/^[a-z]+$/.test(english)) continue;
    const answers=map.get(english)||[];
    if(!answers.includes(hebrew)) answers.push(hebrew);
    map.set(english,answers.slice(0,8));
  }
  return map;
}

function v2ValidateBank(bank){
  if(!Array.isArray(bank)||bank.length!==5200) return false;
  const counts={};
  for(const item of bank){
    if(!item||!/^[a-z]+$/.test(item.word)||!Array.isArray(item.answers)||!item.answers.length) return false;
    counts[item.word[0]]=(counts[item.word[0]]||0)+1;
  }
  return 'abcdefghijklmnopqrstuvwxyz'.split('').every(letter=>counts[letter]===200);
}

async function makeV2Bank(){
  const [dictText,freqText]=await Promise.all([
    v2FetchText(V2_DICT_SOURCES,'Hebrew dictionary'),
    v2FetchText(V2_FREQ_SOURCES,'frequency list')
  ]);

  const map=v2ParseDictionary(dictText);
  const frequency=freqText
    .split(/\r?\n/)
    .map(x=>x.trim().toLowerCase())
    .filter(x=>/^[a-z]+$/.test(x));
  const rank=new Map();
  frequency.forEach((word,index)=>{if(!rank.has(word)) rank.set(word,index)});

  const byLetter={};
  for(const letter of 'abcdefghijklmnopqrstuvwxyz') byLetter[letter]=[];
  for(const word of map.keys()) byLetter[word[0]]?.push(word);

  const final=[];
  for(const letter of 'abcdefghijklmnopqrstuvwxyz'){
    const candidates=byLetter[letter]
      .sort((a,b)=>(rank.get(a)??9999999)-(rank.get(b)??9999999)||a.localeCompare(b,'en'));
    if(candidates.length<200) throw new Error(`${letter.toUpperCase()} has only ${candidates.length} translated single words`);
    const chosen=candidates.slice(0,200).sort((a,b)=>a.localeCompare(b,'en'));
    for(const word of chosen) final.push({word,answers:map.get(word)});
  }

  if(!v2ValidateBank(final)) throw new Error(`V2 validation failed (${final.length})`);
  localStorage.setItem(V2_KEY,JSON.stringify(final));
  localStorage.setItem('english100-v2-source','Wikidata CC0 he-en · 200 words per letter');
  return final;
}

window.loadV2Bank=async function(){
  try{
    const saved=JSON.parse(localStorage.getItem(V2_KEY)||'null');
    if(v2ValidateBank(saved)) return saved;
  }catch(error){
    localStorage.removeItem(V2_KEY);
  }
  return makeV2Bank();
};