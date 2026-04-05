import { Button } from "@/components/ui/button";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { Download, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

type Page =
  | "landing"
  | "student-login"
  | "student-dashboard"
  | "admin-login"
  | "admin-dashboard";

interface Props {
  onNavigate: (page: Page, grade?: string) => void;
}

const LOGO_SRC =
  "/assets/uploads/classio_logo_reel_compressed-019d34e7-3f43-735c-a01a-d5ae52a4ffd6-1.jpeg";

export default function LandingPage({ onNavigate }: Props) {
  const { canInstall, promptInstall } = usePWAInstall();

  return (
    <div className="min-h-screen font-nunito bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="bg-black shadow-xs sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_SRC}
              alt="Classio Kids"
              className="h-12 w-auto object-contain rounded"
            />
            <span className="text-xs italic font-semibold text-blue-300 hidden sm:block">
              Learn and Lead
            </span>
          </div>
          <div className="flex items-center gap-3">
            {canInstall && (
              <Button
                onClick={promptInstall}
                variant="outline"
                className="rounded-full border-green-400 text-green-300 hover:bg-green-900/30 font-bold text-sm"
                data-ocid="nav.install_app.button"
              >
                <Download className="w-4 h-4 mr-1" /> Install App
              </Button>
            )}
            <Button
              onClick={() => onNavigate("student-login")}
              className="rounded-full bg-primary text-white font-bold text-sm"
              data-ocid="nav.student_login.button"
            >
              <GraduationCap className="w-4 h-4 mr-1" /> Student Login
            </Button>
            <button
              type="button"
              onClick={() => onNavigate("admin-login")}
              className="text-xs font-bold text-gray-400 hover:text-white underline"
              data-ocid="nav.admin_login.link"
            >
              Admin
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="min-h-[85vh] flex items-center justify-center px-4 py-12">
          <div className="max-w-3xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="text-7xl mb-4">🌟</div>
              <div className="flex flex-wrap justify-center gap-2 text-4xl mb-3">
                <span>📚</span>
                <span>🎵</span>
                <span>✏️</span>
                <span>🎨</span>
                <span>🧩</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-footer-navy leading-tight mb-4"
            >
              Welcome to <span className="text-hero-blue">Classio Kids!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-blue-500 italic mb-2"
            >
              ✨ Learn and Lead ✨
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 text-lg md:text-xl mb-10 max-w-xl mx-auto"
            >
              Fun rhymes, phonics, stories, tracing, colouring, and games — made
              just for you!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center gap-4"
            >
              <Button
                onClick={() => onNavigate("student-login")}
                className="rounded-full bg-hero-blue text-white font-black text-2xl md:text-3xl px-14 py-8 hover:opacity-90 shadow-hero transition-all hover:scale-105"
                data-ocid="hero.student_login.button"
              >
                🚀 Student Login
              </Button>

              {canInstall && (
                <motion.button
                  type="button"
                  onClick={promptInstall}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-all hover:scale-105"
                  data-ocid="hero.install_app.button"
                >
                  <Download className="w-5 h-5" />📲 Install App
                </motion.button>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-400 text-sm mt-6"
            >
              Login with your Roll Number given by your teacher
            </motion.p>

            {/* Floating decorative bubbles */}
            <div className="mt-16 flex justify-center gap-4 flex-wrap">
              {[
                "🎵 Rhymes",
                "🔤 Phonics",
                "📖 Stories",
                "✏️ Tracing",
                "🎨 Colouring",
                "🃏 Word Match",
                "🔡 Spelling",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-white rounded-full px-4 py-2 text-sm font-bold text-gray-600 shadow-card border border-gray-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-footer-navy text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-black rounded-lg px-2 py-1">
                  <img
                    src={LOGO_SRC}
                    alt="Classio Kids"
                    className="h-8 w-auto object-contain rounded"
                  />
                </div>
              </div>
              <p className="text-blue-300 italic text-xs font-semibold mb-2">
                Learn and Lead
              </p>
              <p className="text-blue-200 text-sm max-w-xs">
                Empowering young minds with interactive, grade-wise digital
                learning content.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-blue-200 text-sm uppercase tracking-wider mb-1">
                Admin
              </p>
              <button
                type="button"
                onClick={() => onNavigate("admin-login")}
                className="text-white/70 hover:text-white text-sm text-left"
                data-ocid="footer.admin_login.link"
              >
                Admin Login
              </button>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-6 text-center">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                className="text-blue-300 hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export type { Page };
