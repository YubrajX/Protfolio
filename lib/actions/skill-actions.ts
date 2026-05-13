"use server"

import { saveFile } from "@/lib/utils/file-upload"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const SkillSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    icon: z.string().optional().nullable(),
    level: z.coerce.number().min(0).max(100).optional(),
    order: z.coerce.number(),
})

export async function createSkill(prevState: any, formData: FormData) {
    const file = formData.get("iconFile") as File
    let iconPath = formData.get("icon") as string

    if (file && file.size > 0) {
        if (file.size > 4 * 1024 * 1024) { // 4MB Limit
            return { message: "File size too large. Max 4MB." }
        }
        const uploadedPath = await saveFile(file, "skills")
        if (uploadedPath) {
            iconPath = uploadedPath
        }
    }

    const validatedFields = SkillSchema.safeParse({
        name: formData.get("name"),
        category: formData.get("category"),
        icon: iconPath || null,
        level: formData.get("level"),
        order: formData.get("order"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Skill.",
        }
    }

    const { data } = validatedFields

    try {
        await prisma.skill.create({
            data: data,
        })
    } catch (error) {
        return {
            message: "Database Error: Failed to Create Skill.",
        }
    }

    revalidatePath("/admin/skills")
    revalidatePath("/")
    redirect("/admin/skills")
}

export async function updateSkill(id: string, prevState: any, formData: FormData) {
    const file = formData.get("iconFile") as File
    let iconPath = formData.get("icon") as string

    if (file && file.size > 0) {
        if (file.size > 4 * 1024 * 1024) { // 4MB Limit
            return { message: "File size too large. Max 4MB." }
        }
        const uploadedPath = await saveFile(file, "skills")
        if (uploadedPath) {
            iconPath = uploadedPath
        }
    }

    const validatedFields = SkillSchema.safeParse({
        name: formData.get("name"),
        category: formData.get("category"),
        icon: iconPath || null,
        level: formData.get("level"),
        order: formData.get("order"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Update Skill.",
        }
    }

    const { data } = validatedFields

    try {
        await prisma.skill.update({
            where: { id },
            data: data,
        })
    } catch (error) {
        return {
            message: "Database Error: Failed to Update Skill.",
        }
    }

    revalidatePath("/admin/skills")
    revalidatePath("/")
    redirect("/admin/skills")
}

export async function deleteSkill(id: string) {
    try {
        await prisma.skill.delete({
            where: { id },
        })
        revalidatePath("/admin/skills")
        revalidatePath("/")
        return { message: "Deleted Skill." }
    } catch (error) {
        return { message: "Database Error: Failed to Delete Skill." }
    }
}
