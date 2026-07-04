import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

const initialTasks = {
  todo: [
    { id: 1, title: "Build cool UI", priority: "high", emoji: "🎨" },
    { id: 2, title: "Add more animations", priority: "high", emoji: "✨" },
    { id: 3, title: "Fix the wobble", priority: "medium", emoji: "🔧" },
  ],
  doing: [
    { id: 4, title: "Make it funky", priority: "high", emoji: "🕺" },
    { id: 5, title: "Test chaos mode", priority: "medium", emoji: "🧪" },
  ],
  done: [
    { id: 6, title: "Setup project", priority: "low", emoji: "✅" },
    { id: 7, title: "Create login page", priority: "high", emoji: "🔐" },
    { id: 8, title: "Add 20 pages", priority: "high", emoji: "📄" },
  ],
};

const columns = [
  { id: "todo", label: "📋 To Do", color: "accent" },
  { id: "doing", label: "⚡ Doing", color: "secondary" },
  { id: "done", label: "✅ Done", color: "tertiary" },
];

const priorityColors = {
  high: "danger",
  medium: "warning",
  low: "success",
};

export default function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [movingTask, setMovingTask] = useState(null);

  const moveTask = (taskId, fromCol, toCol) => {
    const task = tasks[fromCol].find((t) => t.id === taskId);
    if (!task) return;
    setTasks((prev) => ({
      ...prev,
      [fromCol]: prev[fromCol].filter((t) => t.id !== taskId),
      [toCol]: [...prev[toCol], task],
    }));
  };

  const cycleColumn = (taskId, currentCol) => {
    const colKeys = ["todo", "doing", "done"];
    const currentIdx = colKeys.indexOf(currentCol);
    const nextIdx = (currentIdx + 1) % colKeys.length;
    moveTask(taskId, currentCol, colKeys[nextIdx]);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <motion.div
          className="text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-black">📋 Task Board</h1>
          <p className="text-[var(--text-secondary)] text-sm">Click a task to move it forward</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {columns.map((col) => (
            <div key={col.id}>
              <h3 className="font-bold text-sm mb-2 px-1">{col.label}</h3>
              <motion.div
                className="space-y-2 min-h-[200px]"
                variants={staggerContainer}
                initial="initial"
                animate="in"
              >
                {tasks[col.id].map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    variants={staggerItem}
                    onClick={() => cycleColumn(task.id, col.id)}
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer"
                  >
                    <Card className="!p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{task.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold">{task.title}</p>
                        </div>
                        <Badge color={priorityColors[task.priority]} className="!px-2 !py-0.5 text-[10px]">
                          {task.priority}
                        </Badge>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
