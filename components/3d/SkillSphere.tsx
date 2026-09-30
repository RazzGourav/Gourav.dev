"use client"

import { useRef, useMemo, useState, useCallback } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import * as THREE from "three"

interface SkillNodeProps {
  text: string
  position: [number, number, number]
  color: string
  index: number
}

function SkillNode({ text, position, color, index }: SkillNodeProps) {
  const textRef = useRef<any>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (textRef.current) {
      // Billboard: always face camera
      textRef.current.lookAt(state.camera.position)
      // Pulse on hover
      if (hovered) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.05
        textRef.current.scale.set(scale, scale, scale)
      }
    }
  })

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={hovered ? 0.18 : 0.14}
      color={hovered ? "#ffffff" : color}
      anchorX="center"
      anchorY="middle"

      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      outlineWidth={hovered ? 0.008 : 0}
      outlineColor={color}
    >
      {text}
    </Text>
  )
}

const allSkills = [
  // Languages
  { name: "Python", color: "#a78bfa" },
  { name: "C/C++", color: "#a78bfa" },
  { name: "Java", color: "#a78bfa" },
  { name: "JavaScript", color: "#a78bfa" },
  { name: "TypeScript", color: "#a78bfa" },
  { name: "SQL", color: "#a78bfa" },
  // ML/AI
  { name: "TensorFlow", color: "#c084fc" },
  { name: "PyTorch", color: "#c084fc" },
  { name: "Scikit-learn", color: "#c084fc" },
  { name: "Hugging Face", color: "#c084fc" },
  { name: "LangChain", color: "#c084fc" },
  { name: "NLP", color: "#c084fc" },
  { name: "Computer Vision", color: "#c084fc" },
  { name: "Deep Learning", color: "#c084fc" },
  { name: "OpenCV", color: "#c084fc" },
  { name: "YOLO", color: "#c084fc" },
  { name: "SHAP", color: "#c084fc" },
  // Cloud & DevOps
  { name: "GCP", color: "#22d3ee" },
  { name: "Docker", color: "#22d3ee" },
  { name: "CI/CD", color: "#22d3ee" },
  { name: "Git", color: "#22d3ee" },
  { name: "MLOps", color: "#22d3ee" },
  // Web & DBs
  { name: "FastAPI", color: "#2dd4bf" },
  { name: "React", color: "#2dd4bf" },
  { name: "Next.js", color: "#2dd4bf" },
  { name: "PostgreSQL", color: "#2dd4bf" },
  { name: "MongoDB", color: "#2dd4bf" },
  { name: "Firebase", color: "#2dd4bf" },
  // Blockchain
  { name: "Solidity", color: "#f59e0b" },
  { name: "Ethereum", color: "#f59e0b" },
  { name: "Web3.js", color: "#f59e0b" },
]

export default function SkillSphere({ radius = 2.5 }: { radius?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const isDragging = useRef(false)
  const previousMouse = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 0.002, y: 0.001 })

  // Fibonacci sphere distribution
  const skillPositions = useMemo(() => {
    const points: [number, number, number][] = []
    const n = allSkills.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < n; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n)

      const x = Math.sin(phi) * Math.cos(theta) * radius
      const y = Math.sin(phi) * Math.sin(theta) * radius
      const z = Math.cos(phi) * radius

      points.push([x, y, z])
    }
    return points
  }, [radius])

  const handlePointerDown = useCallback((e: any) => {
    isDragging.current = true
    previousMouse.current = { x: e.clientX || 0, y: e.clientY || 0 }
  }, [])

  const handlePointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handlePointerMove = useCallback((e: any) => {
    if (isDragging.current && groupRef.current) {
      const dx = ((e.clientX || 0) - previousMouse.current.x) * 0.005
      const dy = ((e.clientY || 0) - previousMouse.current.y) * 0.005
      velocity.current = { x: dx, y: dy }
      previousMouse.current = { x: e.clientX || 0, y: e.clientY || 0 }
    }
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      // Apply velocity with damping
      if (!isDragging.current) {
        velocity.current.x *= 0.99
        velocity.current.y *= 0.99
        // Minimum auto-rotation
        if (Math.abs(velocity.current.x) < 0.001) velocity.current.x = 0.002
      }
      groupRef.current.rotation.y += velocity.current.x
      groupRef.current.rotation.x += velocity.current.y
    }
  })

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {/* Wireframe sphere guide */}
      <mesh>
        <sphereGeometry args={[radius - 0.05, 32, 32]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>

      {/* Skill nodes */}
      {allSkills.map((skill, i) => (
        <SkillNode
          key={skill.name}
          text={skill.name}
          position={skillPositions[i]}
          color={skill.color}
          index={i}
        />
      ))}

      {/* Center glow */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.08} />
      </mesh>
    </group>
  )
}
