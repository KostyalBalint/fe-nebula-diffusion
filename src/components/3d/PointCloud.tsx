import React, { createRef, useEffect, useMemo } from "react";
import { Color, ColorRepresentation, InstancedMesh, Object3D } from "three";
import { RawPointCloud } from "../../providers/PointCloudProvider";

interface PointCloudProps {
  points: RawPointCloud;
  color?: ColorRepresentation;
  pointSize?: number;
}

export const PointCloud = ({
  points,
  color = "#0000ff",
  pointSize = 0.2,
}: PointCloudProps) => {
  const meshRef = createRef<InstancedMesh>();

  const tempObject = new Object3D();
  const tempColor = new Color();

  const colorArray = useMemo(
    () =>
      Float32Array.from(
        new Array(points.length).fill(0).flatMap((_, i) => {
          const colorAtPos = points[i].slice(3, 6);
          if (
            colorAtPos.length < 3 ||
            (colorAtPos[0] === 0 && colorAtPos[1] === 0 && colorAtPos[2] === 0)
          )
            return tempColor.set(color).toArray();
          return tempColor.fromArray(colorAtPos.map((c) => c / 255)).toArray();
        }),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [points, color],
  );

  useEffect(() => {
    let i = 0;
    points.forEach(([x, y, z]) => {
      const id = i++;
      tempObject.position.set(x, y, z);
      tempObject.updateMatrix();
      if (meshRef.current) meshRef.current.setMatrixAt(id, tempObject.matrix);
    });
    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, points.length]}>
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
