"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { ArrowDown, Github, Linkedin, FileText, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import TypewriterComponent from "./animations/typewriter"
import { SplitText } from "./animations/text-animation"
import { FadeInWhenVisible } from "./animations/loading-animation"

export default function Hero() {
  const controls = useAnimation()
  const scrollRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    })
  }, [controls])

  const scrollToNext = () => {
    if (scrollRef.current) {
      const nextSection = document.getElementById("about")
      nextSection?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Tech-themed background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800"></div>
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-cyan-500"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-3xl"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <SplitText type="chars" animation="bounce">
                Gourav&nbsp;Kumar&nbsp;Ojha
              </SplitText>
            </h1>

            <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-2">
              <TypewriterComponent
                texts={[
                  "Sophomore Software Developer",
                  "Web Development Enthusiast",
                  "Blockchain Explorer",
                  "AI & ML Practitioner",
                ]}
                className="h-8 inline-block"
              />
            </h2>

            <p className="mb-6 text-gray-600 dark:text-gray-400">
              <SplitText type="words" animation="fade">
                Innovating through Code & Creativity
              </SplitText>
            </p>

            <FadeInWhenVisible>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button
                  onClick={() => window.open("/resume.pdf", "_blank")}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open("https://github.com/RazzGourav", "_blank")}
                  className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400/10"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open("https://www.linkedin.com/in/gourav-kumar-ojha-13853b290/", "_blank")}
                  className="border-blue-600 text-blue-600 hover:bg-blue-600/10 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500/10"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
              </div>
            </FadeInWhenVisible>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="relative w-64 h-64 md:w-80 md:h-80"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 animate-pulse blur-xl opacity-50"></div>
            <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
              <Image
                src="/2.jpg?height=400&width=400"
                alt="Gourav Kumar Ojha"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Animated floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-white"
              animate={{
                y: [0, -10, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.5,
              }}
            >
              <Code className="w-6 h-6" />
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white"
              animate={{
                y: [0, 10, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 0.2,
              }}
            >
              <span className="text-xs font-bold">AI</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        ref={scrollRef}
        animate={controls}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNext}
        whileHover={{ scale: 1.2 }}
      >
        <ArrowDown className="h-8 w-8 text-cyan-500 dark:text-cyan-400" />
      </motion.div>
    </section>
  )
}
