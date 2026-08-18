import Link from "next/link";
import "./clinic.css";

const nav = [
  ["/", "⌂", "ראשי"],
  ["/patients", "◉", "המטופלים שלי"],
  ["#", "▣", "יומן טיפולים"],
  ["/study", "▤", "ספריית ידע"],
  ["#", "₪", "תשלומים"],
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
      <main className="clinic-main">{children}</main>
      <nav className="clinic-mobile-nav">
        {nav.map(([href, icon, label]) => (
          <Link key={label} href={href} className={active === label ? "active" : ""}>
            <b>{icon}</b>{label === "המטופלים שלי" ? "מטופלים" : label.replace(" טיפולים", "")}
          </Link>
        ))}
      </nav>
    </div>
  );
}
