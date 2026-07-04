import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../animations";

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="min-h-full"
    >
      {children}
    </motion.div>
  );
}
