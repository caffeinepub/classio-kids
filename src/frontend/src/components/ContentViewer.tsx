import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  COLOURING_DATA,
  SPELLING_DATA,
  TRACING_DATA,
  WORD_MATCH_DATA,
} from "../data/activities";
import type {
  ColourPage,
  SpellingWord,
  WordMatchPair,
} from "../data/activities";
import {
  CVC_WORDS,
  DIGRAPHS,
  PHONIC_SOUNDS,
  PHONIC_STORIES,
  RHYMES,
} from "../data/content";
import type {
  CVCGroup,
  DigraphItem,
  PhonicSound,
  PhonicStory,
  Rhyme,
} from "../data/content";

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
  category: ContentCategory;
  grade: string;
  onBack: () => void;
}

// ─── CVC Word Card ────────────────────────────────────────────────────────────
function CVCWordCard({
  word,
  vowelColor,
  vowel,
}: { word: string; vowelColor: string; vowel: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-card px-4 py-5 flex flex-col items-center gap-1 border-2 border-gray-100">
      <div className="text-2xl font-black tracking-widest">
        {word.split("").map((ch, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: position is stable
            key={i}
            style={{
              color: ch.toLowerCase() === vowel ? vowelColor : "#1a202c",
            }}
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Rhymes Viewer ────────────────────────────────────────────────────────────
function RhymesViewer({ grade }: { grade: string }) {
  const rhymes: Rhyme[] = RHYMES[grade] ?? [];
  const [selected, setSelected] = useState<Rhyme | null>(null);

  if (selected) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="flex items-center gap-1 text-gray-500 hover:text-blue-600 font-semibold text-sm mb-5"
          data-ocid="rhymes.back.button"
        >
          <ArrowLeft className="w-4 h-4" /> All Rhymes
        </button>
        <div className="bg-rhymes-blue rounded-3xl p-8 text-white shadow-hero max-w-xl mx-auto">
          <div className="text-5xl text-center mb-3">{selected.emoji}</div>
          <h2 className="text-2xl font-black text-center mb-6">
            {selected.title}
          </h2>
          <div className="space-y-1">
            {selected.lyrics.map((line, i) =>
              line === "" ? (
                // biome-ignore lint/suspicious/noArrayIndexKey: position is stable
                <div key={i} className="h-3" />
              ) : (
                // biome-ignore lint/suspicious/noArrayIndexKey: position is stable
                <p key={i} className="text-white/90 text-lg font-semibold">
                  {line}
                </p>
              ),
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {rhymes.map((r, i) => (
        <motion.button
          key={r.title}
          onClick={() => setSelected(r)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-2xl shadow-card p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-hero transition-all border-2 border-blue-100"
          data-ocid={`rhymes.item.${i + 1}`}
        >
          <div className="text-5xl mb-3">{r.emoji}</div>
          <h3 className="text-lg font-extrabold text-gray-800">{r.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{r.lyrics[0]}</p>
          <div className="mt-4 rounded-full bg-blue-50 px-5 py-1.5 text-sm font-bold text-blue-700">
            Read & Sing 🎵
          </div>
        </motion.button>
      ))}
    </div>
  );
}

// ─── Phonic Sounds Viewer ─────────────────────────────────────────────────────
function PhonicSoundsViewer({ grade }: { grade: string }) {
  const sounds: PhonicSound[] = PHONIC_SOUNDS[grade] ?? [];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      {sounds.map((s, i) => (
        <motion.div
          key={s.upper}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.06 }}
          whileHover={{ scale: 1.05 }}
          className="bg-phonic-green rounded-2xl shadow-card p-6 flex flex-col items-center text-white"
          data-ocid={`phonics.item.${i + 1}`}
        >
          <div className="text-5xl font-black mb-1">
            {s.upper}
            <span className="text-white/70 text-3xl">{s.lower}</span>
          </div>
          <div className="text-4xl mb-2">{s.emoji}</div>
          <p className="text-lg font-extrabold">{s.word}</p>
          <p className="text-xs text-white/75 mt-1">
            "{s.upper}" for {s.word}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Phonic Stories Viewer ────────────────────────────────────────────────────
function PhonicStoriesViewer({ grade }: { grade: string }) {
  const stories: PhonicStory[] = PHONIC_STORIES[grade] ?? [];
  const [selected, setSelected] = useState<PhonicStory | null>(null);

  if (selected) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setSelected(null)}
          className="flex items-center gap-1 text-gray-500 hover:text-purple-600 font-semibold text-sm mb-5"
          data-ocid="stories.back.button"
        >
          <ArrowLeft className="w-4 h-4" /> All Stories
        </button>
        <div className="bg-stories-purple rounded-3xl p-8 text-white shadow-hero max-w-xl mx-auto">
          <div className="text-5xl text-center mb-3">{selected.emoji}</div>
          <h2 className="text-2xl font-black text-center mb-6">
            {selected.title}
          </h2>
          <div className="space-y-4">
            {selected.paragraphs.map((p, i) => (
              <p
                // biome-ignore lint/suspicious/noArrayIndexKey: position is stable
                key={i}
                className="text-white/90 text-lg font-semibold leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {stories.map((s, i) => (
        <motion.button
          key={s.title}
          onClick={() => setSelected(s)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-2xl shadow-card p-6 flex flex-col items-center text-center cursor-pointer hover:shadow-hero transition-all border-2 border-purple-100"
          data-ocid={`stories.item.${i + 1}`}
        >
          <div className="text-5xl mb-3">{s.emoji}</div>
          <h3 className="text-lg font-extrabold text-gray-800">{s.title}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {s.paragraphs[0]}
          </p>
          <div className="mt-4 rounded-full bg-purple-50 px-5 py-1.5 text-sm font-bold text-purple-700">
            Read Story 📖
          </div>
        </motion.button>
      ))}
    </div>
  );
}

// ─── Digraphs Viewer ──────────────────────────────────────────────────────────
function DigraphsViewer({ grade }: { grade: string }) {
  const digraphs: DigraphItem[] = DIGRAPHS[grade] ?? [];
  const [selected, setSelected] = useState<DigraphItem | null>(
    digraphs[0] ?? null,
  );

  return (
    <div>
      <div className="flex gap-3 mb-6 flex-wrap">
        {digraphs.map((d) => (
          <button
            type="button"
            key={d.digraph}
            onClick={() => setSelected(d)}
            className={`rounded-full px-5 py-2 font-extrabold text-base transition-all ${selected?.digraph === d.digraph ? "bg-cvc-pink text-white shadow-card" : "bg-white text-gray-700 border-2 border-gray-200 hover:border-pink-300"}`}
            data-ocid="digraph.tab"
          >
            "{d.digraph}"
          </button>
        ))}
      </div>
      {selected && (
        <div>
          <h3 className="text-xl font-extrabold text-gray-800 mb-4">
            Digraph:{" "}
            <span className="text-pink-600 text-2xl uppercase">
              {selected.digraph}
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {selected.words.map((w, i) => (
              <motion.div
                key={w.word}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl shadow-card p-5 flex flex-col items-center text-center border-2 border-pink-100"
                data-ocid={`digraph.item.${i + 1}`}
              >
                <div className="text-4xl mb-2">{w.emoji}</div>
                <p className="text-lg font-extrabold text-gray-800">{w.word}</p>
                <p className="text-xs text-gray-500 mt-1">{w.sentence}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CVC Viewer ───────────────────────────────────────────────────────────────
function CVCViewer({ grade }: { grade: string }) {
  const groups: CVCGroup[] = CVC_WORDS[grade] ?? [];
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.vowel}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl font-black shadow-card"
              style={{ backgroundColor: group.color }}
            >
              {group.vowel.toUpperCase()}
            </div>
            <div>
              <p className="font-extrabold text-gray-800 text-lg">
                Vowel: "{group.vowel.toUpperCase()}"
              </p>
              <p className="text-sm text-gray-500">
                {group.words.length} CVC words
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
            {group.words.map((word, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                data-ocid={`cvc.item.${i + 1}`}
              >
                <CVCWordCard
                  word={word}
                  vowelColor={group.color}
                  vowel={group.vowel}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Letter Tracing Activity ──────────────────────────────────────────────────
function LetterTracingActivity({ grade }: { grade: string }) {
  const data = TRACING_DATA[grade] ?? TRACING_DATA.Nursery;
  const [tab, setTab] = useState<"letters" | "numbers">("letters");
  const [selected, setSelected] = useState(data.letters[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const items = tab === "letters" ? data.letters : data.numbers;

  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // dotted guide lines
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    for (let y = 40; y < canvas.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);
    // letter guide
    ctx.font = `bold ${canvas.height * 0.7}px Arial`;
    ctx.fillStyle = "rgba(200, 210, 255, 0.7)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(selected, canvas.width / 2, canvas.height / 2);
  }, [selected]);

  useEffect(() => {
    drawGuide();
  }, [drawGuide]);

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      const t = e.touches[0];
      return {
        x: (t.clientX - rect.left) * scaleX,
        y: (t.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    setIsDrawing(true);
    lastPos.current = getPos(e);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    const pos = getPos(e);
    if (!pos || !lastPos.current) return;
    ctx.strokeStyle = "#7c3aed";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  }

  function stopDraw() {
    setIsDrawing(false);
    lastPos.current = null;
  }

  function clearCanvas() {
    drawGuide();
  }

  function selectItem(item: string) {
    setSelected(item);
  }

  return (
    <div>
      {/* Tab switch */}
      <div className="flex gap-3 mb-6">
        <button
          type="button"
          onClick={() => {
            setTab("letters");
            setSelected(data.letters[0]);
          }}
          className={`rounded-full px-6 py-2 font-extrabold text-base transition-all ${tab === "letters" ? "bg-amber-400 text-white" : "bg-white text-gray-600 border-2 border-gray-200"}`}
          data-ocid="tracing.letters.tab"
        >
          🔤 Letters
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("numbers");
            setSelected(data.numbers[0]);
          }}
          className={`rounded-full px-6 py-2 font-extrabold text-base transition-all ${tab === "numbers" ? "bg-amber-400 text-white" : "bg-white text-gray-600 border-2 border-gray-200"}`}
          data-ocid="tracing.numbers.tab"
        >
          🔢 Numbers
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Letter picker */}
        <div className="flex flex-wrap gap-2 lg:max-w-xs">
          {items.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => selectItem(item)}
              className={`w-12 h-12 rounded-xl font-black text-lg transition-all ${selected === item ? "bg-amber-400 text-white shadow-card scale-110" : "bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-300"}`}
              data-ocid="tracing.item.1"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-1 flex flex-col items-center">
          <div className="text-6xl font-black text-amber-400 mb-2">
            {selected}
          </div>
          <p className="text-gray-500 text-sm mb-3 font-semibold">
            Trace the letter with your finger or mouse!
          </p>
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            className="border-4 border-amber-300 rounded-2xl bg-amber-50 cursor-crosshair w-full max-w-md touch-none"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
            data-ocid="tracing.canvas_target"
          />
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={clearCanvas}
              className="rounded-full bg-white border-2 border-gray-300 px-6 py-2 font-bold text-gray-700 hover:border-amber-400 transition-all"
              data-ocid="tracing.clear.button"
            >
              🗑️ Clear
            </button>
            <button
              type="button"
              onClick={() => {
                const idx = items.indexOf(selected);
                const next = items[(idx + 1) % items.length];
                selectItem(next);
              }}
              className="rounded-full bg-amber-400 text-white px-6 py-2 font-bold hover:bg-amber-500 transition-all"
              data-ocid="tracing.next.button"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SVG Colouring Activity ───────────────────────────────────────────────────
const COLOUR_PALETTE = [
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#14B8A6",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#78716C",
  "#1F2937",
  "#FFFFFF",
  "#F9FAFB",
];

function ColourPageSVG({
  page,
  colors,
  onShapeClick,
}: {
  page: ColourPage;
  colors: Record<string, string>;
  onShapeClick: (shapeId: string) => void;
}) {
  const fill = (id: string, def: string) => colors[id] ?? def;

  if (page.id === "sun") {
    return (
      <svg
        viewBox="0 0 300 300"
        className="w-full max-w-xs mx-auto"
        role="img"
        aria-label="Colouring picture"
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 150 + Math.cos(rad) * 75;
          const y1 = 150 + Math.sin(rad) * 75;
          const x2 = 150 + Math.cos(rad) * 105;
          const y2 = 150 + Math.sin(rad) * 105;
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={fill("rays", "#FFA500")}
              strokeWidth="8"
              strokeLinecap="round"
              style={{ cursor: "pointer" }}
              onClick={() => onShapeClick("rays")}
              onKeyDown={(e) => e.key === "Enter" && onShapeClick("rays")}
            />
          );
        })}
        <circle
          cx="150"
          cy="150"
          r="70"
          fill={fill("circle", "#FFD700")}
          stroke="#d97706"
          strokeWidth="3"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("circle")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("circle")}
        />
      </svg>
    );
  }
  if (page.id === "apple") {
    return (
      <svg
        viewBox="0 0 300 300"
        className="w-full max-w-xs mx-auto"
        role="img"
        aria-label="Colouring picture"
      >
        <ellipse
          cx="150"
          cy="175"
          rx="90"
          ry="95"
          fill={fill("body", "#FF4444")}
          stroke="#b91c1c"
          strokeWidth="3"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("body")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("body")}
        />
        <path
          d="M150 80 C120 40 80 50 90 80"
          fill={fill("leaf", "#22C55E")}
          stroke="#15803d"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("leaf")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("leaf")}
        />
        <rect
          x="146"
          y="70"
          width="8"
          height="30"
          rx="4"
          fill={fill("stem", "#92400E")}
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("stem")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("stem")}
        />
      </svg>
    );
  }
  if (page.id === "house") {
    return (
      <svg
        viewBox="0 0 300 300"
        className="w-full max-w-xs mx-auto"
        role="img"
        aria-label="Colouring picture"
      >
        <rect
          x="60"
          y="150"
          width="180"
          height="130"
          fill={fill("walls", "#FBBF24")}
          stroke="#d97706"
          strokeWidth="3"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("walls")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("walls")}
        />
        <polygon
          points="150,50 40,160 260,160"
          fill={fill("roof", "#EF4444")}
          stroke="#dc2626"
          strokeWidth="3"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("roof")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("roof")}
        />
        <rect
          x="120"
          y="210"
          width="60"
          height="70"
          rx="4"
          fill={fill("door", "#92400E")}
          stroke="#78350f"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("door")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("door")}
        />
        <rect
          x="80"
          y="175"
          width="45"
          height="35"
          rx="4"
          fill={fill("window", "#60A5FA")}
          stroke="#2563eb"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("window")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("window")}
        />
        <rect
          x="175"
          y="175"
          width="45"
          height="35"
          rx="4"
          fill={fill("window", "#60A5FA")}
          stroke="#2563eb"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("window")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("window")}
        />
      </svg>
    );
  }
  if (page.id === "butterfly") {
    return (
      <svg
        viewBox="0 0 300 300"
        className="w-full max-w-xs mx-auto"
        role="img"
        aria-label="Colouring picture"
      >
        <ellipse
          cx="105"
          cy="110"
          rx="80"
          ry="60"
          fill={fill("wings-top", "#A855F7")}
          stroke="#7e22ce"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("wings-top")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("wings-top")}
        />
        <ellipse
          cx="195"
          cy="110"
          rx="80"
          ry="60"
          fill={fill("wings-top", "#A855F7")}
          stroke="#7e22ce"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("wings-top")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("wings-top")}
        />
        <ellipse
          cx="105"
          cy="195"
          rx="60"
          ry="45"
          fill={fill("wings-bottom", "#C084FC")}
          stroke="#7e22ce"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("wings-bottom")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("wings-bottom")}
        />
        <ellipse
          cx="195"
          cy="195"
          rx="60"
          ry="45"
          fill={fill("wings-bottom", "#C084FC")}
          stroke="#7e22ce"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("wings-bottom")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("wings-bottom")}
        />
        <ellipse
          cx="150"
          cy="150"
          rx="12"
          ry="60"
          fill={fill("body", "#1F2937")}
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("body")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("body")}
        />
      </svg>
    );
  }
  if (page.id === "fish") {
    return (
      <svg
        viewBox="0 0 300 300"
        className="w-full max-w-xs mx-auto"
        role="img"
        aria-label="Colouring picture"
      >
        <ellipse
          cx="135"
          cy="150"
          rx="100"
          ry="65"
          fill={fill("body", "#3B82F6")}
          stroke="#1d4ed8"
          strokeWidth="3"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("body")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("body")}
        />
        <polygon
          points="240,150 280,110 280,190"
          fill={fill("tail", "#60A5FA")}
          stroke="#2563eb"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("tail")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("tail")}
        />
        <circle
          cx="75"
          cy="130"
          r="12"
          fill={fill("eye", "#1F2937")}
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("eye")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("eye")}
        />
        <circle cx="75" cy="130" r="5" fill="white" />
        <path
          d="M135 100 Q100 75 80 90"
          fill="none"
          stroke={fill("fin", "#2563EB")}
          strokeWidth="4"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("fin")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("fin")}
        />
      </svg>
    );
  }
  if (page.id === "flower") {
    return (
      <svg
        viewBox="0 0 300 300"
        className="w-full max-w-xs mx-auto"
        role="img"
        aria-label="Colouring picture"
      >
        {[0, 72, 144, 216, 288].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 150 + Math.cos(rad) * 45;
          const cy = 130 + Math.sin(rad) * 45;
          return (
            <ellipse
              key={angle}
              cx={cx}
              cy={cy}
              rx="28"
              ry="22"
              fill={fill("petals", "#F472B6")}
              stroke="#db2777"
              strokeWidth="2"
              style={{ cursor: "pointer" }}
              onClick={() => onShapeClick("petals")}
              onKeyDown={(e) => e.key === "Enter" && onShapeClick("petals")}
            />
          );
        })}
        <circle
          cx="150"
          cy="130"
          r="28"
          fill={fill("center", "#FBBF24")}
          stroke="#d97706"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("center")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("center")}
        />
        <rect
          x="143"
          y="160"
          width="14"
          height="80"
          rx="7"
          fill={fill("stem", "#22C55E")}
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("stem")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("stem")}
        />
        <ellipse
          cx="120"
          cy="210"
          rx="25"
          ry="14"
          fill={fill("leaf", "#16A34A")}
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("leaf")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("leaf")}
        />
      </svg>
    );
  }
  if (page.id === "elephant") {
    return (
      <svg
        viewBox="0 0 300 300"
        className="w-full max-w-xs mx-auto"
        role="img"
        aria-label="Colouring picture"
      >
        <ellipse
          cx="155"
          cy="175"
          rx="110"
          ry="85"
          fill={fill("body", "#9CA3AF")}
          stroke="#6b7280"
          strokeWidth="3"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("body")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("body")}
        />
        <ellipse
          cx="70"
          cy="120"
          rx="50"
          ry="60"
          fill={fill("ear", "#D1D5DB")}
          stroke="#9ca3af"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("ear")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("ear")}
        />
        <path
          d="M100 155 Q60 200 70 250 Q80 260 90 250 Q90 200 120 165"
          fill={fill("trunk", "#6B7280")}
          stroke="#4b5563"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("trunk")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("trunk")}
        />
        <circle
          cx="105"
          cy="135"
          r="10"
          fill={fill("eye", "#1F2937")}
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("eye")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("eye")}
        />
        <circle cx="108" cy="132" r="4" fill="white" />
      </svg>
    );
  }
  if (page.id === "train") {
    return (
      <svg
        viewBox="0 0 300 300"
        className="w-full max-w-xs mx-auto"
        role="img"
        aria-label="Colouring picture"
      >
        <rect
          x="50"
          y="140"
          width="200"
          height="100"
          rx="12"
          fill={fill("engine", "#EF4444")}
          stroke="#b91c1c"
          strokeWidth="3"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("engine")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("engine")}
        />
        <rect
          x="90"
          y="100"
          width="110"
          height="55"
          rx="8"
          fill={fill("engine", "#EF4444")}
          stroke="#b91c1c"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("engine")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("engine")}
        />
        <rect
          x="130"
          y="60"
          width="30"
          height="45"
          rx="6"
          fill={fill("chimney", "#374151")}
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("chimney")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("chimney")}
        />
        <rect
          x="100"
          y="108"
          width="50"
          height="40"
          rx="6"
          fill={fill("window", "#60A5FA")}
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("window")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("window")}
        />
        <circle
          cx="95"
          cy="248"
          r="22"
          fill={fill("wheels", "#1F2937")}
          stroke="#374151"
          strokeWidth="3"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("wheels")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("wheels")}
        />
        <circle
          cx="205"
          cy="248"
          r="22"
          fill={fill("wheels", "#1F2937")}
          stroke="#374151"
          strokeWidth="3"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("wheels")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("wheels")}
        />
      </svg>
    );
  }
  if (page.id === "tree") {
    return (
      <svg
        viewBox="0 0 300 300"
        className="w-full max-w-xs mx-auto"
        role="img"
        aria-label="Colouring picture"
      >
        <rect
          x="130"
          y="200"
          width="40"
          height="90"
          rx="8"
          fill={fill("trunk", "#92400E")}
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("trunk")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("trunk")}
        />
        <ellipse
          cx="150"
          cy="160"
          rx="90"
          ry="80"
          fill={fill("leaves", "#22C55E")}
          stroke="#15803d"
          strokeWidth="3"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("leaves")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("leaves")}
        />
        <ellipse
          cx="150"
          cy="120"
          rx="65"
          ry="55"
          fill={fill("leaves", "#22C55E")}
          stroke="#15803d"
          strokeWidth="2"
          style={{ cursor: "pointer" }}
          onClick={() => onShapeClick("leaves")}
          onKeyDown={(e) => e.key === "Enter" && onShapeClick("leaves")}
        />
        {[
          [110, 155],
          [180, 145],
          [145, 175],
          [165, 130],
          [125, 135],
        ].map(([cx, cy], i) => (
          <circle
            // biome-ignore lint/suspicious/noArrayIndexKey: position is stable
            key={i}
            cx={cx}
            cy={cy}
            r="10"
            fill={fill("fruits", "#EF4444")}
            style={{ cursor: "pointer" }}
            onClick={() => onShapeClick("fruits")}
            onKeyDown={(e) => e.key === "Enter" && onShapeClick("fruits")}
          />
        ))}
      </svg>
    );
  }
  return <div className="text-6xl text-center py-8">{page.emoji}</div>;
}

function ColouringActivity({ grade }: { grade: string }) {
  const pages: ColourPage[] = COLOURING_DATA[grade] ?? COLOURING_DATA.Nursery;
  const [selected, setSelected] = useState<ColourPage | null>(null);
  const [activeColor, setActiveColor] = useState(COLOUR_PALETTE[0]);
  const [colors, setColors] = useState<Record<string, string>>({});

  function handleShapeClick(shapeId: string) {
    setColors((prev) => ({ ...prev, [shapeId]: activeColor }));
  }

  if (selected) {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            setSelected(null);
            setColors({});
          }}
          className="flex items-center gap-1 text-gray-500 hover:text-rose-600 font-semibold text-sm mb-5"
          data-ocid="colouring.back.button"
        >
          <ArrowLeft className="w-4 h-4" /> All Pictures
        </button>
        <h3 className="text-2xl font-black text-gray-800 mb-1">
          {selected.emoji} {selected.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          Tap a colour, then tap the shape to fill it!
        </p>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 bg-white rounded-3xl p-4 shadow-card border-2 border-rose-100">
            <ColourPageSVG
              page={selected}
              colors={colors}
              onShapeClick={handleShapeClick}
            />
          </div>
          <div className="w-full lg:w-64">
            <p className="font-extrabold text-gray-700 mb-3">
              🎨 Choose a Colour:
            </p>
            <div className="grid grid-cols-6 lg:grid-cols-4 gap-2 mb-4">
              {COLOUR_PALETTE.map((color) => (
                <button
                  type="button"
                  key={color}
                  onClick={() => setActiveColor(color)}
                  className={`w-10 h-10 rounded-full border-4 transition-all ${activeColor === color ? "border-gray-800 scale-125" : "border-gray-200 hover:scale-110"}`}
                  style={{ backgroundColor: color }}
                  data-ocid="colouring.toggle"
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mb-6">
              <div
                className="w-8 h-8 rounded-full border-4 border-gray-800"
                style={{ backgroundColor: activeColor }}
              />
              <span className="text-sm font-bold text-gray-600">
                Selected colour
              </span>
            </div>
            <p className="font-extrabold text-gray-700 mb-2">🖍️ Shapes:</p>
            {selected.shapes.map((shape) => (
              <button
                type="button"
                key={shape.id}
                onClick={() => handleShapeClick(shape.id)}
                className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-gray-50 transition-all mb-1"
                data-ocid="colouring.item.1"
              >
                <div
                  className="w-6 h-6 rounded-full border-2 border-gray-300"
                  style={{
                    backgroundColor: colors[shape.id] ?? shape.defaultColor,
                  }}
                />
                <span className="text-sm font-semibold text-gray-700">
                  {shape.label}
                </span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => setColors({})}
              className="mt-4 w-full rounded-full border-2 border-gray-300 py-2 font-bold text-gray-600 hover:border-rose-400 transition-all"
              data-ocid="colouring.reset.button"
            >
              🔄 Reset Colors
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-gray-500 mb-6 font-semibold">
        Pick a picture to colour! 🎨
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {pages.map((page, i) => (
          <motion.button
            key={page.id}
            type="button"
            onClick={() => {
              setSelected(page);
              setColors({});
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-3xl shadow-card p-6 flex flex-col items-center border-2 border-rose-100 hover:border-rose-300 transition-all"
            data-ocid={`colouring.item.${i + 1}`}
          >
            <div className="text-6xl mb-3">{page.emoji}</div>
            <h3 className="text-lg font-extrabold text-gray-800">
              {page.title}
            </h3>
            <div className="mt-3 rounded-full bg-rose-50 px-4 py-1.5 text-sm font-bold text-rose-600">
              Colour Me! 🖍️
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── Word Match Game ──────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function WordMatchGame({ grade }: { grade: string }) {
  const allPairs: WordMatchPair[] =
    WORD_MATCH_DATA[grade] ?? WORD_MATCH_DATA.Nursery;
  const [pairs, setPairs] = useState(() => shuffle(allPairs).slice(0, 6));
  const [wordOrder] = useState(() => pairs.map((_, i) => i));
  const [emojiOrder, setEmojiOrder] = useState(() =>
    shuffle(pairs.map((_, i) => i)),
  );
  const [selectedWord, setSelectedWord] = useState<number | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrong, setWrong] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);

  function restart() {
    const newPairs = shuffle(allPairs).slice(0, 6);
    setPairs(newPairs);
    setEmojiOrder(shuffle(newPairs.map((_, i) => i)));
    setSelectedWord(null);
    setSelectedEmoji(null);
    setMatched(new Set());
    setWrong(new Set());
    setScore(0);
  }

  useEffect(() => {
    if (selectedWord !== null && selectedEmoji !== null) {
      if (selectedWord === emojiOrder[selectedEmoji]) {
        // correct
        const newMatched = new Set(matched);
        newMatched.add(selectedWord);
        setTimeout(() => {
          setMatched(newMatched);
          setScore((s) => s + 1);
          setSelectedWord(null);
          setSelectedEmoji(null);
        }, 400);
      } else {
        // wrong
        const wrongSet = new Set([selectedWord]);
        setWrong(wrongSet);
        setTimeout(() => {
          setWrong(new Set());
          setSelectedWord(null);
          setSelectedEmoji(null);
        }, 600);
      }
    }
  }, [selectedWord, selectedEmoji, emojiOrder, matched]);

  const allDone = matched.size === pairs.length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="bg-teal-100 rounded-2xl px-6 py-3">
          <span className="font-black text-teal-700 text-xl">
            ⭐ Score: {score}/{pairs.length}
          </span>
        </div>
        <button
          type="button"
          onClick={restart}
          className="rounded-full bg-teal-500 text-white px-6 py-2 font-bold hover:bg-teal-600 transition-all"
          data-ocid="word_match.restart.button"
        >
          🔄 New Game
        </button>
      </div>

      {allDone ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-8xl mb-4">🎉</div>
          <h3 className="text-3xl font-black text-teal-600 mb-4">
            Amazing! You matched all words!
          </h3>
          <button
            type="button"
            onClick={restart}
            className="rounded-full bg-teal-500 text-white px-10 py-4 text-xl font-black hover:bg-teal-600"
            data-ocid="word_match.play_again.button"
          >
            🃏 Play Again!
          </button>
        </motion.div>
      ) : (
        <div>
          <p className="text-gray-500 font-semibold mb-4 text-center">
            Tap a word, then tap its matching picture!
          </p>
          <div className="grid grid-cols-2 gap-4">
            {/* Words column */}
            <div className="flex flex-col gap-3">
              <p className="text-center font-black text-gray-600 mb-2">
                📝 Words
              </p>
              {wordOrder.map((idx) => {
                if (matched.has(idx))
                  return (
                    <div
                      key={idx}
                      className="h-16 rounded-2xl bg-teal-50 border-2 border-teal-200 opacity-30"
                    />
                  );
                const isWrong = wrong.has(idx);
                const isSelected = selectedWord === idx;
                return (
                  <motion.button
                    key={idx}
                    type="button"
                    onClick={() => !isWrong && setSelectedWord(idx)}
                    animate={isWrong ? { x: [0, -8, 8, -8, 0] } : {}}
                    className={`h-16 rounded-2xl font-black text-lg transition-all border-3 ${isSelected ? "bg-teal-500 text-white border-teal-600 scale-105" : isWrong ? "bg-red-100 border-red-400" : "bg-white text-gray-800 border-gray-200 hover:border-teal-400"}`}
                    data-ocid={`word_match.item.${idx + 1}`}
                  >
                    {pairs[idx].word}
                  </motion.button>
                );
              })}
            </div>
            {/* Emojis column */}
            <div className="flex flex-col gap-3">
              <p className="text-center font-black text-gray-600 mb-2">
                🖼️ Pictures
              </p>
              {emojiOrder.map((pairIdx, emojiIdx) => {
                if (matched.has(pairIdx))
                  return (
                    <div
                      // biome-ignore lint/suspicious/noArrayIndexKey: position is stable
                      key={emojiIdx}
                      className="h-16 rounded-2xl bg-teal-50 border-2 border-teal-200 opacity-30"
                    />
                  );
                const isSelected = selectedEmoji === emojiIdx;
                return (
                  <motion.button
                    // biome-ignore lint/suspicious/noArrayIndexKey: position is stable
                    key={emojiIdx}
                    type="button"
                    onClick={() => setSelectedEmoji(emojiIdx)}
                    className={`h-16 rounded-2xl text-3xl transition-all border-3 ${isSelected ? "bg-teal-500 border-teal-600 scale-105" : "bg-white border-gray-200 hover:border-teal-400"}`}
                    data-ocid={`word_match.item.${emojiIdx + 1}`}
                  >
                    {pairs[pairIdx].emoji}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Spelling Puzzle ──────────────────────────────────────────────────────────
function SpellingPuzzle({ grade }: { grade: string }) {
  const words: SpellingWord[] = SPELLING_DATA[grade] ?? SPELLING_DATA.Nursery;
  const [wordIdx, setWordIdx] = useState(0);
  const current = words[wordIdx];
  const [tiles, setTiles] = useState<string[]>(() =>
    shuffle(current.word.split("")),
  );
  const [answer, setAnswer] = useState<(string | null)[]>(() =>
    Array(current.word.length).fill(null),
  );
  const [tileUsed, setTileUsed] = useState<boolean[]>(() =>
    Array(current.word.length).fill(false),
  );
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  function reset(word: SpellingWord) {
    const letters = shuffle(word.word.split(""));
    setTiles(letters);
    setAnswer(Array(word.word.length).fill(null));
    setTileUsed(Array(word.word.length).fill(false));
    setStatus("idle");
  }

  function tapTile(i: number) {
    if (tileUsed[i] || status !== "idle") return;
    const firstEmpty = answer.findIndex((a) => a === null);
    if (firstEmpty === -1) return;
    const newAnswer = [...answer];
    newAnswer[firstEmpty] = tiles[i];
    const newUsed = [...tileUsed];
    newUsed[i] = true;
    setAnswer(newAnswer);
    setTileUsed(newUsed);
    // check if done
    if (newAnswer.every((a) => a !== null)) {
      const formed = newAnswer.join("");
      if (formed === current.word) {
        setStatus("correct");
      } else {
        setStatus("wrong");
        setTimeout(() => {
          reset(current);
        }, 800);
      }
    }
  }

  function tapAnswer(i: number) {
    if (answer[i] === null || status !== "idle") return;
    // find which tile this was
    const letter = answer[i];
    const tileIdx = tileUsed.findIndex(
      (used, idx) => used && tiles[idx] === letter,
    );
    const newAnswer = [...answer];
    newAnswer[i] = null;
    const newUsed = [...tileUsed];
    if (tileIdx !== -1) newUsed[tileIdx] = false;
    setAnswer(newAnswer);
    setTileUsed(newUsed);
  }

  function nextWord() {
    const next = (wordIdx + 1) % words.length;
    setWordIdx(next);
    reset(words[next]);
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Word progress */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-500 font-bold">
          Word {wordIdx + 1} of {words.length}
        </span>
        <div className="flex gap-1">
          {words.map((_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: position is stable
              key={i}
              className={`w-3 h-3 rounded-full ${i === wordIdx ? "bg-violet-500" : i < wordIdx ? "bg-green-400" : "bg-gray-200"}`}
            />
          ))}
        </div>
      </div>

      {/* Emoji + hint */}
      <div className="text-center mb-8">
        <motion.div
          key={current.word}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-8xl mb-3"
        >
          {current.emoji}
        </motion.div>
        <p className="text-gray-500 text-lg font-semibold italic">
          {current.hint}
        </p>
      </div>

      {/* Answer boxes */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {answer.map((letter, i) => (
          <motion.button
            // biome-ignore lint/suspicious/noArrayIndexKey: position is stable
            key={i}
            type="button"
            onClick={() => tapAnswer(i)}
            animate={
              status === "wrong"
                ? { x: [0, -6, 6, -6, 0] }
                : status === "correct" && letter
                  ? { scale: [1, 1.3, 1] }
                  : {}
            }
            className={`w-14 h-14 rounded-xl border-4 font-black text-2xl flex items-center justify-center transition-all ${letter ? (status === "correct" ? "bg-green-100 border-green-400 text-green-700" : status === "wrong" ? "bg-red-100 border-red-400" : "bg-violet-100 border-violet-400 text-violet-700 hover:bg-violet-200") : "bg-gray-50 border-dashed border-gray-300"}`}
            data-ocid={`spelling.item.${i + 1}`}
          >
            {letter ?? ""}
          </motion.button>
        ))}
      </div>

      {/* Letter tiles */}
      <div className="flex justify-center gap-3 flex-wrap mb-6">
        {tiles.map((letter, i) => (
          <motion.button
            // biome-ignore lint/suspicious/noArrayIndexKey: position is stable
            key={i}
            type="button"
            onClick={() => tapTile(i)}
            whileHover={!tileUsed[i] ? { scale: 1.1 } : {}}
            whileTap={!tileUsed[i] ? { scale: 0.9 } : {}}
            className={`w-14 h-14 rounded-xl font-black text-2xl transition-all ${tileUsed[i] ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-violet-500 text-white hover:bg-violet-600 shadow-card"}`}
            disabled={tileUsed[i]}
            data-ocid={`spelling.item.${i + 1}`}
          >
            {letter}
          </motion.button>
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {status === "correct" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="text-5xl mb-3">🎉</div>
            <p className="text-2xl font-black text-green-600 mb-4">
              Fantastic! That's correct!
            </p>
            <button
              type="button"
              onClick={nextWord}
              className="rounded-full bg-violet-500 text-white px-10 py-3 text-xl font-black hover:bg-violet-600"
              data-ocid="spelling.next.button"
            >
              Next Word →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Category Meta ────────────────────────────────────────────────────────────
const CATEGORY_META: Record<
  ContentCategory,
  { label: string; emoji: string; colorClass: string }
> = {
  rhymes: { label: "Rhymes & Songs", emoji: "🎵", colorClass: "text-blue-600" },
  "phonic-sounds": {
    label: "Phonic Sounds",
    emoji: "🔤",
    colorClass: "text-green-600",
  },
  "phonic-stories": {
    label: "Phonic Stories",
    emoji: "📖",
    colorClass: "text-purple-600",
  },
  digraph: { label: "Digraphs", emoji: "✏️", colorClass: "text-pink-600" },
  cvc: { label: "CVC Words", emoji: "🧩", colorClass: "text-orange-600" },
  tracing: {
    label: "Letter Tracing",
    emoji: "✍️",
    colorClass: "text-amber-600",
  },
  colouring: {
    label: "Colouring Book",
    emoji: "🎨",
    colorClass: "text-rose-600",
  },
  "word-match": {
    label: "Word Match",
    emoji: "🃏",
    colorClass: "text-teal-600",
  },
  spelling: {
    label: "Spelling Puzzle",
    emoji: "🔡",
    colorClass: "text-violet-600",
  },
};

export default function ContentViewer({ category, grade, onBack }: Props) {
  const meta = CATEGORY_META[category];
  return (
    <div>
      <div className="mb-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-gray-500 hover:text-blue-600 font-semibold text-sm mb-4"
          data-ocid="content.back.button"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{meta.emoji}</span>
          <div>
            <h2 className={`text-2xl font-black ${meta.colorClass}`}>
              {meta.label}
            </h2>
            <p className="text-gray-500 text-sm">Grade: {grade}</p>
          </div>
        </div>
      </div>

      {category === "rhymes" && <RhymesViewer grade={grade} />}
      {category === "phonic-sounds" && <PhonicSoundsViewer grade={grade} />}
      {category === "phonic-stories" && <PhonicStoriesViewer grade={grade} />}
      {category === "digraph" && <DigraphsViewer grade={grade} />}
      {category === "cvc" && <CVCViewer grade={grade} />}
      {category === "tracing" && <LetterTracingActivity grade={grade} />}
      {category === "colouring" && <ColouringActivity grade={grade} />}
      {category === "word-match" && <WordMatchGame grade={grade} />}
      {category === "spelling" && <SpellingPuzzle grade={grade} />}
    </div>
  );
}
