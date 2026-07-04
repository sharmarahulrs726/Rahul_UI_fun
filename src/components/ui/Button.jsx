import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  icon,
  ...props
}) {
  const base = "relative inline-flex items-center justify-center gap-2 font-bold rounded-xl overflow-hidden select-none";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-base", lg: "px-8 py-3.5 text-lg" };
  const variants = {
    primary: "bg-[var(--accent-primary)] text-white hover:brightness-110",
    secondary: "bg-[var(--accent-secondary)] text-white",
    glass: "glass text-[var(--text-primary)] hover:bg-white/10",
    ghost: "bg-transparent text-[var(--text-primary)] hover:bg-white/5",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.92 } : {}}
      className={`${base} ${sizes[size]} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-white/10"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
