import Link from "next/link";
import "./clinic.css";
import "./clinic-cursor.css";

const nav = [
  ["/", "⌂", "ראשי"],
  ["/patients", "◉", "המטופלים שלי"],
  ["#", "▣", "יומן טיפולים"],
  ["/study", "▤", "ספריית ידע"],
  ["/finance", "₪", "הרו״ח שלי"],
  ["/marketing", "↗", "מכירות ושיווק"],
  ["/room-rentals", "◫", "השכרת קליניקה"],
  ["/tasks", "✓", "משימות וניהול"],
] as const;

const personalNav = [
  ["/lior-tasks", "L", "משימות ליאור"],
] as const;

function mobileLabel(label: string) {
  if (label === "המטופלים שלי") return "מטופלים";
  if (label === "הרו״ח שלי") return "רו״ח";
  if (label === "מכירות ושיווק") return "שיווק";
  if (label === "השכרת קליניקה") return "השכרה";
  if (label === "משימות וניהול") return "משימות";
  return label.replace(" טיפולים", "");
}

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

        <nav className="clinic-personal-nav" aria-label="משימות אישיות">
          <span className="clinic-personal-label">אזור אישי</span>
          {personalNav.map(([href, icon, label]) => (
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
            <b>{icon}</b>{mobileLabel(label)}
          </Link>
        ))}
      </nav>
    </div>
  );
}
