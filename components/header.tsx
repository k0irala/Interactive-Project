'use client'

import { Zap } from 'lucide-react'

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 border-b border-cyan-500/10 bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            Particle System
          </h1>
        </div>
        <p className="text-sm text-gray-400">Interactive Real-Time Visualization</p>
      </div>
    </header>
  )
}
