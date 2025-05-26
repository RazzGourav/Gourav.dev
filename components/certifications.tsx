"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Certification {
  id: number
  name: string
  issuer: string
  date: string
  image: string
  link?: string
  description: string
}

const certifications: Certification[] = [
  {
    id: 1,
    name: "Microsoft Azure Fundamentals ",
    issuer: "Microsoft",
    date: "October 2023",
    image: "/az.jpg?height=200&width=200",
    link: "https://www.credly.com/badges/azure-fundamentals",
    description:
      "Validated foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
  },
  {
    id: 2,
    name: "Postman API Fundamentals",
    issuer: "Postman",
    date: "November 2024",
    image: "/Postman.png?height=200&width=200",
    link: "https://badgr.com/public/assertions/GALPD3sfQleE_qDkxGWA5Q",
    description: "Demonstrated proficiency in API testing, documentation, and development using Postman.",
  },
  {
    id: 3,
    name: "Full-stack Web Development ",
    issuer: "DevTown",
    date: " August 2024",
    image: "/web.jpg?height=200&width=200",
    link: "https://www.cert.devtown.in/verify/7332WDkV",
    description:
      "Comprehensive course covering HTML, CSS, JavaScript, Node.js, and React for full-stack web development.",
  },
  {
    id: 4,
    name: "Google Cloud Skills Boost & APIs",
    issuer: "Google",
    date: "December 2024",
    image: "/ss.png?height=200&width=200",
    link: "https://www.credly.com/users/gourav-kumar-ojha",
    description: "Mastered and completed google cloud skills boost and api.",
  },
  {
    id: 5,
    name: "Data Structures & Algorithms in C++",
    issuer: "DevTown",
    date: "November 2024",
    image: "/gg.jpeg?height=200&width=200",
    link: "https://www.cert.devtown.in/verify/r1ha3Dmz",
    description: "Comprehensive course covering Data Structures & Algorithms in C++.",
  },
  {
    id: 6,
    name: "AI Builders Lab",
    issuer: "Hack2Skill",
    date: "November 2024",
    image: "/h2s.png?height=200&width=200",
    link: "https://certificate.hack2skill.com/user/aibuilderslab/2024H2S10AIBL-P003527",
    description: "AI lab  covering Generative AI  REST APIs & Api",
  },
  {
    id: 7,
    name: "Open source contributor ",
    issuer:"GirlScript Summer of Code ",
    date: "November 2024",
    image: "/gssoc.jpeg?height=200&width=200",
    link: "https://www.credly.com/users/gourav-kumar-ojha",
    description: "AI lab covering Generative AI  REST APIs & Api",
  },
  
]

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional certifications and courses I've completed to enhance my skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-white dark:bg-gray-800 group">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 mb-4 group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-md"></div>
                    <div className="relative z-10">
                      <Image
                        src={cert.image || "/placeholder.svg"}
                        alt={cert.name}
                        width={96}
                        height={96}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{cert.name}</h3>
                  <div className="flex items-center mb-2 text-gray-600 dark:text-gray-400 text-sm">
                    <Award className="h-3 w-3 mr-1 text-cyan-500" />
                    <span>
                      {cert.issuer} • {cert.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">{cert.description}</p>
                  {cert.link && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-auto border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400/10"
                      onClick={() => window.open(cert.link, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Verify
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
