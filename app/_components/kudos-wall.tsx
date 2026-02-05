"use client";

import { useState, useEffect } from "react";
import { Heart, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Kudos {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export default function KudosWall() {
  const [kudosList, setKudosList] = useState<Kudos[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("soc_kudos");
    if (saved) {
      try {
        setKudosList(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading kudos:", e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newKudos: Kudos = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleString(),
    };

    const updated = [newKudos, ...kudosList];
    setKudosList(updated);
    if (mounted) {
      localStorage.setItem("soc_kudos", JSON.stringify(updated));
    }
    setName("");
    setMessage("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 shadow-lg shadow-cyan-500/10"
    >
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-6 h-6 text-pink-400" />
        <h2 className="text-2xl font-bold text-white">Kudos Wall</h2>
      </div>

      {/* Kudos Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
            maxLength={50}
          />
          <input
            type="text"
            placeholder="Shout out message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
            maxLength={200}
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          <Send className="w-4 h-4" />
          Send Kudos
        </motion.button>
      </form>

      {/* Kudos Display */}
      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-700">
        <AnimatePresence>
          {kudosList.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No kudos yet. Be the first to share some appreciation!</p>
          ) : (
            kudosList.map((kudos) => (
              <motion.div
                key={kudos.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gray-700/30 rounded-lg p-4 border border-pink-500/20 hover:border-pink-500/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-semibold text-cyan-400">{kudos.name}</span>
                  <span className="text-xs text-gray-500">{kudos.timestamp}</span>
                </div>
                <p className="text-gray-300">{kudos.message}</p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
