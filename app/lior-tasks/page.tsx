import { ClinicShell } from "../clinic-shell";

export default function LiorTasksPage() {
  return (
    <ClinicShell active="משימות ליאור">
      <section className="patients-page">
        <div className="clinic-topbar">
          <div>
            <h1>משימות ליאור</h1>
            <p>עמוד ייעודי למשימות של ליאור. נבנה אותו בהמשך בלי לערבב עם שאר אזורי המערכת.</p>
          </div>
        </div>

        <article className="clinic-card info-block">
          <div className="clinic-section-title">
            <h2>בקרוב</h2>
          </div>
          <p>כאן יהיו המשימות של ליאור.</p>
        </article>
      </section>
    </ClinicShell>
  );
}
