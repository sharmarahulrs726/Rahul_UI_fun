import { motion } from "framer-motion";
import { leaderboardData } from "../data/mockData";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

const medals = ["🥇", "🥈", "🥉"];

export default function ArcadeLeaderboard() {
  return (
    <PageTransition>
      <div className="max-w-xl mx-auto space-y-6">
        <motion.div
          className="text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-black">🏆 Arcade Leaderboard</h1>
          <p className="text-[var(--text-secondary)] text-sm">The funkiest players around</p>
        </motion.div>

        <motion.div
          className="flex justify-center gap-4 items-end mb-6"
          variants={staggerContainer}
          initial="initial"
          animate="in"
        >
          {leaderboardData.slice(0, 3).map((player, i) => (
            <motion.div
              key={player.rank}
              variants={staggerItem}
              className="text-center"
            >
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 150 }}
              >
                <motion.span
                  className="text-4xl block"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                >
                  {player.avatar}
                </motion.span>
                <motion.div
                  className={`font-black text-lg ${i === 0 ? "text-yellow-400" : i === 1 ? "text-gray-300" : "text-amber-600"}`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                >
                  {medals[i]}
                </motion.div>
                <div className={`rounded-t-xl px-4 py-2 mt-1 ${i === 0 ? "bg-yellow-500/20 h-24" : i === 1 ? "bg-gray-400/20 h-20" : "bg-amber-600/20 h-16"}`}>
                  <p className="text-sm font-bold">{player.name}</p>
                  <p className="text-xs text-[var(--accent-primary)] font-bold">{player.score.toLocaleString()}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="space-y-2"
          variants={staggerContainer}
          initial="initial"
          animate="in"
        >
          {leaderboardData.slice(3).map((player, index) => (
            <motion.div
              key={player.rank}
              variants={staggerItem}
              custom={index}
            >
              <Card className="!p-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-[var(--text-secondary)] w-8">#{player.rank}</span>
                  <span className="text-2xl">{player.avatar}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{player.name}</p>
                    <div className="flex items-center gap-2">
                      <motion.span
                        className="text-xs font-bold"
                        style={{ color: "var(--accent-primary)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {player.score.toLocaleString()} pts
                      </motion.span>
                      <span className="text-xs">
                        {player.change === "up" && "⬆️"}
                        {player.change === "down" && "⬇️"}
                        {player.change === "same" && "➡️"}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    className="h-2 flex-1 max-w-[100px] bg-white/10 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: "var(--accent-primary)", width: `${(player.score / 10000) * 100}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(player.score / 10000) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold"
          >
            🎮 Play Now to Climb!
          </motion.button>
        </motion.div>
      </div>
    </PageTransition>
  );
}
