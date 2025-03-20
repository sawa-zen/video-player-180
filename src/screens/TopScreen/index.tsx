import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import { StereoscopicVideo180  } from './components/StereoscopicVideo180'
import './styles.css'

const store = createXRStore()

const chapters = [
  'https://pub-840983ee6395495eb67c382a4ff6214f.r2.dev/chapter01.mp4',
  'https://pub-840983ee6395495eb67c382a4ff6214f.r2.dev/chapter02.mp4', // Added new chapter
  'https://pub-840983ee6395495eb67c382a4ff6214f.r2.dev/chapter03.mp4', // Added new chapter
]

export const TopScreen = () => {
  return (
    <div id="root">
      <button onClick={() => store.enterVR()}>Enter VR</button>
      <Canvas>
        <XR store={store}>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <StereoscopicVideo180 videoSrc={chapters[0]} />
        </XR>
      </Canvas>
    </div>
  )
}
