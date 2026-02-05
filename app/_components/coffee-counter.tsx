"use client";

import { useState, useEffect } from "react";
import { Coffee } from "lucide-react";
import { motion } from "framer-motion";

export default function CoffeeCounter() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("soc_coffee_count");
    if (saved) {
      setCount(parseInt(saved) || 0);
    }
  }, []);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (mounted) {
      localStorage.setItem("soc_coffee_count", newCount.toString());
    }
  };

  const handleReset = () => {
    setCount(0);
    if (mounted) {
      localStorage.setItem("soc_coffee_count", "0");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 shadow-lg shadow-cyan-500/10 h-full flex flex-col"
    >
      <div className="flex items-center gap-2 mb-6">
        <Coffee className="w-6 h-6 text-amber-400" />
        <h2 className="text-xl font-bold text-white">Coffee Counter</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          key={count}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-6"
        >
          {count}
        </motion.div>
        <p className="text-gray-400 text-sm mb-6 text-center">Cups today</p>
        <motion.button
          onClick={handleIncrement}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold mb-3 hover:shadow-lg hover:shadow-amber-500/50 transition-all"
        >
          Add Coffee ☕
        </motion.button>
        <motion.button
          onClick={handleReset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg text-sm hover:bg-gray-700 transition-colors"
        >
          Reset
        </motion.button>
      </div>
    </motion.div>
  );
}
