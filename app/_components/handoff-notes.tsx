"use client";

import { useState, useEffect } from "react";
import { FileText, Save } from "lucide-react";
import { motion } from "framer-motion";

export default function HandoffNotes() {
  const [notes, setNotes] = useState("");
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("soc_handoff_notes");
    if (saved) {
      setNotes(saved);
    }
    const savedTime = localStorage.getItem("soc_handoff_notes_time");
    if (savedTime) {
      setLastSaved(savedTime);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      localStorage.setItem("soc_handoff_notes", notes);
      const now = new Date().toLocaleString();
      localStorage.setItem("soc_handoff_notes_time", now);
      setLastSaved(now);
    }, 1000);

    return () => clearTimeout(timer);
  }, [notes, mounted]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 shadow-lg shadow-cyan-500/10"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Handoff Notes</h2>
        </div>
        {lastSaved && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Save className="w-4 h-4 text-green-400" />
            <span>Saved: {lastSaved}</span>
          </div>
        )}
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your handoff notes here... They'll auto-save as you type."
        className="w-full h-48 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
      />
      <p className="text-xs text-gray-500 mt-2">Auto-saves every second</p>
    </motion.div>
  );
}
