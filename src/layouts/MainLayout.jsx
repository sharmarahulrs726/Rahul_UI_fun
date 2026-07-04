import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import CursorFollower from "../components/effects/CursorFollower";
import FloatingShapes from "../components/effects/FloatingShapes";

export default function MainLayout() {
  const { isLoggedIn } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isLoggedIn) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden">
      <FloatingShapes count={8} />
      <CursorFollower />
      <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <motion.main
        className="pt-20 pb-8 lg:pl-64 transition-all duration-300"
        layout
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
}
