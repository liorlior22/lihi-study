"use client";

import { useMemo, useState } from "react";
import { useRoomRentals } from "../room-rentals/room-rentals-store";
import styles from "./income-sheet.module.css";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);

const patientBreakdown = [
  { name: "מיכאל לוי", amount: 1750 },
  { name: "ליאור כהן", amount: 2100 },
  { name: "דור אדרי", amount: 1150 },
];

export function IncomeSheet() {
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [showRentalDetails, setShowRentalDetails] = useState(false);
  const [rentals] = useRoomRentals();

  const patientIncome = 5000;
  const roomRentalIncome = useMemo(
    () => rentals.reduce((sum, rental) => sum + rental.priceBeforeVat, 0),
    [rentals],
  );
  const totalIncome = patientIncome + roomRentalIncome;

  return (
    <article className={`${styles.panel} ${styles.sheetPanel}`}>
      <div className={styles.panelHeader}>
        <div>
          <span>החודש הנוכחי</span>
          <h2>הכנסות</h2>
        </div>
        <strong className={styles.sheetTotalTop}>{formatCurrency(totalIncome)}</strong>
      </div>

      <div className={styles.sheetWrap}>
        <div className={styles.sheetHeader} aria-hidden="true">
          <span>מקור הכנסה</span>
          <span>סכום</span>
          <span>פירוט</span>
        </div>

        <section className={styles.sheetGroup}>
          <div className={styles.sheetGroupTitle}>
            <div>
              <strong>הכנסות מהקליניקה</strong>
              <small>מקורות ההכנסה הפעילים והנוספים</small>
            </div>
            <b>{formatCurrency(totalIncome)}</b>
          </div>

          <div className={styles.sheetRow}>
            <div className={styles.sheetName}>מטופלים</div>
            <div className={styles.amountCell}>{formatCurrency(patientIncome)}</div>
            <button
              type="button"
              className={styles.detailsButton}
              onClick={() => setShowPatientDetails((current) => !current)}
              aria-expanded={showPatientDetails}
            >
              {showPatientDetails ? "סגור פירוט" : "פתח פירוט לפי מטופלים"}
            </button>
          </div>

          {showPatientDetails && (
            <div className={styles.breakdown}>
              <div className={styles.breakdownTitle}>פירוט הכנסות ממטופלים</div>
              {patientBreakdown.map((patient) => (
                <div className={styles.breakdownRow} key={patient.name}>
                  <span>{patient.name}</span>
                  <strong>{formatCurrency(patient.amount)}</strong>
                </div>
              ))}
              <div className={styles.breakdownTotal}>
                <span>סה״כ מטופלים</span>
                <strong>{formatCurrency(patientIncome)}</strong>
              </div>
            </div>
          )}

          <div className={styles.sheetRow}>
            <div className={styles.sheetName}>השכרת חדר טיפולים</div>
            <div className={`${styles.amountCell} ${roomRentalIncome ? "" : styles.emptyAmount}`}>{formatCurrency(roomRentalIncome)}</div>
            {rentals.length ? (
              <button
                type="button"
                className={styles.detailsButton}
                onClick={() => setShowRentalDetails((current) => !current)}
                aria-expanded={showRentalDetails}
              >
                {showRentalDetails ? "סגור פירוט" : "פתח פירוט השכרות"}
              </button>
            ) : (
              <div className={styles.noteCell}>אפיק הכנסות נוסף · עדיין אין השכרות</div>
            )}
          </div>

          {showRentalDetails && rentals.length > 0 && (
            <div className={styles.breakdown}>
              <div className={styles.breakdownTitle}>פירוט השכרת קליניקה · מחיר לפני מע״מ</div>
              {rentals.map((rental) => (
                <div className={styles.breakdownRow} key={rental.id}>
                  <span>{rental.therapistName} · {rental.date} · {rental.time} · {rental.paymentStatus}</span>
                  <strong>{formatCurrency(rental.priceBeforeVat)}</strong>
                </div>
              ))}
              <div className={styles.breakdownTotal}>
                <span>סה״כ השכרת קליניקה</span>
                <strong>{formatCurrency(roomRentalIncome)}</strong>
              </div>
            </div>
          )}
        </section>
      </div>

      <div className={styles.totalRow}>
        <span>סה״כ הכנסות החודש</span>
        <strong>{formatCurrency(totalIncome)}</strong>
      </div>
    </article>
  );
}
