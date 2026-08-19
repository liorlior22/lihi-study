import { ClinicShell } from "../clinic-shell";
import { CalendarManager } from "./calendar-manager";
import styles from "./calendar.module.css";

export default function CalendarPage() {
  return (
    <ClinicShell active="יומן טיפולים">
      <section className={styles.page}>
        <header className={styles.pageHeader}>
          <div>
            <span>Google Calendar + קביעת תורים</span>
            <h1>יומן טיפולים</h1>
            <p>Google Calendar נשאר היומן שבו מנהלים את היום בפועל. כאן מחברים אותו לקליניקה, מגדירים שעות פעילות ומנהלים את קישור קביעת התורים.</p>
          </div>
        </header>
        <CalendarManager />
      </section>
    </ClinicShell>
  );
}
