import { Text } from "@react-three/drei"
import { Chapter } from "../.."

interface Props {
  chapters: Chapter[]
  position?: [number, number, number]
  rotation?: [number, number, number]
  onClickChapter: (chapter: Chapter) => void
}

export const ChaptersHud = ({
  chapters,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  onClickChapter
}: Props) => {
  const padding = 0.05
  const gap = 0.03
  const titleHeight = 0.05
  const chapterHeight = 0.02
  const chaptersHeight = chapters.length * (chapterHeight + gap) - gap
  const wrapperWidth = (0.3) + (padding * 2)
  const wrapperHeight = (chaptersHeight + titleHeight + (padding * 2)) + gap

  return (
    <group position={position} rotation={rotation}>
      <group position={[0, wrapperHeight / 2, 0]}>
        <mesh position={[0, -wrapperHeight / 2, -0.01]}>
          <planeGeometry args={[wrapperWidth, wrapperHeight]} />
          <meshBasicMaterial
            color="black"
            opacity={0.2}
            transparent
          />
        </mesh>
        <Text
          position={[0,-padding, 0]}
          color="#FFFFFF"
          fontSize={titleHeight}
          textAlign="left"
        >
          Chapters
        </Text>
        <group position={[0, -(padding + titleHeight + gap), 0]}>
          {chapters.map((chapter, index) => (
            <Text
              key={index}
              position={[0, -index * (chapterHeight + gap), 0]}
              color="#FFFFFF"
              fontSize={chapterHeight}
              textAlign="left"
              maxWidth={wrapperWidth - (padding * 2)}
              onClick={() => onClickChapter(chapter)}
            >
              {chapter.title}
            </Text>
          ))}
        </group>
      </group>
    </group>
  )
}