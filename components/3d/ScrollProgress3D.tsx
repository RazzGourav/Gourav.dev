"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function ScrollProgress3D({ progress = 0 }: { progress: number }) {
  const ringRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const dotRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.z = -Math.PI / 2 // Start from top
    }
    if (dotRef.current) {
      // Position the dot along the ring based on progress
      const angle = -Math.PI / 2 + progress * Math.PI * 2
      dotRef.current.position.x = Math.cos(angle) * 0.8
      dotRef.current.position.y = Math.sin(angle) * 0.8
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(Date.now() * 0.003) * 0.05
      glowRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Background ring */}
      <mesh>
        <torusGeometry args={[0.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#1e1a33" transparent opacity={0.5} />
      </mesh>

      {/* Progress ring - uses a partial torus via material clipping */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.8, 0.035, 16, 100, progress * Math.PI * 2]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.9} />
      </mesh>

      {/* Progress dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#c084fc" />
      </mesh>

      {/* Center glow */}
      <mesh ref={glowRef}>
        <circleGeometry args={[0.15, 32]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.15} />
      </mesh>

      {/* Percentage text placeholder */}
      <mesh position={[0, 0, 0.01]}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}
