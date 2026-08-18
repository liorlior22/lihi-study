import { ClinicShell } from "../clinic-shell";
import { ExpensesSheet } from "./expenses-sheet";
import { IncomeSheet } from "./income-sheet";
import styles from "./finance.module.css";

const totalIncome = 5000;
const paidIncome = 5000;
const unpaidIncome = 0;
const initialExpensesTotal = 5000;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);

export default function FinancePage() {
  const monthlyResult = totalIncome - initialExpensesTotal;

  return (
    <ClinicShell active="הרו״ח שלי">
      <div className={styles.page}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>המרכז הפיננסי של הקליניקה</span>
            <h1>הרו״ח שלי</h1>
            <p>תמונה חודשית פשוטה של הכנסות, הוצאות, כספים שהתקבלו וסכומים שעדיין פתוחים.</p>
          </div>
        </header>

        <section className={styles.summaryGrid} aria-label="סיכום פיננסי חודשי">
          <article className={styles.summaryCard}>
            <span>הכנסות החודש</span>
            <strong>{formatCurrency(totalIncome)}</strong>
            <small>כל מקורות ההכנסה</small>
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
            <small>הכנסות פחות הוצאות</small>
          </article>
        </section>

        <div style={{ marginBottom: 18 }}>
          <IncomeSheet />
        </div>

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
                <li><span>✓</span> ההכנסות מחולקות לפי מקור הכנסה</li>
                <li><span>✓</span> מטופלים מסוכמים לסכום אחד</li>
                <li><span>✓</span> ניתן לפתוח פירוט ולראות מאילו מטופלים הסכום מורכב</li>
                <li><span>✓</span> ניתן להוסיף אפיקי הכנסה נוספים כמו השכרת חדר</li>
              </ul>
            </article>
          </aside>
        </section>
      </div>
    </ClinicShell>
  );
}
