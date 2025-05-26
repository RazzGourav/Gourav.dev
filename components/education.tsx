"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Education {
  id: number
  degree: string
  institution: string
  location: string
  period: string
  description: string
  achievements?: string[]
}

const educations: Education[] = [
  {
    id: 1,
    degree: "Bachelor of Technology in Computer Science and AI",
    institution: "Rungta College of Engineering and Technology",
    location: "Bhilai, Chhattisgarh",
    period: "2023 - 2027",
    description:
      "Pursuing a comprehensive degree program focused on computer science , artificial intelligence, machine learning, and software development.",
    achievements: [
      "Maintained a CGPA of 8/10",
      "Active member of the college's coding club",
      "Participated and won multiple hackathons and coding competitions",
    ],
  },
  {
    id: 2,
    degree: "Higher Secondary Education",
    institution: "Sunrise Dwarka Academy",
    location: "Deoghar, Jharkhand",
    period: "2021 - 2023",
    description: "Completed higher secondary education with a focus on science and mathematics.",
    achievements: [
      
      "Participated in various science exhibitions and competitions",
      "Received merit scholarship for academic excellence",
      "Participated and won various Debate competitions "
    ],
  },
  {
    id: 3,
    degree: "Secondary Education",
    institution: "ST. Xavier's High School Deoghar",
    location: "Deoghar, Jharkhand",
    period: "2013 - 2021",
    description: "Completed secondary education with distinction in science and mathematics.",
    achievements: [
      "Scored 93% in board examinations",
      "Represented School at verious level in Debate competitions",
      "Participated and won sports competitions for school at district level",
      "Received certificate of excellence for academic performance",
      "Active participant in school's science club",
    ],
  },
]

export default function Education() {
  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My academic journey and educational background.
          </p>
        </motion.div>

        <div className="space-y-8">
          {educations.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-none shadow-lg bg-white dark:bg-gray-800">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 flex items-center justify-center md:w-1/4">
                      <GraduationCap className="h-16 w-16" />
                    </div>
                    <div className="p-6 md:w-3/4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{edu.degree}</h3>
                          <div className="flex items-center mb-2 text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>
                              {edu.institution}, {edu.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center mt-2 md:mt-0 text-cyan-500 dark:text-cyan-400">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{edu.period}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{edu.description}</p>
                      {edu.achievements && (
                        <div>
                          <h4 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Achievements:</h4>
                          <ul className="space-y-2">
                            {edu.achievements.map((item, i) => (
                              <li key={i} className="flex items-center text-gray-600 dark:text-gray-400">
                                <Award className="h-4 w-4 mr-2 text-cyan-500 dark:text-cyan-400" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
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
