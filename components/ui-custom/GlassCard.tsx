"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  onClick?: () => void
}

export function GlassCard({ children, className, hover = true, glow = false, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl",
        "transition-all duration-500",
        hover && "hover:border-violet-500/20 hover:bg-white/[0.04] hover:shadow-[0_8px_40px_rgba(139,92,246,0.08)]",
        glow && "glow-card",
        onClick && "cursor-pointer",
        className
      )}
      whileHover={hover ? { y: -2 } : undefined}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </motion.div>
  )
}
