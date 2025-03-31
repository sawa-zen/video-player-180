import { useEffect, useMemo, useRef } from "react";
import { BackSide, type Mesh, SRGBColorSpace, VideoTexture } from "three";

interface Props {
  video: HTMLVideoElement
  eye: 'left' | 'right'
}

// EyeView コンポーネント - 各目に適したビューを表示
export const EyeView = ({ video, eye }: Props) => {
  const eyeIndex = eye === 'left' ? 0 : 1;
  const meshRef = useRef<Mesh>(null)
  const texture = useMemo(() => {
    // テクスチャを作成
    const tex = new VideoTexture(video);
    tex.colorSpace = SRGBColorSpace;
    return tex
  }, [video])

  useEffect(() => {
    if (!meshRef.current) return;
    switch (eye) {
      case 'left':
        meshRef.current.layers.set(1);
        break;
      case 'right':
        meshRef.current.layers.set(2);
        break;
    }
  }, [eye])

  // X軸のスケールを反転させて正しい向きのテクスチャを表示
  return (
    <mesh rotation={[0, Math.PI, 0]} scale={[-1, 1, 1]} ref={meshRef}>
      <sphereGeometry args={[20, 64, 64, 0, Math.PI]} />
      <shaderMaterial
        uniforms={{ map: { value: texture }, eyeIndex: { value: eyeIndex } }}
        side={BackSide}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D map;
          uniform int eyeIndex;
          varying vec2 vUv;
          void main() {
            vec2 uv = vUv;
            vec3 color = vec3(0.0);
            if (eyeIndex == 0) {
              uv.x = (0.5 + (uv.x - 0.5)) / 2.0;
            } else {
              uv.x = (0.5 + (uv.x - 0.5)) / 2.0 + 0.5;
            }
            gl_FragColor = texture2D(map, uv);
          }
        `}
      />
    </mesh>
  );
};
