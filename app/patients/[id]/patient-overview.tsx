"use client";

import { useState } from "react";
import type { MaritalStatus, Patient } from "../../clinic-data";
import styles from "./patient-overview.module.css";

type OverviewState = {
  occupation: string;
  maritalStatus: MaritalStatus;
  childrenCount: 0 | 1 | 2 | 3 | 4 | 5;
  hobbies: string;
  profile: string;
};

export function PatientOverview({ patient }: { patient: Patient }) {
  const initial: OverviewState = {
    occupation: patient.occupation,
    maritalStatus: patient.maritalStatus,
    childrenCount: patient.childrenCount,
    hobbies: patient.hobbies,
    profile: patient.profile,
  };

  const [value, setValue] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [editing, setEditing] = useState(false);

  function startEditing() {
    setDraft(value);
    setEditing(true);
  }

  function cancelEditing() {
    setDraft(value);
    setEditing(false);
  }

  function save() {
    setValue(draft);
    setEditing(false);
  }

  return (
    <article className={`clinic-card ${styles.card}`}>
      <div className={styles.header}>
        <div>
          <h2>היכרות ואפיון</h2>
          <p>הפרטים שליהי צריכה להכיר לפני ובין טיפולים.</p>
        </div>
        {!editing ? (
          <button type="button" className={styles.editButton} onClick={startEditing}>עריכה</button>
        ) : (
          <div className={styles.actions}>
            <button type="button" className={styles.saveButton} onClick={save}>שמור</button>
            <button type="button" className={styles.cancelButton} onClick={cancelEditing}>ביטול</button>
          </div>
        )}
      </div>

      {!editing ? (
        <div className={styles.viewGrid}>
          <div className={styles.compactField}><span>מקצוע / עיסוק</span><strong>{value.occupation || "לא הוזן"}</strong></div>
          <div className={styles.compactField}><span>מצב משפחתי</span><strong>{value.maritalStatus}</strong></div>
          <div className={styles.compactField}><span>כמות ילדים</span><strong>{value.childrenCount}</strong></div>
          <div className={`${styles.textField} ${styles.fullWidth}`}><span>תחביבים</span><p>{value.hobbies || "לא הוזן"}</p></div>
          <div className={`${styles.textField} ${styles.fullWidth}`}><span>האפיון של ליהי</span><p>{value.profile || "לא הוזן"}</p></div>
        </div>
      ) : (
        <div className={styles.formGrid}>
          <label className={styles.field}>
            <span>מקצוע / עיסוק</span>
            <input value={draft.occupation} onChange={(event) => setDraft({ ...draft, occupation: event.target.value })} placeholder="לדוגמה מנהל מוצר" />
          </label>

          <label className={styles.field}>
            <span>מצב משפחתי</span>
            <select value={draft.maritalStatus} onChange={(event) => setDraft({ ...draft, maritalStatus: event.target.value as MaritalStatus })}>
              <option value="רווק">רווק</option>
              <option value="גרוש">גרוש</option>
              <option value="נשוי">נשוי</option>
            </select>
          </label>

          <label className={styles.field}>
            <span>כמות ילדים</span>
            <select value={draft.childrenCount} onChange={(event) => setDraft({ ...draft, childrenCount: Number(event.target.value) as OverviewState["childrenCount"] })}>
              {[0, 1, 2, 3, 4, 5].map((count) => <option key={count} value={count}>{count}</option>)}
            </select>
          </label>

          <label className={`${styles.field} ${styles.fullWidth}`}>
            <span>תחביבים</span>
            <textarea rows={3} value={draft.hobbies} onChange={(event) => setDraft({ ...draft, hobbies: event.target.value })} placeholder="מה המטופל אוהב לעשות?" />
          </label>

          <label className={`${styles.field} ${styles.fullWidth}`}>
            <span>האפיון של ליהי</span>
            <textarea rows={5} value={draft.profile} onChange={(event) => setDraft({ ...draft, profile: event.target.value })} placeholder="התרשמות אישית, דפוסים, מה חשוב לזכור..." />
          </label>
        </div>
      )}
    </article>
  );
}
