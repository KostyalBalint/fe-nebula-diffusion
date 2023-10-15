import React, { ReactElement, Suspense } from "react";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { CameraControls, Effects, Environment } from "@react-three/drei";
import { BasePlane } from "./BasePlane";
import { PointCloud } from "./PointCloud";
import { AxesHelper } from "./helpers/AxesHelper";
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { Perf } from "r3f-perf";

extend({ SSAOPass, UnrealBloomPass });

export interface View3DProps {}

export function View3D(props: View3DProps): ReactElement {
  const pointCloudData: [number, number, number][] = Array.from({
    length: 10,
  }).map(() => {
    return [
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
      Math.random() * 10 - 5,
    ];
  });

  return (
    <div className="h-full relative">
      <Canvas
        style={{ height: "100%", width: "100%" }}
        gl={{
          antialias: true,
          pixelRatio: window.devicePixelRatio,
        }}
        camera={{ position: [-15, 10, 0], far: 200 }}
      >
        <Suspense fallback={null}>
          <scene>
            <Perf position="top-left" />
            <Environment files={"assets/quattro_canti_1k.hdr"}>
              <ambientLight intensity={1} />
            </Environment>
            <color attach="background" args={["#dadada"]} />

            <PointCloud
              positions={pointCloudData}
              color="red"
              pointSize={0.1}
            />

            <AxesHelper
              length={2}
              thickness={0.02}
              arrowPos={new Vector3(0, 0, 0)}
            />
            <BasePlane />
            <CameraControls
              smoothTime={0.05}
              minDistance={5}
              maxDistance={60}
            />
          </scene>
        </Suspense>
      </Canvas>
    </div>
  );
}
