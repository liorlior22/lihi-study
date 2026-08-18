"use client";

import { useState } from "react";
import type { Patient } from "../../clinic-data";
import { PatientOverview } from "./patient-overview";

type Tab = "overview" | "questionnaire" | "payments" | "files";

export function PatientTabs({ patient }: { patient: Patient }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <>
      <div className="patient-tabs" aria-label="כרטיסיות מטופל">
        <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>סקירה</button>
        <button className={activeTab === "questionnaire" ? "active" : ""} onClick={() => setActiveTab("questionnaire")}>שאלון ראשוני</button>
        <button className={activeTab === "payments" ? "active" : ""} onClick={() => setActiveTab("payments")}>תשלומים</button>
        <button className={activeTab === "files" ? "active" : ""} onClick={() => setActiveTab("files")}>קבצים</button>
      </div>

      {activeTab === "overview" && (
        <div className="patient-content">
          <div className="info-stack">
            <PatientOverview patient={patient} />
          </div>

          <aside>
            <div className="reminder-card">
              <span>לפני שהמטופל נכנס · 20 שניות</span>
              <h3>מה חשוב לזכור היום?</h3>
              <p>{patient.reminder}</p>
            </div>
            <div className="clinic-card" style={{ marginTop: 16 }}>
              <div className="clinic-section-title">
                <h2>תשלום</h2>
                <span className={patient.balance ? "status-pill new" : "status-pill"}>{patient.balance ? "פתוח" : "מסודר"}</span>
              </div>
              <p style={{ margin: 0, color: "#6e7973" }}>יתרה נוכחית</p>
              <strong style={{ display: "block", fontSize: 28, marginTop: 6 }}>{patient.balance ? `₪${patient.balance}` : "₪0"}</strong>
            </div>
          </aside>
        </div>
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
