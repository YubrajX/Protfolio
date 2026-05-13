"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const ExperienceSchema = z.object({
    company: z.string().min(1, "Company is required"),
    position: z.string().min(1, "Position is required"),
    location: z.string().optional().or(z.literal("")),
    startDate: z.string().transform((str) => new Date(str)),
    endDate: z.string().optional().or(z.literal("")).transform((str) => str ? new Date(str) : null),
    current: z.boolean().optional(),
    description: z.string().min(1, "Description is required"),
    order: z.number().int().optional().default(0),
})

export async function createExperience(prevState: any, formData: FormData) {
    const validatedFields = ExperienceSchema.safeParse({
        company: formData.get("company"),
        position: formData.get("position"),
        location: formData.get("location"),
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
        current: formData.get("current") === "on",
        description: formData.get("description"),
        order: Number(formData.get("order") || 0),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Experience.",
        }
    }

    const { data } = validatedFields

    try {
        await prisma.experience.create({
            data: {
                company: data.company,
                position: data.position,
                location: data.location || null,
                startDate: data.startDate,
                endDate: data.endDate,
                current: data.current || false,
                description: data.description,
                order: data.order,
            },
        })
    } catch (error) {
        return {
            message: "Database Error: Failed to Create Experience.",
        }
    }

    revalidatePath("/")
    revalidatePath("/admin/experience")
    return { message: "Experience Created Successfully." }
}

export async function deleteExperience(id: string) {
    try {
        await prisma.experience.delete({
            where: { id },
        })
        revalidatePath("/")
        revalidatePath("/admin/experience")
        return { message: "Deleted Experience." }
    } catch (error) {
        return { message: "Database Error: Failed to Delete Experience." }
    }
}

export async function getExperiences() {
    return await prisma.experience.findMany({
        orderBy: { startDate: 'desc' }
    })
}
