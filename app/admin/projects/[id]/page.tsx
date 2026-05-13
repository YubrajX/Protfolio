import { ProjectForm } from "@/components/admin/project-form"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

interface EditProjectPageProps {
    params: Promise<{ id: string }>
}

export default async function EditProjectPage(props: EditProjectPageProps) {
    const params = await props.params;
    const project = await prisma.project.findUnique({
        where: { id: params.id }
    })

    if (!project) {
        notFound()
    }

    return (
        <div>
            <ProjectForm project={project} />
        </div>
    )
}
