import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import PageTransition from "../components/layout/PageTransition";

const sports = [
  { id: 0, name: "Sprint 100m", emoji: "🏃", score: 9.58, maxScore: 10, letter: "R" },
  { id: 1, name: "High Jump", emoji: "🏋️", score: 2.45, maxScore: 3, letter: "A" },
  { id: 2, name: "Long Jump", emoji: "🦘", score: 8.95, maxScore: 10, letter: "M" },
  { id: 3, name: "110m Hurdles", emoji: "障碍", score: 12.92, maxScore: 15, letter: "💪" },
  { id: 4, name: "Javelin", emoji: "🏹", score: 98.48, maxScore: 100, letter: "O" },
];

export default function SportsArena() {
  const [activeSport, setActiveSport] = useState(null);
  const [scores, setScores] = useState({});
  const [foundLetters, setFoundLetters] = useState([]);

  const compete = (sport) => {
    const randomScore = Math.random() * sport.maxScore;
    const success = randomScore > sport.maxScore * 0.7;
    setScores((prev) => ({ ...prev, [sport.id]: { value: randomScore.toFixed(2), success } }));
    if (success && sport.letter && !foundLetters.includes(sport.letter)) {
      setFoundLetters((prev) => [...prev, sport.letter]);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">🏟️ Sports Arena</h1>
          <p className="text-[var(--text-secondary)] text-sm">Compete in events to find hidden letters!</p>
        </motion.div>

        <div className="text-center">
          <div className="flex justify-center gap-1">
            {["R", "A", "M"].map((letter, i) => (
              <motion.span
                key={i}
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
                animate={{ scale: foundLetters.includes(letter) ? [1, 1.3, 1] : 1 }}
                style={{
                  backgroundColor: foundLetters.includes(letter) ? "var(--accent-primary)" : "var(--bg-secondary)",
                  color: foundLetters.includes(letter) ? "white" : "transparent",
                }}
              >
                {foundLetters.includes(letter) ? letter : "?"}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {sports.map((sport) => (
            <motion.div key={sport.id} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: sport.id * 0.1 }}>
              <Card className="!p-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{sport.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{sport.name}</p>
                    {scores[sport.id] && (
                      <p className={`text-xs ${scores[sport.id].success ? "text-green-400" : "text-red-400"}`}>
                        Score: {scores[sport.id].value} {scores[sport.id].success ? "🏆" : "💪"}
                      </p>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => compete(sport)}
                    className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-white font-bold text-sm"
                  >
                    Compete!
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {foundLetters.length >= 3 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">🏆</span>
              <h2 className="text-3xl font-black text-[var(--accent-primary)]">RAM</h2>
              <p className="text-[var(--text-secondary)] text-sm">Champion of the arena!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
