import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'

function Box(props) {
  const mesh = useRef()
  return (
    <mesh {...props} ref = {mesh} >
      <planeGeometry args={props.args} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  )
}

function animate(maxBars, heights, colors, barThickness) {
  let boxes = []
  for (let i = -(maxBars/2); i < (maxBars/2); i++) {
    boxes.push(<Box position={[i*barThickness, 0, -5]} args={[barThickness, heights[i+maxBars/2], 10]} color={colors[i+maxBars/2]}/>)
  }

  return (
    <Canvas orthographic camera={{ zoom: 12, position: [30, 0, 100]}}>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 100]} />
      {boxes}
      <color attach="background" args={["#21172B"]} />
    </Canvas>
  )
}

export {animate}