import categoriesData from "../data/study/formula-categories.json";
import pageLabelsData from "../data/study/formula-page-labels.json";
export type FormulaSubtopic={id:string;title:string;pages:string};
export type FormulaCategory={id:string;title:string;summary:string;pages:string;subtopics:FormulaSubtopic[]};
export const formulaCategories=categoriesData as FormulaCategory[];
export function formulaPageNumbers(range:string){const result:number[]=[];for(const part of range.split(",")){const [a,b]=part.trim().split(/[–-]/).map(Number);if(Number.isFinite(b)){for(let n=a;n<=b;n++)result.push(n)}else if(Number.isFinite(a))result.push(a)}return result}
export function formulaCategory(id:string){return formulaCategories.find(category=>category.id===id)}
export function formulaSubtopic(category:FormulaCategory,id:string){return category.subtopics.find(item=>item.id===id)}
export const formulaPageLabels=pageLabelsData as Record<string,string>;
export function formulaPageLabel(page:number){return formulaPageLabels[String(page)]??`עמוד ${page}`}
