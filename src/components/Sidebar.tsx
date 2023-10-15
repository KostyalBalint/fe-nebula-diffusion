import { Stack } from "@mui/material";
import React from "react";
import { useSettings } from "../providers/SettingsProvider";

interface SidebarProps {}

function Divider() {
  return (
    <hr className="w-48 h-0.5 mx-auto bg-gray-200 border-0 rounded md:my-4 " />
  );
}

export const Sidebar = (props: SidebarProps) => {
  const settings = useSettings();
  return (
    <Stack width={400} gap={2} className="p-8 flex-shrink-0 shadow-xl">
      <h1 className="text-4xl font-bold text-white inline text-center">
        <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-950 inline">
          Nebula Diffusion
        </span>
      </h1>

      <Divider />

      <div className="flex flex-col">
        <textarea
          id="message"
          rows={4}
          className="w-100 mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your prompt here..."
        />

        <button
          type="button"
          className="self-end text-white bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Generate
        </button>
      </div>

      <Divider />

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
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900">
          Show axis helper
        </span>
      </label>
    </Stack>
  );
};
