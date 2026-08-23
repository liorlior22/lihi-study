function stripNiqqud(text){return (text||'').normalize('NFD').replace(/[\u0591-\u05C7]/g,'').normalize('NFC')}
function cleanHebrew(text){return stripNiqqud(text).toLowerCase().trim().replace(/[.,!?:;״"'׳־-]/g,' ').replace(/\s+/g,' ')}
function stripCommonParticles(text){let s=cleanHebrew(text);const words=s.split(' ');return words.map(w=>w.replace(/^(ו|ה|ל|ב|כ|מ|ש)(?=[\u05D0-\u05EA]{3,})/,'')).join(' ').replace(/\s+/g,' ').trim()}
function levenshtein(a,b){a=cleanHebrew(a);b=cleanHebrew(b);const m=a.length,n=b.length;if(!m)return n;if(!n)return m;const prev=Array.from({length:n+1},(_,i)=>i),cur=new Array(n+1);for(let i=1;i<=m;i++){cur[0]=i;for(let j=1;j<=n;j++){const cost=a[i-1]===b[j-1]?0:1;cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+cost)}for(let j=0;j<=n;j++)prev[j]=cur[j]}return prev[n]}
function fuzzyHebrewMatch(userAnswer,expected){const a=cleanHebrew(userAnswer),b=cleanHebrew(expected);if(!a||!b)return false;if(a===b)return true;const ap=stripCommonParticles(a),bp=stripCommonParticles(b);if(ap===bp)return true;if(a.includes(b)||b.includes(a)||ap.includes(bp)||bp.includes(ap))return true;const maxLen=Math.max(a.length,b.length);const allowance=maxLen<=4?0:maxLen<=8?1:2;if(levenshtein(a,b)<=allowance)return true;if(levenshtein(ap,bp)<=allowance)return true;return false}

const originalNormalize=typeof normalize==='function'?normalize:null;
normalize=function(v){return cleanHebrew(v)};

function isAcceptedAnswer(typed,answers){return (answers||[]).some(answer=>fuzzyHebrewMatch(typed,answer))}

// Override the original evaluator so small Hebrew spelling differences and harmless particles are accepted.
evaluate=function(dontKnow=false){
  if(index>=queue.length)return;
  const w=queue[index],raw=document.getElementById('answerInput').value,correct=!dontKnow&&isAcceptedAnswer(raw,w.answers||[]),s=loadStats();
  s.seen=s.seen||{};s.mastered=s.mastered||{};s.mistakes=s.mistakes||{};s.correct=s.correct||{};
  s.seen[w.word]=(s.seen[w.word]||0)+1;
  const f=document.getElementById('feedback');f.className='feedback '+(correct?'good':'bad');
  if(correct){
    streak++;
    s.correct[w.word]=(s.correct[w.word]||0)+1;
    if(s.correct[w.word]>=3){s.mastered[w.word]=true;delete s.mistakes[w.word]}
    f.textContent='✓ Correct — '+w.word+' = '+(w.he||((w.answers||[])[0]||''));
  }else{
    streak=0;
    s.mistakes[w.word]=(s.mistakes[w.word]||0)+1;
    f.textContent='✕ '+w.word+' = '+(w.he||((w.answers||[])[0]||'Translation pending'));
  }
  saveStats(s);
  setTimeout(()=>{index++;renderWord()},900);
};
