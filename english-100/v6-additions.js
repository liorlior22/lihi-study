const V6_ADDITIONS=[
  {word:'abbreviate',answers:['לקצר']},
  {word:'abdomen',answers:['בטן']},
  {word:'ability',answers:['יכולת']},
  {word:'abnormal',answers:['לא נורמלי']},
  {word:'abolish',answers:['לבטל']},
  {word:'absolute',answers:['מוחלט','מושלם']},
  {word:'absolutely',answers:['באופן מוחלט']},
  {word:'absorb',answers:['לקלוט','לספוג','להתעמק']},
  {word:'absorbent',answers:['בעל כושר ספיגה']},
  {word:'acceptable',answers:['מקובל']},
  {word:'account',answers:['חשבון']},
  {word:'admit',answers:['להכניס']},
  {word:'admittance',answers:['הכנסה']},
  {word:'ambiguity',answers:['דו משמעות']},
  {word:'appeal',answers:['לבקש']},
  {word:'approval',answers:['אישור']},
  {word:'argument',answers:['טיעון']},
  {word:'arouse',answers:['לעורר']},
  {word:'beef',answers:['בשר בקר']},
  {word:'bill',answers:['חשבון']},
  {word:'check',answers:['חשבון']},
  {word:'chicken',answers:['בשר עוף']},
  {word:'community',answers:['קהילה']},
  {word:'compassion',answers:['רחמים']},
  {word:'compatible',answers:['תואם']},
  {word:'compel',answers:['לכפות']},
  {word:'competent',answers:['כשיר']},
  {word:'competition',answers:['תחרות']},
  {word:'complete',answers:['להשלים']},
  {word:'complex',answers:['מורכב']},
  {word:'comprehend',answers:['להבין']},
  {word:'compromise',answers:['פשרה','להשלים']},
  {word:'concentration',answers:['התרכזות']},
  {word:'concept',answers:['רעיון']},
  {word:'concern',answers:['דאגה']},
  {word:'conclude',answers:['להסיק']},
  {word:'concrete',answers:['בטון']},
  {word:'condition',answers:['מצב']},
  {word:'conduct',answers:['להוביל','התנהגות']},
  {word:'conference',answers:['כנס']},
  {word:'confess',answers:['להודות']},
  {word:'confident',answers:['בטוח']},
  {word:'conflict',answers:['התנגדות']},
  {word:'confuse',answers:['לבלבל']},
  {word:'conquer',answers:['לכבוש']},
  {word:'consent',answers:['הסכמה']},
  {word:'consequence',answers:['השלכה']},
  {word:'conserve',answers:['לשמור']},
  {word:'consider',answers:['לשקול']},
  {word:'consistent',answers:['עקבי']},
  {word:'consumer',answers:['צרכן']},
  {word:'contemporary',answers:['עכשווי']},
  {word:'contribution',answers:['תרומה']},
  {word:'convenient',answers:['נוח']},
  {word:'conversation',answers:['שיחה']},
  {word:'cooperate',answers:['לשתף פעולה']},
  {word:'cutlery',answers:['סכו״ם']},
  {word:'dessert',answers:['קינוח']},
  {word:'main course',answers:['מנה עיקרית']},
  {word:'menu',answers:['תפריט']},
  {word:'napkin',answers:['מפית']},
  {word:'pitcher',answers:['קנקן']},
  {word:'pork',answers:['בשר חזיר']},
  {word:'side dish',answers:['תוספת']},
  {word:'starter',answers:['מנת פתיחה']},
  {word:'topping',answers:['תוספת']},
  {word:'waiter',answers:['מלצר']},
  {word:'waitress',answers:['מלצרית']}
];

const V6_BASE_LOADER=window.loadV2Bank;
window.loadV2Bank=async function(){
  const base=await V6_BASE_LOADER();
  const merged=new Map(base.map(item=>[item.word,{word:item.word,answers:[...item.answers]}]));
  for(const item of V6_ADDITIONS){
    if(!merged.has(item.word)) merged.set(item.word,{word:item.word,answers:[...item.answers]});
    else{
      const current=merged.get(item.word);
      for(const answer of item.answers) if(!current.answers.includes(answer)) current.answers.push(answer);
    }
  }
  return [...merged.values()].sort((a,b)=>a.word.localeCompare(b,'en'));
};