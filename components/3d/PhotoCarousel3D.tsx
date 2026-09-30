"use client"

import { useRef, useState, useMemo, Suspense } from "react"
import { useFrame, useThree, Canvas } from "@react-three/fiber"
import { Image } from "@react-three/drei"
import * as THREE from "three"

const photos = [
  "/1.jpeg",
  "/2.jpeg",
  "/3.jpeg",
  "/4.jpeg",
  "/5.jpeg"
]

function CarouselScene({ radius = 3.5 }: { radius?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  
  // Drag logic
  const isDragging = useRef(false)
  const previousMouse = useRef(0)
  const velocity = useRef(0)
  const { size } = useThree()

  const handlePointerDown = (e: any) => {
    isDragging.current = true
    previousMouse.current = e.clientX || 0
    document.body.style.cursor = "grabbing"
  }

  const handlePointerUp = () => {
    isDragging.current = false
    document.body.style.cursor = "auto"
  }

  const handlePointerMove = (e: any) => {
    if (isDragging.current && groupRef.current) {
      const currentMouse = e.clientX || 0
      const delta = (currentMouse - previousMouse.current) / size.width
      velocity.current = delta * 15 // Sensitivity multiplier
      previousMouse.current = currentMouse
    }
  }

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Apply velocity with friction
      if (!isDragging.current) {
        velocity.current *= 0.92 // Friction
        // Auto rotate slowly if not dragging and velocity is low
        if (Math.abs(velocity.current) < 0.005) {
            velocity.current = 0.005
        }
      }
      groupRef.current.rotation.y += velocity.current * (delta * 60)
    }
  })

  const count = photos.length

  return (
    <group 
      onPointerDown={handlePointerDown} 
      onPointerUp={handlePointerUp} 
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <group ref={groupRef} position={[0, -0.5, 0]}>
        {photos.map((url, i) => {
          // Distribute evenly in a circle
          const angle = (i / count) * Math.PI * 2
          const x = Math.sin(angle) * radius
          const z = Math.cos(angle) * radius
          
          const isHovered = hoveredIdx === i

          return (
            <group 
              key={i} 
              position={[x, 0, z]} 
              rotation={[0, angle, 0]}
            >
              <Image
                url={url}
                transparent
                side={THREE.DoubleSide}
                onPointerOver={(e) => {
                  e.stopPropagation()
                  setHoveredIdx(i)
                  document.body.style.cursor = "pointer"
                }}
                onPointerOut={(e) => {
                  setHoveredIdx(null)
                  document.body.style.cursor = isDragging.current ? "grabbing" : "auto"
                }}
                scale={isHovered ? [3.2, 4.3] : [2.8, 3.8]}
                position={[0, isHovered ? 0.2 : 0, 0]}
              />
              {/* Optional reflection/shadow plane under the image could go here */}
            </group>
          )
        })}
      </group>
    </group>
  )
}

export default function PhotoCarousel3D({ radius = 3.5 }: { radius?: number }) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <CarouselScene radius={radius} />
        </Suspense>
      </Canvas>
    </div>
  )
}
