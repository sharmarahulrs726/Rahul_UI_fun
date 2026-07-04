import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";
import { FiUser, FiAward, FiMusic, FiShoppingCart, FiCloud, FiStar } from "react-icons/fi";

const quickLinks = [
  { path: "/profile", label: "Profile", icon: FiUser, color: "from-pink-500 to-rose-500" },
  { path: "/achievements", label: "Achievements", icon: FiAward, color: "from-amber-500 to-yellow-500" },
  { path: "/music", label: "Music", icon: FiMusic, color: "from-violet-500 to-purple-500" },
  { path: "/shop", label: "Shop", icon: FiShoppingCart, color: "from-emerald-500 to-teal-500" },
  { path: "/weather", label: "Weather", icon: FiCloud, color: "from-cyan-500 to-blue-500" },
  { path: "/finale", label: "Finale", icon: FiStar, color: "from-red-500 to-orange-500" },
];

const stats = [
  { label: "Pages Explored", value: "0", emoji: "📄" },
  { label: "Achievements", value: "3", emoji: "🏆" },
  { label: "Fun Level", value: "∞", emoji: "⚡" },
  { label: "Moods Today", value: "Happy", emoji: "😄" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { chaosMode } = useTheme();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="space-y-6">
        <motion.div
          className="text-center sm:text-left"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl font-black"
            animate={chaosMode ? { rotate: [0, 2, -2, 0] } : {}}
            transition={{ repeat: chaosMode ? Infinity : 0, duration: 0.3 }}
          >
            Hey, {user?.name || "Champion"}! 👋
          </motion.h1>
          <p className="text-[var(--text-secondary)] mt-1">Welcome to your Funky Dashboard</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          variants={staggerContainer}
          initial="initial"
          animate="in"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem}>
              <Card className="text-center !p-4">
                <motion.span
                  className="text-3xl block mb-1"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {stat.emoji}
                </motion.span>
                <p className="text-2xl font-black text-[var(--accent-primary)]">{stat.value}</p>
                <p className="text-xs text-[var(--text-secondary)]">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div>
          <h2 className="text-lg font-bold mb-3">Quick Navigation</h2>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            variants={staggerContainer}
            initial="initial"
            animate="in"
          >
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.div key={link.path} variants={staggerItem}>
                  <Card onClick={() => navigate(link.path)} className="!p-4 text-center">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mx-auto mb-2`}>
                      <Icon className="text-white text-lg" />
                    </div>
                    <p className="text-sm font-semibold">{link.label}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <h3 className="font-bold mb-3">📊 Activity</h3>
            <div className="space-y-2">
              <motion.div
                className="flex items-center gap-3 p-2 rounded-lg bg-white/5"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span>🎉</span>
                <span className="text-sm">Joined the Funkyverse</span>
                <span className="ml-auto text-xs text-[var(--text-secondary)]">Just now</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 p-2 rounded-lg bg-white/5"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span>🏆</span>
                <span className="text-sm">Earned 'First Login' badge</span>
                <span className="ml-auto text-xs text-[var(--text-secondary)]">1m ago</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 p-2 rounded-lg bg-white/5"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span>🌈</span>
                <span className="text-sm">Activated Funky Mode</span>
                <span className="ml-auto text-xs text-[var(--text-secondary)]">2m ago</span>
              </motion.div>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold mb-3">💡 Random Tip</h3>
            <motion.div
              className="p-4 rounded-xl bg-gradient-to-br from-[var(--accent-primary)]/10 to-[var(--accent-secondary)]/10 text-center"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <p className="text-sm">
                Try turning on{" "}
                <button
                  onClick={() => {/* toggle chaos from parent */}}
                  className="text-[var(--accent-primary)] font-bold underline"
                >
                  CHAOS MODE
                </button>{" "}
                for extra wobble! ⚡
              </p>
            </motion.div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
