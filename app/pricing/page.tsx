"use client";

import { useEffect, useState } from "react";
import { ClinicShell } from "../clinic-shell";
import {
  clinicPriceList,
  getClinicPriceList,
  saveClinicPriceList,
  type ClinicPriceList,
} from "../pricing-data";
import styles from "./pricing.module.css";

type PriceKey = keyof ClinicPriceList;

const singleTreatments: Array<{ key: PriceKey; name: string; note: string }> = [
  { key: "acupuncture", name: "טיפול בודד דיקור", note: "טיפול דיקור בודד" },
  { key: "shiatsuAcupuncture", name: "שיאצו + דיקור", note: "טיפול משולב" },
  { key: "cuppingAddon", name: "תוספת כוסות רוח", note: "תוספת לכל טיפול" },
];

const packages: Array<{ key: PriceKey; name: string; treatments: number; note: string }> = [
  {
    key: "package5",
    name: "כרטיסייה 5 טיפולי דיקור",
    treatments: 5,
    note: "כוסות רוח במתנה",
  },
  {
    key: "package10",
    name: "כרטיסייה 10 טיפולי דיקור",
    treatments: 10,
    note: "10 טיפולי דיקור",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);

export default function PricingPage() {
  const [prices, setPrices] = useState<ClinicPriceList>(clinicPriceList);
  const [draft, setDraft] = useState<ClinicPriceList>(clinicPriceList);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = getClinicPriceList();
    setPrices(stored);
    setDraft(stored);
  }, []);

  function startEditing() {
    setDraft(prices);
    setSaved(false);
    setEditing(true);
  }

  function cancelEditing() {
    setDraft(prices);
    setEditing(false);
  }

  function updatePrice(key: PriceKey, value: string) {
    const nextValue = Math.max(0, Number(value.replace(/[^0-9.]/g, "")) || 0);
    setDraft((current) => ({ ...current, [key]: nextValue }));
  }

  function saveChanges() {
    setPrices(draft);
    saveClinicPriceList(draft);
    setEditing(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <ClinicShell active="מחירון">
      <section className={styles.page}>
        <div className={`clinic-topbar ${styles.topbar}`}>
          <div>
            <span className={styles.eyebrow}>מחירי הקליניקה</span>
            <h1>מחירון</h1>
            <p>מחירי טיפולים וכרטיסיות במקום אחד.</p>
          </div>

          <div className={styles.headerActions}>
            {saved && <span className={styles.savedBadge}>✓ המחירון נשמר</span>}
            {!editing ? (
              <button type="button" className={styles.editButton} onClick={startEditing}>
                ✎ עריכת מחירון
              </button>
            ) : (
              <div className={styles.editActions}>
                <button type="button" className={styles.saveButton} onClick={saveChanges}>שמור שינויים</button>
                <button type="button" className={styles.cancelButton} onClick={cancelEditing}>ביטול</button>
              </div>
            )}
          </div>
        </div>

        {editing && (
          <div className={styles.editNotice}>
            <span>✦</span>
            <div>
              <strong>מצב עריכת מחירון</strong>
              <p>שנו כל מחיר ולחצו „שמור שינויים”. המחירים יישמרו גם לאחר רענון.</p>
            </div>
          </div>
        )}

        <div className={styles.grid}>
          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <span>טיפולים</span>
                <h2>טיפולים בודדים</h2>
              </div>
            </div>

            <div className={styles.list}>
              {singleTreatments.map((item) => {
                const value = editing ? draft[item.key] : prices[item.key];
                return (
                  <div className={styles.row} key={item.key}>
                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.note}</small>
                    </div>
                    {editing ? (
                      <label className={styles.priceInput}>
                        <span>₪</span>
                        <input
                          inputMode="numeric"
                          value={draft[item.key]}
                          onChange={(event) => updatePrice(item.key, event.target.value)}
                          aria-label={`מחיר ${item.name}`}
                        />
                      </label>
                    ) : (
                      <b>{formatCurrency(value)}</b>
                    )}
                  </div>
                );
              })}
            </div>
          </article>

          <article className={`${styles.panel} ${styles.packagePanel}`}>
            <div className={styles.panelHeader}>
              <div>
                <span>חבילות</span>
                <h2>כרטיסיות טיפולים</h2>
              </div>
            </div>

            <div className={styles.packageGrid}>
              {packages.map((item) => {
                const value = editing ? draft[item.key] : prices[item.key];
                return (
                  <div className={styles.packageCard} key={item.key}>
                    <span>{item.treatments} טיפולים</span>
                    <h3>{item.name}</h3>
                    {editing ? (
                      <label className={`${styles.priceInput} ${styles.packagePriceInput}`}>
                        <span>₪</span>
                        <input
                          inputMode="numeric"
                          value={draft[item.key]}
                          onChange={(event) => updatePrice(item.key, event.target.value)}
                          aria-label={`מחיר ${item.name}`}
                        />
                      </label>
                    ) : (
                      <strong>{formatCurrency(value)}</strong>
                    )}
                    <p>{item.note}</p>
                    <small>{formatCurrency(value / item.treatments)} לטיפול בממוצע</small>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </section>
    </ClinicShell>
  );
}
