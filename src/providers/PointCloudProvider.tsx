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
  generatePointCloud: () => void;
  isGenerating: boolean;
  stopGeneration: () => void;
}

const PointCloudContext = createContext<PointCloudContextProps>({
  pointCloud: [],
  fetchPointCloud: () => {},
  searchObject: () => {
    return new Promise(() => {});
  },
  annotation: { loading: false },
  generatePointCloud: () => {},
  isGenerating: false,
  stopGeneration: () => {},
});

export const PointCloudProvider = (props: React.PropsWithChildren) => {
  const [pointCloud, setPointCloud] = useState<RawPointCloud>([]);
  const [annotation, setAnnotation] = useState<SketchfabModel | null>(null);
  const [loadingAnnotations, setLoadingAnnotations] = useState(false);
  const [generationEventSource, setGenerationEventSource] =
    useState<EventSource | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

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

  const generatePointCloud = async () => {
    const generationEvent = new EventSource(
      `${config.backendUrl}/diffusionPointCloud/generate`,
    );
    setGenerationEventSource(generationEvent);
    setIsGenerating(true);

    generationEvent.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      setPointCloud(data);
    };
    generationEvent.onerror = () => {
      setIsGenerating(false);
    };
  };

  const stopGeneration = () => {
    if (generationEventSource) {
      generationEventSource.close();
    }
    setIsGenerating(false);
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
        generatePointCloud,
        stopGeneration,
        isGenerating,
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
