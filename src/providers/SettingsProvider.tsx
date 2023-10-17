import React, { createContext, useContext, useState } from "react";

interface SettingsContextProps {
  sphereRadius: number;
  setSphereRadius: (value: number) => void;
  showAxisHelper: boolean;
  setShowAxisHelper: (value: boolean) => void;
  //Only for testing purposes
  generationId: number;
  regenerate: () => void;
}

const SettingsContext = createContext<SettingsContextProps>({
  sphereRadius: 0.2,
  setSphereRadius: () => {},
  showAxisHelper: false,
  setShowAxisHelper: () => {},
  generationId: 0,
  regenerate: () => {},
});

export const SettingsContextProvider = (props: React.PropsWithChildren) => {
  const [sphereRadius, setSphereRadius] = useState<number>(0.2);
  const [showAxisHelper, setShowAxisHelper] = useState<boolean>(false);
  const [generationId, setGenerationId] = useState<number>(0);

  return (
    <SettingsContext.Provider
      value={{
        sphereRadius,
        setSphereRadius,
        showAxisHelper,
        setShowAxisHelper,
        generationId,
        regenerate: () => setGenerationId((id) => id + 1),
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used within a SettingsContext");
  }

  return context;
};
