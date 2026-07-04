import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";

const frames = [
  { id: 0, style: "Classic", color: "from-pink-400 to-rose-500", letter: "C" },
  { id: 1, style: "Vintage", color: "from-amber-400 to-orange-500", letter: "A" },
  { id: 2, style: "Neon", color: "from-cyan-400 to-blue-500", letter: "M" },
  { id: 3, style: "Polaroid", color: "from-green-400 to-emerald-500", letter: "P" },
  { id: 4, style: "Strip", color: "from-purple-400 to-violet-500", letter: "X" },
  { id: 5, style: "Circle", color: "from-red-400 to-pink-500", letter: "!" },
];

const stickers = ["😂", "🎉", "🔥", "💀", "🤡", "👑", "🦄", "🌈", "💫", "⭐"];

export default function PhotoBooth() {
  const [taken, setTaken] = useState([]);
  const [activeFrame, setActiveFrame] = useState(null);
  const [showing, setShowing] = useState(false);

  const takePhoto = (frame) => {
    setActiveFrame(frame);
    setShowing(true);
    if (!taken.includes(frame.id)) {
      setTaken((prev) => [...prev, frame.id]);
    }
    setTimeout(() => setShowing(false), 1500);
  };

  const foundLetters = frames.filter((f) => taken.includes(f.id)).map((f) => f.letter);

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">📸 Photo Booth</h1>
          <p className="text-[var(--text-secondary)] text-sm">Take photos with different frames to find the name!</p>
        </motion.div>

        <div className="text-center">
          <div className="flex justify-center gap-1">
            {["C", "A", "M", "P", "X", "!"].map((letter, i) => (
              <motion.span
                key={i}
                className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm"
                style={{
                  backgroundColor: i < foundLetters.length ? "var(--accent-primary)" : "var(--bg-secondary)",
                  color: i < foundLetters.length ? "white" : "transparent",
                }}
              >
                {i < foundLetters.length ? letter : "?"}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {frames.map((frame) => (
            <motion.button
              key={frame.id}
              whileHover={{ scale: 1.05, rotate: taken.includes(frame.id) ? 0 : [0, -3, 3, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={() => takePhoto(frame)}
              className={`rounded-xl p-4 bg-gradient-to-br ${frame.color} text-center relative overflow-hidden`}
            >
              {taken.includes(frame.id) && (
                <motion.span className="absolute top-1 right-1 text-sm" initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.span>
              )}
              <span className="text-4xl block mb-1">📸</span>
              <p className="text-xs font-bold text-white">{frame.style}</p>
              {taken.includes(frame.id) && (
                <motion.span className="text-lg font-black text-white block" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  {frame.letter}
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>

        <div className="text-center">
          <div className="flex justify-center gap-1">
            {stickers.map((s, i) => (
              <motion.span key={i} className="text-xl" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}>
                {s}
              </motion.span>
            ))}
          </div>
        </div>

        {showing && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-white" />
            <motion.div className="text-center relative z-10" initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <span className="text-6xl block">📸</span>
              <p className="text-xl font-black mt-2">SNAP!</p>
              {activeFrame && <Badge color="accent">{activeFrame.style} Frame</Badge>}
            </motion.div>
          </motion.div>
        )}

        {foundLetters.length >= 5 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">📸</span>
              <h2 className="text-3xl font-black text-[var(--accent-primary)]">CAMPX</h2>
              <p className="text-[var(--text-secondary)] text-sm">All frames captured! Name revealed!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
