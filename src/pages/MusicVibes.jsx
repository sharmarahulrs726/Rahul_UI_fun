import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

const playlists = [
  { name: "Chill Vibes", emoji: "😌", count: 12, color: "from-cyan-400 to-blue-500" },
  { name: "Party Mix", emoji: "🎉", count: 8, color: "from-red-400 to-orange-500" },
  { name: "Late Night", emoji: "🌙", count: 15, color: "from-purple-400 to-indigo-500" },
  { name: "Focus Flow", emoji: "🧠", count: 10, color: "from-green-400 to-emerald-500" },
  { name: "Retro Wave", emoji: "🌊", count: 7, color: "from-pink-400 to-rose-500" },
];

const moods = ["Happy", "Energetic", "Calm", "Focused", "Nostalgic"];

export default function MusicVibes() {
  const [currentMood, setCurrentMood] = useState("Happy");
  const [playing, setPlaying] = useState(false);

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto space-y-6">
        <motion.h1
          className="text-3xl font-black text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          🎵 Music Vibes
        </motion.h1>

        <motion.div
          className="flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="relative">
            <motion.div
              className="w-40 h-40 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center"
              animate={playing ? { rotate: 360 } : {}}
              transition={{ repeat: playing ? Infinity : 0, duration: 4, ease: "linear" }}
            >
              <div className="w-32 h-32 rounded-full bg-[var(--bg-primary)] flex items-center justify-center">
                <span className="text-5xl">💿</span>
              </div>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setPlaying(!playing)}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[var(--accent-primary)] text-white font-bold text-sm"
            >
              {playing ? "⏸ Pause" : "▶ Play"}
            </motion.button>
          </div>
        </motion.div>

        {playing && (
          <div className="flex justify-center gap-1 h-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="w-2 rounded-full"
                style={{ background: "var(--accent-primary)" }}
                animate={{ height: [8, 30 + Math.random() * 20, 8] }}
                transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5, delay: i * 0.1 }}
              />
            ))}
          </div>
        )}

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="in"
          className="space-y-3"
        >
          <h3 className="font-bold">Moods</h3>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <motion.button
                key={mood}
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentMood(mood)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  currentMood === mood
                    ? "bg-[var(--accent-primary)] text-white"
                    : "glass text-[var(--text-secondary)]"
                }`}
              >
                {mood}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div>
          <h3 className="font-bold mb-3">📋 Playlists</h3>
          <motion.div
            className="space-y-2"
            variants={staggerContainer}
            initial="initial"
            animate="in"
          >
            {playlists.map((pl) => (
              <motion.div key={pl.name} variants={staggerItem}>
                <Card className="!p-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pl.color} flex items-center justify-center text-xl`}>
                      {pl.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{pl.name}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{pl.count} tracks</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-[var(--accent-primary)]"
                    >
                      ▶
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
