import type { AnswerId, ExamQuestion, ExamOption } from "../types/exam";
import { associationQuestions } from "./exams";
import { sourceExamQuestions } from "./source-exams";
import { cleanExamText } from "./exam-text";

export type WhoAmIQuestion = {
  id: string;
  mode: "herb" | "meridian";
  badge: string;
  title: string;
  clue: string;
  hint?: string;
  options: ExamOption[];
  correctAnswer: AnswerId;
  explanation: string;
  source: string;
};

const ANSWER_IDS: AnswerId[] = ["א", "ב", "ג", "ד"];

const sourceByPrefix = (prefix: string) =>
  Object.entries(sourceExamQuestions)
    .filter(([key]) => key.startsWith(`${prefix}-`))
    .flatMap(([, questions]) => questions as ExamQuestion[]);

const herbsQuestions = [...sourceByPrefix("herbs"), ...(associationQuestions.herbs ?? [])];
const pointLocationQuestions = [...sourceByPrefix("point-location"), ...(associationQuestions["point-location"] ?? [])];

function shuffle<T>(items: T[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function normalize(text: string) {
  return cleanExamText(text)
    .replace(/\s+/g, " ")
    .trim();
}

function correctOption(question: ExamQuestion) {
  return question.options.find((option) => option.id === question.correctAnswer) ?? null;
}

function remapOptions(options: ExamOption[], correctText: string) {
  const shuffled = shuffle(options).map((option, index) => ({ id: ANSWER_IDS[index], text: cleanExamText(option.text) }));
  const correctIndex = shuffled.findIndex((option) => option.text === correctText);
  return {
    options: shuffled,
    correctAnswer: ANSWER_IDS[Math.max(0, correctIndex)] ?? "א",
  };
}

function looksLikeIdentityStem(question: string) {
  return /צמח|פורמולה|שילובי הצמחים|צירופי הצמחים|פורמולות/.test(question);
}

function looksLikeHerbOrFormulaAnswer(answer: string) {
  return /[A-Za-z]{2,}/.test(answer);
}

function rewriteHerbClue(question: string) {
  const text = normalize(question).replace(/[?؟]+$/g, "");
  const replacements: Array<[RegExp, string]> = [
    [/^איזה צמח /, "אני הצמח "],
    [/^איזו פורמולה /, "אני הפורמולה "],
    [/^איזה מהצמחים הבאים הוא הטוב ביותר /, "אני הצמח הטוב ביותר "],
    [/^איזה מהצמחים הבאים הוא היעיל ביותר /, "אני הצמח היעיל ביותר "],
    [/^איזה מהצמחים הבאים /, "אני הצמח ש"],
    [/^איזה משילובי הצמחים הבאים /, "אני שילוב הצמחים ש"],
    [/^איזה מצירופי הצמחים הבאים /, "אני צירוף הצמחים ש"],
    [/^שלושה מהצמחים הבאים /, "שלושה מהצמחים הבאים מתוארים כאן, ואני "],
    [/^שלוש מהפורמולות הבאות /, "שלוש מהפורמולות הבאות מתוארות כאן, ואני "],
    [/^איזה צמח אינו /, "אני הצמח שאינו "],
    [/^איזו פורמולה אינה /, "אני הפורמולה שאינה "],
  ];

  for (const [pattern, replacement] of replacements) {
    if (pattern.test(text)) {
      return `${text.replace(pattern, replacement)}.`;
    }
  }

  return `בחרי את הצמח או הפורמולה שמתאימים לרמז הבא: ${text}.`;
}

function buildHerbQuestions() {
  const seen = new Set<string>();
  const bank: WhoAmIQuestion[] = [];

  for (const question of herbsQuestions) {
    const correct = correctOption(question);
    if (!correct) continue;
    if (!looksLikeIdentityStem(question.question)) continue;
    if (!looksLikeHerbOrFormulaAnswer(correct.text)) continue;

    const key = `${normalize(question.question)}|${normalize(correct.text)}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const correctText = cleanExamText(correct.text);
    const remapped = remapOptions(question.options, correctText);

    bank.push({
      id: `whoami-herb-${question.id}`,
      mode: "herb",
      badge: "🌿 מי אני?",
      title: "בחרי את הצמח או הפורמולה",
      clue: rewriteHerbClue(question.question),
      hint: `מקור: ${question.source}`,
      options: remapped.options,
      correctAnswer: remapped.correctAnswer,
      explanation: `${cleanExamText(question.explanation)} התשובה היא ${correctText}.`,
      source: question.source,
    });
  }

  return bank;
}

const POINT_ONLY_PATTERN = /^(?:LU|LI|ST|SP|HT|SI|UB|BL|KID|KI|PC|SJ|TE|TH|GB|LIV|LR|REN|DU|GV|CV)\s*\d{1,2}$/i;

function looksLikeLocationQuestion(question: string) {
  return /ממוקמ|מיקום|צון|דיסטל|פרוקסימ|מדיאל|לטרל|שקע|מרווח|גבול|קפל|גובה|בין|רדיאל|אולנר|אנטריור|פוסטריור|סופריור|אינפריור/.test(question);
}

function normalizePointName(text: string) {
  return cleanExamText(text).replace(/\s+/g, "").toUpperCase();
}

function rewriteLocationClue(question: string) {
  const text = normalize(question).replace(/[?؟]+$/g, "");
  const replacements: Array<[RegExp, string]> = [
    [/^איזו נקודה ממוקמת /, "אני ממוקמת "],
    [/^איזו נקוד ה ממוקמת /, "אני ממוקמת "],
    [/^איזו נקודת דיקור ממוקמת /, "אני נקודת דיקור שממוקמת "],
    [/^איזו נקודה נמצאת /, "אני נמצאת "],
    [/^איזו נקודת דיקור נמצאת /, "אני נקודת דיקור שנמצאת "],
    [/^מי ממוקמת /, "אני ממוקמת "],
    [/^מי הרדיאלית /, "אני רדיאלית "],
    [/^מי הכי לטרלית מהנקודות/, "אני הנקודה הלטרלית ביותר"],
    [/^מי הדיסטלית ביותר/, "אני הנקודה הדיסטלית ביותר"],
  ];

  for (const [pattern, replacement] of replacements) {
    if (pattern.test(text)) {
      return `${text.replace(pattern, replacement)}. מי אני?`;
    }
  }

  return `רמז למיקום שלי: ${text}. מי אני?`;
}

function buildLocationQuestions() {
  const seen = new Set<string>();
  const bank: WhoAmIQuestion[] = [];

  for (const question of pointLocationQuestions) {
    const correct = correctOption(question);
    if (!correct) continue;
    if (!looksLikeLocationQuestion(question.question)) continue;
    if (!POINT_ONLY_PATTERN.test(correct.text.trim())) continue;

    const normalizedCorrect = normalizePointName(correct.text);
    const usableOptions = question.options
      .filter((option) => POINT_ONLY_PATTERN.test(option.text.trim()))
      .slice(0, 4);

    if (usableOptions.length < 3) continue;
    if (!usableOptions.some((option) => normalizePointName(option.text) === normalizedCorrect)) continue;

    const key = `${normalize(question.question)}|${normalizedCorrect}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const correctText = cleanExamText(correct.text);
    const remapped = remapOptions(usableOptions, correctText);

    bank.push({
      id: `whoami-location-${question.id}`,
      mode: "meridian",
      badge: "📍 איפה אני?",
      title: "בחרי את הנקודה הנכונה",
      clue: rewriteLocationClue(question.question),
      hint: `מיקום אנטומי מתוך ${question.source}`,
      options: remapped.options,
      correctAnswer: remapped.correctAnswer,
      explanation: `${cleanExamText(question.explanation)} התשובה היא ${correctText}.`,
      source: question.source,
    });
  }

  return bank;
}

export const whoAmIHerbQuestions = buildHerbQuestions();
export const whoAmILocationQuestions = buildLocationQuestions();

export function buildWhoAmIGame() {
  const herbs = shuffle(whoAmIHerbQuestions);
  const locations = shuffle(whoAmILocationQuestions);
  const game: WhoAmIQuestion[] = [];
  let nextMode: "herb" | "meridian" = Math.random() > 0.5 ? "herb" : "meridian";

  while (herbs.length || locations.length) {
    if (nextMode === "herb" && herbs.length) {
      game.push(herbs.pop()!);
      nextMode = "meridian";
      continue;
    }
    if (nextMode === "meridian" && locations.length) {
      game.push(locations.pop()!);
      nextMode = "herb";
      continue;
    }
    if (herbs.length) game.push(herbs.pop()!);
    if (locations.length) game.push(locations.pop()!);
  }

  return game;
}
