"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Github,
  Linkedin,
  Mail,
  Database,
  Brain,
  Shield,
  ChevronDown,
  MapPin,
  Calendar,
  Award,
  Users,
  Zap,
  ExternalLink,
  Download,
  Moon,
  Sun,
  Menu,
  X,
  Phone,
  Activity,
  Trophy,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    // Simulate loading time
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    const setupObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set([...prev, entry.target.id]))
            }
          })
        },
        { threshold: 0.1, rootMargin: "50px" },
      )

      const sections = [
        "hero",
        "about",
        "projects",
        "experience",
        "education",
        "skills",
        "certifications",
        "achievements",
        "contact",
      ]
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          observer.observe(element)
        }
      })

      return observer
    }

    let observer: IntersectionObserver | null = null
    const observerTimer = setTimeout(() => {
      observer = setupObserver()
    }, 2100) // Slightly after loading completes

    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(observerTimer)
      observer?.disconnect()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "experience", "education", "skills", "certifications", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-emerald-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-serif font-bold text-emerald-600 animate-pulse">Gourav.dev</h2>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <p className="text-muted-foreground animate-fade-in">Loading portfolio...</p>
          </div>
        </div>
      </div>
    )
  }

  const projects = [
    {
      title: "Matdata Mitra",
      description:
        "Comprehensive blockchain-based voting platform with facial recognition and decentralized voting system",
      longDescription:
        "A revolutionary end-to-end platform designed to transform the voting process through blockchain technology. Features secure voter ID card creation, advanced facial recognition for authentication, and a fully decentralized voting system ensuring transparency and tamper-proof elections.",
      technologies: ["React", "Python", "Node.js", "Express.js", "Ethereum", "OpenCV", "IPFS", "MongoDB", "MySQL"],
      features: [
        "Blockchain Voter Cards",
        "Facial Recognition",
        "Decentralized Voting",
        "Smart Contracts",
        "IPFS Storage",
        "Secure Authentication",
      ],
      icon: <Shield className="w-6 h-6" />,
      metrics: { users: "1000+", accuracy: "99.2%", transactions: "5000+" },
      github: "https://github.com/RazzGourav/matdata-mitra",
      demo: "https://matdata-mitra-demo.vercel.app",
    },
    {
      title: "RogiRadar",
      description: "ML-powered web application analyzing 18 symptoms to predict potential diseases with 85% accuracy",
      longDescription:
        "A comprehensive machine learning-powered healthcare application that analyzes 18 common symptoms to predict potential diseases and guide users toward timely medical consultation. Features real-time predictions with responsible use disclaimers.",
      technologies: [
        "React",
        "Python",
        "Flask",
        "Scikit-learn",
        "Pandas",
        "REST API",
        "HTML/CSS",
        "JavaScript",
        "MongoDB",
      ],
      features: [
        "Symptom Analysis",
        "Disease Prediction",
        "Real-time API",
        "Scalable Architecture",
        "Medical Guidance",
        "85% Accuracy",
      ],
      icon: <Activity className="w-6 h-6" />,
      metrics: { accuracy: "85%", symptoms: "18+", response: "<2s" },
      github: "https://github.com/RazzGourav/RogiRadar",
      demo: "https://rogiradar.onrender.com/",
    },
    {
      title: "RungtAI – Campus Companion",
      description: "AI agent for virtual campus tours with 24/7 chatbot and event management",
      longDescription:
        "An intelligent campus companion powered by Google's Gemini API, providing students with virtual tours, real-time assistance, and comprehensive event management. Built with modern web technologies for optimal performance.",
      technologies: ["Gemini API", "Next.js", "TypeScript", "Tailwind CSS"],
      features: ["Virtual Tours", "24/7 Chatbot", "Event Display", "Smart Recommendations", "Campus Navigation"],
      icon: <Brain className="w-6 h-6" />,
      metrics: { queries: "10000+", satisfaction: "95%", uptime: "99.9%" },
      github: "https://github.com/RazzGourav/RungtAI",
      demo: "https://rungt-ai.vercel.app",
    },
    {
      title: "GSRA BANKS",
      description:
        "Simulated online banking portal with secure fund transfers, JWT authentication, and real-time transactions",
      longDescription:
        "A full-featured banking simulation platform with enterprise-grade security, real-time transactions, and comprehensive account management. Features secure user authentication, account management, and real-time balance inquiries.",
      technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "JWT"],
      features: [
        "Fund Transfers",
        "Secure Authentication",
        "Account Management",
        "Transaction History",
        "Real-time Balance",
        "Profile Management",
      ],
      icon: <Database className="w-6 h-6" />,
      metrics: { transactions: "50000+", security: "Bank-grade", users: "2500+" },
      github: "https://github.com/RazzGourav/GSRABank",
      demo: "https://gsra-banks.herokuapp.com",
    },
  ]

  const skillCategories = {
    "Programming Languages": [
      { name: "Python", level: 90, description: "Web development, ML, computer vision, and automation scripting" },
      { name: "C/C++", level: 85, description: "Data structures, algorithms, and system programming" },
      { name: "Java", level: 80, description: "Object-oriented programming and enterprise applications" },
      { name: "JavaScript", level: 88, description: "Full-stack web development and modern ES6+ features" },
    ],
    "Web Development": [
      { name: "React", level: 90, description: "Advanced component architecture and state management" },
      { name: "Node.js", level: 85, description: "Server-side JavaScript with Express.js framework" },
      { name: "Next.js", level: 88, description: "Full-stack React framework with SSR/SSG" },
      { name: "TypeScript", level: 85, description: "Type-safe development with modern features" },
    ],
    "AI & Machine Learning": [
      { name: "OpenCV", level: 85, description: "Computer vision and image processing applications" },
      { name: "PyTorch", level: 80, description: "Deep learning and neural network development" },
      { name: "TensorFlow", level: 78, description: "Machine learning model development and deployment" },
      { name: "Scikit-learn", level: 85, description: "Traditional ML algorithms and data analysis" },
    ],
    "Blockchain & Database": [
      { name: "Ethereum", level: 80, description: "Smart contract development and DApp creation" },
      { name: "Solidity", level: 75, description: "Smart contract programming language" },
      { name: "MongoDB", level: 85, description: "NoSQL database design and optimization" },
      { name: "MySQL", level: 80, description: "Relational database management and queries" },
    ],
  }

  const certifications = [
    {
      name: "Azure Fundamentals",
      issuer: "Microsoft",
      year: "2023",
      description: "Cloud computing fundamentals and Azure services",
      credentialId: "",
    },
    {
      name: "Postman API Fundamentals",
      issuer: "Postman",
      year: "2024",
      description: "API testing, documentation, and automation",
      credentialId: "API-FUND-2024",
    },
    {
      name: "Data Structures and Algorithms",
      issuer: "DevTown",
      year: "2024",
      description: "Advanced DSA concepts and problem-solving techniques",
      credentialId: "DSA-2024",
    },
    {
      name: "Open Source Contributor",
      issuer: "GirlScript Summer of Code",
      year: "2024",
      description: "Recognized contributor to open-source projects",
      credentialId: "GSSOC-2024",
    },
    {
      name: "Full-Stack Development",
      issuer: "DevTown",
      year: "2024",
      description: "Complete web development stack mastery",
      credentialId: "FULLSTACK-2024",
    },
    {
      name: "Data Science AI-ML",
      issuer: "Coding Spoon",
      year: "2025",
      description: "AI-ML Intermediate Level",
      credentialId: "AI-ML-2025",
    },
    {
      name: "Google Cloud Skills Boost",
      issuer: "Google",
      year: "2024",
      description: "Cloud platform services and API integration",
      credentialId: "GCP-2024",
    },
  ]

  const achievements = [
    {
      title: "Project Showcase",
      category: "College Competition",
      position: "Best Innovation & Project",
      description: "Blockchain based Voter-id creation & Decentralised Voting System",
      image: "/Project.jpg",
      date: "May 2025",
      impact: "400+ competing projects",
    },
    {
      title: "Flash Hack Hackathon 2025",
      category: "College  Hackathon",
      position: "Runner UP",
      description: "The Centralized Digital Notice Board is a digital platform designed to streamline communication by centralizing all important notices in one place. Key features include",
      image: "Flashhack.jpg",
      date: "Jan 2025",
      impact: "Recognized by GDGRCET",
    },
    {
      title: "Shaastrarth25",
      category: "10th International Conference",
      position: "Top 10 Papers",
      description: "Our paper, “Blockchain-based Voter Identity and Voting System,” explores how decentralized tech can revolutionize election security, transparency, and accessibility",
      image: "/Shaastrarth.jpg",
      date: "June 2025",
      impact: "Among 500+ paper",
    },
    {
      title: "Best Research Project",
      category: "Research Intern at India Space Academy",
      position: "Best Research Project",
      description: "During this immersive experience in Data-Driven Astronomy, I led the Supernova Cosmology Project , analyzing Hubble/JWST satellite data to probe cosmic expansion. Here are key insights from my work",
      image: "/ISA.png",
      date: "July 2025",
      impact: "Among 200 Research Project ",
    },
    
    
    
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Enhanced Navigation with mobile menu */}
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50 animate-slide-down">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="font-serif font-bold text-xl text-emerald-600">Gourav.dev</div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {["About", "Projects", "Experience", "Skills", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                      activeSection === item.toLowerCase() ? "text-emerald-600" : "text-muted-foreground"
                    }`}
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center space-x-2">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {["About", "Projects", "Experience", "Skills", "Contact"].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`block px-3 py-2 text-base font-medium transition-colors hover:text-emerald-600 w-full text-left ${
                        activeSection === item.toLowerCase() ? "text-emerald-600" : "text-muted-foreground"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Enhanced Hero Section with typewriter effect */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-background to-blue-50 dark:from-emerald-950/20 dark:via-background dark:to-blue-950/20"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float-delayed"></div>
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <Avatar className="w-32 h-32 mx-auto mb-8 ring-4 ring-emerald-200 hover:ring-emerald-300 transition-all duration-300 hover:scale-105 animate-scale-in">
              <AvatarImage src="/software-developer-headshot.png" alt="Gourav Kumar Ojha" />
              <AvatarFallback className="text-2xl font-bold bg-emerald-600 text-white">GKO</AvatarFallback>
            </Avatar>

            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              <span className="animate-typewriter">Gourav Kumar Ojha</span>
            </h1>

            <p
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "1s" }}
            >
              Aspiring Software Developer | BTech CSE with AI | AI-ML Researcher
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up"
              style={{ animationDelay: "1.5s" }}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="group bg-emerald-600 hover:bg-emerald-700 hover:scale-105 transition-all duration-300 animate-bounce-gentle"
              >
                View My Work
                <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform animate-bounce" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 bg-transparent hover:scale-105 transition-all duration-300"
              >
                <a href="/resume.pdf" download>
                  <Download className="mr-2 w-4 h-4" />
                  Download Resume
                </a>
              </Button>
            </div>

            <div className="flex justify-center space-x-6 animate-fade-in-up" style={{ animationDelay: "2s" }}>
              <a
                href="https://github.com/RazzGourav"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 transition-all duration-300 hover:scale-110 animate-bounce-social"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/gourav-kumar-ojha-13853b290"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-emerald-600 transition-all duration-300 hover:scale-110 animate-bounce-social"
                style={{ animationDelay: "0.1s" }}
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:kumargouravojha@gmail.com"
                className="text-muted-foreground hover:text-emerald-600 transition-all duration-300 hover:scale-110 animate-bounce-social"
                style={{ animationDelay: "0.2s" }}
              >
                <Mail className="w-6 h-6" />
              </a>
              <a
                href="tel:+916207001498"
                className="text-muted-foreground hover:text-emerald-600 transition-all duration-300 hover:scale-110 animate-bounce-social"
                style={{ animationDelay: "0.3s" }}
              >
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>

        {/* About Section with scroll animations */}
        <section
          id="about"
          className={`py-20 bg-muted/30 dark:bg-muted/10 transition-all duration-1000 ${visibleSections.has("about") ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-center mb-12 animate-slide-in-left">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  I'm a passionate student pursuing Bachelor of Technology in Computer Science and AI at Rungta
                  College of Engineering and Technology. My journey in software development spans across blockchain
                  technology, AI-ML, and full-stack web development.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  With hands-on experience from my internship at Hewlett Packard Enterprise and active contributions to
                  open-source projects through GirlScript Summer of Code and Research Intern at ISA , I'm constantly pushing the boundaries of
                  what's possible with code.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300"
                  >
                    AI-ML Enthusiast
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                  >
                    Blockchain Developer
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                  >
                    Full-Stack Developer
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300"
                  >
                    Open Source Contributor
                  </Badge>
                </div>
              </div>
              <div className="space-y-6 animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p className="text-muted-foreground">Raipur, Chhattisgarh, India</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Current Status</h3>
                        <p className="text-muted-foreground"> CSE AI Student</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Projects Section with staggered animations */}
        <section
          id="projects"
          className={`py-20 transition-all duration-1000 ${
            !isLoading && (visibleSections.has("projects") || visibleSections.size === 0)
              ? "animate-fade-in-up"
              : isLoading
                ? "opacity-0"
                : "opacity-100"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-center mb-12 animate-slide-in-left">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card
                      className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in-up`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/30 transition-colors">
                              {project.icon}
                            </div>
                            <CardTitle className="text-xl">{project.title}</CardTitle>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
                        </div>
                        <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            {Object.entries(project.metrics).map(([key, value]) => (
                              <div key={key} className="p-2 bg-muted rounded-lg">
                                <div className="text-sm font-semibold text-emerald-600">{value}</div>
                                <div className="text-xs text-muted-foreground capitalize">{key}</div>
                              </div>
                            ))}
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2 text-sm">Key Features</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.features.slice(0, 3).map((feature, idx) => (
                                <Badge
                                  key={idx}
                                  variant="outline"
                                  className="text-xs border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300"
                                >
                                  {feature}
                                </Badge>
                              ))}
                              {project.features.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{project.features.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>

                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">{project.icon}</div>
                        <div>
                          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                          <DialogDescription className="text-base mt-1">{project.longDescription}</DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <Card key={key}>
                            <CardContent className="p-4 text-center">
                              <div className="text-2xl font-bold text-emerald-600">{value}</div>
                              <div className="text-sm text-muted-foreground capitalize">{key}</div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Features */}
                      <div>
                        <h3 className="font-semibold mb-3">Key Features</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.features.map((feature, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h3 className="font-semibold mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <Badge key={idx} className="bg-emerald-600 hover:bg-emerald-700">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-4 pt-4">
                        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 w-4 h-4" />
                            View Code
                          </a>
                        </Button>
                        <Button variant="outline" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 w-4 h-4" />
                            Live Demo
                          </a>
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </section>

        <section
          id="experience"
          className={`py-20 bg-muted/30 dark:bg-muted/10 transition-all duration-1000 ${
            !isLoading && (visibleSections.has("experience") || visibleSections.size === 0)
              ? "animate-fade-in-up"
              : isLoading
                ? "opacity-0"
                : "opacity-100"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-center mb-12 animate-slide-in-left">Experience</h2>
            <div className="space-y-8">
              <Card className="animate-slide-in-right" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Software Developer Intern</CardTitle>
                      <CardDescription className="text-lg font-medium text-emerald-600">
                        Hewlett Packard Enterprise
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">Remote</p>
                    </div>
                    <Badge variant="secondary">Oct 2024 - Nov 2024</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 mt-1 text-emerald-600 flex-shrink-0" />
                      <span>
                        Developed comprehensive proposal for RESTful web services reducing API response times by 30% and
                        integration costs by 20%
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 mt-1 text-emerald-600 flex-shrink-0" />
                      <span>
                        Engineered 4+ RESTful web services improving data processing speeds by 40% and reducing
                        operational errors by 25%
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 mt-1 text-emerald-600 flex-shrink-0" />
                      <span>
                        Created and executed 50+ unit tests achieving 95% code coverage and decreasing production issues
                        by 35%
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Open Source Contributor</CardTitle>
                      <CardDescription className="text-lg font-medium text-emerald-600">
                        GirlScript Summer of Code
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">Remote</p>
                    </div>
                    <Badge variant="secondary">Oct 2024 - Nov 2024</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <Users className="w-4 h-4 mt-1 text-emerald-600 flex-shrink-0" />
                      <span>Contributed to open-source projects under the GSSoC 2024 program</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Users className="w-4 h-4 mt-1 text-emerald-600 flex-shrink-0" />
                      <span>Partnered with cross-functional team of 8+ developers to refine project features</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Research Intern</CardTitle>
                      <CardDescription className="text-lg font-medium text-emerald-600">India Space Week</CardDescription>
                      <p className="text-sm text-muted-foreground">Remote</p>
                    </div>
                    <Badge variant="secondary">Jun 2025 - Jul 2025</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <Users className="w-4 h-4 mt-1 text-emerald-600 flex-shrink-0" />
                      <span>
                        Led an in-depth research project focused on analyzing Type Ia Supernovae datasets to estimate key cosmological parameters.
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Users className="w-4 h-4 mt-1 text-emerald-600 flex-shrink-0" />
                      <span>The project involved hands-on work with real astronomical data from the Hubble Space Telescope and James Webb Space Telescope.</span>
                    </li>
                    
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="education"
          className={`py-20 transition-all duration-1000 ${visibleSections.has("education") ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-center mb-12 animate-slide-in-left">Education</h2>
            <div className="space-y-6">
              <Card className="animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Bachelor of Technology</CardTitle>
                      <CardDescription className="text-lg font-medium text-emerald-600">
                        Computer Science in AI
                      </CardDescription>
                      <p className="text-muted-foreground mt-1">
                        Rungta College of Engineering and Technology, Bhilai, CG
                      </p>
                    </div>
                    <Badge variant="secondary">Aug 2023 - Present</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Currently pursuing a specialized degree in Computer Science with a focus on Artificial Intelligence.
                    Coursework includes machine learning, data structures, algorithms, software engineering, and AI
                    ethics.
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Higher Secondary</CardTitle>
                      <CardDescription className="text-lg font-medium text-emerald-600">Science Stream</CardDescription>
                      <p className="text-muted-foreground mt-1">Sunrise Dwarka Academy, Deoghar, JH</p>
                    </div>
                    <Badge variant="secondary">Jul 2021 - Jun 2023</Badge>
                  </div>
                </CardHeader>
              </Card>

              <Card className="animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Secondary Education</CardTitle>
                      <CardDescription className="text-lg font-medium text-emerald-600">CBSE Board</CardDescription>
                      <p className="text-muted-foreground mt-1">St. Xavier's High School, Deoghar, JH</p>
                    </div>
                    <Badge variant="secondary">Mar 2013 - Jul 2021</Badge>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Enhanced Skills Section with animated progress bars */}
        <section
          id="skills"
          className={`py-20 bg-muted/30 dark:bg-muted/10 transition-all duration-1000 ${
            !isLoading && (visibleSections.has("skills") || visibleSections.size === 0)
              ? "animate-fade-in-up"
              : isLoading
                ? "opacity-0"
                : "opacity-100"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-center mb-12 animate-slide-in-left">Technical Skills</h2>
            <div className="space-y-12">
              {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
                <div
                  key={category}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${categoryIndex * 0.2}s` }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-emerald-600 animate-slide-in-left">{category}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="group animate-slide-in-right"
                        style={{ animationDelay: `${categoryIndex * 0.2 + index * 0.1}s` }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 mb-2 overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full transition-all duration-1000 ease-out animate-progress-fill"
                            style={{
                              width: visibleSections.has("skills") ? `${skill.level}%` : "0%",
                              animationDelay: `${(categoryIndex * 0.2) + (index * 0.1) + 0.5}s`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Certifications Section with grid animations */}
        <section
          id="certifications"
          className={`py-20 transition-all duration-1000 ${visibleSections.has("certifications") ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-center mb-12 animate-slide-in-left">Certifications</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <Card
                  key={index}
                  className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{cert.name}</h3>
                        <p className="text-emerald-600 font-medium">{cert.issuer}</p>
                        <p className="text-sm text-muted-foreground mt-1">{cert.description}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="secondary">{cert.year}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {cert.credentialId}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="achievements"
          className={`py-20 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 transition-all duration-1000 ${visibleSections.has("achievements") ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold mb-4 animate-slide-in-left">Achievements & Recognition</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Celebrating wins in hackathons, competitions, and recognition for innovative projects
              </p>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[
                { number: "5+", label: "Competition Wins", icon: "🏆" },
                { number: "100+", label: "Participants Competed", icon: "👥" },
                { number: "5+", label: "Open Source PRs", icon: "🔧" },
                { number: "100%", label: "Project Success Rate", icon: "✨" },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-emerald-600 mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* Achievement Cards with Image Slideshow */}
            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="md:flex">
                    {/* Image Section */}
                    <div className="md:w-1/3 relative overflow-hidden">
                      <img
                        src={achievement.image || "/placeholder.svg"}
                        alt={achievement.title}
                        className="w-full h-64 md:h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-emerald-600 text-white font-semibold">{achievement.position}</Badge>
                      </div>
                    </div>

                    {/* Content Section */}
                    <CardContent className="md:w-2/3 p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{achievement.title}</h3>
                          <Badge variant="outline" className="mb-3">
                            {achievement.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">{achievement.date}</div>
                          <div className="text-xs text-emerald-600 font-medium mt-1">{achievement.impact}</div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">{achievement.description}</p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-yellow-500" />
                          <span className="font-semibold text-emerald-600">{achievement.position}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{achievement.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <Card className="inline-block p-8 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
                <h3 className="text-xl font-bold mb-2">Ready for New Challenges</h3>
                <p className="mb-4">Always looking for opportunities to compete and innovate</p>
                <Button variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100">
                  View All Projects
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Enhanced Contact Section with form animations */}
        <section
          id="contact"
          className={`py-20 bg-muted/30 dark:bg-muted/10 transition-all duration-1000 ${
            !isLoading && (visibleSections.has("contact") || visibleSections.size === 0)
              ? "animate-fade-in-up"
              : isLoading
                ? "opacity-0"
                : "opacity-100"
          }`}
        >
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-center mb-12 animate-slide-in-left">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  I'm always interested in new opportunities and collaborations. Whether you have a project in mind or
                  just want to connect, feel free to reach out!
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <a
                      href="mailto:kumargouravojha@gmail.com"
                      className="text-muted-foreground hover:text-emerald-600 transition-colors"
                    >
                      kumargouravojha@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <a
                      href="tel:+916207001498"
                      className="text-muted-foreground hover:text-emerald-600 transition-colors"
                    >
                      +91 6207001498
                    </a>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                    <a
                      href="https://www.linkedin.com/in/gourav-kumar-ojha-13853b290"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="mr-2 w-4 h-4" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://github.com/RazzGourav" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 w-4 h-4" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>

              <Card className="animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>I'll get back to you as soon as possible</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Project Collaboration" />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell me about your project or how we can work together..."
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-border animate-fade-in">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-muted-foreground">© 2024 Gourav Kumar Ojha.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
