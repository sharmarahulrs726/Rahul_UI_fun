import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";

const rooms = [
  { id: 0, name: "Entrance", emoji: "🚪", color: "from-gray-700 to-gray-900" },
  { id: 1, name: "Library", emoji: "📚", color: "from-amber-700 to-amber-900" },
  { id: 2, name: "Kitchen", emoji: "🍳", color: "from-orange-700 to-red-900" },
  { id: 3, name: "Attic", emoji: "🕸️", color: "from-purple-700 to-purple-900" },
  { id: 4, name: "Basement", emoji: "💀", color: "from-gray-800 to-black" },
  { id: 5, name: "Bathroom", emoji: "🪞", color: "from-blue-700 to-blue-900" },
  { id: 6, name: "Garden", emoji: "🌿", color: "from-green-700 to-green-900" },
  { id: 7, name: "Cellar", emoji: "🍷", color: "from-red-800 to-red-950" },
  { id: 8, name: "Secret", emoji: "🗝️", color: "from-yellow-600 to-amber-800" },
];

const ghostNames = [
  { room: 1, letter: "R", ghost: "👻" },
  { room: 3, letter: "A", ghost: "👻" },
  { room: 5, letter: "H", ghost: "👻" },
  { room: 6, letter: "U", ghost: "👻" },
  { room: 8, letter: "L", ghost: "👻" },
];

export default function HauntedHouse() {
  const [explored, setExplored] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [foundGhosts, setFoundGhosts] = useState([]);
  const [scared, setScared] = useState(false);

  const enterRoom = (id) => {
    setCurrentRoom(id);
    if (!explored.includes(id)) {
      setExplored((prev) => [...prev, id]);
    }
    const ghost = ghostNames.find((g) => g.room === id);
    if (ghost && !foundGhosts.includes(ghost.letter)) {
      setScared(true);
      setTimeout(() => {
        setFoundGhosts((prev) => [...prev, ghost.letter]);
        setScared(false);
      }, 1000);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">👻 Haunted House</h1>
          <p className="text-[var(--text-secondary)] text-sm">Explore rooms to find the ghost letters!</p>
        </motion.div>

        <div className="text-center">
          <div className="flex justify-center gap-1">
            {["R", "A", "H", "U", "L"].map((letter, i) => (
              <motion.span
                key={i}
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
                animate={{ scale: foundGhosts.includes(letter) ? [1, 1.3, 1] : 1 }}
                style={{
                  backgroundColor: foundGhosts.includes(letter) ? "var(--accent-primary)" : "var(--bg-secondary)",
                  color: foundGhosts.includes(letter) ? "white" : "transparent",
                }}
              >
                {foundGhosts.includes(letter) ? letter : "?"}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {rooms.map((room) => {
            const hasGhost = ghostNames.some((g) => g.room === room.id && !foundGhosts.includes(g.letter));
            return (
              <motion.button
                key={room.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => enterRoom(room.id)}
                className={`p-3 rounded-xl text-center bg-gradient-to-br ${room.color} border border-white/10 relative overflow-hidden`}
              >
                <motion.span className="text-3xl block" animate={currentRoom === room.id ? { y: [0, -5, 0] } : {}}>
                  {room.emoji}
                </motion.span>
                <p className="text-xs font-bold mt-1">{room.name}</p>
                {explored.includes(room.id) && (
                  <span className="absolute top-1 right-1 text-[10px]">✓</span>
                )}
                {hasGhost && (
                  <motion.span
                    className="absolute -top-1 -left-1 text-lg"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    👻
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>

        {scared && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="text-center" initial={{ scale: 3 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <span className="text-8xl">👻</span>
              <p className="text-2xl font-black text-white mt-2">BOO!</p>
            </motion.div>
          </motion.div>
        )}

        {foundGhosts.length === 5 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">👻</span>
              <h2 className="text-3xl font-black text-[var(--accent-primary)]">RAHUL</h2>
              <p className="text-[var(--text-secondary)] text-sm">The ghosts spelled out a name!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
