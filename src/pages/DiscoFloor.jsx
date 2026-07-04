import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";

const floor = Array.from({ length: 64 }, (_, i) => ({
  id: i,
  x: i % 8,
  y: Math.floor(i / 8),
  lit: false,
}));

const nameMap = {
  "0-0": "K", "1-1": "R", "2-2": "I", "3-3": "S", "4-4": "H",
};

export default function DiscoFloor() {
  const [tiles, setTiles] = useState(floor);
  const [activeTile, setActiveTile] = useState(null);
  const [foundLetters, setFoundLetters] = useState([]);
  const [sequence, setSequence] = useState([]);
  const targetLetters = ["K", "R", "I", "S", "H"];

  const activateTile = (id) => {
    const tile = tiles.find((t) => t.id === id);
    const key = `${tile.x}-${tile.y}`;
    setTiles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, lit: true } : t))
    );
    setActiveTile(id);
    setSequence((prev) => [...prev.slice(-10), id]);

    if (nameMap[key] && !foundLetters.includes(nameMap[key])) {
      setFoundLetters((prev) => [...prev, nameMap[key]]);
    }

    setTimeout(() => {
      setTiles((prev) =>
        prev.map((t) => (t.id === id ? { ...t, lit: false } : t))
      );
      setActiveTile(null);
    }, 500);
  };

  const activateAll = () => {
    const diagonal = tiles.filter((t) => t.x === t.y);
    diagonal.forEach((t, i) => {
      setTimeout(() => activateTile(t.id), i * 200);
    });
  };

  const randomBurst = () => {
    const randomTiles = [...tiles].sort(() => Math.random() - 0.5).slice(0, 8);
    randomTiles.forEach((t, i) => {
      setTimeout(() => activateTile(t.id), i * 100);
    });
  };

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">🪩 Disco Dance Floor</h1>
          <p className="text-[var(--text-secondary)] text-sm">Step on tiles to reveal the hidden name!</p>
        </motion.div>

        <div className="text-center">
          <div className="flex justify-center gap-1">
            {targetLetters.map((letter, i) => (
              <motion.span
                key={i}
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
                animate={{
                  scale: foundLetters.includes(letter) ? [1, 1.3, 1] : 1,
                  rotate: foundLetters.includes(letter) ? [0, -5, 5, 0] : 0,
                }}
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
          <div className="grid grid-cols-8 gap-1 mx-auto" style={{ maxWidth: 320 }}>
            {tiles.map((tile) => (
              <motion.button
                key={tile.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => activateTile(tile.id)}
                className="aspect-square rounded-md cursor-pointer border border-white/10"
                style={{
                  backgroundColor: tile.lit
                    ? `hsl(${(tile.x * 45 + tile.y * 30) % 360}, 80%, 60%)`
                    : "rgba(255,255,255,0.05)",
                  boxShadow: tile.lit ? `0 0 15px hsl(${(tile.x * 45 + tile.y * 30) % 360}, 80%, 60%)` : "none",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </Card>

        <div className="flex justify-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={activateAll}
            className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-white font-bold text-sm"
          >
            💃 Dance Diagonal
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={randomBurst}
            className="px-4 py-2 rounded-xl bg-[var(--accent-secondary)] text-white font-bold text-sm"
          >
            🎲 Random Burst
          </motion.button>
        </div>

        {foundLetters.length === targetLetters.length && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">🪩</span>
              <h2 className="text-3xl font-black text-[var(--accent-primary)]">KRISH</h2>
              <p className="text-[var(--text-secondary)] text-sm">The disco floor reveals all!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
