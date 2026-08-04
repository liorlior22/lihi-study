import topicsData from"../data/study/western-medicine-topics.json";import pagesData from"../data/study/source-pages.json";
export type StudyTopic=(typeof topicsData)[number];export type SourcePage={page:number;lines:string[]};export const studyTopics=topicsData;export const sourcePages=pagesData as SourcePage[];
export function pageNumbers(range:string){const values:number[]=[];for(const part of range.split(",")){const nums=part.trim().split(/[–-]/).map(Number);if(nums.length===2){for(let n=nums[0];n<=nums[1];n++)values.push(n)}else if(Number.isFinite(nums[0]))values.push(nums[0])}return values}
export function pagesForTopic(topic:StudyTopic){const wanted=new Set(pageNumbers(topic.pages));return sourcePages.filter(page=>wanted.has(page.page))}
const sectionPageOverrides:Record<string,Record<string,number>>={
  pregnancy:{"שינויים במערכות הגוף":1,"הריון מרובה עוברים":2,"הפרעות שליה ורעלת הריון":5,"סוכרת הריון":5},
  cardiovascular:{"זרימת הדם ומבנה הלב":7,"טרשת עורקים":7,"יתר לחץ דם":9,"מצבים איסכמיים":10,"בדיקות ותרופות":53},
  respiratory:{"אסתמה":12,"COPD":12,"שפעת ודלקת ריאות":61,"אלרגיות נשימתיות ואנפילקסיס":13,"טיפול תרופתי":68},
  digestive:{"עצירות ושלשול":14,"רפלוקס, גסטריטיס וכיב פפטי":16,"IBS ומחלות מעי דלקתיות":17,"כבד וכיס המרה":20},
  orthopedics:{"פגיעות מפרקים":21,"עמוד השדרה":22,"דלקות מפרקים":23,"טיפול בכאב":77},
  neurology:{"פרכוסים":25,"כאבי ראש":26,"זיהומים":27,"ירידה קוגניטיבית":28,"טיפול נוירולוגי ופסיכיאטרי":82},
  hematology:{"אנמיות":29,"ממאירויות המטולוגיות":30,"ספירת דם":42,"טסיות":46,"טיפול המטולוגי ואונקולוגי":79},
  endocrinology:{"בלוטת התריס":31,"Hyperthyroidism ו-Hypothyroidism":72,"Cushing וקורטיזול":31,"הורמונים ובדיקות תפקוד":55},
  diabetes:{"Type 1 ו-Type 2 Diabetes":49,"אבחון ו-HbA1c":56,"תסמונת מטבולית":33,"Hyperglycemia ו-Hypoglycemia":49,"Insulin וטיפול תרופתי":69},
  renal:{"מחלות דרכי השתן":37,"מאזן נוזלים":48,"אלקטרוליטים":49,"תפקודי כליה":51,"בדיקות שתן":56},
  reproduction:{"שחלות פוליציסטיות":38,"הורמוני מין":73,"בריאות הרבייה":74},
  imaging:{"צילום רנטגן":24,"טומוגרפיה ממוחשבת":24,"בחירת בדיקה":24},
  "red-flags":{"מצבי חירום":39,"סימני אזהרה":39,"הרעלות":76,"הפניה דחופה":39}
};
export function pageForSection(topic:StudyTopic,section:string,index:number){const pages=pagesForTopic(topic);if(!pages.length)return null;const override=sectionPageOverrides[topic.id]?.[section];if(override)return pages.find(page=>page.page===override)??null;const terms=section.split(/[\s,–-]+/).map(term=>term.replace(/^ו/,"")).filter(term=>term.length>2);const ranked=pages.map(page=>({page,score:terms.filter(term=>page.lines.join(" ").includes(term)).length})).sort((a,b)=>b.score-a.score||a.page.page-b.page.page);if(ranked[0].score>0)return ranked[0].page;return pages[Math.min(pages.length-1,Math.floor(index*pages.length/topic.sections.length))]}
export function cleanLines(lines:string[]){return lines.filter(line=>line!=="o"&&!/^\d{1,2}$/.test(line)&&line!=="מבחן מסכם 2022")}
export function studyIdForExamTopic(topic:string){const map:Record<string,string>={"קרדיולוגיה":"cardiovascular","בריאות האישה":"pregnancy","כליות ודרכי השתן":"renal","מערכת העיכול":"digestive"};return map[topic]}
