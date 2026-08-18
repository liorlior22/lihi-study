"use client";

import { useState } from "react";
import type { Patient } from "../../clinic-data";
import styles from "./patient-profile-header.module.css";

type EditableProfile = {
  phone: string;
  age: string;
  heightCm: string;
  weightKg: string;
};

export function PatientProfileHeader({ patient }: { patient: Patient }) {
  const initialProfile: EditableProfile = {
    phone: patient.phone,
    age: String(patient.age),
    heightCm: patient.heightCm ? String(patient.heightCm) : "",
    weightKg: patient.weightKg ? String(patient.weightKg) : "",
  };

  const [profile, setProfile] = useState<EditableProfile>(initialProfile);
  const [draft, setDraft] = useState<EditableProfile>(initialProfile);
  const [photo, setPhoto] = useState<string | null>(null);
  const [draftPhoto, setDraftPhoto] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  function readPhoto(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setDraftPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function openEditor() {
    setDraft(profile);
    setDraftPhoto(photo);
    setIsEditing(true);
  }

  function closeEditor() {
    setDraft(profile);
    setDraftPhoto(photo);
    setIsEditing(false);
  }

  function saveProfile() {
    setProfile(draft);
    setPhoto(draftPhoto);
    setIsEditing(false);
  }

  const paymentOpen = patient.balance > 0;

  return (
    <div className={styles.profileArea}>
      <header className={styles.hero}>
        <div className={styles.identity}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>
              {photo ? <img src={photo} alt={`תמונה של ${patient.name}`} /> : patient.initials}
            </div>
            <button type="button" className={styles.cameraButton} onClick={openEditor} aria-label="שינוי תמונת מטופל">⌁</button>
          </div>

          <div className={styles.identityText}>
            <h1>{patient.name}</h1>
            <p className={styles.occupation}>{patient.occupation}</p>
            <div className={styles.statusLine}>
              <span className={styles.status}>{patient.status}</span>
              <span className={paymentOpen ? styles.balanceOpen : styles.balanceOk}>
                {paymentOpen ? `יתרה פתוחה ₪${patient.balance}` : "תשלום מסודר"}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.heroAside}>
          <div className={styles.nextTreatment}>
            <span>הטיפול הבא</span>
            <strong>{patient.nextTreatment}</strong>
          </div>
          <button type="button" className={styles.editButton} onClick={openEditor}>ערוך פרופיל</button>
        </div>
      </header>

      <section className={styles.detailsCard} aria-label="פרטים אישיים">
        <div className={styles.detailsHeader}>
          <h2>פרטים אישיים</h2>
          <span>פרטי בסיס למעקב מהיר</span>
        </div>
        <div className={styles.detailsGrid}>
          <div className={styles.detail}>
            <span>טלפון</span>
            <strong className={styles.phone}>{profile.phone || "לא הוזן"}</strong>
          </div>
          <div className={styles.detail}>
            <span>גיל</span>
            <strong>{profile.age || "לא הוזן"}</strong>
          </div>
          <div className={styles.detail}>
            <span>גובה</span>
            <strong>{profile.heightCm ? `${profile.heightCm} ס״מ` : "לא הוזן"}</strong>
          </div>
          <div className={styles.detail}>
            <span>משקל</span>
            <strong>{profile.weightKg ? `${profile.weightKg} ק״ג` : "לא הוזן"}</strong>
          </div>
        </div>
      </section>

      {isEditing && (
        <div className={styles.overlay} role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeEditor();
        }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="patient-edit-title">
            <header className={styles.modalHeader}>
              <div>
                <h2 id="patient-edit-title">עריכת הפרופיל של {patient.name}</h2>
                <p>עדכון פרטים אישיים ותמונת מטופל</p>
              </div>
              <button type="button" className={styles.closeButton} onClick={closeEditor} aria-label="סגירה">×</button>
            </header>

            <div className={styles.modalBody}>
              <div className={styles.photoEditor}>
                <div className={styles.modalAvatar}>
                  {draftPhoto ? <img src={draftPhoto} alt={`תצוגה מקדימה של ${patient.name}`} /> : patient.initials}
                </div>
                <div className={styles.photoEditorText}>
                  <strong>תמונת פרופיל</strong>
                  <small>JPG, PNG או תמונה מהטלפון</small>
                  <label className={styles.choosePhoto}>
                    בחר תמונה
                    <input type="file" accept="image/*" onChange={(event) => readPhoto(event.target.files?.[0])} />
                  </label>
                </div>
              </div>

              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span>מספר טלפון</span>
                  <input type="tel" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} placeholder="05X-XXXXXXX" />
                </label>

                <label className={styles.field}>
                  <span>גיל</span>
                  <input type="number" min="0" max="120" value={draft.age} onChange={(event) => setDraft({ ...draft, age: event.target.value })} placeholder="לדוגמה 36" />
                </label>

                <label className={styles.field}>
                  <span>גובה</span>
                  <div className={styles.unitInput}>
                    <input type="number" min="0" value={draft.heightCm} onChange={(event) => setDraft({ ...draft, heightCm: event.target.value })} placeholder="175" />
                    <b>ס״מ</b>
                  </div>
                </label>

                <label className={styles.field}>
                  <span>משקל</span>
                  <div className={styles.unitInput}>
                    <input type="number" min="0" step="0.1" value={draft.weightKg} onChange={(event) => setDraft({ ...draft, weightKg: event.target.value })} placeholder="70" />
                    <b>ק״ג</b>
                  </div>
                </label>
              </div>
            </div>

            <footer className={styles.modalFooter}>
              <button type="button" className={styles.saveButton} onClick={saveProfile}>שמור שינויים</button>
              <button type="button" className={styles.cancelButton} onClick={closeEditor}>ביטול</button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
