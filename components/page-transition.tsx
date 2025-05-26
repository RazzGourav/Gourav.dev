"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function PageTransition() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading process
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={false}
      animate={loading ? "loading" : "loaded"}
      variants={{
        loading: { opacity: 1 },
        loaded: { opacity: 0, display: "none" },
      }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-white dark:bg-gray-900"
    >
      <div className="relative w-24 h-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 blur-xl opacity-50"
        ></motion.div>
        <motion.div
          className="relative w-full h-full flex items-center justify-center text-white font-bold text-xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#grad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset="220"
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0891b2" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <motion.div
              className="text-3xl bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent font-bold"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              G
            </motion.div>
          </div>
        </motion.div>
      </div>
      <motion.p
        className="mt-4 text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span className="inline-block">Loading</span>
        <motion.span
          className="inline-block"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          ...
        </motion.span>
      </motion.p>
    </motion.div>
  )
}
