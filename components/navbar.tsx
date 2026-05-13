import { getNavItems, getSiteSettings } from "@/lib/actions"
import { NavbarClient } from "./navbar-client"

export async function Navbar() {
    const navItems = await getNavItems()
    const settings = await getSiteSettings()

    return <NavbarClient navItems={navItems} socialLinks={settings?.socialLinks as any} resumeUrl={settings?.resumeUrl} />
}
