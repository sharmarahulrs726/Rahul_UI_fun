import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";

const keys = [
  { note: "C", freq: 262, key: "a", color: "#ff6b9d" },
  { note: "D", freq: 294, key: "s", color: "#7b61ff" },
  { note: "E", freq: 330, key: "d", color: "#00d4ff" },
  { note: "F", freq: 349, key: "f", color: "#ffd700" },
  { note: "G", freq: 392, key: "g", color: "#ff4500" },
  { note: "A", freq: 440, key: "h", color: "#00ff88" },
  { note: "B", freq: 494, key: "j", color: "#ff00ff" },
  { note: "C5", freq: 523, key: "k", color: "#ff6b9d" },
];

const song = ["E", "E", "F", "G", "G", "F", "E", "D", "C", "C", "D", "E", "E", "D", "D"];
const nameSequence = ["R", "A", "M"];

export default function MusicBox() {
  const [playing, setPlaying] = useState(null);
  const [melody, setMelody] = useState([]);
  const [foundLetters, setFoundLetters] = useState([]);
  const [autoPlay, setAutoPlay] = useState(false);

  const playNote = (note, freq) => {
    setPlaying(note);
    setMelody((prev) => {
      const newMelody = [...prev, note];
      if (newMelody.length > 20) return newMelody.slice(-20);
      return newMelody;
    });
    if (nameSequence.includes(note) && !foundLetters.includes(note)) {
      setFoundLetters((prev) => [...prev, note]);
    }
    setTimeout(() => setPlaying(null), 300);
  };

  const playAuto = async () => {
    if (autoPlay) return;
    setAutoPlay(true);
    setMelody([]);
    setFoundLetters([]);
    for (let i = 0; i < song.length; i++) {
      const key = keys.find((k) => k.note === song[i]);
      if (key) {
        setPlaying(song[i]);
        setMelody((prev) => [...prev, song[i]]);
        if (nameSequence.includes(song[i]) && !foundLetters.includes(song[i])) {
          setFoundLetters((prev) => [...prev, song[i]]);
        }
        await new Promise((r) => setTimeout(r, 400));
        setPlaying(null);
      }
    }
    setAutoPlay(false);
  };

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">🎹 Music Box</h1>
          <p className="text-[var(--text-secondary)] text-sm">Play the piano to reveal a secret name!</p>
        </motion.div>

        <div className="text-center">
          <div className="flex justify-center gap-1">
            {nameSequence.map((letter, i) => (
              <motion.span
                key={i}
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
                animate={{ scale: foundLetters.includes(letter) ? [1, 1.2, 1] : 1 }}
                style={{
                  backgroundColor: foundLetters.includes(letter) ? "var(--accent-primary)" : "var(--bg-secondary)",
                  color: foundLetters.includes(letter) ? "white" : "var(--text-secondary)",
                }}
              >
                {foundLetters.includes(letter) ? letter : "?"}
              </motion.span>
            ))}
          </div>
        </div>

        <Card className="!p-4">
          <div className="relative h-40 flex items-end justify-center gap-1">
            {keys.map((k, i) => {
              const isBlack = ["C#", "D#", "F#", "G#", "A#"].includes(k.note);
              return (
                <motion.button
                  key={k.key}
                  onMouseDown={() => playNote(k.note, k.freq)}
                  whileHover={{ scaleY: 0.95 }}
                  whileTap={{ scaleY: 0.9 }}
                  className="relative flex flex-col items-center justify-end"
                  style={{
                    width: 50,
                    height: isBlack ? 100 : 150,
                    backgroundColor: playing === k.note ? k.color : "var(--bg-secondary)",
                    border: `2px solid ${playing === k.note ? k.color : "var(--border-color)"}`,
                    borderRadius: "0 0 8px 8px",
                    transition: "background-color 0.15s",
                  }}
                >
                  <span className="text-xs font-bold mb-1 opacity-50">{k.key.toUpperCase()}</span>
                  {playing === k.note && (
                    <motion.span
                      className="absolute -top-4 text-2xl"
                      initial={{ scale: 0, y: 10 }}
                      animate={{ scale: 1, y: -20, opacity: [1, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      ♪
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </Card>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={playAuto}
            disabled={autoPlay}
            className={`px-6 py-2 rounded-xl font-bold text-sm ${autoPlay ? "bg-white/20 text-[var(--text-secondary)]" : "bg-[var(--accent-primary)] text-white"}`}
          >
            {autoPlay ? "🎵 Playing..." : "🎶 Auto Play Melody"}
          </motion.button>
        </div>

        <Card className="!p-3">
          <p className="text-xs text-[var(--text-secondary)] mb-1">Melody:</p>
          <div className="flex flex-wrap gap-1">
            {melody.map((note, i) => (
              <motion.span
                key={i}
                className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                style={{ backgroundColor: "var(--accent-primary)", color: "white" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {note}
              </motion.span>
            ))}
          </div>
        </Card>

        {foundLetters.length === nameSequence.length && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">🎵</span>
              <h2 className="text-3xl font-black text-[var(--accent-primary)]">RAM</h2>
              <p className="text-[var(--text-secondary)] text-sm">The melody reveals the name!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
