"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUICK_MESSAGES = [
    "I want to plan a wedding 💍",
    "I need a corporate event 🏢",
    "Planning a birthday party 🎂",
    "I want a general quote 📋",
];

export default function WhatsAppButton() {
    const [open, setOpen] = useState(false);
    const PHONE = "2348142856571";
    const BASE_URL = `https://wa.me/${PHONE}?text=`;

    return (
        <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-2xl shadow-2xl border border-black/5 w-72 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-[#25D366] px-4 py-3 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-extrabold text-sm">
                                A
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm">Aura Events</p>
                                <p className="text-white/70 text-xs">Typically replies within 1 hour</p>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="ml-auto text-white/70 hover:text-white text-lg"
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>

                        {/* Chat bubble */}
                        <div className="p-4 bg-[#ece5dd]">
                            <div className="bg-white rounded-xl rounded-tl-none px-4 py-3 shadow-sm max-w-[90%] text-sm text-black/80 leading-relaxed">
                                👋 Hi! I&apos;m ready to help you plan your dream event. What are you working on?
                            </div>
                        </div>

                        {/* Quick messages */}
                        <div className="p-3 bg-white flex flex-col gap-2 border-t border-black/5">
                            <p className="text-[10px] text-black/40 font-bold uppercase tracking-wider px-1">Quick start</p>
                            {QUICK_MESSAGES.map((msg) => (
                                <a
                                    key={msg}
                                    href={`${BASE_URL}${encodeURIComponent(msg)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-xl border border-black/10 px-3 py-2 text-xs font-semibold hover:bg-[#25D366] hover:text-white hover:border-transparent transition"
                                >
                                    {msg}
                                </a>
                            ))}
                            <a
                                href={`${BASE_URL}${encodeURIComponent("Hello, I'd like to enquire about your event planning services.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white text-xs font-bold py-2.5 mt-1 hover:bg-[#1ebe5d] transition"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.1 1.51 5.83L.057 23.625a.5.5 0 0 0 .618.618l5.794-1.453A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.955 9.955 0 0 1-5.088-1.393l-.364-.217-3.779.947.963-3.78-.236-.372A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                                </svg>
                                Open WhatsApp
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main FAB */}
            <motion.button
                onClick={() => setOpen((v) => !v)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-green-500/30 flex items-center justify-center text-white relative"
                aria-label="Open WhatsApp chat"
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="text-xl font-light">×</motion.span>
                    ) : (
                        <motion.svg key="icon" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.1 1.51 5.83L.057 23.625a.5.5 0 0 0 .618.618l5.794-1.453A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.955 9.955 0 0 1-5.088-1.393l-.364-.217-3.779.947.963-3.78-.236-.372A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                        </motion.svg>
                    )}
                </AnimatePresence>

                {/* Ping animation when closed */}
                {!open && (
                    <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-gold ring-2 ring-white animate-bounce" />
                )}
            </motion.button>
        </div>
    );
}
