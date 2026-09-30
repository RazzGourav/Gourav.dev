"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Sparkles, Download, ExternalLink } from "lucide-react"
import { personalInfo } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Scene3D from "@/components/3d/Scene3D"
import { NeuralCore } from "@/components/3d/NeuralCore"
import ParticleGalaxy from "@/components/3d/ParticleGalaxy"
import { useMousePosition, useDeviceCapability } from "@/lib/hooks"
import dynamic from "next/dynamic"

const DynamicNeuralCore = dynamic(
  () => import("@/components/3d/NeuralCore").then(mod => ({ default: mod.NeuralCore })),
  { ssr: false }
)

// Typewriter effect for roles
function RoleCycler() {
  const [activeRole, setActiveRole] = useState(0)
  const roles = personalInfo.roles

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRole(prev => (prev + 1) % roles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [roles.length])

  return (
    <div className="relative h-8">
      {roles.map((role, index) => (
        <motion.div
          key={role}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: activeRole === index ? 1 : 0, y: activeRole === index ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="font-code text-lg md:text-xl text-cyan-400">
            {role}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

interface HeroSectionProps {
  scrollToSection: (id: string) => void
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll()
  const mouse = useMousePosition()
  const tier = useDeviceCapability()

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95])

  // Environment progress for Neural Core
  const environmentProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  }

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Deep Space 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene3D style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          <ParticleGalaxy
            count={tier === "high" ? 2500 : tier === "medium" ? 1500 : 800}
            radius={6}
            branches={tier === "high" ? 7 : tier === "medium" ? 5 : 3}
            colorInside="#8b5cf6"
            colorOutside="#06b6d4"
          />
          {tier !== "low" && (
            <DynamicNeuralCore
              mouse={mouse}
              scrollProgress={environmentProgress.get()}
              tier={tier}
            />
          )}
        </Scene3D>
      </div>

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent z-[1]" />

      {/* Hero Content */}
      <motion.div
        style={{
          y: heroY,
          opacity: heroOpacity,
          scale: heroScale,
        }}
        className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20"
      >
        {/* 3D Avatar Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative mx-auto w-40 h-40 mb-10"
        >
          {/* Outer orbital rings */}
          <div className="absolute inset-[-8px] rounded-full border-2 border-transparent bg-gradient-to-br from-violet-500/30 via-cyan-500/20 to-transparent animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-[-16px] rounded-full border border-violet-500/10 animate-[spin_16s_linear_infinite_reverse]" />

          {/* Avatar with 3D effect */}
          <div className="relative w-40 h-40">
            <Avatar className="w-40 h-40 ring-2 ring-violet-500/30 ring-offset-4 ring-offset-background shadow-2xl shadow-violet-500/20">
              <AvatarImage
                src="/software-developer-headshot.jpeg?v=1.1"
                alt="Gourav Kumar Ojha"
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-violet-600 to-cyan-500 text-white">
                GKO
              </AvatarFallback>
            </Avatar>

            {/* Holographic glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/10 blur-xl animate-pulse opacity-70" />
          </div>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 animate-float"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`,
                left: `${20 + Math.cos(i * 1.047) * 80}px`,
                top: `${20 + Math.sin(i * 1.047) * 80}px`,
              }}
            />
          ))}
        </motion.div>

        {/* Main Title */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-6"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold mb-4 tracking-tight">
            <span className="hero-title-3d block mb-4">
              Gourav Kumar
            </span>
            <span className="gradient-text block">
              Ojha
            </span>
          </h1>
        </motion.div>

        {/* Role Cycler */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-8"
        >
          <RoleCycler />
        </motion.div>

        {/* Status Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 backdrop-blur-sm border border-border/50">
            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">
              Building intelligent systems at the intersection of AI, research and real-world impact
            </span>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 1.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {personalInfo.statPills.map((stat, index) => (
            <motion.div
              key={stat}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              className="stat-pill-3d flex items-center gap-2 px-5 py-3 rounded-full bg-background/40 backdrop-blur-xl border border-border/50 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500" />
              <span>{stat}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            size="lg"
            onClick={() => scrollToSection("research")}
            className="btn-magnetic bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white shadow-2xl shadow-violet-500/20 px-10 py-6 group"
          >
            <Sparkles className="mr-2 w-5 h-5 group-hover:animate-spin" />
            Explore My Research
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="btn-magnetic border-violet-500/30 text-violet-400 hover:bg-violet-500/10 hover:border-violet-500/50 hover:text-white bg-transparent px-10 py-6"
          >
            <a href="/resume.pdf" download>
              <Download className="mr-2 w-5 h-5" />
              Download Resume
            </a>
          </Button>
        </motion.div>

        {/* Quick Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex justify-center gap-4 mb-20"
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-3d p-4 rounded-xl bg-background/30 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-violet-500/10"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-3d p-4 rounded-xl bg-background/30 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="social-icon-3d p-4 rounded-xl bg-background/30 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/10"
            aria-label="Email"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-8"
        >
          <button
            onClick={() => scrollToSection("about")}
            className="mx-auto block group"
            aria-label="Scroll to explore"
          >
            <div className="space-y-2">
              <ChevronDown className="w-6 h-6 text-violet-400/50 animate-bounce mx-auto" />
              <div className="text-xs text-muted-foreground/50 font-code uppercase tracking-wider animate-pulse">
                SCROLL TO EXPLORE
              </div>
              <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent mx-auto" />
            </div>
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
