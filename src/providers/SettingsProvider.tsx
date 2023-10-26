import React, { createContext, useContext, useState } from "react";

interface SettingsContextProps {
  sphereRadius: number;
  setSphereRadius: (value: number) => void;
  showAxisHelper: boolean;
  setShowAxisHelper: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextProps>({
  sphereRadius: 1,
  setSphereRadius: () => {},
  showAxisHelper: false,
  setShowAxisHelper: () => {},
});

export const SettingsContextProvider = (props: React.PropsWithChildren) => {
  const [sphereRadius, setSphereRadius] = useState<number>(0.03);
  const [showAxisHelper, setShowAxisHelper] = useState<boolean>(false);

  return (
    <SettingsContext.Provider
      value={{
        sphereRadius,
        setSphereRadius,
        showAxisHelper,
        setShowAxisHelper,
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
