"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

import { saveFile } from "@/lib/utils/file-upload"

const SettingsSchema = z.object({
    heroTitle: z.string().min(1, "Hero Title is required"),
    heroSubtitle: z.string().min(1, "Hero Subtitle is required"),
    aboutText: z.string().min(1, "About Text is required"),
    seoKeywords: z.string().transform((str) => str.split(",").map((s) => s.trim()).filter((s) => s !== "")),
    githubUrl: z.string().optional().or(z.literal("")),
    linkedinUrl: z.string().optional().or(z.literal("")),
    twitterUrl: z.string().optional().or(z.literal("")),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional().or(z.literal("")),
    primaryColor: z.string().default("#3b82f6"),
    secondaryColor: z.string().optional().or(z.literal("")),
    backgroundColor: z.string().optional().or(z.literal("")),
    textColor: z.string().optional().or(z.literal("")),
    cardBackgroundColor: z.string().optional().or(z.literal("")),
    cardBackgroundColorDark: z.string().optional().or(z.literal("")),
    navbarColor: z.string().optional().or(z.literal("")),
    navbarColorDark: z.string().optional().or(z.literal("")),
    resumeUrl: z.string().optional().or(z.literal("")),
})

export async function updateSettings(prevState: any, formData: FormData) {
    const validatedFields = SettingsSchema.safeParse({
        heroTitle: formData.get("heroTitle"),
        heroSubtitle: formData.get("heroSubtitle"),
        aboutText: formData.get("aboutText"),
        seoKeywords: formData.get("seoKeywords"),
        githubUrl: formData.get("githubUrl") || undefined,
        linkedinUrl: formData.get("linkedinUrl") || undefined,
        twitterUrl: formData.get("twitterUrl") || undefined,
        email: formData.get("email"),
        phone: formData.get("phone") || undefined,
        primaryColor: formData.get("primaryColor"),
        secondaryColor: formData.get("secondaryColor") || undefined,
        backgroundColor: formData.get("backgroundColor") || undefined,
        textColor: formData.get("textColor") || undefined,
        cardBackgroundColor: formData.get("cardBackgroundColor") || undefined,
        cardBackgroundColorDark: formData.get("cardBackgroundColorDark") || undefined,
        navbarColor: formData.get("navbarColor") || undefined,
        navbarColorDark: formData.get("navbarColorDark") || undefined,
    })

    if (!validatedFields.success) {
        console.error("Settings Validation Error:", validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Update Settings.",
        }
    }

    const { data } = validatedFields

    let resumeUrlPath = formData.get("resumeUrl") as string

    try {
        // Upsert pattern: Update if exists, create if not (though seed should have created one)
        const firstSetting = await prisma.siteSettings.findFirst()

        const styleSettingsData = {
            primaryColor: data.primaryColor,
            secondaryColor: data.secondaryColor || undefined,
            backgroundColor: data.backgroundColor || undefined,
            textColor: data.textColor || undefined,
            cardBackgroundColor: data.cardBackgroundColor || undefined,
            cardBackgroundColorDark: data.cardBackgroundColorDark || undefined,
            navbarColor: data.navbarColor || undefined,
            navbarColorDark: data.navbarColorDark || undefined,
        }

        if (firstSetting) {
            await prisma.siteSettings.update({
                where: { id: firstSetting.id },
                data: {
                    heroTitle: data.heroTitle,
                    heroSubtitle: data.heroSubtitle,
                    aboutText: data.aboutText,
                    seoKeywords: data.seoKeywords,
                    socialLinks: {
                        github: data.githubUrl,
                        linkedin: data.linkedinUrl,
                        twitter: data.twitterUrl
                    },
                    styleSettings: styleSettingsData,
                    email: data.email,
                    phone: data.phone || null,
                    resumeUrl: resumeUrlPath || undefined,
                }
            })
        } else {
            await prisma.siteSettings.create({
                data: {
                    heroTitle: data.heroTitle,
                    heroSubtitle: data.heroSubtitle,
                    aboutText: data.aboutText,
                    seoKeywords: data.seoKeywords,
                    socialLinks: {
                        github: data.githubUrl,
                        linkedin: data.linkedinUrl,
                        twitter: data.twitterUrl
                    },
                    styleSettings: styleSettingsData,
                    email: data.email,
                    phone: data.phone || null,
                    resumeUrl: resumeUrlPath || undefined,
                }
            })
        }

    } catch (error) {
        console.error("Failed to update settings:", error)
        return {
            message: "Database Error: Failed to Update Settings.",
        }
    }

    revalidatePath("/", "layout")
    revalidatePath("/admin/settings")
    return { message: "Settings Updated Successfully." }
}
