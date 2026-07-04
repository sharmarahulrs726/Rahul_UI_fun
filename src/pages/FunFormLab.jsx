import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

const formFields = [
  { id: "name", label: "Your Funky Name", emoji: "✨", type: "text" },
  { id: "email", label: "Your Vibe Mail", emoji: "📧", type: "email" },
  { id: "password", label: "Secret Handshake", emoji: "🤝", type: "password" },
];

const checkboxOptions = [
  { id: "fun", label: "I'm fun", emoji: "🎉" },
  { id: "cool", label: "I'm cool", emoji: "😎" },
  { id: "funky", label: "I'm funky", emoji: "🕺" },
  { id: "all", label: "All of the above", emoji: "🔥" },
];

export default function FunFormLab() {
  const [formData, setFormData] = useState({});
  const [checkboxes, setCheckboxes] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  const validationMsg = (id) => {
    if (submitted && !formData[id]) return "😅 This is required!";
    if (formData[id] && formData[id].length < 3) return "🤏 Too short!";
    return "";
  };

  return (
    <PageTransition>
      <div
        className="max-w-lg mx-auto space-y-6"
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        <motion.div
          className="text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-black">🎪 Fun Form Lab</h1>
          <p className="text-[var(--text-secondary)] text-sm">Forms have never been this weird</p>
        </motion.div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  {field.emoji} {field.label}
                </label>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <motion.input
                    whileFocus={{ boxShadow: "0 0 20px var(--glow-color)" }}
                    type={field.type}
                    value={formData[field.id] || ""}
                    onChange={(e) => setFormData((prev) => ({ ...prev, [field.id]: e.target.value }))}
                    placeholder={field.label}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--text-primary)] placeholder-gray-500 focus:outline-none focus:border-[var(--accent-primary)] transition-all"
                  />
                </motion.div>
                {validationMsg(field.id) && (
                  <motion.p
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {validationMsg(field.id)}
                  </motion.p>
                )}
              </div>
            ))}

            <div>
              <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">
                ✅ Pick your vibes:
              </p>
              <motion.div
                className="grid grid-cols-2 gap-2"
                variants={staggerContainer}
                initial="initial"
                animate="in"
              >
                {checkboxOptions.map((opt) => (
                  <motion.div key={opt.id} variants={staggerItem}>
                    <label
                      className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all ${
                        checkboxes[opt.id] ? "bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/30" : "bg-white/5 border border-white/10"
                      }`}
                    >
                      <motion.div
                        className="w-5 h-5 rounded-md border-2 flex items-center justify-center"
                        style={{
                          borderColor: checkboxes[opt.id] ? "var(--accent-primary)" : "rgba(255,255,255,0.2)",
                          backgroundColor: checkboxes[opt.id] ? "var(--accent-primary)" : "transparent",
                        }}
                        animate={checkboxes[opt.id] ? { scale: [1, 1.2, 1] } : {}}
                      >
                        {checkboxes[opt.id] && "✓"}
                      </motion.div>
                      <span className="text-sm">{opt.emoji} {opt.label}</span>
                      <input
                        type="checkbox"
                        checked={checkboxes[opt.id] || false}
                        onChange={() => setCheckboxes((prev) => ({ ...prev, [opt.id]: !prev[opt.id] }))}
                        className="hidden"
                      />
                    </label>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.button
              type="submit"
              className="relative w-full py-3 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-bold text-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                x: typeof window !== "undefined" ? 0 : 0,
              }}
            >
              <span className="relative z-10">
                {submitted ? "🎉 Submitted!" : "🚀 Submit Form"}
              </span>
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </form>
        </Card>

        <Card className="text-center">
          <h3 className="font-bold mb-2">🧲 Magnetic Button Demo</h3>
          <motion.button
            className="px-6 py-3 rounded-xl bg-[var(--accent-primary)] text-white font-bold"
            animate={{
              x: (mousePos.x - (typeof window !== "undefined" ? window.innerWidth / 2 : 400)) * 0.05,
              y: (mousePos.y - (typeof window !== "undefined" ? window.innerHeight / 2 : 300)) * 0.05,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            🧲 Follow my cursor!
          </motion.button>
          <p className="text-xs text-[var(--text-secondary)] mt-2">Move your mouse around</p>
        </Card>
      </div>
    </PageTransition>
  );
}
