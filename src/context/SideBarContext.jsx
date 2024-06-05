import { createContext, useContext, useState } from 'react';

const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
    const [isSideBarOpen, setSideBarOpen] = useState(false);

    const toggleSideBar = () =>setSideBarOpen(prev=>!prev);
    const closeSideBar = () => setSideBarOpen(false);

    return (
        <SideBarContext.Provider value={{ isSideBarOpen, toggleSideBar, closeSideBar }}>
            {children}
        </SideBarContext.Provider>
    );
};
export const useSideBar = () => useContext(SideBarContext);