import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { FolderGit2, Code2, Mail, Eye } from "lucide-react"

export default async function AdminDashboard() {
    const session = await auth()

    const [projectCount, skillCount, messageCount] = await Promise.all([
        prisma.project.count(),
        prisma.skill.count(),
        prisma.contactSubmission.count()
    ])

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                <p className="text-slate-500 mt-2">Welcome back, {session?.user?.name || "Admin"}.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Total Projects"
                    value={projectCount}
                    icon={FolderGit2}
                    color="bg-blue-500"
                />
                <StatCard
                    label="Skills"
                    value={skillCount}
                    icon={Code2}
                    color="bg-purple-500"
                />
                <StatCard
                    label="Messages"
                    value={messageCount}
                    icon={Mail}
                    color="bg-green-500"
                />
            </div>

            {/* Recent Activity or Quick Actions could go here */}
        </div>
    )
}

function StatCard({ label, value, icon: Icon, color }: any) {
    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className={`${color} p-4 rounded-lg text-white shadow-lg shadow-black/5`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
            </div>
        </div>
    )
}
