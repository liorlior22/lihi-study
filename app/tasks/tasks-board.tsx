"use client";

import { useMemo, useState } from "react";
import styles from "./tasks.module.css";

type TaskStatus = "בוצע" | "לא בוצע";
type TaskCategory = "marketing" | "inventory" | "bureaucracy";

type Task = {
  id: string;
  category: TaskCategory;
  title: string;
  status: TaskStatus;
  notes: string;
};

const categoryMeta: Record<TaskCategory, { title: string; subtitle: string }> = {
  marketing: {
    title: "שיווק",
    subtitle: "נכסים, ערוצים ותשתיות להבאת מטופלים חדשים",
  },
  inventory: {
    title: "מלאי",
    subtitle: "ציוד וחומרים שצריך להזמין לקליניקה",
  },
  bureaucracy: {
    title: "בירוקרטיה",
    subtitle: "כל מה שצריך להסדיר כדי להפעיל את הקליניקה",
  },
};

const categoryOrder: TaskCategory[] = ["marketing", "inventory", "bureaucracy"];

const initialTasks: Task[] = [
  { id: "marketing-name", category: "marketing", title: "בחירת שם", status: "לא בוצע", notes: "" },
  { id: "marketing-logo", category: "marketing", title: "עשיית לוגו", status: "לא בוצע", notes: "" },
  { id: "marketing-email", category: "marketing", title: "פתיחת מייל", status: "לא בוצע", notes: "" },
  { id: "marketing-whatsapp", category: "marketing", title: "וואטסאפ עסקי", status: "לא בוצע", notes: "" },
  { id: "marketing-instagram", category: "marketing", title: "אינסטגרם", status: "לא בוצע", notes: "" },
  { id: "marketing-facebook", category: "marketing", title: "פייסבוק", status: "לא בוצע", notes: "" },
  { id: "marketing-site", category: "marketing", title: "אתר להפצה", status: "לא בוצע", notes: "" },
  { id: "marketing-youtube", category: "marketing", title: "יוטיוב", status: "לא בוצע", notes: "" },

  { id: "inventory-needles", category: "inventory", title: "הזמנת מחטים", status: "לא בוצע", notes: "" },
  { id: "inventory-bed", category: "inventory", title: "הזמנת מיטה", status: "לא בוצע", notes: "" },
  { id: "inventory-cups", category: "inventory", title: "הזמנת כוסות רוח", status: "לא בוצע", notes: "" },

  { id: "bureaucracy-business", category: "bureaucracy", title: "פתיחת עוסק פטור או מורשה", status: "לא בוצע", notes: "" },
  { id: "bureaucracy-insurance", category: "bureaucracy", title: "ביטוח", status: "לא בוצע", notes: "" },
  { id: "bureaucracy-address", category: "bureaucracy", title: "כתובת דואר", status: "לא בוצע", notes: "" },
];

export function TasksBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<{ category: TaskCategory; title: string; status: TaskStatus; notes: string }>({
    category: "marketing",
    title: "",
    status: "לא בוצע",
    notes: "",
  });

  const completedCount = useMemo(() => tasks.filter((task) => task.status === "בוצע").length, [tasks]);

  function addTask(event: React.FormEvent) {
    event.preventDefault();
    const title = draft.title.trim();
    if (!title) return;

    setTasks((current) => [
      ...current,
      {
        id: `task-${Date.now()}`,
        category: draft.category,
        title,
        status: draft.status,
        notes: draft.notes.trim(),
      },
    ]);
    setDraft({ category: draft.category, title: "", status: "לא בוצע", notes: "" });
    setShowForm(false);
  }

  function updateTask(id: string, field: "status" | "notes", value: string) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, [field]: value } as Task : task));
  }

  return (
    <div className={styles.board}>
      <div className={styles.boardToolbar}>
        <div>
          <strong>{completedCount} מתוך {tasks.length} הושלמו</strong>
          <span>אפשר לעדכן סטטוס והערות ישירות בכל שורה</span>
        </div>
        <button type="button" className={styles.primaryButton} onClick={() => setShowForm((value) => !value)}>
          {showForm ? "ביטול" : "+ משימה חדשה"}
        </button>
      </div>

      {showForm && (
        <form className={styles.addForm} onSubmit={addTask}>
          <label>
            <span>תחום</span>
            <select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as TaskCategory })}>
              <option value="marketing">שיווק</option>
              <option value="inventory">מלאי</option>
              <option value="bureaucracy">בירוקרטיה</option>
            </select>
          </label>
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

      <div className={styles.categoryGrid}>
        {categoryOrder.map((category) => {
          const categoryTasks = tasks.filter((task) => task.category === category);
          const categoryCompleted = categoryTasks.filter((task) => task.status === "בוצע").length;
          const meta = categoryMeta[category];

          return (
            <section className={styles.categoryPanel} key={category}>
              <div className={styles.categoryHeader}>
                <div>
                  <span>{categoryCompleted}/{categoryTasks.length} בוצעו</span>
                  <h2>{meta.title}</h2>
                  <p>{meta.subtitle}</p>
                </div>
                <strong>{categoryTasks.length}</strong>
              </div>

              <div className={styles.tableWrap}>
                <div className={styles.tableHeader} aria-hidden="true">
                  <span>משימה</span>
                  <span>סטטוס</span>
                  <span>הערות</span>
                </div>

                {categoryTasks.map((task) => (
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
            </section>
          );
        })}
      </div>
    </div>
  );
}
