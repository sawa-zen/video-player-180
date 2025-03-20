import { ThreeElement } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { Object3D } from "three";

interface Props extends ThreeElement<typeof Object3D> {
  playing: boolean;
  chapterName: string;
  onClickPlay: () => void;
  onClickPause: () => void;
  onClickPrev: () => void;
  onClickNext: () => void;
}

export const ControllerHud = ({
  playing,
  chapterName,
  onClickPlay,
  onClickPause,
  onClickPrev,
  onClickNext,
  ...props
}: Props) => {
  const gap = 0.2;

  return (
    <group {...props}>
      <mesh position={[-gap, 0, 0]} onClick={onClickPrev}>
        <planeGeometry args={[0.1, 0.1, 1, 1]} />
        <meshBasicMaterial color={'yellow'} />
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
        <meshBasicMaterial color={'purple'} />
      </mesh>
      <Text
        position={[0, -0.1, 0]}
        color="#FFFFFF"
        fontSize={0.05}
        maxWidth={10}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign={'center'}
        anchorX="center"
        anchorY="middle"
      >
        {chapterName}
      </Text>
    </group>
  )
}