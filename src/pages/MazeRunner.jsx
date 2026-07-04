import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";

const MAZE_SIZE = 7;
const wall = 1, path = 0, visited = 2;

const mazeLayout = [
  [0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 1],
  [1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];

const goalLetters = { "0-6": "K", "6-6": "R", "6-0": "I", "3-3": "S", "0-0": "H" };

export default function MazeRunner() {
  const [player, setPlayer] = useState({ row: 0, col: 0 });
  const [foundLetters, setFoundLetters] = useState([]);
  const [history, setHistory] = useState([{ row: 0, col: 0 }]);
  const [moves, setMoves] = useState(0);

  const move = (dRow, dCol) => {
    const newRow = player.row + dRow;
    const newCol = player.col + dCol;
    if (newRow < 0 || newRow >= MAZE_SIZE || newCol < 0 || newCol >= MAZE_SIZE) return;
    if (mazeLayout[newRow][newCol] === wall) return;
    const newPos = { row: newRow, col: newCol };
    setPlayer(newPos);
    setMoves((m) => m + 1);
    setHistory((prev) => [...prev.slice(-20), newPos]);
    const key = `${newRow}-${newCol}`;
    if (goalLetters[key] && !foundLetters.includes(goalLetters[key])) {
      setFoundLetters((prev) => [...prev, goalLetters[key]]);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-lg mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">🏰 Maze Runner</h1>
          <p className="text-[var(--text-secondary)] text-sm">Navigate the maze to find hidden letters! Moves: {moves}</p>
        </motion.div>

        <div className="text-center">
          <div className="flex justify-center gap-1">
            {["K", "R", "I", "S", "H"].map((letter, i) => (
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

        <Card className="!p-4">
          <div className="grid grid-cols-7 gap-1 mx-auto" style={{ maxWidth: 280 }}>
            {mazeLayout.map((row, r) =>
              row.map((cell, c) => {
                const isPlayer = player.row === r && player.col === c;
                const isGoal = goalLetters[`${r}-${c}`] && !foundLetters.includes(goalLetters[`${r}-${c}`]);
                const key = `${r}-${c}`;
                const isVisited = history.some((h) => h.row === r && h.col === c);
                return (
                  <div
                    key={key}
                    className={`aspect-square rounded-md flex items-center justify-center text-xs font-bold transition-all ${
                      cell === wall ? "bg-white/20" : isPlayer ? "bg-[var(--accent-primary)]" : isVisited ? "bg-white/10" : "bg-[var(--bg-secondary)]"
                    }`}
                    style={isPlayer ? { boxShadow: "0 0 10px var(--glow-color)" } : {}}
                  >
                    {isPlayer ? "🦸" : isGoal ? "⭐" : ""}
                  </div>
                );
              })
            )}
          </div>
          <p className="text-center text-xs text-[var(--text-secondary)] mt-2">⭐ = hidden letter spot</p>
        </Card>

        <div className="flex justify-center gap-2">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => move(-1, 0)} className="w-12 h-12 rounded-xl glass text-xl">⬆️</motion.button>
        </div>
        <div className="flex justify-center gap-2">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => move(0, -1)} className="w-12 h-12 rounded-xl glass text-xl">⬅️</motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => move(0, 1)} className="w-12 h-12 rounded-xl glass text-xl">➡️</motion.button>
        </div>
        <div className="flex justify-center gap-2">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => move(1, 0)} className="w-12 h-12 rounded-xl glass text-xl">⬇️</motion.button>
        </div>

        {foundLetters.length >= 5 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">🏰</span>
              <h2 className="text-3xl font-black text-[var(--accent-primary)]">KRISH</h2>
              <p className="text-[var(--text-secondary)] text-sm">Maze conquered in {moves} moves!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
