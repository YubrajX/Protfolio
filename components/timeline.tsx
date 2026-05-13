"use client"

import { motion } from "framer-motion"
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react"

interface Experience {
    id: string
    company: string
    position: string
    location: string | null
    startDate: Date
    endDate: Date | null
    current: boolean
    description: string
}

interface Education {
    id: string
    institution: string
    degree: string
    fieldOfStudy: string
    startDate: Date
    endDate: Date | null
    current: boolean
    description: string | null
}

interface TimelineProps {
    experiences: Experience[]
    educations: Education[]
}

export function Timeline({ experiences, educations }: TimelineProps) {
    return (
        <section id="timeline" className="py-20 px-6 max-w-5xl mx-auto relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-slate-200 dark:via-white/10 to-transparent hidden md:block" />

            <div className="space-y-20">
                {/* Experiences */}
                <div>
                    <div className="flex items-center justify-center gap-2 mb-12">
                        <div className="p-3 bg-[var(--primary)]/10 rounded-full text-[var(--primary)]">
                            <Briefcase size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-center text-[var(--text-main)]">Experience</h2>
                    </div>

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`flex flex-col md:flex-row gap-8 relative ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                            >
                                <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--primary)] border-4 border-white dark:border-slate-900 z-10" />

                                <div className="flex-1 md:w-1/2"></div>

                                <div className={`flex-1 md:w-1/2 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                                    <div className="bg-[var(--card-bg)] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-[0_0_30px_-5px_var(--primary)] hover:border-[var(--primary)]/50 transition-all duration-300 relative glass-card group">
                                        <span className="text-sm font-bold text-[var(--primary)] mb-2 block uppercase tracking-wider">
                                            {new Date(exp.startDate).getFullYear()} - {exp.current ? "Present" : exp.endDate ? new Date(exp.endDate).getFullYear() : ""}
                                        </span>
                                        <h3 className="text-xl font-bold text-[var(--text-main)]">{exp.position}</h3>
                                        <div className={`flex items-center gap-2 text-sm text-[var(--text-main)] opacity-70 mb-4 font-medium ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                                            <span>{exp.company}</span>
                                            {exp.location && (
                                                <>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin size={12} />
                                                        {exp.location}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        <p className="text-[var(--text-main)] opacity-80 leading-relaxed text-sm">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Education */}
                <div>
                    <div className="flex items-center justify-center gap-2 mb-12">
                        <div className="p-3 bg-[var(--primary)]/10 rounded-full text-[var(--primary)]">
                            <GraduationCap size={24} />
                        </div>
                        <h2 className="text-3xl font-bold text-center text-[var(--text-main)]">Education</h2>
                    </div>

                    <div className="space-y-12">
                        {educations.map((edu, index) => (
                            <motion.div
                                key={edu.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`flex flex-col md:flex-row gap-8 relative ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
                            >
                                <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--primary)] border-4 border-white dark:border-slate-900 z-10" />

                                <div className="flex-1 md:w-1/2"></div>

                                <div className={`flex-1 md:w-1/2 ${index % 2 !== 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                                    <div className="bg-[var(--card-bg)] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-[0_0_30px_-5px_var(--primary)] hover:border-[var(--primary)]/50 transition-all duration-300 relative glass-card group">
                                        <span className="text-sm font-bold text-[var(--primary)] mb-2 block uppercase tracking-wider">
                                            {new Date(edu.startDate).getFullYear()} - {edu.current ? "Present" : edu.endDate ? new Date(edu.endDate).getFullYear() : ""}
                                        </span>
                                        <h3 className="text-xl font-bold text-[var(--text-main)]">{edu.institution}</h3>
                                        <p className="text-[var(--text-main)] opacity-80 font-medium mb-2">
                                            {edu.degree} in {edu.fieldOfStudy}
                                        </p>
                                        {edu.description && (
                                            <p className="text-[var(--text-main)] opacity-70 leading-relaxed text-sm">
                                                {edu.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
