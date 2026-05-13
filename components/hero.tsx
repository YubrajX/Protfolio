import { getSiteSettings } from "@/lib/actions"
import { HeroClient } from "./hero-client"

export async function Hero() {
    const settings = await getSiteSettings()

    if (!settings) return null

    return (
        <HeroClient
            title={settings.heroTitle}
            subtitle={settings.heroSubtitle}
        />
    )
}
