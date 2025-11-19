'use client'

import { useEffect, useRef, useState } from 'react'
import ParticleCanvas from '@/components/particle-canvas'
import StatsPanel from '@/components/stats-panel'
import ControlPanel from '@/components/control-panel'
import Header from '@/components/header'

export default function Home() {
  const [particleCount, setParticleCount] = useState(150)
  const [speed, setSpeed] = useState(1)
  const [color, setColor] = useState('cyan')
  const [isPaused, setIsPaused] = useState(false)

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Header />
      
      <div className="relative w-full h-screen flex items-center justify-center">
        <ParticleCanvas 
          particleCount={particleCount}
          speed={speed}
          color={color}
          isPaused={isPaused}
        />
        
        {/* Overlay panels */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
          <div className="pointer-events-auto">
            <StatsPanel particleCount={particleCount} />
          </div>
          
          <div className="pointer-events-auto self-end">
            <ControlPanel 
              particleCount={particleCount}
              setParticleCount={setParticleCount}
              speed={speed}
              setSpeed={setSpeed}
              color={color}
              setColor={setColor}
              isPaused={isPaused}
              setIsPaused={setIsPaused}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
