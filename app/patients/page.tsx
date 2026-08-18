import Link from "next/link";
import { ClinicShell } from "../clinic-shell";
import { patients } from "../clinic-data";

export default function PatientsPage() {
  return (
    <ClinicShell active="המטופלים שלי">
      <section className="patients-page">
        <div className="clinic-topbar">
          <div><h1>המטופלים שלי</h1><p>כל האנשים, כל ההיסטוריה וכל מה שחשוב לזכור במקום אחד.</p></div>
          <button className="clinic-primary">+ מטופל חדש</button>
        </div>

        <div className="patients-toolbar">
          <input className="patients-search" placeholder="חיפוש לפי שם או טלפון..." aria-label="חיפוש מטופל" />
        </div>

        <div className="patients-cards">
          {patients.map((patient) => (
            <Link className="patient-card-link" href={`/patients/${patient.id}`} key={patient.id}>
              <article className="patient-card">
                <div className="patient-card-head">
                  <div className="patient-avatar">{patient.initials}</div>
                  <span className={`status-pill ${patient.status === "חדש" ? "new" : ""}`}>{patient.status}</span>
                </div>
                <h2>{patient.name}</h2>
                <p>{patient.occupation} · גיל {patient.age}</p>
                <dl>
                  <div><dt>טיפול אחרון</dt><dd>{patient.lastTreatment}</dd></div>
                  <div><dt>טיפול הבא</dt><dd>{patient.nextTreatment}</dd></div>
                  <div><dt>טיפולים</dt><dd>{patient.treatments}</dd></div>
                  <div><dt>יתרה</dt><dd>{patient.balance ? `₪${patient.balance}` : "אין יתרה"}</dd></div>
                </dl>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </ClinicShell>
  );
}
