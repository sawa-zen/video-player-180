import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import { StereoscopicVideo180  } from './components/StereoscopicVideo180'
import './styles.css'
import { useCallback, useState } from 'react'

const store = createXRStore()

const chapters = [
  'https://pub-840983ee6395495eb67c382a4ff6214f.r2.dev/chapter01.mp4',
  'https://pub-840983ee6395495eb67c382a4ff6214f.r2.dev/chapter02.mp4', // Added new chapter
  'https://pub-840983ee6395495eb67c382a4ff6214f.r2.dev/chapter03.mp4', // Added new chapter
]

export const TopScreen = () => {
  const [vrEnabled, setVrEnabled] = useState(false)

  const handleClickEnterVR = useCallback(() => {
    store.enterVR()
    setVrEnabled(true)
  }, [])

  return (
    <div id="root">
      <button
        className='enter-vr-button'
        onClick={handleClickEnterVR}
      >
        Enter VR
      </button>
      <div
        className='three-container'
        style={{ opacity: vrEnabled ? 1 : 0 }}
      >
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
          <XR store={store}>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <StereoscopicVideo180 chaptersSrc={chapters} />
          </XR>
        </Canvas>
      </div>
    </div>
  )
}
