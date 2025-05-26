"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

type SplitTextProps = {
  children: string
  className?: string
  type?: "words" | "chars"
  animation?: "fade" | "slide" | "bounce" | "scale"
}

export function SplitText({ children, className = "", type = "words", animation = "fade" }: SplitTextProps) {
  // Split text into words or characters
  const items = type === "words" ? children.split(" ") : children.split("")

  // Animation variants
  const animations = {
    fade: {
      hidden: { opacity: 0 },
      visible: (i: number) => ({
        opacity: 1,
        transition: { duration: 0.5, delay: i * 0.1 },
      }),
    },
    slide: {
      hidden: { opacity: 0, y: 50 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.1 },
      }),
    },
    bounce: {
      hidden: { opacity: 0, y: 50 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: i * 0.1,
          type: "spring",
          stiffness: 200,
          damping: 10,
        },
      }),
    },
    scale: {
      hidden: { opacity: 0, scale: 0.5 },
      visible: (i: number) => ({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay: i * 0.1 },
      }),
    },
  }

  const selectedAnimation = animations[animation]

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`inline-block ${className}`}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={selectedAnimation}
          className="inline-block"
          style={{ marginRight: type === "words" ? "0.25em" : 0 }}
        >
          {item}
          {type === "chars" && items.length - 1 !== i ? "" : ""}
        </motion.span>
      ))}
    </motion.span>
  )
}

// For colored gradient text with animation
export function AnimatedGradientText({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent ${className}`}
      initial={{ backgroundPosition: "0 0" }}
      whileInView={{
        backgroundPosition: ["0 0", "100% 0", "0 0"],
        transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "linear" },
      }}
      viewport={{ once: false }}
    >
      {children}
    </motion.span>
  )
}

// Text reveal animation (gradient sweep)
export function TextReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}
