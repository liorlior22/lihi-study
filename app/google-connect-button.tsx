"use client";

import { useEffect, useState } from "react";
import styles from "./google-connect-button.module.css";

type GoogleStatus = {
  configured: boolean;
  connected: boolean;
  email?: string;
  name?: string;
};

export function GoogleConnectButton({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<GoogleStatus | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/google/status", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: GoogleStatus) => {
        if (!cancelled) setStatus(data);
      })
      .catch(() => {
        if (!cancelled) setStatus({ configured: false, connected: false });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!status) {
    return <div className={`${styles.loading} ${compact ? styles.compact : ""}`}>בודק חיבור ל־Google…</div>;
  }

  if (status.connected) {
    return (
      <div className={`${styles.connected} ${compact ? styles.compact : ""}`}>
        <div className={styles.googleMark}>G</div>
        <div className={styles.connectedCopy}>
          <span>Google Calendar מחובר</span>
          <strong>{status.name || status.email || "החשבון של המטפלת"}</strong>
          {status.email && status.name && <small>{status.email}</small>}
        </div>
        <div className={styles.actions}>
          <a href="https://calendar.google.com/calendar/u/0/r" target="_blank" rel="noreferrer">פתח יומן</a>
          <a className={styles.disconnect} href="/api/google/disconnect">ניתוק</a>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.connect} ${compact ? styles.compact : ""}`}>
      <div className={styles.googleMark}>G</div>
      <div className={styles.connectCopy}>
        <span>חיבור היומן הראשי</span>
        <strong>התחברות עם Google</strong>
        <small>
          {status.configured
            ? "התחברי לחשבון Google שבו נמצא היומן של הקליניקה."
            : "החיבור מוכן במערכת. חסרה הגדרה חד־פעמית של מפתחות Google ב־Vercel."}
        </small>
      </div>
      <a className={styles.connectButton} href="/api/google/connect">התחברות עם Google</a>
    </div>
  );
}
