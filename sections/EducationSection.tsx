"use client"

import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { personalInfo } from "@/lib/data"
import SectionHeading from "@/components/ui-custom/SectionTitle"
import TiltCard from "@/components/ui-custom/TiltCard"
import AnimatedSection from "@/components/ui-custom/AnimatedSection"

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function EducationSection() {
  return (
    <AnimatedSection id="education" className="py-24 relative">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-4xl mx-auto px-4">
        <SectionHeading title="Education" codeComment="// credentials.verify()" />

        <motion.div variants={fadeInUp}>
          <TiltCard>
            <div className="glass-card glow-card rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-violet-500/10 shrink-0">
                    <GraduationCap className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl">{personalInfo.education.degree}</h3>
                    <p className="text-violet-400 font-medium">{personalInfo.education.institution}</p>
                    <p className="text-muted-foreground mt-1">GPA: {personalInfo.education.gpa}</p>
                  </div>
                </div>
                <Badge className="bg-muted text-muted-foreground border-border text-xs font-code w-fit shrink-0">
                  {personalInfo.education.period}
                </Badge>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
