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

const categoryMeta: Record<TaskCategory, { title: string; subtitle: string; emoji: string; kicker: string }> = {
  marketing: {
    title: "שיווק",
    subtitle: "בונים נוכחות, מותג וערוצים שיביאו את המטופלים הראשונים.",
    emoji: "🚀",
    kicker: "בונים קהל",
  },
  inventory: {
    title: "מלאי",
    subtitle: "כל הציוד שצריך כדי שהקליניקה תהיה מוכנה לעבודה בלי הפתעות.",
    emoji: "📦",
    kicker: "מתכוננים לפתיחה",
  },
  bureaucracy: {
    title: "בירוקרטיה",
    subtitle: "סוגרים את הדברים שחייבים להיות מסודרים מאחורי הקלעים.",
    emoji: "🛡️",
    kicker: "מסדרים את הבסיס",
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
  const totalProgress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
  const isAllDone = tasks.length > 0 && completedCount === tasks.length;

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
      <section className={styles.overviewCard}>
        <div className={styles.overviewCopy}>
          <span className={styles.overviewIcon}>✓</span>
          <div>
            <span className={styles.overallEyebrow}>מצב הקמה</span>
            <h2>{isAllDone ? "הכול מוכן" : "מתקדמים לפתיחה"}</h2>
            <p>{completedCount} מתוך {tasks.length} משימות הושלמו בשלושת תחומי ההקמה.</p>
          </div>
        </div>

        <div className={styles.overviewActions}>
          <div className={styles.overallScore}>
            <strong>{totalProgress}%</strong>
            <span>התקדמות כוללת</span>
          </div>
          <button type="button" className={styles.primaryButton} onClick={() => setShowForm((value) => !value)}>
            {showForm ? "סגור" : "+ משימה חדשה"}
          </button>
        </div>
      </section>

      {showForm && (
        <form className={styles.addForm} onSubmit={addTask}>
          <div className={styles.formHeading}>
            <strong>משימה חדשה</strong>
            <span>הוסיפי משימה לאחד מתחומי ההקמה</span>
          </div>
          <label>
            <span>תחום</span>
            <select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as TaskCategory })}>
              <option value="marketing">🚀 שיווק</option>
              <option value="inventory">📦 מלאי</option>
              <option value="bureaucracy">🛡️ בירוקרטיה</option>
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
          const categoryProgress = categoryTasks.length ? Math.round((categoryCompleted / categoryTasks.length) * 100) : 0;
          const meta = categoryMeta[category];

          return (
            <section className={styles.categoryPanel} data-category={category} key={category}>
              <div className={styles.categoryHero}>
                <div className={styles.categoryIdentity}>
                  <div className={styles.categoryEmoji} aria-hidden="true">{meta.emoji}</div>
                  <div>
                    <span className={styles.categoryKicker}>{meta.kicker}</span>
                    <h2>{meta.title}</h2>
                    <p>{meta.subtitle}</p>
                  </div>
                </div>

                <div className={styles.categoryProgressBox}>
                  <div className={styles.categoryProgressText}>
                    <span>{categoryCompleted} מתוך {categoryTasks.length} הושלמו</span>
                    <strong>{categoryProgress}%</strong>
                  </div>
                  <div className={styles.progressTrack} aria-label={`${meta.title}: ${categoryProgress}% הושלם`}>
                    <span style={{ width: `${categoryProgress}%` }} />
                  </div>
                  {categoryProgress === 100 && <span className={styles.completeBadge}>✓ התחום הושלם</span>}
                </div>
              </div>

              <div className={styles.tableWrap}>
                <div className={styles.tableHeader} aria-hidden="true">
                  <span>משימה</span>
                  <span>סטטוס</span>
                  <span>הערות</span>
                </div>

                {categoryTasks.map((task) => (
                  <div className={styles.tableRow} data-done={task.status === "בוצע"} key={task.id}>
                    <div className={styles.taskTitleCell}>
                      <span className={styles.taskCheck}>{task.status === "בוצע" ? "✓" : "○"}</span>
                      <strong>{task.title}</strong>
                    </div>
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
