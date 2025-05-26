"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Loader2, Github, Linkedin, Twitter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function Contact() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Contact Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <Card className="h-full border-none shadow-lg bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-500 dark:text-cyan-400 mr-4">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</h4>
                      <p className="text-gray-900 dark:text-white">gouravojha777@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-500 dark:text-cyan-400 mr-4">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</h4>
                      <p className="text-gray-900 dark:text-white">+91 6207001498</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-500 dark:text-cyan-400 mr-4">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</h4>
                      <p className="text-gray-900 dark:text-white">Bhilai, Chhattisgarh, India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Connect With Me</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/RazzGourav"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/gourav-kumar-ojha-13853b290"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                    <a
                      href="https://twitter.com/RazzGourav"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Card className="h-full border-none shadow-lg bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Send Me a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="border-gray-300 dark:border-gray-600 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-cyan-500 dark:focus:ring-cyan-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Your Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="border-gray-300 dark:border-gray-600 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-cyan-500 dark:focus:ring-cyan-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can I help you?"
                      required
                      className="border-gray-300 dark:border-gray-600 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-cyan-500 dark:focus:ring-cyan-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      rows={6}
                      required
                      className="border-gray-300 dark:border-gray-600 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-cyan-500 dark:focus:ring-cyan-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
