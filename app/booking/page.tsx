"use client";

import { useEffect, useMemo, useState } from "react";
import { getClinicPriceList, type ClinicPriceList } from "../pricing-data";
import styles from "./booking.module.css";

type ServiceKey = "acupuncture" | "shiatsuAcupuncture";

const serviceLabels: Record<ServiceKey, { title: string; duration: string }> = {
  acupuncture: { title: "טיפול דיקור", duration: "60 דקות" },
  shiatsuAcupuncture: { title: "שיאצו + דיקור", duration: "75 דקות" },
};

const availableTimes = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

function nextBookableDates() {
  const result: Date[] = [];
  const date = new Date();
  while (result.length < 6) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 5 && day !== 6) result.push(new Date(date));
  }
  return result;
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("he-IL", { weekday: "short", day: "2-digit", month: "2-digit" }).format(date);
}

export default function BookingPage() {
  const [prices, setPrices] = useState<ClinicPriceList>(() => getClinicPriceList());
  const [service, setService] = useState<ServiceKey>("acupuncture");
  const dates = useMemo(nextBookableDates, []);
  const [selectedDate, setSelectedDate] = useState(() => dateKey(dates[0]));
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    setPrices(getClinicPriceList());
  }, []);

  const visibleTimes = useMemo(() => {
    const index = dates.findIndex((date) => dateKey(date) === selectedDate);
    if (index < 0) return availableTimes;
    const hidden = index % 2 === 0 ? ["10:00", "14:00"] : ["11:00", "16:00"];
    return availableTimes.filter((time) => !hidden.includes(time));
  }, [dates, selectedDate]);

  function submitBooking(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedTime || !name.trim() || !phone.trim()) {
      setMessage("צריך לבחור שעה ולמלא שם וטלפון.");
      return;
    }
    setMessage("");
    setConfirmed(true);
  }

  if (confirmed) {
    const chosenDate = dates.find((date) => dateKey(date) === selectedDate);
    return (
      <main className={styles.publicPage} dir="rtl">
        <section className={styles.confirmationCard}>
          <div className={styles.confirmationIcon}>✓</div>
          <span>בקשת התור התקבלה</span>
          <h1>נתראה בקליניקה</h1>
          <p>{chosenDate ? formatDate(chosenDate) : selectedDate} בשעה {selectedTime}</p>
          <strong>{serviceLabels[service].title}</strong>
          <small>בשלב ה־V1 זהו מסך הדגמה. בחיבור ל־Google Calendar התור יישמר וייחסם אוטומטית בזמן אמת.</small>
          <button type="button" onClick={() => setConfirmed(false)}>חזרה לקביעת תור</button>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.publicPage} dir="rtl">
      <section className={styles.bookingShell}>
        <header className={styles.publicHeader}>
          <div className={styles.brandMark}>L</div>
          <div>
            <span>Lihi Clinic</span>
            <h1>קביעת תור</h1>
            <p>בחרו טיפול, יום ושעה פנויה. שעות שאינן זמינות פשוט לא מוצגות.</p>
          </div>
        </header>

        <form className={styles.bookingForm} onSubmit={submitBooking}>
          <section className={styles.stepCard}>
            <div className={styles.stepTitle}><span>1</span><div><strong>איזה טיפול?</strong><small>בחרו את סוג הטיפול</small></div></div>
            <div className={styles.serviceGrid}>
              {(Object.keys(serviceLabels) as ServiceKey[]).map((key) => (
                <button
                  type="button"
                  className={service === key ? styles.selectedService : styles.serviceCard}
                  onClick={() => setService(key)}
                  key={key}
                >
                  <span>{serviceLabels[key].title}</span>
                  <strong>₪{prices[key]}</strong>
                  <small>{serviceLabels[key].duration}</small>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.stepCard}>
            <div className={styles.stepTitle}><span>2</span><div><strong>בחרו יום</strong><small>הימים הפנויים הקרובים</small></div></div>
            <div className={styles.dateGrid}>
              {dates.map((date) => {
                const key = dateKey(date);
                return <button type="button" className={selectedDate === key ? styles.selectedDate : styles.dateButton} onClick={() => { setSelectedDate(key); setSelectedTime(""); }} key={key}>{formatDate(date)}</button>;
              })}
            </div>
          </section>

          <section className={styles.stepCard}>
            <div className={styles.stepTitle}><span>3</span><div><strong>בחרו שעה</strong><small>רק שעות שבאמת פנויות מוצגות כאן</small></div></div>
            <div className={styles.timeGrid}>
              {visibleTimes.map((time) => <button type="button" className={selectedTime === time ? styles.selectedTime : styles.timeButton} onClick={() => setSelectedTime(time)} key={time}>{time}</button>)}
            </div>
            <div className={styles.privacyNote}>🔒 מטעמי פרטיות לא מוצגים שמות או פרטי מטופלים בשעות שכבר תפוסות.</div>
          </section>

          <section className={styles.stepCard}>
            <div className={styles.stepTitle}><span>4</span><div><strong>פרטים ליצירת קשר</strong><small>כדי שנוכל לאשר ולעדכן במקרה הצורך</small></div></div>
            <div className={styles.contactGrid}>
              <label><span>שם מלא</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="השם שלך" /></label>
              <label><span>טלפון</span><input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="05X-XXXXXXX" inputMode="tel" /></label>
            </div>
          </section>

          {message && <div className={styles.errorMessage}>{message}</div>}

          <button className={styles.submitButton} type="submit">קביעת התור</button>
          <small className={styles.prototypeText}>מסך ההזמנה מוכן לזרימה המלאה. החיבור בזמן אמת ליומן יתווסף בשלב Google Calendar.</small>
        </form>
      </section>
    </main>
  );
}
