"use client"

import React from "react"

import { useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { Code, Database, Globe, Server, Cpu, Layers } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AnimatedGradientText } from "./animations/text-animation"

interface SkillCategory {
  id: number
  name: string
  icon: React.ReactNode
  skills: Skill[]
}

interface Skill {
  name: string
  level: number // 1-5
  description: string
}

const skillCategories: SkillCategory[] = [
  {
    id: 1,
    name: "Programming Languages",
    icon: <Code className="h-6 w-6" />,
    skills: [
      {
        name: "JavaScript",
        level: 5,
        description: "Proficient in modern JavaScript (ES6+) for both frontend and backend development.",
      },
      {
        name: "TypeScript",
        level: 4,
        description: "Strong experience with TypeScript for type-safe application development.",
      },
      {
        name: "Python",
        level: 4,
        description: "Experienced in Python for data analysis, machine learning, and backend development.",
      },
      {
        name: "Java",
        level: 3,
        description: "Familiar with Java for Android development and enterprise applications.",
      },
      {
        name: "C/C++",
        level: 5,
        description: "Solid understanding of C/C++ for system programming and algorithm implementation.",
      },
    ],
  },
  {
    id: 2,
    name: "Web Development",
    icon: <Globe className="h-6 w-6" />,
    skills: [
      { name: "React", level: 5, description: "Expert in building interactive UIs with React and its ecosystem." },
      {
        name: "Next.js",
        level: 4,
        description: "Experienced in server-side rendering and static site generation with Next.js.",
      },
      { name: "HTML5", level: 5, description: "Proficient in semantic HTML5 markup and accessibility best practices." },
      {
        name: "CSS3/SCSS",
        level: 4,
        description: "Strong skills in responsive design, animations, and modern CSS frameworks.",
      },
      {
        name: "Tailwind CSS",
        level: 5,
        description: "Expert in utility-first CSS with Tailwind for rapid UI development.",
      },
    ],
  },
  {
    id: 3,
    name: "Backend & Databases",
    icon: <Database className="h-6 w-6" />,
    skills: [
      { name: "Node.js", level: 4, description: "Experienced in building scalable backend services with Node.js." },
      { name: "Express.js", level: 4, description: "Proficient in creating RESTful APIs with Express.js." },
      { name: "MongoDB", level: 4, description: "Strong experience with MongoDB for NoSQL database solutions." },
      { name: "SQL", level: 3, description: "Familiar with SQL databases like MySQL and PostgreSQL." },
      {
        name: "Firebase",
        level: 3,
        description: "Experience with Firebase for real-time databases and authentication.",
      },
    ],
  },
  {
    id: 4,
    name: "DevOps & Tools",
    icon: <Server className="h-6 w-6" />,
    skills: [
      { name: "Git", level: 5, description: "Expert in version control with Git and GitHub workflows." },
      { name: "Docker", level: 3, description: "Familiar with containerization using Docker." },
      { name: "CI/CD", level: 3, description: "Experience with continuous integration and deployment pipelines." },
      { name: "AWS", level: 2, description: "Basic knowledge of AWS services for cloud deployment." },
      { name: "Vercel", level: 4, description: "Proficient in deploying and managing applications on Vercel." },
    ],
  },
  {
    id: 5,
    name: "Blockchain",
    icon: <Layers className="h-6 w-6" />,
    skills: [
      { name: "Ethereum", level: 4, description: "Strong experience with Ethereum blockchain development." },
      { name: "Solidity", level: 4, description: "Proficient in writing smart contracts with Solidity." },
      {
        name: "Web3.js",
        level: 4,
        description: "Experienced in integrating blockchain functionality in web applications.",
      },
      { name: "IPFS", level: 3, description: "Familiar with decentralized storage using IPFS." },
      { name: "Truffle", level: 3, description: "Experience with Truffle framework for blockchain development." },
    ],
  },
  {
    id: 6,
    name: "AI & Machine Learning",
    icon: <Cpu className="h-6 w-6" />,
    skills: [
      { name: "TensorFlow", level: 3, description: "Experience with TensorFlow for building machine learning models." },
      { name: "PyTorch", level: 3, description: "Familiar with PyTorch for deep learning applications." },
      { name: "OpenCV", level: 4, description: "Strong experience with OpenCV for computer vision applications." },
      { name: "NLP", level: 3,description: "Basic knowledge of natural language processing techniques." },
      {
        name: "Data Analysis",
        level: 3,
        description: "Experience with data analysis using Python libraries like Pandas and NumPy.",
      },
    ],
  },
]

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const controls = useAnimation()

  // Start the animation sequence when the component mounts
  React.useEffect(() => {
    controls.start("visible")
  }, [controls])

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">
            <AnimatedGradientText>Skills</AnimatedGradientText>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My technical expertise and proficiency in various technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full border-none shadow-lg bg-white dark:bg-gray-800 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      className="p-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-500 dark:text-cyan-400 mr-3"
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + skillIndex * 0.1 }}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className="flex justify-between items-center mb-1 cursor-help"
                                onMouseEnter={() => setHoveredSkill(skill.name)}
                                onMouseLeave={() => setHoveredSkill(null)}
                              >
                                <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {hoveredSkill === skill.name ? `${skill.level}/5` : ""}
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="max-w-xs bg-white dark:bg-gray-800 p-3 shadow-lg border-none"
                            >
                              <p className="text-gray-700 dark:text-gray-300">{skill.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{
                              width: `${(skill.level / 5) * 100}%`,
                              opacity: 1,
                              transition: {
                                width: { duration: 1, delay: 0.3 + skillIndex * 0.1 },
                                opacity: { duration: 0.3, delay: 0.2 + skillIndex * 0.1 },
                              },
                            }}
                            viewport={{ once: true }}
                            className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                          ></motion.div>
                        </div>
                      </motion.div>
                    ))}
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
