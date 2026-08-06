import categoriesData from "../data/study/herb-categories.json";
import pageLabelsData from "../data/study/herb-page-labels.json";
export type HerbSubtopic={id:string;title:string;pages:string};
export type HerbCategory={id:string;title:string;summary:string;pages:string;subtopics:HerbSubtopic[]};
export const herbCategories=categoriesData as HerbCategory[];
export function herbPageNumbers(range:string){const result:number[]=[];for(const part of range.split(",")){const [a,b]=part.trim().split(/[–-]/).map(Number);if(Number.isFinite(b)){for(let n=a;n<=b;n++)result.push(n)}else if(Number.isFinite(a))result.push(a)}return result}
export function herbCategory(id:string){return herbCategories.find(category=>category.id===id)}
export function herbSubtopic(category:HerbCategory,id:string){return category.subtopics.find(item=>item.id===id)}

export const herbPageLabels=pageLabelsData as Record<string,string>;
export function herbPageLabel(page:number){return herbPageLabels[String(page)] ?? `עמוד ${page}`}
