import { motion } from "framer-motion";

export default function ProgressBar({ value = 0, max = 100, label, color = "accent", height = "h-3", showValue = true }) {
  const pct = Math.min((value / max) * 100, 100);
  const colors = {
    accent: "bg-[var(--accent-primary)]",
    secondary: "bg-[var(--accent-secondary)]",
    tertiary: "bg-[var(--accent-tertiary)]",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    rainbow: "bg-gradient-to-r from-red-500 via-yellow-500 to-green-500",
  };

  return (
    <div className="space-y-1">
      {(label || showValue) && (
        <div className="flex justify-between text-xs text-[var(--text-secondary)]">
          <span>{label}</span>
          {showValue && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={`${height} bg-white/10 rounded-full overflow-hidden`}>
        <motion.div
          className={`${colors[color]} h-full rounded-full relative`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
