import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  hover = true,
  glow = false,
  onClick,
  ...props
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -5, boxShadow: "0 12px 40px rgba(0,0,0,0.3)" } : {}}
      whileTap={onClick ? { scale: 0.97 } : {}}
      className={`glass rounded-2xl p-6 ${glow ? "shadow-[0_0_20px_var(--glow-color)]" : ""} ${onClick ? "cursor-pointer" : ""} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
