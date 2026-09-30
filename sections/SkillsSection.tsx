"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code2, Brain, Cloud, Globe, Shield, BookOpen, Database, Cpu, Zap, Target, Microscope, Network } from "lucide-react"
import { skillCategories, allSkills } from "@/lib/data"
import SectionHeading from "@/components/ui-custom/SectionTitle"
import Scene3D from "@/components/3d/Scene3D"
import { TechnologyConstellation } from "@/components/3d/TechnologyConstellation"
import { useDeviceCapability } from "@/lib/hooks"
import { Badge } from "@/components/ui/badge"

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages: Code2,
  "ML / AI": Brain,
  "Cloud & DevOps": Cloud,
  "Web & Databases": Globe,
  Blockchain: Shield,
}

function getCategoryIcon(category: string) {
  const Icon = categoryIcons[category]
  return Icon ? <Icon className="w-5 h-5 text-violet-400" /> : null
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const tier = useDeviceCapability()

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  }

  return (
    <section id="skills" ref={ref} className="py-32 relative">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Technology Constellation"
          subtitle="Tools and technologies forming my engineering universe"
          codeComment="// import skills from './ml_stack'"
        />

        {/* 3D Technology Constellation - Desktop */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="hidden lg:block mb-16"
        >
          <div className="relative w-full h-[550px] rounded-2xl glass-card border border-violet-500/10 overflow-hidden">
            <Scene3D style={{ width: "100%", height: "100%" }}>
              <TechnologyConstellation skills={allSkills} tier={tier} />
            </Scene3D>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground/50 font-code bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
              <Network className="w-3 h-3" />
              <span>drag to explore constellation</span>
            </div>
          </div>
        </motion.div>

        {/* Flat grid layout - Mobile & Desktop fallback */}
        <div className="space-y-10">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-lg bg-violet-500/10">
                  {getCategoryIcon(category.title)}
                </div>
                <h3 className="font-code text-sm font-semibold text-violet-400">
                  {category.title}
                </h3>
                <div className="w-full h-[1px] bg-gradient-to-r from-violet-500/20 to-transparent" />
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: skillIndex * 0.03, duration: 0.3 }}
                    className="skill-tag relative px-4 py-2.5 text-sm font-medium bg-muted/50 border border-border/50 rounded-lg text-muted-foreground hover:text-foreground cursor-default group"
                  >
                    {skill}
                    {/* Connection indicator */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gradient-to-r from-violet-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Statistics */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Languages", count: 7, icon: <Code2 className="w-5 h-5" />, color: "from-violet-500 to-purple-500" },
            { label: "ML/AI", count: 22, icon: <Brain className="w-5 h-5" />, color: "from-cyan-500 to-blue-500" },
            { label: "Cloud/DevOps", count: 5, icon: <Cloud className="w-5 h-5" />, color: "from-emerald-500 to-green-500" },
            { label: "Web/DB", count: 8, icon: <Globe className="w-5 h-5" />, color: "from-amber-500 to-orange-500" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card rounded-xl p-6 text-center group hover:border-violet-500/30 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-background/50 mb-4">
                <div className={`text-gradient-to-br ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold mb-2 gradient-text">{stat.count}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="mt-4">
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500 rounded-full animate-shimmer" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Proficiency indicators */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 glass-card rounded-2xl p-8 border border-border/30"
        >
          <h3 className="text-sm font-code uppercase tracking-wider text-violet-400 mb-6 text-center">
            Core Competencies
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Deep Learning Architecture", level: 95, color: "from-violet-600 to-purple-600" },
              { name: "Production ML Systems", level: 90, color: "from-cyan-600 to-blue-600" },
              { name: "Scientific Computing", level: 85, color: "from-emerald-600 to-teal-600" },
              { name: "Cloud Infrastructure", level: 85, color: "from-blue-600 to-indigo-600" },
              { name: "Explainable AI", level: 88, color: "from-rose-600 to-pink-600" },
              { name: "Full-Stack Development", level: 80, color: "from-amber-600 to-orange-600" },
            ].map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className="font-code text-violet-400">{skill.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
