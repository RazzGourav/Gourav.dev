"use client"

import { motion } from "framer-motion"

interface SectionTitleProps {
  title: string
  subtitle?: string
  codeComment?: string
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function SectionTitle({ title, subtitle, codeComment }: SectionTitleProps) {
  return (
    <div className="text-center mb-16">
      {codeComment && (
        <motion.p
          variants={fadeIn}
          className="font-code text-xs text-violet-400/60 mb-3 tracking-wider uppercase"
        >
          {codeComment}
        </motion.p>
      )}
      <motion.h2
        variants={fadeInUp}
        className="font-serif text-4xl md:text-5xl font-bold mb-4"
      >
        <span className="gradient-text">{title}</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className="text-muted-foreground max-w-2xl mx-auto text-lg"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        variants={fadeIn}
        className="mt-6 mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent"
      />
    </div>
  )
}
