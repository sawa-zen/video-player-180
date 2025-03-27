import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import { Chapter, StereoscopicVideo180  } from './components/StereoscopicVideo180'
import { useCallback, useEffect, useState } from 'react'
import './styles.css'

const store = createXRStore()

export const TopScreen = () => {
  const [vrEnabled, setVrEnabled] = useState(false)
  const [chapters, setChapters] = useState<Chapter[]>()

  const handleClickEnterVR = useCallback(() => {
    store.enterVR()
    setVrEnabled(true)
  }, [])

  useEffect(() => {
    fetch('/chapters.json')
      .then((response) => response.json())
      .then((data) => { setChapters(data) })
      .catch((error) => console.error(error))
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
            {chapters ? <StereoscopicVideo180 chapters={chapters} /> : null}
          </XR>
        </Canvas>
      </div>
    </div>
  )
}
