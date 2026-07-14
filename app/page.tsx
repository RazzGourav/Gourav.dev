"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Github,
  Linkedin,
  Mail,
  Brain,
  Shield,
  ChevronDown,
  MapPin,
  Calendar,
  Award,
  Zap,
  ExternalLink,
  Download,
  Moon,
  Sun,
  Menu,
  X,
  Phone,
  Trophy,
  FileText,
  Rocket,
  GraduationCap,
  Code2,
  Database,
  Cloud,
  Globe,
  Cpu,
  Eye,
  BookOpen,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

/* ═══════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════ */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

/* ═══════════════════════════════════════════════════════
   ANIMATED SECTION WRAPPER
   ═══════════════════════════════════════════════════════ */

function AnimatedSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  )
}

/* ═══════════════════════════════════════════════════════
   PARTICLE CANVAS BACKGROUND
   ═══════════════════════════════════════════════════════ */

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; opacity: number
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initParticles = () => {
      particles = []
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x
          const dy = p.y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    initParticles()
    draw()
    window.addEventListener("resize", () => { resize(); initParticles() })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}

/* ═══════════════════════════════════════════════════════
   COUNTER ANIMATION
   ═══════════════════════════════════════════════════════ */

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      start = Math.floor(eased * target)
      setCount(start)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isInView, target])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

/* ═══════════════════════════════════════════════════════
   ROLE TYPEWRITER EFFECT
   ═══════════════════════════════════════════════════════ */

function TypewriterRoles() {
  const roles = [
    "AI/ML Researcher",
    "Deep Learning Engineer",
    "Defence-Tech Co-Founder",
    "ISRO Collaborator",
    "Full-Stack AI Developer",
  ]
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => setCharIndex(charIndex + 1), 80)
    } else if (!isDeleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(charIndex - 1), 40)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, roleIndex])

  return (
    <span className="font-code text-lg md:text-xl text-violet-400">
      {roles[roleIndex].slice(0, charIndex)}
      <span className="inline-block w-[2px] h-5 bg-violet-400 ml-0.5 animate-cursor-blink align-middle" />
    </span>
  )
}

/* ═══════════════════════════════════════════════════════
   PHOTO GALLERY COMPONENT
   ═══════════════════════════════════════════════════════ */

function PhotoGallery({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0)

  if (images.length <= 1) {
    return (
      <img
        src={images[0] || "/placeholder.svg"}
        alt={alt}
        className="w-full h-64 md:h-full object-contain bg-black/20"
      />
    )
  }

  return (
    <div className="relative w-full h-64 md:h-full group bg-black/20">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${alt} ${current + 1}`}
          className="w-full h-64 md:h-full object-contain absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>
      <button
        onClick={() => setCurrent((p) => (p - 1 + images.length) % images.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => setCurrent((p) => (p + 1) % images.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   SECTION HEADING
   ═══════════════════════════════════════════════════════ */

function SectionHeading({
  title,
  subtitle,
  codeComment,
}: {
  title: string
  subtitle?: string
  codeComment?: string
}) {
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

/* ═══════════════════════════════════════════════════════
   MAIN PORTFOLIO COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  // ─── Loading ───
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  // ─── Dark mode toggle ───
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  // ─── Active section on scroll ───
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero", "about", "publications", "experience",
        "projects", "education", "skills", "certifications",
        "achievements", "contact",
      ]
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

  const navItems = [
    { label: "About", id: "about" },
    { label: "Publications", id: "publications" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Achievements", id: "achievements" },
    { label: "Contact", id: "contact" },
  ]

  /* ═══════════════════════════════════════════════════════
     DATA
     ═══════════════════════════════════════════════════════ */

  const publications = [
    {
      title:
        "Interannual Evolution of Martian Dust Activity at Gale Crater: A Multi-Instrument Analysis Using Curiosity Rover and MCS Observations (MY32–MY36)",
      journal: "Planetary and Space Science, Elsevier",
      status: "Under Review, 2026",
      collaboration: "Indian Institute of Remote Sensing (ISRO)",
      icon: <Rocket className="w-5 h-5" />,
    },
    {
      title:
        "SETU-DRISHTI: An Explainable Patient-Centric Clinical Decision Support Framework for Early Sepsis Risk Stratification Using Temporal Physiological Features",
      journal: "Elsevier",
      status: "Under Review, 2026",
      collaboration: null,
      icon: <Brain className="w-5 h-5" />,
    },
  ]

  const experiences = [
    {
      role: "Research Collaborator – Planetary Science & Multi-Instrument Atmospheric Analysis",
      company: "Indian Institute of Remote Sensing (ISRO), Dehradun",
      type: "Remote",
      period: "Aug 2025 – Present",
      bullets: [
        "Designed and implemented a large-scale scientific data pipeline in Python correlating water vapor and dust opacity across multi-instrument datasets (MRO/MCS, Curiosity REMS/SAM, Hubble), processing 10TB+ of planetary observation data",
        "Applied ML and statistical modeling techniques for interannual atmospheric analysis and predictive modeling of Martian dust storm propagation across MY32–MY36",
      ],
      icon: <Rocket className="w-5 h-5" />,
    },
    {
      role: "Co-Founder & AI Engineer – AstraTech",
      company: "Rungta Business Incubation RIU, Bhilai",
      type: "Defence-Tech Startup | Team of 3",
      period: "Jan 2026 – Present",
      bullets: [
        "Building an autonomous border intrusion detection system fusing thermal (LWIR), mmWave radar, and seismic sensors with Edge AI for human vs. animal classification",
        "Design patent filed (Patent Pending) for hardware enclosure; currently in active product development phase",
      ],
      icon: <Shield className="w-5 h-5" />,
    },
    {
      role: "Research Intern – Supernova Cosmology Project",
      company: "India Space Week",
      type: "Remote",
      period: "Jun 2025 – Jul 2025",
      bullets: [
        "Estimated Hubble Constant from JWST/HST Type Ia Supernovae data; published findings on Hubble tension",
        "Compared results with Planck18 CMB data, refining ΛCDM models and exploring the H₀ tension",
      ],
      icon: <Globe className="w-5 h-5" />,
    },
    {
      role: "Open Source Contributor",
      company: "GirlScript Summer of Code (GSSoC 2024)",
      type: "Remote",
      period: "Oct 2024 – Nov 2024",
      bullets: [
        "ML modules across multiple repos; 15–20% performance improvements",
      ],
      icon: <Code2 className="w-5 h-5" />,
    },
  ]

  const projects = [
    {
      title: "SetuDrishti",
      tagline: "AI-Powered Clinical Decision Support System",
      description:
        "Conducted original research on explainable AI for clinical decision support; designed and evaluated a multi-modal deep learning framework for early sepsis risk stratification using temporal physiological features and RAG-based EHR retrieval. Research submitted as paper to Elsevier (Under Review).",
      technologies: ["PyTorch", "HuggingFace", "LangChain", "FastAPI", "PostgreSQL", "Docker", "SHAP", "LIME"],
      highlights: ["Elsevier Paper", "Explainable AI", "Multi-Modal DL", "RAG-based EHR"],
      icon: <Brain className="w-6 h-6" />,
      github: "#",
      demo: "https://setu-drishti-hpmu.vercel.app/",
      hasLive: true,
      color: "from-violet-500 to-purple-600",
    },
    {
      title: "LUMEN AI",
      tagline: "Enterprise Financial Assistant",
      description:
        "Multi-agentic RAG platform on GCP (Vertex AI, BigQuery) transforming unstructured financial documents into actionable insights with automated risk detection. Improved financial insight turnaround by 60%.",
      technologies: ["Python", "LangChain", "FastAPI", "Vector DBs", "Docker", "CI/CD", "GCP", "BigQuery"],
      highlights: ["60% Faster Insights", "Multi-Agent RAG", "GCP Integration", "Real-time Analysis"],
      icon: <Database className="w-6 h-6" />,
      github: "https://github.com/RazzGourav/LUMEN-AI",
      demo: "#",
      hasLive: false,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Mine-Sigma",
      tagline: "Satellite Mining Intelligence System",
      description:
        "Developed and evaluated a CNN + YOLO deep learning system for large-scale illegal mining detection from multispectral satellite imagery; applied NDVI analysis and geospatial feature engineering to achieve 98% classification accuracy.",
      technologies: ["PyTorch", "TensorFlow", "OpenCV", "GeoPandas", "Plotly", "YOLO"],
      highlights: ["98% Accuracy", "CNN + YOLO", "Satellite Imagery", "NDVI Analysis"],
      icon: <Eye className="w-6 h-6" />,
      github: "https://github.com/RazzGourav/Mine-Sigma",
      demo: "#",
      hasLive: false,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "HireMind AI",
      tagline: "Enterprise Candidate Intelligence Platform",
      description:
        "Production-ready, highly optimized Candidate Intelligence Platform using Hybrid Semantic Retrieval (FAISS + Ontology Graph) combined with a deterministic Explainability Engine to eliminate black-box AI hiring decisions.",
      technologies: ["Python", "FAISS", "Docker", "Prometheus", "CI/CD", "Render IaC"],
      highlights: ["Hybrid Retrieval", "Explainability Engine", "Production DevOps", "Prometheus Monitoring"],
      icon: <Target className="w-6 h-6" />,
      github: "#",
      demo: "https://hire-mind-ai-nu.vercel.app/",
      hasLive: true,
      color: "from-amber-500 to-orange-600",
    },
  ]

  const skillCategories = [
    {
      title: "Languages",
      icon: <Code2 className="w-5 h-5" />,
      skills: ["Python", "C/C++", "Java", "JavaScript", "TypeScript", "SQL", "R"],
    },
    {
      title: "ML / AI",
      icon: <Brain className="w-5 h-5" />,
      skills: [
        "TensorFlow", "PyTorch", "Scikit-learn", "Hugging Face", "LangChain",
        "NLP", "NLU", "Computer Vision", "Deep Learning", "Multi-Modal Learning",
        "Explainable AI", "Statistical Modeling", "Scientific Computing",
        "OpenCV", "YOLO", "SHAP", "LIME",
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-5 h-5" />,
      skills: ["GCP (Vertex AI, BigQuery, Cloud Functions)", "Docker", "CI/CD", "Git", "MLOps"],
    },
    {
      title: "Web & Databases",
      icon: <Globe className="w-5 h-5" />,
      skills: ["FastAPI", "Flask", "React", "Next.js", "PostgreSQL", "MongoDB", "Firebase", "Vector DBs"],
    },
    {
      title: "Blockchain",
      icon: <Shield className="w-5 h-5" />,
      skills: ["Solidity", "Ethereum", "Hardhat", "Web3.js"],
    },
  ]

  const certifications = [
    {
      name: "Google Cloud Skills Boost",
      issuer: "Google",
      detail: "GCP Fundamentals & Applied ML",
      year: "2025",
    },
    {
      name: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      detail: "AZ-900",
      year: "2023",
    },
    {
      name: "AI & ML Fundamentals",
      issuer: "AICTE",
      detail: "All India Council for Technical Education",
      year: "2025",
    },
    {
      name: "Postman API Expert",
      issuer: "Postman",
      detail: "API Fundamentals Student Expert",
      year: "2024",
    },
    {
      name: "Research Intern – Supernova Cosmology",
      issuer: "India Space Week",
      detail: "Estimated Hubble Constant from JWST/HST Type Ia Supernovae data",
      year: "Jun–Jul 2025",
    },
    {
      name: "Open Source Contributor",
      issuer: "GSSoC 2024",
      detail: "ML modules across multiple repos; 15–20% perf improvements",
      year: "Oct–Nov 2024",
    },
  ]

  const achievements = [
    {
      title: "1st Place – E-Summit Startup Competition",
      event: "Vyom Cultural Fest, RISU",
      description:
        "Won top prize pitching AstraTech in Shark Tank-style competition; awarded by Padma Shri Anand Kumar",
      date: "March 2026",
      position: "🥇 1st Place",
      images: ["/E-Summit.jpeg", "/E-Summit 2.jpeg"],
    },
    {
      title: "1st Place – Hack-Sprint Hackathon",
      event: "GDG on Campus RCET & Infinity Coders",
      description:
        "Led Team Alien X to build AI-powered Real-time Sepsis & Deterioration Monitoring System in a 12-hour sprint; integrated real-time patient vitals with ML-based alert systems",
      date: "March 2026",
      position: "🥇 1st Place",
      images: ["/hacksprint.jpeg", "/Hacksprint2.jpeg"],
    },
    {
      title: "3x Regional AI Hackathon Winner",
      event: "Various Regional Competitions",
      description:
        "Consistently placed among top teams in AI/ML hackathons across the region, demonstrating rapid prototyping and innovative solution design",
      date: "2024 – Present",
      position: "🏆 3x Winner",
      images: ["/Flashhack.jpg", "/Shaastrarth.jpg", "/ISA.png"],
    },
    {
      title: "Project Showcase Winner",
      event: "College Competition",
      description:
        "Won Best Innovation & Project award for Blockchain-based Voter ID & Decentralized Voting System",
      date: "August 2025",
      position: "🏆 Best Project",
      images: ["/Project.jpg"],
    },
  ]

  /* ═══════════════════════════════════════════════════════
     LOADING SCREEN
     ═══════════════════════════════════════════════════════ */

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#07060e] flex items-center justify-center z-50">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-2 border-violet-500/20 rounded-full animate-spin border-t-violet-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-8 h-8 text-violet-400 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold gradient-text">Gourav.dev</h2>
            <div className="flex items-center justify-center gap-1 font-code text-xs text-violet-400/70">
              <span>model</span><span className="text-cyan-400">.</span><span>load</span>
              <span className="text-cyan-400">()</span>
              <span className="inline-block w-[2px] h-4 bg-violet-400 animate-cursor-blink ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */

  return (
    <div className="min-h-screen bg-background text-foreground noise-overlay">
      {/* ─── Navigation ─── */}
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
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-muted/50 ${
                    activeSection === item.id
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
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
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
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        activeSection === item.id
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

      {/* ═══════════════════════════════════════════════════════
         HERO SECTION
         ═══════════════════════════════════════════════════════ */}
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-background to-background" />
        <ParticleField />

        {/* Gradient blobs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/6 rounded-full blur-[100px] animate-float-delayed" />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-20">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Avatar className="w-24 h-24 mx-auto mb-8 ring-2 ring-violet-500/30 ring-offset-4 ring-offset-background hover:ring-violet-400/60 transition-all duration-500 hover:scale-105 shadow-2xl shadow-violet-500/10">
              <AvatarImage src="/software-developer-headshot.jpeg?v=1.1" alt="Gourav Kumar Ojha" className="object-cover" />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-violet-600 to-cyan-500 text-white">
                GKO
              </AvatarFallback>
            </Avatar>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
          >
            <span className="gradient-text">Gourav Kumar Ojha</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 h-8"
          >
            <TypewriterRoles />
          </motion.div>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {[
              { label: "2 Papers Under Review", icon: "📄" },
              { label: "ISRO Collaborator", icon: "🛰️" },
              { label: "3x Hackathon Winner", icon: "🏆" },
              { label: "Defence-Tech Co-Founder", icon: "🚀" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-violet-500/30 transition-all duration-300"
              >
                <span>{stat.icon}</span>
                <span>{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="btn-magnetic bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white shadow-xl shadow-violet-500/20 px-8"
            >
              View My Research
              <ChevronDown className="ml-2 w-4 h-4 animate-bounce" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="btn-magnetic border-violet-500/30 text-violet-400 hover:bg-violet-500/10 hover:border-violet-500/50 bg-transparent px-8"
            >
              <a href="/resume.pdf?v=1.1" download>
                <Download className="mr-2 w-4 h-4" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center gap-4"
          >
            {[
              { icon: <Github className="w-5 h-5" />, href: "https://github.com/RazzGourav", label: "GitHub" },
              { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/gourav-kumar-ojha-13853b290", label: "LinkedIn" },
              { icon: <Mail className="w-5 h-5" />, href: "mailto:kumargouravojha@gmail.com", label: "Email" },
              { icon: <Phone className="w-5 h-5" />, href: "tel:+916207001498", label: "Phone" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-3 rounded-xl bg-muted/30 border border-border/50 text-muted-foreground hover:text-violet-400 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 hover:-translate-y-1"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
         ABOUT SECTION
         ═══════════════════════════════════════════════════════ */}
      <AnimatedSection id="about" className="py-24 relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            title="About Me"
            codeComment="// model.describe()"
            subtitle="Building intelligent systems at the intersection of ML and real-world science"
          />

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <motion.div variants={slideInLeft} className="lg:col-span-3 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                AI/ML Researcher with <span className="text-violet-400 font-medium">2 papers under review at Elsevier journals</span>, spanning planetary science (ISRO collaboration) and clinical AI. Experienced in deep learning, NLP, computer vision, multi-modal systems, and large-scale scientific data pipelines.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span className="text-cyan-400 font-medium">3x Hackathon Winner</span> and co-founder of a defence-tech AI startup. Passionate about advancing the state of the art through rigorous, reproducible research at the intersection of ML and real-world systems.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { label: "AI/ML Research", color: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
                  { label: "Deep Learning", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
                  { label: "Computer Vision", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
                  { label: "NLP/NLU", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
                  { label: "Scientific Computing", color: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
                  { label: "Defence-Tech", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
                ].map((tag) => (
                  <Badge key={tag.label} className={`${tag.color} border text-xs font-medium px-3 py-1`}>
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <motion.div variants={slideInRight} className="lg:col-span-2 space-y-4">
              {[
                { icon: <MapPin className="w-5 h-5 text-violet-400" />, title: "Location", value: "Bhilai, Chhattisgarh, India" },
                { icon: <GraduationCap className="w-5 h-5 text-violet-400" />, title: "Education", value: "B.Tech CSE (AI) — GPA: 7.8/10" },
                { icon: <Rocket className="w-5 h-5 text-violet-400" />, title: "Current", value: "ISRO Research Collaborator" },
                { icon: <Shield className="w-5 h-5 text-violet-400" />, title: "Startup", value: "AstraTech — Defence-Tech (Patent Pending)" },
              ].map((info, i) => (
                <motion.div
                  key={info.title}
                  variants={fadeInUp}
                  className="glass-card glow-card rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="p-2.5 rounded-lg bg-violet-500/10">{info.icon}</div>
                  <div>
                    <p className="text-xs text-muted-foreground font-code uppercase tracking-wider">{info.title}</p>
                    <p className="font-medium text-sm">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════
         PUBLICATIONS SECTION
         ═══════════════════════════════════════════════════════ */}
      <AnimatedSection id="publications" className="py-24 relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            title="Publications"
            codeComment="// papers.under_review()"
            subtitle="Peer-reviewed research at the intersection of AI and real-world science"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {publications.map((pub, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <div className="glass-card glow-card rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-violet-500/10 shrink-0">
                      {pub.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 border text-[10px] font-code uppercase">
                          {pub.status}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-sm leading-relaxed mb-3">{pub.title}</h3>
                    </div>
                  </div>
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-violet-400" />
                      <span className="text-muted-foreground">{pub.journal}</span>
                    </div>
                    {pub.collaboration && (
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                        <span className="text-muted-foreground">In collaboration with {pub.collaboration}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════
         EXPERIENCE SECTION
         ═══════════════════════════════════════════════════════ */}
      <AnimatedSection id="experience" className="py-24 relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            title="Experience"
            codeComment="// git log --oneline --graph"
            subtitle="Research, startups, and open-source contributions"
          />

          <div className="space-y-0 relative">
            {/* Timeline line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500/50 via-cyan-500/30 to-transparent hidden md:block" />

            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative md:pl-16 pb-10 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-[17px] top-1 w-[22px] h-[22px] rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 hidden md:flex items-center justify-center shadow-lg shadow-violet-500/20 z-10">
                  <div className="w-[10px] h-[10px] rounded-full bg-background" />
                </div>

                <div className="glass-card glow-card rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-violet-500/10 md:hidden shrink-0">
                        {exp.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{exp.role}</h3>
                        <p className="text-violet-400 font-medium text-sm">{exp.company}</p>
                        {exp.type && <p className="text-xs text-muted-foreground mt-0.5">{exp.type}</p>}
                      </div>
                    </div>
                    <Badge className="bg-muted text-muted-foreground border-border text-xs font-code w-fit shrink-0">
                      {exp.period}
                    </Badge>
                  </div>
                  <ul className="space-y-3">
                    {exp.bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <Zap className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════
         PROJECTS SECTION
         ═══════════════════════════════════════════════════════ */}
      <AnimatedSection id="projects" className="py-24 relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            title="Research & Projects"
            codeComment="// model.predict(impact)"
            subtitle="Production-grade AI systems & published research"
          />

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="glass-card glow-card rounded-2xl p-6 cursor-pointer h-full flex flex-col group transition-all duration-500 hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${project.color} text-white shadow-lg`}>
                            {project.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg group-hover:text-violet-400 transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">{project.tagline}</p>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground/50 group-hover:text-violet-400 transition-colors shrink-0 mt-1" />
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                        {project.description.length > 180
                          ? project.description.slice(0, 180) + "..."
                          : project.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.highlights.slice(0, 3).map((h, j) => (
                          <Badge
                            key={j}
                            className="bg-violet-500/10 text-violet-400 border-violet-500/20 border text-[10px] font-code"
                          >
                            {h}
                          </Badge>
                        ))}
                        {project.highlights.length > 3 && (
                          <Badge className="bg-muted text-muted-foreground border-border border text-[10px]">
                            +{project.highlights.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 5).map((tech, j) => (
                          <span
                            key={j}
                            className="text-[10px] font-code text-muted-foreground/70 bg-muted/50 px-2 py-0.5 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="text-[10px] font-code text-muted-foreground/50 px-2 py-0.5">
                            +{project.technologies.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border/50">
                    <DialogHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} text-white`}>
                          {project.icon}
                        </div>
                        <div>
                          <DialogTitle className="text-xl">{project.title}</DialogTitle>
                          <DialogDescription className="text-sm">{project.tagline}</DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>

                    <div className="space-y-6 mt-4">
                      <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                      <div>
                        <h4 className="font-semibold mb-3 text-sm font-code text-violet-400">Key Highlights</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.highlights.map((h, j) => (
                            <Badge
                              key={j}
                              className="bg-violet-500/10 text-violet-400 border-violet-500/20 border text-xs"
                            >
                              {h}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 text-sm font-code text-cyan-400">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, j) => (
                            <Badge
                              key={j}
                              className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 border text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-2">
                        {project.github !== "#" && (
                          <Button asChild size="sm" className="bg-violet-600 hover:bg-violet-500">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 w-4 h-4" /> GitHub
                            </a>
                          </Button>
                        )}
                        {(project.hasLive || project.demo !== "#") && project.demo !== "#" && (
                          <Button asChild size="sm" variant="outline" className="border-violet-500/30">
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 w-4 h-4" /> Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════
         EDUCATION SECTION
         ═══════════════════════════════════════════════════════ */}
      <AnimatedSection id="education" className="py-24 relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading title="Education" codeComment="// credentials.verify()" />

          <motion.div variants={fadeInUp}>
            <div className="glass-card glow-card rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-violet-500/10 shrink-0">
                    <GraduationCap className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">B.Tech in Computer Science (Artificial Intelligence)</h3>
                    <p className="text-violet-400 font-medium">Rungta College of Engineering and Technology, Bhilai</p>
                    <p className="text-muted-foreground mt-1">GPA: 7.8/10</p>
                  </div>
                </div>
                <Badge className="bg-muted text-muted-foreground border-border text-xs font-code w-fit shrink-0">
                  Aug 2023 – Present
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════
         SKILLS SECTION
         ═══════════════════════════════════════════════════════ */}
      <AnimatedSection id="skills" className="py-24 relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            title="Technical Skills"
            codeComment="// import skills from './ml_stack'"
            subtitle="Tools and technologies I work with"
          />

          <div className="space-y-10">
            {skillCategories.map((cat, catIdx) => (
              <motion.div key={cat.title} variants={fadeInUp}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-violet-500/10">
                    {cat.icon}
                  </div>
                  <h3 className="font-code text-sm font-semibold text-violet-400">
                    {cat.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.03, duration: 0.3 }}
                      className="skill-tag relative px-3.5 py-2 text-sm font-medium bg-muted/50 border border-border/50 rounded-lg text-muted-foreground hover:text-foreground cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════
         CERTIFICATIONS SECTION
         ═══════════════════════════════════════════════════════ */}
      <AnimatedSection id="certifications" className="py-24 relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            title="Certifications & Programs"
            codeComment="// certificates.list()"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <div className="glass-card glow-card rounded-xl p-5 h-full">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-violet-500/10 shrink-0">
                      <Award className="w-5 h-5 text-violet-400" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm mb-1">{cert.name}</h3>
                      <p className="text-violet-400 text-xs font-medium">{cert.issuer}</p>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{cert.detail}</p>
                      <Badge className="mt-2 bg-muted text-muted-foreground border-border text-[10px] font-code">
                        {cert.year}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════
         ACHIEVEMENTS SECTION
         ═══════════════════════════════════════════════════════ */}
      <AnimatedSection id="achievements" className="py-24 relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            title="Achievements & Recognition"
            codeComment="// model.evaluate(achievements)"
            subtitle="Hackathons, competitions, and awards"
          />

          {/* Stats bar */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { number: 3, suffix: "x", label: "Hackathon Wins", icon: "🏆" },
              { number: 2, suffix: "", label: "Papers Under Review", icon: "📄" },
              { number: 1, suffix: "", label: "Patent Pending", icon: "🛡️" },
              { number: 10, suffix: "TB+", label: "Data Processed", icon: "📊" },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-5 text-center group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold gradient-text-static mb-1">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted-foreground font-code">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Achievement cards */}
          <div className="space-y-6">
            {achievements.map((achievement, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <div className="glass-card glow-card rounded-2xl overflow-hidden">
                  <div className="md:flex">
                    {/* Photo gallery */}
                    <div className="md:w-2/5 relative overflow-hidden">
                      <PhotoGallery images={achievement.images} alt={achievement.title} />
                      <div className="absolute top-4 left-4 z-20">
                        <Badge className="bg-violet-600/90 text-white backdrop-blur-sm text-xs">
                          {achievement.position}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:w-3/5 p-6 md:p-8 flex flex-col">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{achievement.title}</h3>
                          <p className="text-violet-400 text-sm font-medium">{achievement.event}</p>
                        </div>
                        <Badge className="bg-muted text-muted-foreground border-border text-xs font-code shrink-0">
                          {achievement.date}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                        {achievement.description}
                      </p>
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/30">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-medium text-amber-400">{achievement.position}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════
         CONTACT SECTION
         ═══════════════════════════════════════════════════════ */}
      <AnimatedSection id="contact" className="py-24 relative">
        <div className="section-divider absolute top-0 left-0 right-0" />
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            title="Get In Touch"
            codeComment="// await connect(you, me)"
            subtitle="Always interested in research collaborations and new opportunities"
          />

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={slideInLeft} className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Whether you're interested in AI research collaboration, have a project in mind, or just want to discuss
                the latest in ML — I'd love to hear from you.
              </p>

              <div className="space-y-3">
                {[
                  { icon: <Mail className="w-5 h-5 text-violet-400" />, label: "kumargouravojha@gmail.com", href: "mailto:kumargouravojha@gmail.com" },
                  { icon: <Phone className="w-5 h-5 text-violet-400" />, label: "+91 6207001498", href: "tel:+916207001498" },
                  { icon: <MapPin className="w-5 h-5 text-violet-400" />, label: "Bhilai, CG, India", href: "#" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 text-muted-foreground hover:text-violet-400 transition-colors group"
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </a>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <Button asChild className="bg-violet-600 hover:bg-violet-500">
                  <a href="https://www.linkedin.com/in/gourav-kumar-ojha-13853b290" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 w-4 h-4" /> LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-violet-500/30 hover:bg-violet-500/10">
                  <a href="https://github.com/RazzGourav" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 w-4 h-4" /> GitHub
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div variants={slideInRight}>
              <div className="glass-card glow-card rounded-2xl p-6">
                <h3 className="font-semibold mb-1">Send a Message</h3>
                <p className="text-xs text-muted-foreground mb-5">I'll get back to you via email</p>
                <form
                  action="https://formsubmit.co/kumargouravojha@gmail.com"
                  method="POST"
                  className="space-y-4"
                >
                  {/* FormSubmit config */}
                  <input type="hidden" name="_subject" value="New message from Gourav.dev portfolio" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_next" value="https://gourav.dev" />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName" className="text-xs text-muted-foreground">First Name</Label>
                      <Input id="firstName" name="First Name" placeholder="John" required className="mt-1 bg-muted/30 border-border/50 focus:border-violet-500/50" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-xs text-muted-foreground">Last Name</Label>
                      <Input id="lastName" name="Last Name" placeholder="Doe" className="mt-1 bg-muted/30 border-border/50 focus:border-violet-500/50" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required className="mt-1 bg-muted/30 border-border/50 focus:border-violet-500/50" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-xs text-muted-foreground">Message</Label>
                    <Textarea
                      id="message"
                      name="Message"
                      placeholder="Tell me about your project or research collaboration..."
                      rows={4}
                      required
                      className="mt-1 bg-muted/30 border-border/50 focus:border-violet-500/50 resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 shadow-lg shadow-violet-500/10">
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════════════════════════════════════════════════════
         FOOTER
         ═══════════════════════════════════════════════════════ */}
      <footer className="py-8 border-t border-border/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-serif font-bold gradient-text-static">Gourav.dev</span>
              <span className="text-muted-foreground/50 text-xs">|</span>
              <span className="text-muted-foreground/50 text-xs font-code">
                Built with Next.js + Framer Motion
              </span>
            </div>
            <div className="flex items-center gap-4">
              {[
                { icon: <Github className="w-4 h-4" />, href: "https://github.com/RazzGourav" },
                { icon: <Linkedin className="w-4 h-4" />, href: "https://www.linkedin.com/in/gourav-kumar-ojha-13853b290" },
                { icon: <Mail className="w-4 h-4" />, href: "mailto:kumargouravojha@gmail.com" },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground/50 hover:text-violet-400 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <p className="text-center text-muted-foreground/30 text-xs mt-4 font-code">
            © {new Date().getFullYear()} Gourav Kumar Ojha. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
