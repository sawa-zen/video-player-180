import { useCallback, useState } from "react"
import { ThreeElement, useFrame, useThree } from "@react-three/fiber";
import { ChaperSphere } from "./components/ChaperSphere";
import { ControllerHud } from "./components/ControllerHud";
import { Object3D } from "three";

interface Props extends ThreeElement<typeof Object3D> {
  chaptersSrc: string[];
}

export const StereoscopicVideo180 = ({ chaptersSrc, ...props }: Props) => {
  const { camera } = useThree();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [playing, setPlaying] = useState(false)
  const hasPrev = currentChapterIndex > 0;
  const hasNext = currentChapterIndex < chaptersSrc.length - 1;

  const handleClickPlay = useCallback(() => {
    setPlaying(true);
  }, []);

  const handleClickPause = useCallback(() => {
    setPlaying(false);
  }, []);

  const handleClickPrev = useCallback(() => {
    if (hasPrev) {
      setCurrentChapterIndex((prev) => Math.max(0, prev - 1));
    }
  }, [hasPrev]);

  const handleClickNext = useCallback(() => {
    if (hasNext) {
      setCurrentChapterIndex((prev) => Math.min(chaptersSrc.length - 1, prev + 1));
    }
  }, [hasNext]);

  // 以下のバグのせいでこの useEffect が必要
  // https://github.com/pmndrs/xr/issues/398
  useFrame(() => { camera.layers.set(0) });

  return (
    <group {...props}>
      {
        chaptersSrc.map((src, index) => {
          return index === currentChapterIndex ? (
            <ChaperSphere
              key={src}
              src={src}
              playing={playing}
            />
          ) : null
        })
      }
      <ControllerHud
        position={[0, 1, -0.5]}
        playing={playing}
        chapterName={`Chapter ${currentChapterIndex + 1}`}
        onClickPlay={handleClickPlay}
        onClickPause={handleClickPause}
        onClickPrev={handleClickPrev}
        onClickNext={handleClickNext}
      />
    </group>
  )
}
