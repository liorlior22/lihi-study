const SOURCE_URL='https://raw.githubusercontent.com/david47k/top-english-wordlists/master/top_english_words_lower_10000.txt';
const TRANSLATIONS={
able:{answers:['מסוגל','יכול','יכולה','יכולים'],he:'מסוגל / יכול'},about:{answers:['על','בנושא','אודות'],he:'על / בנושא'},above:{answers:['מעל','למעלה'],he:'מעל'},abroad:{answers:['בחול','חו״ל','חול','מחוץ לארץ','בחוץ לארץ'],he:'בחו״ל / מחוץ לארץ'},absence:{answers:['היעדרות','חוסר','העדרות'],he:'היעדרות / חוסר'},absolute:{answers:['מוחלט','אבסולוטי'],he:'מוחלט'},abstract:{answers:['מופשט'],he:'מופשט'},abuse:{answers:['התעללות','ניצול לרעה','שימוש לרעה'],he:'התעללות / ניצול לרעה'},academic:{answers:['אקדמי'],he:'אקדמי'},accept:{answers:['לקבל','לאשר'],he:'לקבל / להסכים לקבל'},access:{answers:['גישה'],he:'גישה'},accident:{answers:['תאונה'],he:'תאונה'},according:{answers:['לפי','בהתאם','בהתאם ל'],he:'לפי / בהתאם ל־'},account:{answers:['חשבון'],he:'חשבון'},achieve:{answers:['להשיג','להגיע להישג'],he:'להשיג / להגיע להישג'},achievement:{answers:['הישג'],he:'הישג'},acknowledge:{answers:['להודות','להכיר','להכיר ב','לאשר'],he:'להכיר ב־ / להודות ב־'},acquire:{answers:['לרכוש','להשיג'],he:'לרכוש / להשיג'},across:{answers:['לרוחב','מעבר','מצד לצד'],he:'לרוחב / מצד לצד'},act:{answers:['לפעול','מעשה','לשחק'],he:'לפעול / מעשה'},action:{answers:['פעולה'],he:'פעולה'},active:{answers:['פעיל'],he:'פעיל'},activity:{answers:['פעילות'],he:'פעילות'},actual:{answers:['אמיתי','ממשי','בפועל'],he:'אמיתי / ממשי'},actually:{answers:['למעשה','בעצם','בפועל'],he:'למעשה / בעצם'},add:{answers:['להוסיף'],he:'להוסיף'},addition:{answers:['הוספה','תוספת'],he:'הוספה / תוספת'},additional:{answers:['נוסף','נוספת','נוספים'],he:'נוסף'},address:{answers:['כתובת','לפנות','לטפל'],he:'כתובת / לפנות אל / לטפל ב־'},administration:{answers:['ניהול','מנהלה','ממשל'],he:'ניהול / מנהלה / ממשל'},admit:{answers:['להודות','להכניס','לקבל'],he:'להודות / לקבל למוסד'},adult:{answers:['מבוגר','בוגר'],he:'מבוגר / בוגר'},advance:{answers:['להתקדם','קידום','מקדמה'],he:'להתקדם / קידום'},advantage:{answers:['יתרון'],he:'יתרון'},adventure:{answers:['הרפתקה'],he:'הרפתקה'},advertise:{answers:['לפרסם'],he:'לפרסם'},advertisement:{answers:['פרסומת','מודעה'],he:'פרסומת / מודעה'},advice:{answers:['עצה'],he:'עצה'},advise:{answers:['לייעץ','לתת עצה'],he:'לייעץ'},affect:{answers:['להשפיע'],he:'להשפיע'},afford:{answers:['להרשות לעצמך','להרשות לעצמי','להרשות'],he:'להרשות לעצמך (בדרך כלל כלכלית)'},afraid:{answers:['מפחד','פוחד','חושש'],he:'מפחד / חושש'},after:{answers:['אחרי','לאחר'],he:'אחרי / לאחר'},afternoon:{answers:['אחר הצהריים'],he:'אחר הצהריים'},again:{answers:['שוב'],he:'שוב'},against:{answers:['נגד'],he:'נגד'},age:{answers:['גיל'],he:'גיל'},agency:{answers:['סוכנות'],he:'סוכנות'},agenda:{answers:['סדר יום','אגנדה'],he:'סדר יום'},agent:{answers:['סוכן'],he:'סוכן'},agree:{answers:['להסכים'],he:'להסכים'},agreement:{answers:['הסכם','הסכמה'],he:'הסכם / הסכמה'},allow:{answers:['לאפשר','להרשות'],he:'לאפשר / להרשות'},almost:{answers:['כמעט'],he:'כמעט'},alone:{answers:['לבד'],he:'לבד'},always:{answers:['תמיד'],he:'תמיד'},amount:{answers:['כמות','סכום'],he:'כמות / סכום'},answer:{answers:['תשובה','לענות'],he:'תשובה / לענות'},appear:{answers:['להופיע','להיראות'],he:'להופיע / להיראות'},apply:{answers:['להגיש מועמדות','להחיל','ליישם'],he:'להגיש / להחיל / ליישם'},area:{answers:['אזור','שטח'],he:'אזור / שטח'},around:{answers:['מסביב','סביב','בערך'],he:'מסביב / בערך'},arrive:{answers:['להגיע'],he:'להגיע'},ask:{answers:['לשאול','לבקש'],he:'לשאול / לבקש'},available:{answers:['זמין','פנוי'],he:'זמין / פנוי'},average:{answers:['ממוצע'],he:'ממוצע'},avoid:{answers:['להימנע','להתחמק'],he:'להימנע / להתחמק'},aware:{answers:['מודע'],he:'מודע'},bad:{answers:['רע'],he:'רע'},balance:{answers:['איזון','יתרה'],he:'איזון / יתרה'},basic:{answers:['בסיסי'],he:'בסיסי'},beautiful:{answers:['יפה'],he:'יפה'},because:{answers:['כי','בגלל ש'],he:'כי / בגלל ש־'},become:{answers:['להפוך','להפוך ל'],he:'להפוך ל־'},before:{answers:['לפני'],he:'לפני'},begin:{answers:['להתחיל'],he:'להתחיל'},believe:{answers:['להאמין'],he:'להאמין'},belong:{answers:['להיות שייך','שייך'],he:'להיות שייך'},below:{answers:['מתחת','למטה'],he:'מתחת'},benefit:{answers:['תועלת','יתרון','להועיל'],he:'תועלת / יתרון'},best:{answers:['הטוב ביותר','הכי טוב'],he:'הטוב ביותר'},better:{answers:['טוב יותר','יותר טוב'],he:'טוב יותר'},between:{answers:['בין'],he:'בין'},big:{answers:['גדול'],he:'גדול'},book:{answers:['ספר'],he:'ספר'},business:{answers:['עסק','עסקים'],he:'עסק / עסקים'},car:{answers:['מכונית','רכב','אוטו'],he:'מכונית / רכב'},child:{answers:['ילד','ילדה'],he:'ילד / ילדה'},company:{answers:['חברה'],he:'חברה'},daughter:{answers:['בת'],he:'בת'},day:{answers:['יום'],he:'יום'},different:{answers:['שונה'],he:'שונה'},dog:{answers:['כלב'],he:'כלב'},effect:{answers:['השפעה','אפקט'],he:'השפעה / אפקט'},experience:{answers:['חוויה','ניסיון'],he:'חוויה / ניסיון'},family:{answers:['משפחה'],he:'משפחה'},father:{answers:['אבא','אב'],he:'אבא / אב'},friend:{answers:['חבר','חברה'],he:'חבר / חברה'},good:{answers:['טוב'],he:'טוב'},home:{answers:['בית'],he:'בית'},important:{answers:['חשוב'],he:'חשוב'},know:{answers:['לדעת','מכיר'],he:'לדעת / להכיר'},life:{answers:['חיים'],he:'חיים'},market:{answers:['שוק'],he:'שוק'},money:{answers:['כסף'],he:'כסף'},mother:{answers:['אמא','אם'],he:'אמא / אם'},new:{answers:['חדש'],he:'חדש'},opportunity:{answers:['הזדמנות'],he:'הזדמנות'},people:{answers:['אנשים'],he:'אנשים'},read:{answers:['לקרוא'],he:'לקרוא'},school:{answers:['בית ספר'],he:'בית ספר'},speak:{answers:['לדבר'],he:'לדבר'},time:{answers:['זמן','פעם'],he:'זמן / פעם'},work:{answers:['עבודה','לעבוד'],he:'עבודה / לעבוד'},world:{answers:['עולם'],he:'עולם'},write:{answers:['לכתוב'],he:'לכתוב'}
};
let WORDS=[],queue=[],index=0,streak=0,currentMode='az';
const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const alphabetEl=document.getElementById('alphabet'),azSection=document.getElementById('azSection'),practiceSection=document.getElementById('practiceSection'),modeButtons=[...document.querySelectorAll('.mode-card')];
function loadStats(){return JSON.parse(localStorage.getItem('english100.stats')||'{"mastered":{},"mistakes":{},"seen":{},"correct":{}}')}
function saveStats(s){localStorage.setItem('english100.stats',JSON.stringify(s));updateCounts()}
function normalize(v){return(v||'').trim().toLowerCase().replace(/[.,!?:;״"']/g,'').replace(/\s+/g,' ')}
function updateCounts(){const s=loadStats();const el=document.getElementById('masteredCount');if(el)el.textContent=Object.keys(s.mastered||{}).length}
function setActiveMode(mode){currentMode=mode;modeButtons.forEach(b=>b.classList.toggle('active',b.dataset.mode===mode))}
function validWord(w){return /^[a-z]+$/.test(w)&&w.length>1}
async function loadWordBank(){
  try{
    const res=await fetch(SOURCE_URL,{cache:'no-store'}); if(!res.ok)throw new Error('word bank');
    const raw=await res.text();
    const clean=[...new Set(raw.split(/\r?\n/).map(x=>x.trim().toLowerCase()).filter(validWord))].slice(0,10000);
    WORDS=clean.map((word,rank)=>({word,rank,...(TRANSLATIONS[word]||{answers:[],he:''})}));
    localStorage.setItem('english100.wordBankSize',String(WORDS.length));
    buildAlphabet(); updateCounts();
  }catch(e){
    WORDS=Object.entries(TRANSLATIONS).map(([word,t],rank)=>({word,rank,...t}));
    buildAlphabet();
  }
}
function buildAlphabet(){
  alphabetEl.innerHTML='';
  alphabet.forEach(letter=>{
    const items=WORDS.filter(w=>w.word[0].toUpperCase()===letter);
    const b=document.createElement('button'); b.className='letter-btn'; b.innerHTML=`<span>${letter}</span><small>${items.length}</small>`;
    b.disabled=!items.length; b.addEventListener('click',()=>startLetter(letter)); alphabetEl.appendChild(b);
  });
}
modeButtons.forEach(btn=>btn.addEventListener('click',()=>{
  const mode=btn.dataset.mode; setActiveMode(mode);
  if(mode==='az'){azSection.classList.remove('hidden');practiceSection.classList.add('hidden');return}
  azSection.classList.add('hidden');
  if(mode==='mixed')startQueue(shuffle(WORDS).slice(0,30),'MIXED PRACTICE','Mixed vocabulary');
  if(mode==='mistakes'){const s=loadStats(),missed=WORDS.filter(w=>s.mistakes?.[w.word]);startQueue(missed.length?missed:shuffle(WORDS).slice(0,20),'MY MISTAKES','Mistake review')}
  if(mode==='review'){const s=loadStats(),review=WORDS.filter(w=>s.seen?.[w.word]&&!s.mastered?.[w.word]);startQueue(review.length?review:shuffle(WORDS).slice(0,20),'SMART REVIEW','Review')}
  if(mode==='level')startQueue(shuffle(WORDS).slice(0,25),'LEVEL TEST','Vocabulary level test');
}));
function shuffle(a){return [...a].sort(()=>Math.random()-.5)}
function startLetter(letter){const items=WORDS.filter(w=>w.word[0].toUpperCase()===letter);startQueue(items,'A–Z PRACTICE','Letter '+letter)}
function startQueue(items,label,title){queue=items;index=0;streak=0;document.getElementById('practiceModeLabel').textContent=label;document.getElementById('practiceTitle').textContent=title;azSection.classList.add('hidden');practiceSection.classList.remove('hidden');renderWord()}
function renderWord(){
  if(index>=queue.length){document.getElementById('currentWord').textContent='Done ✓';document.getElementById('wordPosition').textContent=queue.length+' / '+queue.length;document.getElementById('answerInput').disabled=true;return}
  const w=queue[index]; document.getElementById('currentWord').textContent=w.word;document.getElementById('wordPosition').textContent=(index+1)+' / '+queue.length;document.getElementById('streak').textContent='🔥 '+streak+' streak';
  const input=document.getElementById('answerInput'),check=document.getElementById('checkAnswer'),dk=document.getElementById('dontKnow'),f=document.getElementById('feedback'); input.value='';f.className='feedback hidden';f.innerHTML='';
  const translated=w.answers.length>0; input.disabled=!translated; check.disabled=!translated;
  document.querySelector('.question-card>p').textContent=translated?'Translate this word to Hebrew.':'This word is in the 10K bank. Translation enrichment is not ready yet.';
  input.placeholder=translated?'הקלד תרגום בעברית':'תרגום יתווסף בהמשך'; dk.textContent=translated?"I don't know":"Mark as seen"; if(translated)input.focus();
}
function evaluate(dontKnow=false){
  if(index>=queue.length)return; const w=queue[index],s=loadStats();s.seen=s.seen||{};s.mastered=s.mastered||{};s.mistakes=s.mistakes||{};s.correct=s.correct||{};s.seen[w.word]=(s.seen[w.word]||0)+1;
  if(!w.answers.length){saveStats(s);index++;renderWord();return}
  const typed=normalize(document.getElementById('answerInput').value),correct=!dontKnow&&w.answers.some(a=>typed===normalize(a)); const f=document.getElementById('feedback');f.className='feedback '+(correct?'good':'bad');
  if(correct){streak++;s.correct[w.word]=(s.correct[w.word]||0)+1;if(s.correct[w.word]>=3){s.mastered[w.word]=true;delete s.mistakes[w.word]}f.textContent=`✓ Correct — ${w.word} = ${w.he} · ${Math.min(s.correct[w.word],3)}/3 to master`}
  else{streak=0;s.correct[w.word]=Math.max(0,(s.correct[w.word]||0)-1);delete s.mastered[w.word];s.mistakes[w.word]=(s.mistakes[w.word]||0)+1;f.textContent=`✕ ${w.word} = ${w.he}`}
  saveStats(s);setTimeout(()=>{index++;renderWord()},850)
}
document.getElementById('checkAnswer').addEventListener('click',()=>evaluate(false));document.getElementById('dontKnow').addEventListener('click',()=>evaluate(true));document.getElementById('answerInput').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.target.disabled)evaluate(false)});document.getElementById('closePractice').addEventListener('click',()=>{practiceSection.classList.add('hidden');azSection.classList.remove('hidden');setActiveMode('az')});document.getElementById('speakWord').addEventListener('click',()=>{const text=document.getElementById('currentWord').textContent;if('speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.85;speechSynthesis.speak(u)}});
loadWordBank();