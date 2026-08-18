import Link from "next/link";
import { notFound } from "next/navigation";
import { ClinicShell } from "../../clinic-shell";
import { getPatient, patients } from "../../clinic-data";
import { PatientTabs } from "./patient-tabs";

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

        <PatientTabs patient={patient} />
      </section>
    </ClinicShell>
  );
}
