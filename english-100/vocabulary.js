const WORDS=[
{word:'able',answers:['מסוגל','יכול','יכולה','יכולים'],he:'מסוגל / יכול'},
{word:'about',answers:['על','בנושא','אודות'],he:'על / בנושא'},
{word:'above',answers:['מעל','למעלה'],he:'מעל'},
{word:'abroad',answers:['בחול','חו״ל','חול','מחוץ לארץ','בחוץ לארץ'],he:'בחו״ל / מחוץ לארץ'},
{word:'absence',answers:['היעדרות','חוסר','העדרות'],he:'היעדרות / חוסר'},
{word:'absolute',answers:['מוחלט','אבסולוטי'],he:'מוחלט'},
{word:'abstract',answers:['מופשט'],he:'מופשט'},
{word:'abuse',answers:['התעללות','ניצול לרעה','שימוש לרעה'],he:'התעללות / ניצול לרעה'},
{word:'academic',answers:['אקדמי'],he:'אקדמי'},
{word:'accept',answers:['לקבל','לאשר'],he:'לקבל / להסכים לקבל'},
{word:'access',answers:['גישה'],he:'גישה'},
{word:'accident',answers:['תאונה'],he:'תאונה'},
{word:'according',answers:['לפי','בהתאם','בהתאם ל'],he:'לפי / בהתאם ל־'},
{word:'account',answers:['חשבון'],he:'חשבון'},
{word:'achieve',answers:['להשיג','להגיע להישג'],he:'להשיג / להגיע להישג'},
{word:'achievement',answers:['הישג'],he:'הישג'},
{word:'acknowledge',answers:['להודות','להכיר','להכיר ב','לאשר'],he:'להכיר ב־ / להודות ב־'},
{word:'acquire',answers:['לרכוש','להשיג'],he:'לרכוש / להשיג'},
{word:'across',answers:['לרוחב','מעבר','מצד לצד'],he:'לרוחב / מצד לצד'},
{word:'act',answers:['לפעול','מעשה','לשחק'],he:'לפעול / מעשה'},
{word:'action',answers:['פעולה'],he:'פעולה'},
{word:'active',answers:['פעיל'],he:'פעיל'},
{word:'activity',answers:['פעילות'],he:'פעילות'},
{word:'actual',answers:['אמיתי','ממשי','בפועל'],he:'אמיתי / ממשי'},
{word:'actually',answers:['למעשה','בעצם','בפועל'],he:'למעשה / בעצם'},
{word:'add',answers:['להוסיף'],he:'להוסיף'},
{word:'addition',answers:['הוספה','תוספת'],he:'הוספה / תוספת'},
{word:'additional',answers:['נוסף','נוספת','נוספים'],he:'נוסף'},
{word:'address',answers:['כתובת','לפנות','לטפל'],he:'כתובת / לפנות אל / לטפל ב־'},
{word:'administration',answers:['ניהול','מנהלה','ממשל'],he:'ניהול / מנהלה / ממשל'},
{word:'admit',answers:['להודות','להכניס','לקבל'],he:'להודות / לקבל למוסד'},
{word:'adult',answers:['מבוגר','בוגר'],he:'מבוגר / בוגר'},
{word:'advance',answers:['להתקדם','קידום','מקדמה'],he:'להתקדם / קידום'},
{word:'advantage',answers:['יתרון'],he:'יתרון'},
{word:'adventure',answers:['הרפתקה'],he:'הרפתקה'},
{word:'advertise',answers:['לפרסם'],he:'לפרסם'},
{word:'advertisement',answers:['פרסומת','מודעה'],he:'פרסומת / מודעה'},
{word:'advice',answers:['עצה'],he:'עצה'},
{word:'advise',answers:['לייעץ','לתת עצה'],he:'לייעץ'},
{word:'affect',answers:['להשפיע'],he:'להשפיע'},
{word:'afford',answers:['להרשות לעצמך','להרשות לעצמי','להרשות'],he:'להרשות לעצמך (בדרך כלל כלכלית)'},
{word:'afraid',answers:['מפחד','פוחד','חושש'],he:'מפחד / חושש'},
{word:'after',answers:['אחרי','לאחר'],he:'אחרי / לאחר'},
{word:'afternoon',answers:['אחר הצהריים'],he:'אחר הצהריים'},
{word:'again',answers:['שוב'],he:'שוב'},
{word:'against',answers:['נגד'],he:'נגד'},
{word:'age',answers:['גיל'],he:'גיל'},
{word:'agency',answers:['סוכנות'],he:'סוכנות'},
{word:'agenda',answers:['סדר יום','אגנדה'],he:'סדר יום'},
{word:'agent',answers:['סוכן'],he:'סוכן'},
{word:'agree',answers:['להסכים'],he:'להסכים'},
{word:'agreement',answers:['הסכם','הסכמה'],he:'הסכם / הסכמה'},
{word:'ahead',answers:['קדימה','לפנים','לפני'],he:'קדימה / לפני'},
{word:'aim',answers:['מטרה','לכוון'],he:'מטרה / לכוון'},
{word:'air',answers:['אוויר'],he:'אוויר'},
{word:'allow',answers:['לאפשר','להרשות'],he:'לאפשר / להרשות'},
{word:'almost',answers:['כמעט'],he:'כמעט'},
{word:'alone',answers:['לבד'],he:'לבד'},
{word:'along',answers:['לאורך','יחד עם'],he:'לאורך / יחד עם'},
{word:'already',answers:['כבר'],he:'כבר'},
{word:'although',answers:['למרות ש','אף על פי ש'],he:'למרות ש־ / אף על פי ש־'},
{word:'always',answers:['תמיד'],he:'תמיד'},
{word:'amazing',answers:['מדהים','מדהימה'],he:'מדהים'},
{word:'amount',answers:['כמות','סכום'],he:'כמות / סכום'},
{word:'analysis',answers:['ניתוח'],he:'ניתוח'},
{word:'announce',answers:['להכריז','להודיע'],he:'להכריז / להודיע'},
{word:'answer',answers:['תשובה','לענות'],he:'תשובה / לענות'},
{word:'anxiety',answers:['חרדה'],he:'חרדה'},
{word:'any',answers:['כל','איזשהו','כלשהו'],he:'כל / כלשהו'},
{word:'anyone',answers:['מישהו','כל אחד'],he:'מישהו / כל אחד'},
{word:'anything',answers:['משהו','כל דבר'],he:'משהו / כל דבר'},
{word:'anyway',answers:['בכל מקרה'],he:'בכל מקרה'},
{word:'apart',answers:['בנפרד','לחוד'],he:'בנפרד / לחוד'},
{word:'apartment',answers:['דירה'],he:'דירה'},
{word:'apologize',answers:['להתנצל'],he:'להתנצל'},
{word:'appear',answers:['להופיע','להיראות'],he:'להופיע / להיראות'},
{word:'apply',answers:['להגיש מועמדות','להחיל','ליישם'],he:'להגיש / להחיל / ליישם'},
{word:'approach',answers:['גישה','להתקרב'],he:'גישה / להתקרב'},
{word:'approve',answers:['לאשר'],he:'לאשר'},
{word:'area',answers:['אזור','שטח'],he:'אזור / שטח'},
{word:'argue',answers:['להתווכח','לטעון'],he:'להתווכח / לטעון'},
{word:'argument',answers:['ויכוח','טיעון'],he:'ויכוח / טיעון'},
{word:'around',answers:['מסביב','סביב','בערך'],he:'מסביב / בערך'},
{word:'arrange',answers:['לארגן','לסדר'],he:'לארגן / לסדר'},
{word:'arrive',answers:['להגיע'],he:'להגיע'},
{word:'article',answers:['מאמר','כתבה','פריט'],he:'מאמר / כתבה'},
{word:'ask',answers:['לשאול','לבקש'],he:'לשאול / לבקש'},
{word:'assist',answers:['לסייע','לעזור'],he:'לסייע / לעזור'},
{word:'assume',answers:['להניח'],he:'להניח'},
{word:'attention',answers:['תשומת לב'],he:'תשומת לב'},
{word:'attitude',answers:['גישה','יחס'],he:'גישה / יחס'},
{word:'available',answers:['זמין','פנוי'],he:'זמין / פנוי'},
{word:'average',answers:['ממוצע'],he:'ממוצע'},
{word:'avoid',answers:['להימנע','להתחמק'],he:'להימנע / להתחמק'},
{word:'aware',answers:['מודע'],he:'מודע'},
{word:'away',answers:['הרחק','משם'],he:'הרחק / משם'},
{word:'baby',answers:['תינוק','תינוקת'],he:'תינוק / תינוקת'},
{word:'back',answers:['גב','חזרה','מאחור'],he:'גב / חזרה / מאחור'},
{word:'bad',answers:['רע'],he:'רע'},
{word:'balance',answers:['איזון','יתרה'],he:'איזון / יתרה'},
{word:'basic',answers:['בסיסי'],he:'בסיסי'},
{word:'beautiful',answers:['יפה'],he:'יפה'},
{word:'because',answers:['כי','בגלל ש'],he:'כי / בגלל ש־'},
{word:'become',answers:['להפוך','להפוך ל'],he:'להפוך ל־'},
{word:'before',answers:['לפני'],he:'לפני'},
{word:'begin',answers:['להתחיל'],he:'להתחיל'},
{word:'behavior',answers:['התנהגות'],he:'התנהגות'},
{word:'believe',answers:['להאמין'],he:'להאמין'},
{word:'belong',answers:['להיות שייך','שייך'],he:'להיות שייך'},
{word:'below',answers:['מתחת','למטה'],he:'מתחת'},
{word:'benefit',answers:['תועלת','יתרון','להועיל'],he:'תועלת / יתרון'},
{word:'best',answers:['הטוב ביותר','הכי טוב'],he:'הטוב ביותר'},
{word:'better',answers:['טוב יותר','יותר טוב'],he:'טוב יותר'},
{word:'between',answers:['בין'],he:'בין'},
{word:'beyond',answers:['מעבר ל','מעבר'],he:'מעבר ל־'},
{word:'big',answers:['גדול'],he:'גדול'},
{word:'business',answers:['עסק','עסקים'],he:'עסק / עסקים'},
{word:'busy',answers:['עסוק','עמוס'],he:'עסוק / עמוס'},
{word:'buy',answers:['לקנות'],he:'לקנות'},
{word:'call',answers:['להתקשר','לקרוא','שיחה'],he:'להתקשר / לקרוא / שיחה'},
{word:'calm',answers:['רגוע','להירגע'],he:'רגוע / להירגע'},
{word:'care',answers:['אכפתיות','לטפל','לדאוג'],he:'לטפל / לדאוג'},
{word:'careful',answers:['זהיר'],he:'זהיר'},
{word:'carry',answers:['לשאת','לסחוב'],he:'לשאת / לסחוב'},
{word:'cause',answers:['סיבה','לגרום'],he:'סיבה / לגרום'},
{word:'certain',answers:['מסוים','בטוח'],he:'מסוים / בטוח'},
{word:'change',answers:['שינוי','לשנות'],he:'שינוי / לשנות'},
{word:'choose',answers:['לבחור'],he:'לבחור'},
{word:'clear',answers:['ברור','לנקות'],he:'ברור / לנקות'},
{word:'close',answers:['לסגור','קרוב'],he:'לסגור / קרוב'},
{word:'company',answers:['חברה'],he:'חברה'},
{word:'compare',answers:['להשוות'],he:'להשוות'},
{word:'complete',answers:['להשלים','מלא','שלם'],he:'להשלים / מלא'},
{word:'consider',answers:['לשקול','להחשיב'],he:'לשקול'},
{word:'continue',answers:['להמשיך'],he:'להמשיך'},
{word:'control',answers:['שליטה','לשלוט'],he:'שליטה / לשלוט'},
{word:'correct',answers:['נכון','לתקן'],he:'נכון / לתקן'},
{word:'create',answers:['ליצור','לייצר'],he:'ליצור'},
{word:'current',answers:['נוכחי','עכשווי'],he:'נוכחי / עכשווי'}
];

const alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const alphabetEl=document.getElementById('alphabet');
const azSection=document.getElementById('azSection');
const practiceSection=document.getElementById('practiceSection');
const modeButtons=[...document.querySelectorAll('.mode-card')];
let queue=[],index=0,streak=0,currentMode='az';

function defaultStats(){return{mastered:{},mistakes:{},seen:{},correct:{}}}
function loadStats(){try{return{...defaultStats(),...JSON.parse(localStorage.getItem('english100.stats')||'{}')}}catch{return defaultStats()}}
function saveStats(s){localStorage.setItem('english100.stats',JSON.stringify(s));updateCounts()}
function updateCounts(){const s=loadStats(),el=document.getElementById('masteredCount');if(el)el.textContent=Object.keys(s.mastered||{}).length}
function normalize(v){return(v||'').trim().toLowerCase().replace(/[.,!?:;״"']/g,'').replace(/\s+/g,' ')}
function setActiveMode(mode){currentMode=mode;modeButtons.forEach(b=>b.classList.toggle('active',b.dataset.mode===mode))}
function masteryLabel(word){const s=loadStats(),c=s.correct?.[word]||0,m=s.mistakes?.[word]||0;if(s.mastered?.[word])return'✓ Mastered';if(c===0&&m===0)return'New';if(c>=2)return'Almost there';if(m>0)return'Needs review';return'Learning'}

alphabet.forEach(letter=>{const b=document.createElement('button');b.className='letter-btn';const count=WORDS.filter(w=>w.word[0].toUpperCase()===letter).length;b.innerHTML=`<span>${letter}</span>${count?`<small style="display:block;font-size:10px;font-weight:600;opacity:.55;margin-top:2px">${count}</small>`:''}`;b.disabled=!count;if(!count)b.style.opacity='.32';b.addEventListener('click',()=>startLetter(letter));alphabetEl.appendChild(b)});

modeButtons.forEach(btn=>btn.addEventListener('click',()=>{const mode=btn.dataset.mode;setActiveMode(mode);if(mode==='az'){azSection.classList.remove('hidden');practiceSection.classList.add('hidden');return}azSection.classList.add('hidden');if(mode==='mixed')startQueue([...WORDS].sort(()=>Math.random()-.5).slice(0,30),'MIXED PRACTICE','Mixed vocabulary');if(mode==='mistakes'){const s=loadStats(),missed=WORDS.filter(w=>s.mistakes?.[w.word]);startQueue(missed,'MY MISTAKES','Mistake review')}if(mode==='review'){const s=loadStats(),review=WORDS.filter(w=>s.seen?.[w.word]&&!s.mastered?.[w.word]);startQueue(review,'SMART REVIEW','Review')}if(mode==='level')startQueue([...WORDS].sort(()=>Math.random()-.5).slice(0,25),'LEVEL TEST','Vocabulary level test')}));

function startLetter(letter){const items=WORDS.filter(w=>w.word[0].toUpperCase()===letter);startQueue(items,'A–Z PRACTICE','Letter '+letter)}
function startQueue(items,label,title){queue=items;index=0;streak=0;document.getElementById('practiceModeLabel').textContent=label;document.getElementById('practiceTitle').textContent=title;azSection.classList.add('hidden');practiceSection.classList.remove('hidden');renderWord()}
function renderWord(){const input=document.getElementById('answerInput'),f=document.getElementById('feedback');f.className='feedback hidden';f.innerHTML='';if(!queue.length){document.getElementById('currentWord').textContent='Nothing to review ✓';document.getElementById('wordPosition').textContent='0 / 0';input.disabled=true;return}if(index>=queue.length){document.getElementById('currentWord').textContent='Session complete ✓';document.getElementById('wordPosition').textContent=queue.length+' / '+queue.length;input.disabled=true;return}const w=queue[index];document.getElementById('currentWord').textContent=w.word;document.getElementById('wordPosition').textContent=(index+1)+' / '+queue.length+' · '+masteryLabel(w.word);document.getElementById('streak').textContent='🔥 '+streak+' streak';input.value='';input.disabled=false;input.focus()}
function isCorrectAnswer(w,typed){return w.answers.some(a=>{const n=normalize(a);return typed===n||typed===normalize('ל'+a)||typed===normalize('ה'+a)})}
function evaluate(dontKnow=false){if(index>=queue.length)return;const w=queue[index],typed=normalize(document.getElementById('answerInput').value),correct=!dontKnow&&isCorrectAnswer(w,typed),s=loadStats();s.seen[w.word]=(s.seen[w.word]||0)+1;s.correct[w.word]=s.correct[w.word]||0;const f=document.getElementById('feedback');f.className='feedback '+(correct?'good':'bad');if(correct){streak++;s.correct[w.word]+=1;if(s.correct[w.word]>=3){s.mastered[w.word]=true;delete s.mistakes[w.word];f.textContent='✓ Mastered — '+w.word+' = '+w.he}else{f.textContent=`✓ Correct ${s.correct[w.word]}/3 — ${w.word} = ${w.he}`}}else{streak=0;s.mistakes[w.word]=(s.mistakes[w.word]||0)+1;delete s.mastered[w.word];s.correct[w.word]=Math.max(0,s.correct[w.word]-1);f.textContent='✕ '+w.word+' = '+w.he+' · This word was added to My Mistakes'}saveStats(s);setTimeout(()=>{index++;renderWord()},1050)}

document.getElementById('checkAnswer').addEventListener('click',()=>evaluate(false));
document.getElementById('dontKnow').addEventListener('click',()=>evaluate(true));
document.getElementById('answerInput').addEventListener('keydown',e=>{if(e.key==='Enter')evaluate(false)});
document.getElementById('closePractice').addEventListener('click',()=>{practiceSection.classList.add('hidden');azSection.classList.remove('hidden');setActiveMode('az')});
document.getElementById('speakWord').addEventListener('click',()=>{const text=document.getElementById('currentWord').textContent;if('speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.85;speechSynthesis.speak(u)}});
updateCounts();
