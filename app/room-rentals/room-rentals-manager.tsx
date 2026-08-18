"use client";

import { FormEvent, useMemo, useState } from "react";
import { RentalPaymentStatus, RoomRental, useRoomRentals } from "./room-rentals-store";
import styles from "./room-rentals.module.css";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `rental-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export function RoomRentalsManager() {
  const [rentals, setRentals] = useRoomRentals();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [therapistName, setTherapistName] = useState("");
  const [priceBeforeVat, setPriceBeforeVat] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<RentalPaymentStatus>("טרם שולם");

  const total = useMemo(
    () => rentals.reduce((sum, rental) => sum + rental.priceBeforeVat, 0),
    [rentals],
  );

  function submitRental(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const price = Number(priceBeforeVat);
    if (!date || !time || !therapistName.trim() || !Number.isFinite(price) || price <= 0) return;

    const rental: RoomRental = {
      id: createId(),
      date,
      time,
      therapistName: therapistName.trim(),
      priceBeforeVat: price,
      paymentStatus,
    };

    setRentals((current) => [rental, ...current]);
    setDate("");
    setTime("");
    setTherapistName("");
    setPriceBeforeVat("");
    setPaymentStatus("טרם שולם");
  }

  function removeRental(id: string) {
    setRentals((current) => current.filter((rental) => rental.id !== id));
  }

  return (
    <div className={styles.layout}>
      <article className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <span>השכרה לפי שעה</span>
            <h2>הוספת השכרת קליניקה</h2>
          </div>
        </div>

        <form className={styles.form} onSubmit={submitRental}>
          <label>
            <span>תאריך</span>
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
          </label>

          <label>
            <span>שעה</span>
            <input type="time" value={time} onChange={(event) => setTime(event.target.value)} required />
          </label>

          <label className={styles.wideField}>
            <span>שם מטפל</span>
            <input
              type="text"
              value={therapistName}
              onChange={(event) => setTherapistName(event.target.value)}
              placeholder="שם מלא"
              required
            />
          </label>

          <label>
            <span>מחיר לפני מע״מ</span>
            <div className={styles.priceInput}>
              <b>₪</b>
              <input
                inputMode="decimal"
                value={priceBeforeVat}
                onChange={(event) => setPriceBeforeVat(event.target.value.replace(/[^0-9.]/g, ""))}
                placeholder="0"
                required
              />
            </div>
          </label>

          <label>
            <span>סטטוס תשלום</span>
            <select value={paymentStatus} onChange={(event) => setPaymentStatus(event.target.value as RentalPaymentStatus)}>
              <option value="טרם שולם">טרם שולם</option>
              <option value="שולם">שולם</option>
            </select>
          </label>

          <button type="submit" className={styles.submitButton}>+ הוסף השכרה</button>
        </form>
      </article>

      <article className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <span>הכנסות מהשכרות</span>
            <h2>השכרות שהוזנו</h2>
          </div>
          <strong>{formatCurrency(total)}</strong>
        </div>

        {rentals.length === 0 ? (
          <div className={styles.emptyState}>עדיין לא הוזנו השכרות קליניקה.</div>
        ) : (
          <div className={styles.rentalsList}>
            {rentals.map((rental) => (
              <div className={styles.rentalRow} key={rental.id}>
                <div className={styles.rentalMain}>
                  <strong>{rental.therapistName}</strong>
                  <span>{rental.date} · {rental.time} · השכרה לשעה</span>
                </div>
                <div className={styles.rentalAmount}>
                  <strong>{formatCurrency(rental.priceBeforeVat)}</strong>
                  <small>לפני מע״מ</small>
                </div>
                <span className={rental.paymentStatus === "שולם" ? styles.paid : styles.unpaid}>{rental.paymentStatus}</span>
                <button type="button" className={styles.deleteButton} onClick={() => removeRental(rental.id)}>מחק</button>
              </div>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
