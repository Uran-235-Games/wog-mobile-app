import React, { createContext, useContext, useState } from "react";

type ScreenName = "Home" | "Auth";

const NavigationContext = createContext<{
  current: ScreenName;
  change: (s: ScreenName) => void;
}>({ current: "Auth", change: () => {} });

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [current, setCurrent] = useState<ScreenName>("Auth");
  return (
    <NavigationContext.Provider value={{ current, change: setCurrent }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
