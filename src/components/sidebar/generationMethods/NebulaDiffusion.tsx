import {
  GenerationModel,
  usePointCloud,
} from "../../../providers/PointCloudProvider";
import React, { useState } from "react";
import { Dropdown } from "../../Dropdown";

export const NebulaDiffusion = () => {
  const { generatePointCloud, stopGeneration, isGenerating } = usePointCloud();
  const [textArea, setTextArea] = useState("");

  const variants = [
    "Objaverse V1",
    "Objaverse V2",
    "Shapenet V1",
    "Shapenet V2",
  ];
  const [modelVariant, setModelVariant] = useState(
    variants[variants.length - 1],
  );

  const selectVariant = (id: number) => {
    setModelVariant(variants[id]);
  };

  return (
    <>
      <textarea
        id="message"
        rows={4}
        className="w-100 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your prompt here..."
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />

      <div className="flex flex-row content-between justify-between align-middle w-full">
        <Dropdown
          options={variants}
          selected={variants.indexOf(modelVariant)}
          onChange={selectVariant}
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
              generatePointCloud(
                GenerationModel.NebulaDiffusion,
                textArea,
                modelVariant.replaceAll(" ", "_").toLowerCase(),
              );
            }
          }}
        >
          Generate
        </button>
      </div>
    </>
  );
};
