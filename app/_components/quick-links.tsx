"use client";

import { BarChart3, BookOpen, Phone, FileText, GraduationCap, Wrench, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const links = [
  { icon: BarChart3, label: "Dashboards", href: "#", color: "text-cyan-400" },
  { icon: BookOpen, label: "Runbooks", href: "#", color: "text-blue-400" },
  { icon: Phone, label: "On-call", href: "#", color: "text-green-400" },
  { icon: FileText, label: "Wiki", href: "#", color: "text-purple-400" },
  { icon: GraduationCap, label: "Learning", href: "#", color: "text-pink-400" },
  { icon: Wrench, label: "Tools", href: "#", color: "text-orange-400" },
];

export default function QuickLinks() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyLink = (href: string, label: string, index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const fullUrl = window.location.origin + href;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedIndex(index);
      toast.success(`${label} link copied to clipboard!`);
      setTimeout(() => setCopiedIndex(null), 2000);
    }).catch(() => {
      toast.error("Failed to copy link");
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span>Quick Links</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {links.map((link, index) => {
          const Icon = link.icon;
          const isCopied = copiedIndex === index;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative group"
            >
              <motion.a
                href={link.href}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 shadow-lg hover:shadow-cyan-500/20 transition-all flex flex-col items-center gap-3"
              >
                <Icon className={`w-8 h-8 ${link.color} group-hover:scale-110 transition-transform`} />
                <span className="text-white font-semibold text-center">{link.label}</span>
              </motion.a>
              
              {/* Copy Button */}
              <motion.button
                onClick={(e) => handleCopyLink(link.href, link.label, index, e)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 bg-gray-700/80 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
                title="Copy link"
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-cyan-400" />
                )}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
