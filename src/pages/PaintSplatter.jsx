import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";

const splatters = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  color: `hsl(${Math.random() * 360}, 80%, 60%)`,
  size: 40 + Math.random() * 60,
  x: 10 + (i % 5) * 18 + Math.random() * 5,
  y: 10 + Math.floor(i / 5) * 18 + Math.random() * 5,
  letter: ["C", "A", "M", "P", "X", "I", "S", "C", "O", "O", "L"][i % 11],
  isHidden: i < 5,
}));

export default function PaintSplatter() {
  const [splashed, setSplashed] = useState([]);
  const [foundLetters, setFoundLetters] = useState([]);
  const targetLetters = ["C", "A", "M", "P", "X"];

  const splash = (id) => {
    if (splashed.includes(id)) return;
    setSplashed((prev) => [...prev, id]);
    const sp = splatters.find((s) => s.id === id);
    if (sp?.isHidden && targetLetters.includes(sp.letter)) {
      setFoundLetters((prev) => {
        if (!prev.includes(sp.letter)) return [...prev, sp.letter];
        return prev;
      });
    }
  };

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">🎨 Paint Splatter</h1>
          <p className="text-[var(--text-secondary)] text-sm">Click the canvas to splash paint! Find the hidden name.</p>
        </motion.div>

        <div className="text-center">
          <div className="flex justify-center gap-1">
            {targetLetters.map((letter, i) => (
              <motion.span
                key={i}
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
                animate={{ scale: foundLetters.includes(letter) ? [1, 1.3, 1] : 1 }}
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

        <Card className="!p-4 relative overflow-hidden min-h-[300px]">
          {splatters.map((sp) => (
            <motion.button
              key={sp.id}
              onClick={() => splash(sp.id)}
              className="absolute rounded-full cursor-pointer flex items-center justify-center"
              style={{
                left: `${sp.x}%`,
                top: `${sp.y}%`,
                width: sp.size,
                height: sp.size,
                backgroundColor: splashed.includes(sp.id) ? sp.color : "rgba(255,255,255,0.05)",
                border: splashed.includes(sp.id) ? `2px solid ${sp.color}` : "2px dashed rgba(255,255,255,0.1)",
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              animate={splashed.includes(sp.id) ? {
                scale: [0, 1.5, 1],
                rotate: [0, -20, 20, 0],
              } : {}}
              transition={{ duration: 0.5 }}
            >
              {splashed.includes(sp.id) && (
                <motion.span
                  className="text-white font-black text-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                >
                  {sp.letter}
                </motion.span>
              )}
            </motion.button>
          ))}
        </Card>

        {foundLetters.length === targetLetters.length && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">🎨</span>
              <h2 className="text-3xl font-black text-[var(--accent-primary)]">CAMPX</h2>
              <p className="text-[var(--text-secondary)] text-sm">Splattered into existence!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
