"use client"

import Link from "next/link"
import { createEducation } from "@/lib/actions/education-actions"
import { Button, Input, Textarea } from "@/components/ui/form-elements"
import { ArrowLeft, Save } from "lucide-react"
import { useActionState } from "react"

export default function NewEducationPage() {
    const initialState = { message: "", errors: {} }
    // @ts-ignore
    const [state, dispatch] = useActionState(createEducation, initialState)

    return (
        <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-4">
                <Link href="/admin/education" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-slate-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add Education</h1>
                    <p className="text-slate-500">Add a new degree or certification.</p>
                </div>
            </div>

            <form action={dispatch} className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <Input
                            name="institution"
                            label="Institution Name"
                            placeholder="e.g. Massachusetts Institute of Technology"
                            // @ts-ignore
                            error={state?.errors?.institution}
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Input
                            name="degree"
                            label="Degree / Certification"
                            placeholder="e.g. Bachelor of Science"
                            // @ts-ignore
                            error={state?.errors?.degree}
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Input
                            name="fieldOfStudy"
                            label="Field of Study"
                            placeholder="e.g. Computer Science"
                            // @ts-ignore
                            error={state?.errors?.fieldOfStudy}
                            required
                        />
                    </div>

                    <div>
                        <Input
                            type="date"
                            name="startDate"
                            label="Start Date"
                            // @ts-ignore
                            error={state?.errors?.startDate}
                            required
                        />
                    </div>

                    <div>
                        <Input
                            type="date"
                            name="endDate"
                            label="End Date"
                            // @ts-ignore
                            error={state?.errors?.endDate}
                        />
                        <p className="text-xs text-slate-400 mt-1">Leave blank if currently pursuing.</p>
                    </div>

                    <div className="md:col-span-2 flex items-center gap-2">
                        <input type="checkbox" name="current" id="current" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                        <label htmlFor="current" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            I am currently studying here
                        </label>
                    </div>

                    <div className="md:col-span-2">
                        <Textarea
                            name="description"
                            label="Description (Optional)"
                            placeholder="Brief details about your studies, GPA, honors..."
                            className="min-h-[100px]"
                            // @ts-ignore
                            error={state?.errors?.description}
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4 items-center gap-4">
                    {state?.message && (
                        <p className={`text-sm ${state.message.includes("Success") ? "text-green-500" : "text-red-500"}`}>
                            {state.message}
                        </p>
                    )}
                    <Button type="submit">
                        <Save size={16} className="mr-2" />
                        Save Education
                    </Button>
                </div>
            </form>
        </div>
    )
}
