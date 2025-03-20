import { useCallback, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber";
import { ChaperSphere } from "./components/ChaperSphere";
import { ControllerHud } from "./components/ControllerHud";

interface Props {
  videoSrc: string;
}

export const StereoscopicVideo180 = ({ videoSrc }: Props) => {
  const { camera } = useThree();
  const [playing, setPlaying] = useState(false)

  const handleClickPlay = useCallback(() => {
    setPlaying(true);
  }, []);

  const handleClickPause = useCallback(() => {
    setPlaying(false);
  }, []);

  const handleClickPrev = useCallback(() => {

  }, []);

  const handleClickNext = useCallback(() => {

  }, []);

  // 以下のバグのせいでこの useEffect が必要
  // https://github.com/pmndrs/xr/issues/398
  useFrame(() => { camera.layers.set(0) });

  return (
    <group>
      <ChaperSphere src={videoSrc} playing={playing} />
      <ControllerHud
        position={[0, 1, -0.5]}
        playing={playing}
        onClickPlay={handleClickPlay}
        onClickPause={handleClickPause}
        onClickPrev={handleClickPrev}
        onClickNext={handleClickNext}
      />
    </group>
  )
}
