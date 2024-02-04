import { createContext, useState } from "react";

export const ThemeContext = createContext({isDark: true})

export const ThemeProvider = ({children}) => {

    const [isDark, setIsDark] = useState(true)

    return (
        <ThemeContext.Provider value={{isDark, setIsDark}}>
            {children}
        </ThemeContext.Provider>
    )
}

