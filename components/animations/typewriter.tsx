"use client"

import Typewriter from "typewriter-effect"

type TypewriterProps = {
  texts: string[]
  speed?: number
  loop?: boolean
  className?: string
}

export default function TypewriterComponent({ texts, speed = 50, loop = true, className = "" }: TypewriterProps) {
  return (
    <div className={className}>
      <Typewriter
        options={{
          strings: texts,
          autoStart: true,
          loop,
          delay: speed,
          deleteSpeed: 30,
          cursor: "|",
        }}
      />
    </div>
  )
}
