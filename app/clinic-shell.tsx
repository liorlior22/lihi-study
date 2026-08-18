import Link from "next/link";
import "./clinic.css";
import "./clinic-cursor.css";

const nav = [
  ["/", "⌂", "ראשי"],
  ["/patients", "◉", "המטופלים שלי"],
  ["#", "▣", "יומן טיפולים"],
  ["/study", "▤", "ספריית ידע"],
  ["/finance", "₪", "הרו״ח שלי"],
  ["#", "↗", "מכירות ושיווק"],
] as const;

export function ClinicShell({ children, active = "ראשי" }: { children: React.ReactNode; active?: string }) {
  return (
    <div className="clinic-shell" dir="rtl">
      <aside className="clinic-sidebar">
        <div className="clinic-brand">
          <div className="clinic-brand-mark">L</div>
          <div><strong>Lihi Clinic</strong><span>מרחב הטיפול שלי</span></div>
        </div>
        <nav className="clinic-nav">
          {nav.map(([href, icon, label]) => (
            <Link key={label} href={href} className={active === label ? "active" : ""}>
              <span className="nav-icon">{icon}</span><span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="clinic-user"><strong>ליהי אנגלצ׳ין</strong><small>מטפלת · הקליניקה שלי</small></div>
      </aside>
      <main className="clinic-main">
        {active !== "ראשי" && (
          <Link href="/" className="clinic-home-back" aria-label="חזרה לעמוד הבית">
            <span aria-hidden="true">⌂</span>
            חזרה לעמוד הבית
          </Link>
        )}
        {children}
      </main>
      <nav className="clinic-mobile-nav">
        {nav.map(([href, icon, label]) => (
          <Link key={label} href={href} className={active === label ? "active" : ""}>
            <b>{icon}</b>{label === "המטופלים שלי" ? "מטופלים" : label === "הרו״ח שלי" ? "רו״ח" : label === "מכירות ושיווק" ? "שיווק" : label.replace(" טיפולים", "")}
          </Link>
        ))}
      </nav>
    </div>
  );
}
