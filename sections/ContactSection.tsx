"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Linkedin, Github } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { personalInfo } from "@/lib/data"
import SectionHeading from "@/components/ui-custom/SectionTitle"
import TiltCard from "@/components/ui-custom/TiltCard"
import AnimatedSection from "@/components/ui-custom/AnimatedSection"

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function ContactSection() {
  return (
    <AnimatedSection id="contact" className="py-24 relative">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-4xl mx-auto px-4">
        <SectionHeading
          title="Get In Touch"
          codeComment="// await connect(you, me)"
          subtitle="Always interested in research collaborations and new opportunities"
        />

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={slideInLeft} className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Whether you&apos;re interested in AI research collaboration, have a project in mind, or just want to discuss
              the latest in ML — I&apos;d love to hear from you.
            </p>

            <div className="space-y-3">
              {[
                { icon: <Mail className="w-5 h-5 text-violet-400" />, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: <Phone className="w-5 h-5 text-violet-400" />, label: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/[^+\d]/g, '')}` },
                { icon: <MapPin className="w-5 h-5 text-violet-400" />, label: personalInfo.location, href: "#" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 text-muted-foreground hover:text-violet-400 transition-colors group"
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </a>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <Button asChild className="bg-violet-600 hover:bg-violet-500">
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 w-4 h-4" /> LinkedIn
                </a>
              </Button>
              <Button asChild variant="outline" className="border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-400 text-muted-foreground">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 w-4 h-4" /> GitHub
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div variants={slideInRight}>
            <TiltCard>
              <div className="glass-card glow-card rounded-2xl p-6">
                <h3 className="font-semibold mb-1">Send a Message</h3>
                <p className="text-xs text-muted-foreground mb-5">I&apos;ll get back to you via email</p>
                <form
                  action={`https://formsubmit.co/${personalInfo.email}`}
                  method="POST"
                  className="space-y-4"
                >
                  {/* FormSubmit config */}
                  <input type="hidden" name="_subject" value="New message from Gourav.dev portfolio" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_next" value="https://gourav.dev" />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName" className="text-xs text-muted-foreground">First Name</Label>
                      <Input id="firstName" name="First Name" placeholder="John" required className="mt-1 bg-muted/30 border-border/50 focus:border-violet-500/50" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-xs text-muted-foreground">Last Name</Label>
                      <Input id="lastName" name="Last Name" placeholder="Doe" className="mt-1 bg-muted/30 border-border/50 focus:border-violet-500/50" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required className="mt-1 bg-muted/30 border-border/50 focus:border-violet-500/50" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-xs text-muted-foreground">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we work together?"
                      required
                      className="mt-1 min-h-[100px] bg-muted/30 border-border/50 focus:border-violet-500/50 resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white border-0">
                    Send Message
                  </Button>
                </form>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  )
}
