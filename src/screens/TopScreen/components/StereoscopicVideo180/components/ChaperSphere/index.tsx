import { useEffect, useMemo } from "react";
import { EyeView } from "./components/EyeView"
import { ThreeElement } from "@react-three/fiber";
import { Object3D } from "three";

interface Props extends ThreeElement<typeof Object3D> {
  src: string;
  playing: boolean;
  onEnded: () => void;
}

export const ChaperSphere = ({ src, playing, onEnded, ...props }: Props) => {
  const video = useMemo(() => {
    const vid = document.createElement("video");
    vid.src = src;
    vid.currentTime = 0;
    vid.loop = false;
    vid.muted = false;
    vid.crossOrigin = 'anonymous';
    vid.playsInline = true;
    vid.onended = onEnded;
    return vid;
  }, [src])

  useEffect(() => {
    if (playing) {
      video.play();
    } else {
      video.pause();
    }
  }, [playing])

  useEffect(() => {
    return () => {
      video.pause();
    };
  }, []);

  return (
    <group {...props}>
      <EyeView video={video} eye="left" />
      <EyeView video={video} eye="right" />
    </group>
  )
}