"use client"

import { useActionState } from "react"
import { createSkill, updateSkill } from "@/lib/actions/skill-actions"
import { Button, Input } from "@/components/ui/form-elements"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"

interface SkillData {
    id: string
    name: string
    category: string
    icon: string | null
    level: number | null
    order: number
}

interface SkillFormProps {
    skill?: SkillData
}

export function SkillForm({ skill }: SkillFormProps) {
    const initialState = { message: "", errors: {} }
    const action = skill ? updateSkill.bind(null, skill.id) : createSkill

    // @ts-ignore
    const [state, dispatch] = useActionState(action, initialState)

    return (
        <form action={dispatch} className="space-y-8 max-w-2xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/skills"
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <ArrowLeft size={20} className="text-slate-500" />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {skill ? "Edit Skill" : "New Skill"}
                    </h1>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/skills">
                        <Button type="button" variant="outline">Cancel</Button>
                    </Link>
                    <Button type="submit">
                        <Save size={16} className="mr-2" />
                        Save Skill
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">

                <div className="md:col-span-2">
                    <Input
                        name="name"
                        label="Skill Name"
                        placeholder="e.g. React"
                        defaultValue={skill?.name}
                        error={state?.errors?.name}
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Category
                    </label>
                    <select
                        name="category"
                        defaultValue={skill?.category || "Languages"}
                        className="flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <option value="Languages">Languages</option>
                        <option value="Frameworks">Frameworks</option>
                        <option value="Tools">Tools</option>
                        <option value="Databases">Databases</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <div className="flex flex-col gap-4">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Icon
                        </label>

                        <div className="flex gap-4 items-start">
                            <div className="flex-1">
                                <span className="text-xs text-slate-500 mb-2 block">Option 1: Upload File (SVG/PNG)</span>
                                <Input
                                    type="file"
                                    name="iconFile"
                                    accept="image/*,.svg"
                                />
                            </div>
                            <div className="flex-1">
                                <span className="text-xs text-slate-500 mb-2 block">Option 2: Icon URL / DevIcon</span>
                                <Input
                                    name="icon"
                                    placeholder="https://... or devicon name"
                                    defaultValue={skill?.icon || ""}
                                    error={state?.errors?.icon}
                                />
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">
                            Upload a file OR provide a URL. Uploaded file takes precedence.
                        </p>
                    </div>
                </div>

                <div className="md:col-span-1">
                    <Input
                        name="level"
                        type="number"
                        min="0"
                        max="100"
                        label="Proficiency Level (0-100)"
                        placeholder="90"
                        defaultValue={skill?.level || 0}
                        error={state?.errors?.level}
                    />
                </div>

                <div className="md:col-span-1">
                    <Input
                        name="order"
                        type="number"
                        label="Sort Order"
                        placeholder="0"
                        defaultValue={skill?.order || 0}
                        error={state?.errors?.order}
                    />
                </div>

            </div>

            <div className="h-4">
                {state?.message && <p className="text-red-500 font-medium text-center">{state.message}</p>}
            </div>
        </form>
    )
}
