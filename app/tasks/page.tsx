import { ClinicShell } from "../clinic-shell";
import { TasksBoard } from "./tasks-board";
import styles from "./tasks.module.css";

export default function TasksPage() {
  return (
    <ClinicShell active="משימות וניהול">
      <section className={styles.page}>
        <header className={styles.header}>
          <div>
            <span>מרכז ההקמה והניהול</span>
            <h1>משימות וניהול</h1>
            <p>כל מה שצריך כדי שהקליניקה תהיה מוכנה, מסודרת ונראית מקצועית — מחולק לתחומים עם התקדמות ברורה.</p>
          </div>
        </header>
        <TasksBoard />
      </section>
    </ClinicShell>
  );
}
