import React, { useState } from "react";
import { GenerationModel } from "../../providers/PointCloudProvider";
import { Tabs } from "../Tabs";
import { DiffusionPointCloud } from "./generationMethods/DiffusionPointCloud";
import { NebulaDiffusion } from "./generationMethods/NebulaDiffusion";

export const GenerationPanel = () => {
  const [selectedModel, setSelectedModel] = useState<GenerationModel>(
    GenerationModel.DiffusionPointCloud,
  );

  return (
    <div className="flex flex-col gap-5">
      <Tabs
        size={"small"}
        options={["Diffusion Point Cloud", "Nebula Diffusion"]}
        selected={selectedModel === GenerationModel.DiffusionPointCloud ? 0 : 1}
        onChange={(key) => {
          setSelectedModel(
            key === 0
              ? GenerationModel.DiffusionPointCloud
              : GenerationModel.NebulaDiffusion,
          );
        }}
      />

      <div className="flex flex-col gap-2">
        {selectedModel === GenerationModel.DiffusionPointCloud ? (
          <DiffusionPointCloud />
        ) : (
          <NebulaDiffusion />
        )}
      </div>
    </div>
  );
};
