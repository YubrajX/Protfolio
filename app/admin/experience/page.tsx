import Link from "next/link"
import { getExperiences, deleteExperience } from "@/lib/actions/experience-actions"
import { Plus, Trash2 } from "lucide-react"

export default async function AdminExperiencePage() {
    const experiences = await getExperiences()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Experience</h1>
                    <p className="text-slate-500">Manage your work history.</p>
                </div>
                <Link href="/admin/experience/new">
                    <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                        <Plus size={18} />
                        Add Experience
                    </button>
                </Link>
            </div>

            <div className="grid gap-4">
                {experiences.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                        No experience records found. Add one to get started.
                    </div>
                ) : (
                    experiences.map((exp) => (
                        <div
                            key={exp.id}
                            className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm"
                        >
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">{exp.position} @ {exp.company}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {exp.location}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    {new Date(exp.startDate).toLocaleDateString()} - {exp.current ? "Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString() : ""}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <form action={async () => {
                                    "use server"
                                    await deleteExperience(exp.id)
                                }}>
                                    <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
