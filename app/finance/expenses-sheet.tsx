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

const ACCESS_CODE = "1312";

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
  const [showCodeGate, setShowCodeGate] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [newExpense, setNewExpense] = useState({ name: "", amount: "", note: "" });

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

  function submitCode(event: React.FormEvent) {
    event.preventDefault();
    if (code === ACCESS_CODE) {
      setUnlocked(true);
      setCodeError(false);
      setCode("");
      return;
    }
    setCodeError(true);
  }

  function addVariableExpense(event: React.FormEvent) {
    event.preventDefault();
    const name = newExpense.name.trim();
    const amount = Number(newExpense.amount.replace(/[^0-9.]/g, "")) || 0;
    if (!name) return;

    const row: ExpenseRow = {
      id: `manual-${Date.now()}`,
      name,
      amount,
      note: newExpense.note.trim(),
    };

    setGroups((current) =>
      current.map((group) =>
        group.id === "variable" ? { ...group, rows: [...group.rows, row] } : group,
      ),
    );
    setNewExpense({ name: "", amount: "", note: "" });
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
                <div className={styles.groupTitleActions}>
                  {group.id === "variable" && !showCodeGate && !unlocked && (
                    <button type="button" className={styles.addExpenseButton} onClick={() => setShowCodeGate(true)}>
                      + הוצאה חדשה
                    </button>
                  )}
                  {group.id === "variable" && unlocked && (
                    <span className={styles.unlockedBadge}>פתוח להוספה</span>
                  )}
                  <b>{formatCurrency(groupTotal)}</b>
                </div>
              </div>

              {group.id === "variable" && showCodeGate && !unlocked && (
                <form className={styles.codeGate} onSubmit={submitCode}>
                  <div>
                    <strong>הוספת הוצאה ידנית</strong>
                    <small>יש להזין קוד כדי לפתוח אפשרות להוספת הוצאות משתנות.</small>
                  </div>
                  <div className={styles.codeGateControls}>
                    <input
                      type="password"
                      inputMode="numeric"
                      value={code}
                      onChange={(event) => {
                        setCode(event.target.value);
                        setCodeError(false);
                      }}
                      placeholder="קוד"
                      aria-label="קוד להוספת הוצאה"
                    />
                    <button type="submit">אישור</button>
                    <button type="button" className={styles.cancelButton} onClick={() => {
                      setShowCodeGate(false);
                      setCode("");
                      setCodeError(false);
                    }}>
                      ביטול
                    </button>
                  </div>
                  {codeError && <p className={styles.codeError}>קוד שגוי</p>}
                </form>
              )}

              {group.id === "variable" && unlocked && (
                <form className={styles.manualExpenseForm} onSubmit={addVariableExpense}>
                  <input
                    value={newExpense.name}
                    onChange={(event) => setNewExpense({ ...newExpense, name: event.target.value })}
                    placeholder="שם ההוצאה"
                    aria-label="שם הוצאה חדשה"
                  />
                  <div className={styles.manualAmount}>
                    <span>₪</span>
                    <input
                      inputMode="decimal"
                      value={newExpense.amount}
                      onChange={(event) => setNewExpense({ ...newExpense, amount: event.target.value })}
                      placeholder="0"
                      aria-label="סכום הוצאה חדשה"
                    />
                  </div>
                  <input
                    value={newExpense.note}
                    onChange={(event) => setNewExpense({ ...newExpense, note: event.target.value })}
                    placeholder="הערה (לא חובה)"
                    aria-label="הערה להוצאה חדשה"
                  />
                  <button type="submit" disabled={!newExpense.name.trim()}>הוסף</button>
                </form>
              )}

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
