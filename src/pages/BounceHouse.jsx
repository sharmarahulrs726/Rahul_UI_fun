import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

const balls = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  emoji: ["⚽", "🏀", "🏐", "🎾", "🎯", "🔮", "🎈", "💎", "🪐", "🌕"][i % 10],
  color: `hsl(${Math.random() * 360}, 70%, 60%)`,
}));

const hiddenWord = "RAHUL";

export default function BounceHouse() {
  const [found, setFound] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [hitBounce, setHitBounce] = useState({});

  const handleClick = (id) => {
    setHitBounce((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => setHitBounce((prev) => ({ ...prev, [id]: false })), 600);
  };

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">🎪 Bounce House</h1>
          <p className="text-[var(--text-secondary)] text-sm">Click the bouncing objects! A secret name is hiding somewhere...</p>
          <p className="text-xs text-[var(--accent-primary)] mt-1">Found: {found.length}/{hiddenWord.length} letters</p>
        </motion.div>

        <Card className="!p-4 min-h-[400px] relative overflow-hidden">
          <div className="flex flex-wrap justify-center gap-2">
            {balls.map((ball) => {
              const letterIndex = ball.id;
              const hasLetter = letterIndex < hiddenWord.length;
              const isFound = found.includes(letterIndex);
              return (
                <motion.button
                  key={ball.id}
                  animate={{
                    y: hitBounce[ball.id] ? [0, -40, 0] : [0, -10, 0],
                    rotate: hitBounce[ball.id] ? [0, -10, 10, -10, 0] : [0, 5, -5, 0],
                  }}
                  transition={{
                    y: { repeat: Infinity, duration: 1.5 + Math.random(), ease: "easeInOut" },
                    rotate: { repeat: Infinity, duration: 2 + Math.random() },
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => handleClick(ball.id)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl cursor-pointer transition-all ${
                    isFound ? "ring-2 ring-yellow-400 shadow-[0_0_15px_gold]" : ""
                  }`}
                  style={{ backgroundColor: ball.color }}
                >
                  {showAll && hasLetter ? (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-white font-black">
                      {hiddenWord[letterIndex]}
                    </motion.span>
                  ) : (
                    ball.emoji
                  )}
                </motion.button>
              );
            })}
          </div>

          {found.length === hiddenWord.length && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <span className="text-6xl block mb-2">🎉</span>
                <h2 className="text-3xl font-black text-yellow-400">SECRET NAME FOUND!</h2>
                <p className="text-5xl font-black mt-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {hiddenWord}
                </p>
              </motion.div>
            </motion.div>
          )}
        </Card>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setFound(Array.from({ length: hiddenWord.length }, (_, i) => i));
              setShowAll(true);
            }}
            className="px-4 py-2 rounded-xl glass text-sm font-bold"
          >
            💡 Reveal Answer
          </motion.button>
        </div>
      </div>
    </PageTransition>
  );
}
