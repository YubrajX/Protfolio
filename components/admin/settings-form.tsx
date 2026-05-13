"use client"

import { useState, useTransition } from "react"
import { Button, Input, Textarea } from "@/components/ui/form-elements"
import { Save } from "lucide-react"

interface SiteSettings {
    id: string
    heroTitle: string
    heroSubtitle: string
    aboutText: string
    seoKeywords: string[]
    socialLinks: any
    styleSettings: any // To avoid type errors with Json
    email: string
    phone: string | null
    resumeUrl?: string | null
}

interface SettingsFormProps {
    settings?: SiteSettings | null
}

export function SettingsForm({ settings }: SettingsFormProps) {
    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState<any>({})
    const [isPending, startTransition] = useTransition()

    const socialLinks = settings?.socialLinks as { github?: string; linkedin?: string; twitter?: string } | null

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)

        startTransition(async () => {
            setMessage("")
            setErrors({})

            try {
                const res = await fetch("/api/settings", {
                    method: "POST",
                    // Fetch natively sends multipart/form-data when body is FormData
                    body: formData
                })

                const data = await res.json()

                if (!res.ok) {
                    setErrors(data.errors || {})
                    setMessage(data.message || "Failed to update settings")
                    return
                }

                setMessage("Settings Updated Successfully.")
            } catch (err) {
                console.error(err)
                setMessage("An error occurred while saving.")
            }
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Site Settings</h1>
                    <p className="text-slate-500">Manage global content and SEO.</p>
                </div>
                <Button type="submit">
                    <Save size={16} className="mr-2" />
                    Save Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">

                {/* Hero Section */}
                <div className="space-y-4 md:col-span-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">Hero Section</h3>
                </div>

                <div className="md:col-span-2">
                    <Input
                        name="heroTitle"
                        label="Hero Title"
                        placeholder="e.g. Building the Future..."
                        defaultValue={settings?.heroTitle}
                        error={errors?.heroTitle}
                    />
                </div>

                <div className="md:col-span-2">
                    <Textarea
                        name="heroSubtitle"
                        label="Hero Subtitle"
                        placeholder="Brief intro text..."
                        defaultValue={settings?.heroSubtitle}
                        error={errors?.heroSubtitle}
                    />
                </div>

                {/* About Section */}
                <div className="space-y-4 md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">About & SEO</h3>
                </div>

                <div className="md:col-span-2">
                    <Textarea
                        name="aboutText"
                        label="About Text"
                        className="min-h-[150px]"
                        placeholder="Detailed about me..."
                        defaultValue={settings?.aboutText}
                        error={errors?.aboutText}
                    />
                </div>

                <div className="md:col-span-2">
                    <Input
                        name="seoKeywords"
                        label="SEO Keywords (comma separated)"
                        placeholder="React, Next.js, Portfolio..."
                        defaultValue={settings?.seoKeywords.join(", ")}
                        error={errors?.seoKeywords}
                    />
                </div>

                {/* contact & Socials */}
                <div className="space-y-4 md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">Contact & Socials</h3>
                </div>

                <div>
                    <Input
                        name="email"
                        label="Contact Email"
                        placeholder="hello@example.com"
                        defaultValue={settings?.email}
                        error={errors?.email}
                    />
                </div>

                <div>
                    <Input
                        name="phone"
                        label="Phone (Optional)"
                        placeholder="+1 234..."
                        defaultValue={settings?.phone || ""}
                        error={errors?.phone}
                    />
                </div>

                <div>
                    <Input
                        name="githubUrl"
                        label="GitHub URL"
                        placeholder="https://github.com/..."
                        defaultValue={socialLinks?.github || ""}
                        error={errors?.githubUrl}
                    />
                </div>

                <div>
                    <Input
                        name="linkedinUrl"
                        label="LinkedIn URL"
                        placeholder="https://linkedin.com/..."
                        defaultValue={socialLinks?.linkedin || ""}
                        error={errors?.linkedinUrl}
                    />
                </div>

                <div>
                    <Input
                        name="twitterUrl"
                        label="Twitter/X URL"
                        placeholder="https://twitter.com/..."
                        defaultValue={socialLinks?.twitter || ""}
                        error={errors?.twitterUrl}
                    />
                </div>

                {/* Resume Upload */}
                <div className="space-y-4 md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">Resume</h3>
                </div>

                <div className="md:col-span-2">
                    <div className="flex flex-col gap-4">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Resume File
                        </label>
                        <div className="flex gap-4 items-start">
                            <div className="flex-1">
                                <span className="text-xs text-slate-500 mb-2 block">Option 1: Upload PDF/Doc</span>
                                <Input
                                    type="file"
                                    name="resumeFile"
                                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                />
                            </div>
                            <div className="flex-1">
                                <span className="text-xs text-slate-500 mb-2 block">Option 2: External Resume URL</span>
                                <Input
                                    name="resumeUrl"
                                    placeholder="https://..."
                                    // @ts-ignore
                                    defaultValue={settings?.resumeUrl || ""}
                                />
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">
                            Upload a file OR provide a link to your resume. Uploading takes precedence.
                        </p>
                    </div>
                </div>

                {/* Appearance */}
                <div className="space-y-4 md:col-span-2 mt-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b pb-2 border-slate-100 dark:border-slate-800">Appearance</h3>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Primary Color
                    </label>
                    <div className="flex items-center gap-4">
                        <input
                            type="color"
                            name="primaryColor"
                            // @ts-ignore
                            defaultValue={settings?.styleSettings?.primaryColor || "#3b82f6"} // default blue-500
                            className="h-10 w-20 p-1 rounded border border-slate-300 dark:border-slate-700 cursor-pointer"
                        />
                        <span className="text-sm text-slate-500">Main accent color.</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Background Color
                    </label>
                    <div className="flex items-center gap-4">
                        <input
                            type="color"
                            name="backgroundColor"
                            // @ts-ignore
                            defaultValue={settings?.styleSettings?.backgroundColor || "#f5f6f8"}
                            className="h-10 w-20 p-1 rounded border border-slate-300 dark:border-slate-700 cursor-pointer"
                        />
                        <span className="text-sm text-slate-500">Site background (Light mode default).</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Text Color
                    </label>
                    <div className="flex items-center gap-4">
                        <input
                            type="color"
                            name="textColor"
                            // @ts-ignore
                            defaultValue={settings?.styleSettings?.textColor || "#0f172a"}
                            className="h-10 w-20 p-1 rounded border border-slate-300 dark:border-slate-700 cursor-pointer"
                        />
                        <span className="text-sm text-slate-500">Main text color.</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Card Background (Light Mode)
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            className="h-10 w-10 p-1 rounded border border-slate-300 dark:border-slate-700 cursor-pointer"
                            onChange={(e) => {
                                const input = document.getElementById('cardBgInput') as HTMLInputElement;
                                if (input) input.value = e.target.value;
                            }}
                        />
                        <Input
                            id="cardBgInput"
                            name="cardBackgroundColor"
                            placeholder="#ffffff or transparent"
                            defaultValue={settings?.styleSettings?.cardBackgroundColor || "#ffffff"}
                            className="flex-1"
                        />
                    </div>
                    <span className="text-xs text-slate-500">Supports hex, rgba, or 'transparent'.</span>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Card Background (Dark Mode)
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            className="h-10 w-10 p-1 rounded border border-slate-300 dark:border-slate-700 cursor-pointer"
                            onChange={(e) => {
                                const input = document.getElementById('cardBgDarkInput') as HTMLInputElement;
                                if (input) input.value = e.target.value;
                            }}
                        />
                        <Input
                            id="cardBgDarkInput"
                            name="cardBackgroundColorDark"
                            placeholder="#1e293b or rgba(30, 41, 59, 0.5)"
                            defaultValue={settings?.styleSettings?.cardBackgroundColorDark || "rgba(255, 255, 255, 0.05)"}
                            className="flex-1"
                        />
                    </div>
                    <span className="text-xs text-slate-500">Background for cards in dark mode.</span>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Navbar Color (Light Mode)
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            className="h-10 w-10 p-1 rounded border border-slate-300 dark:border-slate-700 cursor-pointer"
                            onChange={(e) => {
                                const input = document.getElementById('navBgInput') as HTMLInputElement;
                                if (input) input.value = e.target.value;
                            }}
                        />
                        <Input
                            id="navBgInput"
                            name="navbarColor"
                            placeholder="#ffffff or transparent"
                            defaultValue={settings?.styleSettings?.navbarColor || "rgba(255, 255, 255, 0.8)"}
                            className="flex-1"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Navbar Color (Dark Mode)
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            className="h-10 w-10 p-1 rounded border border-slate-300 dark:border-slate-700 cursor-pointer"
                            onChange={(e) => {
                                const input = document.getElementById('navBgDarkInput') as HTMLInputElement;
                                if (input) input.value = e.target.value;
                            }}
                        />
                        <Input
                            id="navBgDarkInput"
                            name="navbarColorDark"
                            placeholder="#0f172a or transparent"
                            defaultValue={settings?.styleSettings?.navbarColorDark || "rgba(15, 23, 42, 0.8)"}
                            className="flex-1"
                        />
                    </div>
                </div>

            </div>

            <div className="h-4">
                {message && <p className={message.includes("Success") ? "text-green-500 font-medium text-center" : "text-red-500 font-medium text-center"}>
                    {message}
                </p>}
            </div>
        </form>
    )
}
