import React from "react";
import { usePointCloud } from "../../providers/PointCloudProvider";

export const GenerationPanel = () => {
  const { generatePointCloud, stopGeneration, isGenerating } = usePointCloud();

  return (
    <div className="flex flex-col">
      <textarea
        id="message"
        rows={4}
        className="w-100 mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your prompt here..."
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
            generatePointCloud();
          }
        }}
      >
        Generate
      </button>
    </div>
  );
};
