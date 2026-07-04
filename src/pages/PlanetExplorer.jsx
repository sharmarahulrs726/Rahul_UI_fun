import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";

const planets = [
  { id: 0, name: "Mercury", emoji: "🪨", color: "#8B8682", size: 12, orbit: 80, speed: 8, letter: null },
  { id: 1, name: "Venus", emoji: "🌕", color: "#E8CDA0", size: 16, orbit: 110, speed: 12, letter: null },
  { id: 2, name: "Earth", emoji: "🌍", color: "#4A90D9", size: 17, orbit: 145, speed: 16, letter: "V" },
  { id: 3, name: "Mars", emoji: "🔴", color: "#C1440E", size: 14, orbit: 180, speed: 20, letter: "I" },
  { id: 4, name: "Jupiter", emoji: "🟤", color: "#C88B3A", size: 30, orbit: 230, speed: 28, letter: "K" },
  { id: 5, name: "Saturn", emoji: "🪐", color: "#E8D191", size: 26, orbit: 280, speed: 36, letter: "A" },
  { id: 6, name: "Uranus", emoji: "🔵", color: "#73C2D4", size: 22, orbit: 320, speed: 44, letter: "S" },
  { id: 7, name: "Neptune", emoji: "🟦", color: "#3D5FC4", size: 20, orbit: 360, speed: 52, letter: null },
];

export default function PlanetExplorer() {
  const [visited, setVisited] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const visitPlanet = (planet) => {
    setSelectedPlanet(planet);
    if (planet.letter && !visited.includes(planet.letter)) {
      setVisited((prev) => [...prev, planet.letter]);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">🪐 Planet Explorer</h1>
          <p className="text-[var(--text-secondary)] text-sm">Visit planets to discover the secret name!</p>
        </motion.div>

        <div className="text-center">
          <div className="flex justify-center gap-1">
            {["V", "I", "K", "A", "S"].map((letter, i) => (
              <motion.span
                key={i}
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg"
                animate={{ scale: visited.includes(letter) ? [1, 1.3, 1] : 1 }}
                style={{
                  backgroundColor: visited.includes(letter) ? "var(--accent-primary)" : "var(--bg-secondary)",
                  color: visited.includes(letter) ? "white" : "transparent",
                }}
              >
                {visited.includes(letter) ? letter : "?"}
              </motion.span>
            ))}
          </div>
        </div>

        <Card className="!p-4 relative overflow-hidden">
          <div className="relative h-[400px] flex items-center justify-center">
            <motion.div className="text-4xl absolute" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
              ☀️
            </motion.div>
            {planets.map((planet) => (
              <motion.button
                key={planet.id}
                className="absolute rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  width: planet.size * 2,
                  height: planet.size * 2,
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  rotate: { repeat: Infinity, duration: planet.speed, ease: "linear" },
                }}
                onClick={() => visitPlanet(planet)}
                whileHover={{ scale: 1.3 }}
              >
                <motion.span
                  className="text-lg"
                  style={{ fontSize: planet.size }}
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: planet.speed, ease: "linear" }}
                >
                  {planet.emoji}
                </motion.span>
              </motion.button>
            ))}
            {planets.map((planet) => (
              <motion.div
                key={`orbit-${planet.id}`}
                className="absolute border border-white/5 rounded-full"
                style={{ width: planet.orbit * 2, height: planet.orbit * 2 }}
              />
            ))}
          </div>
        </Card>

        <div className="flex flex-wrap justify-center gap-2">
          {planets.filter((p) => p.letter).map((planet) => (
            <motion.button
              key={planet.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => visitPlanet(planet)}
              className={`px-3 py-2 rounded-xl text-sm font-bold ${visited.includes(planet.letter) ? "bg-green-500/20 text-green-400" : "glass"}`}
            >
              {planet.emoji} {planet.name} {visited.includes(planet.letter) ? "✓" : ""}
            </motion.button>
          ))}
        </div>

        {selectedPlanet && (
          <Card className="!p-3 text-center">
            <span className="text-2xl">{selectedPlanet.emoji}</span>
            <p className="font-bold">{selectedPlanet.name}</p>
            {selectedPlanet.letter && <p className="text-[var(--accent-primary)] text-sm">Letter found: {selectedPlanet.letter}</p>}
          </Card>
        )}

        {visited.length === 5 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">🪐</span>
              <h2 className="text-3xl font-black text-[var(--accent-primary)]">VIKAS</h2>
              <p className="text-[var(--text-secondary)] text-sm">The planets have aligned!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
