"use client";

import { useMemo } from "react";
import { useRoomRentals } from "../room-rentals/room-rentals-store";
import styles from "./finance.module.css";

const patientIncome = 5000;
const initialExpensesTotal = 5000;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);

export function FinanceSummary() {
  const [rentals] = useRoomRentals();

  const rentalTotals = useMemo(() => {
    const total = rentals.reduce((sum, rental) => sum + rental.priceBeforeVat, 0);
    const paid = rentals
      .filter((rental) => rental.paymentStatus === "שולם")
      .reduce((sum, rental) => sum + rental.priceBeforeVat, 0);
    const unpaid = total - paid;
    return { total, paid, unpaid };
  }, [rentals]);

  const totalIncome = patientIncome + rentalTotals.total;
  const paidIncome = patientIncome + rentalTotals.paid;
  const unpaidIncome = rentalTotals.unpaid;
  const monthlyResult = totalIncome - initialExpensesTotal;

  return (
    <section className={styles.summaryGrid} aria-label="סיכום פיננסי חודשי">
      <article className={styles.summaryCard}>
        <span>הכנסות החודש</span>
        <strong>{formatCurrency(totalIncome)}</strong>
        <small>מטופלים + השכרת קליניקה</small>
      </article>

      <article className={styles.summaryCard}>
        <span>כבר שולם</span>
        <strong>{formatCurrency(paidIncome)}</strong>
        <small>כסף שכבר התקבל</small>
      </article>

      <article className={`${styles.summaryCard} ${styles.vatCard}`}>
        <span>טרם שולם</span>
        <strong>{formatCurrency(unpaidIncome)}</strong>
        <small>השכרות שעדיין פתוחות לתשלום</small>
      </article>

      <article className={styles.summaryCard}>
        <span>תוצאה לפני מס</span>
        <strong>{formatCurrency(monthlyResult)}</strong>
        <small>הכנסות פחות הוצאות</small>
      </article>
    </section>
  );
}
