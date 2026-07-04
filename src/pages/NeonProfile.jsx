import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

const userStats = [
  { label: "Fun Level", value: 92, color: "accent" },
  { label: "Creativity", value: 88, color: "secondary" },
  { label: "Chaos Rating", value: 76, color: "tertiary" },
  { label: "Vibe Check", value: 100, color: "success" },
];

const profileBadges = [
  { name: "Early Adopter", icon: "🌅", color: "accent" },
  { name: "Funky Fresh", icon: "✨", color: "secondary" },
  { name: "Night Owl", icon: "🦉", color: "tertiary" },
  { name: "Theme Hopper", icon: "🎨", color: "success" },
];

export default function NeonProfile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("Funky UI enthusiast | Animation lover | Chaos enjoyer");

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(var(--accent-primary), var(--accent-secondary), var(--accent-tertiary), var(--accent-primary))",
                padding: 4,
                WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
              }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            >
              <div className="w-32 h-32 rounded-full bg-[var(--bg-primary)]" />
            </motion.div>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-6xl">{user?.avatar || "🦸"}</span>
            </motion.div>
          </div>
          <motion.h1
            className="text-2xl font-black mt-4"
            animate={{ textShadow: ["0 0 10px var(--glow-color)", "0 0 20px var(--glow-color)", "0 0 10px var(--glow-color)"] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {user?.name || "Player One"}
          </motion.h1>
          <p className="text-[var(--text-secondary)] text-sm">Joined 2024 • Funky Pro</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 gap-3"
          variants={staggerContainer}
          initial="initial"
          animate="in"
        >
          {userStats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem}>
              <Card className="!p-4 text-center">
                <p className="text-xs text-[var(--text-secondary)] mb-2">{stat.label}</p>
                <motion.div
                  className="text-3xl font-black"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                  style={{ color: `var(--accent-${stat.color === "success" ? "primary" : stat.color})` }}
                >
                  {stat.value}%
                </motion.div>
                <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: `var(--accent-${stat.color === "success" ? "primary" : stat.color})` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">✨ Bio</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setEditing(!editing)}
              className="text-sm text-[var(--accent-primary)]"
            >
              {editing ? "💾 Save" : "✏️ Edit"}
            </motion.button>
          </div>
          {editing ? (
            <motion.textarea
              initial={{ height: 60 }}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] resize-none"
              rows={3}
            />
          ) : (
            <p className="text-sm text-[var(--text-secondary)]">{bio}</p>
          )}
        </Card>

        <div>
          <h3 className="font-bold mb-3">🏅 Badges</h3>
          <motion.div
            className="flex flex-wrap gap-2"
            variants={staggerContainer}
            initial="initial"
            animate="in"
          >
            {profileBadges.map((badge) => (
              <motion.div key={badge.name} variants={staggerItem}>
                <Badge color={badge.color} pulse>
                  {badge.icon} {badge.name}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
