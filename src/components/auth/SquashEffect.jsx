import { motion } from "framer-motion";

export default function SquashEffect({ active, onRestart }) {
  if (!active) return null;

  return (
    <div className="relative flex flex-col items-center gap-4">
      <motion.div
        className="text-7xl"
        animate={{
          y: [0, -60, -60, 0],
          scaleY: [1, 1, 0.25, 1],
          scaleX: [1, 1, 1.6, 1],
        }}
        transition={{ duration: 0.8, ease: "easeInOut", times: [0, 0.3, 0.6, 1] }}
      >
        🦸
      </motion.div>

      <motion.div
        className="text-4xl font-black text-red-500"
        initial={{ scale: 3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        🚫 ACCESS DENIED
      </motion.div>

      <motion.div
        className="flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {["😅", "🤦", "💀", "😭"].map((emoji, i) => (
          <motion.span
            key={i}
            className="text-2xl"
            animate={{ y: [0, -5, 0], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="mt-2 px-6 py-2 bg-[var(--accent-primary)] text-white rounded-full font-bold text-sm"
      >
        🔄 Try Again
      </motion.button>
    </div>
  );
}
