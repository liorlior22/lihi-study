"use client";

import { useState } from "react";
import type { Patient } from "../../clinic-data";

export function PatientProfileHeader({ patient }: { patient: Patient }) {
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState(patient.phone);
  const [age, setAge] = useState(String(patient.age));
  const [heightCm, setHeightCm] = useState(patient.heightCm ? String(patient.heightCm) : "");
  const [weightKg, setWeightKg] = useState(patient.weightKg ? String(patient.weightKg) : "");
  const [photo, setPhoto] = useState<string | null>(null);

  function handlePhoto(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  }

  return (
    <header className="patient-hero patient-profile-editor">
      <div className="patient-photo-wrap">
        <div className="patient-avatar patient-photo-avatar">
          {photo ? <img src={photo} alt={`תמונה של ${patient.name}`} /> : patient.initials}
        </div>
        <label className="patient-photo-upload">
          העלאת תמונה
          <input type="file" accept="image/*" onChange={(event) => handlePhoto(event.target.files?.[0])} />
        </label>
      </div>

      <div className="patient-profile-main">
        <div className="patient-profile-name-row">
          <div>
            <h1>{patient.name}</h1>
            <p>{patient.occupation}</p>
          </div>
          <button type="button" className="patient-edit-button" onClick={() => setEditing((value) => !value)}>
            {editing ? "סיום עריכה" : "עריכת פרטים"}
          </button>
        </div>

        <div className="patient-vitals-grid">
          <label>
            <span>טלפון</span>
            {editing ? (
              <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="05X-XXXXXXX" />
            ) : <strong>{phone || "לא הוזן"}</strong>}
          </label>

          <label>
            <span>גיל</span>
            {editing ? (
              <input type="number" min="0" max="120" value={age} onChange={(event) => setAge(event.target.value)} />
            ) : <strong>{age || "—"}</strong>}
          </label>

          <label>
            <span>גובה</span>
            {editing ? (
              <div className="patient-unit-input"><input type="number" min="0" value={heightCm} onChange={(event) => setHeightCm(event.target.value)} placeholder="לדוגמה 175" /><b>ס״מ</b></div>
            ) : <strong>{heightCm ? `${heightCm} ס״מ` : "לא הוזן"}</strong>}
          </label>

          <label>
            <span>משקל</span>
            {editing ? (
              <div className="patient-unit-input"><input type="number" min="0" step="0.1" value={weightKg} onChange={(event) => setWeightKg(event.target.value)} placeholder="לדוגמה 70" /><b>ק״ג</b></div>
            ) : <strong>{weightKg ? `${weightKg} ק״ג` : "לא הוזן"}</strong>}
          </label>
        </div>
      </div>

      <div className="patient-hero-actions">
        <small>הטיפול הבא</small>
        <b>{patient.nextTreatment}</b>
      </div>
    </header>
  );
}
