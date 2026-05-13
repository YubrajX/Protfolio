"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Terminal, FileText, Share2, Mail, Code, Sun, Moon } from "lucide-react" // Icons
import { ThemeProvider } from "@/components/theme-provider"
import { useTheme } from "next-themes"

interface NavItem {
    label: string
    path: string
}

interface NavbarClientProps {
    navItems: NavItem[]
    socialLinks?: {
        github: string
        linkedin: string
        twitter: string
    } | null
    resumeUrl?: string | null
}

export function NavbarClient({ navItems, socialLinks, resumeUrl }: NavbarClientProps) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("")
    const { theme, setTheme, resolvedTheme } = useTheme()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        // Active Section Spy
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -35% 0px", // Adjust for better trigger timing
            threshold: 0.1
        }

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)

        // Observe all sections
        navItems.forEach((item) => {
            const sectionId = item.path.replace("#", "")
            const element = document.getElementById(sectionId)
            if (element) observer.observe(element)
        })

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            observer.disconnect()
        }
    }, [navItems])

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        setIsMobileMenuOpen(false)
        if (path.startsWith("#")) {
            e.preventDefault()
            const element = document.getElementById(path.replace("#", ""))
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
            }
        }
    }

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <nav className="fixed top-0 z-50 w-full bg-[var(--navbar-bg)] border-b border-transparent">
                <div className="max-w-7xl mx-auto px-6 md:px-20 py-4 flex items-center justify-between">
                    {/* Placeholder static content */}
                </div>
            </nav>
        )
    }

    return (
        <nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled
                ? "bg-[var(--navbar-bg)]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 shadow-md"
                : "bg-transparent border-b border-transparent"
                }`}
            style={{
                backgroundColor: isScrolled ? 'rgba(var(--navbar-bg), 0.8)' : 'transparent'
            }}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-20 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="p-2 border-2 border-[var(--primary)] rounded-lg hover:bg-[var(--primary)]/10 transition-all duration-300">
                        <span className="text-xl font-black tracking-tighter text-[var(--text-main)] font-mono">
                            |$<span className="text-[var(--primary)]">Y</span>
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.path.replace("#", "")
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={(e) => handleLinkClick(e, item.path)}
                                className={`text-sm font-medium transition-colors ${isActive
                                    ? "text-[var(--primary)] font-bold"
                                    : "text-[var(--text-main)] opacity-70 hover:opacity-100 hover:text-[var(--primary)]"
                                    }`}
                            >
                                {item.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute -bottom-6 left-0 right-0 h-0.5 bg-[var(--primary)] hidden" // Optional underline
                                    />
                                )}
                            </Link>
                        )
                    })}
                </div>

                {/* Right Side */}
                <div className="hidden md:flex items-center gap-4">
                    {resumeUrl ? (
                        <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download="Resume"
                            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] hover:opacity-90 text-white text-sm font-bold transition-all shadow-lg hover:translate-y-[-2px]"
                        >
                            <FileText size={16} />
                            Resume
                        </a>
                    ) : (
                        <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] hover:opacity-90 text-white text-sm font-bold transition-all shadow-lg hover:translate-y-[-2px]">
                            <FileText size={16} />
                            Resume
                        </button>
                    )}

                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-[var(--text-main)]"
                        aria-label="Toggle Theme"
                    >
                        {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-[var(--text-main)]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[var(--navbar-bg)] border-b border-slate-200 dark:border-white/5 overflow-hidden shadow-xl"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.path.replace("#", "")
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={`text-lg font-medium transition-colors ${isActive
                                            ? "text-[var(--primary)]"
                                            : "text-[var(--text-main)] hover:text-[var(--primary)]"
                                            }`}
                                        onClick={(e) => handleLinkClick(e, item.path)}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            })}
                            <div className="h-px bg-slate-200 dark:bg-white/10 my-4" />
                            {resumeUrl ? (
                                <a
                                    href={resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download="Resume"
                                    className="flex items-center gap-2 w-full justify-center px-4 py-3 rounded-lg bg-[var(--primary)] hover:opacity-90 text-white font-bold transition-all"
                                >
                                    <FileText size={18} />
                                    Download Resume
                                </a>
                            ) : (
                                <button className="flex items-center gap-2 w-full justify-center px-4 py-3 rounded-lg bg-[var(--primary)] hover:opacity-90 text-white font-bold transition-all">
                                    <FileText size={18} />
                                    Download Resume
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
