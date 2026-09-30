"use client"

import { cn } from "@/lib/utils"
import { motion, type HTMLMotionProps } from "framer-motion"
import { useRef, useState, type ReactNode } from "react"

interface MagneticButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode
  className?: string
  variant?: "primary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  magneticStrength?: number
  href?: string
  target?: string
  rel?: string
  download?: boolean
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  size = "md",
  magneticStrength = 0.3,
  href,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * magneticStrength
    const y = (e.clientY - rect.top - rect.height / 2) * magneticStrength
    setPosition({ x, y })
  }

  const handleLeave = () => setPosition({ x: 0, y: 0 })

  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40",
    outline:
      "border border-violet-500/30 text-violet-300 hover:bg-violet-500/10 hover:border-violet-400/50",
    ghost:
      "text-violet-300 hover:bg-violet-500/10",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      ref={ref as any}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium",
        "transition-all duration-300 overflow-hidden",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060A]",
        variants[variant],
        sizes[size],
        className
      )}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      href={href}
      {...(props as any)}
    >
      {children}
    </Component>
  )
}
