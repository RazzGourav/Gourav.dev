"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ParticleGalaxyProps {
  count?: number
  radius?: number
  branches?: number
  spin?: number
  randomness?: number
  randomnessPower?: number
  colorInside?: string
  colorOutside?: string
}

export default function ParticleGalaxy({
  count = 3000,
  radius = 5,
  branches = 5,
  spin = 1,
  randomness = 0.5,
  randomnessPower = 3,
  colorInside = "#a78bfa",
  colorOutside = "#06b6d4",
}: ParticleGalaxyProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const insideColor = new THREE.Color(colorInside)
    const outsideColor = new THREE.Color(colorOutside)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r = Math.random() * radius
      const branchAngle = ((i % branches) / branches) * Math.PI * 2
      const spinAngle = r * spin

      const randomX =
        Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r
      const randomY =
        Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r * 0.5
      const randomZ =
        Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX
      positions[i3 + 1] = randomY
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ

      const mixedColor = insideColor.clone()
      mixedColor.lerp(outsideColor, r / radius)
      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b

      sizes[i] = Math.random() * 3 + 0.5
    }
    return { positions, colors, sizes }
  }, [count, radius, branches, spin, randomness, randomnessPower, colorInside, colorOutside])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  const vertexShader = `
    attribute float aSize;
    varying vec3 vColor;
    uniform float uTime;
    
    void main() {
      vColor = color;
      vec3 pos = position;
      
      // Subtle wave animation
      float wave = sin(pos.x * 2.0 + uTime * 0.5) * 0.05;
      pos.y += wave;
      
      vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      
      gl_Position = projectedPosition;
      gl_PointSize = aSize * (200.0 / -viewPosition.z);
      gl_PointSize = max(gl_PointSize, 1.0);
    }
  `

  const fragmentShader = `
    varying vec3 vColor;
    
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5));
      if (dist > 0.5) discard;
      
      float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
      alpha *= 0.8;
      
      // Add glow
      float glow = exp(-dist * 4.0) * 0.5;
      vec3 finalColor = vColor + glow;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  )

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
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
        <bufferAttribute args={[sizes, 1]}
          attach="attributes-aSize"
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  )
}
