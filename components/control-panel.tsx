'use client'

import { Play, Pause, RotateCcw } from 'lucide-react'

interface ControlPanelProps {
  particleCount: number
  setParticleCount: (count: number) => void
  speed: number
  setSpeed: (speed: number) => void
  color: string
  setColor: (color: string) => void
  isPaused: boolean
  setIsPaused: (paused: boolean) => void
}

export default function ControlPanel({
  particleCount,
  setParticleCount,
  speed,
  setSpeed,
  color,
  setColor,
  isPaused,
  setIsPaused,
}: ControlPanelProps) {
  const colors = ['cyan', 'magenta', 'lime', 'amber', 'rose']

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 space-y-6 max-w-sm">
      <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
        Controls
      </h2>

      {/* Particle Count Slider */}
      <div className="space-y-2">
        <label className="text-xs text-gray-400">Particle Count</label>
        <input
          type="range"
          min="10"
          max="500"
          value={particleCount}
          onChange={(e) => setParticleCount(Number(e.target.value))}
          className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>10</span>
          <span className="text-cyan-400 font-mono">{particleCount}</span>
          <span>500</span>
        </div>
      </div>

      {/* Speed Slider */}
      <div className="space-y-2">
        <label className="text-xs text-gray-400">Speed Multiplier</label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-lime-500"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0.1x</span>
          <span className="text-lime-400 font-mono">{speed.toFixed(1)}x</span>
          <span>3x</span>
        </div>
      </div>

      {/* Color Selection */}
      <div className="space-y-3">
        <label className="text-xs text-gray-400">Particle Color</label>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-full aspect-square rounded-lg transition-all transform hover:scale-105 ${
                color === c ? 'ring-2 ring-offset-2 ring-offset-black' : ''
              }`}
              style={{
                backgroundColor:
                  c === 'cyan'
                    ? '#00FFFF'
                    : c === 'magenta'
                      ? '#FF00FF'
                      : c === 'lime'
                        ? '#00FF00'
                        : c === 'amber'
                          ? '#FFBF00'
                          : '#FF0000',
              }}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
        >
          {isPaused ? (
            <>
              <Play size={18} /> Resume
            </>
          ) : (
            <>
              <Pause size={18} /> Pause
            </>
          )}
        </button>
        <button
          onClick={() => window.location.reload()}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95"
        >
          <RotateCcw size={18} /> Reset
        </button>
      </div>
    </div>
  )
}
