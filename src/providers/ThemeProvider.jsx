import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({isDark: true})

export const ThemeProvider = ({children}) => {

    const [isDark, setIsDark] = useState(localStorage.getItem('theme') === 'true' ? true : false);

    useEffect(() => {
        localStorage.setItem("theme", isDark);
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{isDark, setIsDark}}>
            {children}
        </ThemeContext.Provider>
    )
}

