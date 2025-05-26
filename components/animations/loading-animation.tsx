"use client"

import React from "react"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

type LoadingDotsProps = {
  className?: string
  color?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingDots({ className = "", color = "currentColor", size = "md" }: LoadingDotsProps) {
  const dotSizes = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  }

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className={`rounded-full ${dotSizes[size]}`}
          style={{ backgroundColor: color }}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY, delay: dot * 0.2 }}
        />
      ))}
    </div>
  )
}

export function FadeInWhenVisible({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerChildren({
  children,
  className = "",
  delayStep = 0.1,
  duration = 0.5,
}: {
  children: ReactNode
  className?: string
  delayStep?: number
  duration?: number
}) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delayStep,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration },
    },
  }

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return (
            <motion.div key={index} variants={item}>
              {child}
            </motion.div>
          )
        }
        return child
      })}
    </motion.div>
  )
}
