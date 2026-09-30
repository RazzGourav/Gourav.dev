"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState } from "react"
import { Github, Linkedin, FileText, Menu, X } from "lucide-react"
import { personalInfo, navLinks } from "@/lib/data"
import { MagneticButton } from "../ui-custom/MagneticButton"

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { scrollYProgress } = useScroll()
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  // Handle active section detection
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(id)
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        style={{ opacity: navOpacity }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden lg:flex items-center gap-1 bg-background/70 backdrop-blur-xl border border-border/30 rounded-2xl px-6 py-3 shadow-2xl shadow-black/20"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mr-6">
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500" />
          <span className="font-serif font-bold text-lg gradient-text">Gourav.dev</span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <MagneticButton
              key={link.href}
              onClick={() => handleNavClick(link.href.slice(1))}
              className={`px-4 py-2 text-sm font-medium transition-all rounded-xl ${
                activeSection === link.href.slice(1)
                  ? "text-white bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-500/30"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </MagneticButton>
          ))}
        </div>

        {/* Social Actions */}
        <div className="flex items-center gap-2 ml-6">
          <div className="w-px h-6 bg-border/50" />
          <MagneticButton
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-violet-500/10 hover:text-violet-400 rounded-lg text-muted-foreground hover:text-violet-400"
          >
            <Github className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-violet-500/10 hover:text-violet-400 rounded-lg text-muted-foreground hover:text-violet-400"
          >
            <Linkedin className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton
            href={personalInfo.resumeUrl}
            download
            className="px-3 py-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white rounded-xl text-sm font-medium"
          >
            <FileText className="w-4 h-4 mr-2 inline" />
            Resume
          </MagneticButton>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        className="fixed top-4 right-4 lg:hidden z-50"
        style={{ opacity: navOpacity }}
      >
        <div className="flex items-center gap-2">
          <MagneticButton
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 bg-background/70 backdrop-blur-xl border border-border/30 rounded-xl shadow-2xl shadow-black/20 text-white"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </MagneticButton>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 bg-background/90 backdrop-blur-xl border border-border/30 rounded-2xl shadow-2xl shadow-black/30 overflow-hidden"
          >
            <div className="p-4 space-y-1 w-64">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href.slice(1))}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === link.href.slice(1)
                      ? "text-white bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border border-violet-500/30"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-3 border-t border-border/30 mt-3">
                <div className="flex items-center justify-between px-4 py-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
                <a
                  href={personalInfo.resumeUrl}
                  download
                  className="block w-full text-center px-4 py-3 mt-2 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white rounded-lg text-sm font-medium"
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  )
}