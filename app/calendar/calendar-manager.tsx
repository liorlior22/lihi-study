"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GoogleConnectButton } from "../google-connect-button";
import styles from "./calendar.module.css";

type DayKey = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
type DayAvailability = { enabled: boolean; from: string; to: string };
type Availability = Record<DayKey, DayAvailability>;

const dayLabels: Record<DayKey, string> = {
  sun: "ראשון",
  mon: "שני",
  tue: "שלישי",
  wed: "רביעי",
  thu: "חמישי",
  fri: "שישי",
  sat: "שבת",
};

const dayOrder: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const CALENDAR_SETTINGS_KEY = "lihi-clinic-calendar-settings-v1";

const defaultAvailability: Availability = {
  sun: { enabled: true, from: "09:00", to: "18:00" },
  mon: { enabled: true, from: "09:00", to: "18:00" },
  tue: { enabled: true, from: "09:00", to: "18:00" },
  wed: { enabled: true, from: "09:00", to: "18:00" },
  thu: { enabled: true, from: "09:00", to: "18:00" },
  fri: { enabled: false, from: "09:00", to: "14:00" },
  sat: { enabled: false, from: "09:00", to: "14:00" },
};

export function CalendarManager() {
  const [availability, setAvailability] = useState<Availability>(defaultAvailability);
  const [showAvailability, setShowAvailability] = useState(false);
  const [copyState, setCopyState] = useState("העתק קישור");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CALENDAR_SETTINGS_KEY);
      if (saved) setAvailability({ ...defaultAvailability, ...JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(CALENDAR_SETTINGS_KEY, JSON.stringify(availability));
    } catch {}
  }, [availability]);

  function updateAvailability(day: DayKey, patch: Partial<DayAvailability>) {
    setAvailability((current) => ({ ...current, [day]: { ...current[day], ...patch } }));
  }

  async function copyBookingLink() {
    try {
      const url = `${window.location.origin}/booking`;
      await navigator.clipboard.writeText(url);
      setCopyState("הועתק ✓");
      window.setTimeout(() => setCopyState("העתק קישור"), 1600);
    } catch {
      setCopyState("פתח קישור");
    }
  }

  return (
    <div className={styles.manager}>
      <section className={styles.googleHero}>
        <div className={styles.googleHeroCopy}>
          <span className={styles.eyebrow}>היומן המרכזי</span>
          <h2>Google Calendar הוא מקור האמת</h2>
          <p>ליהי מנהלת את התורים, החסימות והאירועים האישיים ב־Google Calendar. המערכת שלנו קוראת רק מה שצריך כדי לדעת מתי פנוי ומתי תפוס.</p>
        </div>
        <a className={styles.openGoogleButton} href="https://calendar.google.com/calendar/u/0/r" target="_blank" rel="noreferrer">
          פתח Google Calendar ↗
        </a>
      </section>

      <GoogleConnectButton />

      <section className={styles.workflowGrid}>
        <article>
          <span>01</span>
          <strong>ליהי מנהלת ביומן</strong>
          <p>טיפול, פגישה פרטית, חופש או כל חסימה אחרת נשארים בתוך Google Calendar.</p>
        </article>
        <article>
          <span>02</span>
          <strong>המערכת בודקת זמינות</strong>
          <p>ללקוח נציג רק שעות שבטווח העבודה ושאינן תפוסות ביומן.</p>
        </article>
        <article>
          <span>03</span>
          <strong>המטופל קובע לבד</strong>
          <p>הזמנה חדשה תיצור תור ביומן ותסגור את השעה אוטומטית לאחרים.</p>
        </article>
      </section>

      <section className={styles.controlGrid}>
        <article className={styles.controlCard}>
          <div>
            <span>כללי קביעת תורים</span>
            <h2>שעות פעילות</h2>
            <p>Google אומר לנו מתי תפוס. כאן מגדירים מתי בכלל מותר להציע שעות ללקוחות.</p>
          </div>
          <button type="button" className={styles.secondaryButton} onClick={() => setShowAvailability((value) => !value)}>
            {showAvailability ? "סגור הגדרות" : "הגדרת שעות פעילות"}
          </button>
        </article>

        <article className={styles.controlCard}>
          <div>
            <span>מסך למטופלים</span>
            <h2>קישור לקביעת תור</h2>
            <p>אפשר לשלוח בוואטסאפ, באתר או באינסטגרם. המטופל לא רואה שמות או פרטים מהיומן.</p>
          </div>
          <div className={styles.bookingActions}>
            <Link href="/booking" target="_blank">פתח מסך לקוח</Link>
            <button type="button" onClick={copyBookingLink}>{copyState}</button>
          </div>
        </article>
      </section>

      {showAvailability && (
        <section className={styles.settingsPanel}>
          <div className={styles.settingsHeading}>
            <div>
              <span>זמינות שבועית</span>
              <h2>מתי אפשר להזמין טיפול?</h2>
            </div>
            <p>אירועים שקיימים ב־Google Calendar יחסמו את עצמם אוטומטית אחרי החיבור.</p>
          </div>
          <div className={styles.availabilityList}>
            {dayOrder.map((day) => (
              <div className={styles.availabilityRow} key={day}>
                <label className={styles.toggleLabel}>
                  <input
                    type="checkbox"
                    checked={availability[day].enabled}
                    onChange={(event) => updateAvailability(day, { enabled: event.target.checked })}
                  />
                  <span>{dayLabels[day]}</span>
                </label>
                <div className={styles.timeRange} data-disabled={!availability[day].enabled}>
                  <input
                    type="time"
                    value={availability[day].from}
                    disabled={!availability[day].enabled}
                    onChange={(event) => updateAvailability(day, { from: event.target.value })}
                  />
                  <span>עד</span>
                  <input
                    type="time"
                    value={availability[day].to}
                    disabled={!availability[day].enabled}
                    onChange={(event) => updateAvailability(day, { to: event.target.value })}
                  />
                </div>
                <strong>{availability[day].enabled ? "פתוח להזמנות" : "סגור"}</strong>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className={styles.privacyCard}>
        <div className={styles.privacyIcon}>◉</div>
        <div>
          <strong>פרטיות מובנית</strong>
          <p>במסך הציבורי לא נציג אף פעם שם מטופל, כותרת אירוע או סיבת חסימה. מבחינת הלקוח שעה שאינה זמינה היא פשוט „תפוס”.</p>
        </div>
      </section>

      <div className={styles.prototypeNote}>
        <strong>השלב הבא אחרי חיבור Google:</strong> קריאת Free/Busy בזמן אמת ויצירת תור אוטומטית ביומן. שעות הפעילות נשמרות כרגע בדפדפן עד שנחבר את מסד הנתונים של הקליניקה.
      </div>
    </div>
  );
}
