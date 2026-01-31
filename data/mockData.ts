// Mock data for the application - will be replaced with real Supabase data later

export interface Statistics {
  totalLessons: number;
  completedLessons: number;
  currentStreak: number;
  longestStreak: number;
  wordsLearned: number;
  totalStudyTime: number; // minutes
  weeklyGoal: number;
  weeklyProgress: number;
}

export interface WeeklyActivityData {
  day: string;
  minutes: number;
}

export interface VocabularyItem {
  word: string;
  options: string[];
  correct: string;
}

export interface CourseMaterial {
  id: string;
  title: string;
  description: string;
  minutes: number;
  level: "A1" | "A2" | "B1" | "B2";
  format: "Video" | "PDF" | "Audio";
  isNew?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  teacher: string;
  startsAt: string;
  duration: number;
  level: "A2" | "B1" | "B2";
  location: string;
}

// Statistics mock data
export const mockStatistics: Statistics = {
  totalLessons: 45,
  completedLessons: 32,
  currentStreak: 7,
  longestStreak: 14,
  wordsLearned: 245,
  totalStudyTime: 1840, // minutes
  weeklyGoal: 5,
  weeklyProgress: 4,
};

// Weekly activity mock data (last 7 days)
export const mockWeeklyActivity: WeeklyActivityData[] = [
  { day: "Mon", minutes: 25 },
  { day: "Tue", minutes: 40 },
  { day: "Wed", minutes: 15 },
  { day: "Thu", minutes: 30 },
  { day: "Fri", minutes: 45 },
  { day: "Sat", minutes: 20 },
  { day: "Sun", minutes: 35 },
];

// Vocabulary mock data
export const mockVocabularyBank: VocabularyItem[] = [
  {
    word: "apple",
    options: ["jabłko", "gruszka", "banan", "śliwka"],
    correct: "jabłko",
  },
  {
    word: "book",
    options: ["książka", "tablica", "ołówek", "zeszyt"],
    correct: "książka",
  },
  { 
    word: "house", 
    options: ["dom", "okno", "drzwi", "pokój"], 
    correct: "dom" 
  },
  {
    word: "water",
    options: ["woda", "ognień", "powietrze", "ziemia"],
    correct: "woda",
  },
  {
    word: "teacher",
    options: ["nauczyciel", "uczeń", "dyrektor", "rodzic"],
    correct: "nauczyciel",
  },
  { 
    word: "cat", 
    options: ["kot", "pies", "mysz", "ptak"], 
    correct: "kot" 
  },
  {
    word: "sun",
    options: ["słońce", "księżyc", "gwiazda", "chmura"],
    correct: "słońce",
  },
  {
    word: "computer",
    options: ["komputer", "telefon", "telewizor", "radio"],
    correct: "komputer",
  },
  {
    word: "car",
    options: ["samochód", "rower", "autobus", "pociąg"],
    correct: "samochód",
  },
  {
    word: "tree",
    options: ["drzewo", "kwiat", "trawa", "krzew"],
    correct: "drzewo",
  },
];

// Course materials metadata
export const mockCourseMaterials = {
  activeUsers: 1500,
  totalCourses: 12,
  availableLessons: 8,
};

// Achievement mock data
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const mockAchievements: Achievement[] = [
  {
    id: "week-warrior",
    name: "Week Warrior",
    description: "7-day streak completed",
    icon: "flame",
    color: "#ff6b35",
  },
  {
    id: "vocab-master",
    name: "Vocabulary Master",
    description: "200+ words learned",
    icon: "school",
    color: "#c0f000",
  },
  {
    id: "fast-learner",
    name: "Fast Learner",
    description: "30 lessons in a month",
    icon: "ribbon",
    color: "#22c55e",
  },
];

// Course materials mock data
export const mockMaterials: CourseMaterial[] = [
  {
    id: "vid-1",
    title: "Phrasal Verbs in Context",
    description: "15 everyday phrasal verbs with examples",
    minutes: 18,
    level: "B1",
    format: "Video",
    isNew: true,
  },
  {
    id: "pdf-1",
    title: "Business Email Templates",
    description: "Ready-to-use templates with tips",
    minutes: 12,
    level: "B2",
    format: "PDF",
  },
  {
    id: "aud-1",
    title: "Listening: Travel Stories",
    description: "Comprehension practice with transcript",
    minutes: 22,
    level: "B1",
    format: "Audio",
  },
];

// Live lessons mock data
export const mockLessons: Lesson[] = [
  {
    id: "lsn-1",
    title: "Speaking Club: Travel Stories",
    teacher: "Anna Kowalska",
    startsAt: "2025-12-02T18:00:00Z",
    duration: 60,
    level: "B1",
    location: "Zoom",
  },
  {
    id: "lsn-2",
    title: "Business English: Emails",
    teacher: "John Smith",
    startsAt: "2025-12-03T17:00:00Z",
    duration: 45,
    level: "B2",
    location: "Google Meet",
  },
  {
    id: "lsn-3",
    title: "Grammar Boost: Past Tenses",
    teacher: "Ewa Nowak",
    startsAt: "2025-12-04T19:30:00Z",
    duration: 50,
    level: "A2",
    location: "Zoom",
  },
];