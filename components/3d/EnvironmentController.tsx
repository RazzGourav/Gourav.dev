"use client"

import { useRef, useEffect, useState } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useScroll as useFramerScroll } from "framer-motion"
import { useDeviceCapability } from "@/lib/hooks"
import { ParticleUniverse } from "./ParticleUniverse"

/**
 * EnvironmentController — Manages the scroll-linked 3D environment transitions
 *
 * Scroll progression transforms the environment:
 * 0-20%: Neural Network Observatory
 * 20-40%: AI Systems & Research Laboratory
 * 40-60%: Planetary Science Visualization
 * 60-80%: Engineering & Project Showcase
 * 80-100%: Mission Control & Contact Hub
 */
export function EnvironmentController() {
  const { scrollYProgress } = useFramerScroll()
  const [scrollProgress, setScrollProgress] = useState(0)
  const tier = useDeviceCapability()

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setScrollProgress(v))
  }, [scrollYProgress])

  const { scene, camera } = useThree()
  const [environmentPhase, setEnvironmentPhase] = useState("neural")

  // Refs for environment objects
  const neuralGroup = useRef<THREE.Group>(null)
  const researchGroup = useRef<THREE.Group>(null)
  const engineeringGroup = useRef<THREE.Group>(null)
  const controlGroup = useRef<THREE.Group>(null)

  // Monitor scroll position for environment transitions
  useEffect(() => {
    const phase =
      scrollProgress < 0.2 ? "neural" :
      scrollProgress < 0.4 ? "research" :
      scrollProgress < 0.6 ? "planetary" :
      scrollProgress < 0.8 ? "engineering" :
      "control"

    if (phase !== environmentPhase) {
      setEnvironmentPhase(phase)
    }
  }, [scrollProgress, environmentPhase])

  // Smooth camera movement based on environment phase
  useFrame(() => {
    const targetPosition = new THREE.Vector3()
    const targetRotation = new THREE.Euler()

    switch (environmentPhase) {
      case "neural":
        targetPosition.set(0, 0, 8)
        targetRotation.set(0, 0, 0)
        break
      case "research":
        targetPosition.set(2, -1, 6)
        targetRotation.set(0.1, -0.2, 0)
        break
      case "planetary":
        targetPosition.set(-2, 1, 7)
        targetRotation.set(0.2, 0.3, 0)
        break
      case "engineering":
        targetPosition.set(1, 0, 5)
        targetRotation.set(0, -0.1, 0.1)
        break
      case "control":
        targetPosition.set(0, 0, 4)
        targetRotation.set(0.1, 0, 0)
        break
    }

    // Smooth interpolation
    camera.position.lerp(targetPosition, 0.05)
    camera.rotation.x += (targetRotation.x - camera.rotation.x) * 0.05
    camera.rotation.y += (targetRotation.y - camera.rotation.y) * 0.05
    camera.rotation.z += (targetRotation.z - camera.rotation.z) * 0.05

    // Update particle effects based on environment
    if (neuralGroup.current) {
      neuralGroup.current.visible = environmentPhase === "neural"
      neuralGroup.current.rotation.y += 0.002
    }
    if (researchGroup.current) {
      researchGroup.current.visible = environmentPhase === "research"
    }
  })

  return (
    <>
      {/* Global Particle Universe - always present */}
      <ParticleUniverse scrollProgress={scrollProgress} tier={tier} />

      {/* Neural Network Environment */}
      <group ref={neuralGroup} visible={environmentPhase === "neural"}>
        {/* Orbital rings around camera */}
        {[5, 6, 7].map((radius, i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, Math.PI * (i / 3)]}>
            <torusGeometry args={[radius, 0.001, 8, 120]} />
            <meshBasicMaterial
              color="#8b5cf6"
              transparent
              opacity={0.15 - i * 0.03}
            />
          </mesh>
        ))}

        {/* Distant neural connections */}
        {Array.from({ length: 50 }).map((_, i) => {
          const angle = (i / 50) * Math.PI * 2
          const x = Math.cos(angle) * 12
          const y = Math.sin(angle) * 8
          const z = Math.sin(i * 0.1) * 4
          return (
            <lineSegments key={i} position={[x, y, z]}>
              <bufferGeometry>
                <bufferAttribute args={[new Float32Array([
                    -0.5, 0, 0,
                    0.5, 0, 0
                  ]), 3]}
                  attach="attributes-position"
                />
              </bufferGeometry>
              <lineBasicMaterial
                color="#a78bfa"
                transparent
                opacity={0.1}
                linewidth={1}
              />
            </lineSegments>
          )
        })}
      </group>

      {/* Research Laboratory Environment */}
      <group ref={researchGroup} visible={environmentPhase === "research"}>
        {/* Scientific grid */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20, 20, 20]} />
          <meshBasicMaterial
            color="#06b6d4"
            wireframe
            transparent
            opacity={0.05}
          />
        </mesh>

        {/* Floating data points */}
        {Array.from({ length: 30 }).map((_, i) => (
          <points key={i} position={[
            (Math.random() - 0.5) * 15,
            Math.random() * 8,
            (Math.random() - 0.5) * 15
          ]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <pointsMaterial
              color={Math.random() > 0.5 ? "#06b6d4" : "#8b5cf6"}
              size={0.1}
              transparent
              opacity={0.6}
              sizeAttenuation
            />
          </points>
        ))}
      </group>

      {/* Ambient lighting that changes with environment */}
      <ambientLight
        color={environmentPhase === "neural" ? "#8b5cf6" :
               environmentPhase === "research" ? "#06b6d4" :
               environmentPhase === "planetary" ? "#ff6b35" :
               environmentPhase === "engineering" ? "#22d3ee" :
               "#ffffff"}
        intensity={0.2}
      />

      {/* Dynamic light that follows environment */}
      <pointLight
        position={[10, 10, 10]}
        color="#ffffff"
        intensity={environmentPhase === "control" ? 0.8 : 0.5}
        distance={20}
        decay={2}
      />
    </>
  )
}
