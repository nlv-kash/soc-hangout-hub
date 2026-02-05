"use client";

import { useState, useEffect } from "react";
import { Activity, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function StatusCard() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 shadow-lg shadow-cyan-500/10 h-full"
    >
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-6 h-6 text-cyan-400" />
        <h2 className="text-xl font-bold text-white">Status</h2>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400 mb-1">Environment</p>
          <p className="text-lg font-semibold text-white">Test</p>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-2">Site Status</p>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold border border-green-500/30">
              Online
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-1">Last Updated</p>
          <p className="text-sm text-cyan-400 font-mono">{currentTime || "Loading..."}</p>
        </div>
      </div>
    </motion.div>
  );
}
