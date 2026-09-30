"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

/**
 * Neural Core — Advanced 3D neural network centerpiece for the Hero section
 * Features hundreds of connected nodes, cursor-reactive lighting, and environmental morphing
 */
interface NeuralCoreProps {
  mouse: { x: number; y: number }
  scrollProgress: number
  tier: "high" | "medium" | "low"
}

export function NeuralCore({ mouse, scrollProgress, tier }: NeuralCoreProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coreMeshRef = useRef<THREE.Mesh>(null)
  const connectionLinesRef = useRef<THREE.LineSegments>(null)
  const particleSystemRef = useRef<THREE.Points>(null)
  const glowMeshRef = useRef<THREE.Mesh>(null)

  // Environment-based properties
  const environmentPhase = useMemo(() => {
    if (scrollProgress < 0.15) return "deep_space"
    if (scrollProgress < 0.35) return "neural_network"
    if (scrollProgress < 0.55) return "ai_systems"
    if (scrollProgress < 0.75) return "research"
    return "mission_control"
  }, [scrollProgress])

  // Main neural network structure
  const nodes = useMemo(() => {
    const nodeCount = tier === "high" ? 200 : tier === "medium" ? 120 : 80
    const connectionThreshold = tier === "high" ? 2.2 : tier === "medium" ? 2.8 : 3.5

    // Generate neural nodes in 3D space
    const positions = new Float32Array(nodeCount * 3)
    const colors = new Float32Array(nodeCount * 3)
    const sizes = new Float32Array(nodeCount)

    // Core cluster (central brain)
    const coreNodes = Math.floor(nodeCount * 0.3)
    // Extension tendrils
    const tendrilNodes = nodeCount - coreNodes

    // Position core nodes in spherical cluster
    for (let i = 0; i < coreNodes; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const radius = 0.8 + Math.random() * 0.5

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Node colors: deep purple to electric cyan based on depth
      const depth = positions[i * 3 + 2] // Z coordinate for depth
      const colorRatio = (depth + 1.5) / 3.0 // Normalize to 0-1
      const r = 0.5 + colorRatio * 0.3 // Purple to cyan
      const g = 0.2 + colorRatio * 0.6
      const b = 0.8 - colorRatio * 0.2

      colors[i * 3] = r
      colors[i * 3 + 1] = g
      colors[i * 3 + 2] = b

      // Size based on node importance (more connections = larger)
      sizes[i] = 0.08 + Math.random() * 0.12
    }

    // Position tendril nodes extending outward
    for (let i = coreNodes; i < nodeCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const radius = 1.5 + Math.random() * 2.5 + (i - coreNodes) * 0.02

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Tendril nodes are cooler colors (more cyan/blue)
      const r = 0.2 + Math.random() * 0.3
      const g = 0.4 + Math.random() * 0.4
      const b = 0.6 + Math.random() * 0.4

      colors[i * 3] = r
      colors[i * 3 + 1] = g
      colors[i * 3 + 2] = b

      sizes[i] = 0.04 + Math.random() * 0.08
    }

    // Generate connections between nearby nodes
    const connectionPositions: number[] = []
    const maxConnections = tier === "high" ? 300 : tier === "medium" ? 180 : 100

    for (let i = 0; i < Math.min(nodeCount - 1, maxConnections * 2); i++) {
      for (let j = i + 1; j < Math.min(nodeCount, maxConnections * 2); j++) {
        if (connectionPositions.length >= maxConnections * 6) break

        const xi = positions[i * 3]
        const yi = positions[i * 3 + 1]
        const zi = positions[i * 3 + 2]
        const xj = positions[j * 3]
        const yj = positions[j * 3 + 1]
        const zj = positions[j * 3 + 2]

        const distance = Math.sqrt(
          Math.pow(xj - xi, 2) +
          Math.pow(yj - yi, 2) +
          Math.pow(zj - zi, 2)
        )

        if (distance < connectionThreshold) {
          connectionPositions.push(xi, yi, zi)
          connectionPositions.push(xj, yj, zj)
        }
      }
    }

    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
      sizes: new Float32Array(sizes),
      connectionPositions: new Float32Array(connectionPositions),
      nodeCount,
      connectionCount: connectionPositions.length / 6
    }
  }, [tier])

  // Cursor-reactive lighting
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const timeFactor = t * 0.1

    if (groupRef.current) {
      // Subtle rotation based on scroll progress and environment
      const baseRotation = scrollProgress * 0.5
      groupRef.current.rotation.y = baseRotation + Math.sin(timeFactor * 0.3) * 0.1
      groupRef.current.rotation.x = Math.sin(timeFactor * 0.2) * 0.05
      groupRef.current.rotation.z = Math.sin(timeFactor * 0.1) * 0.03

      // Environmental scaling
      let scale = 1.0
      switch (environmentPhase) {
        case "deep_space": scale = 0.8; break
        case "neural_network": scale = 1.0; break
        case "ai_systems": scale = 1.1; break
        case "research": scale = 0.9; break
        case "mission_control": scale = 0.7; break
      }
      groupRef.current.scale.set(scale, scale, scale)
    }

    // Cursor-reactive glow and lighting
    if (glowMeshRef.current) {
      // Glow intensity based on cursor distance from center
      const cursorDistance = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y)
      const glowIntensity = 0.3 + (1 - cursorDistance) * 0.4
      glowMeshRef.current.scale.set(
        1 + glowIntensity * 0.3,
        1 + glowIntensity * 0.3,
        1 + glowIntensity * 0.3
      )
      ;(glowMeshRef.current.material as THREE.Material).opacity = 0.1 + glowIntensity * 0.2
    }

    // Neural pulse effect
    if (coreMeshRef.current) {
      const pulse = 0.5 + Math.sin(t * 2 + scrollProgress * Math.PI) * 0.3
      coreMeshRef.current.scale.set(pulse, pulse, pulse)
      ;(coreMeshRef.current.material as THREE.Material).opacity = 0.2 + pulse * 0.3
    }

    // Connection line pulsing
    if (connectionLinesRef.current) {
      const pulseOpacity = 0.1 + Math.sin(t * 3) * 0.08
      ;(connectionLinesRef.current.material as THREE.Material).opacity = pulseOpacity

      // Color shift based on environment
      let colorShift = 0
      switch (environmentPhase) {
        case "deep_space": colorShift = 0; break
        case "neural_network": colorShift = 0.2; break
        case "ai_systems": colorShift = 0.4; break
        case "research": colorShift = 0.6; break
        case "mission_control": colorShift = 0.8; break
      }

      // Update connection colors based on environment
      const material = connectionLinesRef.current.material as THREE.LineBasicMaterial
      const baseColor = new THREE.Color(0x8b5cf6) // Violet
      const targetColor = new THREE.Color(0x06b6d4) // Cyan
      baseColor.lerp(targetColor, colorShift)
      material.color.copy(baseColor)
    }

    // Particle system movement
    if (particleSystemRef.current) {
      const particleMaterial = particleSystemRef.current.material as THREE.PointsMaterial
      particleMaterial.size = 0.02 + Math.sin(t * 0.5) * 0.01

      // Slow rotation of particle field
      particleSystemRef.current.rotation.y = t * 0.02
      particleSystemRef.current.rotation.x = Math.sin(t * 0.3) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Deep space background particles */}
      <points>
        <sphereGeometry args={[0.015, 8, 8]} />
        <bufferGeometry>
          <bufferAttribute args={[nodes.positions, 3]}
            attach="attributes-position"
          />
          <bufferAttribute args={[nodes.colors, 3]}
            attach="attributes-color"
          />
          <bufferAttribute args={[nodes.sizes, 1]}
            attach="attributes-size"
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Neural connections - animated lines */}
      <lineSegments ref={connectionLinesRef}>
        <bufferGeometry>
          <bufferAttribute args={[nodes.connectionPositions, 3]}
            attach="attributes-position"
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.15}
          linewidth={1}
        />
      </lineSegments>

      {/* Core neural mesh */}
      <mesh ref={coreMeshRef} scale={1.05}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color="#a78bfa"
          transparent
          opacity={0.2}
          wireframe
        />
      </mesh>

      {/* Environmental glow sphere */}
      <mesh ref={glowMeshRef} scale={2.5}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Inner core - the "digital brain" */}
      <mesh scale={0.8}>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#7c3aed"
          metalness={0.8}
          roughness={0.2}
          emissive="#4a00e0"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Environmental lighting that changes with scroll */}
      <pointLight
        position={[3, 3, 3]}
        color={environmentPhase === "neural_network" ? "#8b5cf6" :
               environmentPhase === "ai_systems" ? "#06b6d4" :
               environmentPhase === "research" ? "#ff6b35" :
               environmentPhase === "mission_control" ? "#ffffff" :
               "#ffffff"}
        intensity={0.5}
        distance={10}
        decay={2}
      />

      {/* Ambient environment light */}
      <ambientLight
        color={environmentPhase === "deep_space" ? "#2a003e" :
               environmentPhase === "neural_network" ? "#4a0060" :
               environmentPhase === "ai_systems" ? "#003340" :
               environmentPhase === "research" ? "#401a00" :
               environmentPhase === "mission_control" ? "#1a1a1a" :
               "#000000"}
        intensity={0.15}
      />
    </group>
  )
}
