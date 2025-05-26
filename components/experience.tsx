"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Briefcase, Calendar, Award, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Experience {
  id: number
  title: string
  company: string
  location: string
  period: string
  description: string[]
  achievements: { text: string; icon: React.ReactNode }[]
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Software Developer Intern",
    company: "Hewlett Packard Enterprise",
    location: "Remote",
    period: "OCT 2024 - NOV 2024",
    description: [
      "Worked on enhancing and optimizing RESTful APIs for improved performance and reliability.",
      "Collaborated with cross-functional teams to implement new features and fix bugs in existing applications.",
      "Participated in code reviews and contributed to the improvement of development processes.",
    ],
    achievements: [
      {
        text: "Improved API response times by 30% through code optimization",
        icon: <Award className="h-4 w-4 text-cyan-500" />,
      },
      {
        text: "Increased code coverage by 15% by implementing comprehensive unit tests",
        icon: <Award className="h-4 w-4 text-cyan-500" />,
      },
      {
        text: "Contributed to the successful delivery of 3 major feature releases",
        icon: <Users className="h-4 w-4 text-cyan-500" />,
      },
    ],
  },
  {
    id: 2,
    title: "Open Source Contributor",
    company: "GirlScript Summer of Code",
    location: "Remote",
    period: "OCT 2024 - NOV 2024",
    description: [
      "Contributed to open-source projects  .",
      "Collaborated with a global community of developers to solve complex problems and implement new features.",
      "Participated in code reviews and provided feedback to other contributors.",
    ],
    achievements: [
      {
        text: "Successfully merged 12+ pull requests across multiple projects",
        icon: <Award className="h-4 w-4 text-cyan-500" />,
      },
      {
        text: "Mentored 5 new contributors in getting started with open-source development",
        icon: <Users className="h-4 w-4 text-cyan-500" />,
      },
      {
        text: "Recognized as a  contributor for the month of NOV 2024",
        icon: <Award className="h-4 w-4 text-cyan-500" />,
      },
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and contributions to the tech community.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-blue-600"></div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 z-10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white dark:bg-gray-900"></div>
                  </div>

                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:pl-0" : "md:pl-12 md:pr-0"} pl-8`}>
                    <Card className="border-none shadow-lg bg-white dark:bg-gray-800 overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                      <CardContent className="p-6">
                        <div className="flex items-center mb-2 text-cyan-500 dark:text-cyan-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="text-sm">{exp.period}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{exp.title}</h3>
                        <div className="flex items-center mb-4 text-gray-600 dark:text-gray-400">
                          <Briefcase className="h-4 w-4 mr-2" />
                          <span>
                            {exp.company} • {exp.location}
                          </span>
                        </div>
                        <div className="mb-4">
                          <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Responsibilities:</h4>
                          <ul className="space-y-1">
                            {exp.description.map((item, i) => (
                              <li key={i} className="flex items-start text-gray-600 dark:text-gray-400">
                                <span className="inline-block w-2 h-2 mt-2 mr-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"></span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Key Achievements:</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((item, i) => (
                              <li key={i} className="flex items-center text-gray-600 dark:text-gray-400">
                                <div className="mr-2">{item.icon}</div>
                                {item.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
