import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

const memes = [
  { id: 1, title: "When the code finally works", emoji: "💃", likes: 42, color: "from-yellow-400 to-orange-500" },
  { id: 2, title: "Me debugging at 3am", emoji: "👀", likes: 88, color: "from-purple-400 to-pink-500" },
  { id: 3, title: "CSS be like...", emoji: "🎨", likes: 156, color: "from-blue-400 to-cyan-500" },
  { id: 4, title: "When you forget a semicolon", emoji: "😱", likes: 234, color: "from-red-400 to-rose-500" },
  { id: 5, title: "Production deploy be like", emoji: "🚀", likes: 67, color: "from-green-400 to-emerald-500" },
  { id: 6, title: "React devs after useEffect", emoji: "♾️", likes: 312, color: "from-indigo-400 to-violet-500" },
  { id: 7, title: "When it works on my machine", emoji: "🤷", likes: 89, color: "from-teal-400 to-cyan-500" },
  { id: 8, title: "The code review experience", emoji: "🔍", likes: 45, color: "from-orange-400 to-red-500" },
];

export default function MemeGallery() {
  const [liked, setLiked] = useState({});
  const [expanded, setExpanded] = useState(null);

  const handleLike = (id) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div
          className="text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-black">😂 Meme Gallery</h1>
          <p className="text-[var(--text-secondary)] text-sm">The freshest memes in the Funkyverse</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          variants={staggerContainer}
          initial="initial"
          animate="in"
        >
          {memes.map((meme) => (
            <motion.div
              key={meme.id}
              variants={staggerItem}
              layout
              onClick={() => setExpanded(expanded === meme.id ? null : meme.id)}
            >
              <Card
                className={`!p-0 overflow-hidden cursor-pointer ${expanded === meme.id ? "sm:col-span-2" : ""}`}
              >
                <div className={`bg-gradient-to-br ${meme.color} h-32 flex items-center justify-center relative`}>
                  <motion.span
                    className="text-6xl"
                    animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {meme.emoji}
                  </motion.span>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm">{meme.title}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => { e.stopPropagation(); handleLike(meme.id); }}
                      className={`flex items-center gap-1 text-sm ${liked[meme.id] ? "text-red-500" : "text-[var(--text-secondary)]"}`}
                    >
                      <motion.span
                        animate={liked[meme.id] ? { scale: [1, 1.5, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {liked[meme.id] ? "❤️" : "🤍"}
                      </motion.span>
                      {meme.likes + (liked[meme.id] ? 1 : 0)}
                    </motion.button>
                    <span className="text-sm text-[var(--text-secondary)]">💬 Share</span>
                    <span className="text-sm text-[var(--text-secondary)]">🔖 Save</span>
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
