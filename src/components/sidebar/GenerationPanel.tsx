import React, { useState } from "react";
import {
  GenerationModel,
  usePointCloud,
} from "../../providers/PointCloudProvider";
import { Tabs } from "../Tabs";

export const GenerationPanel = () => {
  const { generatePointCloud, stopGeneration, isGenerating } = usePointCloud();
  const [selectedModel, setSelectedModel] = useState(0);
  const [textArea, setTextArea] = useState("");

  return (
    <div className="flex flex-col gap-5">
      <Tabs
        size={"small"}
        options={["Diffusion Point Cloud", "Nebula Diffusion"]}
        selected={selectedModel}
        onChange={(key) => setSelectedModel(key)}
      />

      <div className="flex flex-col gap-2">
        {selectedModel === 1 && (
          <textarea
            id="message"
            rows={4}
            className="w-100 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your prompt here..."
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          />
        )}

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
              generatePointCloud(
                selectedModel === 0
                  ? GenerationModel.DiffusionPointCloud
                  : GenerationModel.NebulaDiffusion,
                textArea,
              );
            }
          }}
        >
          Generate
        </button>
      </div>
    </div>
  );
};
