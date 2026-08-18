"use client";

import { useMemo, useState } from "react";
import styles from "./patient-package-card.module.css";

type PackageType = "none" | "five" | "ten";

const packageOptions = {
  none: { label: "ללא כרטיסייה", total: 0, price: 0 },
  five: { label: "כרטיסיית 5 טיפולי דיקור", total: 5, price: 1000 },
  ten: { label: "כרטיסיית 10 טיפולי דיקור", total: 10, price: 1500 },
} as const;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);

export function PatientPackageCard() {
  const [packageType, setPackageType] = useState<PackageType>("none");
  const [remaining, setRemaining] = useState(0);

  const currentPackage = packageOptions[packageType];
  const used = useMemo(
    () => Math.max(0, currentPackage.total - remaining),
    [currentPackage.total, remaining],
  );

  function changePackage(value: PackageType) {
    setPackageType(value);
    setRemaining(packageOptions[value].total);
  }

  return (
    <article className={`clinic-card ${styles.card}`}>
      <div className={styles.header}>
        <div>
          <span>חבילת טיפולים</span>
          <h2>כרטיסייה</h2>
        </div>
        <span className={packageType === "none" ? styles.inactive : styles.active}>
          {packageType === "none" ? "ללא כרטיסייה" : "פעילה"}
        </span>
      </div>

      <label className={styles.field}>
        <span>סוג כרטיסייה</span>
        <select value={packageType} onChange={(event) => changePackage(event.target.value as PackageType)}>
          <option value="none">ללא כרטיסייה</option>
          <option value="five">5 טיפולי דיקור · ₪1,000</option>
          <option value="ten">10 טיפולי דיקור · ₪1,500</option>
        </select>
      </label>

      {packageType !== "none" && (
        <>
          <div className={styles.stats}>
            <div>
              <span>נשארו</span>
              <strong>{remaining}</strong>
              <small>מתוך {currentPackage.total}</small>
            </div>
            <div>
              <span>נוצלו</span>
              <strong>{used}</strong>
              <small>טיפולים</small>
            </div>
            <div>
              <span>מחיר הכרטיסייה</span>
              <strong className={styles.price}>{formatCurrency(currentPackage.price)}</strong>
            </div>
          </div>

          <label className={styles.field}>
            <span>עדכון יתרת טיפולים</span>
            <input
              type="number"
              min="0"
              max={currentPackage.total}
              value={remaining}
              onChange={(event) => {
                const next = Math.max(0, Math.min(currentPackage.total, Number(event.target.value) || 0));
                setRemaining(next);
              }}
            />
          </label>

          {packageType === "five" && (
            <div className={styles.bonus}>כוסות רוח במתנה במסגרת הכרטיסייה</div>
          )}
        </>
      )}

      <small className={styles.note}>כרגע הבחירה נשמרת לתצוגת ה־V1 בלבד; אחרי חיבור מסד הנתונים היא תישמר לכל מטופל.</small>
    </article>
  );
}
