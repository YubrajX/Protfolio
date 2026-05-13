"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Skill {
    id: string
    name: string
    icon: string | null
}

interface SkillsClientProps {
    skills: Skill[]
}

export function SkillsClient({ skills }: SkillsClientProps) {
    return (
        <section id="skills" className="py-20 border-y border-slate-200 dark:border-white/5 bg-[var(--background)]/50">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-[var(--text-main)] opacity-50 font-bold uppercase tracking-[0.2em] text-xs mb-10">
                    Technologies I Master
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-80">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            whileHover={{ scale: 1.05, opacity: 1, filter: "grayscale(0%)" }}
                            className="flex flex-col items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-default"
                        >
                            <div className="size-12 relative">
                                {skill.icon ? (
                                    // Use standard img tag for external SVGs if Image optimization is tricky with unknown domains
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-[var(--primary)]/20 rounded-lg flex items-center justify-center text-xs font-bold text-[var(--text-main)]">
                                        {skill.name[0]}
                                    </div>
                                )}
                            </div>
                            <span className="text-xs font-medium text-[var(--text-main)] opacity-80">{skill.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
