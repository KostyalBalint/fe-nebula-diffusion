import { Stack } from "@mui/material";
import React, { useState } from "react";
import { Tabs } from "./Tabs";
import { DatasetPanel } from "./sidebar/DatasetPanel";
import { GenerationPanel } from "./sidebar/GenerationPanel";
import { SettingsPanel } from "./sidebar/SettingsPanel";

function Divider() {
  return (
    <hr className="w-48 h-0.5 mx-auto bg-gray-200 border-0 rounded md:my-4 " />
  );
}

export const Sidebar = () => {
  const [selectedTabId, setSelectedTabId] = useState<number>(0);

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

      <Tabs
        options={["Generation", "Dataset"]}
        selected={selectedTabId}
        onChange={(key) => setSelectedTabId(key)}
      />

      <Divider />

      {selectedTabId === 0 && <GenerationPanel />}
      {selectedTabId === 1 && <DatasetPanel />}

      <Divider />
      <SettingsPanel />
    </Stack>
  );
};
