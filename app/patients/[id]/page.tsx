import Link from "next/link";
import { notFound } from "next/navigation";
import { ClinicShell } from "../../clinic-shell";
import { getPatient, patients } from "../../clinic-data";

export function generateStaticParams() {
  return patients.map((patient) => ({ id: patient.id }));
}

export default async function PatientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const patient = getPatient(id);
  if (!patient) notFound();

  return (
    <ClinicShell active="המטופלים שלי">
      <section className="patient-profile">
        <Link href="/patients" className="back-link">← חזרה לכל המטופלים</Link>

        <header className="patient-hero">
          <div className="patient-avatar">{patient.initials}</div>
          <div>
            <h1>{patient.name}</h1>
            <p>{patient.occupation} · גיל {patient.age} · {patient.phone}</p>
          </div>
          <div className="patient-hero-actions">
            <small>הטיפול הבא</small>
            <b>{patient.nextTreatment}</b>
          </div>
        </header>

        <div className="patient-tabs" aria-label="כרטיסיות מטופל">
          <button className="active">סקירה</button>
          <button>טיפולים ({patient.treatments})</button>
          <button>שאלון ראשוני</button>
          <button>תשלומים</button>
          <button>קבצים</button>
        </div>

        <div className="patient-content">
          <div className="info-stack">
            <article className="clinic-card info-block">
              <div className="clinic-section-title"><h2>היכרות ואפיון</h2><button className="clinic-primary">עריכה</button></div>
              <h3>רקע משפחתי</h3><p>{patient.family}</p>
              <hr style={{border:0,borderTop:"1px solid #edf0ea",margin:"18px 0"}} />
              <h3>תחביבים ואורח חיים</h3><p>{patient.hobbies}</p>
              <hr style={{border:0,borderTop:"1px solid #edf0ea",margin:"18px 0"}} />
              <h3>האפיון של ליהי</h3><p>{patient.profile}</p>
            </article>

            <article className="clinic-card">
              <div className="clinic-section-title"><h2>מעקב טיפולים</h2><button className="clinic-primary">+ טיפול חדש</button></div>
              {patient.treatments > 0 ? (
                <div className="treatment-timeline">
                  <div className="treatment-item"><strong>טיפול #{patient.treatments}</strong><span>{patient.lastTreatment} · מעקב אחר התלונה המרכזית</span></div>
                  {patient.treatments > 1 && <div className="treatment-item"><strong>טיפול #{patient.treatments - 1}</strong><span>פגישה קודמת · המשך תוכנית טיפול</span></div>}
                  {patient.treatments > 2 && <div className="treatment-item"><strong>טיפול #1</strong><span>פגישת היכרות ואבחון ראשוני</span></div>}
                </div>
              ) : <p style={{color:"#7c8781"}}>עדיין אין טיפולים מתועדים. הטיפול הראשון יופיע כאן.</p>}
            </article>
          </div>

          <aside>
            <div className="reminder-card">
              <span>לפני שהמטופל נכנס · 20 שניות</span>
              <h3>מה חשוב לזכור היום?</h3>
              <p>{patient.reminder}</p>
            </div>
            <div className="clinic-card" style={{marginTop:16}}>
              <div className="clinic-section-title"><h2>תשלום</h2><span className={patient.balance ? "status-pill new" : "status-pill"}>{patient.balance ? "פתוח" : "מסודר"}</span></div>
              <p style={{margin:0,color:"#6e7973"}}>יתרה נוכחית</p>
              <strong style={{display:"block",fontSize:28,marginTop:6}}>{patient.balance ? `₪${patient.balance}` : "₪0"}</strong>
            </div>
          </aside>
        </div>
      </section>
    </ClinicShell>
  );
}
