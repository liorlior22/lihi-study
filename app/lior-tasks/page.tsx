import { ClinicShell } from "../clinic-shell";

const tasks = [
  {
    id: 1,
    title: "התחברות Google למטפלת",
    description: "חיבור חשבון Google של המטפלת למערכת והכנת תשתית להרשאות ושירותי Google.",
  },
  {
    id: 2,
    title: "התחברות Google Calendar",
    description: "סנכרון יומן הטיפולים עם Google Calendar לצפייה, יצירה ועדכון של תורים.",
  },
  {
    id: 3,
    title: "Google Forms מובנה לשאלון ראשוני במטופלים",
    description: "חיבור שאלון Google Forms לכרטיס המטופל, כולל שליחה, סטטוס מילוי והצגת התשובות במערכת.",
  },
  {
    id: 4,
    title: "התחברות חשבונית ירוקה",
    description: "חיבור מערכת חשבונית ירוקה להפקת מסמכים וקישור בין תשלום של מטופל לבין קבלה או חשבונית.",
  },
  {
    id: 5,
    title: "סריקת תשלום ב-Bit",
    description: "אפשרות לזהות או לסרוק תשלום שבוצע ב-Bit ולקשר אותו למטופל ולטיפול המתאים.",
  },
];

export default function LiorTasksPage() {
  return (
    <ClinicShell active="משימות ליאור">
      <section className="patients-page">
        <div className="clinic-topbar">
          <div>
            <h1>משימות ליאור</h1>
            <p>משימות פיתוח וחיבורים שצריך להשלים בהמשך.</p>
          </div>
        </div>

        <div className="info-stack">
          {tasks.map((task) => (
            <article className="clinic-card info-block" key={task.id}>
              <div className="clinic-section-title">
                <h2>{task.title}</h2>
                <span className="status-pill new">לביצוע</span>
              </div>
              <p>{task.description}</p>
            </article>
          ))}
        </div>
      </section>
    </ClinicShell>
  );
}
