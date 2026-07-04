import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { products } from "../data/mockData";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

export default function FantasyShop() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [flipId, setFlipId] = useState(null);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setFlipId(product.id);
    setTimeout(() => setFlipId(null), 800);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto space-y-6">
        <motion.div
          className="flex items-center justify-between"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div>
            <h1 className="text-3xl font-black">🛒 Fantasy Shop</h1>
            <p className="text-[var(--text-secondary)] text-sm">Only the weirdest items</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCart(!showCart)}
            className="relative px-4 py-2 rounded-xl glass text-sm font-bold"
          >
            🛍️ Cart ({cart.length})
            {cart.length > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {cart.length}
              </motion.span>
            )}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <Card className="!p-4">
                <h3 className="font-bold mb-2">🛍️ Your Cart</h3>
                {cart.length === 0 ? (
                  <p className="text-sm text-[var(--text-secondary)]">Cart is empty</p>
                ) : (
                  <div className="space-y-1">
                    {cart.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span>{item.emoji} {item.name}</span>
                        <span className="text-[var(--accent-primary)] font-bold">${item.price}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/10 pt-2 mt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-[var(--accent-primary)]">${total}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-2 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-bold text-sm"
                    >
                      ✨ Checkout (Fake)
                    </motion.button>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          variants={staggerContainer}
          initial="initial"
          animate="in"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={staggerItem} className="perspective-[600px]">
              <motion.div
                className="relative"
                animate={{ rotateY: flipId === product.id ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className={`!p-4 ${flipId === product.id ? "backface-hidden" : ""}`}>
                  <motion.span
                    className="text-4xl block mb-2"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {product.emoji}
                  </motion.span>
                  <h3 className="font-bold text-sm">{product.name}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{product.desc}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-black text-[var(--accent-primary)]">${product.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart(product)}
                      className="px-3 py-1 text-xs rounded-full bg-[var(--accent-primary)] text-white font-bold"
                    >
                      🛒 Add
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
}
