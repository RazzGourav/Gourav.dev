"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { certifications } from "@/lib/data"
import SectionHeading from "@/components/ui-custom/SectionTitle"
import TiltCard from "@/components/ui-custom/TiltCard"
import AnimatedSection from "@/components/ui-custom/AnimatedSection"

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function CertificationsSection() {
  return (
    <AnimatedSection id="certifications" className="py-24 relative">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading
          title="Certifications & Programs"
          codeComment="// certificates.list()"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <TiltCard>
                <div className="glass-card glow-card rounded-xl p-5 h-full">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-violet-500/10 shrink-0">
                      <Award className="w-5 h-5 text-violet-400" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm mb-1">{cert.name}</h3>
                      <p className="text-violet-400 text-xs font-medium">{cert.issuer}</p>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{cert.detail}</p>
                      <Badge className="mt-2 bg-muted text-muted-foreground border-border text-[10px] font-code">
                        {cert.year}
                      </Badge>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
