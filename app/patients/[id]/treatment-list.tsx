"use client";

import { useState } from "react";
import type { Treatment } from "../../clinic-data";
import styles from "./treatment-list.module.css";

type Props = {
  treatments: Treatment[];
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("he-IL", { day: "2-digit", month: "2-digit", year: "2-digit" }).format(new Date(`${date}T12:00:00`));

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(value);

export function TreatmentList({ treatments: initialTreatments }: Props) {
  const [treatments, setTreatments] = useState(initialTreatments);

  function updateTreatment(id: string, field: "paid" | "note", value: boolean | string) {
    setTreatments((current) =>
      current.map((treatment) =>
        treatment.id === id ? { ...treatment, [field]: value } : treatment,
      ),
    );
  }

  if (!treatments.length) {
    return <p className={styles.empty}>עדיין אין טיפולים מתועדים. הטיפול הראשון יופיע כאן.</p>;
  }

  return (
    <div className={styles.list}>
      {treatments.map((treatment, index) => (
        <article className={styles.treatment} key={treatment.id}>
          <div className={styles.head}>
            <div>
              <span>טיפול #{treatments.length - index}</span>
              <strong>{formatDate(treatment.date)}</strong>
            </div>
            <div className={styles.price}>{formatCurrency(treatment.price)}</div>
          </div>

          <div className={styles.fields}>
            <label>
              <span>תשלום</span>
              <select
                value={treatment.paid ? "paid" : "unpaid"}
                onChange={(event) => updateTreatment(treatment.id, "paid", event.target.value === "paid")}
              >
                <option value="paid">שולם</option>
                <option value="unpaid">טרם שולם</option>
              </select>
            </label>

            <label className={styles.noteField}>
              <span>הערות על הטיפול</span>
              <textarea
                value={treatment.note}
                placeholder="כתבי מה היה בטיפול, תגובה, מה לבדוק בפעם הבאה..."
                onChange={(event) => updateTreatment(treatment.id, "note", event.target.value)}
                rows={3}
              />
            </label>
          </div>
        </article>
      ))}
      <small className={styles.localNote}>כרגע העריכה היא לתצוגת ה־V1; בשלב מסד הנתונים היא תישמר אוטומטית.</small>
    </div>
  );
}
