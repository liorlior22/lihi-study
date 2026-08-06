#!/usr/bin/env python3
"""One-off importer for the association PDFs in public/exams-pdf.

Requires PyMuPDF on PYTHONPATH. The generated JSON is committed, so the app
does not need a PDF dependency at runtime.
"""

import json
import re
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
PDF_DIR = ROOT / "public" / "exams-pdf"
OUT_DIR = ROOT / "data" / "exams" / "source"
BIDI = re.compile("[\u202a-\u202e\u2066-\u2069]")
LETTERS = "אבגד"
ANSWER_IDS = "אבגד"
TOPICS = {
    "foundations": "יסודות הרפואה הסינית",
    "acupuncture": "דיקור",
    "point-location": "איתור נקודות",
    "herbs": "צמחי מרפא",
    "western": "רפואה מערבית",
}
MANUAL_QUESTIONS = {
    ("western", 2012, 24): (
        "מה נכון לגבי מחלת קרוהן (Crohn’s disease)?",
        [
            "מחלה כרונית שבה רק המעי הגס מודלק ומכויב",
            "דלקת המתמקדת בשכבת הסרוזה של המעי",
            "דלקת כרונית של צינור העיכול שיכולה לערב כל חלק בצינור",
            "דלקת של דרכי המרה הנפוצה אצל יהודים אשכנזים",
        ],
    ),
    ("foundations", 2014, 37): (
        "מבין שלושת האוצרות, איזה חומר נחשב לדחוס ביותר?",
        ["יין", "צ'י", "Jing", "Shen"],
    ),
    ("foundations", 2014, 48): (
        "איזה מהבאים אינו מומלץ למטופלת הסובלת מנפילות ברמת הסוכר בדם (היפוגליקמיה)?",
        ["מזון עתיר חלבון", "פחמימות מורכבות", "מיצי פירות", "אצות"],
    ),
    ("foundations", 2014, 49): (
        "איזו מההנחיות הבאות הכי פחות מתאימה למטופלת הסובלת מיציאות קשות ויבשות?",
        ["להרבות באכילת זרעים ואגוזים", "להרבות בשתיית מים בין הארוחות", "להמעיט בצריכת קפאין", "להמעיט באכילת ירקות טריים"],
    ),
    ("acupuncture", 2014, 9): (
        "מה נכון לגבי זרימת הצ'י בנקודות ההצטברות?",
        ["בנקודות אלו הצ'י נכנס פנימה מהמרידיאן לעומק הגוף", "בנקודות אלו מתאסף הצ'י השטחי שזורם במרידיאני העור והשרירים (TMM)", "מנקודות אלו זורם הצ'י ממרידיאן אחד לבן זוגו באותו אלמנט", "מנקודות אלו יוצאים המרידיאנים המסתעפים (Divergent)"],
    ),
    ("acupuncture", 2014, 11): ("על פי תיאוריית הנקודות העתיקות, אילו נקודות משיבות להכרה?", ["באר", "מעיין", "פלג", "ים"]),
    ("acupuncture", 2014, 12): ("על מרידיאני היין, נקודות האש הן גם נקודות ________.", ["מעיין", "פלג", "נהר", "ים"]),
    ("acupuncture", 2015, 11): (
        "לפניכם משפטים על נקודות ההצטברות. איזה משפט אינו נכון?",
        ["דיקור בנקודות אלו יעיל בהפגת כאב", "בנקודות אלו הצ'י והדם נאספים וחודרים לעומק הגוף", "דיקור בנקודות ההצטברות על מרידיאני היין מטפל בפתולוגיות של דם", "דיקור בנקודות ההצטברות על מרידיאני היאנג מטפל במצבים קיצוניים של חוסר"],
    ),
    ("acupuncture", 2017, 15): ("איזו נקודה אינה אחת מארבע נקודות השליטה (Command Points)?", ["LI 4", "LU 7", "ST 36", "SP 6"]),
    ("acupuncture", 2017, 23): ("איזו נקודת דיקור מתאימה ביותר לטיפול באמנוריאה?", ["Kid 5", "SP 16", "DU 9", "ST 40"]),
    ("acupuncture", 2018, 33): (
        "המטפל בחר לדקור את DU 26,‏ UB 40 ו־Yaotongxue. מה הייתה ככל הנראה התלונה העיקרית?",
        ["כאב גב תחתון אקוטי", "בלבול, סחרחורת וכמעט עילפון", "חולשה כרונית בשרירי הרגליים", "התקף סינוסיטיס"],
    ),
    ("acupuncture", 2018, 38): ("איזה צירוף נקודות מותר לשימוש בזמן היריון?", ["GB 21 + GB 34", "SP 6 + ST 36", "PC 6 + Kid 9", "LI 4 + Liv 3"]),
    ("acupuncture", 2019, 38): ("איזו נקודת דיקור אסורה לשימוש בזמן היריון?", ["UB 60", "GB 20", "Kid 3", "Liv 3"]),
    ("acupuncture", 2019, 40): (
        "אצל איזו מטופלת הסובלת מכאבי סיאטיקה נכון להימנע משימוש בכוסות רוח באזור הסקרום?",
        ["מטופלת המדווחת על נטייה לדימומים ספונטניים", "מטופלת המדווחת על לחץ דם גבוה", "מטופלת הסובלת מהזעות ספונטניות", "מטופלת הסובלת מפסוריאזיס כרוני באזור המרפקים"],
    ),
    ("herbs", 2016, 46): (
        "איזה מהצמחים הבאים אין לכלול בפורמולה לטיפול בעצירות על רקע יובש במעיים?",
        [
            "Hei Zhi Ma (Semen Sesami Indici)",
            "Dang Shen (Radix Codonopsis Pilosulae)",
            "Yu Zhu (Rhizoma Polygonati Odorati)",
            "Che Qian Zi (Semen Plantaginis)",
        ],
    ),
    ("herbs", 2019, 43): (
        "אילו מאפייני לשון ודופק מתאימים ביותר לטיפול בפורמולה Si Ni San?",
        [
            "לשון אדומה עם חיפוי צהוב; דופק מיתרי",
            "לשון חיוורת עם חיפוי לבן; דופק מתוח",
            "לשון אדומה חסרת חיפוי; דופק חלש ודק",
            "לשון חיוורת, תפוחה ורטובה; דופק עמוק ומתגלגל",
        ],
    ),
}


def clean(value: str) -> str:
    # The PDFs wrap many individual words in Unicode bidi controls. Removing
    # those controls glues Hebrew and Latin words together; replacing them
    # with a boundary preserves the intended word spacing.
    value = BIDI.sub(" ", value).replace("\n", " ")
    value = re.sub(r"([א-ת])([A-Za-z0-9])", r"\1 \2", value)
    value = re.sub(r"([A-Za-z0-9])([א-ת])", r"\1 \2", value)
    value = re.sub(r"\s+([,.:;?!])", r"\1", value)
    value = re.sub(r"([,;:?!])(?=[א-תA-Za-z])", r"\1 ", value)
    value = re.sub(r"\s+", " ", value).strip(" .")
    value = re.sub(r"^(\d)\s+(\d)\s*\.", r"\1\2.", value)
    value = re.sub(r"\(\s+", "(", value)
    value = re.sub(r"\s+\)", ")", value)
    value = re.sub(r"([א-ת])\(", r"\1 (", value)
    value = re.sub(r"\)([א-ת])", r") \1", value)
    fixes = {
        "פיצר י.יה": "פיצרייה",
        "צמ א": "צמא",
        "אדומ ה": "אדומה",
        "מד ווחת": "מדווחת",
        "ה אבחנה": "האבחנה",
        "אי לו": "אילו",
        "בא יזה": "באיזה",
        "אי זה": "איזה",
        "לאי זו": "לאיזו",
        "קט גור יה": "קטגוריה",
        "מ ציינת": "מציינת",
        "הסימפטומ ים": "הסימפטומים",
        "הסימפטו מים": "הסימפטומים",
        "הפור מולה": "הפורמולה",
        "ה צמח": "הצמח",
        "העיקר יו ת": "העיקריות",
        "העיקרי ו ת": "העיקריות",
        "מתאר ות": "מתארות",
        "צמרמור ות": "צמרמורות",
        "ל ו מר": "לומר",
        "מט( ופלת": "מטופלת (",
        "איזהצמח": "איזה צמח",
        "א יזה": "איזה",
        "מ הצמחים": "מהצמחים",
        "מ הפורמולות": "מהפורמולות",
        "זקוקלזמן": "זקוק לזמן",
        "על ר ק ע": "על רקע",
        "שת ן": "שתן",
        "יאנ ג": "יאנג",
        "כלו ל": "כלול",
        "מפר קים": "מפרקים",
        "חיצוני ת": "חיצונית",
        "באז ור": "באזור",
        "לגב י": "לגבי",
        "ה אקסטרה": "האקסטרה",
        "מ טפל ת": "מטפלת",
        "מת אים": "מתאים",
        "שאו בחן": "שאובחן",
        "ע ל": "על",
        "מת אימה": "מתאימה",
        "ל השתמש": "להשתמש",
        "א זור": "אזור",
        "נק ודות": "נקודות",
        "מתא ימה": "מתאימה",
        "ב ר יות": "ביותר",
        "איר וע": "אירוע",
        "קשי. ים": "קשיים",
        "הפסיקלגמרי": "הפסיק לגמרי",
        "מטופל ת": "מטופלת",
        "מ טופלת": "מטופלת",
        "הד ו פק": "הדופק",
        "מי מיים": "מימיים",
        "לא.מעוכל": "לא מעוכל",
        "ראש.אחרי": "ראש אחרי",
        "מטופ? לת": "מטופלת",
        "ב תשאול": "בתשאול",
        "א.ו": "או",
        "הקאות.ושלשולים": "הקאות ושלשולים",
        "שבועי.ים": "שבועיים",
        "פור מולה": "פורמולה",
        "לש פר": "לשפר",
        "מ.אד": "מאוד",
        "ב יותר": "ביותר",
        "לשפ? ר": "לשפר",
        "האפש, רויות": "האפשרויות",
        "על.סלידה": "על סלידה",
        "על.כאב": "על כאב",
        "קצוות.,": "קצוות;",
        "עמוק.חלש": "עמוק, חלש",
        "ש ינה": "שינה",
        "ק ל": "קל",
        "לחלח.ים": "מלחלחים",
        "ק יבל": "קיבל",
        "Tang.לאחר": "Tang. לאחר",
        "מ כאבי": "מכאבי",
        "ב.כאבי": "בכאבי",
        "מטופל ת ז? ו": "מטופלת זו",
        "מ טופל ת ז? ו": "מטופלת זו",
        "ידי סילוק לחות חמה מהתעלות- שניהם מטפלים בכאבי גב על": "שניהם מטפלים בכאבי גב על-ידי סילוק לחות חמה מהתעלות",
        "תיאורי ת": "תיאוריית",
        "נ כונים": "נכונים",
        "ס י מני שניים": "סימני שיניים",
        "מטופל וז ת": "מטופל זה",
        "ע ומק": "עומק",
        "מייזע ת": "מייזעת",
        "הו א": "הוא",
        "הוצא ת": "הוצאת",
        "החיבו ר": "החיבור",
        "מר י דיאני": "מרידיאני",
        "הי א": "היא",
        "הבאו ת": "הבאות",
        "מתאי מי ם": "מתאימים",
        "התפ קוד": "התפקוד",
        "יא נג": "יאנג",
        "לטיפו ל": "לטיפול",
        "ח ום": "חום",
        "ע להמטפל": "על המטפל",
        "ד יקור": "דיקור",
        "ט יפול": "טיפול",
        "חי. זוק": "חיזוק",
        "רי ח": "ריח",
        "מ נ תלון": "מתלונן",
        "התע וררויות": "התעוררויות",
        "הזעו ת": "הזעות",
        "מד י פעם": "מדי פעם",
        "לסל ק": "לסלק",
        "ח שד": "חשד",
        "בצ הריים": "בצהריים",
        "מו וטב": "ומוטב",
        "בח ימום": "בחימום",
        "מה י האטיולוגיה": "מהי האטיולוגיה",
        "י ין": "יין",
        "דלק ת": "דלקת",
        "מי ן": "מין",
        "שש ת": "שש",
        "הי אנג": "היאנג",
        "עוד ף": "עודף",
        "לב ן": "לבן",
        "כדו פק": "כדופק",
        "של ו ש": "שלוש",
        "איכו ת יו": "איכויות",
        "מלאו ת": "מלאות",
        "ג ר ד": "גרד",
        "הגנ י טלי ה": "הגניטליה",
        "רופ א": "רופא",
        "ע ם": "עם",
        "בי ן": "בין",
        "ה י יתה": "הייתה",
        "ק ור": "קור",
        "הנאו ת": "הנאות",
        "א יברי": "איברי",
        "מוצר י": "מוצרי",
        "כרונ י": "כרוני",
        "מחמ יר": "מחמיר",
        "הא וכל": "האוכל",
        "ביות ר": "ביותר",
        "משק פ ות": "משקפות",
        "פ י תי אוריית": "על פי תיאוריית",
        "אל_מנטים": "אלמנטים",
        "מרידיאנ י": "מרידיאני",
        "מריד יאן": "מרידיאן",
        "נפתחו ת": "נפתחות",
        "הנשימ ה": "הנשימה",
        "ר יק": "ריק",
        "לחו ת": "לחות",
        "מהי ר": "מהיר",
        "מייצ ר ת": "מייצרת",
        "מת לונן": "מתלונן",
        "מר ובים": "מרובים",
        "ת כופות": "תכופות",
        "לי יצב": "לייצב",
        "למנו ע": "למנוע",
        "מתלוננ ת": "מתלוננת",
        "נזל ת": "נזלת",
        "שקופ ה": "שקופה",
        "מ תו. ח": "מתוח",
        "קי ימת": "קיימת",
        "מתעור ר": "מתעורר",
        "י דיעת": "ידיעת",
        "המטו פל": "המטופל",
        "ר פואי": "רפואי",
        "מרו בה": "מרובה",
        "י ומיים": "יומיים",
        "ז ה": "זה",
        "רוח ח ום": "רוח חום",
        "בהנ חה": "בהנחה",
        "כאב י מחזור": "כאבי מחזור",
        "המח מ ם": "המחמם",
        "פ נימית": "פנימית",
        "ר קע": "רקע",
        "כ י הם": "כי הם",
        "משחר ר": "משחרר",
        "מי זעים": "מזיעים",
        "ח מה": "חמה",
        "סובל ת": "סובלת",
        "יבל ק האת": "קיבלה את",
        "חיצוני ת": "חיצונית",
        "מה ן": "מהן",
        "ס ופח": "סופח",
        "מ נ יע": "מניע",
        "רו ח": "רוח",
        "אקו טי": "אקוטי",
        "חדיר ת": "חדירת",
        "הכבדו ת": "הכבדות",
        "הקי סר": "הקיסר",
        "ישירו ת": "ישירות",
        "הנקודו ת": "הנקודות",
        "הנקו דה": "הנקודה",
        "פרו קסימלית": "פרוקסימלית",
        "הפ יקה": "הפיקה",
        "המ ח בר": "המחבר",
        "ד יכאון": "דיכאון",
        "הד י. מום": "הדימום",
        "בחילות..": "בחילות.",
        "החיים....": "החיים.",
        "דכדוך.,": "דכדוך.",
        "מט ופל": "מטופל",
        "IBS..": "IBS.",
        "Tang..": "Tang.",
        "מו מלץ": "מומלץ",
    }
    for wrong, right in fixes.items():
        value = value.replace(wrong, right)
    value = re.sub(r"(מטופל(?:ת)?|בן)\s*(\d+)\s*\)", r"\1 (\2)", value)
    value = re.sub(r"בן\s*(\d+)", r"בן \1", value)
    value = re.sub(r"\.([א-ת])", r". \1", value)
    value = re.sub(r"\s+([,;:?!])", r"\1", value)
    value = re.sub(r"\?\s+(תוצאות הטיפול)", r" \1?", value)
    value = re.sub(r"\?\s+(להוסיף[^?]+)$", r" \1?", value)
    value = re.sub(r"\?\s+עבור\s+([^?]+)$", r" עבור \1?", value)
    value = re.sub(r"^(.+\sעל)-\s*(שניהם.+)$", r"\2 על-\1", value)
    value = re.sub(r"\?\s*למרקחת$", " למרקחת?", value)
    # Repair common word splits produced by the RTL text layer. Hebrew
    # prepositions/articles are attached to the following word, as are
    # suffixes that the PDFs frequently detach from the word stem.
    # Prefix/suffix repairs are handled by explicit substitutions above so
    # option labels in older PDFs are never mistaken for word fragments.
    value = re.sub(r"\s+([,.;:?!])", r"\1", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def clean_question(value: str) -> str:
    value = clean(value).replace("?", "")
    final_fixes = {
        "Type II": "סוג 2",
        "זקוקלזמן": "זקוק לזמן",
        "קטג וריה": "קטגוריה",
        "שתייה, מרובה רעב": "שתייה מרובה, רעב",
        "האבחנה, מדויקת": "האבחנה מדויקת",
        "ZhuYu": "Zhu Yu",
        "ב ריאות": "בריאות",
        "ב הזעות": "בהזעות",
        "ב חרדות": "בחרדות",
        "ב חדירת": "בחדירת",
        "מח צ": "צמח",
        "ה סובלת": "הסובלת",
        "י בשה": "יבשה",
        "סכרת": "סוכרת",
        "ע\"י": "באמצעות",
        "מאד": "מאוד",
        "מלבד:": "מלבד",
        "שיעול. וצחוק": "שיעול וצחוק.",
        "להוסיף - ל": "להוסיף ל־",
        "ל Shao": "ל־Shao",
        " - ו ": " ו־",
        "ו- ": "ו־",
        "ה- 10": "ה־10",
        "הינה": "היא",
        "הסימפטומים": "התסמינים",
        "הסימפטום": "התסמין",
        "הסיניים, הקלאסיים": "הסיניים הקלאסיים",
        "בכאב בהנחה": "בכאב. בהנחה",
        "האבחנה מדויקת איזו": "האבחנה מדויקת, איזו",
        "מ הנקודות": "מהנקודות",
        "מ האינדיקציות": "מהאינדיקציות",
        "ב צניחת": "בצניחת",
        "ו. על": "ועל",
        "על. קשיחות": "על קשיחות",
        "סלידה. מקור.": "סלידה מקור.",
        "מזה. יומיים יש לו, חום כאב, גרון": "מזה יומיים. יש לו חום, כאב גרון",
        "על, סחרחורות תחושה": "על סחרחורת, תחושה",
        "דפיקות לב, מואצות": "דפיקות לב מואצות",
        "חצי. שנה היא לא. בהריון": "חצי שנה. היא אינה בהריון.",
    }
    for wrong, right in final_fixes.items():
        value = value.replace(wrong, right)
    value = value.lstrip(" ,")
    value = re.sub(r"_{2,}", "________", value)
    value = re.sub(r"\s+([,.;:])", r"\1", value)
    value = value.replace(",:", ",").replace(":?", "?")
    value = re.sub(r"(קפדנית|הפרוקסימליות|דופק מיתרי)\s+(מהו)", r"\1. \2", value)
    value = re.sub(r"\s+", " ", value).strip(" .")
    value = value.replace("((", "(").replace("))", ")")
    value = re.sub(r",\s+(חיצון|לחות|הכליות)", r" \1", value)
    value = value.replace("?", "")
    return f"{value}?"


def split_choice_markers(value: str) -> list[str]:
    # Depending on the PDF producer, Hebrew option labels are extracted as
    # either "א." or ".א". A block can contain several options.
    marker = r"(?:^[אבגד](?:\s*\.|\s+)|(?<=[.?])\s*[אבגד](?:\s*\.|\s+)|(?<=\s)[אבגד]\s*\.)"
    starts = [match.start() for match in re.finditer(marker, value)]
    if not starts:
        return [value]
    parts = []
    if starts[0] > 0:
        parts.append(value[: starts[0]])
    for index, start in enumerate(starts):
        parts.append(value[start : starts[index + 1] if index + 1 < len(starts) else None])
    return [part.strip() for part in parts if part.strip()]


def split_inline_first_option(value: str) -> list[str]:
    """Separate option 1 when the PDF glued it to the question sentence."""
    match = re.match(r"^(.+?\?)\s+(1\s*\.\s+.+)$", value)
    return [match.group(1), match.group(2)] if match else [value]


def letter_choice(value: str):
    match = re.match(r"^(?:([אבגד])(?:\s*\.|\s+)|\.\s*([אבגד])\s*)\s*(.*)$", value)
    if not match:
        return None
    return LETTERS.index(match.group(1) or match.group(2)), clean(match.group(3))


def extract_questions(path: Path) -> list[tuple[int, str, list[str]]]:
    last_number = 0
    question_number = None
    question = None
    options: list[str] = []
    mode = None
    result = []

    for page in fitz.open(path):
        for block in page.get_text("blocks"):
            raw = clean(block[4])
            values = []
            for part in split_choice_markers(raw):
                values.extend(split_inline_first_option(part))
            for value in values:
                # OCR occasionally inserts one stray character between the
                # question number and its period (for example "6ל.").
                question_match = re.match(r"^(\d{1,2})(?:\s*.{0,3}?\.\s*|\s+)(.*)$", value)
                trailing_question = re.match(r"^(.+?\??)\s*[:.]?\s*(\d{1,2})$", value)
                candidate_number = int(question_match.group(1)) if question_match else None
                question_text = question_match.group(2).strip() if question_match else ""
                if not question_match and trailing_question:
                    trailing_number = int(trailing_question.group(2))
                    if trailing_number == last_number + 1:
                        candidate_number = trailing_number
                        question_text = trailing_question.group(1).strip()
                if candidate_number and candidate_number >= 10:
                    reversed_number = int(str(candidate_number)[::-1])
                    if reversed_number == last_number + 1:
                        candidate_number = reversed_number
                if question is None:
                    if candidate_number and candidate_number > last_number and question_text:
                        question_number = candidate_number
                        question = clean(question_text)
                        options = []
                        mode = None
                    continue

                choice = letter_choice(value)
                number_choice = re.match(r"^(\d+)\s*\.\s*(.*)$", value)
                if choice and choice[0] == len(options):
                    mode = "letter"
                    options.append(choice[1])
                elif number_choice and int(number_choice.group(1)) == len(options) + 1 and mode in (None, "number"):
                    mode = "number"
                    options.append(clean(number_choice.group(2)))
                elif candidate_number and candidate_number > (question_number or 0):
                    # A malformed/OCR-damaged option should not swallow every
                    # later question. Drop only that question and resync.
                    question_number = candidate_number
                    question = clean(question_text)
                    options = []
                    mode = None
                else:
                    question = clean(f"{question} {value}")

                if len(options) == 4:
                    result.append((question_number, question, options))
                    last_number = question_number
                    question_number = None
                    question = None

    return result


def extract_answers(path: Path) -> dict[int, str]:
    page = fitz.open(path)[0]
    rows = {}
    for word in page.get_text("words"):
        rows.setdefault(round(word[1] / 3) * 3, []).append(word)

    result = {}
    row_positions = sorted(rows)
    for y in row_positions:
        numbers = [word for word in rows[y] if re.fullmatch(r"\d{1,2}", word[4])]
        if len(numbers) < 5:
            continue
        answer_rows = []
        for next_y in row_positions:
            if next_y <= y or next_y > y + 130:
                continue
            labels = [word for word in rows[next_y] if word[4] in LETTERS]
            if labels:
                answer_rows.append((next_y, labels[0][4], rows[next_y]))
        for _, label, words in answer_rows[:4]:
            for mark in [word for word in words if word[4].upper().startswith("X") or word[4] == "ס"]:
                mark_x = (mark[0] + mark[2]) / 2
                nearest = min(numbers, key=lambda word: abs((word[0] + word[2]) / 2 - mark_x))
                if abs((nearest[0] + nearest[2]) / 2 - mark_x) < 13:
                    result[int(nearest[4])] = ANSWER_IDS[LETTERS.index(label)]
    return result


def extract_point_location_images(path: Path, year: int):
    """Create interactive image questions from the illustrated exam pages."""
    cutoff = 10 if year <= 2013 else 15
    image_dir = ROOT / "public" / "exams-images"
    image_dir.mkdir(parents=True, exist_ok=True)
    questions = []
    image_paths = {}
    seen = set()
    document = fitz.open(path)
    for page_number, page in enumerate(document, 1):
        headings = []
        for block in page.get_text("blocks"):
            value = clean(block[4])
            match = re.match(r"^(\d{1,2})(?:\s*.{0,3}?\.\s*|\s+)(.*)$", value)
            if match and 1 <= int(match.group(1)) <= cutoff and "נקוד" in match.group(2) and int(match.group(1)) not in seen:
                headings.append((int(match.group(1)), clean_question(match.group(2)), block[1]))
                seen.add(int(match.group(1)))
        headings.sort(key=lambda item: item[2])
        for index, (number, question, top) in enumerate(headings):
            bottom = headings[index + 1][2] if index + 1 < len(headings) else page.rect.height
            clip = fitz.Rect(0, max(0, top - 8), page.rect.width, min(page.rect.height, bottom - 4))
            filename = f"point-location-{year}-{number}.png"
            page.get_pixmap(matrix=fitz.Matrix(1.6, 1.6), clip=clip, alpha=False).save(image_dir / filename)
            options = [f"הנקודה המסומנת באות {letter}׳" for letter in LETTERS]
            questions.append((number, question, options))
            image_paths[number] = f"/exams-images/{filename}"
    return questions, image_paths


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for topic_key, topic_title in TOPICS.items():
        years = [2012] if topic_key == "western" else range(2012, 2020)
        for year in years:
            stem = f"{topic_key}-{year}"
            questions = extract_questions(PDF_DIR / f"{stem}.pdf")
            image_paths = {}
            if topic_key == "point-location":
                image_questions, image_paths = extract_point_location_images(PDF_DIR / f"{stem}.pdf", year)
                questions.extend(image_questions)
            answers = extract_answers(PDF_DIR / f"{stem}-answers.pdf")
            for (manual_topic, manual_year, number), (question, options) in MANUAL_QUESTIONS.items():
                if manual_topic == topic_key and manual_year == year:
                    questions = [item for item in questions if item[0] != number]
                    questions.append((number, question, options))
            questions.sort(key=lambda item: item[0])
            data = []
            for question_number, question, options in questions:
                if question_number not in answers:
                    continue
                correct_text = options[ANSWER_IDS.index(answers[question_number])]
                data.append({
                    "id": f"source-{stem}-{question_number}",
                    "year": year,
                    "questionNumber": question_number,
                    "topic": topic_title,
                    "subject": topic_title,
                    "question": clean_question(question),
                    "options": [{"id": option_id, "text": text} for option_id, text in zip(ANSWER_IDS, options)],
                    "correctAnswer": answers[question_number],
                    "explanation": f"התשובה הנכונה היא „{correct_text}”. היא תואמת למפתח התשובות הרשמי של מבחן האיגוד משנת {year}.",
                    "source": f"מבחן האיגוד — {topic_title}, {year}",
                })
                if question_number in image_paths:
                    data[-1]["image"] = image_paths[question_number]
            (OUT_DIR / f"{stem}.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
            print(f"{stem}: {len(data)} questions (PDF: {len(questions)}, key: {len(answers)})")


if __name__ == "__main__":
    main()
