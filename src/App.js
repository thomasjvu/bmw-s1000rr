import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, MeshTransmissionMaterial, ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { easing } from 'maath'
import { useStore } from './store'

export default function App() {
  return (
    <Canvas eventSource={document.getElementById('root')} eventPrefix="client" camera={{ position: [0, 0, 75], fov: 40 }}>
      <ambientLight intensity={0.7} />
      <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, -5]} castShadow />
      <Environment preset="city" background blur={1} />
      <ContactShadows resolution={512} position={[0, -0.8, 0]} opacity={1} scale={10} blur={2} far={0.8} />
      <Selector>
        <Model rotation={[0, 0, 0]} />
      </Selector>
      <OrbitControls enableDamping rotateSpeed={1.1} enableZoom={false} />
    </Canvas>
  )
}

function Selector({ children }) {
  const ref = useRef()
  const store = useStore()
  useFrame(({ viewport, camera, pointer }, delta) => {
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 3])
    easing.damp3(ref.current.position, [(pointer.x * width) / 2, (pointer.y * height) / 2, 3], store.open ? 0 : 0.1, delta)
    easing.damp3(ref.current.scale, store.open ? 4 : 0.01, store.open ? 0.5 : 0.2, delta)
    easing.dampC(ref.current.material.color, store.open ? '#E7222E' : '#16588E', 0.1, delta)
  })
  return (
    <>
      <mesh ref={ref}>
        <circleGeometry args={[1, 64, 64]} />
        <MeshTransmissionMaterial samples={16} resolution={512} anisotropy={1} thickness={0.1} roughness={0.4} toneMapped={true} />
      </mesh>
      <group
        onPointerOver={() => (store.open = true)}
        onPointerOut={() => (store.open = false)}
        onPointerDown={() => (store.open = true)}
        onPointerUp={() => (store.open = false)}>
        {children}
      </group>
    </>
  )
}

export function Model(props) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/bmw_rr_1000.glb')
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.set(0, Math.sin(t / 4), 0)
    ref.current.position.y = (0.5 + Math.cos(t / 2)) / 7
  })
  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Object_2.geometry} material={materials.phong1SG} />
        <mesh castShadow receiveShadow geometry={nodes.Object_8.geometry} material={materials.phong1SG} />
        <mesh castShadow receiveShadow geometry={nodes.Object_3.geometry} material={materials.blinn7SG} />
        <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials.blinn7SG} />
        <mesh castShadow receiveShadow geometry={nodes.Object_5.geometry} material={materials.lambert6SG} />
        <mesh castShadow receiveShadow geometry={nodes.Object_6.geometry} material={materials.lambert6SG} />
        <mesh castShadow receiveShadow geometry={nodes.Object_7.geometry} material={materials.lambert6SG} />
      </group>
    </group>
  )
}

useGLTF.preload('/bmw_rr_1000.glb')
