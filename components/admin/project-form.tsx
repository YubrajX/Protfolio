"use client"

import { useActionState } from "react" // Next.js 14+ hook (was useFormState)
import { createProject, updateProject } from "@/lib/actions/project-actions"
import { Button, Input, Textarea } from "@/components/ui/form-elements"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"

// Define a minimal Project type for props
interface ProjectData {
    id: string
    title: string
    slug: string
    description: string
    content: string
    coverImage: string
    techStack: string[]
    githubUrl: string | null
    liveUrl: string | null
    featured: boolean
    order: number
    status: string
}

interface ProjectFormProps {
    project?: ProjectData
}

export function ProjectForm({ project }: ProjectFormProps) {
    const initialState = { message: "", errors: {} }
    // If project exists, we use updateProject, otherwise createProject
    // We need to bind the ID for update
    const action = project ? updateProject.bind(null, project.id) : createProject

    // @ts-ignore - useActionState types can be tricky with bound actions
    const [state, dispatch] = useActionState(action, initialState)

    return (
        <form action={dispatch} className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/projects"
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <ArrowLeft size={20} className="text-slate-500" />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {project ? "Edit Project" : "New Project"}
                    </h1>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/projects">
                        <Button type="button" variant="outline">Cancel</Button>
                    </Link>
                    <Button type="submit">
                        <Save size={16} className="mr-2" />
                        Save Project
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">

                {/* Basic Info */}
                <div className="space-y-4 md:col-span-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">Basic Information</h3>
                </div>

                <div className="md:col-span-2">
                    <Input
                        name="title"
                        label="Project Title"
                        placeholder="e.g. AI Task Automator"
                        defaultValue={project?.title}
                        error={state?.errors?.title}
                    />
                </div>

                <div className="md:col-span-1">
                    <Input
                        name="slug"
                        label="Slug (URL friendly)"
                        placeholder="e.g. ai-task-automator"
                        defaultValue={project?.slug}
                        error={state?.errors?.slug}
                    />
                </div>

                <div className="md:col-span-1">
                    <Input
                        name="order"
                        type="number"
                        label="Sort Order"
                        placeholder="0"
                        defaultValue={project?.order || 0}
                        error={state?.errors?.order}
                    />
                </div>

                <div className="md:col-span-2">
                    <Textarea
                        name="description"
                        label="Short Description"
                        placeholder="Brief summary for the card view..."
                        defaultValue={project?.description}
                        error={state?.errors?.description}
                    />
                </div>

                {/* Media & Links */}
                <div className="space-y-4 md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">Media & Links</h3>
                </div>

                <div className="md:col-span-2">
                    <div className="flex flex-col gap-4">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Cover Image
                        </label>

                        <div className="flex gap-4 items-start">
                            <div className="flex-1">
                                <span className="text-xs text-slate-500 mb-2 block">Option 1: Upload File</span>
                                <Input
                                    type="file"
                                    name="coverImageFile"
                                    accept="image/*"
                                />
                            </div>
                            <div className="flex-1">
                                <span className="text-xs text-slate-500 mb-2 block">Option 2: Image URL</span>
                                <Input
                                    name="coverImage"
                                    placeholder="https://..."
                                    defaultValue={project?.coverImage}
                                    error={state?.errors?.coverImage}
                                />
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">
                            Upload a file OR provide a URL. If both are provided, the uploaded file takes precedence.
                        </p>
                    </div>
                </div>

                <div className="md:col-span-1">
                    <Input
                        name="githubUrl"
                        label="GitHub URL"
                        placeholder="https://github.com/..."
                        defaultValue={project?.githubUrl || ""}
                        error={state?.errors?.githubUrl}
                    />
                </div>

                <div className="md:col-span-1">
                    <Input
                        name="liveUrl"
                        label="Live Demo URL"
                        placeholder="https://..."
                        defaultValue={project?.liveUrl || ""}
                        error={state?.errors?.liveUrl}
                    />
                </div>

                {/* Content & Details */}
                <div className="space-y-4 md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">Content & Settings</h3>
                </div>

                <div className="md:col-span-2">
                    <Input
                        name="techStack"
                        label="Technologies (comma separated)"
                        placeholder="React, Next.js, TypeScript, PostgreSQL"
                        defaultValue={project?.techStack.join(", ")}
                        error={state?.errors?.techStack}
                    />
                </div>

                <div className="md:col-span-2">
                    <Textarea
                        name="content"
                        label="Full Content (Markdown)"
                        className="font-mono min-h-[300px]"
                        placeholder="# Project Details..."
                        defaultValue={project?.content}
                        error={state?.errors?.content}
                    />
                </div>

                <div className="md:col-span-2 flex gap-8 pt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="featured"
                            defaultChecked={project?.featured}
                            className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Featured Project</span>
                    </label>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Status:</label>
                        <select
                            name="status"
                            defaultValue={project?.status || "published"}
                            className="h-9 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                </div>

            </div>

            <div className="h-4">
                {state?.message && <p className="text-red-500 font-medium text-center">{state.message}</p>}
            </div>
        </form>
    )
}
