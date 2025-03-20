import { ThreeElement } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Object3D } from "three";

interface Props extends ThreeElement<typeof Object3D> {
  playing: boolean;
  chapterName: string;
  currentChapterIndex: number;
  totalChapters: number;
  onClickPlay: () => void;
  onClickPause: () => void;
  onClickPrev: () => void;
  onClickNext: () => void;
}

export const ControllerHud = ({
  playing,
  chapterName,
  currentChapterIndex,
  totalChapters,
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
          color={'yellow'}
          opacity={hasPrev ? 1 : 0.5}
          transparent
        />
      </mesh>
      <group position={[0, 0, 0]}>
        {playing ? (
          <mesh onClick={onClickPause}>
            <planeGeometry args={[0.1, 0.1, 1, 1]} />
            <meshBasicMaterial color={'blue'} />
          </mesh>
        ) : (
          <mesh onClick={onClickPlay}>
            <planeGeometry args={[0.1, 0.1, 1, 1]} />
            <meshBasicMaterial color={'green'} />
          </mesh>
        )}
      </group>
      <mesh position={[gap, 0, 0]} onClick={onClickNext}>
        <planeGeometry args={[0.1, 0.1, 1, 1]} />
        <meshBasicMaterial
          color={'purple'}
          opacity={hasNext ? 1 : 0.5}
          transparent
        />
      </mesh>
      <Text
        position={[0, -0.1, 0]}
        color="#FFFFFF"
        fontSize={0.03}
        textAlign={'center'}
        anchorX="center"
        anchorY="middle"
      >
        {chapterName}
      </Text>
      <Text
        position={[0, -0.13, 0]}
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