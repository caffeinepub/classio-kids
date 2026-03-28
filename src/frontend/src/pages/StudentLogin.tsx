import { Input } from "@/components/ui/input";
import { Download, Loader2, Sparkles, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Student } from "../backend.d";
import { useActor } from "../hooks/useActor";
import type { Page } from "./LandingPage";

// Extend Window interface for PWA install prompt
declare global {
  interface Window {
    __pwaInstallPrompt: BeforeInstallPromptEvent | null;
  }
  interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  }
}

interface Props {
  initialGrade?: string;
  onLogin: (student: Student) => void;
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

const LOGO_SRC =
  "/assets/generated/classio-kids-logo-transparent.dim_400x120.png";

const FLOATERS = [
  { emoji: "🌟", top: "6%", left: "4%", size: 44, delay: 0, dur: 3.2 },
  { emoji: "🎈", top: "12%", left: "88%", size: 52, delay: 0.4, dur: 2.8 },
  { emoji: "🦋", top: "30%", left: "2%", size: 38, delay: 0.8, dur: 3.6 },
  { emoji: "🌈", top: "52%", left: "91%", size: 44, delay: 0.2, dur: 2.5 },
  { emoji: "⭐", top: "68%", left: "6%", size: 36, delay: 1.2, dur: 3.0 },
  { emoji: "🎉", top: "78%", left: "87%", size: 44, delay: 0.6, dur: 3.4 },
  { emoji: "🎀", top: "88%", left: "14%", size: 36, delay: 1.0, dur: 2.7 },
  { emoji: "🐣", top: "4%", left: "76%", size: 36, delay: 1.4, dur: 3.1 },
  { emoji: "🚀", top: "40%", left: "93%", size: 32, delay: 0.3, dur: 2.9 },
  { emoji: "🎊", top: "22%", left: "89%", size: 36, delay: 1.6, dur: 3.3 },
  { emoji: "🌸", top: "95%", left: "55%", size: 40, delay: 0.7, dur: 3.0 },
  { emoji: "🦄", top: "58%", left: "1%", size: 40, delay: 1.8, dur: 2.6 },
];

function isIOS() {
  return (
    /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function isInStandaloneMode() {
  return (
    ("standalone" in navigator &&
      (navigator as { standalone?: boolean }).standalone === true) ||
    window.matchMedia("(display-mode: standalone)").matches
  );
}

export default function StudentLogin({ onLogin, onNavigate }: Props) {
  const { actor } = useActor();
  const [rollNumber, setRollNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [canInstall, setCanInstall] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [showIosBanner, setShowIosBanner] = useState(false);

  useEffect(() => {
    if (window.__pwaInstallPrompt) setCanInstall(true);

    function onReady() {
      setCanInstall(true);
    }
    window.addEventListener("pwaInstallReady", onReady);

    function onInstalled() {
      setCanInstall(false);
    }
    window.addEventListener("appinstalled", onInstalled);
    window.addEventListener("pwaInstalled", onInstalled);

    if (isIOS() && !isInStandaloneMode()) {
      setShowIosBanner(true);
    }

    return () => {
      window.removeEventListener("pwaInstallReady", onReady);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener("pwaInstalled", onInstalled);
    };
  }, []);

  async function handleInstall() {
    const prompt = window.__pwaInstallPrompt;
    if (!prompt) return;
    setInstalling(true);
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") {
      window.__pwaInstallPrompt = null;
      setCanInstall(false);
    }
    setInstalling(false);
  }

  async function handleLogin() {
    if (!rollNumber.trim()) {
      setError("Please enter your Roll Number! 😊");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Wait for actor to be ready (up to 3s)
      let resolvedActor = actor;
      if (!resolvedActor) {
        for (let i = 0; i < 10; i++) {
          await new Promise((r) => setTimeout(r, 300));
          if (actor) {
            resolvedActor = actor;
            break;
          }
        }
      }
      if (!resolvedActor) {
        setError(
          "Connection not ready. Please check your internet and try again!",
        );
        return;
      }
      const student = await resolvedActor.studentLogin(rollNumber.trim(), "");
      onLogin(student);
    } catch {
      setError("Oops! Roll Number not found. Ask your teacher for help! 🙏");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-18px) rotate(6deg); }
          66%       { transform: translateY(-10px) rotate(-4deg); }
        }
        @keyframes shimmerCyan {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes cyanPulse {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .floater {
          position: fixed;
          pointer-events: none;
          user-select: none;
          animation: floatUp var(--dur) ease-in-out infinite;
          animation-delay: var(--delay);
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.15));
        }
        .login-card {
          background: #ffffff;
          border-radius: 2rem;
          position: relative;
          padding: 2.5rem 2rem 2rem;
        }
        .login-card::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 2.25rem;
          background: linear-gradient(135deg, #19D4FF, #00B0E3, #0096C4, #19D4FF);
          background-size: 300% 300%;
          animation: cyanPulse 4s ease infinite;
          z-index: -1;
        }
        .login-card::after {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 2.5rem;
          background: linear-gradient(135deg, #19D4FF, #00B0E3, #0096C4);
          background-size: 300% 300%;
          animation: cyanPulse 4s ease infinite;
          opacity: 0.25;
          z-index: -2;
          filter: blur(10px);
        }
        .shimmer-btn {
          background: linear-gradient(
            90deg,
            #0096C4 0%, #19D4FF 25%, #00B0E3 50%, #19D4FF 75%, #0096C4 100%
          );
          background-size: 200% auto;
          animation: shimmerCyan 2.5s linear infinite;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .shimmer-btn:hover { transform: scale(1.04); }
        .shimmer-btn:active { transform: scale(0.97); }
        .roll-input {
          border: 3px solid transparent !important;
          background-image: linear-gradient(#ffffff, #ffffff),
            linear-gradient(135deg, #19D4FF, #00B0E3, #0096C4);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          animation: none;
          border-radius: 9999px !important;
          font-size: 1.15rem;
          font-weight: 700;
          text-align: center;
          height: 3.25rem;
          color: #0d1520;
          transition: box-shadow 0.2s ease;
        }
        .roll-input::placeholder {
          color: #aacdd8;
        }
        .roll-input:focus {
          box-shadow: 0 0 0 3px rgba(25,212,255,0.35), 0 4px 16px rgba(0,176,227,0.3);
          outline: none !important;
        }
        .confetti-strip {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 6px;
          border-radius: 2rem 2rem 0 0;
          background: linear-gradient(90deg, #0096C4, #00B0E3, #19D4FF, #00B0E3, #0096C4);
          background-size: 300% 100%;
          animation: cyanPulse 3s ease infinite;
        }
        .star-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: linear-gradient(135deg, #19D4FF, #00B0E3);
          border-radius: 9999px;
          padding: 4px 14px;
          font-size: 0.8rem;
          font-weight: 800;
          color: #001a2e;
          box-shadow: 0 2px 8px rgba(25,212,255,0.45);
          margin-bottom: 0.5rem;
        }
        .ghost-btn {
          background: rgba(0,150,200,0.1);
          border: 2px solid rgba(0,150,200,0.4);
          color: #0077aa;
          border-radius: 9999px;
          padding: 8px 24px;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          backdrop-filter: blur(6px);
          letter-spacing: 0.03em;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .ghost-btn:hover {
          background: rgba(0,150,200,0.2);
          transform: scale(1.03);
        }
        .install-btn {
          background: linear-gradient(135deg, #00c9a7, #0096c7);
          border: none;
          color: white;
          border-radius: 9999px;
          padding: 10px 28px;
          font-size: 0.9rem;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.15s, opacity 0.15s;
          box-shadow: 0 4px 16px rgba(0,150,199,0.5);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          letter-spacing: 0.02em;
        }
        .install-btn:hover { transform: scale(1.04); opacity: 0.92; }
        .install-btn:active { transform: scale(0.97); }
        .install-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .ios-banner {
          background: rgba(25,212,255,0.08);
          backdrop-filter: blur(12px);
          border: 2px solid rgba(25,212,255,0.4);
          border-radius: 18px;
          padding: 14px 16px 14px 14px;
          color: #0077aa;
          font-size: 0.82rem;
          font-weight: 700;
          line-height: 1.5;
          position: relative;
          max-width: 340px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,150,200,0.15);
        }
        .ios-banner-close {
          position: absolute;
          top: 8px;
          right: 10px;
          background: rgba(25,212,255,0.2);
          border: none;
          border-radius: 9999px;
          width: 22px;
          height: 22px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0077aa;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Nunito', 'Figtree', sans-serif",
          background:
            "linear-gradient(135deg, #e0f7ff 0%, #f0fffe 20%, #fff0fb 40%, #fffbe0 60%, #f0fff4 80%, #e8f4ff 100%)",
        }}
      >
        {FLOATERS.map((f) => (
          <span
            key={f.emoji + f.top}
            className="floater"
            style={
              {
                top: f.top,
                left: f.left,
                fontSize: f.size,
                "--dur": `${f.dur}s`,
                "--delay": `${f.delay}s`,
              } as React.CSSProperties
            }
          >
            {f.emoji}
          </span>
        ))}

        <main
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 16px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 380,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 140,
                damping: 16,
              }}
              style={{ width: "100%", position: "relative", zIndex: 1 }}
            >
              <div className="login-card" data-ocid="student_login.modal">
                <div className="confetti-strip" />

                {/* Logo */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 16,
                    marginTop: 8,
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <img
                      src={LOGO_SRC}
                      alt="Classio Kids"
                      style={{
                        height: 100,
                        width: "auto",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </motion.div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 8,
                  }}
                >
                  <div className="star-badge">✨ Learn and Lead ✨</div>
                </div>

                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <motion.div
                    animate={{ rotate: [0, -8, 8, -8, 0], scale: [1, 1.15, 1] }}
                    transition={{
                      duration: 1,
                      delay: 0.8,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 4,
                    }}
                    style={{
                      fontSize: 52,
                      display: "inline-block",
                      marginBottom: 8,
                    }}
                  >
                    🎒
                  </motion.div>
                  <h1
                    style={{
                      margin: 0,
                      fontSize: "1.75rem",
                      fontWeight: 900,
                      background:
                        "linear-gradient(135deg, #0096C4, #00B0E3, #0077aa)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      lineHeight: 1.2,
                    }}
                  >
                    Welcome, Superstar! ⭐
                  </h1>
                  <p
                    style={{
                      color: "#0077aa",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      marginTop: 6,
                    }}
                  >
                    Enter your Roll Number to start learning 🚀
                  </p>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label
                    htmlFor="roll"
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 800,
                      marginBottom: 8,
                      color: "#0096C4",
                    }}
                  >
                    📋 Your Roll Number
                  </label>
                  <Input
                    id="roll"
                    placeholder="Enter your Roll Number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    className="roll-input"
                    data-ocid="student_login.input"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      background: "#e8f9ff",
                      border: "2px solid #19D4FF",
                      borderRadius: 16,
                      padding: "10px 14px",
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      textAlign: "center",
                      color: "#0077aa",
                      marginBottom: 14,
                    }}
                    data-ocid="student_login.error_state"
                  >
                    {error}
                  </motion.div>
                )}

                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={loading}
                  className={loading ? "" : "shimmer-btn"}
                  data-ocid="student_login.submit_button"
                  style={{
                    width: "100%",
                    height: "3.25rem",
                    borderRadius: "9999px",
                    border: "none",
                    color: "white",
                    fontWeight: 900,
                    fontSize: "1.05rem",
                    letterSpacing: "0.02em",
                    cursor: loading ? "not-allowed" : "pointer",
                    background: loading
                      ? "linear-gradient(90deg, #b0d8e8, #90c8dc)"
                      : undefined,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    boxShadow: loading
                      ? "none"
                      : "0 6px 20px rgba(25,212,255,0.4)",
                    textShadow: "0 1px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={20}
                        style={{ animation: "spin 1s linear infinite" }}
                      />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />🚀 Let&apos;s Go!
                    </>
                  )}
                </button>

                <p
                  style={{
                    textAlign: "center",
                    color: "#5a8a9a",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    marginTop: 14,
                  }}
                >
                  Ask your teacher if you don&apos;t know your Roll Number
                </p>
              </div>
            </motion.div>

            {/* Install App button */}
            {canInstall && (
              <motion.button
                type="button"
                onClick={handleInstall}
                disabled={installing}
                className="install-btn"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                data-ocid="student_login.install_button"
              >
                <Download size={18} />
                {installing ? "Installing..." : "📲 Install App"}
              </motion.button>
            )}

            {/* iOS Safari install instructions banner */}
            {showIosBanner && (
              <motion.div
                className="ios-banner"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  type="button"
                  className="ios-banner-close"
                  onClick={() => setShowIosBanner(false)}
                  aria-label="Dismiss"
                >
                  <X size={12} />
                </button>
                <div style={{ fontSize: "1.1rem", marginBottom: 6 }}>
                  📱 Install on iPhone/iPad
                </div>
                Tap the <strong>Share</strong> button (⬆️) at the bottom of
                Safari, then tap{" "}
                <strong>&ldquo;Add to Home Screen&rdquo;</strong> 🏠
              </motion.div>
            )}

            {/* Admin Login button */}
            <motion.button
              type="button"
              onClick={() => onNavigate("admin-login")}
              className="ghost-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              data-ocid="student_login.admin_login_button"
            >
              🔐 Admin Login
            </motion.button>
          </div>
        </main>
      </div>
    </>
  );
}
