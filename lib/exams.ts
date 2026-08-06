import type {ExamQuestion} from "../types/exam";
import y2013 from "../data/exams/western-medicine-2013.json";import y2014 from "../data/exams/western-medicine-2014.json";import y2015 from "../data/exams/western-medicine-2015.json";import y2016 from "../data/exams/western-medicine-2016.json";import y2017 from "../data/exams/western-medicine-2017.json";import y2018 from "../data/exams/western-medicine-2018.json";import y2019 from "../data/exams/western-medicine-2019.json";
import associationFoundationsData from "../data/exams/association-foundations.json";
import associationWesternData from "../data/exams/association-western.json";
import associationAcupunctureData from "../data/exams/association-acupuncture.json";
import associationPointLocationData from "../data/exams/association-point-location.json";
import associationHerbsData from "../data/exams/association-herbs.json";
import improvisedWestern1ExtraData from "../data/exams/improvised-western-1-extra.json";
import generatedWesternChatData from "../data/exams/western-chat-generated-100.json";
import {sourceExamQuestions} from "./source-exams";
export const questionsByYear:Record<number,ExamQuestion[]>={2013:y2013 as ExamQuestion[],2014:y2014 as ExamQuestion[],2015:y2015 as ExamQuestion[],2016:y2016 as ExamQuestion[],2017:y2017 as ExamQuestion[],2018:y2018 as ExamQuestion[],2019:y2019 as ExamQuestion[]};
export const allQuestions=Object.values(questionsByYear).flat();
export const associationQuestions:Record<string,ExamQuestion[]>={foundations:associationFoundationsData as ExamQuestion[],western:associationWesternData as ExamQuestion[],acupuncture:associationAcupunctureData as ExamQuestion[],"point-location":associationPointLocationData as ExamQuestion[],herbs:associationHerbsData as ExamQuestion[]};
export const improvisedQuestions:Record<string,ExamQuestion[]>={"western-1":[...(associationWesternData as ExamQuestion[]),...(improvisedWestern1ExtraData as ExamQuestion[])]};
export const generatedQuestions:Record<string,ExamQuestion[]>={"western-chat-100":generatedWesternChatData as ExamQuestion[]};
const sourceByPrefix=(prefix:string)=>Object.entries(sourceExamQuestions).filter(([key])=>key.startsWith(`${prefix}-`)).flatMap(([,questions])=>questions);

/**
 * Builds a stable fingerprint for duplicate detection.
 * Source PDFs sometimes contain the same question with different punctuation,
 * niqqud or OCR-created spaces inside words, so IDs and raw text are not enough.
 */
export function questionFingerprint(value:string){
  return value
    .normalize("NFKD")
    .replace(/[\u0591-\u05c7]/g,"")
    .toLocaleLowerCase("he")
    .replace(/[^\p{L}\p{N}]+/gu,"");
}

export function uniqueQuestions(questions:ExamQuestion[]){
  const seen=new Set<string>();
  return questions.filter(question=>{
    const fingerprint=questionFingerprint(question.question);
    if(!fingerprint||seen.has(fingerprint))return false;
    seen.add(fingerprint);
    return true;
  });
}

const streakFoundations=sourceByPrefix("foundations").slice(0,340);
const streakWestern=[...sourceByPrefix("western"),...allQuestions];
const streakAcupuncture=sourceByPrefix("acupuncture");
const streakQuestionCandidates=[...streakFoundations,...streakWestern,...streakAcupuncture];
export const streakQuestions:ExamQuestion[]=uniqueQuestions(streakQuestionCandidates);

export const mixedQuestions:Record<string,ExamQuestion[]>={
  foundations:uniqueQuestions(sourceByPrefix("foundations")),
  western:uniqueQuestions(allQuestions),
  acupuncture:uniqueQuestions(sourceByPrefix("acupuncture")),
  "point-location":uniqueQuestions(sourceByPrefix("point-location")),
  herbs:uniqueQuestions(sourceByPrefix("herbs")),
};
export const questionMap=new Map([...streakQuestions,...Object.values(associationQuestions).flat(),...Object.values(improvisedQuestions).flat()].map(q=>[q.id,q]));
