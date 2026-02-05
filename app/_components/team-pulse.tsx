"use client";

import { useState, useEffect } from "react";
import { Activity, Smile, Meh, Moon, Flame, Zap } from "lucide-react";
import { motion } from "framer-motion";

const moods = [
  { emoji: "😊", label: "Happy", icon: Smile, color: "text-green-400" },
  { emoji: "😐", label: "Neutral", icon: Meh, color: "text-yellow-400" },
  { emoji: "😴", label: "Tired", icon: Moon, color: "text-blue-400" },
  { emoji: "🔥", label: "On Fire", icon: Flame, color: "text-orange-400" },
  { emoji: "💪", label: "Energized", icon: Zap, color: "text-purple-400" },
];

const todaysFocus = [
  "Monitor critical alerts",
  "Review incident reports",
  "Update threat intelligence",
  "Team sync at 2 PM",
  "Security audit review",
];

export default function TeamPulse() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("soc_team_mood");
    if (saved) {
      setSelectedMood(parseInt(saved));
    }
  }, []);

  const handleMoodSelect = (index: number) => {
    setSelectedMood(index);
    if (mounted) {
      localStorage.setItem("soc_team_mood", index.toString());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 shadow-lg shadow-cyan-500/10"
    >
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">Team Pulse</h2>
      </div>

      {/* Mood Selector */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">How are you feeling today?</h3>
        <div className="grid grid-cols-5 gap-3">
          {moods.map((mood, index) => {
            const Icon = mood.icon;
            return (
              <motion.button
                key={index}
                onClick={() => handleMoodSelect(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                  selectedMood === index
                    ? "bg-cyan-500/20 border-2 border-cyan-400"
                    : "bg-gray-700/50 border-2 border-transparent hover:border-cyan-500/50"
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <Icon className={`w-4 h-4 ${selectedMood === index ? "text-cyan-400" : "text-gray-400"}`} />
                <span className={`text-xs ${selectedMood === index ? "text-cyan-400" : "text-gray-400"}`}>
                  {mood.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Today's Focus */}
      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Today&apos;s Focus</h3>
        <ul className="space-y-2">
          {todaysFocus.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 text-gray-300"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
