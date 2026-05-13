import { getSkills } from "@/lib/actions"
import { SkillsClient } from "./skills-client"

export async function Skills() {
    const skills = await getSkills()

    return <SkillsClient skills={skills} />
}
