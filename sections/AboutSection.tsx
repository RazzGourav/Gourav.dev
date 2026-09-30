"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, GraduationCap, Rocket, Shield } from "lucide-react"
import { personalInfo } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import SectionHeading from "@/components/ui-custom/SectionTitle"

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  }

  const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  }

  const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  }

  return (
    <section id="about" ref={ref} className="py-32 relative">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="About Me"
          subtitle="Building intelligent systems at the intersection of ML and real-world science"
          codeComment="// model.describe()"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio and expertise */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Introduction */}
            <div className="space-y-6">
              {personalInfo.aboutBio.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={fadeInUp}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Expertise badges */}
            <motion.div variants={fadeInUp} className="pt-4">
              <h3 className="text-sm font-code uppercase tracking-wider text-violet-400 mb-4">
                Core Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "AI/ML Research", color: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
                  { label: "Deep Learning", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
                  { label: "Computer Vision", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
                  { label: "NLP/NLU", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
                  { label: "Scientific Computing", color: "bg-teal-500/10 text-teal-400 border-teal-500/20" },
                  { label: "Defence-Tech", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
                  { label: "Cloud Infrastructure", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                  { label: "Data Engineering", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
                ].map((expertise, index) => (
                  <motion.div
                    key={expertise.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge
                      variant="outline"
                      className={`${expertise.color} border text-xs font-medium px-4 py-2 hover:scale-105 transition-transform`}
                    >
                      {expertise.label}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Key metrics */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 pt-6">
              {[
                { value: "2", label: "Papers Under Review", icon: "📄", color: "from-violet-600 to-purple-600" },
                { value: "10TB+", label: "Data Processed", icon: "📊", color: "from-cyan-600 to-blue-600" },
                { value: "98%", label: "Model Accuracy", icon: "🎯", color: "from-emerald-600 to-green-600" },
                { value: "3x", label: "Hackathon Winner", icon: "🏆", color: "from-amber-600 to-orange-600" },
              ].map((metric, index) => (
                <div
                  key={metric.label}
                  className="glass-card rounded-xl p-4 text-center group hover:border-violet-500/30 transition-all duration-300"
                >
                  <div className="text-2xl mb-2">{metric.icon}</div>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-1`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-code">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Quick facts and info cards */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {/* 3D Profile Card */}
            <div className="glass-card glow-card rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-violet-500/20 ring-offset-4 ring-offset-background">
                    <img
                      src="/software-developer-headshot.jpeg?v=1.1"
                      alt="Gourav Kumar Ojha"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/10 to-cyan-500/10 blur-md" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Gourav Kumar Ojha</h3>
                  <p className="text-violet-400 font-medium text-sm">AI/ML Researcher</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground font-code">
                      ACTIVE · READY FOR COLLABORATION
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick info cards */}
              <div className="space-y-4">
                {[
                  {
                    icon: <MapPin className="w-5 h-5 text-violet-400" />,
                    title: "Location",
                    value: "Bhilai, Chhattisgarh, India",
                    color: "from-violet-500/10 to-violet-500/5",
                  },
                  {
                    icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
                    title: "Education",
                    value: "B.Tech CSE (AI) — GPA: 7.8/10",
                    color: "from-cyan-500/10 to-cyan-500/5",
                  },
                  {
                    icon: <Rocket className="w-5 h-5 text-indigo-400" />,
                    title: "Current Focus",
                    value: "ISRO Planetary Science Collaboration",
                    color: "from-indigo-500/10 to-indigo-500/5",
                  },
                  {
                    icon: <Shield className="w-5 h-5 text-amber-400" />,
                    title: "Startup",
                    value: "AstraTech — Defence-Tech (Patent Pending)",
                    color: "from-amber-500/10 to-amber-500/5",
                  },
                ].map((info, index) => (
                  <motion.div
                    key={info.title}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${info.color} border border-border/50 group-hover:border-violet-500/30 transition-all duration-300`}>
                      <div className="p-2.5 rounded-lg bg-background/50 backdrop-blur-sm">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground font-code uppercase tracking-wider mb-1">
                          {info.title}
                        </p>
                        <p className="font-medium text-sm">{info.value}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-1 h-1 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 animate-pulse" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Status indicator */}
              <div className="mt-8 pt-6 border-t border-border/30">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground font-code">
                    SYSTEM STATUS
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-emerald-400">
                      OPERATIONAL
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500 rounded-full animate-shimmer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tech stack indicators */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-sm font-code uppercase tracking-wider text-violet-400 mb-4">
                Technology Stack
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Python", level: 95, color: "from-emerald-500 to-green-500" },
                  { label: "PyTorch", level: 90, color: "from-orange-500 to-red-500" },
                  { label: "TensorFlow", level: 85, color: "from-amber-500 to-orange-500" },
                  { label: "GCP", level: 80, color: "from-blue-500 to-cyan-500" },
                  { label: "React/Next.js", level: 85, color: "from-violet-500 to-purple-500" },
                ].map((tech) => (
                  <div key={tech.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{tech.label}</span>
                      <span className="font-code text-violet-400">{tech.level}%</span>
                    </div>
                    <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${tech.level}%` }}
                        transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${tech.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
