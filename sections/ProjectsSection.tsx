"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Eye, Brain, Database, Target, Zap, ChevronLeft, ChevronRight, X } from "lucide-react"
import { projects } from "@/lib/data"
import SectionHeading from "@/components/ui-custom/SectionTitle"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import TiltCard from "@/components/ui-custom/TiltCard"

interface ProjectModalProps {
  project: typeof projects[0]
  isOpen: boolean
  onClose: () => void
}

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-24 bg-card border border-border/50 rounded-2xl shadow-2xl shadow-black/30 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/80 backdrop-blur-xl border-b border-border/30 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color}`}>
                    {project.title === "SetuDrishti" ? <Brain className="w-6 h-6 text-white" /> :
                     project.title === "LUMEN AI" ? <Database className="w-6 h-6 text-white" /> :
                     project.title === "Mine-Sigma" ? <Eye className="w-6 h-6 text-white" /> :
                     <Target className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{project.title}</h2>
                    <p className="text-sm text-muted-foreground">{project.tagline}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-muted"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                  <p className="text-muted-foreground leading-relaxed text-lg">{project.description}</p>

                  {/* Key Results */}
                  <div className="space-y-3">
                    <h3 className="font-code text-sm uppercase tracking-wider text-violet-400">Key Results</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {project.highlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border/30"
                        >
                          <Zap className="w-4 h-4 text-violet-400" />
                          <span className="text-sm">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Architecture */}
                  <div className="space-y-3">
                    <h3 className="font-code text-sm uppercase tracking-wider text-cyan-400">System Architecture</h3>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                      <p className="text-sm text-muted-foreground">
                        This project implements a sophisticated multi-layered architecture combining:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-cyan-500" />
                          <span>Advanced data ingestion pipelines</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-cyan-500" />
                          <span>Multi-modal deep learning models</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-cyan-500" />
                          <span>Real-time inference and analysis</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-cyan-500" />
                          <span>Scalable cloud infrastructure</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Tech Stack */}
                  <div className="space-y-3">
                    <h3 className="font-code text-sm uppercase tracking-wider text-amber-400">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Challenges */}
                  <div className="space-y-3">
                    <h3 className="font-code text-sm uppercase tracking-wider text-rose-400">Key Challenges</h3>
                    <div className="space-y-2">
                      {[
                        "Scalability for large-scale datasets",
                        "Real-time inference performance",
                        "Explainability and interpretability",
                        "Integration with existing systems",
                        "Robustness to edge cases"
                      ].slice(0, 3).map((challenge, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-rose-500 mt-2" />
                          <span className="text-sm text-muted-foreground">{challenge}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="space-y-3">
                    <h3 className="font-code text-sm uppercase tracking-wider text-emerald-400">Links</h3>
                    <div className="space-y-2">
                      {project.github !== "#" && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-violet-500/30 hover:bg-violet-500/10"
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            GitHub Repository
                          </a>
                        </Button>
                      )}
                      {project.demo !== "#" && project.hasLive && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full justify-start border-cyan-500/30 hover:bg-cyan-500/10"
                        >
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-500/20">
                    <h3 className="font-code text-sm uppercase tracking-wider text-violet-400 mb-2">Project Stats</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-xs text-muted-foreground">Scale</div>
                        <div className="font-medium">Enterprise</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Status</div>
                        <div className="font-medium text-emerald-400">Production</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Impact</div>
                        <div className="font-medium">High</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Complexity</div>
                        <div className="font-medium">Advanced</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function ProjectCard({ project, onOpen }: { project: typeof projects[0]; onOpen: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  const iconMap = {
    "SetuDrishti": Brain,
    "LUMEN AI": Database,
    "Mine-Sigma": Eye,
    "HireMind AI": Target,
  }

  const ProjectIcon = iconMap[project.title as keyof typeof iconMap] || Brain

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <TiltCard className="h-full cursor-pointer" onClick={onOpen}>
        <div
          className={`glass-card glow-card rounded-2xl p-8 h-full flex flex-col transition-all duration-500 holographic-card ${isHovered ? "border-violet-500/40" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${project.color} shadow-lg`}>
                <ProjectIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold group-hover:text-violet-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">{project.tagline}</p>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-muted-foreground/50 group-hover:text-violet-400 transition-colors shrink-0" />
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
            {project.description.length > 150
              ? project.description.slice(0, 150) + "..."
              : project.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.highlights.slice(0, 3).map((highlight, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-violet-500/10 text-violet-400 border-violet-500/20 text-xs font-code"
              >
                {highlight}
              </Badge>
            ))}
            {project.highlights.length > 3 && (
              <Badge
                variant="outline"
                className="bg-muted text-muted-foreground border-border text-xs"
              >
                +{project.highlights.length - 3}
              </Badge>
            )}
          </div>

          {/* Tech stack */}
          <div className="mt-auto pt-6 border-t border-border/30">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0,2).map((tech, index) => (
                <span
                  key={index}
                  className="text-[10px] font-code text-muted-foreground/70 bg-muted/50 px-2 py-0.5 rounded-md"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 2 && (
                <span className="text-[10px] font-code text-muted-foreground/50 px-2 py-0.5">
                  +{project.technologies.length - 2} more
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/20">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${project.hasLive ? "bg-emerald-500" : "bg-violet-500"} animate-pulse`} />
                <span className="text-xs text-muted-foreground">
                  {project.hasLive ? "Live Demo Available" : "Production System"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg hover:bg-violet-500/10 text-muted-foreground hover:text-violet-400 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  className="border-violet-500/30 text-violet-400 hover:bg-violet-500/10 text-xs"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  }

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  return (
    <section id="projects" ref={ref} className="py-32 relative">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Systems I've Built"
          subtitle="Production-grade AI systems solving complex real-world problems"
          codeComment="// model.predict(impact)"
        />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              onOpen={() => handleProjectClick(project)}
            />
          ))}
        </div>

        {/* Systems Overview */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="glass-card rounded-2xl p-8 border border-border/30"
        >
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: <Brain className="w-8 h-8 text-violet-400" />,
                title: "Explainable AI",
                description: "Interpretable models with SHAP/LIME for clinical decision support",
                count: "1",
                unit: "Paper Under Review",
              },
              {
                icon: <Database className="w-8 h-8 text-cyan-400" />,
                title: "Data Scale",
                description: "10TB+ multi-modal datasets processed with scientific pipelines",
                count: "10",
                unit: "TB Processed",
              },
              {
                icon: <Eye className="w-8 h-8 text-emerald-400" />,
                title: "Accuracy",
                description: "98% classification accuracy in satellite imagery analysis",
                count: "98",
                unit: "% Accuracy",
              },
              {
                icon: <Target className="w-8 h-8 text-amber-400" />,
                title: "Production Systems",
                description: "Enterprise-grade platforms deployed on GCP with monitoring",
                count: "4",
                unit: "Systems Built",
              },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-background/50 mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2 gradient-text">{stat.count}</div>
                <div className="text-sm text-muted-foreground mb-1">{stat.unit}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  )
}
