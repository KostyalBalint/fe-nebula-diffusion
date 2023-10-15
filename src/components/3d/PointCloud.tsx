import React, { createRef, useMemo } from "react";
import { Color, ColorRepresentation, InstancedMesh, Object3D } from "three";
import { useFrame } from "@react-three/fiber";

interface PointCloudProps {
  positions: [number, number, number][];
  color?: ColorRepresentation;
  pointSize?: number;
}

export const PointCloud = ({
  positions,
  color = "#00ff00",
  pointSize = 0.2,
}: PointCloudProps) => {
  const meshRef = createRef<InstancedMesh>();

  const tempObject = new Object3D();
  const tempColor = new Color();

  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(positions.length)
          .fill(0)
          .flatMap((_, i) => tempColor.set(color).toArray()),
      ),
    [color, positions.length],
  );

  useFrame((state) => {
    let i = 0;
    positions.forEach(([x, y, z]) => {
      const id = i++;
      tempObject.position.set(x, y, z);
      tempObject.updateMatrix();
      if (meshRef.current) meshRef.current.setMatrixAt(id, tempObject.matrix);
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, positions.length]}
    >
      <sphereGeometry args={[pointSize, 8, 8]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colorArray, 3]}
        />
      </sphereGeometry>
      <meshStandardMaterial
        metalness={0.5}
        roughness={0.5}
        envMapIntensity={1.0}
        vertexColors
      />
    </instancedMesh>
  );
};
