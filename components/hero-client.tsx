"use client"

import { motion } from "framer-motion"
import { ArrowRight, Mail } from "lucide-react"
import Link from "next/link"

interface HeroClientProps {
    title: string
    subtitle: string
    availableForWork?: boolean
}

export function HeroClient({ title, subtitle, availableForWork = true }: HeroClientProps) {
    return (
        <section id="home" className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>

            <div className="max-w-4xl mx-auto space-y-8 z-10">
                {availableForWork && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest text-center"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Available for Internships 2024
                    </motion.div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight text-[var(--text-main)] break-words"
                >
                    {title.split(" ").map((word, i) => (
                        word.toLowerCase() === "code" || word.toLowerCase() === "future," ?
                            <span key={i} className="text-[var(--primary)] italic px-1 sm:px-2 inline-block">{word}</span> :
                            <span key={i} className="px-1 inline-block">{word}</span>
                    ))}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-[var(--text-main)] opacity-70 max-w-2xl mx-auto leading-relaxed"
                >
                    {subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                >
                    <Link
                        href="#projects"
                        className="w-full sm:w-auto px-8 py-4 bg-[var(--primary)] text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-xl shadow-[var(--primary)]/25 flex items-center justify-center gap-2"
                    >
                        View My Work
                        <ArrowRight size={20} />
                    </Link>
                    <Link
                        href="#contact"
                        className="w-full sm:w-auto px-8 py-4 bg-[var(--card-bg)]/10 border border-slate-200 dark:border-white/10 text-[var(--text-main)] font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    >
                        Get in Touch
                        <Mail size={20} />
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
