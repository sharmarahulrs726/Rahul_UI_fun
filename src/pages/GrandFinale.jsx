import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Card from "../components/ui/Card";
import Confetti from "../components/effects/Confetti";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

const stats = [
  { label: "Pages Explored", value: "20", emoji: "📄" },
  { label: "Achievements", value: "8", emoji: "🏆" },
  { label: "Animations Seen", value: "∞", emoji: "✨" },
  { label: "Fun Level", value: "MAX", emoji: "⚡" },
  { label: "Smiles Generated", value: "1000+", emoji: "😄" },
  { label: "Chaos Activated", value: "Many", emoji: "🌀" },
];

export default function GrandFinale() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <PageTransition>
      <Confetti active={true} duration={999999} />
      <div className="max-w-2xl mx-auto space-y-8 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
          <motion.span
            className="text-7xl block"
            animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🏆
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-5xl sm:text-6xl font-black mb-2">
            <span className="bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] bg-clip-text text-transparent">
              Grand Finale!
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            You've explored the entire Funkyverse! 🎉
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          variants={staggerContainer}
          initial="initial"
          animate="in"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem}>
              <Card className="!p-4 text-center" glow>
                <motion.span
                  className="text-3xl block mb-1"
                  animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {stat.emoji}
                </motion.span>
                <motion.p
                  className="text-2xl font-black"
                  style={{ color: "var(--accent-primary)" }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs text-[var(--text-secondary)]">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="!p-6">
            <motion.p
              className="text-lg font-bold mb-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🎊 Thank you for playing! You're officially Funky Certified! 🎊
            </motion.p>
            <div className="flex justify-center gap-2 text-2xl">
              {["🎉", "🎊", "✨", "🌟", "💫", "⭐"].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0], rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </Card>

          <motion.button
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-bold text-lg relative overflow-hidden group"
          >
            <span className="relative z-10">🚪 Exit Through Magic Door</span>
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>

          <p className="text-xs text-[var(--text-secondary)]">
            P.S. You can always come back. The Funkyverse never forgets. 💖
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
