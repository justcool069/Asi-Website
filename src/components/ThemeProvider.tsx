"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        // Check localStorage
        const savedTheme = localStorage.getItem("asi-theme") as Theme | null;
        if (savedTheme === "light") {
            setTheme("light");
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
        } else {
            // Default to dark
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
            setTheme("dark");
        }
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === "dark" ? "light" : "dark";
            localStorage.setItem("asi-theme", newTheme);
            if (newTheme === "light") {
                document.documentElement.classList.remove("dark");
                document.documentElement.classList.add("light");
            } else {
                document.documentElement.classList.remove("light");
                document.documentElement.classList.add("dark");
            }
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
