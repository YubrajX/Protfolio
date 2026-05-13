"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const EducationSchema = z.object({
    institution: z.string().min(1, "Institution is required"),
    degree: z.string().min(1, "Degree is required"),
    fieldOfStudy: z.string().min(1, "Field of Study is required"),
    startDate: z.string().transform((str) => new Date(str)),
    endDate: z.string().optional().or(z.literal("")).transform((str) => str ? new Date(str) : null),
    current: z.boolean().optional(),
    description: z.string().optional().or(z.literal("")),
    order: z.number().int().optional().default(0),
})

export async function createEducation(prevState: any, formData: FormData) {
    const validatedFields = EducationSchema.safeParse({
        institution: formData.get("institution"),
        degree: formData.get("degree"),
        fieldOfStudy: formData.get("fieldOfStudy"),
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
        current: formData.get("current") === "on",
        description: formData.get("description"),
        order: Number(formData.get("order") || 0),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Create Education.",
        }
    }

    const { data } = validatedFields

    try {
        await prisma.education.create({
            data: {
                institution: data.institution,
                degree: data.degree,
                fieldOfStudy: data.fieldOfStudy,
                startDate: data.startDate,
                endDate: data.endDate,
                current: data.current || false,
                description: data.description,
                order: data.order,
            },
        })
    } catch (error) {
        return {
            message: "Database Error: Failed to Create Education.",
        }
    }

    revalidatePath("/")
    revalidatePath("/admin/education")
    return { message: "Education Created Successfully." }
}

export async function deleteEducation(id: string) {
    try {
        await prisma.education.delete({
            where: { id },
        })
        revalidatePath("/")
        revalidatePath("/admin/education")
        return { message: "Deleted Education." }
    } catch (error) {
        return { message: "Database Error: Failed to Delete Education." }
    }
}

export async function getEducations() {
    return await prisma.education.findMany({
        orderBy: { startDate: 'desc' } // Most recent first
    })
}
