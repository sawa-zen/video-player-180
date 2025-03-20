import { useEffect, useMemo } from "react";
import { EyeView } from "./components/EyeView"

interface Props {
  src: string;
  playing: boolean;
}

export const ChaperSphere = ({ src, playing }: Props) => {
  const video = useMemo(() => {
    const vid = document.createElement("video");
    vid.src = src;
    vid.currentTime = 0;
    vid.autoplay = false;
    vid.loop = true;
    vid.muted = false;
    vid.crossOrigin = 'anonymous';
    vid.playsInline = true;
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
    <group>
      <EyeView video={video} eye="left" />
      <EyeView video={video} eye="right" />
    </group>
  )
}