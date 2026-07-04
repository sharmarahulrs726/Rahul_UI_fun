import { motion } from "framer-motion";
import { useState } from "react";
import { chatMessages } from "../data/mockData";
import PageTransition from "../components/layout/PageTransition";

const emojis = ["😂", "🔥", "❤️", "🎉", "💀", "👏", "😭", "✨"];

export default function ChatMockup() {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [reactions, setReactions] = useState({});

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      from: "me",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        from: "them",
        text: ["That's cool! 😄", "Nice one! 🔥", "Haha, love it!", "Tell me more! ✨"][Math.floor(Math.random() * 4)],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, reply]);
      setTyping(false);
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="max-w-lg mx-auto space-y-4">
        <motion.h1
          className="text-3xl font-black text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          💬 Chat Mockup
        </motion.h1>

        <div className="glass rounded-2xl overflow-hidden border border-white/10">
          <div className="p-3 border-b border-white/10 bg-white/5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-semibold text-sm">FunkyBot Online</span>
          </div>

          <div className="h-80 overflow-y-auto p-3 space-y-3">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ x: msg.from === "me" ? 50 : -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    msg.from === "me"
                      ? "bg-[var(--accent-primary)] text-white rounded-br-sm"
                      : "bg-white/10 text-[var(--text-primary)] rounded-bl-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[10px] opacity-60">{msg.time}</span>
                    <motion.span
                      className="text-xs cursor-pointer"
                      whileHover={{ scale: 1.2 }}
                      onClick={() => {
                        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                        setReactions((prev) => ({ ...prev, [msg.id]: emoji }));
                      }}
                    >
                      {reactions[msg.id] ? reactions[msg.id] : "😊"}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
            {typing && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 bg-[var(--text-secondary)] rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-3 border-t border-white/10 flex gap-2">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-[var(--text-primary)] placeholder-gray-500 focus:outline-none focus:border-[var(--accent-primary)]"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              className="px-4 py-2 bg-[var(--accent-primary)] text-white rounded-xl font-bold text-sm"
            >
              Send
            </motion.button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 justify-center">
          {emojis.map((emoji) => (
            <motion.button
              key={emoji}
              whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {/* quick react */}}
              className="text-lg p-1"
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
