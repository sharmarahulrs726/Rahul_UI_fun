import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { FiGrid, FiUser, FiSettings, FiAward, FiAlertCircle, FiMessageCircle, FiMusic, FiBarChart2, FiImage, FiShoppingCart, FiBell, FiDroplet, FiLoader, FiHelpCircle, FiCheckSquare, FiCloud, FiFeather, FiEdit3, FiStar } from "react-icons/fi";

const pages = [
  { path: "/dashboard", label: "Dashboard", icon: FiGrid },
  { path: "/profile", label: "Neon Profile", icon: FiUser },
  { path: "/settings", label: "Game Settings", icon: FiSettings },
  { path: "/achievements", label: "Achievements", icon: FiAward },
  { path: "/errors", label: "Error Playground", icon: FiAlertCircle },
  { path: "/chat", label: "Chat Mockup", icon: FiMessageCircle },
  { path: "/music", label: "Music Vibes", icon: FiMusic },
  { path: "/leaderboard", label: "Leaderboard", icon: FiBarChart2 },
  { path: "/memes", label: "Meme Gallery", icon: FiImage },
  { path: "/shop", label: "Fantasy Shop", icon: FiShoppingCart },
  { path: "/notifications", label: "Notifications", icon: FiBell },
  { path: "/themes", label: "Theme Lab", icon: FiDroplet },
  { path: "/loaders", label: "Loading Museum", icon: FiLoader },
  { path: "/secret", label: "Secret Room", icon: FiHelpCircle },
  { path: "/tasks", label: "Task Board", icon: FiCheckSquare },
  { path: "/weather", label: "Weather UI", icon: FiCloud },
  { path: "/social", label: "Social Feed", icon: FiFeather },
  { path: "/forms", label: "Fun Forms", icon: FiEdit3 },
  { path: "/finale", label: "Grand Finale", icon: FiStar },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { chaosMode } = useTheme();

  const handleNav = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-30 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </motion.div>
      )}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="fixed top-16 left-0 bottom-0 z-30 w-64 glass border-r border-white/10 overflow-y-auto p-3"
      >
        <nav className="space-y-1">
          {pages.map((page) => {
            const Icon = page.icon;
            const isActive = location.pathname === page.path;
            return (
              <motion.button
                key={page.path}
                onClick={() => handleNav(page.path)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5"
                } ${chaosMode ? "animate-wobble" : ""}`}
              >
                <Icon className="text-lg" />
                <span>{page.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
      </motion.aside>
    </AnimatePresence>
  );
}
