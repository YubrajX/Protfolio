"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

interface Project {
    id: string
    title: string
    description: string
    coverImage: string
    techStack: string[]
    githubUrl?: string | null
    liveUrl?: string | null
}

interface ProjectsClientProps {
    projects: Project[]
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
    return (
        <section id="projects" className="py-20 px-4 sm:px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-[var(--text-main)]">Featured Projects</h2>
                        <p className="text-[var(--text-main)] opacity-70">Selected work from my engineering journey.</p>
                    </div>
                    <Link
                        href="https://github.com"
                        target="_blank"
                        className="text-[var(--primary)] font-bold flex items-center gap-2 hover:underline"
                    >
                        View GitHub
                        <ExternalLink size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card rounded-2xl p-4 group hover:border-[var(--primary)]/50 transition-all duration-300 flex flex-col h-full bg-[var(--card-bg)] border border-slate-200 dark:border-white/10 shadow-none dark:shadow-sm hover:shadow-lg dark:hover:shadow-[var(--primary)]/5"
                        >
                            <div className="relative rounded-xl overflow-hidden mb-5 aspect-video">
                                <Image
                                    src={project.coverImage}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60"></div>
                            </div>

                            <div className="space-y-4 px-2 flex-1 flex flex-col">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-bold text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-2">
                                        {project.githubUrl && (
                                            <Link href={project.githubUrl} target="_blank" className="text-[var(--text-main)] opacity-50 hover:opacity-100 hover:text-[var(--primary)] transition-colors">
                                                <Github size={18} />
                                            </Link>
                                        )}
                                        {project.liveUrl && (
                                            <Link href={project.liveUrl} target="_blank" className="text-[var(--text-main)] opacity-50 hover:opacity-100 hover:text-[var(--primary)] transition-colors">
                                                <ExternalLink size={18} />
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                <p className="text-[var(--text-main)] opacity-70 text-sm leading-relaxed flex-1">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-[10px] font-bold text-[var(--text-main)] opacity-70 border border-slate-200 dark:border-white/10 uppercase"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
