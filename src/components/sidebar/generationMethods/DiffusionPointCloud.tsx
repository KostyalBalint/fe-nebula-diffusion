import { Dropdown } from "../../Dropdown";
import {
  GenerationModel,
  usePointCloud,
} from "../../../providers/PointCloudProvider";
import React, { useState } from "react";

export const DiffusionPointCloud = () => {
  const { generatePointCloud, stopGeneration, isGenerating } = usePointCloud();
  const [selectedModel, setSelectedModel] = useState(0);

  const modelText = selectedModel === 0 ? "airplane" : "chair";

  return (
    <div className="flex flex-row content-between justify-between w-full">
      <Dropdown
        options={["Airplane", "Chair"]}
        selected={selectedModel}
        onChange={setSelectedModel}
      />

      <button
        type="button"
        className={`self-end text-white bg-gradient-to-br ${
          !isGenerating
            ? "from-blue-500 via-blue-600 to-blue-700"
            : "from-gray-500 via-gray-600 to-gray-700 "
        } hover:bg-gradient-to-hr focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
        onClick={() => {
          if (isGenerating) {
            stopGeneration();
          } else {
            generatePointCloud(GenerationModel.DiffusionPointCloud, modelText);
          }
        }}
      >
        Generate
      </button>
    </div>
  );
};
