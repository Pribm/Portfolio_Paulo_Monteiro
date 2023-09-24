import React, { Suspense, useContext } from 'react'
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {  Environment, useTexture, Float, Loader, useProgress, Html } from "@react-three/drei"
import { Physics, useSphere } from "@react-three/cannon"
import { EffectComposer, N8AO, SMAA } from "@react-three/postprocessing"
import ReactTexture from '../../assets/react_texture_ball.jpg'
import Context from '../../Context'

const rfs = THREE.MathUtils.randFloatSpread
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32)
const baubleMaterial = new THREE.MeshStandardMaterial({ color: "white", roughness: 0, envMapIntensity: 1 })

const repulsionForce = 0.1;


const ThreeDBackGround = () => {
  const [x,y,darkMode] = useContext(Context)

  return (
    <>
    <Canvas shadows gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 30 }}>
      <ambientLight intensity={darkMode ? 0 : 1} />
      
        <Float speed={1} rotationIntensity={10} floatIntensity={2} floatingRange={[-0.5, 0.5]}>
          <Physics gravity={[0, -0.01, 0]} iterations={30}>
            <Pointer />
              <Suspense fallback={<LoadTexture/>}>
                <Clump texture={ReactTexture}/>
              </Suspense>
          </Physics>
        </Float>
        <Environment preset='warehouse' />
      <EffectComposer disableNormalPass multisampling={0}>
        <N8AO halfRes color="black" aoRadius={2} intensity={1} aoSamples={6} denoiseSamples={4} />
        <SMAA />
      </EffectComposer>
    </Canvas>
    <Loader />
    </>
  )
}

function Clump({ mat = new THREE.Matrix4(), vec = new THREE.Vector3(), ...props }) {
  const [ref, api] = useSphere(() => ({ args: [1], mass: 5, angularDamping: 0.7, linearDamping: 0.65, position: [rfs(20), rfs(10), rfs(20)], rotation: [rfs(20), rfs(10), rfs(20)] }))
  const [positions, setPositions] = React.useState([])

  const texture = useTexture(props.texture)

  React.useEffect(() => {
    const initialPositions = []
    for (let i = 0; i < 30; i++) {
      initialPositions.push({ x: rfs(20), y: rfs(10), z: rfs(20) })
    }
    setPositions(initialPositions)
  }, [])

  useFrame((state) => {
    for (let i = 0; i < positions.length - 1; i++) {
      for (let j = 0; j < positions.length - 1; j++) {
        if (i !== j) {
          const distanceVector = new THREE.Vector3()
          distanceVector.copy(ref.current.position)
          distanceVector.subVectors(positions[j], positions[i])
          const distance = distanceVector.length()
          if (distance < 2) { 
            const force = distanceVector.normalize().multiplyScalar(repulsionForce)
            api.at(i).applyForce(force.toArray(), [0, 0, 0])
            // api.at(i).applyTorque(20)
          }
        }
      }
    }
  })
  
  return (
    <instancedMesh ref={ref} castShadow receiveShadow args={[sphereGeometry, baubleMaterial, 30]} material-map={texture}>
    </instancedMesh>
  )
}

function Pointer() {
  const viewport = useThree((state) => state.viewport)
  const [, api] = useSphere(() => ({ type: "Kinematic", args: [3], position: [0, 0, 0] }))
  return useFrame((state) => api.position.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0))
}

const LoadTexture = () => {
  const { progress } = useProgress()
  
  return <Html center style={{
    width: '100vw',
    height: '100vh',
    background: 'white',
    color: 'black'
  }}>{progress} % loaded </Html>
}

export default ThreeDBackGround