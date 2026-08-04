import{Suspense}from"react";import{RedHeader}from"../../../components/red-header";import{ExamLoader}from"../../../components/exam-loader";
export default function Run(){return <><RedHeader/><main className="exam-run-page"><Suspense fallback={<div className="exam-loading">טוען את הבחינה…</div>}><ExamLoader/></Suspense></main></>}
