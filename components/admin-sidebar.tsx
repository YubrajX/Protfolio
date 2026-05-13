"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    FolderGit2,
    Terminal,
    Settings,
    LogOut,
    Code2,
    Mail,
    Briefcase,
    GraduationCap
} from "lucide-react"
import { signOut } from "next-auth/react"
import { clsx } from "clsx"

const navItems = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Projects", path: "/admin/projects", icon: FolderGit2 },
    { label: "Experience", path: "/admin/experience", icon: Briefcase },
    { label: "Education", path: "/admin/education", icon: GraduationCap },
    { label: "Skills", path: "/admin/skills", icon: Code2 },
    { label: "Messages", path: "/admin/messages", icon: Mail },
    { label: "Settings", path: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0 border-r border-slate-800">
            <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                <div className="bg-primary p-1.5 rounded-lg text-white">
                    <Terminal size={20} />
                </div>
                <span className="font-bold text-lg tracking-tight">Admin<span className="text-primary">Panel</span></span>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.path || (item.path !== "/admin" && pathname.startsWith(item.path))

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                                isActive
                                    ? "bg-primary text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <Icon size={18} />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors text-sm font-medium"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    )
}
