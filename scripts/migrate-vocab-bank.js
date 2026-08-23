const fs=require('fs');
const vm=require('vm');

const context=vm.createContext({window:{},console});
const base=fs.readFileSync('english-100/v2-bank.js','utf8');
const additions=fs.existsSync('english-100/v6-additions.js')?fs.readFileSync('english-100/v6-additions.js','utf8'):'';
vm.runInContext(base,context,{filename:'v2-bank.js'});
if(additions) vm.runInContext(additions,context,{filename:'v6-additions.js'});

(async()=>{
  const words=await context.window.loadV2Bank();
  const merged=new Map();
  for(const item of words){
    const word=String(item.word||'').trim().toLowerCase();
    if(!word) continue;
    const answers=[...new Set((item.answers||[]).map(x=>String(x).trim()).filter(Boolean))];
    if(!answers.length) continue;
    if(!merged.has(word)) merged.set(word,{word,answers});
    else {
      const current=merged.get(word);
      for(const answer of answers) if(!current.answers.includes(answer)) current.answers.push(answer);
    }
  }
  if(!merged.has('carrot')) merged.set('carrot',{word:'carrot',answers:['גזר']});
  const bank=[...merged.values()].sort((a,b)=>a.word.localeCompare(b,'en'));
  fs.writeFileSync('english-100/vocab-bank.json',JSON.stringify({version:7,count:bank.length,words:bank},null,2)+'\n');
  console.log(`vocab-bank.json written: ${bank.length} words`);
})();
