import { SkillForm } from "@/components/admin/skill-form"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

interface EditSkillPageProps {
    params: Promise<{ id: string }>
}

export default async function EditSkillPage(props: EditSkillPageProps) {
    const params = await props.params;
    const skill = await prisma.skill.findUnique({
        where: { id: params.id }
    })

    if (!skill) {
        notFound()
    }

    return (
        <div>
            <SkillForm skill={skill} />
        </div>
    )
}
