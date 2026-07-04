import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";

const slots = ["🍒", "🍋", "⭐", "💎", "7️⃣", "🃏", "🎰", "🔔"];
const secretLetters = [
  { combo: "💎💎💎", letter: "N" },
  { combo: "7️⃣7️⃣7️⃣", letter: "A" },
  { combo: "⭐⭐⭐", letter: "M" },
  { combo: "🍒🍒🍒", letter: "A" },
  { combo: "🃏🃏🃏", letter: "N" },
];

export default function CasinoRoyale() {
  const [reels, setReels] = useState(["🍒", "🍋", "⭐"]);
  const [spinning, setSpinning] = useState(false);
  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(10);
  const [foundLetters, setFoundLetters] = useState([]);
  const [wins, setWins] = useState(0);

  const spin = () => {
    if (spinning || balance < bet) return;
    setSpinning(true);
    setBalance((b) => b - bet);

    const newReels = Array.from({ length: 3 }, () => slots[Math.floor(Math.random() * slots.length)]);
    let spinCount = 0;
    const interval = setInterval(() => {
      setReels(Array.from({ length: 3 }, () => slots[Math.floor(Math.random() * slots.length)]));
      spinCount++;
      if (spinCount > 15) {
        clearInterval(interval);
        setReels(newReels);
        setSpinning(false);
        const combo = newReels.join("");
        const match = secretLetters.find((s) => s.combo === combo);
        if (match) {
          setFoundLetters((prev) => [...prev, match.letter]);
          setBalance((b) => b + bet * 3);
          setWins((w) => w + 1);
        }
        if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
          setBalance((b) => b + bet * 2);
        }
      }
    }, 80);
  };

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">🎰 Casino Royale</h1>
          <p className="text-[var(--text-secondary)] text-sm">Spin the slots! Match combos to find hidden letters.</p>
        </motion.div>

        <div className="text-center">
          <div className="flex justify-center gap-1">
            {["N", "A", "M", "A", "N"].map((letter, i) => (
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

        <Card className="!p-6 text-center" glow>
          <div className="flex justify-center gap-3 mb-4">
            {reels.map((reel, i) => (
              <motion.div
                key={i}
                className="w-20 h-20 rounded-xl bg-black/50 border-2 border-yellow-500/50 flex items-center justify-center text-4xl"
                animate={spinning ? { rotateX: [0, 360] } : {}}
                transition={{ repeat: spinning ? Infinity : 0, duration: 0.3 }}
              >
                {reel}
              </motion.div>
            ))}
          </div>
          <p className="text-lg font-bold">💰 {balance} coins</p>
        </Card>

        <div className="flex justify-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={spin}
            disabled={spinning || balance < bet}
            className={`px-8 py-3 rounded-xl font-bold text-lg ${spinning || balance < bet ? "bg-white/20" : "bg-yellow-500 text-black"}`}
          >
            {spinning ? "🌀 Spinning..." : `🎰 Spin (${bet} coins)`}
          </motion.button>
        </div>

        <Card className="!p-3 text-center">
          <p className="text-xs text-[var(--text-secondary)]">Match 3 same symbols for secret letters!</p>
          <p className="text-xs text-[var(--text-secondary)]">💎💎💎=N • 7️⃣7️⃣7️⃣=A • ⭐⭐⭐=M • 🍒🍒🍒=A • 🃏🃏🃏=N</p>
        </Card>

        {foundLetters.length >= 5 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">🎰</span>
              <h2 className="text-3xl font-black text-yellow-400">NAMAN</h2>
              <p className="text-[var(--text-secondary)] text-sm">Jackpot! {wins} wins!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
