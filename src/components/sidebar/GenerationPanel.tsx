import { useSettings } from "../../providers/SettingsProvider";
import React from "react";

export const GenerationPanel = () => {
  const settings = useSettings();
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
        className="self-end text-white bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-hr focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={() => settings.regenerate()}
      >
        Generate
      </button>
    </div>
  );
};
