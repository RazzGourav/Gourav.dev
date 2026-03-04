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
        "volunteering",
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
      const sections = ["hero", "about", "projects", "experience", "education", "skills", "certifications", "achievements", "volunteering", "contact"]
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
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50 neural-grid">
        <div className="text-center space-y-6">
          {/* Neural network node decoration */}
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-violet-400 rounded-full animate-node-glow" />
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-node-glow" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-violet-300 rounded-full animate-node-glow" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-node-glow" style={{ animationDelay: '1.5s' }} />
          <div className="relative">
            <div className="w-20 h-20 border-4 border-violet-300/50 rounded-full animate-spin border-t-violet-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-8 h-8 text-violet-500 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-code font-bold gradient-text-ai">Gourav.dev</h2>
            <div className="flex items-center justify-center space-x-1 font-code text-xs text-violet-400">
              <span>model</span>
              <span className="text-cyan-400">.</span>
              <span>load</span>
              <span className="text-cyan-400">()</span>
              <span className="inline-block w-2 h-4 bg-violet-400 animate-cursor-blink ml-0.5" />
            </div>
            <p className="text-muted-foreground animate-fade-in text-sm">Initializing neural network...</p>
          </div>
        </div>
      </div>
    )
  }

  const projects = [
    {
      title: "LUMEN AI",
      description:
        "Enterprise financial intelligence platform with multi-agentic RAG and GCP services for real-time financial analysis",
      longDescription:
        "Created a multi-agentic financial intelligence platform integrating RAG (Retrieval-Augmented Generation) and GCP services to process unstructured financial documents into structured insights. Designed secure pipelines for real-time financial data analysis, enabling proactive risk detection and automated decision support. The system improved financial insight turnaround by 60%, serving as a prototype for enterprise AI infrastructure.",
      technologies: ["LangChain", "RAG", "GCP", "FastAPI", "Python", "Vertex AI", "BigQuery", "Vector DB"],
      features: [
        "Multi-Agent RAG",
        "GCP Integration",
        "Real-time Analysis",
        "Risk Detection",
        "Automated Reports",
        "60% Faster Insights",
      ],
      icon: <Brain className="w-6 h-6" />,
      metrics: { improvement: "60%", pipeline: "Real-time", architecture: "Multi-Agent" },
      github: "https://github.com/RazzGourav/LUMEN-AI",
      demo: "#",
    },
    {
      title: "Mine-Sigma",
      description:
        "AI-powered satellite mining intelligence system for detecting illegal mining activities with 98% accuracy",
      longDescription:
        "Built an AI-powered satellite mining intelligence system for detecting and analyzing illegal mining activities using multi-spectral satellite imagery. Implemented deep learning models for mining vs. non-mining classification, NDVI analysis, and 3D volumetric mapping with DEM data. Achieved 98% detection accuracy and automated compliance reporting with geospatial visualization dashboards.",
      technologies: ["Python", "TensorFlow", "OpenCV", "GeoPandas", "OpenEO", "Plotly", "Deep Learning", "DEM"],
      features: [
        "Satellite Imagery",
        "98% Accuracy",
        "NDVI Analysis",
        "3D Volumetric Mapping",
        "Compliance Reports",
        "Geospatial Dashboards",
      ],
      icon: <Shield className="w-6 h-6" />,
      metrics: { accuracy: "98%", type: "Deep Learning", data: "Multi-spectral" },
      github: "https://github.com/RazzGourav/Mine-Sigma",
      demo: "#",
    },
    {
      title: "Pollu-Stake",
      description:
        "Decentralized environmental compliance DApp with LSTM forecasting and smart contract staking/slashing",
      longDescription:
        "Developed a decentralized environmental compliance platform simulating factories with air-quality sensors and an LSTM-based forecaster to predict pollution threshold breaches. Integrated smart contract staking and slashing logic on a blockchain backend, automating fund deductions for non-compliance. Built a Next.js admin dashboard to visualize live forecasts, treasury balances, and emission histories, achieving a real-time alert accuracy of 92%.",
      technologies: ["Next.js", "Solidity", "LSTM", "Python", "Hardhat", "Ethereum", "Web3.js", "TensorFlow"],
      features: [
        "LSTM Forecasting",
        "Smart Contracts",
        "92% Alert Accuracy",
        "Live Dashboard",
        "Staking/Slashing",
        "Emission Tracking",
      ],
      icon: <Activity className="w-6 h-6" />,
      metrics: { alertAccuracy: "92%", stack: "Blockchain+AI", dashboard: "Real-time" },
      github: "https://github.com/RazzGourav/Pollu-Stake",
      demo: "#",
    },
    {
      title: "Creditcare AI",
      description:
        "ML model predicting customer credit default probability with XGBoost achieving AUC score of 0.94",
      longDescription:
        "Implemented a machine learning model to predict customer credit default probability using feature-engineered financial datasets. Optimized XGBoost classifiers through hyperparameter tuning, achieving an AUC score of 0.94. Enhanced model interpretability using SHAP values for feature importance visualization, supporting informed credit risk decisions.",
      technologies: ["Python", "XGBoost", "Scikit-learn", "SHAP", "Pandas", "NumPy", "Matplotlib"],
      features: [
        "XGBoost Classifier",
        "AUC 0.94",
        "SHAP Explainability",
        "Feature Engineering",
        "Hyperparameter Tuning",
        "Risk Assessment",
      ],
      icon: <Database className="w-6 h-6" />,
      metrics: { auc: "0.94", model: "XGBoost", explainability: "SHAP" },
      github: "https://github.com/RazzGourav/Creditcare-AI",
      demo: "#",
    },
    {
      title: "Matdata Mitr",
      description:
        "AI + Blockchain decentralized voting system with facial recognition and Aadhar-based voter verification",
      longDescription:
        "Developed an AI + Blockchain-powered decentralized voting system integrating facial recognition and Aadhar-based voter verification to ensure election transparency and security. Designed smart contracts for vote immutability on Ethereum, achieved real-time verification using OpenCV, and built an interactive React frontend for seamless voter interaction.",
      technologies: ["React", "Ethereum", "Solidity", "OpenCV", "Python", "Node.js", "Web3.js", "MongoDB"],
      features: [
        "Facial Recognition",
        "Aadhar Verification",
        "Smart Contracts",
        "Vote Immutability",
        "Real-time Verification",
        "Interactive Frontend",
      ],
      icon: <Shield className="w-6 h-6" />,
      metrics: { security: "Blockchain", verification: "Real-time", platform: "Ethereum" },
      github: "https://github.com/RazzGourav/matdata-mitra",
      demo: "#",
    },
  ]

  const skillCategories = {
    "Languages": [
      { name: "Python", level: 92, description: "ML, deep learning, automation, web APIs, and data analysis" },
      { name: "C/C++", level: 85, description: "Data structures, algorithms, and system programming" },
      { name: "JavaScript", level: 88, description: "Full-stack web development and modern ES6+ features" },
      { name: "TypeScript", level: 85, description: "Type-safe development with React and Next.js" },
    ],
    "ML & AI": [
      { name: "Deep Learning / PyTorch / TensorFlow", level: 90, description: "Neural networks, CNNs, model training and deployment" },
      { name: "LangChain / RAG / Vector DB", level: 88, description: "Retrieval-augmented generation, embeddings, and agentic AI" },
      { name: "Scikit-learn / XGBoost / SHAP", level: 87, description: "Traditional ML, ensemble methods, and explainability" },
      { name: "OpenCV / YOLO / Hugging Face", level: 85, description: "Computer vision, object detection, and transformers" },
      { name: "Keras / LSTM / Transformers", level: 84, description: "Sequence models, time-series, and NLP" },
      { name: "Generative AI / MLOps", level: 82, description: "Generative models, model lifecycle, and deployment pipelines" },
    ],
    "Web & APIs": [
      { name: "FastAPI / Flask", level: 90, description: "High-performance Python web APIs and microservices" },
      { name: "React / Next.js", level: 88, description: "Modern frontend with SSR/SSG and component architecture" },
      { name: "Node.js / RESTful APIs", level: 85, description: "Server-side JavaScript and API design" },
    ],
    "Cloud & MLOps": [
      { name: "GCP (Vertex AI, BigQuery, Cloud Functions)", level: 86, description: "Google Cloud AI/ML services and serverless compute" },
      { name: "Docker / CI/CD / Git", level: 84, description: "Containerization, pipelines, and version control" },
    ],
    "Data & Visualization": [
      { name: "Pandas / NumPy / Matplotlib", level: 90, description: "Data manipulation, numerical computing, and plotting" },
      { name: "GeoPandas / OpenEO / Plotly", level: 82, description: "Geospatial analysis and interactive visualization" },
    ],
    "Blockchain": [
      { name: "Ethereum / Solidity / Hardhat", level: 80, description: "Smart contract development and DApp creation" },
      { name: "Web3.js", level: 78, description: "Blockchain frontend integration" },
    ],
    "Databases": [
      { name: "MongoDB / Firebase", level: 85, description: "NoSQL databases and real-time data" },
      { name: "PostgreSQL / MySQL", level: 82, description: "Relational database design and optimization" },
    ],
  }

  const certifications = [
    {
      name: "Google Cloud Skills",
      issuer: "Google Developers Group",
      year: "2025",
      description: "Google Cloud platform services and cloud-native development",
      credentialId: "GCP-2025",
    },
    {
      name: "AI & ML Fundamentals",
      issuer: "AICTE",
      year: "2025",
      description: "AI and Machine Learning fundamentals curriculum by All India Council for Technical Education",
      credentialId: "AICTE-AIML-2025",
    },
    {
      name: "Data Science - AI & ML",
      issuer: "Coding Spoon",
      year: "2025",
      description: "Artificial Intelligence and Machine Learning specialization",
      credentialId: "DS-AIML-2025",
    },
    {
      name: "Software Developer Simulation",
      issuer: "Hewlett Packard Enterprise",
      year: "2024",
      description: "Enterprise software development simulation and RESTful services",
      credentialId: "HPE-SDS-2024",
    },
    {
      name: "Postman API Fundamentals Student Expert",
      issuer: "Postman",
      year: "2024",
      description: "API testing, documentation, and automation",
      credentialId: "API-FUND-2024",
    },
    {
      name: "Full-Stack Development",
      issuer: "DevTown",
      year: "2024",
      description: "Complete web development stack mastery",
      credentialId: "FULLSTACK-2024",
    },
    {
      name: "AI Builders Lab",
      issuer: "Hack2Skill",
      year: "2024",
      description: "Building AI-powered applications and systems",
      credentialId: "AIB-2024",
    },
    {
      name: "Azure Fundamentals",
      issuer: "Microsoft",
      year: "2023",
      description: "Cloud computing fundamentals and Azure services",
      credentialId: "AZ-900",
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
      category: "College Hackathon",
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
      description: "Our paper, 'Blockchain-based Voter Identity and Voting System,' explores how decentralized tech can revolutionize election security, transparency, and accessibility",
      image: "/Shaastrarth.jpg",
      date: "June 2025",
      impact: "Among 500+ paper",
    },
    {
      title: "Best Research Project",
      category: "Research Intern at India Space Academy",
      position: "Best Research Project",
      description: "During this immersive experience in Data-Driven Astronomy, I led the Supernova Cosmology Project, analyzing Hubble/JWST satellite data to probe cosmic expansion. Here are key insights from my work",
      image: "/ISA.png",
      date: "July 2025",
      impact: "Among 200 Research Project",
    },
  ]

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Enhanced Navigation with mobile menu */}
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-violet-200/30 dark:border-violet-800/30 z-50 animate-slide-down">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="font-serif font-bold text-xl gradient-text-ai">Gourav.dev</div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {["About", "Projects", "Experience", "Skills", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-sm font-code font-medium transition-all duration-200 hover:text-violet-500 relative ${
                      activeSection === item.toLowerCase() ? "text-violet-500" : "text-muted-foreground"
                    } ${activeSection === item.toLowerCase() ? "after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-violet-500 after:to-cyan-500 after:rounded-full" : ""}`}
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
                      className={`block px-3 py-2 text-base font-medium transition-colors hover:text-violet-500 w-full text-left ${
                        activeSection === item.toLowerCase() ? "text-violet-500" : "text-muted-foreground"
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

        {/* Hero Section — AI/ML Engineer Theme */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden neural-grid">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-background to-cyan-50 dark:from-violet-950/20 dark:via-background dark:to-cyan-950/20"></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-400/15 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-violet-300/10 rounded-full blur-2xl animate-tensor-pulse"></div>
            {/* Neural network floating nodes */}
            <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-violet-400 rounded-full animate-node-glow" />
            <div className="absolute top-[20%] right-[15%] w-1.5 h-1.5 bg-cyan-400 rounded-full animate-node-glow" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-[25%] left-[20%] w-2 h-2 bg-violet-300 rounded-full animate-node-glow" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[40%] right-[10%] w-1.5 h-1.5 bg-cyan-300 rounded-full animate-node-glow" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-[15%] right-[25%] w-2 h-2 bg-violet-400 rounded-full animate-node-glow" style={{ animationDelay: '1.5s' }} />
            <div className="absolute top-[60%] left-[8%] w-1 h-1 bg-cyan-400 rounded-full animate-node-glow" style={{ animationDelay: '2.5s' }} />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <Avatar className="w-32 h-32 mx-auto mb-8 ring-4 ring-violet-400/60 hover:ring-violet-400 transition-all duration-500 hover:scale-105 animate-scale-in shadow-lg shadow-violet-500/20">
              <AvatarImage src="/software-developer-headshot.png" alt="Gourav Kumar Ojha" />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-violet-600 to-cyan-500 text-white">GKO</AvatarFallback>
            </Avatar>

            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-4 gradient-text-ai">
              <span className="animate-typewriter">Gourav Kumar Ojha</span>
            </h1>

            <div className="font-code text-sm md:text-base text-muted-foreground mb-6 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <span className="text-violet-500">&gt;</span> <span className="text-cyan-600 dark:text-cyan-400">role</span> = <span className="text-violet-400">"ML Engineer"</span> | <span className="text-violet-400">"Applied AI"</span> | <span className="text-violet-400">"Full-Stack AI"</span>
            </div>

            <div
              className="flex flex-wrap justify-center gap-2 mb-6 animate-fade-in-up"
              style={{ animationDelay: "1.1s" }}
            >
              {["GCP", "RAG", "LangChain", "FastAPI", "PyTorch", "LLMs"].map((tag) => (
                <Badge key={tag} className="bg-violet-100/80 dark:bg-violet-900/40 border border-violet-300/50 dark:border-violet-600/50 text-violet-700 dark:text-violet-300 text-xs font-code hover:bg-violet-200/80 dark:hover:bg-violet-800/40 transition-colors">{tag}</Badge>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "1.3s" }}>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full border border-border">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-code text-xs">98% accuracy</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full border border-border">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <span className="font-code text-xs">H₀ ≈ Planck</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full border border-border">
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <span className="font-code text-xs">ISRO–IIRS</span>
              </div>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up"
              style={{ animationDelay: "1.5s" }}
            >
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="group bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30"
              >
                View My Work
                <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform animate-bounce" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-violet-500/50 text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-950/20 bg-transparent hover:scale-105 transition-all duration-300"
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
                className="text-muted-foreground hover:text-violet-500 transition-all duration-300 hover:scale-110 animate-bounce-social"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/gourav-kumar-ojha-13853b290"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-violet-500 transition-all duration-300 hover:scale-110 animate-bounce-social"
                style={{ animationDelay: "0.1s" }}
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:kumargouravojha@gmail.com"
                className="text-muted-foreground hover:text-violet-500 transition-all duration-300 hover:scale-110 animate-bounce-social"
                style={{ animationDelay: "0.2s" }}
              >
                <Mail className="w-6 h-6" />
              </a>
              <a
                href="tel:+916207001498"
                className="text-muted-foreground hover:text-violet-500 transition-all duration-300 hover:scale-110 animate-bounce-social"
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
          className={`py-20 bg-muted/30 dark:bg-muted/10 neural-grid transition-all duration-1000 ${visibleSections.has("about") ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-center mb-2 animate-slide-in-left">About Me</h2>
            <p className="text-center text-muted-foreground mb-12 font-code text-sm">// Building intelligent systems at scale</p>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Innovative Machine Learning Engineer skilled in building AI-driven, production-grade systems integrating ML, cloud, and automation. Proficient in GCP, FastAPI, LangChain, and RAG architectures, with hands-on experience in financial analytics, geospatial AI, and astrophysics research.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Passionate about creating scalable AI systems that drive actionable insights and societal impact. Currently pursuing B.Tech in Computer Science (AI) at Rungta College of Engineering and Technology, and co-founded an AI/ML-based defense technology startup incubated under the College Innovation and Incubation Cell.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 font-code text-xs"
                  >
                    ⚡ ML Engineer
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 font-code text-xs"
                  >
                    🧠 Applied AI
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 font-code text-xs"
                  >
                    ☁️ Cloud & MLOps
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 font-code text-xs"
                  >
                    🔗 Open Source
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 font-code text-xs"
                  >
                    ⛓️ Blockchain
                  </Badge>
                </div>
              </div>
              <div className="space-y-6 animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                        <MapPin className="w-6 h-6 text-violet-500 dark:text-violet-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p className="text-muted-foreground">Bhilai, Chhattisgarh, India</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                        <Calendar className="w-6 h-6 text-violet-500 dark:text-violet-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Current Status</h3>
                        <p className="text-muted-foreground">IIRS (ISRO) Research Collaborator</p>
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
            <h2 className="font-serif text-4xl font-bold text-center mb-4 animate-slide-in-left">Featured Projects</h2>
            <p className="text-center text-muted-foreground mb-12 font-code text-sm">// Production-grade AI systems & research</p>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card
                      className={`group card-glow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer animate-fade-in-up border-border/50 hover:border-violet-300/50 dark:hover:border-violet-600/50`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg group-hover:bg-violet-200 dark:group-hover:bg-violet-800/30 transition-colors">
                              {project.icon}
                            </div>
                            <CardTitle className="text-xl">{project.title}</CardTitle>
                          </div>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-violet-500 transition-colors" />
                        </div>
                        <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-2 text-center">
                            {Object.entries(project.metrics).map(([key, value]) => (
                              <div key={key} className="p-2 bg-muted rounded-lg">
                                <div className="text-sm font-semibold text-violet-500">{value}</div>
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
                                  className="text-xs border-violet-300 text-violet-400 dark:border-violet-700 dark:text-violet-300"
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
                        <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-lg">{project.icon}</div>
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
                              <div className="text-2xl font-bold text-violet-500">{value}</div>
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
                              className="border-violet-300 text-violet-400 dark:border-violet-700 dark:text-violet-300"
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
                            <Badge key={idx} className="bg-violet-600 hover:bg-violet-700">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-4 pt-4">
                        <Button asChild className="bg-violet-600 hover:bg-violet-700">
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
          className={`py-20 bg-muted/30 dark:bg-muted/10 neural-grid transition-all duration-1000 ${
            !isLoading && (visibleSections.has("experience") || visibleSections.size === 0)
              ? "animate-fade-in-up"
              : isLoading
                ? "opacity-0"
                : "opacity-100"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-center mb-2 animate-slide-in-left">Experience</h2>
            <p className="text-center text-muted-foreground mb-12 font-code text-sm">git log --oneline --graph</p>
            <div className="space-y-8">
              <Card className="animate-slide-in-right" style={{ animationDelay: "0.1s" }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Research Collaborator</CardTitle>
                      <CardDescription className="text-lg font-medium text-violet-500">
                        IIRS (ISRO)
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">Remote</p>
                    </div>
                    <Badge variant="secondary">Aug 2025 - Present</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 mt-1 text-violet-500 flex-shrink-0" />
                      <span>
                        Leading project on Martian Dust Storm (GDS 2016) analysis using MRO/MCS, Curiosity Rover (REMS/SAM), and Hubble data
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 mt-1 text-violet-500 flex-shrink-0" />
                      <span>
                        Developing a data pipeline to correlate water vapor distribution and dust opacity with storm activity
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Research Intern – Supernova Cosmology Project</CardTitle>
                      <CardDescription className="text-lg font-medium text-violet-500">
                        India Space Week
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">Remote</p>
                    </div>
                    <Badge variant="secondary">Jun 2025 - Jul 2025</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 mt-1 text-violet-500 flex-shrink-0" />
                      <span>
                        Analyzed Type Ia Supernovae datasets from Hubble and JWST to estimate the Hubble Constant (H₀ = 69.8 ± 1.2 km/s/Mpc)
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 mt-1 text-violet-500 flex-shrink-0" />
                      <span>
                        Compared results with Planck18 CMB data, refining ΛCDM models and exploring the H₀ tension
                      </span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 mt-1 text-violet-500 flex-shrink-0" />
                      <span>
                        Estimated the age of the Universe (~13.95 B years) and modeled cosmic expansion history
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Open Source Contributor</CardTitle>
                      <CardDescription className="text-lg font-medium text-violet-500">
                        GirlScript Summer of Code (GSSoC 2024)
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">Remote</p>
                    </div>
                    <Badge variant="secondary">Oct 2024 - Nov 2024</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <Users className="w-4 h-4 mt-1 text-violet-500 flex-shrink-0" />
                      <span>Enhanced project functionality and implemented ML-backed modules across open-source repositories</span>
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
                      <CardDescription className="text-lg font-medium text-violet-500">
                        Computer Science (AI) • GPA: 7.8/10
                      </CardDescription>
                      <p className="text-muted-foreground mt-1">
                        Rungta College of Engineering and Technology, Bhilai, C.G.
                      </p>
                    </div>
                    <Badge variant="secondary">Aug 2023 - Present</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Co-founded an AI/ML-based defense technology startup incubated under the College Innovation and Incubation Cell, focusing on developing intelligent defense and surveillance solutions. Coursework includes machine learning, deep learning, data structures, algorithms, and AI ethics.
                  </p>
                </CardContent>
              </Card>

              <Card className="animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Higher Secondary</CardTitle>
                      <CardDescription className="text-lg font-medium text-violet-500">Science Stream • GPA: 7.3/10</CardDescription>
                      <p className="text-muted-foreground mt-1">Sunrise Dwarka Academy, Deoghar</p>
                    </div>
                    <Badge variant="secondary">Aug 2021 - Jul 2023</Badge>
                  </div>
                </CardHeader>
              </Card>

              <Card className="animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Secondary Education</CardTitle>
                      <CardDescription className="text-lg font-medium text-violet-500">CBSE Board • GPA: 9.7/10</CardDescription>
                      <p className="text-muted-foreground mt-1">St. Xavier's High School, Deoghar</p>
                    </div>
                    <Badge variant="secondary">Mar 2013 - May 2021</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Won multiple district-level competitions in science exhibitions and debates, showcasing early innovation and communication excellence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Skills Section with AI-themed progress indicators */}
        <section
          id="skills"
          className={`py-20 bg-muted/30 dark:bg-muted/10 neural-grid transition-all duration-1000 ${
            !isLoading && (visibleSections.has("skills") || visibleSections.size === 0)
              ? "animate-fade-in-up"
              : isLoading
                ? "opacity-0"
                : "opacity-100"
          }`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-center mb-2 animate-slide-in-left">Technical Skills</h2>
            <p className="text-center text-muted-foreground mb-12 font-code text-sm">import skills from &apos;./ml_stack&apos;</p>
            <div className="space-y-12">
              {Object.entries(skillCategories).map(([category, skills], categoryIndex) => (
                <div
                  key={category}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${categoryIndex * 0.2}s` }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-violet-500 animate-slide-in-left font-code">{`// ${category}`}</h3>
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
                        <div className="w-full bg-muted rounded-full h-2.5 mb-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full transition-all duration-1000 ease-out animate-progress-fill"
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
                      <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                        <Award className="w-6 h-6 text-violet-500 dark:text-violet-300" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{cert.name}</h3>
                        <p className="text-violet-500 font-medium">{cert.issuer}</p>
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
          className={`py-20 bg-gradient-to-br from-violet-50/50 to-cyan-50/50 dark:from-violet-950/20 dark:to-cyan-950/20 neural-grid transition-all duration-1000 ${visibleSections.has("achievements") ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-bold mb-2 animate-slide-in-left">Achievements & Recognition</h2>
              <p className="text-muted-foreground mb-4 font-code text-sm">model.evaluate(achievements)</p>
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
                  className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 card-glow border-border/50"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold gradient-text-ai mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground font-code">{stat.label}</div>
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
                        <Badge className="bg-violet-600 text-white font-semibold">{achievement.position}</Badge>
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
                          <div className="text-xs text-violet-500 font-medium mt-1">{achievement.impact}</div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed">{achievement.description}</p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-yellow-500" />
                          <span className="font-semibold text-violet-500">{achievement.position}</span>
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
              <Card className="inline-block p-8 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white shadow-xl shadow-violet-500/20">
                <h3 className="text-xl font-bold mb-2">Ready for New Challenges</h3>
                <p className="mb-4 opacity-90">Always looking for opportunities to compete and innovate</p>
                <Button variant="secondary" className="bg-white text-violet-600 hover:bg-gray-100 font-code">
                  View All Projects
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Volunteering & Leadership Section */}
        <section
          id="volunteering"
          className={`py-20 transition-all duration-1000 ${visibleSections.has("volunteering") ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-center mb-12 animate-slide-in-left">Volunteering & Leadership</h2>
            <Card className="animate-slide-in-right" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">Student Ambassador</CardTitle>
                    <CardDescription className="text-lg font-medium text-violet-500">
                      LetsUpgrade
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">Sep 2024 - Nov 2024</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <Users className="w-4 h-4 mt-1 text-violet-500 flex-shrink-0" />
                    <span>
                      Acted as a company representative at 5 educational events, contributing to a 20% growth in new client engagements and a 25% increase in participant enrollment
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Users className="w-4 h-4 mt-1 text-violet-500 flex-shrink-0" />
                    <span>
                      Spearheaded outreach initiatives driving a 40% uplift in community interactions and a 30% rise in online engagement rates
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Users className="w-4 h-4 mt-1 text-violet-500 flex-shrink-0" />
                    <span>
                      Led a team of 15 volunteers in executing LetsUpgrade events that increased student engagement
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Users className="w-4 h-4 mt-1 text-violet-500 flex-shrink-0" />
                    <span>
                      Organized multiple community events, collaborating with student groups and local organizations to enhance campus-community relationships
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className={`py-20 bg-muted/30 dark:bg-muted/10 neural-grid transition-all duration-1000 ${
            !isLoading && (visibleSections.has("contact") || visibleSections.size === 0)
              ? "animate-fade-in-up"
              : isLoading
                ? "opacity-0"
                : "opacity-100"
          }`}
        >
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-serif text-4xl font-bold text-center mb-2 animate-slide-in-left">Get In Touch</h2>
            <p className="text-center text-muted-foreground mb-12 font-code text-sm">await connect(you, me)</p>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  I'm always interested in new opportunities and collaborations. Whether you have a project in mind or
                  just want to connect, feel free to reach out!
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-violet-500" />
                    <a
                      href="mailto:kumargouravojha@gmail.com"
                      className="text-muted-foreground hover:text-violet-500 transition-colors"
                    >
                      kumargouravojha@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-violet-500" />
                    <a
                      href="tel:+916207001498"
                      className="text-muted-foreground hover:text-violet-500 transition-colors"
                    >
                      +91 6207001498
                    </a>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button asChild className="bg-violet-600 hover:bg-violet-700">
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
                    <Button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 transition-all duration-300">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-border/50 animate-fade-in">
          <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
            <p className="font-code text-sm text-muted-foreground">
              <span className="text-violet-500">&lt;</span>Built with <span className="text-violet-400">Next.js</span> + <span className="text-cyan-500">AI</span> <span className="text-violet-500">/&gt;</span>
            </p>
            <p className="text-muted-foreground text-xs">© 2025 Gourav Kumar Ojha. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
