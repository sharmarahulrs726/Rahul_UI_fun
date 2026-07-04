import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { themes } from "../styles/themes";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

export default function ThemeLab() {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          className="text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-black">🎨 Theme Lab</h1>
          <p className="text-[var(--text-secondary)] text-sm">Change the whole vibe with one click</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={staggerContainer}
          initial="initial"
          animate="in"
        >
          {themes.map((t) => (
            <motion.div key={t.id} variants={staggerItem}>
              <Card
                onClick={() => setTheme(t.id)}
                glow={currentTheme === t.id}
                className={`!p-6 cursor-pointer text-center relative overflow-hidden ${
                  currentTheme === t.id ? "ring-2 ring-[var(--accent-primary)]" : ""
                }`}
              >
                <motion.div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: `radial-gradient(circle, ${t.colors.primary}, transparent)`,
                  }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
                <div className="relative z-10">
                  <motion.span
                    className="text-5xl block mb-3"
                    animate={currentTheme === t.id ? { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {t.icon}
                  </motion.span>
                  <h3 className="font-black text-lg mb-2">{t.name}</h3>
                  <div className="flex justify-center gap-2 mb-3">
                    {Object.values(t.colors).slice(0, 3).map((color, i) => (
                      <div key={i} className="w-6 h-6 rounded-full" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  {currentTheme === t.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-block px-3 py-1 rounded-full bg-[var(--accent-primary)] text-white text-xs font-bold"
                    >
                      ✓ Active
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Card className="text-center">
          <p className="text-sm text-[var(--text-secondary)]">
            Current theme: <strong className="text-[var(--accent-primary)]">{themes.find(t => t.id === currentTheme)?.name}</strong>
          </p>
          <motion.div
            className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(to right, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))`,
                width: `${((themes.findIndex(t => t.id === currentTheme) + 1) / themes.length) * 100}%`,
              }}
              layout
              transition={{ type: "spring", stiffness: 200 }}
            />
          </motion.div>
        </Card>
      </div>
    </PageTransition>
  );
}
