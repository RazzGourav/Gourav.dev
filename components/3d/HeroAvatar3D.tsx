"use client"

import { useRef, useState } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"

export default function HeroAvatar3D() {
  const ringRef = useRef<THREE.Mesh>(null)
  const auraRef = useRef<THREE.Points>(null)
  const [hovered, setHovered] = useState(false)
  const texture = useLoader(THREE.TextureLoader, "/software-developer-headshot.jpeg")

  // Create aura particles
  const auraParticles = (() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const r = 1.2 + Math.random() * 0.8
      positions[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * 0.3
      positions[i * 3 + 1] = Math.sin(angle) * r + (Math.random() - 0.5) * 0.3
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5

      const color = new THREE.Color().lerpColors(
        new THREE.Color("#a78bfa"),
        new THREE.Color("#06b6d4"),
        Math.random()
      )
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors, count }
  })()

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
    if (auraRef.current) {
      auraRef.current.rotation.z = -state.clock.elapsedTime * 0.15
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03
      auraRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {/* Aura particles */}
        <points ref={auraRef}>
          <bufferGeometry>
            <bufferAttribute args={[auraParticles.positions, 3]}
              attach="attributes-position"
            />
            <bufferAttribute args={[auraParticles.colors, 3]}
              attach="attributes-color"
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.04}
            transparent
            opacity={0.6}
            vertexColors
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        {/* Rotating gradient ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[1.15, 0.03, 16, 100]} />
          <meshBasicMaterial
            color={hovered ? "#c084fc" : "#a78bfa"}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Second ring */}
        <mesh rotation={[0, 0, Math.PI / 3]}>
          <torusGeometry args={[1.2, 0.015, 16, 100]} />
          <meshBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Avatar circle */}
        <mesh>
          <circleGeometry args={[1, 64]} />
          <meshStandardMaterial
            map={texture}
            transparent
            roughness={0.2}
            metalness={0.05}
          />
        </mesh>

        {/* Glow behind avatar */}
        <mesh position={[0, 0, -0.1]}>
          <circleGeometry args={[1.3, 64]} />
          <meshBasicMaterial
            color="#7c3aed"
            transparent
            opacity={hovered ? 0.15 : 0.08}
          />
        </mesh>
      </group>
    </Float>
  )
}
