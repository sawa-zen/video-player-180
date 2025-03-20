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
  const [showController, setShowController] = useState(true);
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
      setPlaying(true);
    }
  }, [hasPrev]);

  const handleClickNext = useCallback(() => {
    if (hasNext) {
      setCurrentChapterIndex((prev) => Math.min(chaptersSrc.length - 1, prev + 1));
      setPlaying(true);
    }
  }, [hasNext]);

  const handleBackgroundClick = useCallback(() => {
    setShowController((prev) => !prev);
  }, []);

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
              onEnded={handleClickNext}
            />
          ) : null
        })
      }
      {showController ? (
        <ControllerHud
          position={[0, 1, -0.5]}
          playing={playing}
          chapterName={`Chapter ${currentChapterIndex + 1}`}
          currentChapterIndex={currentChapterIndex}
          totalChapters={chaptersSrc.length}
          onClickPlay={handleClickPlay}
          onClickPause={handleClickPause}
          onClickPrev={handleClickPrev}
          onClickNext={handleClickNext}
        />
      ) : null}
      {/* 不可視の大きなプレーンをシーンの背後に配置 */}
      <mesh
        position={[0, 0, -100]}
        rotation={[0, 0, 0]}
        scale={[1000, 1000, 1]}
        onClick={handleBackgroundClick}
      >
        <planeGeometry />
        <meshBasicMaterial visible={false} />
      </mesh>
    </group>
  )
}
