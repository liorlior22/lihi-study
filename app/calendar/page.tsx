import { ClinicShell } from "../clinic-shell";
import { CalendarManager } from "./calendar-manager";
import styles from "./calendar.module.css";

export default function CalendarPage() {
  return (
    <ClinicShell active="יומן טיפולים">
      <section className={styles.page}>
        <header className={styles.pageHeader}>
          <div>
            <span>תורים וזמינות</span>
            <h1>יומן טיפולים</h1>
            <p>מנהלים את השבוע, שעות העבודה, חסימות וקישור קביעת התורים ממקום אחד.</p>
          </div>
        </header>
        <CalendarManager />
      </section>
    </ClinicShell>
  );
}
