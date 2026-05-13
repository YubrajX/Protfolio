import { AdminSidebar } from "@/components/admin-sidebar"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Admin Dashboard",
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black">
            <AdminSidebar />
            <main className="ml-64 p-8">
                {children}
            </main>
        </div>
    )
}
