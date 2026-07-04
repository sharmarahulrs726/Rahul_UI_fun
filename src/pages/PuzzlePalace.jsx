import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";

const pieces = [
  { id: 0, row: 0, col: 0, letter: "S", bg: "from-red-400 to-red-600" },
  { id: 1, row: 0, col: 1, letter: "H", bg: "from-orange-400 to-orange-600" },
  { id: 2, row: 0, col: 2, letter: "A", bg: "from-yellow-400 to-yellow-600" },
  { id: 3, row: 1, col: 0, letter: "M", bg: "from-green-400 to-green-600" },
  { id: 4, row: 1, col: 1, letter: "?", bg: "from-blue-400 to-blue-600" },
  { id: 5, row: 1, col: 2, letter: "?", bg: "from-indigo-400 to-indigo-600" },
  { id: 6, row: 2, col: 0, letter: "?", bg: "from-purple-400 to-purple-600" },
  { id: 7, row: 2, col: 1, letter: "?", bg: "from-pink-400 to-pink-600" },
  { id: 8, row: 2, col: 2, letter: "?", bg: "from-rose-400 to-rose-600" },
];

export default function PuzzlePalace() {
  const [placed, setPlaced] = useState([0, 1, 2, 3]);
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState(false);

  const clickPiece = (id) => {
    if (selected === null) {
      setSelected(id);
    } else if (selected === id) {
      setSelected(null);
    } else {
      setPlaced((prev) => {
        if (prev.includes(id) && prev.includes(selected)) return prev;
        return [...new Set([...prev, selected, id])];
      });
      setSelected(null);
      if (placed.length >= 7) {
        setSolved(true);
      }
    }
  };

  return (
    <PageTransition>
      <div className="max-w-lg mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">🧩 Puzzle Palace</h1>
          <p className="text-[var(--text-secondary)] text-sm">Click pieces to reveal the puzzle! Find the hidden name.</p>
        </motion.div>

        <div className="text-center">
          <div className="flex justify-center gap-1">
            {["S", "H", "A", "M"].map((letter, i) => (
              <motion.span
                key={i}
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
                animate={{ scale: i < placed.length ? [1, 1.2, 1] : 1 }}
                style={{
                  backgroundColor: i < placed.length ? "var(--accent-primary)" : "var(--bg-secondary)",
                  color: i < placed.length ? "white" : "transparent",
                }}
              >
                {i < placed.length ? letter : "?"}
              </motion.span>
            ))}
          </div>
        </div>

        <Card className="!p-4">
          <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
            {pieces.map((piece) => (
              <motion.button
                key={piece.id}
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => clickPiece(piece.id)}
                className={`aspect-square rounded-xl flex items-center justify-center font-black text-xl bg-gradient-to-br ${piece.bg} ${
                  selected === piece.id ? "ring-4 ring-white" : ""
                } ${placed.includes(piece.id) ? "opacity-100" : "opacity-30"}`}
                animate={placed.includes(piece.id) ? {} : { rotateY: [0, 180, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                {placed.includes(piece.id) ? piece.letter : "❓"}
              </motion.button>
            ))}
          </div>
          <p className="text-center text-xs text-[var(--text-secondary)] mt-3">
            Click pieces to place them. {placed.length}/9 placed.
          </p>
        </Card>

        {solved && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">🧩</span>
              <h2 className="text-3xl font-black text-[var(--accent-primary)]">SHAM</h2>
              <p className="text-[var(--text-secondary)] text-sm">Puzzle complete! Name revealed!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
