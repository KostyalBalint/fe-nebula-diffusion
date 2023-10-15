import React from "react";
import { DoubleSide } from "three";

export function BasePlane() {
  return (
    <mesh>
      <gridHelper args={[5000, 5000]}>
        <meshBasicMaterial color="#919191" side={DoubleSide} />
      </gridHelper>
    </mesh>
  );
}
