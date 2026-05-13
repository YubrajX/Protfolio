import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/form-elements"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { deleteSkill } from "@/lib/actions/skill-actions"

export default async function AdminSkills() {
    const skills = await prisma.skill.findMany({
        orderBy: { order: "asc" },
    })

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Skills</h1>
                    <p className="text-slate-500 mt-1">Manage your technical skills.</p>
                </div>
                <Link href="/admin/skills/new">
                    <Button>
                        <Plus size={16} className="mr-2" />
                        Add Skill
                    </Button>
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Order</th>
                            <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Icon</th>
                            <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Category</th>
                            <th className="px-6 py-4 font-semibold text-slate-900 dark:text-white text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {skills.map((skill) => (
                            <tr key={skill.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4 text-slate-500 font-mono">{skill.order}</td>
                                <td className="px-6 py-4">
                                    {skill.icon ? (
                                        <img src={skill.icon} alt={skill.name} className="w-8 h-8 object-contain" />
                                    ) : (
                                        <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-xs">{skill.name[0]}</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                    {skill.name}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">
                                        {skill.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/skills/${skill.id}`}>
                                            <Button variant="secondary" className="h-8 w-8 p-0">
                                                <Pencil size={14} />
                                            </Button>
                                        </Link>
                                        <form action={async () => {
                                            "use server"
                                            await deleteSkill(skill.id)
                                        }}>
                                            <Button variant="danger" className="h-8 w-8 p-0" title="Delete">
                                                <Trash2 size={14} />
                                            </Button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
