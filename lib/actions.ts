'use server'

import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

export async function getSiteSettings() {
    return await prisma.siteSettings.findFirst()
}

export async function getNavItems() {
    const navItems = await prisma.navItem.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' }
    })
    return navItems
}

export async function getFeaturedProjects() {
    return await prisma.project.findMany({
        where: {
            status: 'published',
            featured: true
        },
        orderBy: { order: 'asc' }
    })
}

export async function getSkills() {
    return await prisma.skill.findMany({
        orderBy: { order: 'asc' }
    })
}
