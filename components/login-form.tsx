"use client"

import { useActionState, useTransition } from "react"
import { useFormStatus } from "react-dom"
import { authenticate } from "@/lib/auth-actions"
import { AlertCircle, Terminal } from "lucide-react"

export function LoginForm() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined)
    const [isPending, startTransition] = useTransition()

    return (
        <form action={dispatch} className="space-y-3">
            <div className="flex-1 rounded-lg bg-white px-6 pb-4 pt-8 dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl">
                <div className="flex flex-col items-center mb-6 text-slate-900 dark:text-white">
                    <div className="bg-primary/20 p-2 rounded-lg text-primary mb-2">
                        <Terminal size={24} />
                    </div>
                    <h1 className="text-2xl font-bold">Admin Access</h1>
                </div>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-slate-900 dark:text-slate-300 uppercase tracking-wider"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent py-[9px] px-3 text-sm outline-2 placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-slate-900 dark:text-slate-300 uppercase tracking-wider"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-slate-200 dark:border-white/10 bg-transparent py-[9px] px-3 text-sm outline-2 placeholder:text-slate-500 focus:border-primary focus:ring-1 focus:ring-primary"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>
                </div>
                <LoginButton />
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <>
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )}
                </div>
            </div>
        </form>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <button
            className="mt-4 w-full flex justify-center items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white font-bold hover:bg-primary/90 transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            aria-disabled={pending}
        >
            Log in {pending && <span className="animate-spin text-white">⏳</span>}
        </button>
    )
}
