"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink, Github, Code, Database, Cpu, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { AnimatedGradientText } from "./animations/text-animation"
import { LoadingDots } from "./animations/loading-animation"

interface Project {
  id: number
  title: string
  shortDescription: string
  fullDescription: string
  image: string
  icon: React.ReactNode
  tags: string[]
  github?: string
  demo?: string
  technologies: string[]
  metrics?: { label: string; value: string }[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Matdata Mitra",
    shortDescription: "Blockchain-based secure voting system with facial recognition and blockchain based voter-card",
    fullDescription:
      "A decentralized voting system that uses blockchain technology to ensure secure and transparent elections. The system includes voter card creation with facial recognition for identity verification, and a tamper-proof voting mechanism built on Ethereum blockchain.",
    image: "/blockchain.jpeg?",
    icon: <Shield className="h-5 w-5" />,
    tags: ["Blockchain", "Web3", "Security"],
    github: "https://github.com/RazzGourav/matdata-mitra",
    technologies: ["React", "Node.js", "Python", "Ethereum", "IPFS", "Solidity", "Web3.js", "OpenCV"],
    metrics: [
      { label: "Security Enhancement", value: "+95%" },
      { label: "Voter Verification Speed", value: "3.2s" },
      { label: "Transaction Throughput", value: "500/min" },
    ],
  },
  {
    id: 2,
    title: "RungtAI – Your Campus Companion",
    shortDescription: "AI-powered virtual campus assistant with chatbot functionality",
    fullDescription:
      "An AI agent designed to assist students and visitors with campus information. Features include virtual campus tours, a 24/7 chatbot for answering queries, and an event display system that keeps users updated on campus activities.",
    image: "/ChatGPT Image Apr 6, 2025, 11_28_28 PM.png?height=600&width=800",
    icon: <Cpu className="h-5 w-5" />,
    tags: ["AI", "Web Development", "Education"],
    github: "https://github.com/RazzGourav/rungtai",
    demo: "https://rungt-ai.vercel.app/",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "Node.js", "MongoDB"],
    metrics: [
      { label: "User Satisfaction", value: "92%" },
      { label: "Query Resolution Rate", value: "87%" },
      { label: "Average Response Time", value: "1.5s" },
    ],
  },
  {
    id: 3,
    title: "GSRA BANKS",
    shortDescription: "Simulated online banking portal with secure authentication",
    fullDescription:
      "A comprehensive online banking simulation that allows users to perform various banking operations such as fund transfers, deposits, and withdrawals. The system implements secure authentication using JWT and provides a realistic banking experience.",
    image: "/bgi3.jpg?height=600&width=800",
    icon: <Database className="h-5 w-5" />,
    tags: ["Web Development", "Security", "Finance"],
    github: "https://github.com/RazzGourav/GSRABank",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "JWT"],
    metrics: [
      { label: "Transaction Security", value: "99.9%" },
      { label: "System Uptime", value: "99.8%" },
      { label: "User Retention", value: "+75%" },
    ],
  },
  {
    id: 4,
    title: "RogiRadar",
    shortDescription: "Disease Prediction platform based on Machine Learning",
    fullDescription:
      "Disease Prediction platform empowers you to take charge of your health by identifying potential conditions based on 18 common symptoms you choose.",
    image: "/dg.avif?height=600&width=800",
    icon: <Code className="h-5 w-5" />,
    tags: ["Machine Learning", "Data Science", "Python" , "FLASK"],
    github: "https://github.com/RazzGourav/RogiRadar",
    demo: "https://rogiradar.onrender.com/",
    technologies: ["Python", "Machine Learning", "Flask", "HTML", "CSS", "JavaScript"],
    metrics: [
      { label: "Accuracy", value: "99.7%" },
      { label: "Prediction  Speed", value: "0.8s" },
      { label: "Disease Prediction", value: "+28%" },
    ],
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenProject = (project: Project) => {
    setIsLoading(true)
    setSelectedProject(project)

    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">
            <AnimatedGradientText>Projects</AnimatedGradientText>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of the projects I've worked on, showcasing my skills in web development, blockchain, and AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-white dark:bg-gray-800 group">
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 group-hover:opacity-80 transition-opacity duration-300 z-10"></div>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 p-2 rounded-full bg-white dark:bg-gray-800 z-20">
                    <div className="text-cyan-500 dark:text-cyan-400">{project.icon}</div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <motion.div key={tag} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Badge
                          variant="secondary"
                          className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.shortDescription}</p>

                  {/* Metrics Display */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {project.metrics.map((metric, i) => (
                        <motion.div
                          key={i}
                          className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg text-center"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <p className="text-xs text-gray-500 dark:text-gray-400">{metric.label}</p>
                          <motion.p
                            className="text-lg font-semibold text-cyan-500 dark:text-cyan-400"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            {metric.value}
                          </motion.p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            variant="outline"
                            onClick={() => handleOpenProject(project)}
                            className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400/10"
                          >
                            View Details
                          </Button>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl bg-white dark:bg-gray-800">
                        {isLoading ? (
                          <div className="flex flex-col items-center justify-center p-12">
                            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-400 flex items-center">
                              Loading project details
                              <LoadingDots className="ml-2" />
                            </p>
                          </div>
                        ) : (
                          <>
                            <DialogHeader>
                              <DialogTitle className="text-2xl text-gray-900 dark:text-white">
                                {selectedProject?.title}
                              </DialogTitle>
                              <DialogDescription>
                                <div className="flex flex-wrap gap-2 my-2">
                                  {selectedProject?.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="secondary"
                                      className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                              className="relative h-64 w-full mb-4 rounded-md overflow-hidden"
                            >
                              <Image
                                src={selectedProject?.image || ""}
                                alt={selectedProject?.title || ""}
                                fill
                                className="object-cover"
                              />
                            </motion.div>
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="text-gray-700 dark:text-gray-300 mb-4"
                            >
                              {selectedProject?.fullDescription}
                            </motion.p>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                              className="mb-4"
                            >
                              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                Technologies Used
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedProject?.technologies.map((tech, index) => (
                                  <motion.div
                                    key={tech}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                                  >
                                    <Badge variant="outline" className="border-gray-300 dark:border-gray-600">
                                      {tech}
                                    </Badge>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                            {selectedProject?.metrics && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mb-4"
                              >
                                <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                  Key Metrics
                                </h4>
                                <div className="grid grid-cols-3 gap-4">
                                  {selectedProject.metrics.map((metric, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                                      className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-center"
                                    >
                                      <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
                                      <p className="text-xl font-semibold text-cyan-500 dark:text-cyan-400">
                                        {metric.value}
                                      </p>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.5 }}
                              className="flex gap-3"
                            >
                              {selectedProject?.github && (
                                <Button
                                  onClick={() => window.open(selectedProject.github, "_blank")}
                                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                                >
                                  <Github className="mr-2 h-4 w-4" />
                                  GitHub
                                </Button>
                              )}
                              {selectedProject?.demo && (
                                <Button
                                  variant="outline"
                                  onClick={() => window.open(selectedProject.demo, "_blank")}
                                  className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400/10"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Live Demo
                                </Button>
                              )}
                            </motion.div>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                    <div className="flex gap-2">
                      {project.github && (
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(project.github, "_blank")}
                            className="text-gray-600 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400"
                          >
                            <Github className="h-5 w-5" />
                          </Button>
                        </motion.div>
                      )}
                      {project.demo && (
                        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => window.open(project.demo, "_blank")}
                            className="text-gray-600 hover:text-cyan-500 dark:text-gray-400 dark:hover:text-cyan-400"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
