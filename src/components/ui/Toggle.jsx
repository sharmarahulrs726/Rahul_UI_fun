import { motion } from "framer-motion";

export default function Toggle({ label, checked, onChange, icon }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      {icon && <span className="text-xl">{icon}</span>}
      <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
      <div
        onClick={onChange}
        className={`relative w-14 h-7 rounded-full p-1 transition-colors duration-300 ${checked ? "bg-[var(--accent-primary)]" : "bg-white/20"}`}
      >
        <motion.div
          className="w-5 h-5 bg-white rounded-full shadow-md"
          animate={{ x: checked ? 28 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </label>
  );
}
