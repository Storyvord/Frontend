"use client";
import { createContext, useContext, useState } from "react";

const defaultCtx = {
  isSideBarOpen: false,
  setisSideBarOpen: (isSideBarOpen: boolean) => {},
  toggle: () => {},
  isSidebarSmall: false,
  toggleSmallBigSidebar: () => {},
  setIsSidebarSmall: (isSidebarSmall: boolean) => {},
};

const SideBarContext = createContext(defaultCtx);

const SideBarContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSideBarOpen, setisSideBarOpen] = useState<boolean>(false);
  const [isSidebarSmall, setIsSidebarSmall] = useState<boolean>(false);

  function toggle() {
    setisSideBarOpen(!isSideBarOpen);
  }
  function toggleSmallBigSidebar() {
    setIsSidebarSmall(!isSidebarSmall);
  }

  return (
    <SideBarContext.Provider
      value={{
        isSideBarOpen,
        setisSideBarOpen,
        toggle,
        isSidebarSmall,
        toggleSmallBigSidebar,
        setIsSidebarSmall,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};

export function useSideBarControl() {
  const {
    isSideBarOpen,
    setisSideBarOpen,
    toggle,
    isSidebarSmall,
    toggleSmallBigSidebar,
    setIsSidebarSmall,
  } = useContext(SideBarContext);
  return {
    isSideBarOpen,
    setisSideBarOpen,
    toggle,
    isSidebarSmall,
    toggleSmallBigSidebar,
    setIsSidebarSmall,
  };
}

export default SideBarContextProvider;
