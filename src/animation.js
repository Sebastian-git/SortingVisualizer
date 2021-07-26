import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  return (
    <mesh {...props} ref = {mesh} >
      <planeGeometry args={props.args} />
      <meshStandardMaterial color="#CC20A5" />
    </mesh>
  )
}

export default function animation() {
  
  let boxes = []
  let maxBars = 36
  let maxHeight = 30;

  for (let i = -maxBars; i <= maxBars; i += 1.5) {
    boxes.push(<Box position={[i, 0, -5]} args={[1, Math.random() * maxHeight, 1]} />)
    console.log(i)
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
