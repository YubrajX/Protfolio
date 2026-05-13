import { prisma } from "@/lib/prisma"

export async function getPublicPortfolioContext() {
    try {
        // 1. Fetch Projects (only published)
        const projects = await prisma.project.findMany({
            where: { status: "published" },
            select: {
                title: true,
                description: true,
                techStack: true,
                content: true,
                githubUrl: true,
                liveUrl: true,
            },
            orderBy: { order: "asc" },
        })

        // 2. Fetch Skills
        const skills = await prisma.skill.findMany({
            select: {
                name: true,
                category: true,
                level: true,
            },
            orderBy: { order: "asc" },
        })

        // 3. Fetch Experience
        const experience = await prisma.experience.findMany({
            select: {
                position: true,
                company: true,
                location: true,
                startDate: true,
                endDate: true,
                description: true,
            },
            orderBy: { startDate: "desc" },
        })

        // 4. Fetch Education
        const education = await prisma.education.findMany({
            select: {
                degree: true,
                institution: true, // Fixed: school -> institution
                fieldOfStudy: true,
                startDate: true,
                endDate: true,
            },
            orderBy: { startDate: "desc" },
        })

        // 5. Fetch Site Settings (Bio/About)
        const settings = await prisma.siteSettings.findFirst()

        // Format into a readable string for the LLM
        const contextParts = []

        if (settings) {
            contextParts.push(`--- OWNER PROFILE ---\nBio: ${settings.aboutText}\nEmail: ${settings.email}\nPhone: ${settings.phone || "N/A"}\n`)
        }

        if (skills.length > 0) {
            const skillsByCategory = skills.reduce((acc, skill) => {
                acc[skill.category] = acc[skill.category] || []
                acc[skill.category].push(skill.name)
                return acc
            }, {} as Record<string, string[]>)

            let skillsText = "--- SKILLS ---\n"
            for (const [category, names] of Object.entries(skillsByCategory)) {
                skillsText += `${category}: ${names.join(", ")}\n`
            }
            contextParts.push(skillsText)
        }

        if (experience.length > 0) {
            let expText = "--- WORK EXPERIENCE ---\n"
            experience.forEach(exp => {
                expText += `Position: ${exp.position} at ${exp.company}\nLocation: ${exp.location}\nPeriod: ${exp.startDate.toDateString()} - ${exp.endDate ? exp.endDate.toDateString() : "Present"}\nDescription: ${exp.description}\n\n`
            })
            contextParts.push(expText)
        }

        if (projects.length > 0) {
            let projText = "--- PROJECTS ---\n"
            projects.forEach(proj => {
                projText += `Title: ${proj.title}\nTech Stack: ${proj.techStack.join(", ")}\nDescription: ${proj.description}\nLinks: GitHub (${proj.githubUrl || "N/A"}), Live (${proj.liveUrl || "N/A"})\n\n`
            })
            contextParts.push(projText)
        }

        if (education.length > 0) {
            let eduText = "--- EDUCATION ---\n"
            education.forEach(edu => {
                eduText += `Degree: ${edu.degree} in ${edu.fieldOfStudy}\nInstitution: ${edu.institution}\nPeriod: ${edu.startDate.toDateString()} - ${edu.endDate ? edu.endDate.toDateString() : "Present"}\n\n`
            })
            contextParts.push(eduText)
        }

        return contextParts.join("\n")

    } catch (error) {
        console.error("Error fetching portfolio context:", error)
        return ""
    }
}
