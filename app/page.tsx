import Link from "next/link";
import { ClinicShell } from "./clinic-shell";
import { patients } from "./clinic-data";

export default function Home() {
  const nextPatient = patients[0];
  return (
    <ClinicShell active="ראשי">
      <div className="clinic-topbar">
        <div>
          <h1>ערב טוב, ליהי</h1>
          <p>הנה מה שמחכה לך בקליניקה היום.</p>
        </div>
        <button className="clinic-primary">+ טיפול חדש</button>
      </div>

      <section className="clinic-grid">
        <article className="clinic-card clinic-stat">
          <span>טיפולים היום</span>
          <strong>3</strong>
          <small>הבא ב־18:00</small>
        </article>
        <article className="clinic-card clinic-stat">
          <span>מטופלים פעילים</span>
          <strong>{patients.filter((patient) => patient.status === "פעיל").length}</strong>
          <small>+ מטופל חדש אחד</small>
        </article>
        <article className="clinic-card clinic-stat">
          <span>תשלומים פתוחים</span>
          <strong>₪350</strong>
          <small>תשלום אחד ממתין</small>
        </article>
        <article className="clinic-card clinic-stat">
          <span>השבוע</span>
          <strong>8</strong>
          <small>טיפולים מתוכננים</small>
        </article>

        <article className="clinic-card clinic-next">
          <div className="clinic-section-title"><h2>הטיפול הבא</h2><span className="status-pill">היום</span></div>
          <div className="appointment-card">
            <div className="appointment-person">
              <div className="patient-avatar">{nextPatient.initials}</div>
              <div><strong>{nextPatient.name}</strong><small>{nextPatient.occupation} · טיפול #{nextPatient.treatments + 1}</small></div>
            </div>
            <div className="appointment-time"><b>18:00</b><span>60 דקות</span></div>
          </div>
          <div className="quick-note" style={{marginTop:12}}><strong>לפני שהוא נכנס</strong>{nextPatient.reminder}</div>
        </article>

        <article className="clinic-card clinic-side-card">
          <div className="clinic-section-title"><h2>המטופלים שלי</h2><Link href="/patients">הצג הכל</Link></div>
          <div className="patient-list">
            {patients.map((patient) => (
              <Link href={`/patients/${patient.id}`} className="patient-row" key={patient.id}>
                <div className="patient-row-main">
                  <div className="patient-avatar">{patient.initials}</div>
                  <div><strong>{patient.name}</strong><small>{patient.status === "חדש" ? "מטופל חדש" : `טיפול אחרון ${patient.lastTreatment}`}</small></div>
                </div>
                <div className="patient-row-meta"><b>{patient.nextTreatment}</b><span>{patient.balance ? `יתרה ₪${patient.balance}` : "תשלום מסודר"}</span></div>
              </Link>
            ))}
          </div>
        </article>
      </section>
    </ClinicShell>
  );
}
