import { ClinicShell } from "../clinic-shell";
import { ExpensesSheet } from "./expenses-sheet";
import styles from "./finance.module.css";

const initialExpensesTotal = 5000;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(value);

export default function FinancePage() {
  return (
    <ClinicShell active="הרו״ח שלי">
      <div className={styles.page}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>המרכז הפיננסי של הקליניקה</span>
            <h1>הרו״ח שלי</h1>
            <p>כל מה שצריך לדעת על ההכנסות, ההוצאות והמסים של הקליניקה במקום אחד.</p>
          </div>
        </header>

        <section className={styles.summaryGrid} aria-label="סיכום פיננסי חודשי">
          <article className={styles.summaryCard}>
            <span>הכנסות החודש</span>
            <strong>לפי טיפולים</strong>
            <small>נפריד בין שולם לבין טרם שולם</small>
          </article>

          <article className={styles.summaryCard}>
            <span>הוצאות החודש</span>
            <strong>{formatCurrency(initialExpensesTotal)}</strong>
            <small>הטבלה למטה ניתנת לעריכה</small>
          </article>

          <article className={`${styles.summaryCard} ${styles.vatCard}`}>
            <span>מע״מ צפוי לתשלום</span>
            <strong>—</strong>
            <small>יחושב לפי הכנסות מול מע״מ תשומות</small>
          </article>

          <article className={styles.summaryCard}>
            <span>רווח החודש</span>
            <strong>—</strong>
            <small>הכנסות מטיפולים פחות הוצאות</small>
          </article>
        </section>

        <section className={styles.contentGrid}>
          <ExpensesSheet />

          <aside className={styles.sideColumn}>
            <article className={`${styles.panel} ${styles.taxPanel}`}>
              <div className={styles.taxIcon}>%</div>
              <span>מע״מ קרוב</span>
              <h2>עדיין אין חישוב</h2>
              <p>ברגע שנחבר את הטיפולים והוצאות המע״מ, כאן נראה כמה צפוי לרדת ומתי צריך לשלם.</p>
              <button type="button" className={styles.taxButton}>הגדר דיווח מע״מ</button>
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHeaderCompact}>
                <h2>הכנסות מטיפולים</h2>
              </div>
              <ul className={styles.futureList}>
                <li><span>✓</span> טיפולים ששולמו</li>
                <li><span>✓</span> טיפולים שטרם שולמו</li>
                <li><span>✓</span> סה״כ צפוי להיכנס</li>
                <li><span>✓</span> קישור ישיר לכרטיס המטופל</li>
              </ul>
            </article>
          </aside>
        </section>
      </div>
    </ClinicShell>
  );
}
