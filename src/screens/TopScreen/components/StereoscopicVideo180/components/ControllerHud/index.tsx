import {  ThreeElement } from "@react-three/fiber";
import { Object3D } from "three";

interface Props extends ThreeElement<typeof Object3D> {
  playing: boolean;
  onClickPlay: () => void;
  onClickPause: () => void;
  onClickPrev: () => void;
  onClickNext: () => void;
}

export const ControllerHud = ({ playing, position, onClickPlay, onClickPause, onClickPrev, onClickNext}: Props) => {
  return (
    <group position={position}>
      <mesh position={[-0.1, 0, 0]} onClick={onClickPrev}>
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
      <mesh position={[0.1, 0, 0]} onClick={onClickNext}>
        <planeGeometry args={[0.1, 0.1, 1, 1]} />
        <meshBasicMaterial color={'purple'} />
      </mesh>
    </group>
  )
}