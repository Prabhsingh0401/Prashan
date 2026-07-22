export type PaperType = "label" | "board";

export type FontFamily = "Times New Roman" | "Arial" | "serif" | "sans-serif" | "monospace";
export type FontWeight = "normal" | "bold";
export type FontStyle = "normal" | "italic";

export interface FormattingOptions {
  headerFontFamily: FontFamily;
  headerFontSize: number;
  headerFontWeight: FontWeight;
  headerFontStyle: FontStyle;
  headingFontFamily: FontFamily;
  headingFontSize: number;
  headingFontWeight: FontWeight;
  headingFontStyle: FontStyle;
  bodyFontFamily: FontFamily;
  bodyFontSize: number;
}

export const defaultFormatting: FormattingOptions = {
  headerFontFamily: "Times New Roman",
  headerFontSize: 14,
  headerFontWeight: "bold",
  headerFontStyle: "normal",
  headingFontFamily: "Times New Roman",
  headingFontSize: 12,
  headingFontWeight: "bold",
  headingFontStyle: "normal",
  bodyFontFamily: "Times New Roman",
  bodyFontSize: 11,
};

export type QuestionType = "mcq" | "short" | "long";

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  marks: number;
  options?: string[];
}

// ─── CBSE Section Format ───────────────────────────────────────────────────────

/** A single section in a CBSE paper (e.g. "MCQ", "VSA", "Case Study") */
export interface SubjectSection {
  /** Unique key, e.g. "mcq", "ar", "vsa" */
  key: string;
  /** Display label, e.g. "MCQ (Q1–18)" */
  label: string;
  /** Optional clarification, e.g. "Assertion-Reason" */
  sublabel?: string;
  /** Marks per question */
  marksPerQ: number;
  /** Default / CBSE-standard question count */
  defaultCount: number;
  /** How many questions the teacher wants */
  count: number;
  /** Whether teacher can change the count */
  editable?: boolean;
  /** Optional note shown to teacher, e.g. "attempt any 4 of 5" */
  note?: string;
  /** Optional sub-group label (for sectioned subjects like Science / Social Science) */
  group?: string;
}

/**
 * CBSE Class 10 prescribed formats keyed by subject name.
 * Each entry is an array of SubjectSection objects (one per question group).
 */
export const CBSE_SUBJECT_FORMATS: Record<string, SubjectSection[]> = {

  // ── Mathematics Standard (Code 041) — 80 marks ──────────────────────────────
  "Mathematics": [
    { key: "mcq",   label: "MCQ",             sublabel: "Q1–18",  marksPerQ: 1, defaultCount: 18, count: 18 },
    { key: "ar",    label: "Assertion-Reason", sublabel: "Q19–20", marksPerQ: 1, defaultCount: 2,  count: 2  },
    { key: "vsa",   label: "VSA",              sublabel: "Q21–25", marksPerQ: 2, defaultCount: 5,  count: 5  },
    { key: "sa",    label: "SA",               sublabel: "Q26–31", marksPerQ: 3, defaultCount: 6,  count: 6  },
    { key: "la",    label: "LA",               sublabel: "Q32–35", marksPerQ: 5, defaultCount: 4,  count: 4  },
    { key: "cs",    label: "Case Study",       sublabel: "Q36–38", marksPerQ: 4, defaultCount: 3,  count: 3  },
  ],

  // ── English Language & Literature (Code 184) — 80 marks ─────────────────────
  "English": [
    { key: "read",  label: "Reading Passages",        sublabel: "Q1–2",    marksPerQ: 10, defaultCount: 2, count: 2, note: "2 passages × 10 marks" },
    { key: "gram",  label: "Grammar Tasks",           sublabel: "Q3",      marksPerQ: 1,  defaultCount: 10, count: 10, note: "10 tasks × 1 mark" },
    { key: "writ",  label: "Writing (Letter/Para)",   sublabel: "Q4–5",    marksPerQ: 5,  defaultCount: 2,  count: 2  },
    { key: "ext",   label: "Extract-based",           sublabel: "Q6–7",    marksPerQ: 5,  defaultCount: 2,  count: 2  },
    { key: "salit", label: "Short Answer – Literature",sublabel: "Q8",     marksPerQ: 3,  defaultCount: 4,  count: 4, note: "attempt any 4 of 5" },
    { key: "sasupp",label: "Short Answer – Supplementary",sublabel: "Q9", marksPerQ: 3,  defaultCount: 2,  count: 2, note: "attempt any 2 of 3" },
    { key: "la",    label: "Long Answer",             sublabel: "Q10–11",  marksPerQ: 6,  defaultCount: 2,  count: 2  },
  ],

  // ── Hindi Course A (Code 002) — 80 marks ─────────────────────────────────────
  "Hindi Course A": [
    { key: "up1",   label: "Unseen Passage – Prose",  sublabel: "Q1",  marksPerQ: 7, defaultCount: 1, count: 1 },
    { key: "up2",   label: "Unseen Passage – Poetry", sublabel: "Q2",  marksPerQ: 7, defaultCount: 1, count: 1 },
    { key: "gr1",   label: "Grammar – Sentence Types",sublabel: "Q3",  marksPerQ: 1, defaultCount: 4, count: 4, note: "any 4 of 5" },
    { key: "gr2",   label: "Grammar – Voice/Vachya",  sublabel: "Q4",  marksPerQ: 1, defaultCount: 4, count: 4, note: "any 4 of 5" },
    { key: "gr3",   label: "Grammar – Pad Parichay",  sublabel: "Q5",  marksPerQ: 1, defaultCount: 4, count: 4, note: "any 4 of 5" },
    { key: "gr4",   label: "Grammar – Alankar",       sublabel: "Q6",  marksPerQ: 1, defaultCount: 4, count: 4, note: "any 4 of 5" },
    { key: "tb1",   label: "Textbook MCQ – Prose",    sublabel: "Q7",  marksPerQ: 1, defaultCount: 5, count: 5 },
    { key: "tb2",   label: "Textbook SA – Prose",     sublabel: "Q8",  marksPerQ: 2, defaultCount: 3, count: 3, note: "any 3 of 4" },
    { key: "tb3",   label: "Textbook MCQ – Poetry",   sublabel: "Q9",  marksPerQ: 1, defaultCount: 5, count: 5 },
    { key: "tb4",   label: "Textbook SA – Poetry",    sublabel: "Q10", marksPerQ: 2, defaultCount: 3, count: 3, note: "any 3 of 4" },
    { key: "sup",   label: "Supplementary Reader",    sublabel: "Q11", marksPerQ: 4, defaultCount: 2, count: 2, note: "any 2 of 3" },
    { key: "para",  label: "Paragraph Writing",       sublabel: "Q12", marksPerQ: 6, defaultCount: 1, count: 1 },
    { key: "lett",  label: "Letter Writing",          sublabel: "Q13", marksPerQ: 5, defaultCount: 1, count: 1 },
    { key: "cvemail",label: "CV / Email",             sublabel: "Q14", marksPerQ: 5, defaultCount: 1, count: 1 },
    { key: "adv",   label: "Advertisement / Message", sublabel: "Q15", marksPerQ: 4, defaultCount: 1, count: 1 },
  ],

  // ── Hindi Course B (Code 085) — 80 marks ─────────────────────────────────────
  "Hindi Course B": [
    { key: "up1",   label: "Unseen Passage 1",        sublabel: "Q1",  marksPerQ: 7, defaultCount: 1, count: 1 },
    { key: "up2",   label: "Unseen Passage 2",        sublabel: "Q2",  marksPerQ: 7, defaultCount: 1, count: 1 },
    { key: "gr1",   label: "Grammar – Padbandh",      sublabel: "Q3",  marksPerQ: 1, defaultCount: 4, count: 4, note: "any 4 of 5" },
    { key: "gr2",   label: "Grammar – Sentence Trans.",sublabel: "Q4", marksPerQ: 1, defaultCount: 4, count: 4, note: "any 4 of 5" },
    { key: "gr3",   label: "Grammar – Samas",         sublabel: "Q5",  marksPerQ: 1, defaultCount: 4, count: 4, note: "any 4 of 5" },
    { key: "gr4",   label: "Grammar – Muhavare",      sublabel: "Q6",  marksPerQ: 1, defaultCount: 4, count: 4, note: "any 4 of 5" },
    { key: "tb1",   label: "Textbook MCQ – Prose",    sublabel: "Q7",  marksPerQ: 1, defaultCount: 5, count: 5 },
    { key: "tb2",   label: "Textbook SA – Prose",     sublabel: "Q8",  marksPerQ: 2, defaultCount: 3, count: 3, note: "any 3 of 4" },
    { key: "tb3",   label: "Textbook MCQ – Poetry",   sublabel: "Q9",  marksPerQ: 1, defaultCount: 5, count: 5 },
    { key: "tb4",   label: "Textbook SA – Poetry",    sublabel: "Q10", marksPerQ: 2, defaultCount: 3, count: 3, note: "any 3 of 4" },
    { key: "sup",   label: "Supplementary Reader",    sublabel: "Q11", marksPerQ: 3, defaultCount: 2, count: 2, note: "any 2 of 3" },
    { key: "para",  label: "Paragraph Writing",       sublabel: "Q12", marksPerQ: 5, defaultCount: 1, count: 1 },
    { key: "lett",  label: "Formal Letter",           sublabel: "Q13", marksPerQ: 5, defaultCount: 1, count: 1 },
    { key: "notice",label: "Notice Writing",          sublabel: "Q14", marksPerQ: 4, defaultCount: 1, count: 1 },
    { key: "adv",   label: "Advertisement",           sublabel: "Q15", marksPerQ: 3, defaultCount: 1, count: 1 },
    { key: "story", label: "Short Story / Email",     sublabel: "Q16", marksPerQ: 5, defaultCount: 1, count: 1 },
  ],

  // ── Science (Code 086) — 80 marks ────────────────────────────────────────────
  // Section A — Biology
  "Science": [
    { key: "bio_mcq",  label: "MCQ",              sublabel: "Q1–7",   marksPerQ: 1, defaultCount: 7, count: 7, group: "Section A – Biology" },
    { key: "bio_ar",   label: "Assertion-Reason",  sublabel: "Q8–9",   marksPerQ: 1, defaultCount: 2, count: 2, group: "Section A – Biology" },
    { key: "bio_sa2",  label: "SA (2 marks)",      sublabel: "Q10–12", marksPerQ: 2, defaultCount: 3, count: 3, group: "Section A – Biology" },
    { key: "bio_sa3",  label: "SA (3 marks)",      sublabel: "Q13–14", marksPerQ: 3, defaultCount: 2, count: 2, group: "Section A – Biology" },
    { key: "bio_la",   label: "LA (4–5 marks)",    sublabel: "Q15–16", marksPerQ: 4, defaultCount: 2, count: 2, group: "Section A – Biology" },
    // Section B — Chemistry
    { key: "chem_mcq", label: "MCQ",              sublabel: "Q17–23", marksPerQ: 1, defaultCount: 7, count: 7, group: "Section B – Chemistry" },
    { key: "chem_ar",  label: "Assertion-Reason",  sublabel: "Q24",    marksPerQ: 1, defaultCount: 1, count: 1, group: "Section B – Chemistry" },
    { key: "chem_sa",  label: "SA (2–3 marks)",   sublabel: "Q25–27", marksPerQ: 2, defaultCount: 3, count: 3, group: "Section B – Chemistry" },
    { key: "chem_la",  label: "LA (4–5 marks)",   sublabel: "Q28–29", marksPerQ: 4, defaultCount: 2, count: 2, group: "Section B – Chemistry" },
    // Section C — Physics
    { key: "phy_mcq",  label: "MCQ",              sublabel: "Q30–32", marksPerQ: 1, defaultCount: 3, count: 3, group: "Section C – Physics" },
    { key: "phy_sa",   label: "SA (2–3 marks)",   sublabel: "Q33–36", marksPerQ: 2, defaultCount: 4, count: 4, group: "Section C – Physics" },
    { key: "phy_la",   label: "LA (3–5 marks)",   sublabel: "Q37–39", marksPerQ: 3, defaultCount: 3, count: 3, group: "Section C – Physics" },
  ],

  // ── Social Science (Code 087) — 80 marks ─────────────────────────────────────
  // Each of the 4 sub-sections carries 20 marks with the same internal format.
  "Social Science": [
    // History
    { key: "his_mcq",  label: "MCQ",        marksPerQ: 1, defaultCount: 4, count: 4, group: "History" },
    { key: "his_vsa",  label: "VSA",        marksPerQ: 2, defaultCount: 2, count: 2, group: "History" },
    { key: "his_sa",   label: "SA",         marksPerQ: 3, defaultCount: 1, count: 1, group: "History" },
    { key: "his_la",   label: "LA",         marksPerQ: 5, defaultCount: 1, count: 1, group: "History" },
    { key: "his_cs",   label: "Case Study", marksPerQ: 4, defaultCount: 1, count: 1, group: "History" },
    { key: "his_map",  label: "Map-based",  marksPerQ: 2, defaultCount: 1, count: 1, group: "History", note: "2 marks" },
    // Geography
    { key: "geo_mcq",  label: "MCQ",        marksPerQ: 1, defaultCount: 4, count: 4, group: "Geography" },
    { key: "geo_vsa",  label: "VSA",        marksPerQ: 2, defaultCount: 2, count: 2, group: "Geography" },
    { key: "geo_sa",   label: "SA",         marksPerQ: 3, defaultCount: 1, count: 1, group: "Geography" },
    { key: "geo_la",   label: "LA",         marksPerQ: 5, defaultCount: 1, count: 1, group: "Geography" },
    { key: "geo_cs",   label: "Case Study", marksPerQ: 4, defaultCount: 1, count: 1, group: "Geography" },
    { key: "geo_map",  label: "Map-based",  marksPerQ: 3, defaultCount: 1, count: 1, group: "Geography", note: "3 marks" },
    // Political Science
    { key: "ps_mcq",   label: "MCQ",        marksPerQ: 1, defaultCount: 4, count: 4, group: "Political Science" },
    { key: "ps_vsa",   label: "VSA",        marksPerQ: 2, defaultCount: 2, count: 2, group: "Political Science" },
    { key: "ps_sa",    label: "SA",         marksPerQ: 3, defaultCount: 1, count: 1, group: "Political Science" },
    { key: "ps_la",    label: "LA",         marksPerQ: 5, defaultCount: 1, count: 1, group: "Political Science" },
    { key: "ps_cs",    label: "Case Study", marksPerQ: 4, defaultCount: 1, count: 1, group: "Political Science" },
    // Economics
    { key: "eco_mcq",  label: "MCQ",        marksPerQ: 1, defaultCount: 4, count: 4, group: "Economics" },
    { key: "eco_vsa",  label: "VSA",        marksPerQ: 2, defaultCount: 2, count: 2, group: "Economics" },
    { key: "eco_sa",   label: "SA",         marksPerQ: 3, defaultCount: 1, count: 1, group: "Economics" },
    { key: "eco_la",   label: "LA",         marksPerQ: 5, defaultCount: 1, count: 1, group: "Economics" },
    { key: "eco_cs",   label: "Case Study", marksPerQ: 4, defaultCount: 1, count: 1, group: "Economics" },
  ],
};

/** Subjects that have a CBSE prescribed format */
export const CBSE_FORMAT_SUBJECTS = Object.keys(CBSE_SUBJECT_FORMATS);

// ─── Board Paper Form ──────────────────────────────────────────────────────────

export interface BoardPaperForm {
  schoolName: string;
  examName: string;
  board: string;
  class: string;
  subject: string;
  subSubjects: string[];
  chapters: string[];
  date: string;
  duration: string;
  maxMarks: string;
  questions: Question[];
  /** CBSE-format sections for step 3 (replaces old generic questionTypes) */
  sections: SubjectSection[];
  /** Legacy generic question types kept for Assignment wizard */
  questionTypes: {
    mcq: { count: number; marks: number };
    short: { count: number; marks: number };
    long: { count: number; marks: number };
  };
  formatting: FormattingOptions;
}

export interface AssignmentForm {
  class: string;
  subject: string;
  subSubjects: string[];
  chapters: string[];
  instructions: string;
  totalMarks: number;
  questionTypes: {
    mcq: { count: number; marks: number };
    short: { count: number; marks: number };
    long: { count: number; marks: number };
  };
  formatting: FormattingOptions;
}

export const CHAPTERS: Record<string, string[]> = {
  "Mathematics": [
    "Real Numbers",
    "Polynomials",
    "Pair of Linear Equations in Two Variables",
    "Quadratic Equations",
    "Arithmetic Progressions",
    "Triangles",
    "Coordinate Geometry",
    "Introduction to Trigonometry",
    "Some Applications of Trigonometry",
    "Circles",
    "Areas related to circles",
    "Surface areas and volumes",
    "Statistics",
    "Probability",
    "Proofs in Mathematics",
    "Mathematical Modelling"
  ],
  "Science": [
    "Chemical Reactions and Equations",
    "Acids, Bases and Salts",
    "Metals and Non-metals",
    "Carbon and its Compounds",
    "Life Processes",
    "Control and Coordination",
    "How do Organisms reproduce",
    "Heredity",
    "Our Environment",
    "Light - reflection and refraction",
    "Human Eye and the Colourful World",
    "Electricity",
    "Magnetic Effects of Electric Current"
  ],
  "Physics": [
    "Light - reflection and refraction",
    "Human Eye and the Colourful World",
    "Electricity",
    "Magnetic Effects of Electric Current"
  ],
  "Chemistry": [
    "Chemical Reactions and Equations",
    "Acids, Bases and Salts",
    "Metals and Non-metals",
    "Carbon and its Compounds"
  ],
  "Biology": [
    "Life Processes",
    "Control and Coordination",
    "How do Organisms reproduce",
    "Heredity",
    "Our Environment"
  ],
  "English": [
    "A Letter to God",
    "Nelson Mandela: Long Walk to Freedom",
    "Two Stories about Flying",
    "From the Diary of Anne Frank",
    "Glimpses of India",
    "Mijbil the Otter",
    "Madam Rides the Bus",
    "The Sermon at Benares",
    "The Proposal"
  ],
  "Hindi": [
    "अपठित गद्यांश",
    "लेखन कौशल",
    "व्याकरण",
    "साहित्य (गद्य)",
    "साहित्य (पद्य)",
    "शब्द-भंडार"
  ],
  "Hindi Course A": [
    "सूरदास",
    "तुलसीदास",
    "जयशंकर प्रसाद",
    "सूर्यकांत त्रिपाठी 'निराला'",
    "नागार्जुन",
    "मंगलेश डबराल",
    "स्वयं प्रकाश",
    "रामवृक्ष बेनीपुरी",
    "यशपाल",
    "मन्नू भंडारी",
    "यतींद्र मिश्र",
    "भदंत आनंद कौसल्यायन",
    "माता का अँचल",
    "साना-साना हाथ जोड़ी",
    "मैं क्यों लिखता हूँ?"
  ],
  "Hindi Course B": [
    "कबीर",
    "मीरा",
    "मैथिलीशरण गुप्त",
    "सुमित्रानंदन पंत",
    "विरेन डांगवाल",
    "कैफी आज़मी",
    "रवीन्द्रनाथ ठाकुर",
    "बड़े भाई साहब",
    "डायरी का एक पन्ना",
    "तताँरा-वामीरो कथा",
    "तीसरी कसम के शिल्पकार शैलेंद्र",
    "अब कहाँ दूसरे के दुख से दुखी होने वाले",
    "पतझर में टूटी पत्तियाँ",
    "कारतूस"
  ],
  "History": [
    "The Rise of Nationalism in Europe",
    "Nationalism in India",
    "The Making of a Global World",
    "The Age of Industrialisation",
    "Print Culture and the Modern World"
  ],
  "Geography": [
    "Resources and Development",
    "Forest and Wildlife Resources",
    "Water Resources",
    "Agriculture",
    "Minerals and Energy Resources",
    "Manufacturing Industries",
    "Lifelines of Indian Economy"
  ],
  "Civics": [
    "Power-sharing",
    "Federalism",
    "Gender, Religion and Caste",
    "Political Parties",
    "Outcomes of Democracy"
  ],
  "Economics": [
    "Development",
    "Sectors of Indian Economy",
    "Money and Credit",
    "Globalisation and the Indian Economy",
    "Consumer Rights"
  ]
};

export const SUBJECTS_10 = ["Mathematics", "Science", "English", "Hindi Course A", "Hindi Course B", "Social Science"];
export const SUBJECTS_12 = ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Hindi"];

export const SOCIAL_SCIENCE_SUBJECTS = ["History", "Geography", "Civics", "Economics"];
export const SCIENCE_SUBJECTS = ["Physics", "Chemistry", "Biology"];

export const initialBoardForm: BoardPaperForm = {
  schoolName: "",
  examName: "",
  board: "CBSE",
  class: "10",
  subject: "",
  subSubjects: [],
  chapters: [],
  date: "",
  duration: "",
  maxMarks: "80",
  questions: [],
  sections: [],
  questionTypes: {
    mcq: { count: 0, marks: 1 },
    short: { count: 0, marks: 2 },
    long: { count: 0, marks: 5 },
  },
  formatting: { ...defaultFormatting },
};

export const initialAssignmentForm: AssignmentForm = {
  class: "10",
  subject: "",
  subSubjects: [],
  chapters: [],
  instructions: "",
  totalMarks: 80,
  questionTypes: {
    mcq: { count: 0, marks: 1 },
    short: { count: 0, marks: 2 },
    long: { count: 0, marks: 5 },
  },
  formatting: { ...defaultFormatting },
};
