import Link from "next/link";
import { ClinicShell } from "../clinic-shell";
import { patients } from "../clinic-data";
import { ExpensesSheet } from "./expenses-sheet";
import styles from "./finance.module.css";
import income from "./income.module.css";

const initialExpensesTotal = 5000;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(value);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("he-IL", { day: "2-digit", month: "2-digit", year: "2-digit" }).format(new Date(`${date}T12:00:00`));

export default function FinancePage() {
  const monthTreatments = patients.flatMap((patient) =>
    patient.treatmentHistory
      .filter((treatment) => treatment.date.startsWith("2026-08"))
      .map((treatment) => ({ ...treatment, patientId: patient.id, patientName: patient.name })),
  );

  const paidTreatments = monthTreatments.filter((treatment) => treatment.paid);
  const unpaidTreatments = monthTreatments.filter((treatment) => !treatment.paid);
  const paidIncome = paidTreatments.reduce((sum, treatment) => sum + treatment.price, 0);
  const unpaidIncome = unpaidTreatments.reduce((sum, treatment) => sum + treatment.price, 0);
  const totalIncome = paidIncome + unpaidIncome;
  const monthlyResult = totalIncome - initialExpensesTotal;

  return (
    <ClinicShell active="הרו״ח שלי">
      <div className={styles.page}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>המרכז הפיננסי של הקליניקה</span>
            <h1>הרו״ח שלי</h1>
            <p>ההכנסות נמשכות אוטומטית מהטיפולים של המטופלים ומופרדות לפי מצב התשלום.</p>
          </div>
        </header>

        <section className={styles.summaryGrid} aria-label="סיכום פיננסי חודשי">
          <article className={styles.summaryCard}>
            <span>הכנסות החודש</span>
            <strong>{formatCurrency(totalIncome)}</strong>
            <small>{monthTreatments.length} טיפולים באוגוסט</small>
          </article>

          <article className={styles.summaryCard}>
            <span>כבר שולם</span>
            <strong>{formatCurrency(paidIncome)}</strong>
            <small>{paidTreatments.length} טיפולים ששולמו</small>
          </article>

          <article className={`${styles.summaryCard} ${styles.vatCard}`}>
            <span>טרם שולם</span>
            <strong>{formatCurrency(unpaidIncome)}</strong>
            <small>{unpaidTreatments.length} טיפולים ממתינים לתשלום</small>
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
              <h2>הכנסות מטיפולים</h2>
            </div>
            <strong className={income.incomeTotal}>{formatCurrency(totalIncome)}</strong>
          </div>

          <div className={income.incomeColumns}>
            <div>
              <div className={income.incomeGroupTitle}>
                <strong>שולם</strong>
                <span>{formatCurrency(paidIncome)}</span>
              </div>
              <div className={income.incomeList}>
                {paidTreatments.map((treatment) => (
                  <Link className={income.incomeRow} href={`/patients/${treatment.patientId}`} key={treatment.id}>
                    <div>
                      <strong>{treatment.patientName}</strong>
                      <span>{formatDate(treatment.date)}</span>
                    </div>
                    <b>{formatCurrency(treatment.price)}</b>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className={`${income.incomeGroupTitle} ${income.unpaidTitle}`}>
                <strong>טרם שולם</strong>
                <span>{formatCurrency(unpaidIncome)}</span>
              </div>
              <div className={income.incomeList}>
                {unpaidTreatments.length ? unpaidTreatments.map((treatment) => (
                  <Link className={`${income.incomeRow} ${income.unpaidRow}`} href={`/patients/${treatment.patientId}`} key={treatment.id}>
                    <div>
                      <strong>{treatment.patientName}</strong>
                      <span>{formatDate(treatment.date)}</span>
                    </div>
                    <b>{formatCurrency(treatment.price)}</b>
                  </Link>
                )) : <p className={income.emptyIncome}>אין תשלומים פתוחים החודש.</p>}
              </div>
            </div>
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
                <li><span>✓</span> כל טיפול שנערך נכנס לחודש שלו</li>
                <li><span>✓</span> שולם וטרם שולם מוצגים בנפרד</li>
                <li><span>✓</span> לחיצה פותחת את כרטיס המטופל</li>
                <li><span>✓</span> תור עתידי לא נספר כהכנסה</li>
              </ul>
            </article>
          </aside>
        </section>
      </div>
    </ClinicShell>
  );
}
