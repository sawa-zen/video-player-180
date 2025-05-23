import { useCallback, useState } from "react"
import { ThreeElement, useFrame, useThree } from "@react-three/fiber";
import { ChaperSphere, LoadedMetadataEvent, ProgressEvent } from "./components/ChaperSphere";
import { ControllerHud } from "./components/ControllerHud";
import { ChaptersHud } from "./components/ChaptersHud";
import { Object3D } from "three";

export interface Chapter {
  title: string
  src: string
}

interface Props extends ThreeElement<typeof Object3D> {
  chapters: Chapter[];
}

export const StereoscopicVideo180 = ({ chapters, ...props }: Props) => {
  const { camera } = useThree();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [playing, setPlaying] = useState(false)
  const [showController, setShowController] = useState(true);
  const hasPrev = currentChapterIndex > 0;
  const hasNext = currentChapterIndex < chapters.length - 1;
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

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
      setCurrentChapterIndex((prev) => Math.min(chapters.length - 1, prev + 1));
      setPlaying(true);
    }
  }, [hasNext]);

  const handleBackgroundClick = useCallback(() => {
    setShowController((prev) => !prev);
  }, []);

  const handleVideoEnded = useCallback(() => {
    if (hasNext) {
      setCurrentChapterIndex((prev) => Math.min(chapters.length - 1, prev + 1));
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [hasNext]);

  const handleLoadedMetadata = useCallback(({ duration }: LoadedMetadataEvent) => {
    setTotalTime(duration);
    setCurrentTime(0);
  }, []);

  const handleProgress = useCallback(({ currentTime }: ProgressEvent) => {
    setCurrentTime(currentTime);
  }, []);

  const handleClickChapter = useCallback((chapter: Chapter) => {
    const index = chapters.findIndex((c) => c.title === chapter.title);
    if (index !== -1) {
      setCurrentChapterIndex(index);
      setPlaying(true);
    }
  }, [chapters]);

  // 以下のバグのせいでこの useEffect が必要
  // https://github.com/pmndrs/xr/issues/398
  useFrame(() => {
    camera.layers.set(0)
  });

  return (
    <group {...props}>
      {
        chapters.map((chapter, index) => {
          return index === currentChapterIndex ? (
            <ChaperSphere
              key={chapter.src}
              src={chapter.src}
              playing={playing}
              onLoadedMetadata={handleLoadedMetadata}
              onProgress={handleProgress}
              onEnded={handleVideoEnded}
            />
          ) : null
        })
      }
      {showController ? (
        <>
          <ControllerHud
            position={[0, 1.12, -0.8]}
            playing={playing}
            chapterTitle={chapters[currentChapterIndex].title}
            currentChapterIndex={currentChapterIndex}
            totalChapters={chapters.length}
            currentTime={currentTime}
            totalTime={totalTime}
            onClickPlay={handleClickPlay}
            onClickPause={handleClickPause}
            onClickPrev={handleClickPrev}
            onClickNext={handleClickNext}
          />
          <ChaptersHud
            chapters={chapters}
            position={[-0.5, 1.12, -0.55]}
            rotation={[0, Math.PI / 4, 0]}
            onClickChapter={handleClickChapter}
          />
        </>
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
