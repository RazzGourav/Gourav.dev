"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

/**
 * ParticleUniverse — an ambient deep-space particle field
 * that persists throughout the page. Responds to scroll progress.
 */
interface ParticleUniverseProps {
  scrollProgress: number
  tier: "high" | "medium" | "low"
}

export function ParticleUniverse({ scrollProgress, tier }: ParticleUniverseProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const count = tier === "high" ? 2000 : tier === "medium" ? 1000 : 400

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const sz = new Float32Array(count)

    const violet = new THREE.Color("#8b5cf6")
    const cyan = new THREE.Color("#06b6d4")
    const white = new THREE.Color("#e0e7ff")

    for (let i = 0; i < count; i++) {
      // Distribute in a large box
      pos[i * 3] = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60

      // Random color from palette
      const r = Math.random()
      const c = r < 0.4 ? violet : r < 0.7 ? cyan : white
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b

      sz[i] = Math.random() * 3 + 0.5
    }

    return { positions: pos, colors: col, sizes: sz }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    // Slow rotation that shifts with scroll
    pointsRef.current.rotation.y = t * 0.01 + scrollProgress * 0.5
    pointsRef.current.rotation.x = Math.sin(t * 0.005) * 0.1
    // Subtle z-drift with scroll
    pointsRef.current.position.z = -scrollProgress * 5
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]}
          attach="attributes-position"
        />
        <bufferAttribute args={[colors, 3]}
          attach="attributes-color"
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
