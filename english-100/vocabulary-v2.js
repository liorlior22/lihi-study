const clean=s=>(s||'').normalize('NFKD').replace(/[\u0591-\u05C7]/g,'').replace(/[־–—'״׳".,!?()]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
function lev(a,b){a=clean(a);b=clean(b);const d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]!==b[j-1]));return d[a.length][b.length]}
function acceptable(input,answers){const x=clean(input);return answers.some(a=>{const y=clean(a),xs=x.replace(/^(ה|ו|ב|ל|מ|ש)/,''),ys=y.replace(/^(ה|ו|ב|ל|מ|ש)/,'').replace(/ ל$/,'');if(!x)return false;if(x===y||x===ys||xs===y||xs===ys)return true;if((x.includes(y)||y.includes(x))&&Math.min(x.length,y.length)>=3)return true;const max=Math.max(x.length,y.length);return max>=4&&lev(x,y)<=(max>=8?2:1)})}

const state=JSON.parse(localStorage.getItem('english100-vocab')||'{}');
let WORDS=[],queue=[],idx=0,streak=0,mode='az',locked=false;
const save=()=>localStorage.setItem('english100-vocab',JSON.stringify(state));
const $=id=>document.getElementById(id);

function translatedWords(){return WORDS.filter(w=>Array.isArray(w.answers)&&w.answers.length)}
function updateBankSummary(status='V2.1 · 200 translated entries per letter',loading=false){
  const alphabet=$('alphabet');if(!alphabet)return;
  let summary=$('vocabBankSummary');
  if(!summary){summary=document.createElement('div');summary.id='vocabBankSummary';summary.style.cssText='display:flex;justify-content:center;gap:42px;margin-top:22px;padding-top:18px;border-top:1px solid #e6e8ee;text-align:center;position:relative';alphabet.insertAdjacentElement('afterend',summary)}
  const ready=translatedWords().length,bank=WORDS.length;
  const readyText=loading?'…':ready.toLocaleString();
  const bankText=loading?'…':bank.toLocaleString();
  summary.innerHTML=`<div><div style="font-size:12px;font-weight:800;letter-spacing:.08em;color:#667085;text-transform:uppercase">Ready</div><div style="font-size:30px;font-weight:900;margin-top:3px">${readyText}</div></div><div><div style="font-size:12px;font-weight:800;letter-spacing:.08em;color:#667085;text-transform:uppercase">Bank</div><div style="font-size:30px;font-weight:900;margin-top:3px">${bankText}</div></div><div style="position:absolute;top:100%;margin-top:8px;font-size:11px;color:#667085;max-width:760px">${status}</div>`;
}
function renderLetters(){const el=$('alphabet');el.innerHTML='';'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(l=>{const all=WORDS.filter(w=>w.word[0]===l.toLowerCase()),ready=all.filter(w=>w.answers.length);const b=document.createElement('button');b.className='letter-btn';b.innerHTML=`<strong>${l}</strong><span>${ready.length} ready</span><small>${all.length} bank</small>`;b.disabled=!ready.length;b.onclick=()=>start(ready,`Letter ${l}`);el.appendChild(b)});updateBankSummary()}
function setLocked(value){locked=value;$('answerInput').disabled=value;$('checkAnswer').disabled=value;$('dontKnow').disabled=value}
function clearResult(){const card=document.querySelector('.question-card'),f=$('feedback');card.classList.remove('answer-correct','answer-wrong');f.className='feedback hidden';f.innerHTML=''}
function start(list,title){queue=[...list];idx=0;streak=0;$('practiceTitle').textContent=title;$('azSection').classList.add('hidden');$('practiceSection').classList.remove('hidden');show()}
function show(){setLocked(false);clearResult();if(!queue.length){$('currentWord').textContent='No translated words yet';return}if(idx>=queue.length)idx=0;const w=queue[idx];$('currentWord').textContent=w.word;$('wordPosition').textContent=`${idx+1} / ${queue.length}`;$('streak').textContent=`🔥 ${streak} streak`;$('answerInput').value='';$('answerInput').focus()}
function advance(){idx++;show();updateCounts()}
function check(skip=false){if(locked||!queue.length)return;const w=queue[idx],input=$('answerInput').value,ok=!skip&&acceptable(input,w.answers);state[w.word]=state[w.word]||{seen:0,correct:0,wrong:0};state[w.word].seen++;const card=document.querySelector('.question-card'),f=$('feedback');setLocked(true);if(ok){state[w.word].correct++;streak++;card.classList.add('answer-correct');f.className='feedback good result-feedback';f.innerHTML=`<div class="result-icon">✓</div><div><strong>Correct!</strong><span>${w.word} = ${w.answers.join(' / ')}</span></div>`;save();setTimeout(advance,1300)}else{state[w.word].wrong++;streak=0;card.classList.add('answer-wrong');f.className='feedback bad result-feedback';f.innerHTML=`<div class="result-icon">✕</div><div><strong>${skip?'Learn this word':'Not quite'}</strong><span>${w.word} = ${w.answers.join(' / ')}</span><small>Next word in 5 seconds…</small></div>`;save();setTimeout(advance,5000)}}
function updateCounts(){$('masteredCount').textContent=Object.values(state).filter(x=>x.correct>=3).length}

async function init(){
  updateBankSummary('V2.1 · Loading the 5,200 translated entries…',true);
  try{
    if(typeof window.loadV2Bank!=='function') throw new Error('bank loader missing');
    WORDS=await window.loadV2Bank();
    localStorage.setItem('english100.wordBankSize',String(WORDS.length));
    renderLetters();updateCounts();
    const counts={};WORDS.forEach(w=>counts[w.word[0]]=(counts[w.word[0]]||0)+1);
    const valid=WORDS.length===5200&&'abcdefghijklmnopqrstuvwxyz'.split('').every(letter=>counts[letter]===200);
    if(!valid) throw new Error(`validation failed: ${WORDS.length} total`);
    updateBankSummary('V2.1 · 200 translated entries per letter');
  }catch(error){
    console.error('[English 100 V2.1]',error);
    WORDS=[];renderLetters();updateCounts();updateBankSummary(`V2.1 load failed · ${error.message}`);
  }
}

document.querySelectorAll('.mode-card').forEach(b=>b.onclick=()=>{document.querySelectorAll('.mode-card').forEach(x=>x.classList.remove('active'));b.classList.add('active');mode=b.dataset.mode;if(mode==='az'){$('practiceSection').classList.add('hidden');$('azSection').classList.remove('hidden');return}let list=translatedWords();if(mode==='mixed')list=list.sort(()=>Math.random()-.5).slice(0,30);if(mode==='mistakes')list=list.filter(w=>state[w.word]?.wrong>0);if(mode==='review')list=list.filter(w=>state[w.word]?.seen>0&&(state[w.word]?.correct||0)<3);if(mode==='level')list=list.sort(()=>Math.random()-.5).slice(0,25);start(list,mode==='mixed'?'Mixed practice':mode==='mistakes'?'My Mistakes':mode==='review'?'Review':'Level Test')});
$('checkAnswer').onclick=()=>check(false);$('dontKnow').onclick=()=>check(true);$('answerInput').addEventListener('keydown',e=>{if(e.key==='Enter'&&!locked)check(false)});$('closePractice').onclick=()=>{$('practiceSection').classList.add('hidden');$('azSection').classList.remove('hidden')};$('speakWord').onclick=()=>{if('speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance($('currentWord').textContent);u.lang='en-US';u.rate=.85;speechSynthesis.speak(u)}};
init();