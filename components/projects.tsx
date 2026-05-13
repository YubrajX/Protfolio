import { getFeaturedProjects } from "@/lib/actions"
import { ProjectsClient } from "./projects-client"

export async function Projects() {
    const projects = await getFeaturedProjects()

    return <ProjectsClient projects={projects} />
}
