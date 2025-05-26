import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import About from "@/components/about"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Education from "@/components/education"
import Skills from "@/components/skills"
import Certifications from "@/components/certifications"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import PageTransition from "@/components/page-transition"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gourav.dev | Software Developer Portfolio",
  description:
    "Portfolio website of Gourav Kumar Ojha, a sophomore software developer specializing in web development, blockchain, and AI-ML.",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <PageTransition />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Education />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  )
}
