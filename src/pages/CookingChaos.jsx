import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";

const ingredients = [
  { id: 0, emoji: "🥚", name: "Egg", letter: "S", color: "#FDE68A" },
  { id: 1, emoji: "🧈", name: "Butter", letter: "H", color: "#FCD34D" },
  { id: 2, emoji: "🧅", name: "Onion", letter: "I", color: "#FCA5A5" },
  { id: 3, emoji: "🧄", name: "Garlic", letter: "V", color: "#E5E7EB" },
  { id: 4, emoji: "🌶️", name: "Chili", letter: "A", color: "#EF4444" },
  { id: 5, emoji: "🧂", name: "Salt", letter: "S", color: "#9CA3AF" },
  { id: 6, emoji: "🫚", name: "Ginger", letter: "H", color: "#F59E0B" },
];

const recipes = [
  { name: "Funky Omelette", required: [0, 1, 2], emoji: "🍳" },
  { name: "Spicy Stir Fry", required: [3, 4, 5], emoji: "🥘" },
  { name: "Magic Soup", required: [1, 5, 6], emoji: "🍜" },
];

export default function CookingChaos() {
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [completedRecipes, setCompletedRecipes] = useState([]);
  const [pot, setPot] = useState([]);
  const [foundLetters, setFoundLetters] = useState([]);

  const addToPot = (ingredient) => {
    setPot((prev) => [...prev, ingredient]);
    if (!addedIngredients.includes(ingredient.id)) {
      setAddedIngredients((prev) => [...prev, ingredient.id]);
      if (ingredient.letter && !foundLetters.includes(ingredient.letter)) {
        setFoundLetters((prev) => [...prev, ingredient.letter]);
      }
    }
    setPot((prev) => prev.slice(-6));
  };

  const cook = () => {
    recipes.forEach((recipe) => {
      if (!completedRecipes.includes(recipe.name)) {
        const hasAll = recipe.required.every((id) => addedIngredients.includes(id));
        if (hasAll) {
          setCompletedRecipes((prev) => [...prev, recipe.name]);
        }
      }
    });
  };

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div className="text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-4xl font-black">👨‍🍳 Cooking Chaos</h1>
          <p className="text-[var(--text-secondary)] text-sm">Add ingredients to the pot to discover hidden letters!</p>
        </motion.div>

        <div className="text-center">
          <div className="flex justify-center gap-1">
            {["S", "H", "I", "V", "A", "S", "H"].map((letter, i) => (
              <motion.span
                key={i}
                className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-sm"
                style={{
                  backgroundColor: i < foundLetters.length ? "var(--accent-primary)" : "var(--bg-secondary)",
                  color: i < foundLetters.length ? "white" : "transparent",
                }}
              >
                {i < foundLetters.length ? letter : "?"}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {ingredients.map((ing) => (
            <motion.button
              key={ing.id}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => addToPot(ing)}
              className="w-16 h-16 rounded-xl flex flex-col items-center justify-center cursor-pointer border-2 border-white/10"
              style={{ backgroundColor: `${ing.color}20` }}
            >
              <span className="text-2xl">{ing.emoji}</span>
              <span className="text-[8px]">{ing.name}</span>
            </motion.button>
          ))}
        </div>

        <Card className="!p-4 text-center">
          <h3 className="font-bold mb-2">🍲 The Pot</h3>
          <div className="flex justify-center gap-1 min-h-[40px] items-center">
            {pot.length === 0 ? (
              <p className="text-sm text-[var(--text-secondary)]">Empty - add ingredients!</p>
            ) : (
              pot.map((ing, i) => (
                <motion.span key={i} className="text-2xl" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  {ing.emoji}
                </motion.span>
              ))
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={cook}
            disabled={pot.length === 0}
            className="mt-3 px-6 py-2 rounded-xl bg-orange-500 text-white font-bold text-sm disabled:opacity-50"
          >
            🔥 Cook!
          </motion.button>
        </Card>

        <div className="space-y-1">
          {recipes.map((recipe) => (
            <div key={recipe.name} className={`flex items-center gap-2 p-2 rounded-lg ${completedRecipes.includes(recipe.name) ? "bg-green-500/10" : "bg-white/5"}`}>
              <span className="text-lg">{recipe.emoji}</span>
              <span className="text-sm font-bold flex-1">{recipe.name}</span>
              {completedRecipes.includes(recipe.name) ? (
                <span className="text-green-400 text-xs font-bold">✓ Cooked!</span>
              ) : (
                <span className="text-xs text-[var(--text-secondary)]">
                  {recipe.required.filter((id) => addedIngredients.includes(id)).length}/{recipe.required.length}
                </span>
              )}
            </div>
          ))}
        </div>

        {foundLetters.length === 7 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
            <Card glow className="!p-6">
              <span className="text-5xl block mb-2">👨‍🍳</span>
              <h2 className="text-3xl font-black text-[var(--accent-primary)]">SHIVASH</h2>
              <p className="text-[var(--text-secondary)] text-sm">The secret ingredient was the name!</p>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
