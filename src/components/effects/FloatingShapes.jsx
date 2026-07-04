import { motion } from "framer-motion";

const shapes = ["●", "■", "▲", "✦", "♥", "◆", "⬟", "◎"];

export default function FloatingShapes({ count = 12 }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: count }).map((_, i) => {
        const size = 20 + Math.random() * 40;
        const shape = shapes[i % shapes.length];
        return (
          <motion.div
            key={i}
            className="absolute text-white/5 text-2xl"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, fontSize: size }}
            animate={{
              y: [0, -30 - Math.random() * 50, 0],
              x: [0, Math.random() > 0.5 ? 20 : -20, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          >
            {shape}
          </motion.div>
        );
      })}
    </div>
  );
}
