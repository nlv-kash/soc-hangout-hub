import { Shield, Heart, FileText, Link as LinkIcon, Activity, Coffee } from "lucide-react";
import TeamPulse from "./_components/team-pulse";
import KudosWall from "./_components/kudos-wall";
import HandoffNotes from "./_components/handoff-notes";
import CoffeeCounter from "./_components/coffee-counter";
import StatusCard from "./_components/status-card";
import QuickLinks from "./_components/quick-links";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/80 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              SOC Team Hangout Hub
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <section className="text-center py-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Welcome to Your Command Center
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Stay connected, share wins, and keep the team synced. Your one-stop hub for all things SOC.
          </p>
        </section>

        {/* Top Row: Team Pulse & Status Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TeamPulse />
          </div>
          <div>
            <StatusCard />
          </div>
        </div>

        {/* Quick Links */}
        <QuickLinks />

        {/* Middle Row: Kudos Wall & Coffee Counter */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <KudosWall />
          </div>
          <div>
            <CoffeeCounter />
          </div>
        </div>

        {/* Handoff Notes */}
        <HandoffNotes />
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 border-t border-cyan-500/20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>Test app built in Abacus Deep Agent • localStorage only • no backend</p>
        </div>
      </footer>
    </div>
  );
}
