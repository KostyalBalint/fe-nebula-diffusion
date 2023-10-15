import { Stack } from "@mui/material";
import { View3D } from "../components/3d/View3D";
import { Sidebar } from "../components/Sidebar";
import { SettingsContextProvider } from "../providers/SettingsProvider";

export const GenerationPage = () => {
  return (
    <div className="h-full relative">
      <Stack
        id="simulation"
        height="100vh"
        width="100vw"
        sx={{ overflow: "hidden" }}
      >
        <SettingsContextProvider>
          <Stack height="100%" flexGrow={1} direction="row">
            <Stack height="100%" width="100%">
              <View3D />
            </Stack>
            <Sidebar />
          </Stack>
        </SettingsContextProvider>
      </Stack>
    </div>
  );
};
