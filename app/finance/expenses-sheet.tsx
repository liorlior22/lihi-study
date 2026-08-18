"use client";

import { useMemo, useState } from "react";
import styles from "./expenses-sheet.module.css";

type ExpenseRow = {
  id: string;
  name: string;
  amount: number;
  note: string;
};

type ExpenseGroup = {
  id: "fixed" | "variable";
  title: string;
  subtitle: string;
  rows: ExpenseRow[];
};

const initialGroups: ExpenseGroup[] = [
  {
    id: "fixed",
    title: "הוצאות קבועות",
    subtitle: "הוצאות שחוזרות באופן קבוע",
    rows: [
      { id: "office", name: "משרד", amount: 3500, note: "" },
      { id: "marketing", name: "פרסום", amount: 0, note: "" },
      { id: "bills", name: "חשבונות", amount: 0, note: "" },
    ],
  },
  {
    id: "variable",
    title: "הוצאות משתנות",
    subtitle: "הוצאות שמשתנות מחודש לחודש",
    rows: [
      { id: "materials", name: "חומרי טיפול", amount: 1500, note: "" },
      { id: "food", name: "אוכל", amount: 0, note: "" },
      { id: "painting", name: "צביעה", amount: 0, note: "" },
    ],
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
    maximumFractionDigits: 0,
  }).format(value);

export function ExpensesSheet() {
  const [groups, setGroups] = useState(initialGroups);

  const total = useMemo(
    () => groups.flatMap((group) => group.rows).reduce((sum, row) => sum + row.amount, 0),
    [groups],
  );

  function updateRow(groupId: ExpenseGroup["id"], rowId: string, field: "amount" | "note", value: string) {
    setGroups((current) =>
      current.map((group) => {
        if (group.id !== groupId) return group;
        return {
          ...group,
          rows: group.rows.map((row) => {
            if (row.id !== rowId) return row;
            return field === "amount"
              ? { ...row, amount: Number(value.replace(/[^0-9.]/g, "")) || 0 }
              : { ...row, note: value };
          }),
        };
      }),
    );
  }

  return (
    <article className={`${styles.panel} ${styles.sheetPanel}`}>
      <div className={styles.panelHeader}>
        <div>
          <span>החודש הנוכחי</span>
          <h2>הוצאות</h2>
        </div>
        <strong className={styles.sheetTotalTop}>{formatCurrency(total)}</strong>
      </div>

      <div className={styles.sheetWrap}>
        <div className={styles.sheetHeader} aria-hidden="true">
          <span>סוג הוצאה</span>
          <span>סכום</span>
          <span>הערה</span>
        </div>

        {groups.map((group) => {
          const groupTotal = group.rows.reduce((sum, row) => sum + row.amount, 0);
          return (
            <section className={styles.sheetGroup} key={group.id}>
              <div className={styles.sheetGroupTitle}>
                <div>
                  <strong>{group.title}</strong>
                  <small>{group.subtitle}</small>
                </div>
                <b>{formatCurrency(groupTotal)}</b>
              </div>

              {group.rows.map((row) => (
                <div className={styles.sheetRow} key={row.id}>
                  <label className={styles.sheetName} htmlFor={`${row.id}-amount`}>{row.name}</label>
                  <div className={styles.amountCell}>
                    <span>₪</span>
                    <input
                      id={`${row.id}-amount`}
                      inputMode="decimal"
                      value={row.amount || ""}
                      placeholder="0"
                      onChange={(event) => updateRow(group.id, row.id, "amount", event.target.value)}
                      aria-label={`סכום ${row.name}`}
                    />
                  </div>
                  <input
                    className={styles.noteCell}
                    value={row.note}
                    placeholder="הוסף הערה..."
                    onChange={(event) => updateRow(group.id, row.id, "note", event.target.value)}
                    aria-label={`הערה עבור ${row.name}`}
                  />
                </div>
              ))}
            </section>
          );
        })}
      </div>

      <div className={styles.totalRow}>
        <span>סה״כ הוצאות החודש</span>
        <strong>{formatCurrency(total)}</strong>
      </div>
    </article>
  );
}
