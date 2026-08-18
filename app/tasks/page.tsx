import { ClinicShell } from "../clinic-shell";
import { TasksBoard } from "./tasks-board";
import styles from "./tasks.module.css";

export default function TasksPage() {
  return (
    <ClinicShell active="משימות וניהול">
      <section className={styles.page}>
        <header className={styles.header}>
          <div>
            <span>ניהול שוטף</span>
            <h1>משימות וניהול</h1>
            <p>טבלת משימות פשוטה עם סטטוס והערות חופשיות.</p>
          </div>
        </header>
        <TasksBoard />
      </section>
    </ClinicShell>
  );
}
