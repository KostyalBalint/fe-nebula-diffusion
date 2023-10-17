import React, { createContext, useContext, useState } from "react";
import { config } from "../config";
import { SketchfabModel } from "../types/objaverseAnnotation";

// [X, Y, Z, R, G, B, A]
export type RawPointCloud = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
][];

interface PointCloudContextProps {
  pointCloud: RawPointCloud;
  annotation: {
    loading: boolean;
    data?: SketchfabModel | null;
  };
  fetchPointCloud: (uid: string) => void;
}

const PointCloudContext = createContext<PointCloudContextProps>({
  pointCloud: [],
  fetchPointCloud: () => {},
  annotation: { loading: false },
});

export const PointCloudProvider = (props: React.PropsWithChildren) => {
  const [pointCloud, setPointCloud] = useState<RawPointCloud>([]);
  const [annotation, setAnnotation] = useState<SketchfabModel | null>(null);
  const [loadingAnnotations, setLoadingAnnotations] = useState(false);

  const fetchPointCloud = async (uid: string) => {
    setLoadingAnnotations(true);
    setAnnotation(null);
    const response = await fetch(`${config.backendUrl}/pointCloud/${uid}`);
    const data = await response.json();
    setPointCloud(data);

    const annotationResponse = await fetch(
      `${config.backendUrl}/annotation/${uid}`,
    );
    const annotationData = await annotationResponse.json();
    setAnnotation(annotationData[uid]);
    setLoadingAnnotations(false);
  };

  return (
    <PointCloudContext.Provider
      value={{
        pointCloud,
        annotation: {
          loading: loadingAnnotations,
          data: annotation,
        },
        fetchPointCloud,
      }}
    >
      {props.children}
    </PointCloudContext.Provider>
  );
};

export const usePointCloud = () => {
  const context = useContext(PointCloudContext);

  if (!context) {
    throw new Error("useSettings must be used within a PointCloud");
  }

  return context;
};
