import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";

const grid = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  hasTreasure: [12, 34, 56, 78, 90].includes(i),
  emoji: ["🪙", "💰", "💎", "👑", "🗝️"][i % 5],
}));

const nameLetters = ["V", "I", "K", "A", "S", "R", "A", "J"];
const treasureOrder = [12, 34, 56, 78, 90, 23, 45, 67];

export default function TreasureHunt() {
  const [dug, setDug] = useState([]);
  const [foundName, setFoundName] = useState([]);

  const dig = (id) => {
    if (dug.includes(id)) return;
    setDug((prev) => [...prev, id]);
    const cell = grid.find((c) => c.id === id);
    if (cell?.hasTreasure) {
      const letterIdx = treasureOrder.indexOf(id);
      if (letterIdx !== -1 && letterIdx < nameLetters.length) {
        setFoundName((prev) => {
          if (!prev.includes(nameLetters[letterIdx])) {
            return [...prev, nameLetters[letterIdx]];
          }
          return prev;
        });
      }
    }
  };

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">🗺️ Treasure Hunt</h1>
          <p className="text-[var(--text-secondary)] text-sm">Click tiles to dig for treasure! Find the hidden name.</p>
        </motion.div>

        <div className="text-center">
          <p className="text-sm text-[var(--text-secondary)]">Name so far:</p>
          <div className="flex justify-center gap-1 mt-1">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black"
                animate={{ rotateY: foundName.includes(letter) ? 0 : 180 }}
                style={{
                  backgroundColor: foundName.includes(letter) ? "var(--accent-primary)" : "var(--bg-secondary)",
                  color: foundName.includes(letter) ? "white" : "transparent",
                }}
              >
                {foundName.includes(letter) ? letter : "?"}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-10 gap-1">
          {grid.map((cell) => (
            <motion.button
              key={cell.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dig(cell.id)}
              className={`aspect-square rounded-lg text-sm font-bold flex items-center justify-center transition-all ${
                dug.includes(cell.id)
                  ? cell.hasTreasure
                    ? "bg-yellow-500/30 border border-yellow-400"
                    : "bg-white/5 border border-white/10"
                  : "bg-[var(--bg-secondary)] border border-white/5 hover:bg-white/10 cursor-pointer"
              }`}
            >
              {dug.includes(cell.id)
                ? cell.hasTreasure
                  ? cell.emoji
                  : "🕳️"
                : "🟫"}
            </motion.button>
          ))}
        </div>

        {foundName.length === nameLetters.length && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">🏆</span>
              <h2 className="text-3xl font-black text-yellow-400">VIKAS RAJ</h2>
              <p className="text-[var(--text-secondary)] text-sm">Treasure collected!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
