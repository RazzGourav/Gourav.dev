"use client"

import { Canvas } from "@react-three/fiber"
import { Preload, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei"
import { Suspense, type ReactNode, useRef } from "react"
import { useInView } from "framer-motion"

interface Scene3DProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function Scene3D({ children, className = "", style }: Scene3DProps) {
  return (
    <div className={`w-full h-full ${className}`} style={style}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={0.6} />
          <pointLight position={[-10, -10, -5]} intensity={0.3} color="#8b5cf6" />
          {children}
          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  )
}
