"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const { theme } = useTheme();

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - (isHovering ? 20 : 10));
            cursorY.set(e.clientY - (isHovering ? 20 : 10));
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("button") ||
                target.closest("a")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY, isHovering]);

    // Disable default cursor by setting basic CSS on body is normally done in global css
    // but we only want it strictly on non-touch devices ideally.

    return (
        <motion.div
            className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block`}
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                width: isHovering ? 40 : 20,
                height: isHovering ? 40 : 20,
                backgroundColor: theme === "dark" ? "#E10600" : "#FF3B3B", // Red neon color
                boxShadow: isHovering
                    ? "0 0 25px 8px rgba(225, 6, 0, 0.7)"
                    : "0 0 10px 2px rgba(225, 6, 0, 0.4)",
                transition: "width 0.2s, height 0.2s, box-shadow 0.2s",
            }}
        />
    );
}
