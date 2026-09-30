"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BookOpen, Rocket, Microscope, Brain, Shield, Globe, Award, Zap } from "lucide-react"
import { publications, experiences } from "@/lib/data"
import SectionHeading from "@/components/ui-custom/SectionTitle"
import { ResearchPlanet } from "@/components/3d/ResearchPlanet"
import Scene3D from "@/components/3d/Scene3D"
import { useMousePosition, useDeviceCapability } from "@/lib/hooks"
import { Badge } from "@/components/ui/badge"
import * as THREE from "three"

export default function ResearchSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const mouse = useMousePosition()
  const tier = useDeviceCapability()

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  }

  const flyIn = {
    hidden: { opacity: 0, y: 60, rotateX: -30 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
  }

  return (
    <section id="research" ref={ref} className="py-32 relative">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Research Laboratory"
          subtitle="Peer-reviewed research at the intersection of AI and planetary science"
          codeComment="// papers.under_review()"
        />

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Research Overview + 3D Planet */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-2 space-y-8"
          >
            {/* Research Introduction */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                My research spans the frontier of artificial intelligence and planetary science, focusing on leveraging deep learning techniques to understand complex atmospheric phenomena. Working in collaboration with the Indian Institute of Remote Sensing (ISRO), I have developed novel methodologies for analyzing multi-instrument satellite datasets to advance our understanding of Martian atmospheric dynamics.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through explainable AI frameworks and multi-modal deep learning systems, I aim to bridge the gap between cutting-edge ML research and real-world scientific discovery — transforming raw observational data into actionable insights about our solar system and beyond.
              </p>
            </div>

            {/* Research Focus Areas */}
            <div className="space-y-4">
              <h3 className="text-sm font-code uppercase tracking-wider text-violet-400 mb-3">
                Research Focus Areas
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { title: "Martian Atmosphere", icon: "🪐", description: "Dust storm propagation & water vapor analysis using Curiosity & MRO data", color: "from-orange-500 to-red-500" },
                  { title: "Explainable AI", icon: "🔍", description: "SHAP/LIME interpretability for clinical decision support systems", color: "from-cyan-500 to-blue-500" },
                  { title: "Multi-Modal Learning", icon: "🔗", description: "Fusing temporal, spatial & spectral data for improved accuracy", color: "from-purple-500 to-pink-500" },
                  { title: "Scientific Computing", icon: "⚙️", description: "10TB+ data pipelines & HPC optimization for atmospheric modeling", color: "from-teal-500 to-green-500" },
                  { title: "Temporal Analysis", icon: "📈", description: "Time-series forecasting & anomaly detection in planetary datasets", color: "from-indigo-500 to-blue-500" },
                  { title: "Domain Adaptation", icon: "🌍", description: "Transfer learning techniques for cross-planetary applications", color: "from-rose-500 to-fuchsia-500" },
                ].map((area, index) => (
                  <motion.div
                    key={area.title}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <div className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${area.color} border border-border/50 group-hover:border-violet-500/30 transition-all duration-300`}>
                      <div className="p-2 rounded-lg bg-background/50 backdrop-blur-sm">
                        <span className="text-xl">{area.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{area.title}</h4>
                        <p className="text-xs text-muted-foreground">{area.description}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-1 h-1 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 animate-pulse" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Center: 3D Research Planet */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-1 flex items-center justify-center"
          >
            <div className="relative w-48 h-48">
              <Scene3D style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                <ResearchPlanet tier={tier} />

                {/* Interactive data points */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i / 8) * Math.PI * 2
                  const radius = 2.2 + Math.sin(i * 0.5) * 0.3
                  const height = Math.cos(i * 0.7) * 0.4
                  return (
                    <points key={i} position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]}>
                      <sphereGeometry args={[0.03, 8, 8]} />
                      <pointsMaterial
                        color={i % 2 === 0 ? "#ff6b35" : "#06b6d4"}
                        size={0.08}
                        transparent
                        opacity={0.7}
                        sizeAttenuation
                        blending={THREE.AdditiveBlending}
                      />
                    </points>
                  )
                })}
              </Scene3D>
            </div>
          </motion.div>

          {/* Right: Publications & Impact */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-3 space-y-6"
          >
            {/* Publications */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-sm font-code uppercase tracking-wider text-cyan-400 mb-4">
                Peer-Reviewed Publications
              </h3>
              <div className="space-y-4">
                {publications.map((pub, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className={`glass-card rounded-2xl p-5 border border-border/50 group-hover:border-violet-500/30 transition-all duration-300`}>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-violet-500/10">
                          {index === 0 ? <Rocket className="w-5 h-5" /> : <Brain className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{pub.title}</h3>
                          <p className="text-xs text-muted-foreground mb-2">{pub.journal}</p>
                          {pub.collaboration && (
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-cyan-400" />
                              <span className="text-xs text-muted-foreground font-code">
                                In collaboration with {pub.collaboration}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              variant="outline"
                              className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-[10px] font-code"
                            >
                              {pub.status}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-transparent text-muted-foreground border border-transparent text-[10px] font-code ml-2"
                            >
                              {pub.collaboration ? "ISRO Collaboration" : "Independent Research"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Research Experience */}
            <motion.div variants={fadeInUp} className="pt-6">
              <h3 className="text-sm font-code uppercase tracking-wider text-emerald-400 mb-4">
                Research Experience
              </h3>
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className={`glass-card rounded-2xl p-4 border border-border/50 group-hover:border-violet-500/30 transition-all duration-300`}>
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-violet-500/10">
                          {index === 0 ? <Globe className="w-4 h-4" /> :
                           index === 1 ? <Shield className="w-4 h-4" /> :
                           index === 2 ? <Microscope className="w-4 h-4" /> :
                           <Award className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{exp.role}</h4>
                          <p className="text-xs text-muted-foreground">{exp.company}</p>
                          {exp.type && <p className="text-xs text-muted-foreground">{exp.type}</p>}
                        </div>
                      </div>
                      <div className="border-t border-border/30 pt-3">
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {exp.bullets.map((bullet, bulletIndex) => (
                            <motion.div
                              key={bulletIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: bulletIndex * 0.05 }}
                            >
                              <div className="flex items-start gap-2">
                                <Zap className="w-3 h-3 text-violet-400 mt-0.5" />
                                <span>{bullet}</span>
                              </div>
                            </motion.div>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
