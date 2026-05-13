import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/form-elements"
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react"
import { deleteProject } from "@/lib/actions/project-actions"

export default async function AdminProjects() {
    const projects = await prisma.project.findMany({
        orderBy: { order: "asc" },
    })

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Projects</h1>
                    <p className="text-slate-500 mt-1">Manage your portfolio projects.</p>
                </div>
                <Link href="/admin/projects/new">
                    <Button>
                        <Plus size={16} className="mr-2" />
                        Add Project
                    </Button>
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Order</th>
                            <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Title</th>
                            <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Status</th>
                            <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-slate-500 font-mono">{project.order}</td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-slate-900 dark:text-white">{project.title}</div>
                                    <div className="text-xs text-slate-500">{project.slug}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize
                                ${project.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                                            project.status === 'draft' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400' :
                                                'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'}`}
                                    >
                                        {project.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/projects/${project.id}`}>
                                            <Button variant="secondary" className="h-8 w-8 p-0">
                                                <Pencil size={14} />
                                            </Button>
                                        </Link>
                                        <form action={async () => {
                                            "use server"
                                            await deleteProject(project.id)
                                        }}>
                                            <Button variant="danger" className="h-8 w-8 p-0" title="Delete">
                                                <Trash2 size={14} />
                                            </Button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                    No projects found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
