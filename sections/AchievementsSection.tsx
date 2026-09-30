"use client"

import { motion } from "framer-motion"
import { Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { achievements } from "@/lib/data"
import SectionHeading from "@/components/ui-custom/SectionTitle"
import TiltCard from "@/components/ui-custom/TiltCard"
import AnimatedSection from "@/components/ui-custom/AnimatedSection"
import AnimatedCounter from "@/components/ui-custom/AnimatedCounter"
import PhotoGallery from "@/components/ui-custom/PhotoGallery"

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function AchievementsSection() {
  return (
    <AnimatedSection id="achievements" className="py-24 relative">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-6xl mx-auto px-4">
        <SectionHeading
          title="Achievements & Recognition"
          codeComment="// model.evaluate(achievements)"
          subtitle="Hackathons, competitions, and awards"
        />

        {/* Stats bar with 3D depth */}
        <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { number: 3, suffix: "x", label: "Hackathon Wins", icon: "🏆" },
            { number: 2, suffix: "", label: "Papers Under Review", icon: "📄" },
            { number: 1, suffix: "", label: "Patent Pending", icon: "🛡️" },
            { number: 10, suffix: "TB+", label: "Data Processed", icon: "📊" },
          ].map((stat, i) => (
            <TiltCard key={i}>
              <div className="glass-card rounded-xl p-5 text-center group">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold gradient-text-static mb-1">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted-foreground font-code">{stat.label}</div>
              </div>
            </TiltCard>
          ))}
        </motion.div>

        {/* Achievement cards */}
        <div className="space-y-6">
          {achievements.map((achievement, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <div className="glass-card glow-card rounded-2xl overflow-hidden">
                <div className="md:flex">
                  {/* Photo gallery */}
                  <div className="md:w-2/5 relative overflow-hidden">
                    <PhotoGallery images={achievement.images} alt={achievement.title} />
                    <div className="absolute top-4 left-4 z-20">
                      <Badge className="bg-violet-600/90 text-white backdrop-blur-sm text-xs border-transparent hover:bg-violet-600/90">
                        {achievement.position}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:w-3/5 p-6 md:p-8 flex flex-col">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{achievement.title}</h3>
                        <p className="text-violet-400 text-sm font-medium">{achievement.event}</p>
                      </div>
                      <Badge className="bg-muted text-muted-foreground border-border text-xs font-code shrink-0">
                        {achievement.date}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/30">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span className="text-sm font-medium text-amber-400">{achievement.position}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
