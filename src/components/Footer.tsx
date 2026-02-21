"use client";

import Link from "next/link";
import { Linkedin, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-black/50 backdrop-blur-md border-t border-white/5 pt-16 pb-8 mt-24">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Brand */}
                <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-red)] flex items-center justify-center text-white font-bold text-xl neon-glow">
                            A
                        </div>
                        <span className="font-bold text-xl tracking-tight">ASI Chapter</span>
                    </Link>
                    <p className="text-gray-400 text-sm mt-2">
                        Empowering Future AI & Data Leaders at Sathyabama University.
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                        <a href="#" className="text-gray-400 hover:text-[var(--color-accent-red)] hover-neon-glow transition-all p-2 rounded-full border border-gray-800 hover:border-red-500">
                            <Linkedin size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-[var(--color-accent-red)] hover-neon-glow transition-all p-2 rounded-full border border-gray-800 hover:border-red-500">
                            <Instagram size={18} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-[var(--color-accent-red)] hover-neon-glow transition-all p-2 rounded-full border border-gray-800 hover:border-red-500">
                            <Twitter size={18} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="col-span-1 flex flex-col gap-4">
                    <h3 className="font-bold text-lg text-white">Quick Links</h3>
                    <Link href="/about" className="text-gray-400 hover:text-[var(--color-accent-red)] transition-colors text-sm">About Us</Link>
                    <Link href="/events" className="text-gray-400 hover:text-[var(--color-accent-red)] transition-colors text-sm">Events</Link>
                    <Link href="/members" className="text-gray-400 hover:text-[var(--color-accent-red)] transition-colors text-sm">Members</Link>
                    <Link href="/apply" className="text-gray-400 hover:text-[var(--color-accent-red)] transition-colors text-sm">Join ASI</Link>
                    <Link href="/contact" className="text-gray-400 hover:text-[var(--color-accent-red)] transition-colors text-sm">Contact</Link>
                </div>

                {/* Contact info */}
                <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                    <h3 className="font-bold text-lg text-white">Contact Us</h3>
                    <div className="flex items-start gap-3 mt-2">
                        <MapPin size={20} className="text-[var(--color-accent-red)] mt-1 flex-shrink-0" />
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Sathyabama Institute of Science and Technology,<br />
                            Rajiv Gandhi Salai, Sholinganallur,<br />
                            Chennai, Tamil Nadu 600119
                        </p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                        <Mail size={20} className="text-[var(--color-accent-red)]" />
                        <a href="mailto:asi-chapter@example.com" className="text-gray-400 text-sm hover:text-[var(--color-accent-red)]">
                            asi-chapter@example.com
                        </a>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                        <Phone size={20} className="text-[var(--color-accent-red)]" />
                        <p className="text-gray-400 text-sm">+91 XXXXX XXXXX</p>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
                <p className="text-gray-500 text-xs">
                    © {new Date().getFullYear()} ASI Student Chapter, Sathyabama University. All Rights Reserved.
                </p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link href="/privacy" className="text-gray-500 text-xs hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="text-gray-500 text-xs hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
