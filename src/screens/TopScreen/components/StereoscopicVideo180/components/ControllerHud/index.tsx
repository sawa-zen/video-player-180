import { ThreeElement } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Object3D, TextureLoader } from "three";

interface Props extends ThreeElement<typeof Object3D> {
  playing: boolean;
  chapterTitle: string;
  currentChapterIndex: number;
  totalChapters: number;
  currentTime: number;
  totalTime: number;
  onClickPlay: () => void;
  onClickPause: () => void;
  onClickPrev: () => void;
  onClickNext: () => void;
}

const pauseTexture = new TextureLoader().load('https://pub-62a77f8db06f43fa8e06c176ccdd5854.r2.dev/icons/pause.png');
const playTexture = new TextureLoader().load('https://pub-62a77f8db06f43fa8e06c176ccdd5854.r2.dev/icons/play_arrow.png');
const prevTexture = new TextureLoader().load('https://pub-62a77f8db06f43fa8e06c176ccdd5854.r2.dev/icons/skip_previous.png');
const nextTexture = new TextureLoader().load('https://pub-62a77f8db06f43fa8e06c176ccdd5854.r2.dev/icons/skip_next.png');

export const ControllerHud = ({
  playing,
  chapterTitle,
  currentChapterIndex,
  totalChapters,
  currentTime,
  totalTime,
  onClickPlay,
  onClickPause,
  onClickPrev,
  onClickNext,
  ...props
}: Props) => {
  const gap = 0.15;
  const hasPrev = currentChapterIndex > 0;
  const hasNext = currentChapterIndex < totalChapters - 1;

  return (
    <group {...props}>
      <mesh position={[-gap, 0, 0]} onClick={onClickPrev}>
        <planeGeometry args={[0.1, 0.1, 1, 1]} />
        <meshBasicMaterial
          map={prevTexture}
          opacity={hasPrev ? 1 : 0.5}
          transparent
        />
      </mesh>
      <group position={[0, 0, 0]}>
        {playing ? (
          <mesh onClick={onClickPause}>
            <planeGeometry args={[0.1, 0.1, 1, 1]} />
            <meshBasicMaterial map={pauseTexture} transparent />
          </mesh>
        ) : (
          <mesh onClick={onClickPlay}>
            <planeGeometry args={[0.1, 0.1, 1, 1]} />
            <meshBasicMaterial map={playTexture} transparent />
          </mesh>
        )}
      </group>
      <mesh position={[gap, 0, 0]} onClick={onClickNext}>
        <planeGeometry args={[0.1, 0.1, 1, 1]} />
        <meshBasicMaterial
          map={nextTexture}
          opacity={hasNext ? 1 : 0.5}
          transparent
        />
      </mesh>
      <group position={[0, -0.08, 0]}>
        <mesh>
          <planeGeometry args={[0.5, 0.02, 1, 1]} />
          <meshBasicMaterial
            color={'#000000'}
            opacity={0.5}
            transparent
          />
        </mesh>
        <mesh position={[-0.25 + 0.5 * currentTime / totalTime, 0, 0.005]}>
          <planeGeometry args={[0.01, 0.02, 1, 1]} />
          <meshBasicMaterial color={'#FFFFFF'} />
        </mesh>
      </group>
      <Text
        position={[0, -0.15, 0]}
        color="#FFFFFF"
        fontSize={0.03}
        textAlign={'center'}
        anchorX="center"
        anchorY="middle"
      >
        {chapterTitle}
      </Text>
      <Text
        position={[0, -0.18, 0]}
        color="#FFFFFF"
        fontSize={0.02}
        textAlign={'center'}
        anchorX="center"
        anchorY="middle"
      >
        {currentChapterIndex + 1} / {totalChapters}
      </Text>
    </group>
  )
}