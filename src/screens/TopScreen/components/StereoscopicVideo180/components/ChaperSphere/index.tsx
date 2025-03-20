import { useEffect, useMemo } from "react";
import { EyeView } from "./components/EyeView"
import { ThreeElement } from "@react-three/fiber";
import { Object3D } from "three";

export interface LoadedMetadataEvent {
  duration: number;
}

export interface ProgressEvent {
  currentTime: number;
}

interface Props extends ThreeElement<typeof Object3D> {
  src: string;
  playing: boolean;
  onLoadedMetadata: (event: LoadedMetadataEvent) => void;
  onProgress: (event: ProgressEvent) => void;
  onEnded: () => void;
}

export const ChaperSphere = ({ src, playing, onEnded, onLoadedMetadata, onProgress, ...props }: Props) => {
  const video = useMemo(() => {
    const vid = document.createElement("video");
    vid.src = src;
    vid.currentTime = 0;
    vid.loop = false;
    vid.muted = false;
    vid.crossOrigin = 'anonymous';
    vid.playsInline = true;
    vid.onended = onEnded;
    vid.onloadedmetadata = (e: Event) => {
      onLoadedMetadata({ duration: (e.currentTarget as HTMLVideoElement).duration });
    };
    vid.ontimeupdate = (e: Event) => {
      onProgress({ currentTime: (e.currentTarget as HTMLVideoElement).currentTime });
    };
    return vid;
  }, [src, onEnded, onLoadedMetadata, onProgress])

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