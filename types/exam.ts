export type AnswerId = "א" | "ב" | "ג" | "ד";
export type ExamOption = { id: AnswerId; text: string };
export type ExamQuestion = {
  id: string; year: number; subject: string; topic: string; questionNumber: number;
  question: string; options: ExamOption[]; correctAnswer: AnswerId; explanation: string; source: string;
};
export type SavedAttempt = { questionId:string; selected:AnswerId|null; correct:boolean; checkedImmediately:boolean };
export type ExamSession = { key:string; title:string; questionIds:string[]; index:number; attempts:SavedAttempt[]; startedAt:number; started:boolean; completedAt?:number };
