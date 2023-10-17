import React, { createContext, useContext, useState } from "react";
import { config } from "../config";

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
  fetchPointCloud: (uid: string) => void;
}

const PointCloudContext = createContext<PointCloudContextProps>({
  pointCloud: [],
  fetchPointCloud: () => {},
});

export const PointCloudProvider = (props: React.PropsWithChildren) => {
  const [pointCloud, setPointCloud] = useState<RawPointCloud>([]);
  const fetchPointCloud = async (uid: string) => {
    const response = await fetch(`${config.backendUrl}/pointCloud/${uid}`);
    const data = await response.json();
    setPointCloud(data);
  };

  return (
    <PointCloudContext.Provider
      value={{
        pointCloud,
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
