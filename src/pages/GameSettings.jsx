import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import Card from "../components/ui/Card";
import Toggle from "../components/ui/Toggle";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

export default function GameSettings() {
  const { chaosMode, toggleChaos } = useTheme();
  const [sound, setSound] = useState(true);
  const [funMode, setFunMode] = useState(true);
  const [vibeMode, setVibeMode] = useState("chill");
  const [volume, setVolume] = useState(75);
  const [difficulty, setDifficulty] = useState(50);

  const vibes = ["chill", "energetic", "chaos", "zen", "retro"];

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto space-y-6">
        <motion.h1
          className="text-3xl font-black text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          ⚙️ Game Settings
        </motion.h1>
        <p className="text-center text-[var(--text-secondary)] text-sm -mt-4">Tweak your experience</p>

        <motion.div
          className="space-y-4"
          variants={staggerContainer}
          initial="initial"
          animate="in"
        >
          <motion.div variants={staggerItem}>
            <Card>
              <h3 className="font-bold mb-3">🎮 Controls</h3>
              <div className="space-y-3">
                <Toggle label="Sound Effects" checked={sound} onChange={() => setSound(!sound)} icon="🔊" />
                <Toggle label="Fun Mode" checked={funMode} onChange={() => setFunMode(!funMode)} icon="🎉" />
                <Toggle label="⚡ Chaos Mode" checked={chaosMode} onChange={toggleChaos} icon="🌀" />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Card>
              <h3 className="font-bold mb-3">🎚️ Levels</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Volume</span>
                    <span className="text-[var(--accent-primary)]">{volume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full accent-[var(--accent-primary)]"
                    style={{
                      background: `linear-gradient(to right, var(--accent-primary) ${volume}%, rgba(255,255,255,0.1) ${volume}%)`,
                      height: 6,
                      borderRadius: 3,
                      WebkitAppearance: "none",
                      appearance: "none",
                      outline: "none",
                    }}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Difficulty</span>
                    <span className="text-[var(--accent-secondary)]">{difficulty}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={difficulty}
                    onChange={(e) => setDifficulty(Number(e.target.value))}
                    className="w-full accent-[var(--accent-secondary)]"
                    style={{
                      background: `linear-gradient(to right, var(--accent-secondary) ${difficulty}%, rgba(255,255,255,0.1) ${difficulty}%)`,
                      height: 6,
                      borderRadius: 3,
                      WebkitAppearance: "none",
                      appearance: "none",
                      outline: "none",
                    }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Card>
              <h3 className="font-bold mb-3">🌈 Vibe Mode</h3>
              <div className="flex flex-wrap gap-2">
                {vibes.map((vibe) => (
                  <motion.button
                    key={vibe}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setVibeMode(vibe)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                      vibeMode === vibe
                        ? "bg-[var(--accent-primary)] text-white shadow-lg"
                        : "glass text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {vibe === "chill" && "😎 "}
                    {vibe === "energetic" && "⚡ "}
                    {vibe === "chaos" && "🌀 "}
                    {vibe === "zen" && "🧘 "}
                    {vibe === "retro" && "🕹️ "}
                    {vibe}
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
