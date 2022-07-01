import { createContext, useState } from "react";

export const GlobalStates = createContext();

export default ({ children }) => {

    const [sidebarScrollPosition, setSidebarScrollPosition] = useState(0);
    const [theme, setTheme] = useState("light");
    const [gRefresh, setGRefresh] = useState(null);

    return (
        <GlobalStates.Provider value={{
            sidebarScrollPosition,
            setSidebarScrollPosition,
            theme,
            setTheme,
            gRefresh,
            setGRefresh
        }}>
            {children}
        </GlobalStates.Provider>
    );
};