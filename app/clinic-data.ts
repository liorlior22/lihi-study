export type Treatment = {
  id: string;
  date: string;
  price: number;
  paid: boolean;
  note: string;
};

export type Patient = {
  id: string;
  name: string;
  initials: string;
  age: number;
  phone: string;
  occupation: string;
  status: "פעיל" | "חדש";
  lastTreatment: string;
  nextTreatment: string;
  balance: number;
  treatments: number;
  treatmentHistory: Treatment[];
  family: string;
  hobbies: string;
  profile: string;
  reminder: string;
};

export const patients: Patient[] = [
  {
    id: "michael",
    name: "מיכאל",
    initials: "מכ",
    age: 36,
    phone: "050-555-1201",
    occupation: "מנהל מוצר",
    status: "פעיל",
    lastTreatment: "12.08.26",
    nextTreatment: "20.08.26 · 18:00",
    balance: 350,
    treatments: 3,
    treatmentHistory: [
      { id: "michael-3", date: "2026-08-12", price: 350, paid: false, note: "מעקב אחרי כאב הצוואר והשינה." },
      { id: "michael-2", date: "2026-08-05", price: 350, paid: true, note: "שיפור בשינה, המשך טיפול בעומס בצד ימין." },
      { id: "michael-1", date: "2026-07-29", price: 350, paid: true, note: "פגישת היכרות ואבחון ראשוני." },
    ],
    family: "נשוי + 2. משפחה מאוד מרכזית בחיים שלו. הורים גרים קרוב והוא עוזר להם באופן קבוע.",
    hobbies: "כדורגל פעמיים בשבוע, בישול בסופי שבוע וטיולים בארץ.",
    profile: "עובד שעות ארוכות, ישן מעט ומגיע בעיקר סביב עומס, מתח וכאבי צוואר. חשוב לו להבין למה עושים כל פעולה בטיפול.",
    reminder: "בפגישה האחרונה דיווח על שיפור בשינה, אבל כאב הצוואר חזר אחרי יום עבודה ארוך. לבדוק עומס, שינה ורגישות בצד ימין.",
  },
  {
    id: "lior",
    name: "ליאור",
    initials: "לא",
    age: 31,
    phone: "052-555-8842",
    occupation: "יזם",
    status: "פעיל",
    lastTreatment: "10.08.26",
    nextTreatment: "אין תור עתידי",
    balance: 0,
    treatments: 5,
    treatmentHistory: [
      { id: "lior-5", date: "2026-08-10", price: 350, paid: true, note: "מעקב סחרחורת, שינה ושתייה." },
      { id: "lior-4", date: "2026-08-03", price: 350, paid: true, note: "המשך טיפול ומעקב אחרי עומס ומתח." },
      { id: "lior-3", date: "2026-07-27", price: 350, paid: true, note: "מעקב תגובה לטיפול הקודם." },
      { id: "lior-2", date: "2026-07-20", price: 350, paid: true, note: "המשך תוכנית טיפול." },
      { id: "lior-1", date: "2026-07-13", price: 350, paid: true, note: "פגישת היכרות ואבחון ראשוני." },
    ],
    family: "נשוי + ילדה. סדר היום משתנה מאוד בין עבודה למשפחה.",
    hobbies: "פאדל, ריצה, כדורגל וטכנולוגיה.",
    profile: "אוהב תשובות קצרות ותוכנית ברורה. מגיב טוב למעקב מספרי וליעדים קצרים.",
    reminder: "לבדוק האם נשמרה ההטבה בסחרחורת ובמתח. לשאול על שינה, שתייה ופעילות גופנית מאז הפגישה האחרונה.",
  },
  {
    id: "dor",
    name: "דור",
    initials: "דר",
    age: 28,
    phone: "054-555-7720",
    occupation: "מעצב",
    status: "חדש",
    lastTreatment: "טרם בוצע טיפול",
    nextTreatment: "22.08.26 · 11:30",
    balance: 0,
    treatments: 0,
    treatmentHistory: [],
    family: "טרם מולא שאלון קליטה.",
    hobbies: "טרם מולא שאלון קליטה.",
    profile: "מטופל חדש — יש להשלים שאלון ראשוני לפני הפגישה.",
    reminder: "פגישה ראשונה. לעבור על שאלון הקליטה ולברר סיבת הגעה, מטרות וציפיות מהטיפול.",
  },
];

export function getPatient(id: string) {
  return patients.find((patient) => patient.id === id);
}
