import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Site Settings
    // Site Settings - Singleton pattern
    const existingSettings = await prisma.siteSettings.findFirst()

    if (!existingSettings) {
        await prisma.siteSettings.create({
            data: {
                heroTitle: "Building the Future, One Line of Code at a Time",
                heroSubtitle: "Full-Stack Engineer & Aspiring Founder. CS student at MIT passionate about distributed systems, scalable cloud architecture, and building high-impact startups.",
                aboutText: "I'm a Computer Science student, obsessed with building high-performance systems and exploring the intersection of engineering and entrepreneurship.",
                seoKeywords: ["Full-Stack", "React", "Next.js", "Node.js", "Cloud Architecture"],
                socialLinks: {
                    github: "https://github.com",
                    linkedin: "https://linkedin.com",
                    twitter: "https://twitter.com"
                },
                email: "hello@example.com",
                phone: "+1234567890",
            }
        })
    }

    // Create Admin User
    // Password: "password123" (hashed)
    // Note: In real app, we should use bcrypt in the seed script.
    // I'll import bcryptjs here.
    const { hash } = require('bcryptjs')
    const hashedPassword = await hash('password123', 10)

    await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {
            password: hashedPassword,
            role: "admin"
        },
        create: {
            email: "admin@example.com",
            name: "Admin User",
            password: hashedPassword,
            role: "admin",
            image: "https://github.com/shadcn.png"
        }
    })

    // Nav Items (Clear and Re-seed to avoid duplicates)
    await prisma.navItem.deleteMany() // Reset Nav Items
    await prisma.navItem.createMany({
        data: [
            { label: "Home", path: "#home", order: 1, isActive: true },
            { label: "Projects", path: "#projects", order: 2, isActive: true },
            { label: "Experience", path: "#timeline", order: 3, isActive: true },
            { label: "Skills", path: "#skills", order: 4, isActive: true },
            { label: "About", path: "#about", order: 5, isActive: true },
            { label: "Contact", path: "#contact", order: 6, isActive: true },
        ]
    })

    // Skills (Clear and Re-seed)
    await prisma.skill.deleteMany() // Reset Skills
    await prisma.skill.createMany({
        data: [
            { name: "Python", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", order: 1 },
            { name: "JavaScript", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", order: 2 },
            { name: "C++", category: "Languages", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", order: 3 },
            { name: "React", category: "Frameworks", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", order: 4 },
            { name: "Next.js", category: "Frameworks", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", order: 5 },
            { name: "Docker", category: "Tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", order: 6 },
        ]
    })

    // Projects (Upsert)
    const project1 = await prisma.project.upsert({
        where: { slug: "ai-task-automator" },
        update: {},
        create: {
            title: "AI-Driven Task Automator",
            slug: "ai-task-automator",
            description: "A low-latency automation engine that uses LLMs to interpret user workflows and generate executable Python scripts.",
            content: "# AI Task Automator\n\nFull details about the project...",
            coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
            techStack: ["Python", "OpenAI", "React"],
            featured: true,
            order: 1
        }
    })

    const project2 = await prisma.project.upsert({
        where: { slug: "distributed-ledger" },
        update: {},
        create: {
            title: "Distributed Ledger System",
            slug: "distributed-ledger",
            description: "High-performance blockchain architecture built for scalability, featuring a custom consensus mechanism.",
            content: "# Distributed Ledger\n\nDetails...",
            coverImage: "https://images.unsplash.com/photo-1639322537228-ad7117a3a634?q=80&w=3270&auto=format&fit=crop",
            techStack: ["C++", "Go", "Docker"],
            featured: true,
            order: 2
        }
    })

    // Experience (Only create if empty to avoid duplicates on re-run)
    const experienceCount = await prisma.experience.count()
    if (experienceCount === 0) {
        await prisma.experience.createMany({
            data: [
                {
                    company: "Tech Giant Corp",
                    position: "Software Engineer Intern",
                    location: "San Francisco, CA",
                    startDate: new Date("2023-06-01"),
                    endDate: new Date("2023-08-31"),
                    current: false,
                    description: "Developed scalable validation microservices using Go and gRPC. Optimized database queries reducing latency by 40%.",
                    order: 1
                },
                {
                    company: "Startup Inc",
                    position: "Full Stack Developer",
                    location: "Remote",
                    startDate: new Date("2022-01-01"),
                    endDate: new Date("2023-05-01"),
                    current: false,
                    description: "Built the MVP using Next.js and Firebase. Implemented real-time collaboration features.",
                    order: 2
                }
            ]
        })
    }

    // Education (Only create if empty)
    const educationCount = await prisma.education.count()
    if (educationCount === 0) {
        await prisma.education.createMany({
            data: [
                {
                    institution: "Massachusetts Institute of Technology (MIT)",
                    degree: "Bachelor of Science",
                    fieldOfStudy: "Computer Science and Engineering",
                    startDate: new Date("2021-09-01"),
                    endDate: new Date("2025-05-31"),
                    current: true,
                    description: "Focusing on Distributed Systems and AI. GPA: 3.9/4.0",
                    order: 1
                }
            ]
        })
    }

    console.log("Seeding completed.")
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
