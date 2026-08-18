"use client";

import { useState } from "react";
import type { Patient } from "../../clinic-data";
import { getPatientTreatmentPrice } from "../../pricing-data";
import { PatientOverview } from "./patient-overview";
import { TreatmentList } from "./treatment-list";
import { PatientPackageCard } from "./patient-package-card";

type Tab = "overview" | "treatments" | "questionnaire" | "payments" | "files";

export function PatientTabs({ patient }: { patient: Patient }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [treatmentPrice, setTreatmentPrice] = useState(() => getPatientTreatmentPrice(patient.id));

  return (
    <>
      <div className="patient-tabs" aria-label="כרטיסיות מטופל">
        <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>סקירה</button>
        <button className={activeTab === "treatments" ? "active" : ""} onClick={() => setActiveTab("treatments")}>מעקב טיפולים</button>
        <button className={activeTab === "questionnaire" ? "active" : ""} onClick={() => setActiveTab("questionnaire")}>שאלון ראשוני</button>
        <button className={activeTab === "payments" ? "active" : ""} onClick={() => setActiveTab("payments")}>תשלומים</button>
        <button className={activeTab === "files" ? "active" : ""} onClick={() => setActiveTab("files")}>קבצים</button>
      </div>

      {activeTab === "overview" && (
        <div className="patient-content">
          <div className="info-stack">
            <PatientOverview
              patient={patient}
              treatmentPrice={treatmentPrice}
              onTreatmentPriceChange={setTreatmentPrice}
            />
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
              <p style={{ margin: 0, color: "#6e7973" }}>מחיר טיפול נוכחי</p>
              <strong style={{ display: "block", fontSize: 28, marginTop: 6 }}>₪{treatmentPrice}</strong>
              <p style={{ margin: "12px 0 0", color: "#6e7973", fontSize: 13 }}>
                יתרה פתוחה: <strong>{patient.balance ? `₪${patient.balance}` : "₪0"}</strong>
              </p>
            </div>
            <PatientPackageCard />
          </aside>
        </div>
      )}

      {activeTab === "treatments" && (
        <article className="clinic-card">
          <TreatmentList
            treatments={patient.treatmentHistory}
            defaultTreatmentPrice={treatmentPrice}
          />
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
          <div className="clinic-section-title">
            <h2>תשלומים</h2>
            <span className={patient.balance ? "status-pill new" : "status-pill"}>{patient.balance ? "פתוח" : "מסודר"}</span>
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <span style={{ display: "block", color: "#7c8781", fontSize: 12, fontWeight: 800 }}>מחיר טיפול נוכחי</span>
              <strong style={{ display: "block", marginTop: 5, fontSize: 26 }}>₪{treatmentPrice}</strong>
              <small style={{ display: "block", marginTop: 5, color: "#7c8781" }}>זה המחיר שייפתח אוטומטית לכל טיפול חדש מעכשיו.</small>
            </div>
            <div style={{ borderTop: "1px solid #edf0ea", paddingTop: 14 }}>
              <span style={{ display: "block", color: "#7c8781", fontSize: 12, fontWeight: 800 }}>יתרה נוכחית</span>
              <strong style={{ display: "block", marginTop: 5, fontSize: 22 }}>{patient.balance ? `₪${patient.balance}` : "₪0"}</strong>
            </div>
          </div>
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
