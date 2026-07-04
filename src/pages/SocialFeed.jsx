import { motion } from "framer-motion";
import { useState } from "react";
import { socialPosts } from "../data/mockData";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

const stories = [
  { user: "Your Story", avatar: "🦸", active: true },
  { user: "NeonKid", avatar: "👾" },
  { user: "PixelFairy", avatar: "🧚" },
  { user: "FunkyBot", avatar: "🤖" },
  { user: "RetroQueen", avatar: "👸" },
];

export default function SocialFeed() {
  const [liked, setLiked] = useState({});

  return (
    <PageTransition>
      <div className="max-w-lg mx-auto space-y-6">
        <motion.h1
          className="text-3xl font-black text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          📱 Social Feed
        </motion.h1>

        <motion.div
          className="flex gap-3 overflow-x-auto pb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {stories.map((story, i) => (
            <motion.div
              key={story.user}
              className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <div className={`w-14 h-14 rounded-full p-0.5 ${i === 0 ? "bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)]" : "bg-white/20"}`}>
                <div className="w-full h-full rounded-full bg-[var(--bg-primary)] flex items-center justify-center text-2xl">
                  {story.avatar}
                </div>
              </div>
              <span className="text-[10px] text-[var(--text-secondary)] truncate w-14 text-center">
                {story.user}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="space-y-3"
          variants={staggerContainer}
          initial="initial"
          animate="in"
        >
          {socialPosts.map((post) => (
            <motion.div key={post.id} variants={staggerItem}>
              <Card className="!p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{post.avatar}</span>
                  <div>
                    <p className="text-sm font-semibold">{post.user}</p>
                    <p className="text-[10px] text-[var(--text-secondary)]">{post.time}</p>
                  </div>
                </div>
                <p className="text-sm mb-3">{post.content}</p>
                <div className="flex items-center gap-4 text-sm">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setLiked((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}
                    className={`flex items-center gap-1 ${liked[post.id] ? "text-red-500" : "text-[var(--text-secondary)]"}`}
                  >
                    <motion.span
                      animate={liked[post.id] ? { scale: [1, 1.4, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {liked[post.id] ? "❤️" : "🤍"}
                    </motion.span>
                    {post.likes + (liked[post.id] ? 1 : 0)}
                  </motion.button>
                  <span className="text-[var(--text-secondary)] flex items-center gap-1">
                    💬 {post.comments}
                  </span>
                  <span className="text-[var(--text-secondary)] flex items-center gap-1">↗️ Share</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white text-2xl shadow-lg flex items-center justify-center"
        >
          ✏️
        </motion.button>
      </div>
    </PageTransition>
  );
}
