"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Rocket, Shield, Globe, Code2, Zap, Calendar, MapPin, Target, Cpu, Cloud } from "lucide-react"
import { experiences } from "@/lib/data"
import SectionHeading from "@/components/ui-custom/SectionTitle"
import { Badge } from "@/components/ui/badge"

interface ExperienceNodeProps {
  experience: typeof experiences[0]
  index: number
  total: number
}

function ExperienceNode({ experience, index, total }: ExperienceNodeProps) {
  const isEven = index % 2 === 0
  const iconMap = {
    "ISRO": Rocket,
    "AstraTech": Shield,
    "India Space Week": Globe,
    "GSSoC": Code2,
  }

  const Icon = iconMap[experience.company as keyof typeof iconMap] || Globe

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="relative group perspective-container"
    >
      {/* Timeline connection */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-violet-500/20 via-cyan-500/20 to-transparent hidden lg:block" />

      {/* Experience card */}
      <div className="relative lg:flex items-center gap-12 mb-16 last:mb-0">
        {/* Timeline dot */}
        <div className="absolute left-1/2 -translate-x-1/2 top-6 w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 shadow-lg shadow-violet-500/20 z-10 hidden lg:flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-background" />
        </div>

        {/* Content - alternates left/right */}
        <div className={`w-full lg:w-1/2 ${isEven ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left lg:order-last"}`}>
          <motion.div
            whileHover={{ y: -5 }}
            className="glass-card glow-card rounded-2xl p-8 relative"
          >
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-violet-500/10">
                  <Icon className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{experience.role}</h3>
                  <p className="text-violet-400 font-medium text-sm">{experience.company}</p>
                  {experience.type && (
                    <p className="text-xs text-muted-foreground mt-0.5">{experience.type}</p>
                  )}
                </div>
              </div>
              <Badge variant="outline" className="bg-muted text-muted-foreground border-border text-xs font-code w-fit">
                {experience.period}
              </Badge>
            </div>

            {/* Description */}
            <ul className="space-y-3">
              {experience.bullets.map((bullet, bulletIndex) => (
                <motion.li
                  key={bulletIndex}
                  initial={{ opacity: 0, x: isEven ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: bulletIndex * 0.05 }}
                  className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                >
                  <Zap className="w-3 h-3 text-violet-400 mt-0.5 shrink-0" />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>

            {/* Technologies used */}
            <div className="mt-6 pt-6 border-t border-border/30">
              <div className="flex flex-wrap gap-2">
                {getExperienceTech(experience.role).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-[10px] font-code text-muted-foreground/70 bg-muted/50 px-2 py-0.5 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 3D tilt effect indicator */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-violet-500/20 transition-all duration-300" />
          </motion.div>
        </div>

        {/* Spacer for opposite side */}
        <div className="lg:w-1/2 hidden lg:block" />
      </div>
    </motion.div>
  )
}

function getExperienceTech(role: string): string[] {
  if (role.includes("Planetary") || role.includes("ISRO")) {
    return ["Python", "Scientific Computing", "MRO/MCS", "Curiosity REMS", "Hubble", "10TB+ Data"]
  }
  if (role.includes("AstraTech")) {
    return ["Edge AI", "LWIR", "mmWave Radar", "Thermal", "Seismic", "Hardware"]
  }
  if (role.includes("Supernova")) {
    return ["JWST", "HST", "ΛCDM", "Hubble Tension", "Type Ia SNe", "Cosmology"]
  }
  if (role.includes("Open Source")) {
    return ["Git", "CI/CD", "ML Modules", "Performance", "Optimization", "OSS"]
  }
  return ["Research", "ML", "Python", "Analysis", "Modeling", "Validation"]
}

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  }

  return (
    <section id="experience" ref={ref} className="py-32 relative">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Mission Timeline"
          subtitle="Research, startups, and open-source contributions across the stack"
          codeComment="// git log --oneline --graph"
        />

        {/* Timeline */}
        <div className="relative mt-12">
          {/* Main timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500/30 via-cyan-500/20 to-transparent hidden lg:block timeline-glow-line" />

          {/* Experience nodes */}
          {experiences.map((experience, index) => (
            <ExperienceNode
              key={index}
              experience={experience}
              index={index}
              total={experiences.length}
            />
          ))}

          {/* Start/End markers */}
          <div className="hidden lg:flex items-center justify-between mt-8 pt-8 border-t border-border/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 animate-pulse" />
              <span className="text-xs font-code text-muted-foreground">MISSION START</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-code text-muted-foreground">MISSION ACTIVE</span>
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Skills matrix */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="glass-card rounded-2xl p-8 mt-20 border border-border/30"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Research Methodology",
                icon: <Rocket className="w-6 h-6" />,
                items: ["Experimental Design", "Data Collection", "Statistical Analysis", "Peer Review"],
                color: "from-violet-500 to-purple-500",
              },
              {
                title: "Engineering",
                icon: <Cpu className="w-6 h-6" />,
                items: ["System Design", "Architecture", "Performance", "Scalability"],
                color: "from-cyan-500 to-blue-500",
              },
              {
                title: "Infrastructure",
                icon: <Cloud className="w-6 h-6" />,
                items: ["GCP", "Docker", "CI/CD", "Monitoring"],
                color: "from-emerald-500 to-green-500",
              },
              {
                title: "Business",
                icon: <Target className="w-6 h-6" />,
                items: ["Strategy", "Product", "Patents", "Collaboration"],
                color: "from-amber-500 to-orange-500",
              },
            ].map((category, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-20`}>
                    <div className={`text-gradient-to-br ${category.color}`}>
                      {category.icon}
                    </div>
                  </div>
                  <h4 className="font-medium text-sm">{category.title}</h4>
                </div>
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500" />
                      <span className="text-xs text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
