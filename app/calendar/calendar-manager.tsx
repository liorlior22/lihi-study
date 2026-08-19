"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./calendar.module.css";

type DayKey = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
type DayAvailability = { enabled: boolean; from: string; to: string };
type Availability = Record<DayKey, DayAvailability>;
type Block = { id: string; day: DayKey; time: string; label: string };

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
const CALENDAR_BLOCKS_KEY = "lihi-clinic-calendar-blocks-v1";

const defaultAvailability: Availability = {
  sun: { enabled: true, from: "09:00", to: "18:00" },
  mon: { enabled: true, from: "09:00", to: "18:00" },
  tue: { enabled: true, from: "09:00", to: "18:00" },
  wed: { enabled: true, from: "09:00", to: "18:00" },
  thu: { enabled: true, from: "09:00", to: "18:00" },
  fri: { enabled: false, from: "09:00", to: "14:00" },
  sat: { enabled: false, from: "09:00", to: "14:00" },
};

const demoEvents: Record<DayKey, Array<{ time: string; title: string; kind: "appointment" | "busy" }>> = {
  sun: [{ time: "10:00", title: "מיכאל לוי", kind: "appointment" }],
  mon: [{ time: "13:00", title: "אירוע חיצוני", kind: "busy" }],
  tue: [{ time: "11:00", title: "ליאור כהן", kind: "appointment" }],
  wed: [{ time: "16:00", title: "חסום", kind: "busy" }],
  thu: [],
  fri: [],
  sat: [],
};

function getCurrentWeek() {
  const now = new Date();
  const sunday = new Date(now);
  sunday.setDate(now.getDate() - now.getDay());
  return dayOrder.map((key, index) => {
    const date = new Date(sunday);
    date.setDate(sunday.getDate() + index);
    return { key, date };
  });
}

function formatDay(date: Date) {
  return new Intl.DateTimeFormat("he-IL", { day: "2-digit", month: "2-digit" }).format(date);
}

export function CalendarManager() {
  const [availability, setAvailability] = useState<Availability>(defaultAvailability);
  const [blocks, setBlocks] = useState<Block[]>([
    { id: "demo-block", day: "wed", time: "16:00", label: "חסום אישית" },
  ]);
  const [showAvailability, setShowAvailability] = useState(false);
  const [showBlockForm, setShowBlockForm] = useState(false);
  const [blockDraft, setBlockDraft] = useState({ day: "sun" as DayKey, time: "12:00", label: "חסום" });
  const [copyState, setCopyState] = useState("העתק קישור");

  const week = useMemo(getCurrentWeek, []);

  useEffect(() => {
    try {
      const savedAvailability = window.localStorage.getItem(CALENDAR_SETTINGS_KEY);
      const savedBlocks = window.localStorage.getItem(CALENDAR_BLOCKS_KEY);
      if (savedAvailability) setAvailability({ ...defaultAvailability, ...JSON.parse(savedAvailability) });
      if (savedBlocks) setBlocks(JSON.parse(savedBlocks));
    } catch {
      // Prototype fallback: keep the default schedule.
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(CALENDAR_SETTINGS_KEY, JSON.stringify(availability));
    } catch {}
  }, [availability]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CALENDAR_BLOCKS_KEY, JSON.stringify(blocks));
    } catch {}
  }, [blocks]);

  function updateAvailability(day: DayKey, patch: Partial<DayAvailability>) {
    setAvailability((current) => ({
      ...current,
      [day]: { ...current[day], ...patch },
    }));
  }

  function addBlock(event: React.FormEvent) {
    event.preventDefault();
    setBlocks((current) => [
      ...current,
      { id: `block-${Date.now()}`, day: blockDraft.day, time: blockDraft.time, label: blockDraft.label.trim() || "חסום" },
    ]);
    setShowBlockForm(false);
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
      <section className={styles.summaryGrid}>
        <article className={`${styles.summaryCard} ${styles.googleCard}`}>
          <div className={styles.summaryIcon}>G</div>
          <div>
            <span>סנכרון יומן</span>
            <h2>Google Calendar</h2>
            <p>היומן המרכזי שיעבוד גם באייפון, אנדרואיד ומחשב.</p>
          </div>
          <div className={styles.summaryActions}>
            <span className={styles.pendingBadge}>לא מחובר</span>
            <button type="button" disabled>חיבור Google · בשלב הבא</button>
          </div>
        </article>

        <article className={styles.summaryCard}>
          <div className={styles.summaryIcon}>↗</div>
          <div>
            <span>קביעת תורים</span>
            <h2>הקישור למטופלים</h2>
            <p>הלקוח רואה רק שעות פנויות. שעות תפוסות ושמות מטופלים לא נחשפים.</p>
          </div>
          <div className={styles.linkActions}>
            <Link href="/booking" target="_blank">פתח מסך לקוח</Link>
            <button type="button" onClick={copyBookingLink}>{copyState}</button>
          </div>
        </article>
      </section>

      <section className={styles.toolbar}>
        <div>
          <span>השבוע הנוכחי</span>
          <strong>ניהול תורים וזמינות</strong>
        </div>
        <div className={styles.toolbarActions}>
          <button type="button" className={styles.secondaryButton} onClick={() => setShowAvailability((value) => !value)}>
            {showAvailability ? "סגור שעות פעילות" : "⚙ שעות פעילות"}
          </button>
          <button type="button" className={styles.primaryButton} onClick={() => setShowBlockForm((value) => !value)}>
            {showBlockForm ? "ביטול" : "+ חסימת שעה"}
          </button>
        </div>
      </section>

      {showAvailability && (
        <section className={styles.settingsPanel}>
          <div className={styles.settingsHeading}>
            <div>
              <span>זמינות קבועה</span>
              <h2>שעות פעילות</h2>
            </div>
            <p>רק בתוך הטווחים האלה יופיעו למטופל שעות שניתן להזמין.</p>
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

      {showBlockForm && (
        <form className={styles.blockForm} onSubmit={addBlock}>
          <div>
            <span>חסימה ידנית</span>
            <strong>סמן זמן שלא ניתן להזמין</strong>
          </div>
          <label>
            <span>יום</span>
            <select value={blockDraft.day} onChange={(event) => setBlockDraft({ ...blockDraft, day: event.target.value as DayKey })}>
              {dayOrder.map((day) => <option value={day} key={day}>{dayLabels[day]}</option>)}
            </select>
          </label>
          <label>
            <span>שעה</span>
            <input type="time" value={blockDraft.time} onChange={(event) => setBlockDraft({ ...blockDraft, time: event.target.value })} />
          </label>
          <label>
            <span>הערה פנימית</span>
            <input value={blockDraft.label} onChange={(event) => setBlockDraft({ ...blockDraft, label: event.target.value })} placeholder="למשל: סידורים" />
          </label>
          <button type="submit" className={styles.primaryButton}>שמור חסימה</button>
        </form>
      )}

      <section className={styles.weekPanel}>
        <div className={styles.weekHeader}>
          <div>
            <span>תצוגה פנימית למטפלת</span>
            <h2>השבוע שלי</h2>
          </div>
          <div className={styles.legend}>
            <span><i className={styles.legendAppointment} /> טיפול</span>
            <span><i className={styles.legendBusy} /> חסום / תפוס</span>
            <span><i className={styles.legendFree} /> פנוי להזמנה</span>
          </div>
        </div>

        <div className={styles.weekGrid}>
          {week.map(({ key, date }) => {
            const dayEvents = [...demoEvents[key], ...blocks.filter((block) => block.day === key).map((block) => ({ time: block.time, title: block.label, kind: "busy" as const }))];
            return (
              <article className={styles.dayColumn} key={key} data-disabled={!availability[key].enabled}>
                <header>
                  <span>{dayLabels[key]}</span>
                  <strong>{formatDay(date)}</strong>
                  <small>{availability[key].enabled ? `${availability[key].from}–${availability[key].to}` : "לא פעיל"}</small>
                </header>
                <div className={styles.dayBody}>
                  {availability[key].enabled ? (
                    <>
                      {dayEvents.sort((a, b) => a.time.localeCompare(b.time)).map((item, index) => (
                        <div className={item.kind === "appointment" ? styles.appointmentEvent : styles.busyEvent} key={`${item.time}-${index}`}>
                          <b>{item.time}</b>
                          <span>{item.title}</span>
                          {item.kind === "busy" && <small>בצד הלקוח יוצג רק „תפוס”</small>}
                        </div>
                      ))}
                      <div className={styles.freeHint}>יש שעות פנויות נוספות להזמנה</div>
                    </>
                  ) : (
                    <div className={styles.closedDay}>אין קבלת מטופלים</div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className={styles.prototypeNote}>
        <strong>שלב V1:</strong> שעות הפעילות והחסימות נשמרות כרגע בדפדפן. החיבור הבא הוא Google Calendar + שמירה בשרת, ואז תורים וחסימות יסונכרנו מכל מכשיר ובזמן אמת.
      </div>
    </div>
  );
}
