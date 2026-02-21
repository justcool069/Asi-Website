"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, X, FileText } from "lucide-react";

// Mock Data
const upcomingEvents = [
    { id: 1, title: "AI Horizons Summit", date: "2026-03-15", time: "10:00 AM", location: "Main Auditorium", type: "Conference", desc: "A deep dive into the future of LLMs and generative AI with industry leaders." },
    { id: 2, title: "DataHack 2026", date: "2026-04-05", time: "09:00 AM", location: "Computer Lab 4", type: "Hackathon", desc: "48-hour hackathon focused on predictive modeling for social good." }
];

const pastEvents = [
    { id: 3, title: "Intro to Neural Networks", date: "2026-01-20", time: "02:00 PM", location: "Seminar Hall" },
    { id: 4, title: "Cloud AI Workshop", date: "2025-11-15", time: "11:00 AM", location: "Virtual" }
];

export default function EventsPage() {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    // For Registration + OD PDF inside Modal
    const [formData, setFormData] = useState({ name: "", roll: "", dept: "" });

    const handleApplyClick = (event: any) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleGenerateOD = (e: React.FormEvent) => {
        e.preventDefault();
        // Generate simple printable OD Request structure in a new window
        const win = window.open("", "_blank");
        if (win) {
            win.document.write(`
        <html><head><title>OD Request - ${formData.name}</title>
        <style>body{font-family:sans-serif; padding:40px; line-height:1.6;} h1{text-align:center; color:#E10600;} .content{margin-top:40px;}</style>
        </head><body>
          <h1>ON-DUTY REQUEST FORM</h1>
          <div class="content">
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>To:</strong> The Head of Department, ${formData.dept || '_________'}</p>
            <p><strong>Subject:</strong> Requisition for On-Duty (OD)</p>
            <p>Respected Sir/Madam,</p>
            <p>I, <strong>${formData.name || '_________'}</strong> (Roll No: <strong>${formData.roll || '_________'}</strong>), request you to kindly grant me On-Duty on <strong>${selectedEvent?.date}</strong> to attend the <strong>${selectedEvent?.title}</strong> organized by the ASI Student Chapter.</p>
            <p>Thank you,</p>
            <br/><br/>
            <p>Signature of Student: ___________________</p>
            <p>Signature of HOD: ___________________</p>
          </div>
          <script>window.print();</script>
        </body></html>
      `);
            win.document.close();
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-6 max-w-7xl mx-auto relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-accent-red)]/10 blur-[150px] rounded-full pointer-events-none z-[-1]" />

            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-black mb-6">
                    Our <span className="text-[var(--color-accent-red)]">Events</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    From intensive hackathons to visionary talks, see what's happening at ASI.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 relative z-10">
                {["upcoming", "past", "calendar"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-8 py-3 rounded-full font-bold transition-all text-sm uppercase tracking-wider ${activeTab === tab
                                ? "bg-[var(--color-accent-red)] text-white neon-glow"
                                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                            }`}
                    >
                        {tab === "upcoming" ? "Upcoming" : tab === "past" ? "Past & Timeline" : "Calendar"}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 w-full">
                {activeTab === "upcoming" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {upcomingEvents.map((evt) => (
                            <div key={evt.id} className="glass-card-dark p-8 rounded-2xl border border-white/5 hover:border-[var(--color-accent-red)]/50 transition-all duration-300 hover:neon-glow hover:-translate-y-2 group flex flex-col items-start">
                                <span className="px-3 py-1 bg-[var(--color-accent-red)]/20 text-[var(--color-accent-red)] text-xs font-bold rounded-full mb-4 group-hover:bg-[var(--color-accent-red)] group-hover:text-white transition-colors">
                                    {evt.type}
                                </span>
                                <h3 className="text-3xl font-bold text-white mb-2">{evt.title}</h3>
                                <p className="text-gray-400 mb-6 line-clamp-2">{evt.desc}</p>
                                <div className="flex flex-col gap-2 mb-8 text-sm text-gray-300 w-full">
                                    <div className="flex items-center gap-3"><CalendarIcon size={16} className="text-[var(--color-accent-red)]" /> {evt.date}</div>
                                    <div className="flex items-center gap-3"><Clock size={16} className="text-[var(--color-accent-red)]" /> {evt.time}</div>
                                    <div className="flex items-center gap-3"><MapPin size={16} className="text-[var(--color-accent-red)]" /> {evt.location}</div>
                                </div>
                                <button
                                    onClick={() => handleApplyClick(evt)}
                                    className="mt-auto flex items-center gap-2 text-[var(--color-accent-red)] font-bold group-hover:text-white transition-colors py-2 px-6 border border-[var(--color-accent-red)] rounded-lg hover:bg-[var(--color-accent-red)] w-full justify-center"
                                >
                                    Apply Now <ArrowRight size={16} />
                                </button>
                            </div>
                        ))}
                    </motion.div>
                )}

                {activeTab === "past" && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
                        <h2 className="text-3xl font-black text-white mb-12">Event Timeline</h2>
                        <div className="relative border-l-2 border-[var(--color-accent-red)]/30 pl-8 ml-4 md:ml-0 md:pl-0 list-none space-y-12 max-w-3xl w-full before:absolute md:before:left-1/2 before:left-0 md:before:-translate-x-[1px] before:top-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-[var(--color-accent-red)] before:to-transparent">
                            {pastEvents.map((evt, i) => (
                                <div key={evt.id} className={`relative flex items-center md:justify-between w-full ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                                    {/* Timeline Dot */}
                                    <div className="absolute left-[-41px] md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-black border-4 border-[var(--color-accent-red)] neon-glow z-10 shadow-[0_0_15px_rgba(225,6,0,0.8)]" />

                                    {/* Content Box */}
                                    <div className={`w-full md:w-5/12 ${i % 2 === 0 ? "text-left md:text-left md:pl-8" : "text-left md:text-right md:pr-8"}`}>
                                        <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-[var(--color-accent-red)]/30 hover:neon-glow transition-colors">
                                            <span className="text-[var(--color-accent-red)] font-bold text-sm">{evt.date}</span>
                                            <h3 className="text-xl font-bold text-white mt-2">{evt.title}</h3>
                                            <p className="text-gray-400 mt-2 text-sm">{evt.location} • {evt.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === "calendar" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 custom-calendar-wrapper">
                        <style jsx global>{`
              .fc-theme-standard td, .fc-theme-standard th { border-color: rgba(255,255,255,0.1); }
              .fc { color: #fff; }
              .fc-day-today { background: rgba(225, 6, 0, 0.1) !important; }
              .fc-event { background-color: #E10600 !important; border:none; cursor: pointer; padding: 2px 4px; box-shadow: 0 0 10px rgba(225,6,0,0.5); }
              .fc-button-primary { background-color: rgba(255,255,255,0.1) !important; border:none !important; }
              .fc-button-active { background-color: #E10600 !important; }
            `}</style>
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={[...upcomingEvents, ...pastEvents].map(e => ({ title: e.title, date: e.date, extendedProps: e }))}
                            eventClick={(info) => {
                                setSelectedEvent(info.event.extendedProps);
                                setShowModal(true);
                            }}
                            headerToolbar={{ left: 'prev,next', center: 'title', right: 'dayGridMonth,dayGridWeek' }}
                            height="auto"
                        />
                    </motion.div>
                )}
            </div>

            {/* Registration Modal */}
            <AnimatePresence>
                {showModal && selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="glass-card p-8 rounded-3xl border border-[var(--color-accent-red)] w-full max-w-lg relative bg-[#0a0a0a] overflow-hidden"
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-accent-red)] neon-glow" />

                            <h2 className="text-2xl font-black text-white pr-8 mb-2">{selectedEvent.title}</h2>
                            <p className="text-[var(--color-accent-red)] font-bold mb-6 flex items-center gap-2">
                                <CalendarIcon size={16} /> {selectedEvent.date} @ {selectedEvent.time}
                            </p>

                            <form onSubmit={handleGenerateOD} className="flex flex-col gap-4 mt-6">
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Full Name</label>
                                    <input required placeholder="Student Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-accent-red)] transition-colors" />
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1/2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Roll No</label>
                                        <input required placeholder="Register Number" value={formData.roll} onChange={e => setFormData({ ...formData, roll: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-accent-red)] transition-colors" />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Dept</label>
                                        <input required placeholder="E.g., CSE" value={formData.dept} onChange={e => setFormData({ ...formData, dept: e.target.value })} className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-accent-red)] transition-colors" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 mt-4">
                                    <button type="button" onClick={() => { alert("Registered successfully!"); setShowModal(false); }} className="w-full py-3 bg-[var(--color-accent-red)] hover:bg-[var(--color-secondary-red)] neon-glow transition-colors text-white font-bold rounded-lg uppercase tracking-widest text-sm">
                                        Register for Event
                                    </button>
                                    <button type="submit" className="w-full py-3 bg-transparent border border-[var(--color-accent-red)] hover:bg-[var(--color-accent-red)]/10 transition-colors text-[var(--color-accent-red)] font-bold rounded-lg uppercase tracking-widest text-sm flex justify-center items-center gap-2">
                                        <FileText size={18} /> Generate OD PDF
                                    </button>
                                </div>
                            </form>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
