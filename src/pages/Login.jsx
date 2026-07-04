import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import Confetti from "../components/effects/Confetti";
import LoginDoor from "../components/auth/LoginDoor";
import SquashEffect from "../components/auth/SquashEffect";
import FloatingShapes from "../components/effects/FloatingShapes";
import { funQuotes } from "../data/mockData";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showDoor, setShowDoor] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [quote] = useState(() => funQuotes[Math.floor(Math.random() * funQuotes.length)]);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId.trim() || !password.trim()) return;

    if (login(userId, password)) {
      setShowDoor(true);
      setTimeout(() => setDoorOpen(true), 300);
      setTimeout(() => setConfettiActive(true), 1000);
      setTimeout(() => navigate("/dashboard"), 2400);
    } else {
      setFailed(true);
      setTimeout(() => setFailed(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingShapes count={15} />
      {confettiActive && <Confetti active={true} duration={2000} />}

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <motion.h1
          className="text-5xl sm:text-7xl font-black mb-2"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <span className="bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--accent-tertiary)] bg-clip-text text-transparent">
            Funky Playground
          </span>
        </motion.h1>
        <p className="text-[var(--text-secondary)] text-sm">Enter the realm of animated wonders</p>
        <motion.p
          className="text-xs text-[var(--accent-tertiary)] mt-2 italic"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          💡 {quote}
        </motion.p>
      </motion.div>

      <AnimatePresence mode="wait">
        {showDoor ? (
          <motion.div
            key="door"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <LoginDoor
              open={doorOpen}
              onComplete={() => {}}
            />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="w-full max-w-sm"
          >
            <div className="glass rounded-2xl p-6 sm:p-8 border border-white/10">
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                animate={failed ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    User ID
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 20px var(--glow-color)" }}
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Enter your ID"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--text-primary)] placeholder-gray-500 focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Password
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 20px var(--glow-color)" }}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Must match User ID"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--text-primary)] placeholder-gray-500 focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px var(--glow-color)" }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-bold text-lg relative overflow-hidden"
                >
                  <span className="relative z-10">🚀 Enter the Funkyverse</span>
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>

                <p className="text-xs text-center text-[var(--text-secondary)]">
                  💡 Password must match User ID
                </p>
              </motion.form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {failed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-4"
        >
          <SquashEffect active={failed} onRestart={() => setFailed(false)} />
        </motion.div>
      )}

      <motion.div
        className="fixed bottom-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-xs text-[var(--text-secondary)] opacity-50">
          Made with 💖 by Funky Devs
        </p>
      </motion.div>

      <motion.button
        className="fixed top-4 right-4 text-2xl opacity-30 hover:opacity-100 transition-opacity"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        onClick={() => {
          const easterEgg = confirm("🦄 You found a secret! Want to skip login?");
          if (easterEgg) {
            login("guest", "guest");
            navigate("/dashboard");
          }
        }}
      >
        🦄
      </motion.button>
    </div>
  );
}
