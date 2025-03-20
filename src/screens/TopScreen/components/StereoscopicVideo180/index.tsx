import { useCallback, useEffect, useState } from "react"
import { EyeView } from "./components/EyeView"
import { useFrame, useThree } from "@react-three/fiber";

interface Props {
  videoSrc: string;
}

export const StereoscopicVideo180 = ({ videoSrc }: Props) => {
  const { camera } = useThree();
  const [playing, setPlaying] = useState(false)

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = videoSrc;
    vid.loop = true;
    vid.muted = false;
    vid.crossOrigin = 'anonymous';
    vid.playsInline = true;
    return vid;
  })

  const handleClickGroup = useCallback(() => {
    if (playing) {
      video.pause()
      setPlaying(false)
    } else {
      video.play()
      setPlaying(true)
    }
  }, [video, playing])

  // 以下のバグのせいでこの useEffect が必要
  // https://github.com/pmndrs/xr/issues/398
  useFrame(() => {
    camera.layers.set(0)
  })

  useEffect(() => {
    return () => {
      video.pause();
      video.src = '';
      setPlaying(false);
    };
  }, [video]);

  if (!video) return null

  return (
    <>
      {/** 再生ボタン */}
      <mesh onClick={handleClickGroup} position={[0, 1, -1]}>
        <planeGeometry args={[0.2, 0.2, 1, 1]} />
        <meshBasicMaterial color={video.paused ? 'red' : 'green'} />
      </mesh>
      <group>
        <EyeView video={video} eye="left" />
        <EyeView video={video} eye="right" />
      </group>
    </>
  )
}
