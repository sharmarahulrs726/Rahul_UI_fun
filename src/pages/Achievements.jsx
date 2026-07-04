import { motion } from "framer-motion";
import { achievements } from "../data/mockData";
import Card from "../components/ui/Card";
import ProgressBar from "../components/ui/ProgressBar";
import Badge from "../components/ui/Badge";
import Confetti from "../components/effects/Confetti";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";
import { useConfetti } from "../hooks/useConfetti";
import { useState } from "react";

export default function Achievements() {
  const { isActive, fire } = useConfetti();
  const [claimed, setClaimed] = useState({});

  const handleClaim = (id) => {
    setClaimed((prev) => ({ ...prev, [id]: true }));
    fire();
    setTimeout(() => setClaimed((prev) => ({ ...prev, [id]: false })), 2000);
  };

  return (
    <PageTransition>
      <Confetti active={isActive} />
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          className="text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-black">🏆 Achievement Room</h1>
          <p className="text-[var(--text-secondary)] text-sm">
            {achievements.filter((a) => a.unlocked).length}/{achievements.length} unlocked
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          variants={staggerContainer}
          initial="initial"
          animate="in"
        >
          {achievements.map((ach) => (
            <motion.div key={ach.id} variants={staggerItem}>
              <Card className={`!p-4 ${ach.unlocked ? "" : "opacity-60"}`}>
                <div className="flex items-start gap-3">
                  <motion.span
                    className="text-3xl"
                    animate={ach.unlocked ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ repeat: ach.unlocked ? Infinity : 0, duration: 2 }}
                  >
                    {ach.icon}
                  </motion.span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm">{ach.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)]">{ach.desc}</p>
                    {ach.unlocked && !claimed[ach.id] && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Badge color="success" className="mt-2">Unlocked!</Badge>
                      </motion.div>
                    )}
                    {ach.progress !== undefined && !ach.unlocked && (
                      <div className="mt-2">
                        <ProgressBar value={ach.progress} max={100} showValue color="warning" height="h-2" />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleClaim(ach.id)}
                          className="mt-2 text-xs px-3 py-1 rounded-full bg-[var(--accent-primary)] text-white font-bold"
                        >
                          {claimed[ach.id] ? "🎉 Claimed!" : "Claim Progress"}
                        </motion.button>
                      </div>
                    )}
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
