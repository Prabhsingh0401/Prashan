export type PaperType = "label" | "board";

export type QuestionType = "mcq" | "short" | "long";

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  marks: number;
  options?: string[];
}

export interface BoardPaperForm {
  schoolName: string;
  examName: string;
  board: string;
  class: string;
  subject: string;
  date: string;
  duration: string;
  maxMarks: string;
  questions: Question[];
  questionTypes: {
    mcq: { count: number; marks: number };
    short: { count: number; marks: number };
    long: { count: number; marks: number };
  };
}

export interface AssignmentForm {
  class: string;
  subject: string;
  chapters: string[];
  instructions: string;
  totalMarks: number;
  questionTypes: {
    mcq: { count: number; marks: number };
    short: { count: number; marks: number };
    long: { count: number; marks: number };
  };
}

export const CHAPTERS: Record<string, string[]> = {
  "Mathematics": ["Chapter 1: Real Numbers", "Chapter 2: Polynomials", "Chapter 3: Pair of Linear Equations", "Chapter 4: Quadratic Equations", "Chapter 5: Arithmetic Progressions", "Chapter 6: Triangles", "Chapter 7: Coordinate Geometry", "Chapter 8: Introduction to Trigonometry", "Chapter 9: Applications of Trigonometry", "Chapter 10: Circles", "Chapter 11: Areas Related to Circles", "Chapter 12: Surface Areas and Volumes", "Chapter 13: Statistics", "Chapter 14: Probability"],
  "Science": ["Chapter 1: Chemical Reactions", "Chapter 2: Acids and Bases", "Chapter 3: Metals and Non-metals", "Chapter 4: Carbon Compounds", "Chapter 5: Life Processes", "Chapter 6: Control and Coordination", "Chapter 7: How do Organisms Reproduce", "Chapter 8: Heredity", "Chapter 9: Light", "Chapter 10: Electricity", "Chapter 11: Magnetic Effects", "Chapter 12: Our Environment"],
  "Physics": ["Chapter 1: Electric Charges", "Chapter 2: Current Electricity", "Chapter 3: Magnetic Effects", "Chapter 4: Electromagnetic Induction", "Chapter 5: Light", "Chapter 6: Atoms", "Chapter 7: Nuclei"],
  "Chemistry": ["Chapter 1: Periodic Table", "Chapter 2: Chemical Bonding", "Chapter 3: States of Matter", "Chapter 4: Thermodynamics", "Chapter 5: Equilibrium", "Chapter 6: Redox Reactions", "Chapter 7: Organic Chemistry Basics"],
  "Biology": ["Chapter 1: Life Processes", "Chapter 2: Nutrition", "Chapter 3: Respiration", "Chapter 4: Transportation", "Chapter 5: Excretion", "Chapter 6: Control and Coordination", "Chapter 7: Reproduction", "Chapter 8: Heredity", "Chapter 9: Our Environment"],
  "English": ["Reading Comprehension", "Writing Skills", "Grammar", "Literature (Prose)", "Literature (Poetry)", "Vocabulary"],
  "Hindi": ["अपठित गद्यांश", "लेखन कौशल", "व्याकरण", "साहित्य (गद्य)", "साहित्य (पद्य)", "शब्द-भंडार"],
};

export const SUBJECTS_10 = ["Mathematics", "Science", "English", "Hindi", "Social Science"];
export const SUBJECTS_12 = ["Physics", "Chemistry", "Biology", "Mathematics", "English", "Hindi"];

export const initialBoardForm: BoardPaperForm = {
  schoolName: "",
  examName: "",
  board: "CBSE",
  class: "10",
  subject: "",
  date: "",
  duration: "",
  maxMarks: "80",
  questions: [],
  questionTypes: {
    mcq: { count: 0, marks: 1 },
    short: { count: 0, marks: 2 },
    long: { count: 0, marks: 5 },
  },
};

export const initialAssignmentForm: AssignmentForm = {
  class: "10",
  subject: "",
  chapters: [],
  instructions: "",
  totalMarks: 80,
  questionTypes: {
    mcq: { count: 0, marks: 1 },
    short: { count: 0, marks: 2 },
    long: { count: 0, marks: 5 },
  },
};
