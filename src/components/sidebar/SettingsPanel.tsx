import { useSettings } from "../../providers/SettingsProvider";
import React from "react";

export const SettingsPanel = () => {
  const settings = useSettings();
  return (
    <>
      <div>
        <label
          htmlFor="default-range"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Sphere radius ({settings.sphereRadius.toFixed(2)})
        </label>
        <input
          id="default-range"
          type="range"
          onChange={(e) => {
            settings.setSphereRadius(Number(e.target.value));
          }}
          value={settings.sphereRadius}
          min={0.01}
          max={0.5}
          step={0.001}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <label className="relative inline-flex items-center mb-4 cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={(e) => settings.setShowAxisHelper(e.target.checked)}
        ></input>
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900">
          Show axis helper
        </span>
      </label>
    </>
  );
};
