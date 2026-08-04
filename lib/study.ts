import topicsData from"../data/study/western-medicine-topics.json";import pagesData from"../data/study/source-pages.json";
export type StudyTopic=(typeof topicsData)[number];export type SourcePage={page:number;lines:string[]};export const studyTopics=topicsData;export const sourcePages=pagesData as SourcePage[];
export function pageNumbers(range:string){const values:number[]=[];for(const part of range.split(",")){const nums=part.trim().split(/[–-]/).map(Number);if(nums.length===2){for(let n=nums[0];n<=nums[1];n++)values.push(n)}else if(Number.isFinite(nums[0]))values.push(nums[0])}return values}
export function pagesForTopic(topic:StudyTopic){const wanted=new Set(pageNumbers(topic.pages));return sourcePages.filter(page=>wanted.has(page.page))}
export function cleanLines(lines:string[]){return lines.filter(line=>line!=="o"&&!/^\d{1,2}$/.test(line)&&line!=="מבחן מסכם 2022")}
export function studyIdForExamTopic(topic:string){const map:Record<string,string>={"קרדיולוגיה":"cardiovascular","בריאות האישה":"pregnancy","כליות ודרכי השתן":"renal","מערכת העיכול":"digestive"};return map[topic]}
