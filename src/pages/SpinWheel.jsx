import { motion } from "framer-motion";
import { useState, useRef } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";

const segments = [
  { label: "Rahul", color: "#ff6b9d", angle: 45 },
  { label: "???1", color: "#7b61ff", angle: 45 },
  { label: "SHIVASH", color: "#ffd700", angle: 45 },
  { label: "???2", color: "#00d4ff", angle: 45 },
  { label: "???3", color: "#ff4500", angle: 45 },
  { label: "???4", color: "#00ff88", angle: 45 },
  { label: "SHAM", color: "#ff6b9d", angle: 45 },
  { label: "???5", color: "#ff00ff", angle: 45 },
];

export default function SpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [spins, setSpins] = useState(0);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    const newRot = rotation + 1440 + Math.random() * 360;
    setRotation(newRot);
    setSpins((s) => s + 1);
    setTimeout(() => {
      const normalized = (newRot % 360);
      const idx = Math.floor(((360 - normalized + 22.5) % 360) / 45) % segments.length;
      setResult(segments[idx].label);
      setSpinning(false);
    }, 4000);
  };

  return (
    <PageTransition>
      <div className="max-w-lg mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">🎡 Spin Wheel</h1>
          <p className="text-[var(--text-secondary)] text-sm">Spin to find the hidden names!</p>
          <p className="text-xs text-[var(--text-secondary)]">Spins: {spins}</p>
        </motion.div>

        <div className="relative w-72 h-72 mx-auto">
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-[var(--accent-primary)]"
            animate={{ rotate: rotation }}
            transition={{ duration: 4, ease: [0.17, 0.67, 0.12, 0.99] }}
          >
            {segments.map((seg, i) => (
              <div
                key={i}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${i * 45}deg)`,
                  clipPath: "polygon(50% 50%, 50% 0%, 75% 0%)",
                  backgroundColor: seg.color,
                  opacity: 0.8,
                }}
              >
                <span
                  className="absolute text-[10px] font-black text-white"
                  style={{
                    top: "25%",
                    left: "55%",
                    transform: "rotate(22.5deg)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {seg.label}
                </span>
              </div>
            ))}
          </motion.div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-3xl z-10">📍</div>
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={spin}
            disabled={spinning}
            className={`px-8 py-3 rounded-xl font-bold text-lg ${
              spinning ? "bg-white/20 text-[var(--text-secondary)]" : "bg-[var(--accent-primary)] text-white"
            }`}
          >
            {spinning ? "🌀 Spinning..." : "🎡 SPIN!"}
          </motion.button>
        </div>

        {result && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-4">
              <p className="text-sm text-[var(--text-secondary)]">Landed on:</p>
              <p className="text-2xl font-black text-[var(--accent-primary)]">{result}</p>
              {(result === "SHIVASH" || result === "SHAM") && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-yellow-400 mt-1">
                  ✨ A name has been revealed!
                </motion.p>
              )}
            </Card>
          </motion.div>
        )}

        <Card className="!p-4">
          <h3 className="font-bold text-sm mb-2">🎯 Names Found</h3>
          <div className="flex flex-wrap gap-2">
            {["SHIVASH", "SHAM"].map((name) => (
              <motion.span
                key={name}
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: "var(--accent-primary)", color: "white" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
