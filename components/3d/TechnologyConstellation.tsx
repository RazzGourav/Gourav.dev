"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Text, OrbitControls } from "@react-three/drei"

/**
 * TechnologyConstellation — an interactive 3D graph of skills
 * with nodes as glowing spheres and edges as connecting lines.
 */
interface ConstellationProps {
  skills: { name: string; category: string }[]
  tier: "high" | "medium" | "low"
  radius?: number
}

const categoryColors: Record<string, string> = {
  Languages: "#a78bfa",
  "ML / AI": "#06b6d4",
  "Cloud & DevOps": "#818cf8",
  "Web & Databases": "#22d3ee",
  Blockchain: "#c084fc",
}

export function TechnologyConstellation({ skills, tier, radius }: ConstellationProps) {
  const groupRef = useRef<THREE.Group>(null)

  // Position nodes in 3D space — clustered by category
  const { nodes, edges } = useMemo(() => {
    const categoryOffsets: Record<string, THREE.Vector3> = {
      Languages: new THREE.Vector3(-3, 1.5, 0),
      "ML / AI": new THREE.Vector3(0, 0, -1),
      "Cloud & DevOps": new THREE.Vector3(3, 1, 0),
      "Web & Databases": new THREE.Vector3(2, -2, 1),
      Blockchain: new THREE.Vector3(-2.5, -2, 0.5),
    }

    const nodePositions = skills.map((skill, i) => {
      const offset = categoryOffsets[skill.category] || new THREE.Vector3(0, 0, 0)
      const categorySkills = skills.filter((s) => s.category === skill.category)
      const idx = categorySkills.indexOf(skill)
      const angle = (idx / categorySkills.length) * Math.PI * 2
      const baseRadius = radius || 0.8
      const nodeRadius = baseRadius + Math.random() * 0.6
      return {
        ...skill,
        position: new THREE.Vector3(
          offset.x + Math.cos(angle) * nodeRadius,
          offset.y + Math.sin(angle) * nodeRadius * 0.6,
          offset.z + (Math.random() - 0.5) * 1.5
        ),
        color: categoryColors[skill.category] || "#a78bfa",
      }
    })

    // Connect nodes within same category + some cross-category links
    const edgePositions: number[] = []
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].position.distanceTo(nodePositions[j].position)
        const sameCategory = nodePositions[i].category === nodePositions[j].category
        if ((sameCategory && dist < 2.2) || (!sameCategory && dist < 1.5 && Math.random() < 0.15)) {
          edgePositions.push(
            nodePositions[i].position.x, nodePositions[i].position.y, nodePositions[i].position.z,
            nodePositions[j].position.x, nodePositions[j].position.y, nodePositions[j].position.z
          )
        }
      }
    }

    return {
      nodes: nodePositions,
      edges: new Float32Array(edgePositions),
    }
  }, [skills, radius])

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.15
      groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.05
    }
  })

  const showLabels = tier !== "low"

  return (
    <group ref={groupRef}>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      {/* Edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position"
            args={[edges, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.1}
          linewidth={1}
        />
      </lineSegments>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <group key={i} position={node.position}>
          {/* Glow sphere */}
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.9}
            />
          </mesh>
          {/* Outer glow */}
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.15}
            />
          </mesh>
          {/* Label */}
          {showLabels && (
            <Text
              position={[0, 0.2, 0]}
              fontSize={0.1}
              color="#e0e7ff"
              anchorX="center"
              anchorY="bottom"
              maxWidth={2}
            >
              {node.name}
            </Text>
          )}
        </group>
      ))}
    </group>
  )
}
