"use client";

import { useState } from "react";
import styles from "./marketing.module.css";

type Lead = {
  id: string;
  name: string;
  phone: string;
  notes: string;
};

const initialLeads: Lead[] = [
  { id: "lead-1", name: "נועה ברק", phone: "052-555-4412", notes: "התעניינה בטיפול ראשוני. לחזור אליה בערב." },
  { id: "lead-2", name: "רוני שלו", phone: "050-555-9081", notes: "הגיעה מהמלצה של מטופלת קיימת." },
];

export function LeadsBoard() {
  const [leads, setLeads] = useState(initialLeads);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({ name: "", phone: "", notes: "" });

  function addLead(event: React.FormEvent) {
    event.preventDefault();
    const name = draft.name.trim();
    if (!name) return;

    setLeads((current) => [
      {
        id: `lead-${Date.now()}`,
        name,
        phone: draft.phone.trim(),
        notes: draft.notes.trim(),
      },
      ...current,
    ]);
    setDraft({ name: "", phone: "", notes: "" });
    setShowForm(false);
  }

  return (
    <article className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <span>רשימת לידים</span>
          <h2>לידים</h2>
        </div>
        <button type="button" className={styles.primaryButton} onClick={() => setShowForm((value) => !value)}>
          {showForm ? "ביטול" : "+ ליד חדש"}
        </button>
      </div>

      {showForm && (
        <form className={styles.addForm} onSubmit={addLead}>
          <label>
            <span>שם הליד</span>
            <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="שם מלא" autoFocus />
          </label>
          <label>
            <span>מספר טלפון</span>
            <input type="tel" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} placeholder="05X-XXXXXXX" />
          </label>
          <label className={styles.notesField}>
            <span>הערות</span>
            <textarea value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} placeholder="הערות חופשיות..." rows={3} />
          </label>
          <button type="submit" className={styles.saveButton} disabled={!draft.name.trim()}>הוסף ליד</button>
        </form>
      )}

      <div className={styles.tableWrap}>
        <div className={styles.tableHeader} aria-hidden="true">
          <span>שם הליד</span>
          <span>מספר טלפון</span>
          <span>הערות</span>
        </div>

        {leads.map((lead) => (
          <div className={styles.tableRow} key={lead.id}>
            <strong>{lead.name}</strong>
            <a href={lead.phone ? `tel:${lead.phone}` : undefined} className={styles.phone}>{lead.phone || "לא הוזן"}</a>
            <p>{lead.notes || "אין הערות"}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
