import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'

function Box(props) {
  const mesh = useRef()
  return (
    <mesh {...props} ref = {mesh} >
      <planeGeometry args={props.args} />
      <meshStandardMaterial color="#CC20A5" />
    </mesh>
  )
}

export default function animate(maxBars, heights) {
  let boxes = []

  for (let i = -maxBars; i <= maxBars; i++) {
    boxes.push(<Box position={[i, 0, -5]} args={[1, heights[i+maxBars], 1]} />)
  }

  return (
    <Canvas orthographic camera={{ zoom: 10, position: [0, 0, 100]}}>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 100]} />
      {boxes}
      <color attach="background" args={["#281247"]} />
    </Canvas>
  )
}