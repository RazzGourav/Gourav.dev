"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"
import { navLinks } from "@/lib/data"
import dynamic from "next/dynamic"

// Import Sections
import HeroSection from "@/sections/HeroSection"
import AboutSection from "@/sections/AboutSection"
import ResearchSection from "@/sections/ResearchSection"
import ExperienceSection from "@/sections/ExperienceSection"
import ProjectsSection from "@/sections/ProjectsSection"
import EducationSection from "@/sections/EducationSection"
import SkillsSection from "@/sections/SkillsSection"
import CertificationsSection from "@/sections/CertificationsSection"
import AchievementsSection from "@/sections/AchievementsSection"
import ContactSection from "@/sections/ContactSection"

const PhotoCarousel3D = dynamic(() => import("@/components/3d/PhotoCarousel3D"), { ssr: false })

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#07060e] flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        <div className="cube-loader mx-auto">
          <div className="cube-face cube-front" />
          <div className="cube-face cube-back" />
          <div className="cube-face cube-right" />
          <div className="cube-face cube-left" />
          <div className="cube-face cube-top" />
          <div className="cube-face cube-bottom" />
        </div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold gradient-text font-serif">Gourav.dev</h2>
          <div className="flex items-center justify-center gap-1 font-code text-xs text-violet-400/70">
            <span>scene</span><span className="text-cyan-400">.</span><span>initialize</span>
            <span className="text-cyan-400">(</span><span className="text-emerald-400">&apos;3D&apos;</span><span className="text-cyan-400">)</span>
            <span className="inline-block w-[2px] h-4 bg-violet-400 animate-cursor-blink ml-0.5" />
          </div>
          <div className="w-48 h-1 bg-muted rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full animate-loading-bar" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500 origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`
        glowRef.current.style.top = `${e.clientY}px`
      }
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <div
      ref={glowRef}
      className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-[9998] hidden lg:block"
      style={{
        background: "radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
      }}
    />
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", ...navLinks.map((n) => n.href.substring(1))]
      const scrollPosition = window.scrollY + 150

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-background text-foreground noise-overlay">
      <ScrollProgressBar />
      <CursorGlow />

      <motion.nav
        style={{ opacity: navOpacity }}
        className="fixed top-0 w-full bg-background/70 backdrop-blur-xl border-b border-border/50 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => scrollToSection("hero")} className="font-serif font-bold text-xl gradient-text">
              Gourav.dev
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href.substring(1))}
                  className={`nav-link px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-muted/50 ${
                    activeSection === item.href.substring(1)
                      ? "text-violet-400 active"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="w-px h-6 bg-border mx-2" />
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                title="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                title="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                title="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-border/50 overflow-hidden"
              >
                <div className="py-3 space-y-1">
                  {navLinks.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href.substring(1))}
                      className={`block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        activeSection === item.href.substring(1)
                          ? "text-violet-400 bg-violet-500/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <HeroSection scrollToSection={scrollToSection} />
      <AboutSection />
      <ResearchSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <AchievementsSection />
      <EducationSection />
      <CertificationsSection />
      <ContactSection />
      
      {/* 3D Photo Carousel at the bottom */}
      <section className="py-24 relative overflow-hidden hidden md:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 h-[500px]">
          <PhotoCarousel3D />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-serif font-bold text-2xl gradient-text mb-4">Gourav.dev</p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6 font-code">
            <span>Build.</span>
            <span className="w-1 h-1 rounded-full bg-violet-500" />
            <span>Research.</span>
            <span className="w-1 h-1 rounded-full bg-cyan-500" />
            <span>Experiment.</span>
            <span className="w-1 h-1 rounded-full bg-violet-500" />
            <span>Repeat.</span>
          </div>
          <p className="text-muted-foreground/50 text-xs">
            © {new Date().getFullYear()} Gourav Kumar Ojha. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
