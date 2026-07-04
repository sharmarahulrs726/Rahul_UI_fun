import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";

const emojis = [
  { emoji: "🔥", meaning: "Fire" }, { emoji: "💧", meaning: "Water" }, { emoji: "⚡", meaning: "Lightning" },
  { emoji: "🌟", meaning: "Star" }, { emoji: "🎵", meaning: "Music" }, { emoji: "💎", meaning: "Gem" },
  { emoji: "🎯", meaning: "Target" }, { emoji: "🧠", meaning: "Brain" }, { emoji: "🦋", meaning: "Butterfly" },
  { emoji: "🎮", meaning: "Game" }, { emoji: "🚀", meaning: "Rocket" }, { emoji: "🌈", meaning: "Rainbow" },
];

const cipher = [
  { symbol: "🔥⚡💎", answer: "ashish", display: "🔥+⚡+💎" },
];

const puzzleSteps = [
  { q: "Fire + Lightning = ?", a: "🔥⚡", hint: "Combine elements" },
  { q: "Which emoji means brain?", a: "🧠", hint: "Think!" },
  { q: "Star + Music + Gem = ?", a: "🌟🎵💎", hint: "Combine them" },
];

export default function EmojiDecoder() {
  const [stage, setStage] = useState(0);
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState(false);
  const [emojiMap, setEmojiMap] = useState({});

  const handleDecode = () => {
    const answer = input.toLowerCase().trim();
    if (stage < puzzleSteps.length) {
      if (answer === puzzleSteps[stage].a || answer.length > 0) {
        const next = stage + 1;
        setStage(next);
        setInput("");
        if (next === puzzleSteps.length) {
          setTimeout(() => setDecoded(true), 500);
        }
      }
    }
  };

  const toggleMap = (symbol) => {
    setEmojiMap((prev) => {
      const newMap = { ...prev };
      if (newMap[symbol]) {
        delete newMap[symbol];
      } else {
        newMap[symbol] = emojis.find((e) => e.emoji === symbol)?.meaning || symbol;
      }
      return newMap;
    });
  };

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">🔐 Emoji Decoder</h1>
          <p className="text-[var(--text-secondary)] text-sm">Decode the emoji puzzles to find the secret name!</p>
          <p className="text-xs text-[var(--accent-primary)]">Stage: {stage + 1}/{puzzleSteps.length + 1}</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2">
          {emojis.map((e) => (
            <motion.button
              key={e.emoji}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleMap(e.emoji)}
              className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl cursor-pointer relative"
            >
              {e.emoji}
              {emojiMap[e.emoji] && (
                <motion.span initial={{ scale: 0 }} className="absolute -top-2 -right-2 bg-[var(--accent-primary)] text-[8px] px-1 rounded-full text-white">
                  {e.meaning}
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>

        {stage < puzzleSteps.length && (
          <Card className="!p-6 text-center">
            <h3 className="text-lg font-bold mb-2">Puzzle {stage + 1}</h3>
            <p className="text-2xl mb-4">{puzzleSteps[stage].q}</p>
            <p className="text-xs text-[var(--text-secondary)] mb-3">Hint: {puzzleSteps[stage].hint}</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleDecode()}
                placeholder="Type your answer..."
                className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDecode}
                className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-white font-bold text-sm"
              >
                ✓
              </motion.button>
            </div>
          </Card>
        )}

        {stage >= puzzleSteps.length && !decoded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <Card className="!p-6">
              <p className="text-lg">🎉 All puzzles solved! The decoder reveals...</p>
              <div className="mt-4">
                {["A", "S", "H", "I", "S", "H"].map((letter, i) => (
                  <motion.span
                    key={i}
                    className="text-4xl font-black mx-1"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                    style={{ color: "var(--accent-primary)" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {decoded && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">🔓</span>
              <h2 className="text-3xl font-black text-[var(--accent-primary)]">ASHISH</h2>
              <p className="text-[var(--text-secondary)] text-sm">The decoder has spoken!</p>
            </Card>
          </motion.div>
        )}

        <div className="text-center">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setStage(0); setInput(""); setDecoded(false); setEmojiMap({}); }} className="px-4 py-2 rounded-xl glass text-sm font-bold">
            🔄 Reset Decoder
          </motion.button>
        </div>
      </div>
    </PageTransition>
  );
}
