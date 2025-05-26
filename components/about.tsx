"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, FileText, Code, Cpu, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedGradientText, SplitText } from "./animations/text-animation"
import { StaggerChildren } from "./animations/loading-animation"

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2">
            <AnimatedGradientText>About Me</AnimatedGradientText>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Card className="h-full border-none shadow-lg bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  <SplitText type="words" animation="slide">
                    Who I Am
                  </SplitText>
                </h3>
                <StaggerChildren>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    I'm a passionate software developer currently pursuing my Bachelor of Technology in Computer Science
                    and AI from Rungta College of Engineering and Technology. My journey in technology is driven by a
                    curiosity to solve complex problems and create innovative solutions.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    With a strong foundation in web development, blockchain technology, and artificial intelligence, I
                    strive to build applications that are not only functional but also user-friendly and impactful.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    I'm constantly learning and exploring new technologies to expand my skill set and stay at the
                    forefront of the rapidly evolving tech landscape.
                  </p>
                </StaggerChildren>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: (
                        <Code className="h-8 w-8 mb-2 text-cyan-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
                      ),
                      title: "Web Development",
                      color: "cyan",
                    },
                    {
                      icon: (
                        <Cpu className="h-8 w-8 mb-2 text-blue-600 group-hover:text-blue-700 dark:group-hover:text-blue-500 transition-colors" />
                      ),
                      title: "AI & Machine Learning",
                      color: "blue",
                    },
                    {
                      icon: (
                        <Globe className="h-8 w-8 mb-2 text-cyan-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors" />
                      ),
                      title: "Blockchain",
                      color: "cyan",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-colors group"
                    >
                      {item.icon}
                      <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <Card className="h-full border-none shadow-lg bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Connect With Me</h3>
                <div className="space-y-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-400/10"
                      onClick={() => window.open("https://github.com/RazzGourav", "_blank")}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-blue-600 text-blue-600 hover:bg-blue-600/10 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500/10"
                      onClick={() => window.open("https://www.linkedin.com/in/gourav-kumar-ojha-13853b290/", "_blank")}
                    >
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-500 text-gray-500 hover:bg-gray-500/10 dark:border-gray-400 dark:text-gray-400 dark:hover:bg-gray-400/10"
                      onClick={() => window.open("/resume.pdf", "_blank")}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Resume
                    </Button>
                  </motion.div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">Fun Facts</h4>
                  <ul className="space-y-2">
                    {[
                      "Passionate about open-source contributions",
                      "Enjoy participating in hackathons",
                      "Love exploring new programming languages",
                      "Avid problem solver on coding platforms",
                    ].map((fact, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <span className="inline-block w-2 h-2 mt-2 mr-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"></span>
                        {fact}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
