"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Simulated booked dates (in a real app, these come from an API/CMS)
const BOOKED_DATES: Record<string, string[]> = {
    "2026-08": ["04", "08", "15", "16", "22", "29"],
    "2026-09": ["05", "06", "12", "19", "20", "26"],
    "2026-10": ["03", "10", "17", "24", "25", "31"],
    "2026-11": ["07", "14", "21", "28"],
    "2026-12": ["05", "12", "19", "20", "24", "25", "26", "31"],
};

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

export default function AvailabilityCalendar() {
    const today = new Date();
    const [year, setYear] = useState(2026);
    const [month, setMonth] = useState(7); // Aug 2026
    const [selected, setSelected] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
    const bookedSet = new Set(BOOKED_DATES[monthKey] || []);
    const days = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const prevMonth = () => {
        if (month === 0) { setMonth(11); setYear(y => y - 1); }
        else setMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (month === 11) { setMonth(0); setYear(y => y + 1); }
        else setMonth(m => m + 1);
    };

    const handleDay = (day: number) => {
        const dayStr = String(day).padStart(2, "0");
        if (bookedSet.has(dayStr)) return;
        setSelected(`${year}-${String(month + 1).padStart(2, "0")}-${dayStr}`);
        setShowModal(true);
    };

    const isToday = (day: number) => {
        return year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
    };
    const isPast = (day: number) => {
        return new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    };

    return (
        <section className="page-wrap section-y" id="availability">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Left: copy */}
                <div>
                    <p className="uppercase tracking-widest text-xs text-black/40 mb-3">Book a date</p>
                    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
                        Check our availability <br />& book your slot
                    </h2>
                    <p className="text-black/60 leading-relaxed mb-8">
                        We take a limited number of events per month to ensure every client gets our full attention. Pick an open date for a consultation or to lock in your event date.
                    </p>
                    <div className="flex flex-col gap-3 text-sm">
                        {[
                            { color: "bg-white border-2 border-black/10", label: "Available — click to book" },
                            { color: "bg-gold-light", label: "Your selected date" },
                            { color: "bg-black/15", label: "Booked / unavailable" },
                            { color: "bg-black", label: "Today" },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-lg ${item.color} shrink-0`} />
                                <span className="text-black/60">{item.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 rounded-2xl bg-gold-pale border border-gold/20 p-5">
                        <p className="text-sm font-bold mb-1">⚡ Quick booking</p>
                        <p className="text-xs text-black/60">
                            Select an available date to instantly request a consultation slot. We confirm within 2 hours on business days.
                        </p>
                    </div>
                </div>

                {/* Right: calendar */}
                <div className="rounded-3xl border border-black/5 bg-white shadow-md p-6">
                    {/* Calendar header */}
                    <div className="flex items-center justify-between mb-6">
                        <button onClick={prevMonth} className="w-9 h-9 rounded-xl border border-black/10 flex items-center justify-center hover:bg-black/5 transition">
                            ←
                        </button>
                        <h3 className="font-extrabold text-lg">{MONTH_NAMES[month]} {year}</h3>
                        <button onClick={nextMonth} className="w-9 h-9 rounded-xl border border-black/10 flex items-center justify-center hover:bg-black/5 transition">
                            →
                        </button>
                    </div>

                    {/* Day labels */}
                    <div className="grid grid-cols-7 mb-2">
                        {DAY_NAMES.map((d) => (
                            <div key={d} className="text-center text-[10px] font-bold uppercase tracking-wider text-black/30 py-1">
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* Day grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {/* Empty cells for first week */}
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} />
                        ))}

                        {Array.from({ length: days }).map((_, i) => {
                            const day = i + 1;
                            const dayStr = String(day).padStart(2, "0");
                            const isBooked = bookedSet.has(dayStr);
                            const isPastDay = isPast(day);
                            const isTodayDay = isToday(day);
                            const selStr = `${year}-${String(month + 1).padStart(2, "0")}-${dayStr}`;
                            const isSelected = selected === selStr;

                            return (
                                <motion.button
                                    key={day}
                                    whileTap={{ scale: isBooked || isPastDay ? 1 : 0.92 }}
                                    onClick={() => !isPastDay && handleDay(day)}
                                    disabled={isBooked || isPastDay}
                                    className={`
                    aspect-square rounded-xl text-sm font-semibold transition-all flex items-center justify-center
                    ${isSelected ? "bg-gold-light text-white shadow-lg scale-105" : ""}
                    ${isTodayDay && !isSelected ? "bg-black text-white" : ""}
                    ${isBooked ? "bg-black/8 text-black/25 cursor-not-allowed line-through" : ""}
                    ${isPastDay && !isTodayDay ? "text-black/20 cursor-not-allowed" : ""}
                    ${!isBooked && !isPastDay && !isSelected && !isTodayDay ? "hover:bg-gold-pale hover:text-gold cursor-pointer" : ""}
                  `}
                                >
                                    {day}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Availability summary */}
                    <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between text-xs text-black/40">
                        <span>{days - bookedSet.size} open dates this month</span>
                        <span>{bookedSet.size} booked</span>
                    </div>
                </div>
            </div>

            {/* Booking modal */}
            <AnimatePresence>
                {showModal && selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
                        >
                            <div className="text-4xl mb-4">📅</div>
                            <h3 className="text-xl font-extrabold mb-2">Request this date</h3>
                            <p className="text-black/60 text-sm mb-4">
                                You selected: <strong>{new Date(selected + "T12:00:00").toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</strong>
                            </p>
                            <p className="text-black/50 text-xs mb-6">
                                Click below to continue to our booking form with this date pre-filled. We&apos;ll confirm availability within 2 hours.
                            </p>
                            <div className="flex gap-3">
                                <Link
                                    href={`/contact?date=${selected}`}
                                    className="flex-1 text-center rounded-xl bg-black text-white font-bold py-3 text-sm hover:bg-gold transition"
                                >
                                    Book this date →
                                </Link>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 rounded-xl border border-black/10 font-semibold py-3 text-sm hover:bg-black/5 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
