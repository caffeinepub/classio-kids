import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Student } from "../backend.d";
import ContentViewer from "../components/ContentViewer";

type ContentCategory =
  | "rhymes"
  | "phonic-sounds"
  | "phonic-stories"
  | "digraph"
  | "cvc"
  | "tracing"
  | "colouring"
  | "word-match"
  | "spelling";

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
];

export default function StudentDashboard({ student, onLogout }: Props) {
  const [activeCategory, setActiveCategory] = useState<ContentCategory | null>(
    null,
  );

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
                <h2 className="text-2xl md:text-4xl font-black mb-1">
                  Hello, {student.name}! 👋
                </h2>
                <p className="text-blue-100 text-lg font-semibold mb-4">
                  Grade: {student.grade} • Roll No: {student.rollNumber}
                </p>
                <p className="text-blue-100 text-base">
                  🌟 Ready to learn something amazing today? Pick a topic below!
                </p>
              </div>

              {/* Categories Grid */}
              <h3 className="text-2xl font-black text-footer-navy mb-5">
                🎯 Choose What to Learn
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {CATEGORIES.map((cat, i) => (
                  <motion.button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={`${cat.colorClass} rounded-3xl p-6 flex flex-col items-center text-white cursor-pointer shadow-card hover:shadow-hero transition-all`}
                    data-ocid={`dashboard.category.item.${i + 1}`}
                  >
                    <div className="text-5xl mb-3">{cat.emoji}</div>
                    <h3 className="text-lg font-extrabold text-center mb-1">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-white/80 text-center">
                      {cat.desc}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
