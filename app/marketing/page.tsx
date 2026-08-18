import { ClinicShell } from "../clinic-shell";
import { LeadsBoard } from "./leads-board";
import styles from "./marketing.module.css";

export default function MarketingPage() {
  return (
    <ClinicShell active="מכירות ושיווק">
      <section className={styles.page}>
        <header className={styles.header}>
          <div>
            <span>CRM קל ופשוט</span>
            <h1>מכירות ושיווק</h1>
            <p>כל הלידים במקום אחד — פרטי קשר והערות להמשך טיפול.</p>
          </div>
        </header>
        <LeadsBoard />
      </section>
    </ClinicShell>
  );
}
