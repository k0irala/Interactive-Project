'use client'

import { useState, useEffect } from 'react'

interface StatsPanelProps {
  particleCount: number
}

export default function StatsPanel({ particleCount }: StatsPanelProps) {
  const [fps, setFps] = useState(60)
  const [frameCount, setFrameCount] = useState(0)

  useEffect(() => {
    let lastTime = Date.now()
    let count = 0

    const interval = setInterval(() => {
      const now = Date.now()
      const delta = now - lastTime
      if (delta >= 1000) {
        setFps(Math.round(count))
        lastTime = now
        count = 0
      } else {
        count++
      }
    }, 1)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4 max-w-xs">
      <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
          System Status
        </h2>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">Particles</span>
            <span className="text-sm font-mono text-cyan-300">{particleCount}</span>
          </div>
          <div className="w-full bg-gray-800/50 rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
              style={{ width: `${(particleCount / 500) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Frame Rate</span>
          <span className="text-sm font-mono text-lime-400">{fps} FPS</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Memory</span>
          <span className="text-sm font-mono text-amber-400">8.2 MB</span>
        </div>
      </div>
    </div>
  )
}
