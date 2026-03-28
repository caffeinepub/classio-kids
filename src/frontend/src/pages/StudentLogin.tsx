import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
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

export default function StudentLogin({ initialGrade, onLogin, onBack }: Props) {
  const { actor } = useActor();
  const [rollNumber, setRollNumber] = useState("");
  const [grade, setGrade] = useState(initialGrade ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!rollNumber.trim() || !grade) {
      setError("Please enter your Roll Number and pick your Grade! 😊");
      return;
    }
    if (!actor) {
      setError("Connection not ready. Please try again!");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const student = await actor.studentLogin(rollNumber.trim(), grade);
      onLogin(student);
    } catch {
      setError(
        "Oops! Wrong Roll Number or Grade. Ask your teacher for help! 🙏",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen font-nunito flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #fda085 100%)",
      }}
    >
      {/* Top bar */}
      <div className="px-6 pt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white/80 hover:text-white font-bold text-base bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm transition-all"
          data-ocid="student_login.back.button"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <div className="bg-white/20 rounded-xl px-3 py-1.5 backdrop-blur-sm">
          <img
            src={LOGO_SRC}
            alt="Classio Kids"
            className="h-10 w-auto object-contain rounded"
          />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 md:p-12"
          data-ocid="student_login.modal"
        >
          {/* Icon + heading */}
          <div className="flex flex-col items-center mb-10">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{
                duration: 1,
                delay: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
              }}
              className="text-8xl mb-4"
            >
              🎒
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-center text-footer-navy leading-tight">
              Hello, Student! 👋
            </h1>
            <p className="text-gray-500 text-xl font-semibold mt-3 text-center">
              Let's start learning today!
            </p>
          </div>

          <div className="space-y-6">
            {/* Roll number */}
            <div>
              <label
                htmlFor="roll"
                className="block text-xl font-extrabold text-gray-700 mb-3"
              >
                📋 What's your Roll Number?
              </label>
              <Input
                id="roll"
                placeholder="Type your roll number here..."
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="rounded-2xl h-16 text-xl font-bold border-3 border-blue-200 focus:border-blue-400 px-5"
                data-ocid="student_login.roll_number.input"
              />
            </div>

            {/* Grade select */}
            <div>
              <p className="block text-xl font-extrabold text-gray-700 mb-3">
                🏫 Which Grade are you in?
              </p>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger
                  className="rounded-2xl h-16 text-xl font-bold border-3 border-blue-200 focus:border-blue-400 px-5"
                  data-ocid="student_login.grade.select"
                >
                  <SelectValue placeholder="Choose your grade..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nursery" className="text-xl py-3">
                    🌱 Nursery
                  </SelectItem>
                  <SelectItem value="LKG" className="text-xl py-3">
                    🌿 LKG
                  </SelectItem>
                  <SelectItem value="UKG" className="text-xl py-3">
                    🌳 UKG
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl p-4 text-lg font-bold text-center"
                data-ocid="student_login.error_state"
              >
                {error}
              </motion.div>
            )}

            {/* Submit button */}
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full rounded-full h-16 text-2xl font-black bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transition-all hover:scale-105 active:scale-95"
              data-ocid="student_login.submit.button"
            >
              {loading ? (
                <Loader2 className="w-7 h-7 animate-spin mr-2" />
              ) : (
                <span className="mr-2 text-2xl">🚀</span>
              )}
              {loading ? "Logging in..." : "Let's Go!"}
            </Button>

            <p className="text-center text-gray-400 text-base font-semibold">
              Ask your teacher if you don't know your Roll Number
            </p>
          </div>
        </motion.div>
      </main>

      {/* Floating decorations */}
      <div
        className="fixed top-20 left-4 text-4xl opacity-40 pointer-events-none animate-bounce"
        style={{ animationDelay: "0s" }}
      >
        ⭐
      </div>
      <div
        className="fixed top-32 right-6 text-3xl opacity-40 pointer-events-none animate-bounce"
        style={{ animationDelay: "0.5s" }}
      >
        🌈
      </div>
      <div
        className="fixed bottom-24 left-8 text-4xl opacity-40 pointer-events-none animate-bounce"
        style={{ animationDelay: "1s" }}
      >
        🎈
      </div>
      <div
        className="fixed bottom-16 right-4 text-3xl opacity-40 pointer-events-none animate-bounce"
        style={{ animationDelay: "1.5s" }}
      >
        ✨
      </div>
    </div>
  );
}
