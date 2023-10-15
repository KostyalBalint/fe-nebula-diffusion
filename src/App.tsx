import React from "react";
import "./App.css";
import { Stack } from "@mui/material";
import { GenerationPage } from "./pages/GenerationPage";

function App() {
  return (
    <Stack height="100vh" width="100vw">
      <GenerationPage />
    </Stack>
  );
}

export default App;
