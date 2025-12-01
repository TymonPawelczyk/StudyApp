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