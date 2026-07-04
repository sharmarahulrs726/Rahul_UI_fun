import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

const errors = [
  { code: 404, title: "Lost in the Funkyverse", desc: "This page ran away to join the circus!", emoji: "🤡", color: "accent" },
  { code: 418, title: "I'm a Teapot", desc: "The server refuses to brew coffee because it is, permanently, a teapot.", emoji: "🫖", color: "secondary" },
  { code: 500, title: "Internal Boo-boo", desc: "Something went wrong. Probably the hamsters stopped running.", emoji: "🐹", color: "danger" },
  { code: 451, title: "Unavailable for Legal Reasons", desc: "This content was abducted by the government.", emoji: "👽", color: "warning" },
];

export default function ErrorPlayground() {
  const [triggeredError, setTriggeredError] = useState(null);

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          className="text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-black">💥 Error Playground</h1>
          <p className="text-[var(--text-secondary)] text-sm">Click errors to see them break... harder</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          variants={staggerContainer}
          initial="initial"
          animate="in"
        >
          {errors.map((err) => (
            <motion.div key={err.code} variants={staggerItem}>
              <Card
                onClick={() => setTriggeredError(err.code)}
                className={`!p-6 text-center relative overflow-hidden cursor-pointer`}
                glow
              >
                <motion.div
                  className="absolute inset-0 opacity-10"
                  style={{ background: `radial-gradient(circle at 50% 50%, var(--accent-${err.color === "danger" ? "primary" : err.color}), transparent)` }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                {triggeredError === err.code && (
                  <motion.div
                    className="absolute inset-0 bg-red-500/20 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.span
                      className="text-6xl"
                      animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      💥
                    </motion.span>
                  </motion.div>
                )}
                <div className="relative z-10">
                  <motion.span
                    className="text-5xl block mb-2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {err.emoji}
                  </motion.span>
                  <motion.h2
                    className="text-4xl font-black mb-1"
                    style={{ color: `var(--accent-${err.color === "danger" ? "primary" : err.color})` }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    {err.code}
                  </motion.h2>
                  <h3 className="font-bold text-sm">{err.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{err.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Card className="text-center">
          <p className="text-sm text-[var(--text-secondary)] mb-3">Want to break something?</p>
          <motion.button
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setTriggeredError(Math.random());
              setTimeout(() => setTriggeredError(null), 1500);
            }}
            className="px-6 py-3 bg-red-500 text-white rounded-xl font-bold"
          >
            💣 PANIC BUTTON
          </motion.button>
        </Card>
      </div>
    </PageTransition>
  );
}
