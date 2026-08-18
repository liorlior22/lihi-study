import { ClinicShell } from "../clinic-shell";
import styles from "./finance.module.css";

const expenses = [
  { id: 1, category: "קליניקה", description: "שכירות קליניקה", amount: 3500, recurring: "קבועה" },
  { id: 2, category: "חומרי טיפול", description: "חומרי טיפול וציוד מתכלה", amount: 1500, recurring: "משתנה" },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(value);

export default function FinancePage() {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <ClinicShell active="הרו״ח שלי">
      <div className={styles.page}>
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>המרכז הפיננסי של הקליניקה</span>
            <h1>הרו״ח שלי</h1>
            <p>כל מה שצריך לדעת על ההכנסות, ההוצאות והמסים של הקליניקה במקום אחד.</p>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className={styles.secondaryButton}>+ הוצאה</button>
            <button type="button" className={styles.primaryButton}>+ הכנסה</button>
          </div>
        </header>

        <section className={styles.summaryGrid} aria-label="סיכום פיננסי חודשי">
          <article className={styles.summaryCard}>
            <span>הכנסות החודש</span>
            <strong>טרם הוזנו</strong>
            <small>נחבר בהמשך אוטומטית מתשלומי המטופלים</small>
          </article>

          <article className={styles.summaryCard}>
            <span>הוצאות החודש</span>
            <strong>{formatCurrency(totalExpenses)}</strong>
            <small>{expenses.length} הוצאות רשומות</small>
          </article>

          <article className={`${styles.summaryCard} ${styles.vatCard}`}>
            <span>מע״מ צפוי לתשלום</span>
            <strong>—</strong>
            <small>יחושב לאחר הזנת הכנסות ומע״מ תשומות</small>
          </article>

          <article className={styles.summaryCard}>
            <span>רווח החודש</span>
            <strong>—</strong>
            <small>יחושב אוטומטית מהכנסות פחות הוצאות</small>
          </article>
        </section>

        <section className={styles.contentGrid}>
          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <span>החודש הנוכחי</span>
                <h2>הוצאות</h2>
              </div>
              <button type="button" className={styles.textButton}>הוסף הוצאה</button>
            </div>

            <div className={styles.expensesList}>
              {expenses.map((expense) => (
                <div className={styles.expenseRow} key={expense.id}>
                  <div className={styles.expenseIcon}>₪</div>
                  <div className={styles.expenseMain}>
                    <strong>{expense.category}</strong>
                    <span>{expense.description}</span>
                  </div>
                  <div className={styles.expenseMeta}>
                    <strong>{formatCurrency(expense.amount)}</strong>
                    <span>{expense.recurring}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.totalRow}>
              <span>סה״כ הוצאות</span>
              <strong>{formatCurrency(totalExpenses)}</strong>
            </div>
          </article>

          <aside className={styles.sideColumn}>
            <article className={`${styles.panel} ${styles.taxPanel}`}>
              <div className={styles.taxIcon}>%</div>
              <span>מע״מ קרוב</span>
              <h2>עדיין אין חישוב</h2>
              <p>ברגע שיהיו הכנסות והוצאות עם פירוט מע״מ, כאן נראה כמה צפוי לרדת ומתי צריך לשלם.</p>
              <button type="button" className={styles.taxButton}>הגדר דיווח מע״מ</button>
            </article>

            <article className={styles.panel}>
              <div className={styles.panelHeaderCompact}>
                <h2>מה נשמור כאן בהמשך</h2>
              </div>
              <ul className={styles.futureList}>
                <li><span>✓</span> הכנסות מטיפולים</li>
                <li><span>✓</span> הוצאות מוכרות</li>
                <li><span>✓</span> מע״מ עסקאות ותשומות</li>
                <li><span>✓</span> מועדי דיווח ותשלום</li>
                <li><span>✓</span> רווח חודשי ושנתי</li>
                <li><span>✓</span> יצוא מסודר לרו״ח</li>
              </ul>
            </article>
          </aside>
        </section>
      </div>
    </ClinicShell>
  );
}
