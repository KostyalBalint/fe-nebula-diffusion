import React, { createContext, useContext, useState } from "react";
import { config } from "../config";
import { SketchfabModel } from "../types/objaverseAnnotation";
import { SearchResult } from "../types/searchResult";

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
  searchObject: (query: string) => Promise<SearchResult[]>;
}

const PointCloudContext = createContext<PointCloudContextProps>({
  pointCloud: [],
  fetchPointCloud: () => {},
  searchObject: () => {
    return new Promise(() => {});
  },
  annotation: { loading: false },
});

export const PointCloudProvider = (props: React.PropsWithChildren) => {
  const [pointCloud, setPointCloud] = useState<RawPointCloud>([]);
  const [annotation, setAnnotation] = useState<SketchfabModel | null>(null);
  const [loadingAnnotations, setLoadingAnnotations] = useState(false);

  const fetchPointCloud = async (uid: string) => {
    setLoadingAnnotations(true);
    setAnnotation(null);
    const response = fetch(`${config.backendUrl}/pointCloud/${uid}`);
    const annotationResponse = fetch(`${config.backendUrl}/annotation/${uid}`);

    const data = await (await response).json();
    setPointCloud(data);
    const annotationData = await (await annotationResponse).json();
    setAnnotation(annotationData[uid]);
    setLoadingAnnotations(false);
  };

  const searchObject = async (query: string): Promise<SearchResult[]> => {
    const response = fetch(`${config.backendUrl}/search/${query}`);
    return (await (await response).json()).map((result: any) => {
      return { ...result, name: result["name:"] };
    });
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
        searchObject,
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
