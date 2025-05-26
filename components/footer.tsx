import { Heart, Code } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2 text-xl font-bold">
              <Code className="h-5 w-5 text-cyan-500" />
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Gourav.dev
              </span>
            </div>
            <p className="text-gray-400 mt-1">Sophomore Software Developer</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center text-gray-400">
              <p></p>
              <Heart className="h-4 w-4 mx-1 text-red-500 animate-pulse" />
              <p></p>
            </div>
            <p className="text-gray-500 mt-1">&copy; {currentYear} Gourav Kumar Ojha. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
