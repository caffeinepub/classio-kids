import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Student } from "../backend.d";
import ContentViewer from "../components/ContentViewer";
import {
  ACHIEVEMENTS,
  getAchievements,
  getBestScore,
  getStars,
  getStreak,
  updateStreak,
} from "../utils/gameState";
import { playTap } from "../utils/sounds";

type ContentCategory =
  | "rhymes"
  | "phonic-sounds"
  | "phonic-stories"
  | "digraph"
  | "cvc"
  | "tracing"
  | "colouring"
  | "word-match"
  | "spelling"
  | "number-tracing"
  | "picture-quiz";

interface Props {
  student: Student;
  onLogout: () => void;
}

const CATEGORIES: {
  id: ContentCategory;
  label: string;
  emoji: string;
  colorClass: string;
  desc: string;
}[] = [
  {
    id: "rhymes",
    label: "Rhymes & Songs",
    emoji: "🎵",
    colorClass: "bg-rhymes-blue",
    desc: "Sing along with popular rhymes!",
  },
  {
    id: "phonic-sounds",
    label: "Phonic Sounds",
    emoji: "🔤",
    colorClass: "bg-phonic-green",
    desc: "Learn A-Z alphabet sounds!",
  },
  {
    id: "phonic-stories",
    label: "Phonic Stories",
    emoji: "📖",
    colorClass: "bg-stories-purple",
    desc: "Read fun phonic stories!",
  },
  {
    id: "digraph",
    label: "Digraphs",
    emoji: "✏️",
    colorClass: "bg-cvc-pink",
    desc: "Explore letter combinations!",
  },
  {
    id: "cvc",
    label: "CVC Words",
    emoji: "🧩",
    colorClass: "bg-lkg-orange",
    desc: "Build words with vowels!",
  },
  {
    id: "tracing",
    label: "Letter Tracing",
    emoji: "✍️",
    colorClass: "bg-amber-400",
    desc: "Trace letters and numbers!",
  },
  {
    id: "colouring",
    label: "Colouring Book",
    emoji: "🎨",
    colorClass: "bg-rose-400",
    desc: "Colour fun pictures!",
  },
  {
    id: "word-match",
    label: "Word Match",
    emoji: "🃏",
    colorClass: "bg-teal-500",
    desc: "Match words to pictures!",
  },
  {
    id: "spelling",
    label: "Spelling Puzzle",
    emoji: "🔡",
    colorClass: "bg-violet-500",
    desc: "Spell the word!",
  },
  {
    id: "number-tracing",
    label: "Number Tracing",
    emoji: "🔢",
    colorClass: "bg-green-500",
    desc: "Trace numbers 0-9!",
  },
  {
    id: "picture-quiz",
    label: "Picture Quiz",
    emoji: "🖼️",
    colorClass: "bg-orange-500",
    desc: "Can you guess the picture?",
  },
];

const ENCOURAGEMENTS = [
  "You're a superstar! Keep learning! 🌟",
  "Every lesson makes you smarter! 🧠",
  "Today is a great day to learn! ☀️",
  "You're doing amazing! 🌟",
  "Keep it up, champion! 🏆",
];

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning, ☀️";
  if (hour >= 12 && hour < 17) return "Good afternoon, 🌤️";
  return "Good evening, 🌙";
}

function getDailyEncouragement(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      86400000,
  );
  return ENCOURAGEMENTS[dayOfYear % ENCOURAGEMENTS.length];
}

export default function StudentDashboard({ student, onLogout }: Props) {
  const [activeCategory, setActiveCategory] = useState<ContentCategory | null>(
    null,
  );
  const [stars, setStars] = useState(0);
  const [streak, setStreak] = useState({ count: 0, lastDate: "" });
  const [achievements, setAchievements] = useState<string[]>([]);
  const [badgesOpen, setBadgesOpen] = useState(false);

  useEffect(() => {
    updateStreak();
    setStars(getStars());
    setStreak(getStreak());
    setAchievements(getAchievements());
  }, []);

  // Refresh stars/achievements when returning from an activity
  useEffect(() => {
    if (!activeCategory) {
      setStars(getStars());
      setStreak(getStreak());
      setAchievements(getAchievements());
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen font-nunito bg-background">
      <header className="bg-black shadow-xs sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {activeCategory ? (
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="flex items-center gap-1 text-gray-400 hover:text-white font-semibold text-sm mr-2"
                data-ocid="dashboard.back.button"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : null}
            <img
              src="/assets/uploads/classio_logo_reel_compressed-019d34e7-3f43-735c-a01a-d5ae52a4ffd6-1.jpeg"
              alt="Classio Kids"
              className="h-12 w-auto object-contain rounded"
            />
          </div>
          <div className="flex items-center gap-3">
            {/* Stars badge */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                repeatDelay: 2,
              }}
              className="flex items-center gap-1 bg-yellow-400/20 border border-yellow-400/40 rounded-full px-3 py-1"
            >
              <span className="text-yellow-300 text-sm font-black">
                ⭐ {stars}
              </span>
            </motion.div>
            {/* Streak badge */}
            {streak.count >= 1 && (
              <div className="flex items-center gap-1 bg-orange-500/20 border border-orange-400/40 rounded-full px-3 py-1">
                <span className="text-orange-300 text-sm font-black">
                  🔥 {streak.count}d
                </span>
              </div>
            )}
            <div className="hidden sm:flex flex-col items-end">
              <span className="font-extrabold text-white text-sm">
                {student.name}
              </span>
              <span className="text-xs text-gray-400">
                {student.grade} • Roll: {student.rollNumber}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={onLogout}
              className="rounded-full text-xs font-bold bg-white/10 border-white/30 text-white hover:bg-white/20"
              data-ocid="dashboard.logout.button"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeCategory ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <ContentViewer
                category={activeCategory}
                grade={student.grade}
                onBack={() => setActiveCategory(null)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Welcome Banner */}
              <div className="bg-hero-blue rounded-3xl p-6 md:p-10 text-white mb-8 shadow-hero relative overflow-hidden">
                <div className="absolute top-0 right-0 text-[120px] opacity-10 pointer-events-none leading-none">
                  🌟
                </div>
                <p className="text-blue-200 text-sm font-bold mb-1">
                  {getTimeGreeting()}
                </p>
                <h2 className="text-2xl md:text-4xl font-black mb-1">
                  Hello, {student.name}! 👋
                </h2>
                <p className="text-blue-100 text-lg font-semibold mb-3">
                  Grade: {student.grade} • Roll No: {student.rollNumber}
                </p>
                <p className="text-blue-200 text-sm italic">
                  {getDailyEncouragement()}
                </p>
              </div>

              {/* Categories Grid */}
              <h3 className="text-2xl font-black text-footer-navy mb-5">
                🎯 Choose What to Learn
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {CATEGORIES.map((cat, i) => {
                  const bestKey =
                    cat.id === "word-match"
                      ? `word-match-${student.grade}`
                      : cat.id === "spelling"
                        ? `spelling-${student.grade}`
                        : cat.id === "picture-quiz"
                          ? `picture-quiz-${student.grade}`
                          : null;
                  const best = bestKey ? getBestScore(bestKey) : 0;
                  return (
                    <motion.button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        playTap();
                        setActiveCategory(cat.id);
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className={`${cat.colorClass} rounded-3xl p-6 flex flex-col items-center text-white cursor-pointer shadow-card hover:shadow-hero transition-all relative`}
                      data-ocid={`dashboard.category.item.${i + 1}`}
                    >
                      <div className="text-5xl mb-3">{cat.emoji}</div>
                      <h3 className="text-lg font-extrabold text-center mb-1">
                        {cat.label}
                      </h3>
                      <p className="text-xs text-white/80 text-center">
                        {cat.desc}
                      </p>
                      {best > 0 && (
                        <div className="mt-2 bg-white/20 rounded-full px-3 py-0.5 text-xs font-black">
                          Best: {best} ⭐
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* My Badges */}
              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => setBadgesOpen((o) => !o)}
                  className="flex items-center gap-2 text-xl font-black text-footer-navy mb-4"
                  data-ocid="dashboard.toggle"
                >
                  🏅 My Badges
                  <span className="text-sm text-gray-400 font-semibold">
                    ({achievements.length}/{ACHIEVEMENTS.length})
                  </span>
                  <span className="text-gray-400 text-sm">
                    {badgesOpen ? "▲" : "▼"}
                  </span>
                </button>
                <AnimatePresence>
                  {badgesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      {achievements.length === 0 ? (
                        <div
                          className="text-center py-8 text-gray-400 font-semibold bg-gray-50 rounded-2xl"
                          data-ocid="dashboard.empty_state"
                        >
                          Complete activities to earn badges! 🎯
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-3">
                          {ACHIEVEMENTS.filter((a) =>
                            achievements.includes(a.id),
                          ).map((a) => (
                            <motion.div
                              key={a.id}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-2xl px-4 py-2"
                              data-ocid="dashboard.card"
                            >
                              <span className="text-2xl">{a.emoji}</span>
                              <div>
                                <div className="font-black text-sm text-gray-800">
                                  {a.label}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {a.desc}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="text-center py-6 text-gray-400 text-sm">
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-gray-600"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
