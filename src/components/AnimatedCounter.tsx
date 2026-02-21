"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CounterProps {
    end: number;
    duration?: number;
    label: string;
}

export default function AnimatedCounter({ end, duration = 2, label }: CounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            let start = 0;
            const endVal = parseInt(end.toString().substring(0, 3));
            if (start === endVal) return;

            const incrementTime = (duration / endVal) * 1000;
            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === endVal) clearInterval(timer);
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [inView, end, duration]);

    // Handle + string appending if needed
    const displayCount = end > 99 ? count + "+" : count;

    return (
        <div ref={ref} className="flex flex-col items-center justify-center p-6 glass-card rounded-2xl border border-[var(--color-accent-red)]/20 hover-neon-glow transition-all duration-300">
            <motion.h3
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5 }}
                transition={{ duration: 0.5 }}
                className="text-5xl font-extrabold text-[var(--color-accent-red)]"
            >
                {displayCount}
            </motion.h3>
            <p className="mt-2 text-lg font-semibold text-gray-300 tracking-wider uppercase text-center">{label}</p>
        </div>
    );
}
