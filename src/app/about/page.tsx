"use client";

import { motion } from "framer-motion";
import { Target, Eye, Code, Users, Rocket, Brain } from "lucide-react";

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const whyJoinUs = [
    {
        icon: <Code size={36} />,
        title: "Industry Ready Projects",
        desc: "Work on real-world datasets and advanced AI algorithms.",
    },
    {
        icon: <Users size={36} />,
        title: "Elite Community",
        desc: "Network with like-minded peers, alumni, and industry experts.",
    },
    {
        icon: <Rocket size={36} />,
        title: "Skill Launchpad",
        desc: "Exclusive workshops, bootcamps, and hackathon mentorship.",
    },
    {
        icon: <Brain size={36} />,
        title: "AI Research",
        desc: "Opportunities to co-author papers and participate in conferences.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-16 px-6 relative max-w-7xl mx-auto">

            {/* Red ambient background glow */}
            <div className="absolute top-40 right-10 w-[500px] h-[500px] bg-[var(--color-accent-red)]/10 blur-[120px] rounded-full pointer-events-none z-[-1]" />

            <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center mb-20">
                <h1 className="text-5xl md:text-6xl font-black mb-6">
                    Who <span className="text-[var(--color-accent-red)]">We Are</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    The Analytics Society of India (ASI) Student Chapter at Sathyabama University is a premier community of AI enthusiasts, data scientists, and future tech leaders.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                {/* Mission Card */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="glass-card p-10 rounded-2xl border border-[var(--color-accent-red)]/20 hover:border-[var(--color-accent-red)]/60 transition-all duration-300 hover:-translate-y-2 hover-neon-glow"
                >
                    <div className="w-16 h-16 rounded-xl bg-[var(--color-accent-red)]/10 flex items-center justify-center mb-6">
                        <Target size={32} className="text-[var(--color-accent-red)]" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        To foster a culture of data-driven innovation and empower students with practical AI skills, bridging the gap between academic theory and industry demands.
                    </p>
                </motion.div>

                {/* Vision Card */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className="glass-card p-10 rounded-2xl border border-[var(--color-accent-red)]/20 hover:border-[var(--color-accent-red)]/60 transition-all duration-300 hover:-translate-y-2 hover-neon-glow"
                >
                    <div className="w-16 h-16 rounded-xl bg-[var(--color-accent-red)]/10 flex items-center justify-center mb-6">
                        <Eye size={32} className="text-[var(--color-accent-red)]" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        To become the leading hub for AI and Data Science excellence, shaping students into visionary leaders capable of solving complex global challenges.
                    </p>
                </motion.div>
            </div>

            {/* Why Join Us */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mt-10">
                <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-black text-center mb-16">
                    Why <span className="text-[var(--color-accent-red)]">Join Us?</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {whyJoinUs.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={fadeIn}
                            className="glass-card p-8 rounded-2xl border border-white/5 hover:border-[var(--color-accent-red)]/50 transition-all duration-300 hover:-translate-y-3 hover-neon-glow group"
                        >
                            <div className="text-[var(--color-accent-red)] mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

        </div>
    );
}
