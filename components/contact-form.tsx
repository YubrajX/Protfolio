"use client"

import { useActionState } from "react"
import { submitContactForm } from "@/lib/actions/contact-actions"
import { Button, Input, Textarea } from "@/components/ui/form-elements" // Reusing inputs
import { Send } from "lucide-react"

export function ContactForm() {
    // @ts-ignore
    const [state, dispatch] = useActionState(submitContactForm, { message: "", errors: {} })

    return (
        <form action={dispatch} className="max-w-md mx-auto space-y-6 text-left">
            <div>
                <Input
                    name="name"
                    placeholder="Your Name"
                    required
                    error={state?.errors?.name}
                />
            </div>
            <div>
                <Input
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    error={state?.errors?.email}
                />
            </div>
            <div>
                <Textarea
                    name="message"
                    required
                    placeholder="Tell me about your project..."
                    className="min-h-[120px]"
                    error={state?.errors?.message}
                />
            </div>

            <Button type="submit" className="w-full" disabled={state?.message?.includes("sent")}>
                <Send size={16} className="mr-2" />
                Send Message
            </Button>

            {state?.message && (
                <p className={`text-sm text-center ${state.message.includes("sent") ? "text-green-500" : "text-red-500"}`}>
                    {state.message}
                </p>
            )}
        </form>
    )
}
