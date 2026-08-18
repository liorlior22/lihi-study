import { ClinicShell } from "../clinic-shell";
import { RoomRentalsManager } from "./room-rentals-manager";

export default function RoomRentalsPage() {
  return (
    <ClinicShell active="השכרת קליניקה">
      <section className="patients-page">
        <div className="clinic-topbar">
          <div>
            <h1>השכרת קליניקה</h1>
            <p>ניהול השכרות לפי שעה והעברה אוטומטית להכנסות ב״הרו״ח שלי״.</p>
          </div>
        </div>
        <RoomRentalsManager />
      </section>
    </ClinicShell>
  );
}
