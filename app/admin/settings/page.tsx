import { SettingsForm } from "@/components/admin/settings-form"
import { prisma } from "@/lib/prisma"

export default async function AdminSettingsPage() {
    const settings = await prisma.siteSettings.findFirst()

    return (
        <div>
            <SettingsForm settings={settings} />
        </div>
    )
}
