import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import Button from "../ui/Button";
import { HiLogout, HiMoon, HiSun } from "react-icons/hi";

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const { chaosMode, toggleChaos } = useTheme();

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className="fixed top-0 left-0 right-0 z-40 h-16 glass border-b border-white/10 flex items-center justify-between px-4 lg:px-6"
    >
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleSidebar}
          className="text-2xl text-[var(--text-primary)] lg:hidden"
        >
          ☰
        </motion.button>
        <motion.span
          className="text-2xl font-black bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-tertiary)] bg-clip-text text-transparent"
          animate={chaosMode ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{ repeat: chaosMode ? Infinity : 0, duration: 0.5 }}
        >
          ✨ Funky UI
        </motion.span>
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleChaos}
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            chaosMode ? "bg-red-500 text-white animate-pulse" : "glass text-[var(--text-secondary)]"
          }`}
        >
          {chaosMode ? "⚡ CHAOS" : "🎮 calm"}
        </motion.button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass">
          <span className="text-lg">{user?.avatar || "🦸"}</span>
          <span className="text-sm font-medium text-[var(--text-primary)]">{user?.name}</span>
        </div>

        <Button variant="ghost" size="sm" icon={<HiLogout />} onClick={logout}>
          Exit
        </Button>
      </div>
    </motion.header>
  );
}
