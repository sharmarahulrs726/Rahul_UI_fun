import { motion } from "framer-motion";
import { useState } from "react";
import { weatherMoods } from "../data/mockData";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

const weatherAnimations = {
  sunny: (
    <div className="relative w-24 h-24 mx-auto">
      <motion.div
        className="absolute inset-0 rounded-full bg-yellow-400"
        animate={{ boxShadow: ["0 0 20px rgba(255,200,0,0.3)", "0 0 40px rgba(255,200,0,0.6)", "0 0 20px rgba(255,200,0,0.3)"] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-6 bg-yellow-400/50 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transformOrigin: "0 0",
            transform: `rotate(${angle}deg) translateY(-30px)`,
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
        />
      ))}
    </div>
  ),
  rainy: (
    <div className="relative w-24 h-24 mx-auto">
      <motion.div className="text-5xl text-center" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        ☁️
      </motion.div>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute text-lg"
          style={{ left: `${20 + i * 15}%`, top: 0 }}
          animate={{ y: [0, 60], opacity: [1, 0.3] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: "linear" }}
        >
          💧
        </motion.div>
      ))}
    </div>
  ),
  cloudy: (
    <div className="relative w-24 h-24 mx-auto">
      <motion.div
        className="text-6xl text-center"
        animate={{ x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        ☁️
      </motion.div>
      <motion.div
        className="text-4xl absolute top-4 left-2"
        animate={{ x: [0, -8, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        ☁️
      </motion.div>
    </div>
  ),
  stormy: (
    <div className="relative w-24 h-24 mx-auto">
      <motion.div className="text-5xl text-center" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 0.3 }}>
        🌩️
      </motion.div>
      <motion.div
        className="text-4xl absolute bottom-0 left-1/2 -translate-x-1/2"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.5 }}
      >
        ⚡
      </motion.div>
    </div>
  ),
  snowy: (
    <div className="relative w-24 h-24 mx-auto">
      <motion.div className="text-5xl text-center" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        ❄️
      </motion.div>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute text-base"
          style={{ left: `${15 + i * 18}%`, top: 0 }}
          animate={{ y: [0, 70], rotate: [0, 360], opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2, ease: "linear" }}
        >
          ❄️
        </motion.div>
      ))}
    </div>
  ),
  windy: (
    <div className="relative w-24 h-24 mx-auto overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-1 rounded-full bg-white/30"
          style={{ width: `${30 + i * 15}`, top: `${30 + i * 20}%`, left: "-20%" }}
          animate={{ x: ["0vw", "50vw"] }}
          transition={{ repeat: Infinity, duration: 1 + i * 0.3, ease: "linear" }}
        />
      ))}
      <motion.div
        className="text-5xl text-center mt-4"
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 0.5 }}
      >
        🌪️
      </motion.div>
    </div>
  ),
};

export default function WeatherUI() {
  const [current, setCurrent] = useState(weatherMoods[0]);

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div
          className="text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-black">🌤️ Weather UI</h1>
          <p className="text-[var(--text-secondary)] text-sm">Frontend-only weather concepts</p>
        </motion.div>

        <motion.div
          key={current.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Card className="!p-8 text-center" glow>
            <div className="h-32 flex items-center justify-center mb-4">
              {weatherAnimations[current.id]}
            </div>
            <motion.h2
              className="text-5xl font-black mb-1"
              style={{ color: "var(--accent-primary)" }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {current.temp}°C
            </motion.h2>
            <p className="font-bold text-lg">{current.label}</p>
            <p className="text-sm text-[var(--text-secondary)]">{current.desc}</p>
          </Card>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-2"
          variants={staggerContainer}
          initial="initial"
          animate="in"
        >
          {weatherMoods.map((mood) => (
            <motion.div key={mood.id} variants={staggerItem}>
              <Card
                onClick={() => setCurrent(mood)}
                glow={current.id === mood.id}
                className={`!p-3 text-center cursor-pointer ${current.id === mood.id ? "ring-2 ring-[var(--accent-primary)]" : ""}`}
              >
                <span className="text-2xl">{mood.icon}</span>
                <p className="text-xs font-semibold mt-1">{mood.label}</p>
                <p className="text-[10px] text-[var(--text-secondary)]">{mood.temp}°C</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Card className="text-center">
          <p className="text-xs text-[var(--text-secondary)]">
            📍 Funky City, Fantasy Land • No API needed, just vibes
          </p>
        </Card>
      </div>
    </PageTransition>
  );
}
