import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

const pairs = [
  { id: 0, pair: 0, emoji: "🐱", label: "Cat" },
  { id: 1, pair: 0, emoji: "🐈", label: "Cat" },
  { id: 2, pair: 1, emoji: "🐶", label: "Dog" },
  { id: 3, pair: 1, emoji: "🐕", label: "Dog" },
  { id: 4, pair: 2, emoji: "🦊", label: "Fox" },
  { id: 5, pair: 2, emoji: "🦊", label: "Fox" },
  { id: 6, pair: 3, emoji: "🐸", label: "Frog" },
  { id: 7, pair: 3, emoji: "🐸", label: "Frog" },
  { id: 8, pair: 4, emoji: "🦄", label: "Uni" },
  { id: 9, pair: 4, emoji: "🦄", label: "Uni" },
  { id: 10, pair: 5, emoji: "🐸", label: "Toad" },
  { id: 11, pair: 5, emoji: "🐸", label: "Toad" },
];

const secretMap = { 0: "N", 2: "A", 4: "M", 6: "A", 8: "N", 10: "!" };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MemoryMatch() {
  const [cards] = useState(() => shuffle(pairs));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [secretLetters, setSecretLetters] = useState([]);

  const handleFlip = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(cards.find((c) => c.id === id)?.pair)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const c1 = cards.find((c) => c.id === newFlipped[0]);
      const c2 = cards.find((c) => c.id === newFlipped[1]);
      if (c1.pair === c2.pair) {
        setMatched((prev) => [...prev, c1.pair]);
        if (secretMap[newFlipped[0]] || secretMap[newFlipped[1]]) {
          const letter = secretMap[newFlipped[0]] || secretMap[newFlipped[1]];
          setSecretLetters((prev) => [...prev, letter]);
        }
        setTimeout(() => setFlipped([]), 500);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const isRevealed = (id) => {
    const card = cards.find((c) => c.id === id);
    return flipped.includes(id) || matched.includes(card?.pair);
  };

  return (
    <PageTransition>
      <div className="max-w-lg mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">🧠 Memory Match</h1>
          <p className="text-[var(--text-secondary)] text-sm">Match pairs to reveal a hidden word!</p>
          <p className="text-xs text-[var(--text-secondary)]">Moves: {moves}</p>
        </motion.div>

        <motion.div className="text-center">
          <p className="text-sm text-[var(--text-secondary)]">Secret Letters: </p>
          <div className="flex justify-center gap-1 mt-1">
            {["N", "A", "M", "A", "N"].map((letter, i) => (
              <motion.span
                key={i}
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-lg"
                initial={{ rotateY: 180 }}
                animate={{ rotateY: secretLetters.includes(letter) ? 0 : 180 }}
                style={{
                  backgroundColor: secretLetters.includes(letter) ? "var(--accent-primary)" : "var(--bg-secondary)",
                  color: secretLetters.includes(letter) ? "white" : "transparent",
                }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {secretLetters.includes(letter) ? letter : "?"}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-4 gap-2">
          {cards.map((card) => (
            <motion.button
              key={card.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFlip(card.id)}
              className={`aspect-square rounded-xl text-3xl font-bold transition-all ${
                isRevealed(card.id)
                  ? "bg-white/10 border-2 border-[var(--accent-primary)]"
                  : "bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--accent-primary)] border-2 border-transparent"
              }`}
            >
              <motion.span
                animate={{ rotateY: isRevealed(card.id) ? 0 : 180 }}
                transition={{ duration: 0.3 }}
                style={{ display: "inline-block" }}
              >
                {isRevealed(card.id) ? card.emoji : "❓"}
              </motion.span>
            </motion.button>
          ))}
        </div>

        {secretLetters.length === 5 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">🎊</span>
              <h2 className="text-3xl font-black text-[var(--accent-primary)]">NAMAN</h2>
              <p className="text-[var(--text-secondary)] text-sm">in {moves} moves!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
