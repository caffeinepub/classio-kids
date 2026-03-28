import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { Student } from "../backend.d";
import { useActor } from "../hooks/useActor";
import type { Page } from "./LandingPage";

interface Props {
  initialGrade?: string;
  onLogin: (student: Student) => void;
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

const LOGO_SRC =
  "/assets/uploads/classio_logo_reel_compressed-019d34e7-3f43-735c-a01a-d5ae52a4ffd6-1.jpeg";

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

export default function StudentLogin({ onLogin, onBack }: Props) {
  const { actor } = useActor();
  const [rollNumber, setRollNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!rollNumber.trim()) {
      setError("Please enter your Roll Number! 😊");
      return;
    }
    if (!actor) {
      setError("Connection not ready. Please try again!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const student = await actor.studentLogin(rollNumber.trim(), "");
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
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-18px) rotate(6deg); }
          66%       { transform: translateY(-10px) rotate(-4deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-12px) scale(1.12); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 4px #ffd93d, 0 0 0 8px #ff6b9d, 0 0 24px rgba(196,77,255,0.5); }
          50%       { box-shadow: 0 0 0 6px #ffd93d, 0 0 0 12px #ff6b9d, 0 0 40px rgba(196,77,255,0.8); }
        }
        @keyframes rainbowBorder {
          0%   { border-color: #ff6b9d; }
          20%  { border-color: #c44dff; }
          40%  { border-color: #4d79ff; }
          60%  { border-color: #00c9a7; }
          80%  { border-color: #ffd93d; }
          100% { border-color: #ff6b9d; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .login-bg {
          background: linear-gradient(
            135deg,
            #9b59b6, #e91e8c, #2196f3, #00bcd4, #4caf50, #ffc107, #ff5722, #9b59b6
          );
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }
        .floater {
          position: fixed;
          pointer-events: none;
          user-select: none;
          animation: floatUp var(--dur) ease-in-out infinite;
          animation-delay: var(--delay);
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.2));
        }
        .logo-glow {
          border-radius: 20px;
          overflow: hidden;
          animation: pulseGlow 2.5s ease-in-out infinite;
        }
        .login-card {
          background: linear-gradient(145deg, #fff9ff, #fff0fb, #f0f4ff);
          border-radius: 2rem;
          position: relative;
          padding: 2.5rem 2rem 2rem;
        }
        .login-card::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 2.25rem;
          background: linear-gradient(135deg, #ff6b9d, #c44dff, #4d79ff, #00c9a7, #ffd93d, #ff6b9d);
          background-size: 300% 300%;
          animation: gradientShift 4s ease infinite;
          z-index: -1;
        }
        .login-card::after {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 2.5rem;
          background: linear-gradient(135deg, #ff6b9d, #c44dff, #4d79ff, #00c9a7, #ffd93d);
          background-size: 300% 300%;
          animation: gradientShift 4s ease infinite;
          opacity: 0.35;
          z-index: -2;
          filter: blur(8px);
        }
        .shimmer-btn {
          background: linear-gradient(
            90deg,
            #ff6b9d 0%, #c44dff 25%, #4d79ff 50%, #c44dff 75%, #ff6b9d 100%
          );
          background-size: 200% auto;
          animation: shimmer 2.5s linear infinite;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .shimmer-btn:hover { transform: scale(1.04); }
        .shimmer-btn:active { transform: scale(0.97); }
        .roll-input {
          border: 3px solid transparent !important;
          background-image: linear-gradient(white, white),
            linear-gradient(135deg, #ff6b9d, #c44dff, #4d79ff, #ffd93d);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          animation: none;
          border-radius: 9999px !important;
          font-size: 1.15rem;
          font-weight: 700;
          text-align: center;
          height: 3.25rem;
          transition: box-shadow 0.2s ease;
        }
        .roll-input:focus {
          box-shadow: 0 0 0 3px rgba(196,77,255,0.3), 0 4px 16px rgba(255,107,157,0.3);
          outline: none !important;
        }
        .confetti-strip {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 6px;
          border-radius: 2rem 2rem 0 0;
          background: linear-gradient(90deg, #ff6b9d, #c44dff, #4d79ff, #00c9a7, #ffd93d);
          background-size: 300% 100%;
          animation: gradientShift 3s ease infinite;
        }
        .star-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: linear-gradient(135deg, #ffd93d, #ff9a3c);
          border-radius: 9999px;
          padding: 4px 14px;
          font-size: 0.8rem;
          font-weight: 800;
          color: #7a3500;
          box-shadow: 0 2px 8px rgba(255,154,60,0.5);
          margin-bottom: 0.5rem;
        }
      `}</style>

      <div
        className="login-bg"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Nunito', 'Figtree', sans-serif",
        }}
      >
        {/* Floating emoji decorations */}
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

        {/* Back button */}
        <div
          style={{ padding: "20px 20px 0", position: "relative", zIndex: 10 }}
        >
          <button
            type="button"
            onClick={onBack}
            data-ocid="student_login.back.button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)",
              border: "2px solid rgba(255,255,255,0.5)",
              borderRadius: "9999px",
              padding: "8px 18px",
              color: "white",
              fontWeight: 800,
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "background 0.2s",
              textShadow: "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* Centred card */}
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
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 140,
              damping: 16,
            }}
            style={{
              width: "100%",
              maxWidth: 380,
              position: "relative",
              zIndex: 1,
            }}
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
                  <div className="logo-glow">
                    <img
                      src={LOGO_SRC}
                      alt="Classio Kids"
                      style={{
                        height: 120,
                        width: "auto",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Star badge */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <div className="star-badge">✨ Learn and Lead ✨</div>
              </div>

              {/* Heading */}
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
                      "linear-gradient(135deg, #9b27af, #e91e8c, #2196f3)",
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
                    color: "#888",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    marginTop: 6,
                  }}
                >
                  Enter your Roll Number to start learning 🚀
                </p>
              </div>

              {/* Roll number field */}
              <div style={{ marginBottom: 16 }}>
                <label
                  htmlFor="roll"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    marginBottom: 8,
                    color: "#c44dff",
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

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: "#fff0f5",
                    border: "2px solid #ff6b9d",
                    borderRadius: 16,
                    padding: "10px 14px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    textAlign: "center",
                    color: "#d63384",
                    marginBottom: 14,
                  }}
                  data-ocid="student_login.error_state"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit */}
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
                    ? "linear-gradient(90deg, #aaa, #ccc)"
                    : undefined,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  boxShadow: loading
                    ? "none"
                    : "0 6px 20px rgba(196,77,255,0.45)",
                  textShadow: "0 1px 4px rgba(0,0,0,0.2)",
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
                  color: "#aaa",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  marginTop: 14,
                }}
              >
                Ask your teacher if you don&apos;t know your Roll Number
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
}
