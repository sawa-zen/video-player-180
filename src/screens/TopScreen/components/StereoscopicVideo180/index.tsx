import { useCallback, useEffect, useState } from "react"
import { EyeView } from "./components/EyeView"
import { useFrame, useThree } from "@react-three/fiber";

interface Props {
  videoSrc: string;
}

export const StereoscopicVideo180 = ({ videoSrc }: Props) => {
  const { camera, gl } = useThree();
  const [playing, setPlaying] = useState(false)

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = videoSrc;
    vid.loop = true;
    vid.muted = false;
    vid.crossOrigin = 'anonymous';
    vid.setAttribute('playsinline', '');
    vid.setAttribute('webkit-playsinline', '');
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

  useFrame(() => {
    if (gl.xr.isPresenting) {
      camera.layers.disable(1);
      camera.layers.disable(2);
      const xrCamera = gl.xr.getCamera();
      if (xrCamera.cameras.length >= 2) {
        const [leftCam, rightCam] = xrCamera.cameras;

        leftCam.layers.disableAll();
        rightCam.layers.disableAll();

        // 左目はレイヤー1だけ有効化
        leftCam.layers.enable(1);

        // 右目はレイヤー2だけ有効化
        rightCam.layers.enable(2);
      }
    }
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
