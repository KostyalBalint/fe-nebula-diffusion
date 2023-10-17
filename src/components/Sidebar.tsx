import { Stack } from "@mui/material";
import React, { useState } from "react";
import { useSettings } from "../providers/SettingsProvider";
import { usePointCloud } from "../providers/PointCloudProvider";

function Divider() {
  return (
    <hr className="w-48 h-0.5 mx-auto bg-gray-200 border-0 rounded md:my-4 " />
  );
}

export const Sidebar = () => {
  const settings = useSettings();
  const { fetchPointCloud } = usePointCloud();
  const [uid, setUid] = useState<string>("a14bfdca48344226884b93d6315d57c2");
  return (
    <Stack
      width={400}
      gap={2}
      className="p-8 flex-shrink-0 shadow-xl overflow-scroll"
    >
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
          className="self-end text-white bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-hr focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => settings.regenerate()}
        >
          Generate
        </button>
      </div>

      <div>
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="search"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Objaverse UID"
          />
          <button
            className="text-white absolute right-2.5 bottom-2.5 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            onClick={() => fetchPointCloud(uid)}
          >
            Search
          </button>
        </div>
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
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900">
          Show axis helper
        </span>
      </label>
    </Stack>
  );
};
