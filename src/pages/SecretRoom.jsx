import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Confetti from "../components/effects/Confetti";
import PageTransition from "../components/layout/PageTransition";
import { useConfetti } from "../hooks/useConfetti";

const items = [
  { id: 1, emoji: "🔮", hint: "Click me...", secret: "✨ The future is FUNKY! ✨", found: false },
  { id: 2, emoji: "🕯️", hint: "Light me up", secret: "🔥 You lit up the darkness!", found: false },
  { id: 3, emoji: "📜", hint: "Read the scroll", secret: "📜 Ancient text: 'CHAOS IS THE WAY'", found: false },
  { id: 4, emoji: "💎", hint: "A shiny gem", secret: "💎 You found the Funky Diamond!", found: false },
  { id: 5, emoji: "🔑", hint: "A mysterious key", secret: "🔑 Unlocks... nothing! But cool anyway!", found: false },
  { id: 6, emoji: "🧿", hint: "The evil eye", secret: "🧿 It winks at you! Ominous...", found: false },
  { id: 7, emoji: "🪄", hint: "A magic wand", secret: "🪄 POOF! You're now a wizard!", found: false },
  { id: 8, emoji: "📦", hint: "A closed box", secret: "📦 It's... another box! 🐢", found: false },
];

const puzzleOrder = [1, 3, 5, 7];

export default function SecretRoom() {
  const [foundStates, setFoundStates] = useState(items.map(() => false));
  const [puzzleStep, setPuzzleStep] = useState(0);
  const [puzzleComplete, setPuzzleComplete] = useState(false);
  const [easterEgg, setEasterEgg] = useState(null);
  const { isActive, fire } = useConfetti();
  const navigate = useNavigate();

  const handleClick = (index) => {
    const newFound = [...foundStates];
    newFound[index] = true;
    setFoundStates(newFound);

    if (puzzleOrder.includes(items[index].id) && items[index].id === puzzleOrder[puzzleStep]) {
      const nextStep = puzzleStep + 1;
      setPuzzleStep(nextStep);
      if (nextStep >= puzzleOrder.length) {
        setPuzzleComplete(true);
        fire();
      }
    }

    setEasterEgg(items[index]);
    setTimeout(() => setEasterEgg(null), 2500);
  };

  const gridItems = puzzleComplete
    ? [...items, { id: 9, emoji: "🚪", hint: "Exit to Finale", secret: "", found: false }]
    : items;

  return (
    <PageTransition>
      <Confetti active={isActive} />
      <div className="max-w-lg mx-auto space-y-6">
        <motion.div
          className="text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-black">🤫 Secret Room</h1>
          <p className="text-[var(--text-secondary)] text-sm">
            {puzzleComplete
              ? "🎉 You solved the mystery! The exit appears!"
              : `Find the hidden items... Progress: ${puzzleStep}/${puzzleOrder.length}`}
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "radial-gradient(circle at 50% 50%, var(--glow-color), transparent 70%)",
              opacity: puzzleComplete ? 0.3 : 0.1,
            }}
            animate={{ scale: puzzleComplete ? [1, 1.1, 1] : [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />

          <div className="relative grid grid-cols-4 gap-3">
            {gridItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: foundStates[index] ? 1 : [1, 0.95, 1],
                  opacity: 1,
                }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                <Card
                  onClick={() => {
                    if (item.id === 9) navigate("/finale");
                    else if (!foundStates[index]) handleClick(index);
                  }}
                  className={`!p-3 text-center cursor-pointer min-h-[80px] flex flex-col items-center justify-center ${
                    foundStates[index] ? "ring-2 ring-[var(--accent-primary)]" : ""
                  } ${puzzleComplete ? "hover:scale-105" : ""}`}
                  glow={foundStates[index]}
                >
                  <motion.span
                    className="text-3xl"
                    animate={!foundStates[index] ? { opacity: [0.5, 1, 0.5] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {item.emoji}
                  </motion.span>
                  <p className="text-[10px] mt-1 text-[var(--text-secondary)]">
                    {foundStates[index] ? "✨ Found!" : item.hint}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {easterEgg && (
          <motion.div
            className="text-center p-4 rounded-xl glass"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <span className="text-2xl">{easterEgg.emoji}</span>
            <p className="text-sm font-bold mt-1" style={{ color: "var(--accent-primary)" }}>
              {easterEgg.secret}
            </p>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
