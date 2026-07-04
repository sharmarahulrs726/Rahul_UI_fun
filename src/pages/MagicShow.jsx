import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";

const tricks = [
  { id: 1, title: "Vanishing Act", reveal: "V", emoji: "🎩" },
  { id: 2, title: "Card Pull", reveal: "I", emoji: "🃏" },
  { id: 3, title: "Coin Trick", reveal: "K", emoji: "🪙" },
  { id: 4, title: "Rope Escape", reveal: "A", emoji: "🪢" },
  { id: 5, title: "Mirror Illusion", reveal: "S", emoji: "🪞" },
  { id: 6, title: "Floating Ball", reveal: "S", emoji: "🔮" },
  { id: 7, title: "Mind Read", reveal: "A", emoji: "🧠" },
  { id: 8, title: "Final Reveal", reveal: "N", emoji: "✨" },
  { id: 9, title: "Time Stop", reveal: "G", emoji: "⏱️" },
];

export default function MagicShow() {
  const [completed, setCompleted] = useState([]);
  const [activeTrick, setActiveTrick] = useState(null);
  const [showing, setShowing] = useState(false);

  const doTrick = async (trick) => {
    if (completed.includes(trick.id)) return;
    setActiveTrick(trick);
    setShowing(true);
    await new Promise((r) => setTimeout(r, 2000));
    setCompleted((prev) => [...prev, trick.id]);
    setShowing(false);
    setActiveTrick(null);
  };

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">🎩 Magic Show</h1>
          <p className="text-[var(--text-secondary)] text-sm">Perform tricks to reveal the hidden name!</p>
        </motion.div>

        <div className="text-center">
          <div className="flex justify-center gap-1">
            {tricks.map((trick) => (
              <motion.span
                key={trick.id}
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
                animate={{ rotateY: completed.includes(trick.id) ? 0 : 180 }}
                style={{
                  backgroundColor: completed.includes(trick.id) ? "var(--accent-primary)" : "var(--bg-secondary)",
                  color: completed.includes(trick.id) ? "white" : "transparent",
                }}
              >
                {completed.includes(trick.id) ? trick.reveal : "?"}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {tricks.map((trick) => (
            <motion.button
              key={trick.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => doTrick(trick)}
              disabled={completed.includes(trick.id)}
              className={`p-3 rounded-xl text-center ${
                completed.includes(trick.id)
                  ? "bg-green-500/20 border border-green-500/30"
                  : "glass hover:bg-white/10"
              }`}
            >
              <motion.span className="text-3xl block" animate={completed.includes(trick.id) ? { rotate: [0, 360] } : {}} transition={{ duration: 0.5 }}>
                {trick.emoji}
              </motion.span>
              <p className="text-xs font-bold mt-1">{trick.title}</p>
              {completed.includes(trick.id) && (
                <motion.span initial={{ scale: 0 }} className="text-lg font-black text-green-400 block">{trick.reveal}</motion.span>
              )}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {showing && activeTrick && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="text-center" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} transition={{ type: "spring", stiffness: 200 }}>
                <motion.span className="text-8xl block" animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>
                  {activeTrick.emoji}
                </motion.span>
                <p className="text-2xl font-black text-white mt-4">{activeTrick.title}</p>
                <p className="text-sm text-[var(--text-secondary)]">Performing...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {completed.length === tricks.length && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">🎩</span>
              <h2 className="text-3xl font-black text-[var(--accent-primary)]">VIKASSANG</h2>
              <p className="text-[var(--text-secondary)] text-sm">The magic reveals the name!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
