import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";

const artworks = [
  { id: 1, title: "Starry Night Remix", artist: "A", color: "from-blue-500 to-purple-600", shapes: "circles" },
  { id: 2, title: "Neon Dreams", artist: "S", color: "from-pink-500 to-rose-600", shapes: "squares" },
  { id: 3, title: "Pixel Paradise", artist: "H", color: "from-green-500 to-teal-600", shapes: "triangles" },
  { id: 4, title: "Chaos Theory", artist: "I", color: "from-orange-500 to-red-600", shapes: "waves" },
  { id: 5, title: "Digital Sunset", artist: "S", color: "from-yellow-500 to-orange-600", shapes: "circles" },
  { id: 6, title: "Void Walker", artist: "H", color: "from-indigo-500 to-violet-600", shapes: "squares" },
];

export default function ArtGallery() {
  const [viewed, setViewed] = useState([]);
  const [activeArt, setActiveArt] = useState(null);

  const viewArt = (art) => {
    setActiveArt(art);
    if (!viewed.includes(art.id)) {
      setViewed((prev) => [...prev, art.id]);
    }
  };

  const foundLetters = artworks.filter((a) => viewed.includes(a.id)).map((a) => a.artist);

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">🎨 Art Gallery</h1>
          <p className="text-[var(--text-secondary)] text-sm">View all artworks to reveal the hidden name!</p>
        </motion.div>

        <div className="text-center">
          <div className="flex justify-center gap-1">
            {["A", "S", "H", "I", "S", "H"].map((letter, i) => (
              <motion.span
                key={i}
                className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm"
                animate={{ scale: foundLetters.includes(letter) ? [1, 1.2, 1] : 1 }}
                style={{
                  backgroundColor: i < foundLetters.length ? "var(--accent-primary)" : "var(--bg-secondary)",
                  color: i < foundLetters.length ? "white" : "transparent",
                }}
              >
                {i < foundLetters.length ? letter : "?"}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {artworks.map((art) => (
            <motion.div
              key={art.id}
              whileHover={{ scale: 1.03, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
            >
              <Card onClick={() => viewArt(art)} className="!p-0 overflow-hidden cursor-pointer">
                <div className={`h-32 bg-gradient-to-br ${art.color} flex items-center justify-center relative`}>
                  {art.shapes === "circles" && [0, 1, 2].map((i) => (
                    <motion.div key={i} className="absolute w-8 h-8 rounded-full bg-white/20" style={{ left: `${20 + i * 25}%`, top: `${20 + i * 15}%` }} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }} />
                  ))}
                  {art.shapes === "squares" && [0, 1, 2].map((i) => (
                    <motion.div key={i} className="absolute w-6 h-6 bg-white/20" style={{ left: `${15 + i * 30}%`, top: `${30 + i * 10}%`, transform: `rotate(${i * 30}deg)` }} animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 3 + i }} />
                  ))}
                  {art.shapes === "triangles" && [0, 1, 2].map((i) => (
                    <motion.div key={i} className="absolute text-white/30 text-2xl" style={{ left: `${20 + i * 25}%`, top: `${25 + i * 10}%` }} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}>
                      ▲
                    </motion.div>
                  ))}
                  {art.shapes === "waves" && [0, 1, 2].map((i) => (
                    <motion.div key={i} className="absolute w-12 h-4 rounded-full bg-white/20" style={{ left: `${10 + i * 25}%`, top: `${30 + i * 15}%` }} animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 + i * 0.5 }} />
                  ))}
                  <span className="text-4xl relative z-10">🖼️</span>
                </div>
                <div className="p-3">
                  <p className="font-bold text-sm">{art.title}</p>
                  <p className="text-xs text-[var(--text-secondary)]">by Artist {art.artist}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {activeArt && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <Card className="!p-4 text-center">
              <p className="text-lg font-bold">{activeArt.title}</p>
              <p className="text-sm text-[var(--text-secondary)]">Discovered letter: <strong className="text-[var(--accent-primary)]">{activeArt.artist}</strong></p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveArt(null)} className="mt-2 px-4 py-1.5 rounded-xl glass text-sm">
                Continue Viewing
              </motion.button>
            </Card>
          </motion.div>
        )}

        {viewed.length === artworks.length && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">🎨</span>
              <h2 className="text-3xl font-black text-[var(--accent-primary)]">ASHISH</h2>
              <p className="text-[var(--text-secondary)] text-sm">All artworks viewed! Name revealed!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
