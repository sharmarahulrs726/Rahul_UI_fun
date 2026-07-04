import { motion } from "framer-motion";

export default function LoginDoor({ open, onComplete }) {
  return (
    <div className="relative w-72 h-96 mx-auto perspective-[800px]">
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
          boxShadow: open ? "0 0 80px 30px var(--glow-color)" : "0 0 20px 5px rgba(255,255,255,0.05)",
        }}
        animate={{
          opacity: open ? 1 : 0.3,
          scale: open ? 1.2 : 1,
        }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-[var(--accent-primary)]/50 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20" />

        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-primary)] border-r border-[var(--accent-primary)]/30 flex items-center justify-center origin-left"
          style={{ backfaceVisibility: "hidden" }}
          animate={{ rotateY: open ? -120 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut", type: "spring", stiffness: 80 }}
        >
          <span className="text-4xl opacity-30">🚪</span>
        </motion.div>

        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[var(--bg-secondary)] to-[var(--bg-primary)] border-l border-[var(--accent-primary)]/30 flex items-center justify-center origin-right"
          style={{ backfaceVisibility: "hidden" }}
          animate={{ rotateY: open ? 120 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut", type: "spring", stiffness: 80 }}
        >
          <span className="text-4xl opacity-30">🚪</span>
        </motion.div>

        {!open && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl mb-2"
              >
                🔒
              </motion.div>
              <p className="text-xs text-[var(--text-secondary)] font-medium">ENTER</p>
            </div>
          </div>
        )}

        {open && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.div
              className="text-7xl"
              animate={{ x: [0, 30], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
              onAnimationComplete={onComplete}
            >
              🦸
            </motion.div>
          </motion.div>
        )}
      </div>

      {open && (
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              className="text-lg"
              animate={{ y: [0, -5, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.15, repeat: 2 }}
            >
              👣
            </motion.span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
