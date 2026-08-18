import { ClinicShell } from "../clinic-shell";
import { ExpensesSheet } from "./expenses-sheet";
import { FinanceSummary } from "./finance-summary";
import { IncomeSheet } from "./income-sheet";
import styles from "./finance.module.css";

export default function FinancePage() {
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

        <FinanceSummary />

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
                <li><span>✓</span> השכרת קליניקה מתווספת אוטומטית להכנסות</li>
                <li><span>✓</span> סטטוס התשלום משפיע על שולם / טרם שולם</li>
              </ul>
            </article>
          </aside>
        </section>
      </div>
    </ClinicShell>
  );
}
