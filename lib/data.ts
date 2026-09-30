/* ═══════════════════════════════════════════════════════
   PORTFOLIO DATA — Single source of truth
   All content extracted from the existing portfolio.
   DO NOT invent or fabricate any data.
   ═══════════════════════════════════════════════════════ */

// ─── Types ───
export interface Publication {
  title: string
  journal: string
  status: string
  collaboration: string | null
}

export interface Experience {
  role: string
  company: string
  type: string
  period: string
  bullets: string[]
}

export interface Project {
  title: string
  tagline: string
  description: string
  technologies: string[]
  highlights: string[]
  github: string
  demo: string
  hasLive: boolean
  color: string
}

export interface SkillCategory {
  title: string
  skills: string[]
}

export interface Certification {
  name: string
  issuer: string
  detail: string
  year: string
}

export interface Achievement {
  title: string
  event: string
  description: string
  date: string
  position: string
  images: string[]
}

// ─── Personal Info ───
export const personalInfo = {
  name: "Gourav Kumar Ojha",
  roles: [
    "AI/ML Researcher",
    "Deep Learning Engineer",
    "Defence-Tech Co-Founder",
    "ISRO Collaborator",
    "Full-Stack AI Developer",
  ],
  email: "kumargouravojha@gmail.com",
  phone: "+91 6207001498",
  location: "Bhilai, CG, India",
  github: "https://github.com/RazzGourav",
  linkedin: "https://www.linkedin.com/in/gourav-kumar-ojha-13853b290",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/software-developer-headshot.jpeg",
  galleryImages: ["/1.jpeg", "/2.jpeg", "/3.jpeg", "/4.jpeg", "/5.jpeg"],
  statPills: [
    "2 Papers Under Review",
    "ISRO Collaborator",
    "3x Hackathon Winner",
    "Defence-Tech Co-Founder",
  ],
  aboutBio: [
    "I am an AI/ML Researcher and Deep Learning Engineer with publications under review at Elsevier journals. My research spans planetary science with ISRO, explainable AI for clinical decision support, and multi-modal deep learning systems.",
    "As co-founder of AstraTech, a defence-tech startup incubated at Rungta Business Incubation, I am building autonomous border intrusion detection systems fusing thermal, radar and seismic sensors with Edge AI.",
    "I combine rigorous research methodology with production-grade engineering — from 10TB+ scientific data pipelines to enterprise-ready AI platforms deployed on GCP.",
  ],
  education: {
    degree: "B.Tech in Computer Science & Engineering (AI)",
    institution: "Rungta College of Engineering & Technology",
    gpa: "7.8 / 10",
    period: "Aug 2023 – Present",
  },
} as const

// ─── Publications ───
export const publications: Publication[] = [
  {
    title:
      "Interannual Evolution of Martian Dust Activity at Gale Crater: A Multi-Instrument Analysis Using Curiosity Rover and MCS Observations (MY32–MY36)",
    journal: "Planetary and Space Science, Elsevier",
    status: "Under Review, 2026",
    collaboration: "Indian Institute of Remote Sensing (ISRO)",
  },
  {
    title:
      "SETU-DRISHTI: An Explainable Patient-Centric Clinical Decision Support Framework for Early Sepsis Risk Stratification Using Temporal Physiological Features",
    journal: "Elsevier",
    status: "Under Review, 2026",
    collaboration: null,
  },
]

// ─── Experience ───
export const experiences: Experience[] = [
  {
    role: "Research Collaborator – Planetary Science & Multi-Instrument Atmospheric Analysis",
    company: "Indian Institute of Remote Sensing (ISRO), Dehradun",
    type: "Remote",
    period: "Aug 2025 – May 2026",
    bullets: [
      "Designed and implemented a large-scale scientific data pipeline in Python correlating water vapor and dust opacity across multi-instrument datasets (MRO/MCS, Curiosity REMS/SAM, Hubble), processing 10TB+ of planetary observation data",
      "Applied ML and statistical modeling techniques for interannual atmospheric analysis and predictive modeling of Martian dust storm propagation across MY32–MY36",
    ],
  },
  {
    role: "Co-Founder & AI Engineer – AstraTech",
    company: "Rungta Business Incubation RIU, Bhilai",
    type: "Defence-Tech Startup | Team of 3",
    period: "Jan 2026 – Jul 2026",
    bullets: [
      "Building an autonomous border intrusion detection system fusing thermal (LWIR), mmWave radar, and seismic sensors with Edge AI for human vs. animal classification",
      "Design patent filed (Patent Pending) for hardware enclosure; currently in active product development phase",
    ],
  },
  {
    role: "Research Intern – Supernova Cosmology Project",
    company: "India Space Week",
    type: "Remote",
    period: "Jun 2025 – Jul 2025",
    bullets: [
      "Estimated Hubble Constant from JWST/HST Type Ia Supernovae data; published findings on Hubble tension",
      "Compared results with Planck18 CMB data, refining ΛCDM models and exploring the H₀ tension",
    ],
  },
  {
    role: "Open Source Contributor",
    company: "GirlScript Summer of Code (GSSoC 2024)",
    type: "Remote",
    period: "Oct 2024 – Nov 2024",
    bullets: [
      "ML modules across multiple repos; 15–20% performance improvements",
    ],
  },
]

// ─── Projects ───
export const projects: Project[] = [
  {
    title: "SetuDrishti",
    tagline: "AI-Powered Clinical Decision Support System",
    description:
      "Conducted original research on explainable AI for clinical decision support; designed and evaluated a multi-modal deep learning framework for early sepsis risk stratification using temporal physiological features and RAG-based EHR retrieval. Research submitted as paper to Elsevier (Under Review).",
    technologies: [
      "PyTorch",
      "HuggingFace",
      "LangChain",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "SHAP",
      "LIME",
    ],
    highlights: [
      "Elsevier Paper",
      "Explainable AI",
      "Multi-Modal DL",
      "RAG-based EHR",
    ],
    github: "#",
    demo: "https://setu-drishti-hpmu.vercel.app/",
    hasLive: true,
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "LUMEN AI",
    tagline: "Enterprise Financial Assistant",
    description:
      "Multi-agentic RAG platform on GCP (Vertex AI, BigQuery) transforming unstructured financial documents into actionable insights with automated risk detection. Improved financial insight turnaround by 60%.",
    technologies: [
      "Python",
      "LangChain",
      "FastAPI",
      "Vector DBs",
      "Docker",
      "CI/CD",
      "GCP",
      "BigQuery",
    ],
    highlights: [
      "60% Faster Insights",
      "Multi-Agent RAG",
      "GCP Integration",
      "Real-time Analysis",
    ],
    github: "https://github.com/RazzGourav/LUMEN-AI",
    demo: "#",
    hasLive: false,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Mine-Sigma",
    tagline: "Satellite Mining Intelligence System",
    description:
      "Developed and evaluated a CNN + YOLO deep learning system for large-scale illegal mining detection from multispectral satellite imagery; applied NDVI analysis and geospatial feature engineering to achieve 98% classification accuracy.",
    technologies: [
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "GeoPandas",
      "Plotly",
      "YOLO",
    ],
    highlights: [
      "98% Accuracy",
      "CNN + YOLO",
      "Satellite Imagery",
      "NDVI Analysis",
    ],
    github: "https://github.com/RazzGourav/Mine-Sigma",
    demo: "#",
    hasLive: false,
    color: "from-emerald-500 to-teal-600",
  },
  {
    title: "HireMind AI",
    tagline: "Enterprise Candidate Intelligence Platform",
    description:
      "Production-ready, highly optimized Candidate Intelligence Platform using Hybrid Semantic Retrieval (FAISS + Ontology Graph) combined with a deterministic Explainability Engine to eliminate black-box AI hiring decisions.",
    technologies: [
      "Python",
      "FAISS",
      "Docker",
      "Prometheus",
      "CI/CD",
      "Render IaC",
    ],
    highlights: [
      "Hybrid Retrieval",
      "Explainability Engine",
      "Production DevOps",
      "Prometheus Monitoring",
    ],
    github: "#",
    demo: "https://hire-mind-ai-nu.vercel.app/",
    hasLive: true,
    color: "from-amber-500 to-orange-600",
  },
]

// ─── Skills ───
export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "C/C++", "Java", "JavaScript", "TypeScript", "SQL", "R"],
  },
  {
    title: "ML / AI",
    skills: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Hugging Face",
      "LangChain",
      "NLP",
      "NLU",
      "Computer Vision",
      "Deep Learning",
      "Multi-Modal Learning",
      "Explainable AI",
      "Statistical Modeling",
      "Scientific Computing",
      "OpenCV",
      "YOLO",
      "SHAP",
      "LIME",
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      "GCP (Vertex AI, BigQuery, Cloud Functions)",
      "Docker",
      "CI/CD",
      "Git",
      "MLOps",
    ],
  },
  {
    title: "Web & Databases",
    skills: [
      "FastAPI",
      "Flask",
      "React",
      "Next.js",
      "PostgreSQL",
      "MongoDB",
      "Firebase",
      "Vector DBs",
    ],
  },
  {
    title: "Blockchain",
    skills: ["Solidity", "Ethereum", "Hardhat", "Web3.js"],
  },
]

// ─── Certifications ───
export const certifications: Certification[] = [
  {
    name: "Google Cloud Skills Boost",
    issuer: "Google",
    detail: "GCP Fundamentals & Applied ML",
    year: "2025",
  },
  {
    name: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    detail: "AZ-900",
    year: "2023",
  },
  {
    name: "AI & ML Fundamentals",
    issuer: "AICTE",
    detail: "All India Council for Technical Education",
    year: "2025",
  },
  {
    name: "Postman API Expert",
    issuer: "Postman",
    detail: "API Fundamentals Student Expert",
    year: "2024",
  },
  {
    name: "Research Intern – Supernova Cosmology",
    issuer: "India Space Week",
    detail:
      "Estimated Hubble Constant from JWST/HST Type Ia Supernovae data",
    year: "Jun–Jul 2025",
  },
  {
    name: "Open Source Contributor",
    issuer: "GSSoC 2024",
    detail: "ML modules across multiple repos; 15–20% perf improvements",
    year: "Oct–Nov 2024",
  },
]

// ─── Achievements ───
export const achievements: Achievement[] = [
  {
    title: "1st Place – E-Summit Startup Competition",
    event: "Vyom Cultural Fest, RISU",
    description:
      "Won top prize pitching AstraTech in Shark Tank-style competition; awarded by Padma Shri Anand Kumar",
    date: "March 2026",
    position: "🥇 1st Place",
    images: ["/E-Summit.jpeg", "/E-Summit 2.jpeg"],
  },
  {
    title: "1st Place – Hack-Sprint Hackathon",
    event: "GDG on Campus RCET & Infinity Coders",
    description:
      "Led Team Alien X to build AI-powered Real-time Sepsis & Deterioration Monitoring System in a 12-hour sprint; integrated real-time patient vitals with ML-based alert systems",
    date: "March 2026",
    position: "🥇 1st Place",
    images: ["/hacksprint.jpeg", "/Hacksprint2.jpeg"],
  },
  {
    title: "3x Regional AI Hackathon Winner",
    event: "Various Regional Competitions",
    description:
      "Consistently placed among top teams in AI/ML hackathons across the region, demonstrating rapid prototyping and innovative solution design",
    date: "2024 – Present",
    position: "🏆 3x Winner",
    images: ["/Flashhack.jpg", "/Shaastrarth.jpg", "/ISA.png"],
  },
  {
    title: "Project Showcase Winner",
    event: "College Competition",
    description:
      "Won Best Innovation & Project award for Blockchain-based Voter ID & Decentralized Voting System",
    date: "August 2025",
    position: "🏆 Best Project",
    images: ["/Project.jpg"],
  },
]

// ─── Navigation ───
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const

// ─── All skills flattened (for constellation) ───
export const allSkills = skillCategories.flatMap((cat) =>
  cat.skills.map((skill) => ({ name: skill, category: cat.title }))
)
