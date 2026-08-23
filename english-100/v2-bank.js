const V3_PRIMARY_SOURCES=[
  'https://raw.githubusercontent.com/InterAl/milon/gh-pages/dict-en-he.json',
  'https://interal.github.io/milon/dict-en-he.json'
];
const V3_WIKIDATA_SOURCES=[
  'https://cdn.jsdelivr.net/gh/open-dict-data/wikidict-en@master/data/he-en_wiki.txt',
  'https://raw.githubusercontent.com/open-dict-data/wikidict-en/master/data/he-en_wiki.txt'
];
const V3_BLI_SOURCES=[
  'https://raw.githubusercontent.com/mikeizbicki/wiktionary_bli/master/final/he-en.all'
];
const V3_FREQ_SOURCES=[
  'https://cdn.jsdelivr.net/gh/david47k/top-english-wordlists@master/top_english_words_lower_50000.txt',
  'https://raw.githubusercontent.com/david47k/top-english-wordlists/master/top_english_words_lower_50000.txt'
];
const V3_KEY='english100-v3-5200';
const V3_TERM=/^[a-z][a-z '\-]*$/;
const V3_LETTERS='abcdefghijklmnopqrstuvwxyz';

function v3CleanHebrew(value){
  return String(value||'')
    .replace(/[\u0591-\u05C7]/g,'')
    .replace(/<[^>]*>/g,' ')
    .replace(/\s+/g,' ')
    .trim();
}

function v3Add(map,english,values){
  const word=String(english||'').trim().toLowerCase().replace(/\s+/g,' ');
  if(!V3_TERM.test(word)) return;
  const list=map.get(word)||[];
  const rawValues=Array.isArray(values)?values:String(values||'').split(/\t|;|,/);
  for(const raw of rawValues){
    const answer=v3CleanHebrew(raw);
    if(answer&&/[\u05D0-\u05EA]/.test(answer)&&!list.includes(answer)) list.push(answer);
  }
  if(list.length) map.set(word,list.slice(0,8));
}

async function v3Fetch(sources,label,type='text'){
  const errors=[];
  for(const url of sources){
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),60000);
    try{
      const response=await fetch(url,{cache:'force-cache',signal:controller.signal});
      if(!response.ok) throw new Error(`HTTP ${response.status}`);
      const result=type==='json'?await response.json():await response.text();
      if(type==='json'&&!Array.isArray(result)) throw new Error('invalid JSON dictionary');
      if(type==='text'&&String(result).length<10000) throw new Error('response too small');
      return result;
    }catch(error){
      errors.push(`${url}: ${error.message}`);
    }finally{
      clearTimeout(timer);
    }
  }
  throw new Error(`${label} failed: ${errors.join(' | ')}`);
}

function v3MergePrimary(map,data){
  for(const item of data){
    if(!item) continue;
    v3Add(map,item.translated,item.translation);
    if(Array.isArray(item.inflections)){
      for(const inflection of item.inflections){
        const form=inflection?.Text||inflection?.text||'';
        v3Add(map,form,item.translation);
      }
    }
  }
}

function v3MergeHebrewEnglishText(map,text){
  for(const rawLine of text.split(/\r?\n/)){
    if(!rawLine) continue;
    const tab=rawLine.indexOf('\t');
    if(tab<1) continue;
    const hebrew=v3CleanHebrew(rawLine.slice(0,tab));
    const english=rawLine.slice(tab+1).trim();
    if(hebrew&&/[\u05D0-\u05EA]/.test(hebrew)) v3Add(map,english,[hebrew]);
  }
}

function v3Counts(map){
  const counts={};
  for(const letter of V3_LETTERS) counts[letter]=0;
  for(const word of map.keys()) if(counts[word[0]]!==undefined) counts[word[0]]++;
  return counts;
}

function v3ValidateBank(bank){
  if(!Array.isArray(bank)||bank.length!==5200) return false;
  const counts={};
  for(const item of bank){
    if(!item||!V3_TERM.test(item.word)||!Array.isArray(item.answers)||!item.answers.length) return false;
    counts[item.word[0]]=(counts[item.word[0]]||0)+1;
  }
  return [...V3_LETTERS].every(letter=>counts[letter]===200);
}

async function makeV3Bank(){
  const [primary,freqText]=await Promise.all([
    v3Fetch(V3_PRIMARY_SOURCES,'MIT English-Hebrew dictionary','json'),
    v3Fetch(V3_FREQ_SOURCES,'frequency list','text')
  ]);

  const map=new Map();
  v3MergePrimary(map,primary);

  let counts=v3Counts(map);
  let weak=[...V3_LETTERS].filter(letter=>counts[letter]<200);
  if(weak.length){
    try{
      const extra=await v3Fetch(V3_WIKIDATA_SOURCES,'Wikidata Hebrew-English fallback','text');
      v3MergeHebrewEnglishText(map,extra);
    }catch(error){console.warn('[English 100 V3] Wikidata fallback unavailable',error)}
  }

  counts=v3Counts(map);
  weak=[...V3_LETTERS].filter(letter=>counts[letter]<200);
  if(weak.length){
    try{
      const extra=await v3Fetch(V3_BLI_SOURCES,'Wiktionary BLI fallback','text');
      v3MergeHebrewEnglishText(map,extra);
    }catch(error){console.warn('[English 100 V3] BLI fallback unavailable',error)}
  }

  counts=v3Counts(map);
  weak=[...V3_LETTERS].filter(letter=>counts[letter]<200);
  if(weak.length){
    throw new Error(`not enough translated entries: ${weak.map(l=>`${l.toUpperCase()}=${counts[l]}`).join(', ')}`);
  }

  const frequency=freqText
    .split(/\r?\n/)
    .map(x=>x.trim().toLowerCase())
    .filter(x=>/^[a-z]+$/.test(x));
  const rank=new Map();
  frequency.forEach((word,index)=>{if(!rank.has(word)) rank.set(word,index)});

  const byLetter={};
  for(const letter of V3_LETTERS) byLetter[letter]=[];
  for(const word of map.keys()) byLetter[word[0]]?.push(word);

  const final=[];
  for(const letter of V3_LETTERS){
    const candidates=byLetter[letter].sort((a,b)=>{
      const aSingle=/^[a-z]+$/.test(a),bSingle=/^[a-z]+$/.test(b);
      const aRank=rank.has(a)?rank.get(a):(aSingle?10000000:20000000);
      const bRank=rank.has(b)?rank.get(b):(bSingle?10000000:20000000);
      return aRank-bRank||a.localeCompare(b,'en',{sensitivity:'base'});
    });
    const chosen=candidates.slice(0,200).sort((a,b)=>a.localeCompare(b,'en',{sensitivity:'base'}));
    if(chosen.length!==200) throw new Error(`${letter.toUpperCase()} selected ${chosen.length}`);
    for(const word of chosen) final.push({word,answers:map.get(word)});
  }

  if(!v3ValidateBank(final)) throw new Error(`V3 validation failed (${final.length})`);
  localStorage.setItem(V3_KEY,JSON.stringify(final));
  localStorage.setItem('english100-v3-source','MIT English-Hebrew + verified fallbacks · 200 per letter');
  return final;
}

window.loadV2Bank=async function(){
  try{
    const saved=JSON.parse(localStorage.getItem(V3_KEY)||'null');
    if(v3ValidateBank(saved)) return saved;
  }catch(error){
    localStorage.removeItem(V3_KEY);
  }
  return makeV3Bank();
};