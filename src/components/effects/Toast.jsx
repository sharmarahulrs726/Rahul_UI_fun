import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ toasts = [], removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-[999] space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ x: 300, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 300, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => removeToast(toast.id)}
            className={`pointer-events-auto px-4 py-3 rounded-xl shadow-lg cursor-pointer flex items-center gap-3 min-w-[250px] ${
              toast.type === "success"
                ? "bg-green-500/90 text-white"
                : toast.type === "error"
                  ? "bg-red-500/90 text-white"
                  : toast.type === "warning"
                    ? "bg-yellow-500/90 text-black"
                    : "glass text-[var(--text-primary)]"
            }`}
          >
            <span className="text-xl">{toast.icon || "💬"}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.message && <p className="text-xs opacity-80">{toast.message}</p>}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
