import Link from "next/link";
import "./clinic.css";
import "./clinic-cursor.css";

const nav = [
  ["/", "⌂", "ראשי"],
  ["/patients", "◉", "המטופלים שלי"],
  ["/calendar", "▣", "יומן טיפולים"],
  ["/study", "▤", "ספריית ידע"],
  ["/finance", "₪", "הרו״ח שלי"],
  ["/pricing", "₪", "מחירון"],
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

        <div style={{ marginTop: "auto", paddingTop: 18, borderTop: "1px solid rgba(255,255,255,.14)" }}>
          <div style={{ padding: "0 12px 8px", color: "#9eb6ad", fontSize: 10, fontWeight: 900, letterSpacing: ".12em" }}>
            אזור אישי
          </div>
          <nav className="clinic-nav">
            {personalNav.map(([href, icon, label]) => (
              <Link key={label} href={href} className={active === label ? "active" : ""}>
                <span className="nav-icon">{icon}</span><span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="clinic-user" style={{ marginTop: 0 }}><strong>ליהי אנגלצ׳ין</strong><small>מטפלת · הקליניקה שלי</small></div>
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
