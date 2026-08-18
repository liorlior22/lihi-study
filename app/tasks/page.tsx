import { ClinicShell } from "../clinic-shell";

export default function TasksPage() {
  return (
    <ClinicShell active="משימות וניהול">
      <section style={{maxWidth:1180,margin:"0 auto"}}>
        <div className="clinic-topbar">
          <div>
            <h1>משימות וניהול</h1>
            <p>העמוד נשמר להמשך בנייה. כרגע ממשיכים לעבוד על המטופלים שלי.</p>
          </div>
        </div>
      </section>
    </ClinicShell>
  );
}
