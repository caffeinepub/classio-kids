import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Confetti from "./Confetti";

interface RewardScreenProps {
  score: number;
  total: number;
  starsEarned: number;
  activityName: string;
  onPlayAgain: () => void;
  onBack: () => void;
}

function getMessage(pct: number): string {
  if (pct >= 100) return "Perfect! You're a genius! 🌟";
  if (pct >= 80) return "Amazing job! 🎉";
  if (pct >= 60) return "Great effort! 👏";
  return "Keep practising! 💪";
}

export default function RewardScreen({
  score,
  total,
  starsEarned,
  activityName,
  onPlayAgain,
  onBack,
}: RewardScreenProps) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 100;
  const [visibleStars, setVisibleStars] = useState(0);
  const [confettiDone, setConfettiDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleStars(i);
      if (i >= starsEarned) clearInterval(interval);
    }, 250);
    return () => clearInterval(interval);
  }, [starsEarned]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center"
      data-ocid="reward.modal"
    >
      <Confetti active={!confettiDone} onDone={() => setConfettiDone(true)} />

      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 opacity-95" />

      <motion.div
        initial={{ scale: 0.6, y: 60 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="relative z-10 flex flex-col items-center gap-5 bg-white/15 backdrop-blur-md rounded-3xl p-8 max-w-sm w-full mx-4 text-white text-center shadow-2xl border border-white/30"
      >
        {/* Trophy */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="text-7xl"
        >
          🏆
        </motion.div>

        <h2 className="text-2xl font-black">Activity Complete!</h2>
        <p className="text-white/80 font-semibold">{activityName}</p>

        {/* Score */}
        <div className="bg-white/20 rounded-2xl px-8 py-4 w-full">
          <div className="text-5xl font-black">
            {score} / {total}
          </div>
          <div className="text-white/80 font-bold mt-1">{pct}% correct</div>
        </div>

        {/* Message */}
        <p className="text-lg font-extrabold">{getMessage(pct)}</p>

        {/* Stars earned */}
        {starsEarned > 0 && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-white/70 text-sm font-bold">Stars earned:</p>
            <div className="flex gap-1 flex-wrap justify-center">
              {Array.from({ length: starsEarned }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: position is stable
                <AnimatePresence key={i}>
                  {i < visibleStars && (
                    <motion.span
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="text-2xl"
                    >
                      ⭐
                    </motion.span>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <button
            type="button"
            onClick={onPlayAgain}
            className="flex-1 rounded-2xl bg-white text-purple-700 font-extrabold py-3 hover:bg-purple-50 transition-all shadow-card"
            data-ocid="reward.play_again.button"
          >
            🔄 Play Again
          </button>
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-2xl bg-white/20 border border-white/40 font-extrabold py-3 hover:bg-white/30 transition-all"
            data-ocid="reward.back.button"
          >
            🏠 Dashboard
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
