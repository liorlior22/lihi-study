"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { MaritalStatus, Patient } from "../clinic-data";
import styles from "./patients-client.module.css";

type NewPatientForm = {
  name: string;
  phone: string;
  age: string;
  heightCm: string;
  weightKg: string;
  occupation: string;
  maritalStatus: MaritalStatus;
  childrenCount: "0" | "1" | "2" | "3" | "4" | "5";
  hobbies: string;
  profile: string;
};

const emptyForm: NewPatientForm = {
  name: "",
  phone: "",
  age: "",
  heightCm: "",
  weightKg: "",
  occupation: "",
  maritalStatus: "רווק",
  childrenCount: "0",
  hobbies: "",
  profile: "",
};

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "חדש";
  if (parts.length === 1) return parts[0].slice(0, 2);
  return `${parts[0][0]}${parts[parts.length - 1][0]}`;
}

export function PatientsClient({ initialPatients }: { initialPatients: Patient[] }) {
  const [items, setItems] = useState<Patient[]>(initialPatients);
  const [temporaryIds, setTemporaryIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<NewPatientForm>(emptyForm);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items;
    return items.filter((patient) => `${patient.name} ${patient.phone}`.toLowerCase().includes(query));
  }, [items, search]);

  function closeModal() {
    setOpen(false);
    setForm(emptyForm);
  }

  function createPatient() {
    const fullName = form.name.trim();
    if (!fullName) return;

    const id = `temp-${Date.now()}`;
    const patient: Patient = {
      id,
      name: fullName,
      initials: initialsFromName(fullName),
      age: Number(form.age) || 0,
      phone: form.phone.trim(),
      occupation: form.occupation.trim(),
      maritalStatus: form.maritalStatus,
      childrenCount: Number(form.childrenCount) as Patient["childrenCount"],
      heightCm: form.heightCm ? Number(form.heightCm) : null,
      weightKg: form.weightKg ? Number(form.weightKg) : null,
      status: "חדש",
      lastTreatment: "טרם בוצע טיפול",
      nextTreatment: "אין תור עתידי",
      balance: 0,
      treatments: 0,
      treatmentHistory: [],
      family: `${form.maritalStatus}${Number(form.childrenCount) ? ` · ${form.childrenCount} ילדים` : " · ללא ילדים"}`,
      hobbies: form.hobbies.trim() || "טרם הוזן",
      profile: form.profile.trim() || "טרם הוזן אפיון של ליהי.",
      reminder: "מטופל חדש — להשלים פרטי היכרות וטיפול ראשון.",
    };

    setItems((current) => [patient, ...current]);
    setTemporaryIds((current) => new Set(current).add(id));
    closeModal();
  }

  function PatientCard({ patient }: { patient: Patient }) {
    const card = (
      <article className="patient-card">
        <div className="patient-card-head">
          <div className="patient-avatar">{patient.initials}</div>
          <span className={`status-pill ${patient.status === "חדש" ? "new" : ""}`}>{patient.status}</span>
        </div>
        <h2>{patient.name}</h2>
        <p>{patient.phone || "ללא טלפון"}{patient.age ? ` · גיל ${patient.age}` : ""}</p>
        <dl>
          <div><dt>טיפול אחרון</dt><dd>{patient.lastTreatment}</dd></div>
          <div><dt>טיפול הבא</dt><dd>{patient.nextTreatment}</dd></div>
          <div><dt>טיפולים</dt><dd>{patient.treatments}</dd></div>
          <div><dt>יתרה</dt><dd>{patient.balance ? `₪${patient.balance}` : "אין יתרה"}</dd></div>
        </dl>
        {temporaryIds.has(patient.id) && <small className={styles.sessionNote}>נוסף כעת · יישמר קבוע אחרי חיבור מסד נתונים</small>}
      </article>
    );

    return temporaryIds.has(patient.id)
      ? <div className="patient-card-link">{card}</div>
      : <Link className="patient-card-link" href={`/patients/${patient.id}`}>{card}</Link>;
  }

  return (
    <>
      <div className="clinic-topbar">
        <div><h1>המטופלים שלי</h1><p>כל האנשים, כל ההיסטוריה וכל מה שחשוב לזכור במקום אחד.</p></div>
        <button type="button" className="clinic-primary" onClick={() => setOpen(true)}>+ מטופל חדש</button>
      </div>

      <div className="patients-toolbar">
        <input className="patients-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="חיפוש לפי שם או טלפון..." aria-label="חיפוש מטופל" />
      </div>

      <div className="patients-cards">
        {filtered.map((patient) => <PatientCard patient={patient} key={patient.id} />)}
      </div>

      {open && (
        <div className={styles.overlay} onMouseDown={(event) => event.target === event.currentTarget && closeModal()}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="new-patient-title">
            <header className={styles.modalHeader}>
              <div><h2 id="new-patient-title">מטופל חדש</h2><p>פותחים כרטיס בסיסי. את שאר המידע אפשר להשלים אחר כך.</p></div>
              <button type="button" className={styles.closeButton} onClick={closeModal}>×</button>
            </header>

            <div className={styles.formGrid}>
              <label className={styles.fullWidth}><span>שם מלא *</span><input autoFocus value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="שם פרטי ושם משפחה" /></label>
              <label><span>טלפון</span><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="05X-XXXXXXX" /></label>
              <label><span>גיל</span><input type="number" min="0" max="120" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} /></label>
              <label><span>גובה</span><input type="number" min="0" value={form.heightCm} onChange={(e) => setForm({ ...form, heightCm: e.target.value })} placeholder="ס״מ" /></label>
              <label><span>משקל</span><input type="number" min="0" step="0.1" value={form.weightKg} onChange={(e) => setForm({ ...form, weightKg: e.target.value })} placeholder="ק״ג" /></label>
              <label className={styles.fullWidth}><span>מקצוע / עיסוק</span><input value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} /></label>
              <label><span>מצב משפחתי</span><select value={form.maritalStatus} onChange={(e) => setForm({ ...form, maritalStatus: e.target.value as MaritalStatus })}><option>רווק</option><option>גרוש</option><option>נשוי</option></select></label>
              <label><span>כמות ילדים</span><select value={form.childrenCount} onChange={(e) => setForm({ ...form, childrenCount: e.target.value as NewPatientForm["childrenCount"] })}>{[0,1,2,3,4,5].map((n) => <option key={n} value={n}>{n}</option>)}</select></label>
              <label className={styles.fullWidth}><span>תחביבים</span><textarea rows={3} value={form.hobbies} onChange={(e) => setForm({ ...form, hobbies: e.target.value })} /></label>
              <label className={styles.fullWidth}><span>האפיון של ליהי</span><textarea rows={4} value={form.profile} onChange={(e) => setForm({ ...form, profile: e.target.value })} /></label>
            </div>

            <footer className={styles.footer}>
              <button type="button" className={styles.saveButton} disabled={!form.name.trim()} onClick={createPatient}>צור מטופל</button>
              <button type="button" className={styles.cancelButton} onClick={closeModal}>ביטול</button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
