import { createContext, useContext, useState } from 'react';

const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
    const [isSideBarOpen, setSideBarOpen] = useState(false);

    const toggleSideBar = () =>{ console.log(isSideBarOpen); setSideBarOpen(prev=>!prev)};
    const closeSideBar = () => { console.log(isSideBarOpen); setSideBarOpen(false)};

    return (
        <SideBarContext.Provider value={{ isSideBarOpen, toggleSideBar, closeSideBar }}>
            {children}
        </SideBarContext.Provider>
    );
};
export const useSideBar = () => useContext(SideBarContext);