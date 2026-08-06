import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const read=(relative)=>JSON.parse(fs.readFileSync(path.join(root,relative),"utf8"));
const readPrefix=(prefix)=>fs.readdirSync(path.join(root,"data/exams/source"))
  .filter(name=>name.startsWith(`${prefix}-`)&&name.endsWith(".json"))
  .sort()
  .flatMap(name=>read(`data/exams/source/${name}`));
const westernYears=fs.readdirSync(path.join(root,"data/exams"))
  .filter(name=>/^western-medicine-201[3-9]\.json$/.test(name))
  .sort()
  .flatMap(name=>read(`data/exams/${name}`));
const candidates=[...readPrefix("foundations").slice(0,340),...readPrefix("western"),...westernYears,...readPrefix("acupuncture")];
const fingerprint=(value)=>value.normalize("NFKD").replace(/[\u0591-\u05c7]/g,"").toLocaleLowerCase("he").replace(/[^\p{L}\p{N}]+/gu,"");
const seen=new Map();
const unique=[];
const duplicates=[];
for(const question of candidates){
  const key=fingerprint(question.question);
  if(seen.has(key))duplicates.push({duplicate:question.id,kept:seen.get(key).id});
  else{seen.set(key,question);unique.push(question);}
}
console.log(`Candidates: ${candidates.length}`);
console.log(`Unique questions: ${unique.length}`);
console.log(`Duplicates removed: ${duplicates.length}`);
const remaining=new Set();
for(const question of unique){
  const key=fingerprint(question.question);
  if(remaining.has(key))throw new Error(`Duplicate remained: ${question.id}`);
  remaining.add(key);
}
console.log("Validation passed: no duplicate fingerprints remain.");
