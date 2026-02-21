"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Linkedin, Filter } from "lucide-react";

// Mock Data
const membersList = [
    { id: 1, name: "Arvind", role: "President", type: "Core Team", image: "https://i.pravatar.cc/300?img=11", linkedin: "#" },
    { id: 2, name: "Sneha", role: "Vice President", type: "Core Team", image: "https://i.pravatar.cc/300?img=5", linkedin: "#" },
    { id: 3, name: "Rahul", role: "Lead Developer", type: "Core Team", image: "https://i.pravatar.cc/300?img=8", linkedin: "#" },
    { id: 4, name: "Priya", role: "Events Head", type: "Core Team", image: "https://i.pravatar.cc/300?img=9", linkedin: "#" },
    { id: 5, name: "Karan", role: "Active Member", type: "Members", image: "https://i.pravatar.cc/300?img=12", linkedin: "#" },
    { id: 6, name: "Anjali", role: "Active Member", type: "Members", image: "https://i.pravatar.cc/300?img=20", linkedin: "#" },
    { id: 7, name: "Vikram", role: "Active Member", type: "Members", image: "https://i.pravatar.cc/300?img=33", linkedin: "#" },
    { id: 8, name: "Nisha", role: "Active Member", type: "Members", image: "https://i.pravatar.cc/300?img=40", linkedin: "#" },
];

export default function MembersPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const filteredMembers = useMemo(() => {
        return membersList.filter((m) => {
            const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase());
            const matchFilter = filter === "All" || m.type === filter;
            return matchSearch && matchFilter;
        });
    }, [search, filter]);

    return (
        <div className="min-h-screen pt-24 pb-16 px-6 max-w-7xl mx-auto">

            {/* Red ambient background glow */}
            <div className="fixed top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--color-accent-red)]/5 blur-[150px] rounded-full pointer-events-none z-[-1]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h1 className="text-5xl md:text-7xl font-black mb-6">
                    Our <span className="text-[var(--color-accent-red)]">Members</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Meet the brilliant minds driving the AI & Data revolution at Sathyabama University.
                </p>
            </motion.div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-16 items-center justify-between glass-card p-4 rounded-xl border border-white/10 relative z-10 w-full max-w-4xl mx-auto">

                {/* Search */}
                <div className="relative w-full md:w-2/3">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or role..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[var(--color-accent-red)] transition-colors neon-glow focus:shadow-[0_0_15px_rgba(225,6,0,0.5)]"
                    />
                </div>

                {/* Filter */}
                <div className="relative w-full md:w-1/3 flex items-center gap-2">
                    <Filter className="text-gray-400" size={20} />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[var(--color-accent-red)] transition-colors appearance-none cursor-pointer"
                    >
                        <option value="All">All Members</option>
                        <option value="Core Team">Core Team</option>
                        <option value="Members">Active Members</option>
                    </select>
                </div>
            </div>

            {/* Grid */}
            {filteredMembers.length > 0 ? (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
                >
                    {filteredMembers.map((member) => (
                        <TiltCard key={member.id} member={member} />
                    ))}
                </motion.div>
            ) : (
                <div className="text-center text-gray-500 py-20 text-xl font-bold">
                    No members found matching your criteria.
                </div>
            )}

        </div>
    );
}

function TiltCard({ member }: { member: any }) {
    // Simple JS tilt effect
    const [style, setStyle] = useState({});

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const box = card.getBoundingClientRect();
        const x = e.clientX - box.left;
        const y = e.clientY - box.top;
        const centerX = box.width / 2;
        const centerY = box.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
            transition: "transform 0.1s ease-out"
        });
    };

    const handleMouseLeave = () => {
        setStyle({
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
            transition: "transform 0.5s ease-out"
        });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-[var(--color-accent-red)] hover:shadow-[0_0_25px_rgba(225,6,0,0.5)] transition-all duration-300 group cursor-pointer group flex flex-col items-center p-6"
            style={style}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[var(--color-accent-red)] mb-6 transition-colors shadow-lg">
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
            </div>

            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[var(--color-accent-red)] transition-colors">{member.name}</h3>
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">{member.role}</p>

            <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-gray-500 mb-6 group-hover:bg-[var(--color-accent-red)]/10 group-hover:text-[var(--color-accent-red)] transition-all">
                {member.type}
            </span>

            <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#0077b5] group-hover:text-white transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            >
                <Linkedin size={18} />
            </a>
        </motion.div>
    );
}
