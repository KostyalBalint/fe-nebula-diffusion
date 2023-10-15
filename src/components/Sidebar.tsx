import { Stack } from "@mui/material";
import React from "react";

interface SidebarProps {}

export const Sidebar = (props: SidebarProps) => {
  return (
    <Stack width={400} className="p-8 items-center flex-shrink-0 shadow-xl">
      <h1 className="text-4xl font-bold text-white inline text-center">
        <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-950 inline">
          Nebula Diffusion
        </span>
      </h1>
      <hr className="w-48 h-0.5 mx-auto my-2 bg-gray-200 border-0 rounded md:my-10 " />
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
    </Stack>
  );
};
