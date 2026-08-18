import Link from "next/link";
import { ClinicShell } from "../clinic-shell";
import { patients } from "../clinic-data";
import { ExpensesSheet } from "./expenses-sheet";
import styles from "./finance.module.css";
import income from "./income.module.css";

const initialExpensesTotal = 5000;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);

export default function FinancePage() {
  const patientSummaries = patients
    .map((patient) => {
      const monthTreatments = patient.treatmentHistory.filter((treatment) =>
        treatment.date.startsWith("2026-08"),
      );
      const paid = monthTreatments
        .filter((treatment) => treatment.paid)
        .reduce((sum, treatment) => sum + treatment.price, 0);
      const unpaid = monthTreatments
        .filter((treatment) => !treatment.paid)
        .reduce((sum, treatment) => sum + treatment.price, 0);

      return {
        id: patient.id,
        name: patient.name,
        treatments: monthTreatments.length,
        paid,
        unpaid,
        total: paid + unpaid,
      };
    })
    .filter((patient) => patient.treatments > 0);

  const totalTreatments = patientSummaries.reduce((sum, patient) => sum + patient.treatments, 0);
  const paidIncome = patientSummaries.reduce((sum, patient) => sum + patient.paid, 0);
  const unpaidIncome = patientSummaries.reduce((sum, patient) => sum + patient.unpaid, 0);
  const totalIncome = paidIncome + unpaidIncome;
  const monthlyResult = totalIncome - initialExpensesTotal;

  return (
    <ClinicShell active="הרו״ח שלי">
      <div className={styles.page}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>המרכז הפיננסי של הקליניקה</span>
            <h1>הרו״ח שלי</h1>
            <p>ההכנסות מסוכמות לפי מטופל. את פירוט הטיפולים והתאריכים רואים בתוך כרטיס המטופל.</p>
          </div>
        </header>

        <section className={styles.summaryGrid} aria-label="סיכום פיננסי חודשי">
          <article className={styles.summaryCard}>
            <span>הכנסות החודש</span>
            <strong>{formatCurrency(totalIncome)}</strong>
            <small>{totalTreatments} טיפולים באוגוסט</small>
          </article>

          <article className={styles.summaryCard}>
            <span>כבר שולם</span>
            <strong>{formatCurrency(paidIncome)}</strong>
            <small>כסף שכבר התקבל</small>
          </article>

          <article className={`${styles.summaryCard} ${styles.vatCard}`}>
            <span>טרם שולם</span>
            <strong>{formatCurrency(unpaidIncome)}</strong>
            <small>כסף שעדיין צריך להיכנס</small>
          </article>

          <article className={styles.summaryCard}>
            <span>תוצאה לפני מס</span>
            <strong>{formatCurrency(monthlyResult)}</strong>
            <small>הכנסות החודש פחות ₪5,000 הוצאות כרגע</small>
          </article>
        </section>

        <section className={`${styles.panel} ${income.incomePanel}`}>
          <div className={styles.panelHeader}>
            <div>
              <span>אוגוסט 2026</span>
              <h2>הכנסות לפי מטופל</h2>
            </div>
            <strong className={income.incomeTotal}>{formatCurrency(totalIncome)}</strong>
          </div>

          <div className={income.summaryTable}>
            <div className={income.summaryHeader} aria-hidden="true">
              <span>מטופל</span>
              <span>טיפולים</span>
              <span>שולם</span>
              <span>פתוח</span>
              <span>סה״כ</span>
            </div>

            {patientSummaries.map((patient) => (
              <Link href={`/patients/${patient.id}`} className={income.summaryRow} key={patient.id}>
                <div className={income.patientCell}>
                  <strong>{patient.name}</strong>
                  <small>לצפייה בפירוט הטיפולים</small>
                </div>
                <div data-label="טיפולים"><b>{patient.treatments}</b></div>
                <div data-label="שולם" className={income.paidCell}>{formatCurrency(patient.paid)}</div>
                <div data-label="פתוח" className={patient.unpaid ? income.openCell : ""}>{formatCurrency(patient.unpaid)}</div>
                <div data-label="סה״כ" className={income.totalCell}>{formatCurrency(patient.total)}</div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.contentGrid}>
          <ExpensesSheet />

          <aside className={styles.sideColumn}>
            <article className={`${styles.panel} ${styles.taxPanel}`}>
              <div className={styles.taxIcon}>%</div>
              <span>מע״מ קרוב</span>
              <h2>עדיין אין חישוב</h2>
              <p>ברגע שנגדיר את אופן הדיווח ונשמור מע״מ על ההוצאות, כאן נראה כמה צפוי לרדת ומתי.</p>
              <button type="button" className={styles.taxButton}>הגדר דיווח מע״מ</button>
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHeaderCompact}>
                <h2>איך ההכנסות עובדות</h2>
              </div>
              <ul className={styles.futureList}>
                <li><span>✓</span> כל מטופל מופיע פעם אחת בחודש</li>
                <li><span>✓</span> מספר הטיפולים שלו מסוכם אוטומטית</li>
                <li><span>✓</span> שולם ופתוח מוצגים בנפרד</li>
                <li><span>✓</span> לחיצה פותחת את פירוט הטיפולים שלו</li>
              </ul>
            </article>
          </aside>
        </section>
      </div>
    </ClinicShell>
  );
}
