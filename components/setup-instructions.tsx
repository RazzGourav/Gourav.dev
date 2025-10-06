import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Terminal, Download, Play, Settings, CheckCircle } from "lucide-react"

export default function SetupInstructions() {
  const steps = [
    {
      title: "Download the Project",
      description: "Get the portfolio code from v0",
      icon: <Download className="w-5 h-5" />,
      commands: [
        "Click the three dots in the top right of the v0 interface",
        "Select 'Download ZIP' to get the complete project files",
        "Extract the ZIP file to your desired location",
      ],
    },
    {
      title: "Install Dependencies",
      description: "Set up the project with required packages",
      icon: <Terminal className="w-5 h-5" />,
      commands: ["cd gourav-portfolio", "npm install", "# or if you prefer yarn:", "yarn install"],
    },
    {
      title: "Install Fonts",
      description: "Add the custom fonts used in the design",
      icon: <Settings className="w-5 h-5" />,
      commands: [
        "npm install next/font",
        "# Fonts are automatically loaded from Google Fonts",
        "# Playfair Display and Source Sans Pro are configured in layout.tsx",
      ],
    },
    {
      title: "Run Development Server",
      description: "Start the local development environment",
      icon: <Play className="w-5 h-5" />,
      commands: ["npm run dev", "# or with yarn:", "yarn dev", "# Open http://localhost:3000 in your browser"],
    },
    {
      title: "Customize Content",
      description: "Update with your personal information",
      icon: <CheckCircle className="w-5 h-5" />,
      commands: [
        "Edit app/page.tsx to update personal information",
        "Replace /software-developer-headshot.png with your photo",
        "Update project links and descriptions",
        "Modify contact information and social links",
      ],
    },
  ]

  const dependencies = [
    { name: "Next.js", version: "15.x", description: "React framework with App Router" },
    { name: "React", version: "18.x", description: "UI library for building components" },
    { name: "TypeScript", version: "5.x", description: "Type-safe JavaScript development" },
    { name: "Tailwind CSS", version: "4.x", description: "Utility-first CSS framework" },
    { name: "Lucide React", version: "latest", description: "Beautiful icon library" },
    { name: "Radix UI", version: "latest", description: "Accessible component primitives" },
    { name: "next/font", version: "built-in", description: "Optimized font loading" },
  ]

  const features = [
    "🎨 Modern, responsive design with emerald color scheme",
    "⚡ Smooth animations and loading states",
    "🌙 Dark/light mode toggle",
    "📱 Mobile-responsive navigation with hamburger menu",
    "🎯 Intersection Observer for scroll-triggered animations",
    "💼 Interactive project modals with detailed information",
    "📊 Animated skill progress bars",
    "📧 Contact form with validation",
    "🔗 Social media integration",
    "♿ Accessibility features with ARIA labels",
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Portfolio Setup Guide
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Complete instructions to run Gourav's animated portfolio website locally
        </p>
      </div>

      {/* Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            Features Included
          </CardTitle>
          <CardDescription>This portfolio includes comprehensive animations and modern web features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Setup Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Setup Instructions</h2>
        <div className="grid gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">{step.icon}</div>
                  <div>
                    <CardTitle className="text-lg">
                      Step {index + 1}: {step.title}
                    </CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm space-y-1">
                  {step.commands.map((command, cmdIndex) => (
                    <div key={cmdIndex} className={command.startsWith("#") ? "text-muted-foreground" : ""}>
                      {command}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dependencies */}
      <Card>
        <CardHeader>
          <CardTitle>Dependencies & Technologies</CardTitle>
          <CardDescription>Key packages and technologies used in this portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {dependencies.map((dep, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-medium">{dep.name}</div>
                  <div className="text-sm text-muted-foreground">{dep.description}</div>
                </div>
                <Badge variant="outline">{dep.version}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Animation Details */}
      <Card>
        <CardHeader>
          <CardTitle>Animation Features</CardTitle>
          <CardDescription>Comprehensive animation system for enhanced user experience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Loading Animations</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Beautiful loading screen with spinning loader and bouncing dots
              </p>
              <div className="flex gap-2">
                <Badge variant="outline">Spinner Animation</Badge>
                <Badge variant="outline">Bouncing Dots</Badge>
                <Badge variant="outline">Fade Transitions</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Hero Section</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Typewriter effect for name, floating background elements, and staggered content reveal
              </p>
              <div className="flex gap-2">
                <Badge variant="outline">Typewriter Text</Badge>
                <Badge variant="outline">Floating Elements</Badge>
                <Badge variant="outline">Scale-in Avatar</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Scroll Animations</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Intersection Observer triggers animations as sections come into view
              </p>
              <div className="flex gap-2">
                <Badge variant="outline">Fade In Up</Badge>
                <Badge variant="outline">Slide In Left/Right</Badge>
                <Badge variant="outline">Staggered Delays</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Interactive Elements</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Hover effects, animated progress bars, and smooth transitions
              </p>
              <div className="flex gap-2">
                <Badge variant="outline">Hover Transforms</Badge>
                <Badge variant="outline">Progress Bars</Badge>
                <Badge variant="outline">Button Animations</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Start */}
      <Card className="border-emerald-200 dark:border-emerald-800">
        <CardHeader>
          <CardTitle className="text-emerald-600">Quick Start</CardTitle>
          <CardDescription>Get up and running in under 5 minutes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-4 font-mono text-sm space-y-1">
            <div># Download from v0 → Extract → Navigate to folder</div>
            <div>npm install</div>
            <div>npm run dev</div>
            <div className="text-emerald-600"># Open http://localhost:3000</div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 <strong>Pro Tip:</strong> The portfolio is fully responsive and includes accessibility features. Test
              it on different screen sizes and with keyboard navigation!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
