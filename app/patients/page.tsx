import { ClinicShell } from "../clinic-shell";
import { patients } from "../clinic-data";
import { PatientsClient } from "./patients-client";

export default function PatientsPage() {
  return (
    <ClinicShell active="המטופלים שלי">
      <section className="patients-page">
        <PatientsClient initialPatients={patients} />
      </section>
    </ClinicShell>
  );
}
