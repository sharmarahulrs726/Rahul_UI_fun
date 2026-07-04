import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Toast from "../components/effects/Toast";
import PageTransition from "../components/layout/PageTransition";
import { notificationTemplates } from "../data/mockData";
import { staggerContainer, staggerItem } from "../animations";

export default function NotificationsCenter() {
  const [toasts, setToasts] = useState([]);
  const [notifs, setNotifs] = useState([
    { id: 1, icon: "🎉", title: "Welcome!", message: "Thanks for joining the Funkyverse", time: "2m ago", read: false },
    { id: 2, icon: "🏆", title: "Badge Earned", message: "You earned 'First Login'!", time: "5m ago", read: false },
    { id: 3, icon: "💬", title: "New Message", message: "FunkyBot says hi!", time: "1h ago", read: true },
    { id: 4, icon: "⭐", title: "Level Up!", message: "You're now a Funky Newcomer", time: "2h ago", read: true },
  ]);

  let toastId = 0;
  const triggerNotification = () => {
    const tpl = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
    toastId++;
    setToasts((prev) => [...prev, { ...tpl, id: toastId }]);
    setNotifs((prev) => [
      { id: Date.now(), icon: tpl.icon, title: tpl.title, message: tpl.message, time: "Just now", read: false },
      ...prev,
    ]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <PageTransition>
      <Toast toasts={toasts} removeToast={removeToast} />
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div
          className="flex items-center justify-between"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div>
            <h1 className="text-3xl font-black">🔔 Notifications</h1>
            <p className="text-[var(--text-secondary)] text-sm">Stay updated (not really)</p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={markAllRead}
              className="px-3 py-1.5 rounded-xl glass text-xs font-bold"
            >
              ✅ Mark Read
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerNotification}
              className="px-3 py-1.5 rounded-xl bg-[var(--accent-primary)] text-white text-xs font-bold"
            >
              🎲 Random Toast
            </motion.button>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2">
          {["success", "info", "warning", "error"].map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const tpl = notificationTemplates.find((t) => t.type === type) || notificationTemplates[0];
                toastId++;
                setToasts((prev) => [...prev, { ...tpl, id: toastId }]);
                setTimeout(() => removeToast(toastId), 3000);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                type === "success" ? "bg-green-500/20 text-green-400" :
                type === "info" ? "bg-blue-500/20 text-blue-400" :
                type === "warning" ? "bg-yellow-500/20 text-yellow-400" :
                "bg-red-500/20 text-red-400"
              }`}
            >
              {type === "success" && "✅ "}
              {type === "info" && "ℹ️ "}
              {type === "warning" && "⚠️ "}
              {type === "error" && "❌ "}
              {type}
            </motion.button>
          ))}
        </div>

        <motion.div
          className="space-y-2"
          variants={staggerContainer}
          initial="initial"
          animate="in"
        >
          {notifs.map((notif) => (
            <motion.div key={notif.id} variants={staggerItem}>
              <Card className={`!p-3 ${notif.read ? "opacity-50" : ""}`}>
                <div className="flex items-center gap-3">
                  <motion.span
                    className="text-2xl"
                    animate={!notif.read ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {notif.icon}
                  </motion.span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{notif.title}</p>
                      {!notif.read && <Badge color="accent" className="!px-1.5 !py-0.5 text-[10px]">NEW</Badge>}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">{notif.message}</p>
                    <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{notif.time}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
