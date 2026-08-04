import type {ExamQuestion} from "../types/exam";
import y2013 from "../data/exams/western-medicine-2013.json";import y2014 from "../data/exams/western-medicine-2014.json";import y2015 from "../data/exams/western-medicine-2015.json";import y2016 from "../data/exams/western-medicine-2016.json";import y2017 from "../data/exams/western-medicine-2017.json";import y2018 from "../data/exams/western-medicine-2018.json";import y2019 from "../data/exams/western-medicine-2019.json";
export const questionsByYear:Record<number,ExamQuestion[]>={2013:y2013 as ExamQuestion[],2014:y2014 as ExamQuestion[],2015:y2015 as ExamQuestion[],2016:y2016 as ExamQuestion[],2017:y2017 as ExamQuestion[],2018:y2018 as ExamQuestion[],2019:y2019 as ExamQuestion[]};
export const allQuestions=Object.values(questionsByYear).flat();
export const questionMap=new Map(allQuestions.map(q=>[q.id,q]));
