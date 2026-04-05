import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, X } from "lucide-react";
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
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [alreadyInstalled, setAlreadyInstalled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    if (isInStandaloneMode()) {
      setAlreadyInstalled(true);
      return;
    }

    if (window.__pwaInstallPrompt) setCanInstall(true);

    function onReady() {
      setCanInstall(true);
    }
    window.addEventListener("pwaInstallReady", onReady);

    function onInstalled() {
      setCanInstall(false);
      setAlreadyInstalled(true);
    }
    window.addEventListener("appinstalled", onInstalled);
    window.addEventListener("pwaInstalled", onInstalled);

    if (isIOS()) {
      setIsIOSDevice(true);
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
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === "accepted") {
      window.__pwaInstallPrompt = null;
      setCanInstall(false);
    }
  }

  async function handleLogin() {
    if (!rollNumber.trim()) {
      setError("Please enter your Roll Number.");
      return;
    }
    setLoading(true);
    setError("");
    try {
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
          "Connection not ready. Please check your internet and try again.",
        );
        return;
      }
      const student = await resolvedActor.studentLogin(rollNumber.trim(), "");
      onLogin(student);
    } catch {
      setError(
        "Roll Number not found. Please ask your teacher for assistance.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        .pro-login-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          font-family: 'Nunito', 'Figtree', 'Inter', sans-serif;
          padding: 24px 16px;
          gap: 16px;
        }
        .pro-card {
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
          border-top: 4px solid #0096C4;
          padding: 36px 32px 28px;
          width: 100%;
          max-width: 400px;
        }
        .pro-logo-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 6px;
        }
        .pro-tagline {
          text-align: center;
          font-size: 0.75rem;
          font-weight: 600;
          color: #9ca3af;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .pro-heading {
          margin: 0 0 6px;
          font-size: 1.4rem;
          font-weight: 700;
          color: #1a2332;
          text-align: center;
          line-height: 1.25;
        }
        .pro-subtext {
          margin: 0 0 24px;
          font-size: 0.875rem;
          color: #6b7280;
          text-align: center;
          font-weight: 400;
        }
        .pro-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
          letter-spacing: 0.01em;
        }
        .pro-input {
          border: 1.5px solid #d1d5db !important;
          border-radius: 8px !important;
          font-size: 0.95rem !important;
          height: 2.75rem !important;
          padding: 0 14px !important;
          color: #1a2332 !important;
          background: #fff !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
          width: 100%;
        }
        .pro-input::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }
        .pro-input:focus {
          border-color: #0096C4 !important;
          box-shadow: 0 0 0 3px rgba(0, 150, 196, 0.12) !important;
          outline: none !important;
        }
        .pro-input.input-error {
          border-color: #ef4444 !important;
        }
        .pro-error {
          border: 1px solid #fecaca;
          background: #fef2f2;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 0.83rem;
          font-weight: 500;
          color: #dc2626;
          margin-top: 10px;
        }
        .pro-submit-btn {
          width: 100%;
          height: 2.75rem;
          margin-top: 20px;
          background: #0096C4;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s ease, box-shadow 0.2s ease;
          letter-spacing: 0.01em;
        }
        .pro-submit-btn:hover:not(:disabled) {
          background: #007da8;
          box-shadow: 0 4px 12px rgba(0, 150, 196, 0.25);
        }
        .pro-submit-btn:active:not(:disabled) {
          background: #006a8f;
        }
        .pro-submit-btn:disabled {
          background: #93c5d8;
          cursor: not-allowed;
        }
        .pro-hint {
          text-align: center;
          font-size: 0.78rem;
          color: #9ca3af;
          margin-top: 14px;
          font-weight: 400;
        }
        .pro-install-box {
          background: linear-gradient(135deg, #e0f7ff 0%, #f0fffe 100%);
          border: 1.5px solid #b3e8f8;
          border-radius: 12px;
          padding: 16px 18px;
          font-size: 0.84rem;
          color: #374151;
          line-height: 1.6;
          width: 100%;
          max-width: 400px;
          position: relative;
        }
        .pro-install-title {
          font-weight: 700;
          color: #0096C4;
          margin-bottom: 6px;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .pro-install-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 12px;
          background: #0096C4;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 9px 20px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(0,150,196,0.2);
          width: 100%;
          justify-content: center;
        }
        .pro-install-btn:hover {
          background: #007da8;
          box-shadow: 0 4px 12px rgba(0,150,196,0.3);
        }
        .pro-close-btn {
          position: absolute;
          top: 8px;
          right: 10px;
          background: none;
          border: none;
          cursor: pointer;
          color: #9ca3af;
          display: flex;
          align-items: center;
          padding: 2px;
          border-radius: 4px;
          transition: color 0.15s;
        }
        .pro-close-btn:hover { color: #6b7280; }
        .pro-admin-link {
          background: none;
          border: none;
          color: #9ca3af;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          transition: color 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .pro-admin-link:hover {
          color: #0096C4;
          text-decoration: underline;
        }
        .pro-steps {
          margin: 8px 0 0;
          padding-left: 18px;
          font-size: 0.82rem;
          color: #4b5563;
        }
        .pro-steps li {
          margin-bottom: 3px;
        }
      `}</style>

      <div className="pro-login-page">
        {/* Login card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="pro-card"
          data-ocid="student_login.modal"
        >
          {/* Logo */}
          <div className="pro-logo-wrap">
            <img
              src={LOGO_SRC}
              alt="Classio Kids"
              style={{
                height: 80,
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          {/* Tagline */}
          <p className="pro-tagline">Learn and Lead</p>

          {/* Heading */}
          <h1 className="pro-heading">Welcome to Classio Kids</h1>
          <p className="pro-subtext">Enter your roll number to continue</p>

          {/* Roll Number Field */}
          <div>
            <label htmlFor="roll" className="pro-label">
              Roll Number
            </label>
            <Input
              id="roll"
              placeholder="Enter your roll number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className={`pro-input${error ? " input-error" : ""}`}
              data-ocid="student_login.input"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="pro-error" data-ocid="student_login.error_state">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="pro-submit-btn"
            data-ocid="student_login.submit_button"
          >
            {loading ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Log In
              </>
            )}
          </button>

          <p className="pro-hint">
            Don&apos;t know your roll number? Ask your teacher.
          </p>
        </motion.div>

        {/* Install App Banner */}
        {!alreadyInstalled && showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4, ease: "easeOut" }}
            className="pro-install-box"
          >
            <button
              type="button"
              className="pro-close-btn"
              onClick={() => setShowBanner(false)}
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>

            {isIOSDevice ? (
              <>
                <p className="pro-install-title">📱 Install Classio Kids App</p>
                <p style={{ margin: 0 }}>
                  Install this app on your iPhone or iPad:
                </p>
                <ol className="pro-steps">
                  <li>
                    Open this page in <strong>Safari</strong>
                  </li>
                  <li>
                    Tap the <strong>Share</strong> button (⬆︎) at the bottom
                  </li>
                  <li>
                    Tap <strong>&ldquo;Add to Home Screen&rdquo;</strong>
                  </li>
                  <li>
                    Tap <strong>Add</strong> — the app icon will appear on your
                    home screen
                  </li>
                </ol>
              </>
            ) : canInstall ? (
              <>
                <p className="pro-install-title">📲 Install Classio Kids App</p>
                <p style={{ margin: "0 0 2px" }}>
                  Install the app on your Android or desktop for the best
                  experience — works offline too!
                </p>
                <button
                  type="button"
                  onClick={handleInstall}
                  className="pro-install-btn"
                  data-ocid="student_login.install_button"
                >
                  📲 Install App
                </button>
              </>
            ) : (
              <>
                <p className="pro-install-title">📲 Install Classio Kids App</p>
                <p style={{ margin: 0 }}>Install on Android:</p>
                <ol className="pro-steps">
                  <li>
                    Open this page in <strong>Chrome</strong>
                  </li>
                  <li>
                    Tap the <strong>3-dot menu (⋮)</strong> at the top right
                  </li>
                  <li>
                    Tap <strong>&ldquo;Add to Home Screen&rdquo;</strong> or{" "}
                    <strong>&ldquo;Install App&rdquo;</strong>
                  </li>
                  <li>
                    Tap <strong>Install</strong> — the app icon appears on your
                    home screen
                  </li>
                </ol>
              </>
            )}
          </motion.div>
        )}

        {/* Admin login */}
        <button
          type="button"
          onClick={() => onNavigate("admin-login")}
          className="pro-admin-link"
          data-ocid="student_login.admin_login_button"
        >
          Admin Login
        </button>
      </div>
    </>
  );
}
