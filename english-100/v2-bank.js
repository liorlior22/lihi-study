const V4_BANK=[
  {word:'apple',answers:['תפוח']},
  {word:'book',answers:['ספר']},
  {word:'car',answers:['מכונית','רכב']},
  {word:'dog',answers:['כלב']},
  {word:'eat',answers:['לאכול']},
  {word:'friend',answers:['חבר','חברה']},
  {word:'good',answers:['טוב']},
  {word:'house',answers:['בית']},
  {word:'important',answers:['חשוב']},
  {word:'job',answers:['עבודה','משרה']},
  {word:'know',answers:['לדעת','להכיר']},
  {word:'love',answers:['אהבה','לאהוב']},
  {word:'money',answers:['כסף']},
  {word:'night',answers:['לילה']},
  {word:'open',answers:['לפתוח','פתוח']},
  {word:'people',answers:['אנשים']},
  {word:'question',answers:['שאלה']},
  {word:'right',answers:['נכון','ימין']},
  {word:'school',answers:['בית ספר']},
  {word:'time',answers:['זמן','פעם']},
  {word:'under',answers:['מתחת']},
  {word:'very',answers:['מאוד']},
  {word:'water',answers:['מים']},
  {word:'xylophone',answers:['קסילופון']},
  {word:'yellow',answers:['צהוב']},
  {word:'zoo',answers:['גן חיות']}
];

window.loadV2Bank=async function(){
  return V4_BANK.map(item=>({word:item.word,answers:[...item.answers]}));
};