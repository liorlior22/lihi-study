import { ClinicShell } from "../clinic-shell";
import styles from "./pricing.module.css";

const singleTreatments = [
  { name: "טיפול בודד דיקור", price: 250, note: "טיפול דיקור בודד" },
  { name: "שיאצו + דיקור", price: 300, note: "טיפול משולב" },
  { name: "תוספת כוסות רוח", price: 50, note: "תוספת לכל טיפול" },
];

const packages = [
  {
    name: "כרטיסייה 5 טיפולי דיקור",
    price: 1000,
    treatments: 5,
    note: "כוסות רוח במתנה",
  },
  {
    name: "כרטיסייה 10 טיפולי דיקור",
    price: 1500,
    treatments: 10,
    note: "10 טיפולי דיקור",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);

export default function PricingPage() {
  return (
    <ClinicShell active="מחירון">
      <section className={styles.page}>
        <div className="clinic-topbar">
          <div>
            <span className={styles.eyebrow}>מחירי הקליניקה</span>
            <h1>מחירון</h1>
            <p>מחירי טיפולים וכרטיסיות במקום אחד.</p>
          </div>
        </div>

        <div className={styles.grid}>
          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <span>טיפולים</span>
                <h2>טיפולים בודדים</h2>
              </div>
            </div>

            <div className={styles.list}>
              {singleTreatments.map((item) => (
                <div className={styles.row} key={item.name}>
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.note}</small>
                  </div>
                  <b>{formatCurrency(item.price)}</b>
                </div>
              ))}
            </div>
          </article>

          <article className={`${styles.panel} ${styles.packagePanel}`}>
            <div className={styles.panelHeader}>
              <div>
                <span>חבילות</span>
                <h2>כרטיסיות טיפולים</h2>
              </div>
            </div>

            <div className={styles.packageGrid}>
              {packages.map((item) => (
                <div className={styles.packageCard} key={item.name}>
                  <span>{item.treatments} טיפולים</span>
                  <h3>{item.name}</h3>
                  <strong>{formatCurrency(item.price)}</strong>
                  <p>{item.note}</p>
                  <small>{formatCurrency(item.price / item.treatments)} לטיפול בממוצע</small>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </ClinicShell>
  );
}
