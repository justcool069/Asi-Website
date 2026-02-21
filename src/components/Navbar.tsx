"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Members", path: "/members" },
    { name: "Events", path: "/events" },
    { name: "Contact", path: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                        ? "bg-[var(--color-glass)] backdrop-blur-md border-b border-white/10 shadow-lg"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-red)] flex items-center justify-center text-white font-bold text-xl neon-glow">
                            A
                        </div>
                        <span className="font-bold text-xl tracking-tight hidden sm:block">
                            ASI <span className="text-[var(--color-accent-red)]">Chapter</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`relative font-medium text-sm transition-colors hover:text-[var(--color-accent-red)] ${pathname === link.path ? "text-[var(--color-accent-red)]" : "text-[var(--color-text-primary)] dark:text-white"
                                    }`}
                            >
                                {link.name}
                                {pathname === link.path && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute left-0 top-full h-[2px] w-full bg-[var(--color-accent-red)] mt-1 neon-glow"
                                    />
                                )}
                            </Link>
                        ))}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <Link
                            href="/apply"
                            className="px-5 py-2 rounded-md bg-[var(--color-accent-red)] text-white hover:bg-[var(--color-secondary-red)] hover:neon-glow transition-all duration-300 font-semibold"
                        >
                            Apply Now
                        </Link>
                    </nav>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-[var(--color-primary-bg)]/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col gap-6"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`text-2xl font-bold ${pathname === link.path ? "text-[var(--color-accent-red)]" : ""
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/apply"
                            onClick={() => setIsOpen(false)}
                            className="mt-4 px-6 py-3 rounded-md bg-[var(--color-accent-red)] text-white text-center font-bold text-lg neon-glow"
                        >
                            Apply Now
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
