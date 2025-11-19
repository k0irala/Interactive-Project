'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  hue: number
}

interface ParticleCanvasProps {
  particleCount: number
  speed: number
  color: string
  isPaused: boolean
}

export default function ParticleCanvas({
  particleCount,
  speed,
  color,
  isPaused,
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  const colorMap: Record<string, string> = {
    cyan: 'hsl(180, 100%, 50%)',
    magenta: 'hsl(300, 100%, 50%)',
    lime: 'hsl(120, 100%, 50%)',
    amber: 'hsl(45, 100%, 50%)',
    rose: 'hsl(0, 100%, 50%)',
  }

  const initializeParticles = (canvas: HTMLCanvasElement) => {
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 4 * speed,
      vy: (Math.random() - 0.5) * 4 * speed,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.3,
      hue: Math.random() * 60,
    }))
  }

  const drawParticles = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw connections
    ctx.strokeStyle = `${colorMap[color]}40`
    ctx.lineWidth = 1

    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const dx = particlesRef.current[i].x - particlesRef.current[j].x
        const dy = particlesRef.current[i].y - particlesRef.current[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          ctx.globalAlpha = 1 - distance / 150
          ctx.beginPath()
          ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
          ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
          ctx.stroke()
        }
      }
    }

    ctx.globalAlpha = 1

    // Draw particles
    particlesRef.current.forEach((particle) => {
      ctx.fillStyle = colorMap[color]
      ctx.globalAlpha = particle.alpha
      ctx.shadowColor = colorMap[color]
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fill()
    })

    ctx.globalAlpha = 1
    ctx.shadowBlur = 0
  }

  const updateParticles = (canvas: HTMLCanvasElement) => {
    if (isPaused) return

    particlesRef.current.forEach((particle) => {
      // Update velocity based on speed
      particle.vx *= speed / 1 || 1
      particle.vy *= speed / 1 || 1

      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Mouse attraction
      const dx = mouseRef.current.x - particle.x
      const dy = mouseRef.current.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 200) {
        particle.vx += (dx / distance) * 0.3
        particle.vy += (dy / distance) * 0.3
      }

      // Bounce off walls
      if (particle.x - particle.radius < 0 || particle.x + particle.radius > canvas.width) {
        particle.vx *= -1
        particle.x = Math.max(particle.radius, Math.min(canvas.width - particle.radius, particle.x))
      }
      if (particle.y - particle.radius < 0 || particle.y + particle.radius > canvas.height) {
        particle.vy *= -1
        particle.y = Math.max(particle.radius, Math.min(canvas.height - particle.radius, particle.y))
      }

      // Damping
      particle.vx *= 0.99
      particle.vy *= 0.99
    })
  }

  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    updateParticles(canvas)
    drawParticles(ctx, canvas)
    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx))
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Initialize particles
    initializeParticles(canvas)

    // Start animation
    animate(canvas, ctx)

    // Handle mouse move
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [color, isPaused, particleCount, speed])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 cursor-crosshair"
    />
  )
}
