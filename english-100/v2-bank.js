const V2_DB='https://raw.githubusercontent.com/roeybiran/Milonchik/main/Milonchik/Resources/milon.db';
const V2_FREQ='https://raw.githubusercontent.com/david47k/top-english-wordlists/master/top_english_words_lower_50000.txt';
const V2_SQL='https://cdn.jsdelivr.net/npm/sql.js@1.11.0/dist/';
const V2_KEY='english100-v2-5200';

function v2Hebrew(text){return (text||'').replace(/[\u0591-\u05C7]/g,'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim()}
function v2Add(map,word,values){word=(word||'').trim().toLowerCase();if(!/^[a-z]+$/.test(word))return;const current=map.get(word)||[];for(const value of values){const answer=v2Hebrew(value);if(answer&&/[\u05D0-\u05EA]/.test(answer)&&!current.includes(answer))current.push(answer)}if(current.length)map.set(word,current.slice(0,8))}

async function makeV2Bank(){
  const [SQL,dbResult,freqResult]=await Promise.all([
    initSqlJs({locateFile:file=>V2_SQL+file}),
    fetch(V2_DB,{cache:'force-cache'}),
    fetch(V2_FREQ,{cache:'force-cache'})
  ]);
  if(!dbResult.ok||!freqResult.ok)throw new Error('V2 dictionary download failed');
  const db=new SQL.Database(new Uint8Array(await dbResult.arrayBuffer()));
  const rows=db.exec("SELECT translated_word, translations, inflection_value FROM definitions WHERE translated_lang='eng'");
  const map=new Map();
  if(rows.length){for(const row of rows[0].values){const word=row[0],answers=String(row[1]||'').split('\t');v2Add(map,word,answers);for(const form of String(row[2]||'').split('\t'))v2Add(map,form,answers)}}
  db.close();
  const frequency=(await freqResult.text()).split(/\r?\n/).map(x=>x.trim().toLowerCase()).filter(x=>/^[a-z]+$/.test(x));
  const rank=new Map();frequency.forEach((word,index)=>{if(!rank.has(word))rank.set(word,index)});
  const all=[...map.keys()],final=[];
  for(const letter of 'abcdefghijklmnopqrstuvwxyz'){
    const candidates=all.filter(word=>word[0]===letter).sort((a,b)=>(rank.get(a)??9999999)-(rank.get(b)??9999999)||a.localeCompare(b,'en'));
    if(candidates.length<200)throw new Error(`${letter.toUpperCase()} has ${candidates.length} words`);
    const chosen=candidates.slice(0,200).sort((a,b)=>a.localeCompare(b,'en'));
    chosen.forEach(word=>final.push({word,answers:map.get(word)}));
  }
  if(final.length!==5200)throw new Error(`V2 total is ${final.length}`);
  localStorage.setItem(V2_KEY,JSON.stringify(final));
  return final;
}

window.loadV2Bank=async function(){
  try{
    const saved=JSON.parse(localStorage.getItem(V2_KEY)||'null');
    if(Array.isArray(saved)&&saved.length===5200){const count={};saved.forEach(item=>count[item.word[0]]=(count[item.word[0]]||0)+1);if('abcdefghijklmnopqrstuvwxyz'.split('').every(letter=>count[letter]===200))return saved}
  }catch(error){localStorage.removeItem(V2_KEY)}
  return makeV2Bank();
};