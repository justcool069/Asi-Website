"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, User, MapPin, Send, Instagram, Linkedin, Twitter } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from('contact_messages')
                .insert([{ name: formData.name, email: formData.email, message: formData.message }]);

            if (error) throw error;
            alert("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } catch (err: any) {
            alert("Error sending message: " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-6 max-w-7xl mx-auto relative">
            <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[var(--color-accent-red)]/5 blur-[150px] rounded-full pointer-events-none z-[-1]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-5xl md:text-7xl font-black mb-6">
                    Get in <span className="text-[var(--color-accent-red)]">Touch</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Have any questions? Reach out to us and we'll get back to you shortly.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                {/* Contact Info & Map */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex flex-col gap-8">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-[var(--color-accent-red)]/50 transition-colors group flex items-start gap-4">
                            <div className="p-3 bg-[var(--color-accent-red)]/10 rounded-lg group-hover:bg-[var(--color-accent-red)] transition-colors">
                                <Phone size={24} className="text-[var(--color-accent-red)] group-hover:text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Phone</h3>
                                <p className="text-gray-400">+91 98765 43210</p>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-[var(--color-accent-red)]/50 transition-colors group flex items-start gap-4">
                            <div className="p-3 bg-[var(--color-accent-red)]/10 rounded-lg group-hover:bg-[var(--color-accent-red)] transition-colors">
                                <Mail size={24} className="text-[var(--color-accent-red)] group-hover:text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                                <p className="text-gray-400">contact@asisba.in</p>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-[var(--color-accent-red)]/50 transition-colors group flex items-start gap-4 sm:col-span-2">
                            <div className="p-3 bg-[var(--color-accent-red)]/10 rounded-lg group-hover:bg-[var(--color-accent-red)] transition-colors">
                                <User size={24} className="text-[var(--color-accent-red)] group-hover:text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Faculty Coordinator</h3>
                                <p className="text-gray-400">Dr. XYZ, Dept of CSE, Sathyabama University</p>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl overflow-hidden border border-white/10 h-[300px] relative group hover:border-[var(--color-accent-red)]/50 transition-colors">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15555.337039014164!2d80.21147071644084!3d12.871146607248384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525b8cbaaa79eb%3A0x673418e97491cf66!2sSathyabama%20Institute%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1703080000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(120%)" }}
                            allowFullScreen={false}
                            loading="lazy"
                        ></iframe>
                        <div className="absolute inset-0 pointer-events-none group-hover:shadow-[inset_0_0_20px_rgba(225,6,0,0.3)] transition-shadow" />
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">Follow Us</span>
                        <div className="h-[1px] flex-grow bg-white/10" />
                        <div className="flex gap-4">
                            {[Instagram, Linkedin, Twitter].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[var(--color-accent-red)] hover:text-white transition-all hover:neon-glow hover:-translate-y-1">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-card p-8 md:p-10 rounded-3xl border border-[var(--color-accent-red)]/20 shadow-2xl relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent-red)]/10 blur-[50px] rounded-full" />
                    <h2 className="text-3xl font-bold text-white mb-8">Send a Message</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Your Name</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-[var(--color-accent-red)] focus:shadow-[0_0_15px_rgba(225,6,0,0.5)] transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                            <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-[var(--color-accent-red)] focus:shadow-[0_0_15px_rgba(225,6,0,0.5)] transition-all"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Message</label>
                            <textarea
                                required
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-[var(--color-accent-red)] focus:shadow-[0_0_15px_rgba(225,6,0,0.5)] transition-all resize-none"
                                placeholder="How can we help you?"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 px-8 py-4 bg-[var(--color-accent-red)] text-white font-bold rounded-lg text-lg w-full hover:bg-[var(--color-secondary-red)] neon-glow hover-neon-glow transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                            ) : (
                                <>Send Message <Send size={20} className="group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
