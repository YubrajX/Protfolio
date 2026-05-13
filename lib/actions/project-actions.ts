"use server"

import { saveFile } from "@/lib/utils/file-upload"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const ProjectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(1, "Description is required"),
    content: z.string().min(1, "Content is required"),
    coverImage: z.string().optional(), // Make optional as file might be provided
    techStack: z.string().transform((str) => str.split(",").map((s) => s.trim()).filter((s) => s !== "")),
    githubUrl: z.string().optional().nullable(),
    liveUrl: z.string().optional().nullable(),
    featured: z.coerce.boolean(),
    order: z.coerce.number(),
    status: z.enum(["draft", "published", "archived"]),
})

export async function createProject(prevState: any, formData: FormData) {
    const file = formData.get("coverImageFile") as File
    let coverImagePath = formData.get("coverImage") as string

    if (file && file.size > 0) {
        if (file.size > 4 * 1024 * 1024) { // 4MB Limit
            return { message: "File size too large. Max 4MB." }
        }
        const uploadedPath = await saveFile(file, "projects")
        if (uploadedPath) {
            coverImagePath = uploadedPath
        }
    }

    if (!coverImagePath) {
        return {
            message: "Missing Cover Image. Please provide a URL or upload a file.",
        }
    }

    const validatedFields = ProjectSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        content: formData.get("content"),
        coverImage: coverImagePath,
        techStack: formData.get("techStack"),
        githubUrl: formData.get("githubUrl") || null,
        liveUrl: formData.get("liveUrl") || null,
        featured: formData.get("featured") === "on",
        order: formData.get("order"),
        status: formData.get("status"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Project.",
        }
    }

    const { data } = validatedFields

    try {
        await prisma.project.create({
            data: {
                ...data,
                coverImage: coverImagePath!, // asserted as checked above
                techStack: data.techStack,
            },
        })
    } catch (error) {
        return {
            message: "Database Error: Failed to Create Project.",
        }
    }

    revalidatePath("/admin/projects")
    revalidatePath("/")
    redirect("/admin/projects")
}

export async function updateProject(id: string, prevState: any, formData: FormData) {
    const file = formData.get("coverImageFile") as File
    let coverImagePath = formData.get("coverImage") as string

    if (file && file.size > 0) {
        if (file.size > 4 * 1024 * 1024) { // 4MB Limit
            return { message: "File size too large. Max 4MB." }
        }
        const uploadedPath = await saveFile(file, "projects")
        if (uploadedPath) {
            coverImagePath = uploadedPath
        }
    }

    if (!coverImagePath) {
        return {
            message: "Missing Cover Image. Please provide a URL or upload a file.",
        }
    }

    const validatedFields = ProjectSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        description: formData.get("description"),
        content: formData.get("content"),
        coverImage: coverImagePath,
        techStack: formData.get("techStack"),
        githubUrl: formData.get("githubUrl") || null,
        liveUrl: formData.get("liveUrl") || null,
        featured: formData.get("featured") === "on",
        order: formData.get("order"),
        status: formData.get("status"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Update Project.",
        }
    }

    const { data } = validatedFields

    try {
        await prisma.project.update({
            where: { id },
            data: {
                ...data,
                coverImage: coverImagePath!,
                techStack: data.techStack,
            },
        })
    } catch (error) {
        return {
            message: "Database Error: Failed to Update Project.",
        }
    }

    revalidatePath("/admin/projects")
    revalidatePath("/")
    redirect("/admin/projects")
}

export async function deleteProject(id: string) {
    try {
        await prisma.project.delete({
            where: { id },
        })
        revalidatePath("/admin/projects")
        revalidatePath("/")
        return { message: "Deleted Project." }
    } catch (error) {
        return { message: "Database Error: Failed to Delete Project." }
    }
}
