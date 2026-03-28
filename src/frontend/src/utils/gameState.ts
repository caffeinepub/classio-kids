// localStorage-based game state helpers

const KEYS = {
  stars: "classio_stars",
  streak: "classio_streak",
  bestScores: "classio_best_scores",
  achievements: "classio_achievements",
};

// ─── Stars ───────────────────────────────────────────────────────────────────
export function getStars(): number {
  return Number.parseInt(localStorage.getItem(KEYS.stars) ?? "0", 10);
}

export function addStars(n: number): void {
  const current = getStars();
  localStorage.setItem(KEYS.stars, String(current + n));
}

// ─── Streak ──────────────────────────────────────────────────────────────────
interface StreakData {
  count: number;
  lastDate: string;
}

export function getStreak(): StreakData {
  try {
    const raw = localStorage.getItem(KEYS.streak);
    if (!raw) return { count: 0, lastDate: "" };
    return JSON.parse(raw) as StreakData;
  } catch {
    return { count: 0, lastDate: "" };
  }
}

export function updateStreak(): void {
  const today = new Date().toISOString().slice(0, 10);
  const { count, lastDate } = getStreak();

  if (lastDate === today) return; // already updated today

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const newCount = lastDate === yesterday ? count + 1 : 1;
  localStorage.setItem(
    KEYS.streak,
    JSON.stringify({ count: newCount, lastDate: today }),
  );

  // Check streak achievements
  if (newCount >= 3) unlockAchievement("streak_3");
}

// ─── Best Scores ─────────────────────────────────────────────────────────────
function getBestScores(): Record<string, number> {
  try {
    const raw = localStorage.getItem(KEYS.bestScores);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, number>;
  } catch {
    return {};
  }
}

export function getBestScore(key: string): number {
  return getBestScores()[key] ?? 0;
}

export function setBestScore(key: string, score: number): void {
  const scores = getBestScores();
  if (score > (scores[key] ?? 0)) {
    scores[key] = score;
    localStorage.setItem(KEYS.bestScores, JSON.stringify(scores));
  }
}

// ─── Achievements ─────────────────────────────────────────────────────────────
export const ACHIEVEMENTS: {
  id: string;
  label: string;
  emoji: string;
  desc: string;
}[] = [
  {
    id: "first_correct",
    label: "First Win!",
    emoji: "🌟",
    desc: "Got your first correct answer",
  },
  {
    id: "quiz_master",
    label: "Quiz Master",
    emoji: "🏆",
    desc: "Got 10 correct quiz answers",
  },
  {
    id: "spelling_pro",
    label: "Spelling Pro",
    emoji: "🔡",
    desc: "Completed a spelling activity",
  },
  {
    id: "word_master",
    label: "Word Master",
    emoji: "🃏",
    desc: "Completed a word match game",
  },
  {
    id: "streak_3",
    label: "3-Day Streak!",
    emoji: "🔥",
    desc: "Learned 3 days in a row",
  },
  {
    id: "star_collector",
    label: "Star Collector",
    emoji: "⭐",
    desc: "Earned 50 stars",
  },
];

export function getAchievements(): string[] {
  try {
    const raw = localStorage.getItem(KEYS.achievements);
    if (!raw) return [];
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export function unlockAchievement(id: string): boolean {
  const current = getAchievements();
  if (current.includes(id)) return false;
  current.push(id);
  localStorage.setItem(KEYS.achievements, JSON.stringify(current));
  return true;
}

// helper: increment a counter and unlock achievement when threshold hit
const COUNTER_KEYS: Record<string, string> = {
  quiz_correct: "classio_quiz_correct_count",
};

export function incrementQuizCorrect(): void {
  const key = COUNTER_KEYS.quiz_correct;
  const n = Number.parseInt(localStorage.getItem(key) ?? "0", 10) + 1;
  localStorage.setItem(key, String(n));
  unlockAchievement("first_correct");
  if (n >= 10) unlockAchievement("quiz_master");
  // check star achievements
  if (getStars() >= 50) unlockAchievement("star_collector");
}
