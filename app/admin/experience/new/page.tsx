"use client"

import Link from "next/link"
import { createExperience } from "@/lib/actions/experience-actions"
import { Button, Input, Textarea } from "@/components/ui/form-elements"
import { ArrowLeft, Save } from "lucide-react"
import { useActionState } from "react"

export default function NewExperiencePage() {
    const initialState = { message: "", errors: {} }
    // @ts-ignore
    const [state, dispatch] = useActionState(createExperience, initialState)

    return (
        <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-4">
                <Link href="/admin/experience" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={20} className="text-slate-500" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add Experience</h1>
                    <p className="text-slate-500">Add a new job or internship.</p>
                </div>
            </div>

            <form action={dispatch} className="space-y-6 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <Input
                            name="company"
                            label="Company Name"
                            placeholder="e.g. Google"
                            // @ts-ignore
                            error={state?.errors?.company}
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Input
                            name="position"
                            label="Position / Role"
                            placeholder="e.g. Software Engineer Intern"
                            // @ts-ignore
                            error={state?.errors?.position}
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Input
                            name="location"
                            label="Location"
                            placeholder="e.g. San Francisco, CA (or Remote)"
                            // @ts-ignore
                            error={state?.errors?.location}
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
                        <p className="text-xs text-slate-400 mt-1">Leave blank if currently working here.</p>
                    </div>

                    <div className="md:col-span-2 flex items-center gap-2">
                        <input type="checkbox" name="current" id="current" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                        <label htmlFor="current" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            I currently work here
                        </label>
                    </div>

                    <div className="md:col-span-2">
                        <Textarea
                            name="description"
                            label="Description"
                            placeholder="Detail your responsibilities and achievements..."
                            className="min-h-[150px]"
                            // @ts-ignore
                            error={state?.errors?.description}
                            required
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
                        Save Experience
                    </Button>
                </div>
            </form>
        </div>
    )
}
