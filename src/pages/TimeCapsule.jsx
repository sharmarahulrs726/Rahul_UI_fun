import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import ProgressBar from "../components/ui/ProgressBar";
import PageTransition from "../components/layout/PageTransition";

const eras = [
  { id: 0, name: "Ancient Egypt", year: "3000 BC", emoji: "🏛️", letter: "G", puzzle: "I built the pyramids! Who am I?" },
  { id: 1, name: "Medieval Times", year: "1000 AD", emoji: "⚔️", letter: "Y", puzzle: "I protect the kingdom with honor!" },
  { id: 2, name: "Renaissance", year: "1500", emoji: "🎨", letter: "A", puzzle: "I paint masterpieces daily!" },
  { id: 3, name: "Industrial Rev", year: "1800", emoji: "⚙️", letter: "N", puzzle: "I built the first steam engine!" },
  { id: 4, name: "Modern Era", year: "2000", emoji: "💻", letter: "!", puzzle: "I code funky UIs!" },
];

export default function TimeCapsule() {
  const [openedEras, setOpenedEras] = useState([]);
  const [activeEra, setActiveEra] = useState(null);
  const [answer, setAnswer] = useState("");

  const openEra = (era) => {
    setActiveEra(era);
  };

  const claimEra = () => {
    if (activeEra && !openedEras.includes(activeEra.id)) {
      setOpenedEras((prev) => [...prev, activeEra.id]);
      setActiveEra(null);
      setAnswer("");
    }
  };

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">⏳ Time Capsule</h1>
          <p className="text-[var(--text-secondary)] text-sm">Travel through time to find the hidden name!</p>
        </motion.div>

        <div className="text-center">
          <div className="flex justify-center gap-1">
            {["G", "Y", "A", "N", "!"].map((letter, i) => (
              <motion.span
                key={i}
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
                animate={{ scale: openedEras.includes(i) ? [1, 1.3, 1] : 1 }}
                style={{
                  backgroundColor: openedEras.includes(i) ? "var(--accent-primary)" : "var(--bg-secondary)",
                  color: openedEras.includes(i) ? "white" : "transparent",
                }}
              >
                {openedEras.includes(i) ? letter : "?"}
              </motion.span>
            ))}
          </div>
        </div>

        <ProgressBar value={openedEras.length} max={eras.length} color="rainbow" height="h-3" label="Time Progress" />

        <div className="space-y-2">
          {eras.map((era) => (
            <motion.div key={era.id} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: era.id * 0.1 }}>
              <Card
                onClick={() => openEra(era)}
                className={`!p-3 cursor-pointer ${openedEras.includes(era.id) ? "border-green-500/30 border" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <motion.span className="text-3xl" animate={openedEras.includes(era.id) ? { rotate: [0, 360] } : {}}>
                    {era.emoji}
                  </motion.span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{era.name}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{era.year}</p>
                  </div>
                  {openedEras.includes(era.id) && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-lg font-black text-green-400">
                      {era.letter}
                    </motion.span>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {activeEra && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <Card className="!p-4">
              <div className="text-center">
                <span className="text-4xl">{activeEra.emoji}</span>
                <h3 className="font-bold mt-2">{activeEra.name}</h3>
                <p className="text-sm text-[var(--text-secondary)] my-2">{activeEra.puzzle}</p>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type anything to claim..."
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] mb-2"
                />
                <div className="flex gap-2 justify-center">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={claimEra} className="px-4 py-2 rounded-xl bg-[var(--accent-primary)] text-white font-bold text-sm">
                    ⏳ Claim Era
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveEra(null)} className="px-4 py-2 rounded-xl glass text-sm">
                    ✕ Close
                  </motion.button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {openedEras.length === eras.length && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">⏳</span>
              <h2 className="text-3xl font-black text-[var(--accent-primary)]">GYAN!</h2>
              <p className="text-[var(--text-secondary)] text-sm">The time capsule reveals all!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
