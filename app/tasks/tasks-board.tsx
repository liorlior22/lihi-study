"use client";

import { useState } from "react";
import styles from "./tasks.module.css";

type TaskStatus = "בוצע" | "לא בוצע";

type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  notes: string;
};

const initialTasks: Task[] = [
  { id: "task-1", title: "לעבור על רשימת המטופלים החדשים", status: "לא בוצע", notes: "" },
  { id: "task-2", title: "לעדכן זמינות לשבוע הבא", status: "בוצע", notes: "הזמינות עודכנה." },
];

export function TasksBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<{ title: string; status: TaskStatus; notes: string }>({
    title: "",
    status: "לא בוצע",
    notes: "",
  });

  function addTask(event: React.FormEvent) {
    event.preventDefault();
    const title = draft.title.trim();
    if (!title) return;

    setTasks((current) => [
      { id: `task-${Date.now()}`, title, status: draft.status, notes: draft.notes.trim() },
      ...current,
    ]);
    setDraft({ title: "", status: "לא בוצע", notes: "" });
    setShowForm(false);
  }

  function updateTask(id: string, field: "status" | "notes", value: string) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, [field]: value } as Task : task));
  }

  return (
    <article className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <span>ניהול שוטף</span>
          <h2>משימות</h2>
        </div>
        <button type="button" className={styles.primaryButton} onClick={() => setShowForm((value) => !value)}>
          {showForm ? "ביטול" : "+ משימה חדשה"}
        </button>
      </div>

      {showForm && (
        <form className={styles.addForm} onSubmit={addTask}>
          <label>
            <span>משימה</span>
            <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="מה צריך לעשות?" autoFocus />
          </label>
          <label>
            <span>סטטוס</span>
            <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as TaskStatus })}>
              <option>לא בוצע</option>
              <option>בוצע</option>
            </select>
          </label>
          <label className={styles.notesField}>
            <span>הערות</span>
            <textarea value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} placeholder="הערות חופשיות..." rows={3} />
          </label>
          <button type="submit" className={styles.saveButton} disabled={!draft.title.trim()}>הוסף משימה</button>
        </form>
      )}

      <div className={styles.tableWrap}>
        <div className={styles.tableHeader} aria-hidden="true">
          <span>משימה</span>
          <span>סטטוס</span>
          <span>הערות</span>
        </div>

        {tasks.map((task) => (
          <div className={styles.tableRow} key={task.id}>
            <strong className={task.status === "בוצע" ? styles.doneTitle : ""}>{task.title}</strong>
            <div className={styles.statusCell}>
              <select
                value={task.status}
                className={task.status === "בוצע" ? styles.doneStatus : styles.pendingStatus}
                onChange={(event) => updateTask(task.id, "status", event.target.value)}
                aria-label={`סטטוס ${task.title}`}
              >
                <option>לא בוצע</option>
                <option>בוצע</option>
              </select>
            </div>
            <textarea
              value={task.notes}
              onChange={(event) => updateTask(task.id, "notes", event.target.value)}
              placeholder="הוסף הערה..."
              rows={2}
              aria-label={`הערות ${task.title}`}
            />
          </div>
        ))}
      </div>
    </article>
  );
}
