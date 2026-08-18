import Link from "next/link";
import { notFound } from "next/navigation";
import { ClinicShell } from "../../clinic-shell";
import { getPatient, patients } from "../../clinic-data";
import { PatientTabs } from "./patient-tabs";
import { PatientProfileHeader } from "./patient-profile-header";

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
        <PatientProfileHeader patient={patient} />
        <PatientTabs patient={patient} />
      </section>
    </ClinicShell>
  );
}
