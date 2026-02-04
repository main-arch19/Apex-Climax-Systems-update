"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Jonathan Reeves",
        role: "Architect",
        content: "The best investment I made for my smart home. The climate control remains absolute, regardless of the weather.",
        rating: 5,
    },
    {
        name: "Sarah Connors",
        role: "Homeowner",
        content: "My energy bills dropped by 35% instantly. The technicians were complete pros—white glove service all the way.",
        rating: 5,
    },
    {
        name: "Marcus Chen",
        role: "Developer",
        content: "It's not just an AC unit, it's a piece of engineering art. Silent, efficient, and beautifully integrated.",
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="relative py-32 px-6 overflow-hidden bg-[#0A0A0A]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A] to-[#0A0A0A]/50 pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">ENGINEERED FOR EXCELLENCE</h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Join the thousands who have upgraded to the future of climate control.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300"
                        >
                            <div className="flex gap-1 mb-6 text-[#00A3FF]">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" className="text-[#00A3FF]" />
                                ))}
                            </div>

                            <p className="text-lg text-white/90 font-light leading-relaxed mb-8">
                                "{t.content}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5" />
                                <div>
                                    <h4 className="font-medium text-white">{t.name}</h4>
                                    <p className="text-sm text-white/40">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
