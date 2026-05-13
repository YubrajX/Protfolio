import Link from "next/link"
import { Terminal, Github, Linkedin, Twitter, Share2, Mail, Code } from "lucide-react"

export function Footer() {
    return (
        <footer className="mt-auto border-t border-slate-200 dark:border-white/5 py-12 px-6 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-2">
                    <div className="bg-[var(--primary)]/20 p-1 rounded text-[var(--primary)]">
                        <Terminal size={16} />
                    </div>
                    <span className="font-bold tracking-tight text-[var(--text-main)]">CS Portfolio</span>
                </div>

                <div className="text-[var(--text-main)] opacity-50 text-sm">
                    © {new Date().getFullYear()} Computer Science Portfolio. Built with passion and code.
                </div>

                <div className="flex items-center gap-6">
                    <Link href="#" className="text-[var(--text-main)] opacity-40 hover:opacity-100 hover:text-[var(--primary)] transition-colors">
                        <Share2 size={18} />
                    </Link>
                    <Link href="#" className="text-[var(--text-main)] opacity-40 hover:opacity-100 hover:text-[var(--primary)] transition-colors">
                        <Mail size={18} />
                    </Link>
                    <Link href="#" className="text-[var(--text-main)] opacity-40 hover:opacity-100 hover:text-[var(--primary)] transition-colors">
                        <Code size={18} />
                    </Link>
                </div>
            </div>
        </footer>
    )
}
