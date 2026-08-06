import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const read=(relative)=>JSON.parse(fs.readFileSync(path.join(root,relative),"utf8"));
const fingerprint=(value)=>value.normalize("NFKD").replace(/[\u0591-\u05c7]/g,"").toLocaleLowerCase("he").replace(/[^\p{L}\p{N}]+/gu,"");
const source=(prefix)=>fs.readdirSync(path.join(root,"data/exams/source"))
  .filter(name=>name.startsWith(`${prefix}-`)&&name.endsWith(".json"))
  .sort()
  .flatMap(name=>read(`data/exams/source/${name}`));
const western=fs.readdirSync(path.join(root,"data/exams"))
  .filter(name=>/^western-medicine-201[3-9]\.json$/.test(name))
  .sort()
  .flatMap(name=>read(`data/exams/${name}`));
const sectors={foundations:source("foundations"),western,acupuncture:source("acupuncture"),"point-location":source("point-location"),herbs:source("herbs")};
for(const [sector,questions] of Object.entries(sectors)){
  const seen=new Set();
  let duplicates=0;
  for(const question of questions){
    const key=fingerprint(question.question);
    if(seen.has(key))duplicates+=1;
    else seen.add(key);
  }
  console.log(`${sector}: ${seen.size} unique (${duplicates} duplicates removed from ${questions.length})`);
}
