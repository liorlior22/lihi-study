"use client";

import { useState } from "react";
import type { Patient } from "../../clinic-data";
import { TreatmentList } from "./treatment-list";

type Tab = "overview" | "treatments" | "questionnaire" | "payments" | "files";

export function PatientTabs({ patient }: { patient: Patient }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <>
      <div className="patient-tabs" aria-label="כרטיסיות מטופל">
        <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>סקירה</button>
        <button className={activeTab === "treatments" ? "active" : ""} onClick={() => setActiveTab("treatments")}>טיפולים ({patient.treatments})</button>
        <button className={activeTab === "questionnaire" ? "active" : ""} onClick={() => setActiveTab("questionnaire")}>שאלון ראשוני</button>
        <button className={activeTab === "payments" ? "active" : ""} onClick={() => setActiveTab("payments")}>תשלומים</button>
        <button className={activeTab === "files" ? "active" : ""} onClick={() => setActiveTab("files")}>קבצים</button>
      </div>

      {activeTab === "overview" && (
        <div className="patient-content">
          <div className="info-stack">
            <article className="clinic-card info-block">
              <div className="clinic-section-title"><h2>היכרות ואפיון</h2><button className="clinic-primary">עריכה</button></div>
              <h3>רקע משפחתי</h3><p>{patient.family}</p>
              <hr style={{border:0,borderTop:"1px solid #edf0ea",margin:"18px 0"}} />
              <h3>תחביבים ואורח חיים</h3><p>{patient.hobbies}</p>
              <hr style={{border:0,borderTop:"1px solid #edf0ea",margin:"18px 0"}} />
              <h3>האפיון של ליהי</h3><p>{patient.profile}</p>
            </article>
          </div>

          <aside>
            <div className="reminder-card">
              <span>לפני שהמטופל נכנס · 20 שניות</span>
              <h3>מה חשוב לזכור היום?</h3>
              <p>{patient.reminder}</p>
            </div>
            <div className="clinic-card" style={{marginTop:16}}>
              <div className="clinic-section-title"><h2>תשלום</h2><span className={patient.balance ? "status-pill new" : "status-pill"}>{patient.balance ? "פתוח" : "מסודר"}</span></div>
              <p style={{margin:0,color:"#6e7973"}}>יתרה נוכחית</p>
              <strong style={{display:"block",fontSize:28,marginTop:6}}>{patient.balance ? `₪${patient.balance}` : "₪0"}</strong>
            </div>
          </aside>
        </div>
      )}

      {activeTab === "treatments" && (
        <article className="clinic-card">
          <div className="clinic-section-title">
            <div>
              <h2>טיפולים של {patient.name}</h2>
              <p style={{margin:"5px 0 0",color:"#7c8781"}}>תאריכים, תשלום והערות לכל טיפול.</p>
            </div>
            <button className="clinic-primary">+ טיפול חדש</button>
          </div>
          <TreatmentList treatments={patient.treatmentHistory} />
        </article>
      )}

      {activeTab === "questionnaire" && (
        <article className="clinic-card info-block">
          <div className="clinic-section-title"><h2>שאלון ראשוני</h2></div>
          <p>כאן יוצג שאלון הקליטה של המטופל ונוכל בהמשך לשלוח שאלונים נוספים.</p>
        </article>
      )}

      {activeTab === "payments" && (
        <article className="clinic-card info-block">
          <div className="clinic-section-title"><h2>תשלומים</h2></div>
          <p>יתרה נוכחית: <strong>{patient.balance ? `₪${patient.balance}` : "₪0"}</strong></p>
        </article>
      )}

      {activeTab === "files" && (
        <article className="clinic-card info-block">
          <div className="clinic-section-title"><h2>קבצים</h2></div>
          <p>כאן נוסיף בהמשך בדיקות, מסמכים, תמונות וקבצים של המטופל.</p>
        </article>
      )}
    </>
  );
}
