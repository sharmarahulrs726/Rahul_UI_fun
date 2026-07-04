import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Card from "../components/ui/Card";
import ProgressBar from "../components/ui/ProgressBar";
import PageTransition from "../components/layout/PageTransition";

const secretText = "GYAN IS THE LEGEND OF THIS FUNKY PLAYGROUND";

export default function TypingRace() {
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [done, setDone] = useState(false);
  const [foundName, setFoundName] = useState(false);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (started && !done) {
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [started, done]);

  useEffect(() => {
    if (started && input.toLowerCase().includes("gyan")) {
      setFoundName(true);
    }
    if (started && input.length >= secretText.length) {
      setDone(true);
      clearInterval(timerRef.current);
    }
  }, [input, started]);

  const start = () => {
    setInput("");
    setTime(0);
    setDone(false);
    setFoundName(false);
    setStarted(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const accuracy = input.length > 0
    ? Math.round(
        input.split("").filter((c, i) => c === secretText[i]).length / input.length * 100
      )
    : 0;

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">⌨️ Typing Race</h1>
          <p className="text-[var(--text-secondary)] text-sm">Type fast to find the hidden name!</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <Card className="!p-3">
            <p className="text-xs text-[var(--text-secondary)]">⏱ Time</p>
            <p className="text-xl font-black text-[var(--accent-primary)]">{time}s</p>
          </Card>
          <Card className="!p-3">
            <p className="text-xs text-[var(--text-secondary)]">🎯 Accuracy</p>
            <p className="text-xl font-black text-[var(--accent-tertiary)]">{accuracy}%</p>
          </Card>
          <Card className="!p-3">
            <p className="text-xs text-[var(--text-secondary)]">📝 Progress</p>
            <p className="text-xl font-black text-[var(--accent-secondary)]">{input.length}/{secretText.length}</p>
          </Card>
        </div>

        <ProgressBar value={input.length} max={secretText.length} color="rainbow" height="h-4" showValue={false} />

        <Card className="!p-4">
          <p className="text-xs text-[var(--text-secondary)] mb-2">Type this (hint: there's a name hidden in it):</p>
          <div className="text-lg tracking-wide">
            {secretText.split("").map((char, i) => {
              let color = "var(--text-secondary)";
              if (i < input.length) {
                color = input[i] === char ? "green" : "red";
              }
              if (char === "G" || char === "Y" || char === "A" || char === "N") {
                color = foundName ? "var(--accent-primary)" : (i < input.length ? (input[i] === char ? "green" : "red") : "var(--text-secondary)");
              }
              return (
                <span key={i} style={{ color, transition: "color 0.2s" }}>
                  {char}
                </span>
              );
            })}
          </div>
        </Card>

        {!started && (
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={start}
              className="px-8 py-3 rounded-xl bg-[var(--accent-primary)] text-white font-bold text-lg"
            >
              🏁 Start Typing!
            </motion.button>
          </div>
        )}

        {started && !done && (
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--accent-primary)] resize-none"
            placeholder="Start typing here..."
          />
        )}

        {foundName && !done && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <p className="text-lg font-bold text-[var(--accent-primary)]">✨ You found: GYAN ✨</p>
          </motion.div>
        )}

        {done && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">🏆</span>
              <h2 className="text-2xl font-black">FINISHED!</h2>
              <p className="text-[var(--text-secondary)]">Time: {time}s • Accuracy: {accuracy}%</p>
              <p className="text-xl font-black text-[var(--accent-primary)] mt-2">Hidden Name: GYAN</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={start} className="mt-3 px-6 py-2 rounded-xl bg-[var(--accent-primary)] text-white font-bold text-sm">
                🔄 Race Again
              </motion.button>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
