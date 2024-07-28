"use client";
import { createContext, useContext, useState } from "react";

const defaultCtx = {
  isSideBarOpen: false,
  setisSideBarOpen: (isSideBarOpen: boolean) => {},
  toggle: () => {},
};

const SideBarContext = createContext(defaultCtx);

const SideBarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSideBarOpen, setisSideBarOpen] = useState<boolean>(false);

  function toggle() {
    setisSideBarOpen(!isSideBarOpen);
  }

  return (
    <SideBarContext.Provider
      value={{
        isSideBarOpen,
        setisSideBarOpen,
        toggle,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

export function useSideBarControl() {
  const { isSideBarOpen, setisSideBarOpen, toggle } =
    useContext(SideBarContext);
  return { isSideBarOpen, setisSideBarOpen, toggle };
}

export default SideBarContextProvider;
