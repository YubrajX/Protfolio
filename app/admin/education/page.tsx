import Link from "next/link"
import { getEducations, deleteEducation } from "@/lib/actions/education-actions"
import { Button } from "@/components/ui/form-elements"
import { Plus, Trash2, Edit } from "lucide-react"
import { revalidatePath } from "next/cache"

export default async function AdminEducationPage() {
    const educations = await getEducations()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Education</h1>
                    <p className="text-slate-500">Manage your academic background.</p>
                </div>
                <Link href="/admin/education/new">
                    <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                        <Plus size={18} />
                        Add Education
                    </button>
                </Link>
            </div>

            <div className="grid gap-4">
                {educations.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                        No education records found. Add one to get started.
                    </div>
                ) : (
                    educations.map((edu) => (
                        <div
                            key={edu.id}
                            className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm"
                        >
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">{edu.institution}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {edu.degree} in {edu.fieldOfStudy}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    {new Date(edu.startDate).toLocaleDateString()} - {edu.current ? "Present" : edu.endDate ? new Date(edu.endDate).toLocaleDateString() : ""}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* For simplicity we'll implement delete directly here with a form for now, or just a button that calls server action if client component */}
                                {/* Since this is a server component, we need client wrapper for interactivity or form actions */}
                                <form action={async () => {
                                    "use server"
                                    await deleteEducation(edu.id)
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
