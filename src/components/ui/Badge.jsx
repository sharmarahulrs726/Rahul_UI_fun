import { motion } from "framer-motion";

export default function Badge({ children, color = "accent", className = "", pulse = false }) {
  const colors = {
    accent: "bg-[var(--accent-primary)]",
    secondary: "bg-[var(--accent-secondary)]",
    tertiary: "bg-[var(--accent-tertiary)]",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };

  return (
    <motion.span
      animate={pulse ? { scale: [1, 1.1, 1] } : {}}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-white ${colors[color]} ${className}`}
    >
      {children}
    </motion.span>
  );
}
