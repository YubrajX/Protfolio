"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import nodemailer from "nodemailer"

const ContactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function submitContactForm(prevState: any, formData: FormData) {
    const validatedFields = ContactSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Validation Error. Please check your inputs.",
        }
    }

    const { name, email, message } = validatedFields.data

    try {
        // 1. Save to Database
        await prisma.contactSubmission.create({
            data: {
                name,
                email,
                message,
            },
        })

        // 2. Send Email (if configured)
        const settings = await prisma.siteSettings.findFirst()

        // Only attempt to send email if we have credentials locally or in env
        // In a real app, you'd pull SMTP settings from ENV variables
        // For this implementation, we will try to use a transport if ENV vars are set
        if (process.env.SMTP_HOST && process.env.SMTP_USER) {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || "587"),
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            })

            await transporter.sendMail({
                from: `"${name}" <${process.env.SMTP_USER}>`, // Sender address
                to: settings?.email || process.env.SMTP_USER, // List of receivers
                replyTo: email,
                subject: `New Portfolio Contact: ${name}`, // Subject line
                text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // plain text body
                html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><br/><p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`, // html body
            })
            console.log("Email sent successfully")
        } else {
            console.log("SMTP not configured, skipping email.")
        }

    } catch (error) {
        console.error("Contact Form Error:", error)
        return {
            message: "Something went wrong. Please try again later.",
        }
    }

    revalidatePath("/admin/messages")
    return { message: "Message sent! I'll get back to you soon." }
}

export async function deleteMessage(id: string) {
    try {
        await prisma.contactSubmission.delete({
            where: { id }
        })
        revalidatePath("/admin/messages")
        return { message: "Message deleted." }
    } catch (error) {
        return { message: "Failed to delete message." }
    }
}
