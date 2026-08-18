"use client";

import { useState } from "react";
import type { Treatment } from "../../clinic-data";
import styles from "./treatment-list.module.css";

type Props = {
  treatments: Treatment[];
};

type TreatmentEntry = Treatment & {
  improvement: string;
};

type NewTreatment = {
  date: string;
  price: string;
  paid: boolean;
  note: string;
  improvement: string;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("he-IL", { day: "2-digit", month: "2-digit", year: "2-digit" }).format(new Date(`${date}T12:00:00`));

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(value);

const emptyNewTreatment: NewTreatment = {
  date: "",
  price: "350",
  paid: true,
  note: "",
  improvement: "",
};

export function TreatmentList({ treatments: initialTreatments }: Props) {
  const [treatments, setTreatments] = useState<TreatmentEntry[]>(
    initialTreatments.map((treatment) => ({ ...treatment, improvement: "" })),
  );
  const [adding, setAdding] = useState(false);
  const [newTreatment, setNewTreatment] = useState<NewTreatment>(emptyNewTreatment);

  function updateTreatment(
    id: string,
    field: "date" | "price" | "paid" | "note" | "improvement",
    value: string | boolean,
  ) {
    setTreatments((current) =>
      current.map((treatment) => {
        if (treatment.id !== id) return treatment;
        if (field === "price") {
          return { ...treatment, price: Number(String(value).replace(/[^0-9.]/g, "")) || 0 };
        }
        return { ...treatment, [field]: value };
      }),
    );
  }

  function addTreatment(event: React.FormEvent) {
    event.preventDefault();
    if (!newTreatment.date) return;

    const treatment: TreatmentEntry = {
      id: `manual-treatment-${Date.now()}`,
      date: newTreatment.date,
      price: Number(newTreatment.price.replace(/[^0-9.]/g, "")) || 0,
      paid: newTreatment.paid,
      note: newTreatment.note.trim(),
      improvement: newTreatment.improvement.trim(),
    };

    setTreatments((current) => [treatment, ...current]);
    setNewTreatment(emptyNewTreatment);
    setAdding(false);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionHeader}>
        <div>
          <span>ציר הטיפולים של המטופל</span>
          <h2>מעקב טיפולים</h2>
          <p>כל טיפול נשמר בנפרד, כולל מה נעשה ומה השתנה מאז הפעם הקודמת.</p>
        </div>
        <button type="button" className={styles.addButton} onClick={() => setAdding((current) => !current)}>
          {adding ? "סגור" : "+ טיפול חדש"}
        </button>
      </div>

      {adding && (
        <form className={styles.newTreatmentForm} onSubmit={addTreatment}>
          <div className={styles.formTitle}>
            <strong>טיפול #{treatments.length + 1}</strong>
            <span>פתיחת טיפול חדש</span>
          </div>

          <div className={styles.metaGrid}>
            <label>
              <span>תאריך</span>
              <input
                type="date"
                value={newTreatment.date}
                onChange={(event) => setNewTreatment({ ...newTreatment, date: event.target.value })}
                required
              />
            </label>
            <label>
              <span>מחיר</span>
              <div className={styles.moneyInput}>
                <span>₪</span>
                <input
                  inputMode="decimal"
                  value={newTreatment.price}
                  onChange={(event) => setNewTreatment({ ...newTreatment, price: event.target.value })}
                />
              </div>
            </label>
            <label>
              <span>סטטוס תשלום</span>
              <select
                value={newTreatment.paid ? "paid" : "unpaid"}
                onChange={(event) => setNewTreatment({ ...newTreatment, paid: event.target.value === "paid" })}
              >
                <option value="paid">שולם</option>
                <option value="unpaid">טרם שולם</option>
              </select>
            </label>
          </div>

          <div className={styles.textGrid}>
            <label>
              <span>{treatments.length ? "שיפור / שינוי מהטיפול הקודם" : "מצב התחלתי / נקודת בסיס"}</span>
              <textarea
                rows={3}
                value={newTreatment.improvement}
                onChange={(event) => setNewTreatment({ ...newTreatment, improvement: event.target.value })}
                placeholder={treatments.length ? "מה השתפר, החמיר או השתנה מאז הטיפול הקודם?" : "מה המצב לפני תחילת סדרת הטיפולים?"}
              />
            </label>
            <label>
              <span>הערות על הטיפול</span>
              <textarea
                rows={3}
                value={newTreatment.note}
                onChange={(event) => setNewTreatment({ ...newTreatment, note: event.target.value })}
                placeholder="מה נעשה בטיפול, תגובה, נקודות חשובות ומה לבדוק בפעם הבאה..."
              />
            </label>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.saveButton}>שמור טיפול</button>
            <button type="button" className={styles.cancelButton} onClick={() => {
              setAdding(false);
              setNewTreatment(emptyNewTreatment);
            }}>ביטול</button>
          </div>
        </form>
      )}

      {!treatments.length ? (
        <p className={styles.empty}>עדיין אין טיפולים מתועדים. לחץ על „+ טיפול חדש” כדי לפתוח טיפול 1.</p>
      ) : (
        <div className={styles.list}>
          {treatments.map((treatment, index) => {
            const treatmentNumber = treatments.length - index;
            return (
              <article className={styles.treatment} key={treatment.id}>
                <div className={styles.head}>
                  <div>
                    <span>טיפול {treatmentNumber}</span>
                    <strong>{formatDate(treatment.date)}</strong>
                  </div>
                  <div className={styles.price}>{formatCurrency(treatment.price)}</div>
                </div>

                <div className={styles.metaGrid}>
                  <label>
                    <span>תאריך</span>
                    <input
                      type="date"
                      value={treatment.date}
                      onChange={(event) => updateTreatment(treatment.id, "date", event.target.value)}
                    />
                  </label>
                  <label>
                    <span>מחיר</span>
                    <div className={styles.moneyInput}>
                      <span>₪</span>
                      <input
                        inputMode="decimal"
                        value={treatment.price || ""}
                        onChange={(event) => updateTreatment(treatment.id, "price", event.target.value)}
                      />
                    </div>
                  </label>
                  <label>
                    <span>סטטוס תשלום</span>
                    <select
                      value={treatment.paid ? "paid" : "unpaid"}
                      onChange={(event) => updateTreatment(treatment.id, "paid", event.target.value === "paid")}
                    >
                      <option value="paid">שולם</option>
                      <option value="unpaid">טרם שולם</option>
                    </select>
                  </label>
                </div>

                <div className={styles.textGrid}>
                  <label>
                    <span>{treatmentNumber === 1 ? "מצב התחלתי / נקודת בסיס" : "שיפור / שינוי מהטיפול הקודם"}</span>
                    <textarea
                      value={treatment.improvement}
                      placeholder={treatmentNumber === 1 ? "איך המטופל הגיע בתחילת התהליך?" : "מה השתפר, החמיר או השתנה מאז הטיפול הקודם?"}
                      onChange={(event) => updateTreatment(treatment.id, "improvement", event.target.value)}
                      rows={3}
                    />
                  </label>

                  <label>
                    <span>הערות על הטיפול</span>
                    <textarea
                      value={treatment.note}
                      placeholder="מה היה בטיפול, תגובה, ומה לבדוק בפעם הבאה..."
                      onChange={(event) => updateTreatment(treatment.id, "note", event.target.value)}
                      rows={3}
                    />
                  </label>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <small className={styles.localNote}>כרגע הטיפולים והשינויים נשמרים לתצוגת ה־V1 בלבד; לאחר חיבור מסד הנתונים הם יישמרו קבוע.</small>
    </div>
  );
}
