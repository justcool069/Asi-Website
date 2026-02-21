"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Download, FileText, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ApplyPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        year: "",
        branch: "",
        motivation: ""
    });

    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const validate = () => {
        let err: any = {};
        if (!formData.name) err.name = "Name is required";
        if (!formData.email.includes("@")) err.email = "Valid email is required";
        if (!formData.year) err.year = "Year is required";
        if (!formData.branch) err.branch = "Branch is required";
        if (formData.motivation.length < 10) err.motivation = "Please provide more details";
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            try {
                const { error } = await supabase
                    .from('applications')
                    .insert([{
                        name: formData.name,
                        email: formData.email,
                        year: formData.year,
                        branch: formData.branch,
                        motivation: formData.motivation
                    }]);

                if (error) throw error;
                setShowSuccess(true);
                setFormData({ name: "", email: "", year: "", branch: "", motivation: "" });
            } catch (err: any) {
                alert("Error sending application: " + err.message);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-6 max-w-4xl mx-auto relative">

            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent-red)]/5 blur-[150px] rounded-full pointer-events-none z-[-1]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl md:text-6xl font-black mb-6">
                    Join the <span className="text-[var(--color-accent-red)]">Future</span>
                </h1>
                <p className="text-xl text-gray-400">
                    Apply for the ASI Student Chapter membership and accelerate your AI journey.
                </p>
            </motion.div>

            <div className="glass-card p-8 md:p-12 rounded-3xl border border-[var(--color-accent-red)]/20 shadow-2xl relative overflow-hidden">

                {/* Animated form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={`bg-black/50 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg p-4 text-white focus:outline-none focus:border-[var(--color-accent-red)] focus:shadow-[0_0_15px_rgba(225,6,0,0.5)] transition-all`}
                                placeholder="John Doe"
                            />
                            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`bg-black/50 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg p-4 text-white focus:outline-none focus:border-[var(--color-accent-red)] focus:shadow-[0_0_15px_rgba(225,6,0,0.5)] transition-all`}
                                placeholder="john@sathyabama.ac.in"
                            />
                            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Year of Study</label>
                            <select
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className={`bg-black/50 border ${errors.year ? 'border-red-500' : 'border-white/10'} rounded-lg p-4 text-white focus:outline-none focus:border-[var(--color-accent-red)] focus:shadow-[0_0_15px_rgba(225,6,0,0.5)] transition-all appearance-none`}
                            >
                                <option value="">Select Year</option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                            </select>
                            {errors.year && <span className="text-red-500 text-xs">{errors.year}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Branch / Dept</label>
                            <input
                                type="text"
                                value={formData.branch}
                                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                className={`bg-black/50 border ${errors.branch ? 'border-red-500' : 'border-white/10'} rounded-lg p-4 text-white focus:outline-none focus:border-[var(--color-accent-red)] focus:shadow-[0_0_15px_rgba(225,6,0,0.5)] transition-all`}
                                placeholder="CSE-AI"
                            />
                            {errors.branch && <span className="text-red-500 text-xs">{errors.branch}</span>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-300 uppercase tracking-wider">Why do you want to join ASI?</label>
                        <textarea
                            rows={4}
                            value={formData.motivation}
                            onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                            className={`bg-black/50 border ${errors.motivation ? 'border-red-500' : 'border-white/10'} rounded-lg p-4 text-white focus:outline-none focus:border-[var(--color-accent-red)] focus:shadow-[0_0_15px_rgba(225,6,0,0.5)] transition-all resize-none`}
                            placeholder="Tell us about your passion for AI and Data Science..."
                        />
                        {errors.motivation && <span className="text-red-500 text-xs">{errors.motivation}</span>}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
                        <a
                            href="/assets/dummy-membership-form.pdf"
                            download
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-[var(--color-accent-red)] transition-colors group"
                        >
                            <FileText size={18} className="group-hover:neon-glow" />
                            Download Offline Form (PDF)
                        </a>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-4 bg-[var(--color-accent-red)] text-white font-bold rounded-lg text-lg w-full sm:w-auto hover:bg-[var(--color-secondary-red)] neon-glow hover-neon-glow transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                            ) : (
                                <>Submit Application <Send size={20} className="group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="glass-card p-12 rounded-3xl border border-[var(--color-accent-red)] flex flex-col items-center text-center max-w-md w-full relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[var(--color-accent-red)]/10 neon-glow pointer-events-none" />
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                                className="w-24 h-24 bg-[var(--color-accent-red)]/20 rounded-full flex items-center justify-center mb-6"
                            >
                                <CheckCircle size={48} className="text-[var(--color-accent-red)] neon-glow" />
                            </motion.div>
                            <h2 className="text-3xl font-black text-white mb-4">Application Sent!</h2>
                            <p className="text-gray-400 mb-8">
                                Thank you for applying to the ASI Student Chapter. Our team will review your application and contact you soon.
                            </p>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="px-8 py-3 bg-[var(--color-accent-red)] text-white font-bold rounded-lg hover:bg-[var(--color-secondary-red)] neon-glow transition-all w-full"
                            >
                                Return to Home
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
