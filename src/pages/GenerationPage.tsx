import { Stack } from "@mui/material";
import { View3D } from "../components/3d/View3D";
import { Sidebar } from "../components/Sidebar";
import { SettingsContextProvider } from "../providers/SettingsProvider";
import {
  PointCloudProvider,
  usePointCloud,
} from "../providers/PointCloudProvider";

function ImagePreview(props: { className?: string }) {
  const { annotation } = usePointCloud();
  return annotation.data ? (
    <div className={`w-1/4 rounded-lg shadow-xl ${props.className}`}>
      <img
        alt={annotation.data?.name}
        src={annotation.data?.thumbnails.images[0].url ?? ""}
        className="w-full h-full rounded-lg"
      />
    </div>
  ) : null;
}

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
          <PointCloudProvider>
            <Stack height="100%" flexGrow={1} direction="row">
              <Stack height="100%" width="100%">
                <View3D />
                <ImagePreview className="absolute bottom-0 left-0 m-3" />
              </Stack>
              <Sidebar />
            </Stack>
          </PointCloudProvider>
        </SettingsContextProvider>
      </Stack>
    </div>
  );
};
