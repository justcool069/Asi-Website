"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Users, Zap } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden min-h-screen">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-10 px-6">
        {/* Red gradient glow background behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent-red)]/10 blur-[100px] rounded-full pointer-events-none z-[-1]" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center w-full max-w-5xl mx-auto z-10"
        >
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-8">
            <img src="/images/asi-logo.png" alt="ASI Logo" className="w-24 h-24 sm:w-28 sm:h-28 object-contain filter drop-shadow-[0_0_15px_rgba(225,6,0,0.6)]" />
            <div className="hidden sm:block w-[1px] h-16 bg-white/20"></div>
            <img src="/images/sathyabama-logo.png" alt="Sathyabama University Logo" className="h-16 sm:h-20 w-auto object-contain bg-white/10 rounded-2xl p-3 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
          </motion.div>

          <motion.div variants={fadeIn} className="mb-4 inline-block px-4 py-1.5 rounded-full border border-[var(--color-accent-red)]/30 bg-[var(--color-accent-red)]/10 text-[var(--color-accent-red)] font-semibold text-sm neon-glow backdrop-blur-md">
            Sathyabama University
          </motion.div>

          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-tight">
            ASI <span className="text-[var(--color-accent-red)]">Student</span><br />
            Chapter
          </motion.h1>

          <motion.p variants={fadeIn} className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Empowering Future <span className="text-black dark:text-white font-bold">AI</span> & <span className="text-black dark:text-white font-bold">Data Leaders</span> through innovation, collaboration, and cutting-edge technology.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/apply"
              className="px-8 py-4 bg-[var(--color-accent-red)] text-white font-bold rounded-lg text-lg w-full sm:w-auto hover:bg-[var(--color-secondary-red)] neon-glow hover-neon-glow transition-all flex items-center justify-center gap-2 group"
            >
              Join Now
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/events"
              className="px-8 py-4 bg-transparent border-2 border-[var(--color-accent-red)] text-black dark:text-white font-bold rounded-lg text-lg w-full sm:w-auto hover:bg-[var(--color-accent-red)]/10 transition-all flex items-center justify-center gap-2"
            >
              Explore Events
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-28 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 z-10"
        >
          {/* Using raw HTML structure here for immediate display without intersecting bug */}
          <div className="flex flex-col items-center justify-center p-8 glass-card rounded-2xl border border-black/5 dark:border-white/5 hover:border-[var(--color-accent-red)]/50 hover-neon-glow transition-all duration-300 group">
            <Users size={32} className="text-[var(--color-accent-red)] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-4xl font-black text-black dark:text-white">0</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest">Active Members</p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 glass-card rounded-2xl border border-black/5 dark:border-white/5 hover:border-[var(--color-accent-red)]/50 hover-neon-glow transition-all duration-300 group">
            <Calendar size={32} className="text-[var(--color-accent-red)] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-4xl font-black text-black dark:text-white">0</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest">Events Conducted</p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 glass-card rounded-2xl border border-black/5 dark:border-white/5 hover:border-[var(--color-accent-red)]/50 hover-neon-glow transition-all duration-300 group">
            <Zap size={32} className="text-[var(--color-accent-red)] mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-4xl font-black text-black dark:text-white">0</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest">Hackathons Won</p>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
