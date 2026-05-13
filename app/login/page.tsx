import { LoginForm } from "@/components/login-form"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Admin Login",
}

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen bg-background-light dark:bg-background-dark grid-pattern">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <LoginForm />
            </div>
        </main>
    )
}
