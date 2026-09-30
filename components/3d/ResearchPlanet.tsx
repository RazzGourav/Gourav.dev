"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

/**
 * ResearchPlanet — a Mars-like globe with orbiting data rings
 * for the Research section.
 */
interface ResearchPlanetProps {
  tier: "high" | "medium" | "low"
}

export function ResearchPlanet({ tier }: ResearchPlanetProps) {
  const groupRef = useRef<THREE.Group>(null)
  const planetRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)

  // Surface detail particles — simulate terrain features
  const surfaceData = useMemo(() => {
    const count = tier === "high" ? 500 : tier === "medium" ? 300 : 150
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const rust = new THREE.Color("#c2703a")
    const sand = new THREE.Color("#d4956b")
    const dark = new THREE.Color("#8b4513")

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.51 + Math.random() * 0.02
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const c = Math.random() < 0.5 ? rust : Math.random() < 0.5 ? sand : dark
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col, count }
  }, [tier])

  // Orbital ring data points
  const ringData = useMemo(() => {
    const count = tier === "high" ? 120 : 60
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const r = 2.3
      pos[i * 3] = Math.cos(angle) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.1
      pos[i * 3 + 2] = Math.sin(angle) * r
    }
    return { positions: pos, count }
  }, [tier])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06
    }
    if (atmosphereRef.current) {
      const mat = atmosphereRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.06 + Math.sin(t * 0.8) * 0.02
    }
  })

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Planet core */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshStandardMaterial
          color="#b85c38"
          roughness={0.9}
          metalness={0.1}
          emissive="#4a1a00"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.1}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#ff6b35"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Surface particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute args={[surfaceData.positions, 3]}
            attach="attributes-position"
          />
          <bufferAttribute args={[surfaceData.colors, 3]}
            attach="attributes-color"
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Orbital data ring 1 */}
      <group rotation={[Math.PI / 2 + 0.2, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.3, 0.004, 8, 120]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.4} />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute args={[ringData.positions, 3]}
              attach="attributes-position"
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.05}
            color="#22d3ee"
            transparent
            opacity={0.7}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>

      {/* Orbital data ring 2 */}
      <group rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[2.8, 0.003, 8, 100]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} />
        </mesh>
      </group>

      {/* Light source */}
      <pointLight position={[4, 3, 4]} intensity={1.5} color="#ffeedd" distance={15} />
      <ambientLight intensity={0.3} />
    </group>
  )
}
